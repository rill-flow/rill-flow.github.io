---
sidebar_position: 2
---

# 任务与派发器

任务(Task)就是 DAG 图中的每一个节点。

在分布式执行环境中，任务可以通过 [resourceName](#resourcename) 属性绑定派发器(Dispatcher)
，派发器会将任务信息派发到不同的执行器(Executor)。

![task_arch](./assets/task_arch.svg)

## 任务

### 任务属性

在 DAG 图的 yaml 描述中，tasks 字段对应的列表中包含的，就是任务对象的列表，其中包含的属性如下：

| 属性名               | 是否必选  | 类型      | 说明                                                                            |
|-------------------|-------|---------|-------------------------------------------------------------------------------|
| name              | true  | string  | 任务名称                                                                          |
| category          | true  | string  | 任务分类，详细信息请参考[category](#category)                                             |
| pattern           | true  | string  | 任务执行模式，可选同步模式（task_sync）或异步模式（task_async）                                     |
| resourceProtocol  | false | string  | 派发器资源协议，用来匹配对应的派发器，如为空，则使用resourceName中解析出的protocol作为资源协议。注意 resourceProtocol 和 resourceName 不同时为空                 |
| resourceName      | false  | string  | 派发器资源描述符，值为scheme(protocol://URI)，参考[派发器](#派发器)                               |
| next              | false | string  | 后继任务名称                                                                        |
| inputMappings     | false | map     | 输入映射，详细信息请参考[参数映射](context-and-mapping)                                       |
| outputMappings    | false | map     | 输入映射，详细信息请参考[参数映射](context-and-mapping)                                       |
| tolerance         | false | boolean | 任务执行失败时，是否忽略失败，并且跳过当前节点继续执行                                                   |
| successConditions | false | string  | 非必须，如果定义了该结构，则优先级高于传入的 result_type，若output满足所有条件则任务状态为成功，否则任务状态为失败            |
| failConditions    | false | string  | 非必须，如果定义了该结构，则优先级高于 successConditions，若output满足所有条件则任务状态为失败，否则任务状态为成功         |
| parameters        | false | string  | 非必须，插件从任务中获取用户输入的信息 [详细介绍](../../develop/01-plugin/03-extension.md#getschema) |

### category

每个任务都具有自己的类型，这些类型可以分为三类：执行计算类工作的任务、流程控制类任务、将另一个 DAG 图的执行作为当前任务节点的任务。

- 计算类任务

  - `function`：执行具体的计算任务，如 HTTP 协议的调用任务、RPC 协议的调用任务等。

- 流程控制类任务

  - `choice`：用来在 DAG 图运行时在多个子任务中选择某个子任务来执行。
  - `foreach`：用来将一组子任务循环多次执行。
  - `paas`：空 task，当执行到 paas 任务时，任务直接被设置为成功。
  - `return`：是否跳过后续节点，当执行到 return 任务时，会根据 context 信息执行判断逻辑，若果判断逻辑执行为
      true，则跳过后续所有节点，否则继续执行。
  > 更多关于流程控制的介绍，请参考[流程控制](../03-defination/05-control.md)

### pattern

任务可以通过 `pattern` 属性来指定派发器与执行器之间的任务执行模式为同步或异步执行。

#### 同步（task_sync）

同步模式，派发器与执行器保持链接直至执行器执行结束或超时，这种模式适用于任务执行耗时为毫秒级别的任务。

#### 异步（task_async）

异步模式，派发器将回调地址 `X-Callback-Url` 信息放置在 Header 中，并将任务信息传递给执行器，执行器异步执行完成任务后，执行器通过调用 `X-Callback-Url` 将执行结果通知到 Rill Flow。适用于重型计算或耗时较长的任务，例如 AIGC 模型生成任务。

## 派发器

### 概述

任务通过 `resourceProtocol` 属性来选择派发器，同一属性的派发器可对应多种执行器，任务通过 `resourceName` 属性绑定派发器和执行器。Rill Flow 的派发器有 HTTP 协议派发器、 K8s Service 派发器、阿里云通义千问派发器、ChatGPT 派发器。同时 Rill Flow 支持通过[插件](../../develop/01-plugin/02-create-plugin.md)对派发器进行扩展，为用户提供了实现自定义派发器的灵活扩展能力。

### resourceProtocol

任务通过`resourceProtocol`属性指定派发器，该字段是可选的，如果任务的`resourceProtocol`为空，则会通过`resourceName`字段解析解析出`resourceProtocol`。

### resourceName

任务通过`resourceName`属性，使用[统一资源定位符](https://zh.wikipedia.org/zh-hans/统一资源定位符)的简化格式描述一个派发器和执行器，通常会是以下格式：

```
[协议类型]://[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]
```

比如：

```
http://www.sample.com/callback.json
```

### 支持的派发器

Rill Flow 支持派发器的类型：

#### HTTP 协议派发器

Rill Flow 支持通过 HTTP 派发器对任务信息进行转发，任务可以通过 `resourceName`、`pattern` 两个属性控制 HTTP 派发器与执行器之间的处理动作。

- 任务属性
  
  | 参数 | 参数值 | 说明 |
  | --- | --- | --- |
  | resourceName | http://www.sample.com/callback.json | 填写 http URL |
  | pattern | task_sync  | 可选同步（task_sync）或异步（task_async） |

#### K8s Service 协议派发器

Rill Flow 支持通过 K8s Service 调用的方式对任务进行转发。任务可以通过 `resourceName`、`pattern` 两个属性控制 K8s Service 派发器与执行器之间的处理动作。

- 任务属性
  
  | 参数 | 参数值 | 说明 |
  | --- | --- | --- |
  | resourceName | http://service_name.namespace/executor.json | 填写 K8s service 调用 URL |
  | pattern | task_sync  | 可选同步（task_sync）或异步（task_async） |

#### 阿里云通义千问派发器

Rill Flow 支持阿里云通义千问派发器，任务通过 `resourceProtocol` 属性绑定通义千问派发，通过 `parameters` 属性传递通义千问 API-KEY。

- 任务属性

  | 参数 | 参数值 | 说明 |
  | --- | --- | --- |
  | resourceProtocol | aliyun_ai:// | 填写通义千问派发器协议 |
  | parameters | ```{"apikey":"$api_key"}``` | 通义千问 api_key |

> 需要具备阿里云通义千问的模型调用的 Apikey [详情请参考阿里云通义千问文档](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key?spm=a2c4g.11186623.0.i1)

#### ChatGPT 派发器

TODO
