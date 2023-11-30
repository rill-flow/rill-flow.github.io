---
sidebar_position: 4
---

# 过载保护

## 存储容量保护

当提交执行流程时，Rill Flow 会检查存储容量。如果存储容量超出设定限制，Rill Flow 将拒绝此次提交，并返回错误码 100，附带错误信息：

```txt
dag runtime storage usage limit
```

存储容量的最大阈值可以通过以下属性在 `application.properties` 文件中配置：

```properties
weibo.flow.runtime.redis.default.storage.max.usage=90
```

配置的值范围是 0 到 100，其中默认值为 90，表示允许的 redis 使用容量的最大百分比。设为 0 或 100 表示不进行存储容量检查。

## 熔断机制

当 Rill Flow 调用执行器执行任务时，如果需要，执行器可以返回熔断信息，以避免 Rill Flow 流程的反复重试导致资源进一步过载。

如果执行器在针对某资源派发任务后判断需要熔断，可以返回以下熔断错误信息：

```json
{
  "error_detail": {
    "retry_interval_seconds": 10
  }
}
```

这里 `retry_interval_seconds` 是熔断的持续时间（秒）。如果值为 0，则不会进行熔断处理。

Rill Flow 在接收到执行器返回的熔断信息后，会在指定时间内暂停对同一 resourceName 的资源调用。

## 限流

Rill Flow 支持在资源熔断条件下拒绝相关执行流程的提交，从而实现流量控制和过载资源的保护。

### 限流策略的四种模式

Rill Flow 提供了四种限流策略模式：

1. 短板模式（short_board）：当执行流程依赖的任意资源被熔断时，触发该执行流程的限流。这是 Rill Flow 的默认策略。
2. 长板模式（long_board）：仅当执行流程依赖的所有资源都被熔断时，才对该流程进行限流。
3. 关键资源模式（key_resource）：只有当全部指定的关键资源被熔断时，对该流程进行限流。需额外配置 `key_resources` 来指定关键资源。
4. 跳过模式（skip）：不执行任何限流操作。

### 限流配置结构

Rill Flow 支持通过配置或参数传递的方式来实现自定义限流策略。限流配置采用 json 格式，示例如下：

```json
{
    "check_type": "key_resource",
    "key_resources": [
        "http://127.0.0.1:8080/sample/start.json",
        "http://127.0.0.1:8080/sample/end.json"
    ]
}
```

在此示例中，通过 `check_type` 指定了限流策略模式为关键资源模式（key_resource），并通过 `key_resources` 配置了关键资源。

### 配置方式

Rill Flow 支持以下三种方式来配置限流策略，优先级从高到低：

1. 在创建流程执行时传递的参数；
2. 通过 `properties` 文件配置；
3. Rill Flow 的默认配置。

#### 1. 通过参数传递

通过参数传递可以灵活设置每个执行任务的限流策略。仅需将限流配置的 json 字符串作为 `resource_check` 参数进行 UrlEncode 传递。例如：

```sh
curl -XPOST 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=demoFlowTest:demoTest&resource_check=%7B%22check_type%22%3A%22long_board%22%7D'
    -H'Content-Type:application/json'
    -d '{"left":5,"right":5}'
```

在此示例中，`resource_check` 参数的值 `%7B%22check_type%22%3A%22long_board%22%7D` 是 `{"check_type":"long_board"}` 的 UrlEncode 结果，表示采用长板模式的限流策略。

#### 2. 通过 properties 配置

可以通过 java properties 文件（在项目的 `application.properties` 文件中）配置限流策略，针对不同的工作流业务ID（businessId）设定不同的限流控制。例如：

```properties
weibo.flow.runtime.resource.check.id.to.config={'demoFlowTest':'{"check_type":"long_board"}'}
```

此配置是一个 map 结构，键为工作流业务ID，值为 String 类型的限流配置结构 json 字符串。

#### 3. Rill Flow 默认配置

如果既未传递 `resource_check` 参数，也未针对特定的工作流业务ID设置限流策略的 properties 配置，则 Rill Flow 将使用默认配置，即短板模式（short_board）。
