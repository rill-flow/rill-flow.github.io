---
sidebar_position: 2
---

# 触发器

## 概述

触发器是一个工具，用于支持外部事件来触发 DAG 图的执行，进而提交工作流。有关提交工作流的基本信息，请参考：[提交工作流](01-execute.md)。

Rill Flow 支持以下类型的触发器：

- 定时触发器：用于按计划时间自动提交工作流。
- Kafka 消息触发器：通过向指定的 Kafka 主题发送消息来触发工作流的执行。

## 定时触发器

定时触发器允许用户设置周期性任务，系统将按预设的时间周期自动触发工作流提交。

### 提交定时触发任务

Rill Flow 提供了 HTTP 接口来提交定时触发任务：

- 接口 URI: `/flow/trigger/add_scheduler.json`
- 请求方式：POST
- 请求头 Content-Type：application/json
- GET 请求参数：
  - `cron`：Cron 表达式，如 `0 * * * * *` 表示每分钟执行一次。
  - `descriptor_id`：需要定时执行的 DAG 图的 ID。
  - `callback`：可选参数，用于定义工作流执行完毕后的通知任务，详见：[提交工作流](01-execute.md)。
- POST 请求体：执行 DAG 图所需的上下文信息。
- 返回数据：JSON 格式，例如 `{"code": 0, "data": {"task_id": 1}}`。
  - `code`：表示调用成功与否，0 表示成功，非 0 表示失败。
  - `task_id`：定时触发任务的 ID，用于后续管理。

#### 取消定时触发任务

提交定时触发任务后，系统将根据 `cron` 语句定义的周期自动提交工作流。若需要取消这些定时触发的任务，Rill Flow 提供了相应的 HTTP 接口：

- 接口 URI: `/flow/trigger/cancel_scheduler.json`
- 请求方式：POST
- 请求头 Content-Type：application/json
- GET 请求参数：
  - `task_id`：需要取消的定时触发任务的 ID。
- 返回数据：JSON 格式，例如 `{"code": 0, "data": {"task_id": 1, "result": true}}`。
  - `code`：表示调用成功与否，0 表示成功，非 0 表示失败。
  - `task_id`：传入的定时触发任务 ID。
  - `result`：取消任务是否成功。

## Kafka 触发器

Kafka 触发器允许通过 Kafka 消息来触发工作流提交。

Rill Flow 监听配置在本地 9092 端口的 Kafka 服务，并关注名为 `submit_topic` 的 topic。用户通过向此 topic 发送消息，即可触发特定工作流的执行。

消息内容示例：

```json
{"descriptor_id":"rillflowTest:kafkaTriggerTest","data":{},"callback":{},"uid":1234567,"resource_check":{"check_type":"skip"}}
```

参数说明：

- `descriptor_id`：需要触发执行的 DAG 图的 ID。
- `data`：工作流执行的全局上下文。
- `uid`：可选，发起执行的用户 ID。
- `callback`：可选，用于定义工作流执行后的通知任务，详见：[提交工作流](01-execute.md)。
- `resource_check`：可选，用于定义限流策略，详见：[过载保护](04-overflow.md)。
