---
sidebar_position: 5
---

# 流程控制

Rill Flow 支持在流程运行过程中动态控制流程运行路径，类似于编程中的控制语句。

## 流程控制节点

流程控制节点包括以下几种类型：

### switch

`swicth` 节点用于在 DAG 图运行时，在多个后续任务中，根据条件选择执行某些任务，并跳过不符合条件的任务。

```yaml
workspace: default
dagName: switch
alias: release
type: flow
tasks:
  - name: caseA
    category: pass
  - name: caseB
    category: pass
  - name: caseC
    category: pass
  - name: switchTask
    switches:
      - next: caseA
        condition: $.input.[?(@.input == 0)]
      - next: caseB
        condition: $.input.[?(@.input == 5)]
      - next: caseC
        condition: $.input.[?(@.input == 10)]
    inputMappings:
      - source: $.context.input
        target: $.input.input
    category: switch
```


### foreach

`foreach` 节点用于循环执行一组子任务。`tasks` 字段定义了待执行的任务列表，通过可选的 `synchronization` 字段从任务列表中筛选出需执行的任务，并根据 `synchronization` 中定义的最大并发数进行并行执行。

循环执行的参数通过 `iterationMapping` 设置。其中 `iterationMapping.collection` 使用 JsonPath 格式定义了待循环的集合，`item` 定义了当前循环的元素名称。通过 `iterationMapping` 的定义，子任务中的参数映射可以获取对应的参数值。有关参数映射的更多信息，请参见：[参数映射](04-context-and-mapping.md)。

```yaml
category: foreach
name: A
inputMappings:
  - target: $.input.segments
    source: $.context.segments
synchronization:
  conditions:
    - $.input[?(@.signal == true)]
  maxConcurrency: 3
iterationMapping:
    collection: $.input.segments
    item: segmentUrl
outputMappings:
  - target: $.context.gopUrls
    source: $.output.sub_context.[*].gopUrl
tasks:
   - category: function
     resourceName: protocol://content
     pattern: task_async
     name: B1
     next: B2
     inputMappings:
        - target: $.input.segmentUrl
          source: $.context.segmentUrl
     outputMappings:
        - target: $.context.gopPath
          source: $.output.gopPath
   - category: function
     resourceName: protocol://content
     name: B2
     pattern: task_async
     inputMappings:
        - target: $.input.gopPath
          source: $.context.gopPath
     outputMappings:
        - target: $.context.gopUrl
          source: $.output.gopUrl
next: C
```

### paas

`pass` 是一个空任务。当执行到 `pass` 任务时，该任务会直接被设置为成功。

```yaml
category: pass
name: A
inputMappings:
  - target: $.input.url
    source: $.context.url
outputMappings:
  - target: $.context.segment.text
    source: $.context.text
next: B,C
```

### return

`return` 用于决定是否跳过后续节点。当执行到 `return` 任务时，会根据上下文（context）信息判断 `conditions` 条件，如果条件判断为真，则跳过后续所有节点，否则继续执行。

```yaml
category: return
name: A
inputMappings:
   - target: $.input.url
     source: $.context.url
   - target: $.input.text
     source: $.context.text
conditions:
  - $.input.[?(@.text == "aaa" && @.url == "bbb")]
next: B
```
