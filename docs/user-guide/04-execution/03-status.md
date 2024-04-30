---
sidebar_position: 3
---

# 执行状态

## 任务状态

工作流提交运行后，任务会按照既定顺序依次执行。任务可能的状态有：

- `NOT_STARTED`：任务的初始状态，创建 DAG 图时的状态。
- `READY`：当 DagTraversal 模块遍历到任务节点且任务处于可执行状态时。
- `RUNNING`：任务节点正在执行中。
- `SUCCEED`：任务节点执行成功。
- `FAILED`：任务节点执行失败。
- `SKIPPED`：当执行 `outputMappings` 后，若 `choiceTask` 条件判断结果为 false 且任务的 `tolerance` 属性为 true 时，任务状态会被设置为 `SKIPPED`。

## 流程状态

工作流提交运行后，整体流程可能的状态包括：

- `NOT_STARTED`：未开始。
- `RUNNING`：正在执行中。
- `SUCCEED`：执行成功。
- `FAILED`：执行失败。

## API 查询

查询工作流执行情况的详细信息，请参考：[API 文档](../07-api.md#获取工作流执行情况)。

## 后台查询

详见[执行管理](../06-background/03-execution.md#执行详情查看)。
