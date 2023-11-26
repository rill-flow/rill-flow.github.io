---
sidebar_position: 2
---

# 触发器

## 概述

触发器是用来支持外部事件触发 DAG 图执行，从而提交工作流的工具。对于提交工作流的基本信息，可以参看：[提交工作流](01-execute.md)

Rill Flow 提供了以下触发器：

- 定时触发器：用来实现定时提交工作流。
- kafka消息触发器：通过向指定的kafka topic发送消息，实现工作流的触发。

## 定时触发器

定时触发器支持用户提交执行任务，让系统以指定周期自动触发提交工作流。

#### 提交定时触发任务

Rill Flow提供了http接口用来提交定时触发任务：

- uri: /flow/trigger/add_scheduler.json
- 调用方式：POST
- Context-Type：application/json
- GET 参数：
  - `cron`：定时语句，如 0 * * * * * 表示每分钟执行一次
  - `descriptor_id`：需要定时执行的图id
  - `callback`：可选参数，用来定义工作流执行后的通知任务，参看：[提交工作流](01-execute.md)
- POST参数：图执行所需的上下文。
- 返回参数：json格式，如 `{"code": 0, "data": {"task_id": 1}}`
  - `code`：用于标识是否调用成功，0：成功，非 0：失败
  - `task_id`：定时触发任务的 id，用于管理定时触发任务

#### 取消定时触发任务

定时触发任务提交后，系统就会按照参数传入的`cron`语句定义的周期来定时提交工作流。

Rill Flow提供了http接口，用于取消定时触发任务：

- uri: /flow/trigger/cancel_scheduler.json
- 调用方式：POST
- Context-Type：application/json
- GET 参数：
  - task_id：定时触发任务的任务id
- 返回参数：json格式，`{"code":0, "data":{"task_id": 1, "result": true}}`
  - `code`：用于标识是否调用成功，0：成功，非 0：失败
  - `task_id`：传入的定时触发任务的 id
  - `result`：是否成功取消

## kafka触发器

kafka触发器用于支持通过kafka消息来触发工作流的提交。

Rill Flow监听了本地9092端口启动的kafka服务，并且监听了名为`submit_topic`的topic，用户只需向该topic发送消息，即可触发指定的工作流。

下面是一个消息内容的示例：

```json
{"descriptor_id":"rillflowTest:kafkaTriggerTest","data":{},"callback":{},"uid":1234567}
```

参数具体含义如下：

- descriptor_id：触发执行的DAG图id
- data：工作流执行的全局上下文
- uid：可选参数，发起本次执行的用户uid
- callback：可选参数，用来定义工作流执行后的通知任务，参看：[提交工作流](01-execute.md)
