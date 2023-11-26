---
sidebar_position: 6
---

# 工作流引用

在一个工作流的定义中，可以引用另一个已经定义好的工作流，实现流程的复用，让另一个已定义好的工作流充当当前工作流的一个任务。

```yaml
type: flow
dagName: sample_dag
tasks:
  - name: A
    category: function
    resourceName: rillflow://descriptorId
```

resourceName的协议部分为 `rillflow`，说明了resourceName指向另一个DAG图的descriptorId，当指定的图执行完成或失败后，该任务的状态将与图的执行状态相同，变为成功或失败。