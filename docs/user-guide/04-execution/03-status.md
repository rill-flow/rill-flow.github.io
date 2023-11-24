---
sidebar_position: 3
---

# 执行状态

## 查询


- NOT_STARTED: 初始状态，创建DAG图时的状态
- READY：DagTraversal模块遍历到任务节点可执行时设置的状态
- RUNNING：任务节点正在执行时的状态
- SUCCEED：任务节点执行成功时的状态
- FAILED：任务节点执行失败时的状态
- SKIPPED：choiceTask condition计算为false，在执行完outputMappings后，Task属性tolerance值为true时设置为SKIPPED