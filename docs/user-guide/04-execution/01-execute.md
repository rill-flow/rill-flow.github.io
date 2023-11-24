---
sidebar_position: 1
---

# 执行工作流

## 简介

当你已经在 Rill Flow 中创建工作流后，你将得到工作流对应的 descriptorid，它由三部分构成：业务ID（businessId）、DAG 图Id（featureId）、DAG 图别名（alias）。

接下来，你就可以使用这张图，来提交工作流了。

在Rill Flow中，工作流的执行是异步的，系统会为运行中的每个工作流分配一个`execution_id`，用户可以通过该ID查询工作流的运行状态，并在执行完成后获取结果。

## 接口
通过[/flow/submit.json](/docs/user-guide/07-api.md#执行工作流)接口提交一个任务。

## 触发器

Rill Flow将流程的触发逻辑进行了抽象，如定时任务、消息队列触发等。

## 后台提交
// TODO