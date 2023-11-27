---
sidebar_position: 4
---

# 过载保护

## 存储容量保护

在提交执行流程时，Rill Flow 会进行存储容量的检查，如果存储容量超过了限制，Rill Flow 将拒绝本次提交，并返回错误码 100，错误信息：

```
dag runtime storage usage limit
```

具体的存储最大容量的阈值，可以通过以下 properties 进行配置（在项目中的 application.properties 文件中进行配置）：

```properties
weibo.flow.runtime.redis.default.storage.max.usage=90
```

该项配置的最大值为 100，最小值为 0，默认值为 90，表示最大允许的 redis 已使用容量的百分比。如果设置为 0 或 100，均表示不做检查。

## 熔断

当 Rill Flow 调用执行器执行任务时，允许执行器返回熔断信息，来防止 Rill Flow 流程的反复重试造成资源的进一步过载。

当派发器针对某资源派发任务后，如果该资源需要被熔断，执行器可以返回如下熔断错误信息：

```json
{
  "error_detail": {
    "retry_interval_seconds": 10
  }
}
```

其中，retry_interval_seconds 的值为需要熔断的秒数，如果为 0 则不会做任何处理。

当 Rill Flow 接收到执行器返回的熔断信息后，在指定的时间段内，Rill Flow 将暂时停止对相同 resourceName 的资源进行调用。

## 限流

Rill Flow 支持定义在存在资源熔断的条件下，是否需要拒绝相关执行流程的提交，从而实现对流量的限制和对已过载资源的保护。

### 限流策略的四种模式

Rill Flow 支持的限流策略共有四种模式：

1. 短板模式（short_board）：当该执行流程依赖的任何资源被熔断时，都触发对该执行流程的限流，这是 Rill Flow 的默认策略。
2. 长板模式（long_board）：只有当该执行流程依赖的全部资源都被熔断时，该执行流程才进行限流。
3. 关键资源模式（key_resource）：只有当指定的关键资源全部被熔断时，该执行流程才进行限流，需要额外配置 key_resources，指定关键资源为哪些。
4. 跳过模式（skip）：不进行限流。

### 限流配置结构

Rill Flow 支持通过配置或参数传递两种方式实现自定义限流策略，具体的限流配置结构为 json 结构，示例如下：

```json
{
    "check_type": "key_resource",
    "key_resources": [
        "http://127.0.0.1:8080/sample/start.json",
        "http://127.0.0.1:8080/sample/end.json"
    ]
}
```

check_type 指定了限流策略的模式，当限流模式为 key_resource 时，需要配置 key_resources，定义哪些资源为关键资源，其他模式无需配置 key_resources。

上面的示例意为：通过关键资源模式进行限流，关键资源为 key_resources 对应的列表中的两个资源。

### 配置方式

Rill Flow 支持以下三种方式实现限流策略的配置，三种方式的优先级依次递减：

1. 在创建流程执行时传递参数；
2. 通过 properties 配置；
3. Rill Flow 默认配置。

#### 1. 通过参数传递

通过参数传递的方式可以灵活决定当前执行任务的提交的限流策略，只需要将限流配置结构的 json 字符串作为 resource_check 参数传递即可（需要进行 UrlEncode），例如：

```sh
curl -XPOST 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=demoFlowTest:demoTest&resource_check=%7B%22check_type%22%3A%22long_board%22%7D'
    -H'Content-Type:application/json'
    -d '{"left":5,"right":5}'
```

示例中 resource_check 参数的值：%7B%22check_type%22%3A%22long_board%22%7D 即限流策略的 json 配置结构 {"check_type":"long_board"} 的 UrlEncode 结果。

#### 2. 通过 properties 配置

通过 java properties 的方式配置（在项目中的 application.properties 文件中进行配置），可以针对不同的工作流业务ID（businessId）来设置不同的限流策略控制。（关于工作流业务ID的描述，参考：[执行工作流](01-execute.md)）

具体的配置示例如下：

```properties
weibo.flow.runtime.resource.check.id.to.config={'weiboFaasFlowTest':'{"check_type":"long_board"}'}
```

该配置为一个 map 结构，key 为工作流业务ID（businessId），值为 String 类型的限流配置结构 json 配置。

#### 3. Rill Flow 默认配置

如果既没有传递 resource_check 参数，又没有针对当前工作流业务ID（businessId）进行限流策略的 properties 配置，那么，Rill Flow 将采用默认配置，即短板模式（short_board）。

