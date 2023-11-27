---
sidebar_position: 2
---

# 触发器

## 概述

触发器是用来支持外部事件触发 DAG 图执行，从而提交工作流的工具。对于提交工作流的基本信息，可以参考：[提交工作流](01-execute.md)

Rill Flow 支持以下类型的触发器：

- 定时触发器：用于定时提交工作流。
- Kafka 消息触发器：通过向指定的 Kafka 主题发送消息来触发工作流。

## 定时触发器

定时触发器允许用户提交执行任务，系统将按指定周期自动触发工作流的提交。

### 提交定时触发任务

Rill Flow 提供 HTTP 接口用于提交定时触发任务：

- URI: `/flow/trigger/add_scheduler.json`
- 调用方式：POST
- Content-Type：application/json
- GET 参数：
  - `cron`：定时语句，例如 `0 * * * * *` 表示每分钟执行一次。
  - `descriptor_id`：需要定时执行的 DAG 图 ID。
  - `callback`：可选参数，定义工作流执行后的通知任务，详情见：[提交工作流](01-execute.md)。
- POST 参数：执行 DAG 图所需的上下文。
- 返回参数：JSON 格式，例如 `{"code": 0, "data": {"task_id": 1}}`。
  - `code`：标识调用是否成功，0 表示成功，非 0 表示失败。
  - `task_id`：定时触发任务的 ID，用于管理定时触发任务。

#### 取消定时触发任务

提交定时触发任务后，系统会按照传入的 `cron` 语句定义的周期自动提交工作流。Rill Flow 提供了 HTTP 接口用于取消这些定时触发的任务：

- URI: `/flow/trigger/cancel_scheduler.json`
- 调用方式：POST
- Content-Type：application/json
- GET 参数：
  - `task_id`：要取消的定时触发任务的 ID。
- 返回参数：JSON 格式，例如 `{"code": 0, "data": {"task_id": 1, "result": true}}`。
  - `code`：标识调用是否成功，0 表示成功，非 0 表示失败。
  - `task_id`：传入的定时触发任务 ID。
  - `result`：是否成功取消。

## Kafka 触发器

Kafka 触发器支持通过 Kafka 消息来触发工作流的提交。

Rill Flow 监听本地 9092 端口启动的 Kafka 服务，并监听名为 `submit_topic` 的 topic。用户只需向该 topic 发送消息，即可触发指定的工作流。

以下是消息内容的示例：

```json
{"descriptor_id":"rillflowTest:kafkaTriggerTest","data":{},"callback":{},"uid":1234567,"resource_check":{"check_type":"skip"}}
```

参数具体含义如下：

- descriptor_id：触发执行的DAG图id
- data：工作流执行的全局上下文
- uid：可选参数，发起本次执行的用户uid
- callback：可选参数，用来定义工作流执行后的通知任务，参考：[提交工作流](01-execute.md)
- resource_check：可选参数，用来定义限流策略，参考：[过载保护](04-overflow.md)
