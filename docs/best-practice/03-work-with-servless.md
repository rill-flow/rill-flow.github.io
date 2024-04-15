# 对接Serverless服务

Serverless能够做到业务按需使用、按量计费，同时，由于函数独立部署、轻量化的特性，在实际业务落地时需要很多“胶水代码”，串联不同的函数逻辑。

Rill Flow支持常见的流程控制语句，能够很好的充当“胶水代码”，实现低代码编排Serverless。

## 流程控制
Rill Flow中支持条件、循环、跳转等逻辑的流程控制节点，通过流程控制节点可以实现基本业务逻控制辑及表达式求值，详情可以参考[流程控制](../user-guide/03-defination/05-control.md)

## 对接到Serverless网关
Rill Flow 以工作流的形式，对包括云函数在内的云服务进行统一编排，支持条件、循环、跳转等逻辑的流程控制节点。任务通过 HTTP 请求转发到 Serverless 网关，实现 Serverless 业务的集成。详情可以参考[HTTP 派发器](../user-guide/03-defination/02-task-and-dispatcher.md#http-协议派发器)。
> 同时也可以通过自定义派发器实现 `Serverless` 专用派发器，开发自定义插件详情参考[创建插件](../develop/01-plugin/02-create-plugin.md)

以文本生成视频为例，其中文本获取、文本拆分、文本润色、文本配音、口型校对等服务是一个个独立的函数，Rill Flow 可以通过流程编排将各个函数按照项目需求按需编排连线，减少开发者写一些不必要的“胶水代码”。可以根据不同时期的不同需求，修改 DAG 图来快速实现产品需求迭代开发。

![image](../getting-started/02-sample.md/../assets/text_to_video.svg)

### OpenFaas 
OpenFaas gateway 的 `namespace`、`service` 和 `port` 可以通过查看 [OpenFaas](https://docs.openfaas.com/deployment/kubernetes/) 部署 Yaml 确认。 在定义任务时，任务可以通过 `ResourceName` 字段绑定到不同的 `Serverless` 函数。

- OpenFaas 函数同步调用调用 `ResourceName` 类似：
  > `http://{service}.{namespace}.svc.cluster.local:{service-port}/function/{function-name}/{function-uri}`

  ![images](./assets/openfaas-sync.svg)

- OpenFaas 函数异步调用调用 `ResourceName` 类似：
  > `http://{service}.{namespace}.svc.cluster.local:{service-port}/async-function/{function-name}/{function-uri}`
  
  ![images](./assets/openfaas-async.svg))

## 业务集成与异步调用

### 业务集成

对于普通业务的集成，只需要将业务的调用接口作为 task 的 resourceName 来创建任务即可，如果业务不是通过 http 的方式调用，则可以通过创建自定义的派发器插件来支持相应的 resourceProtocol，可以参考 [开发插件](../develop/01-plugin/01-intro.md)

当业务函数的执行耗时较长，可以将该 task 的 pattern 字段设置为 `task_async` 来表明这是一个异步调用，此时，Rill Flow 会在调用函数后立即返回，不会等待函数执行完成。

### 异步任务回调地址

对于异步调用，Rill Flow 会在 header 中添加 `X-Callback-Url` 字段，该字段的值为当前 task 执行结束后的回调地址，函数需要在执行完成后，通过向该地址发送 POST 请求，通知 Rill Flow 该 task 已经执行完成。可以参考 [异步模式](../user-guide/03-defination/02-task-and-dispatcher.md#异步模式task_async)

除此以外，Rill Flow 还提供了一个方便业务服务调用的异步回调地址，下面是一个回调的例子：

> http://\{rill-flow-server-host}/flow/trigger.json

为了方便调用，这个回调接口同时支持 GET 和 POST 两种方式调用。

接口的 url query 请求参数如下：

|              | 必选  |  类型  |                        说明                        |
| :----------: | :---: | :----: | :------------------------------------------------: |
| execution_id | true  | string |                       执行id                       |
|  task_name   | true  | string |                      任务名称                      |
|    status    | false | string | 任务运行状态，取值：success, failed，默认为success |
|   context    | false | string |              JSON 格式的任务执行结果               |

如果通过 POST 方式调用，可以通过 body 参数传递 JSON 格式的任务返回参数，用于通过 outputMappings 对任务的返回参数进行处理，如放入到 context 等操作，因此，对于 POST 方式调用，header 中的 Content-Type 字段必须取值为 application/json。

如果同时传递了 context 的 query 参数和 POST body 参数，Rill Flow 会将两者合并，相同的 key 会用 query 参数覆盖 body 参数。

### 将回调地址作为任务参数

如果想要将上述回调接口及某个任务对应的参数作为某个任务节点的传入参数，可以在对应的任务节点的 inputMappings 中增加相应的映射：

```yaml
inputMappings:
    - target: $.input.data.trigger_url
      source: $.tasks.task1.trigger_url
```

在该工作流的执行中，Rill Flow 就会在配置有该 inputMappings 的任务执行时，将任务名为 task1 对应的回调地址作为参数中 input\["data"]\["trigger_url"] 的值传递给该任务。

这个参数的默认值为：

> http://\{rill-flow-server-host}/flow/trigger.json?execution_id=\{current-execution-id}&task_name=task1

如果你需要在该任务接收到的 trigger_url 中额外添加某些参数，可以通过下面示例中的方式来添加：

```yaml
inputMappings:
    - target: $.input.data.trigger_url
      source: $.tasks.task1.trigger_url?context=%7B%22key%22%3A%20%22value%22%7D
```

这样，最终生成的 trigger_url 就会变为：

> http://\{rill-flow-server-host}/flow/trigger.json?execution_id=\{current-execution-id}&task_name=task1&context=%7B%22key%22%3A%20%22value%22%7D

