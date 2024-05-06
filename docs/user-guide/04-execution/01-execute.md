---
sidebar_position: 1
---

# 执行工作流

## 简介

在 Rill Flow 中创建工作流后，你将获得一个 `descriptorid`，它由三部分构成：业务ID（businessId）、DAG 图Id（featureId）和DAG 图别名（alias）。使用此 `descriptorid`，你可以提交工作流。

Rill Flow 中工作流的执行是异步的。系统为每个正在运行的工作流分配一个 `execution_id`，用户可以通过这个ID查询工作流的运行状态，并在完成后获取结果。

## 接口

使用 [/flow/submit.json](../07-api.md#执行工作流) 接口提交工作流任务。

## 触发器

Rill Flow 抽象了工作流的触发逻辑，支持多种触发方式，例如定时任务和消息队列触发。

## 后台提交

详见[执行管理](../06-background/03-execution.md#执行详情查看)。
