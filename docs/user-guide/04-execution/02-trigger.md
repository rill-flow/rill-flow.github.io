---
sidebar_position: 2
---

# 触发器

## 概述

触发器是一个工具，用于支持外部事件来触发 DAG 图的执行，进而提交工作流。有关提交工作流的基本信息，请参考：[提交工作流](01-execute.md)。

Rill Flow 支持以下类型的触发器：

- 定时触发器：用于按计划时间自动提交工作流。
- Kafka 消息触发器：通过向指定的 Kafka 主题发送消息来触发工作流的执行。

# 触发器任务维护接口

Rill Flow 提供了通用的接口，来创建、删除及维护触发器任务。

## 创建触发器任务

用来创建指定类型的触发器的一个触发器任务。

### URI

/flow/trigger/add_trigger.json

### 调用方式

POST

### 参数

- Get 参数

| 参数名称       | 类型   | 是否必须 | 参数说明                                                     |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| type           | String | 是       | 触发器类型，取值为 kafka（kafka 消息触发器）或 cron（定时触发器） |
| descriptor_id  | String | 是       | 当前触发器任务触发执行的 DAG 图 id，参考：[执行工作流](01-execute.md) |
| callback       | String | 否       | 可选参数，用来定义工作流执行后的通知任务，参看：[执行工作流](01-execute.md) |
| resource_check | String | 否       | 可选参数，用于定义限流策略，参考：[过载保护](04-overflow.md) |

- Post 参数

Post 参数为 Json 格式字符串，因此调用 header 中的 Content-Type 参数须为 application/json。

Post 参数的具体格式由各触发器定义。

## 取消触发器任务

用于通过任务 id 取消指定类型的触发器任务。

### URI

/flow/trigger/cancel_trigger.json

### 调用方式

POST

### 参数

- Get 参数

| 参数名称 | 类型   | 是否必须 | 参数说明                                                     |
| -------- | ------ | -------- | ------------------------------------------------------------ |
| type     | String | 是       | 触发器类型，取值为 kafka（kafka 消息触发器）或 cron（定时触发器） |
| task_id  | String | 是       | 触发器任务 id，kafka 触发器为 topic#descriptor_id，cron 触发器为创建触发器任务时返回的 task_id 参数 |

## 查询触发器任务列表

用于通过任务 id 取消指定类型的触发器任务。

### URI

/flow/trigger/get_trigger_tasks.json

### 调用方式

GET

### 参数

| 参数名称 | 类型   | 是否必须 | 参数说明                                                     |
| -------- | ------ | -------- | ------------------------------------------------------------ |
| type     | String | 是       | 触发器类型，取值为 kafka（kafka 消息触发器）或 cron（定时触发器） |

### 返回参数

返回参数为 json 结构，包含三个参数：

- code：标识查询是否正确，0：正确，-1：错误；
- message：当 code 不为 0 时，用来返回具体的错误信息；
- data：任务详情，json 格式的 key-value 形式，具体见示例。

下面是一个返回参数的示例：

```json
{
  	"code": 0,
  	"data": {
        "submit_topic#weiboFaasFlowTest:openaiTask": {
            "descriptor_id": "RillFlowTest:openaiTask",
        }
    }
}
```

# 定时触发器

定时触发器允许用户设置周期性任务，系统将按预设的时间周期自动触发工作流提交。

## 创建定时触发任务

通过调用上文描述的“创建触发器任务”接口，传递 `type` 参数值为 cron，即可创建指定 DAG 图的定时执行。

当提交定时触发任务时，“创建触发器任务”接口的 POST 参数必须具备以下两个参数：

- `cron`：定时语句，如 0 * * * * * 表示每分钟执行一次
- `context`：DAG 图执行所需的上下文。

如：

```json
{
  "cron": "0 * * * * *",
  "context": {
    "message": "hello world"
  }
}
```

创建触发器任务执行后，会返回 json 格式的信息，如 `{"code": 0, "data": {"task_id": 1}}`

- `code`：用于标识是否调用成功，0：成功，非 0：失败。
- `task_id`：定时触发任务的 id，用于管理定时触发任务。

#### 取消定时触发任务

提交定时触发任务后，Rill Flow 会返回 `task_id` 参数，系统将根据 `cron` 语句定义的周期自动提交工作流。

通过将 `task_id` 参数以及 `type`: cron 参数调用取消触发器任务接口，即可取消该定时触发任务。

接口返回参数：json格式，`{"code":0, "data":{"task_id": 1, "result": true}}`
- `code`：用于标识是否调用成功，0：成功，非 0：失败
- `task_id`：传入的定时触发任务的 id
- `result`：是否成功取消

# kafka触发器

kafka 触发器用于支持通过 kafka 消息来触发工作流的提交。

## 创建 kafka 触发器任务

通过调用上文描述的“创建触发器任务”接口，传递 `type` 参数值为 kafka，即可创建指定 DAG 图的 kafka 消息触发执行任务。

当提交 kafka 触发任务时，“创建触发器任务”接口的 POST 参数必须具备 kafka_server、group_id、topic 参数，用来说明 consumer 的监听参数，如：

```json
{
  "kafka_server": "127.0.0.1:9200",
  "group_id": "rill-flow-group",
  "topic": "submit_topic"
}
```

## kafka 触发器任务的触发执行

成功执行创建 kafka 触发器任务后，消费者就开始监听指定的 topic，当 topic 中有消息到来时，Rill Flow 会自动以消息体作为 DAG 图执行的上下文信息，结合创建触发器任务时传递的 descriptor_id 等信息，触发 DAG 图的执行。

向 kafka 发送的消息须为 json 格式的 context 信息，如：

```json
{
  "message": "hello world"
}
```
