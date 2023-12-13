---
sidebar_position: 3
---


# 执行器

## 概述

Rill Flow 使用执行器（Executor）的概念，实现了任务流程编排与任务执行节点的解耦。每个 `task` 节点通过 `resourceName` 属性与派发器及执行器绑定。派发器负责将任务的具体执行过程委托给执行器。

## 执行器地址

派发器会通过 `resourceName` 解析出执行器地址，Rill Flow 通过执行器地址将任务委派给执行器，执行器负责执行具体的任务。一般而言，对于提供 HTTP 接口的执行器 `resourceName` 就是执行器地址。

以 Python 执行器为例:

  - 当执行器使用 [docker-compose](../../getting-started/02-sample.md#并行和异步处理) 方式部署时，执行器的 `resourceName` 和执行器地址均为：
    > http://sample-executor:8000/executor.json

## 执行器输入与输出
### 输入

| 键                 | 值类型    | 说明                                                                                   |
|------------------|--------|--------------------------------------------------------------------------------------|
| query_params_*   | map    | GET 请求的参数，以 `query_params_` 前缀的键对应的值需为 map 类型，所有键/值以键=值形式拼接至请求 URL |
| request_header_* | map    | 请求头，以 `request_header_` 前缀的键对应的值需为 map 类型，所有键/值将加入请求头                      |
| 其余键              | string | POST 请求体参数，目前仅支持 json 类型，其余键/值将加入 POST 请求体的 json 结构中                   |

调用执行器之前，Rill Flow 的派发器会根据 [inputMappings](/docs/user-guide/defination/context-and-mapping#参数映射) 属性定义的映射规则准备执行器的调用参数。将 `context` 中的参数映射函数的输入。

### 输出
执行器执行完成之后，输出结果为 json 类型(目前仅支持 json 类型)，Rill Flow 通过 [outputMappings](/docs/user-guide/defination/context-and-mapping#参数映射) 属性定义的映射规则，将执行器的运行结果映射回工作流的上下文，便于后续任务获取。

> 有关上下文和映射规则的更多信息，请参阅[上下文与映射](context-and-mapping)。

## 执行器执行方式

### 任务属性
可以通过任务属性来指定执行器的执行方式。

| 参数               | 参数值                                | 说明                                        |
|------------------|------------------------------------|-------------------------------------------|
| pattern          | task_sync/task_async               | 指定任务执行模式，同步（task_sync）或异步（task_async） |

### 同步
适用于任务执行耗时为毫秒级的任务。

### 异步
适用于大模型等重型计算任务。当任务请求 header 中同时存在 `X-Mode` 和 `X-Callback-Url`，并且 `X-Mode=async` 时，执行器默认开启异步执行模式，等待任务完成之后会主动调用 `X-Callback-Url` 通知 Rill Flow 
任务完成。

## 支持的执行器

- [python](https://github.com/weibocom/rill-flow/tree/main/executors/fastapi/README.md)
- [java](https://github.com/weibocom/rill-flow/tree/main/executors/spring-boot/README.md)
