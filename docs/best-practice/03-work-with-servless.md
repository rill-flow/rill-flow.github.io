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