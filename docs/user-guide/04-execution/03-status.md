---
sidebar_position: 3
---

# 执行状态

## 任务状态
工作流提交运行后会会按照定义顺序依次执行任务，任务有可能的状态包括：

- NOT_STARTED: 初始状态，创建DAG图时的状态
- READY：DagTraversal模块遍历到任务节点可执行时设置的状态
- RUNNING：任务节点正在执行时的状态
- SUCCEED：任务节点执行成功时的状态
- FAILED：任务节点执行失败时的状态
- SKIPPED：choiceTask condition计算为false，在执行完outputMappings后，Task属性tolerance值为true时设置为SKIPPED
 
## 流程状态
工作流提交运行后会会按照定义顺序依次执行任务，任务有可能的状态包括：

NOT_STARTED("not_started"),

- RUNNING: 执行中
- SUCCEED: 执行成功
- FAILED: 执行失败

## API查询
参考[API](../07-api.md#获取工作流执行情况)

## 后台查询
TODO