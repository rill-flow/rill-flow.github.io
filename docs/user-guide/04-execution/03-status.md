---
sidebar_position: 3
---

# 执行状态

## 任务状态

在工作流提交运行后，任务会按照定义的顺序依次执行。任务可能的状态包括：

- `NOT_STARTED`：初始状态，创建 DAG 图时的状态。
- `READY`：当 DagTraversal 模块遍历到任务节点且任务可执行时的状态。
- `RUNNING`：任务节点正在执行时的状态。
- `SUCCEED`：任务节点执行成功时的状态。
- `FAILED`：任务节点执行失败时的状态。
- `SKIPPED`：在执行完 `outputMappings` 后，如果 `choiceTask` 条件计算结果为 false 且任务的 `tolerance` 属性值为 true，则状态设置为 `SKIPPED`。

## 流程状态

工作流提交运行后，根据任务的执行情况，工作流整体可能的状态包括：

- `NOT_STARTED`：未开始。
- `RUNNING`：执行中。
- `SUCCEED`：执行成功。
- `FAILED`：执行失败。

## API 查询

工作流执行情况的查询可以参考：[API 文档](../07-api.md#获取工作流执行情况)。

## 后台查询

TODO
