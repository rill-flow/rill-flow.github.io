---
sidebar_position: 6
---

# 工作流引用

在 Rill Flow 中，可以在一个工作流的定义中引用另一个已经定义好的工作流。这样做可以实现流程的复用，并使另一个已定义好的工作流作为当前工作流的一个任务节点来执行。

例如，在一个 YAML 配置文件中，可以通过如下方式引用另一个工作流：

```yaml
type: flow
dagName: sample_dag
tasks:
  - name: A
    category: function
    resourceName: rillflow://descriptorId
```

在这里，`resourceName` 的协议部分为 `rillflow`，这表明 `resourceName` 指向另一个 DAG 图的 descriptorId。当指定的工作流执行完成或失败后，当前任务的状态将与该工作流的执行状态相同，即变为成功或失败。

这种引用机制使得工作流的复用变得简单高效，有助于提高工作流设计的灵活性和可维护性。
