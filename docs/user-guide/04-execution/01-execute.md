---
sidebar_position: 1
---

# 执行工作流

## 简介

在 Rill Flow 中创建工作流后，你会获得一个与工作流相关的 `descriptorid`。这个 `descriptorid` 由三部分组成：业务ID（businessId）、DAG 图Id（featureId）、DAG 图别名（alias）。

有了这个 `descriptorid` 后，你就可以开始提交并执行工作流了。

在 Rill Flow 中，工作流的执行是异步的。系统会为每个正在运行的工作流分配一个唯一的 `execution_id`。用户可以利用这个 ID 来查询工作流的运行状态，并在执行完成后获取结果。

## 接口

使用 [/flow/submit.json](../07-api.md#执行工作流) 接口来提交工作流任务。

## 触发器

Rill Flow 对流程触发逻辑进行了抽象，支持多种触发方式，如定时任务、消息队列触发等。

## 后台提交

// TODO
