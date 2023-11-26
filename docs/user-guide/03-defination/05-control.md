---
sidebar_position: 5
---

# 流程控制

Rill Flow支持在流程运行过程中动态的控制流程运行路径（类似于代码中的控制语句）

## 流程控制节点

流程控制节点包含以下类型：

- choice
- foreach
- paas
- return

### choice

用来在 DAG 图运行时在多个子任务中选择某个子任务来执行。`tasks`字段定义了子任务组，`condition`的内容通过JsonPath的格式定义了该组子任务是否执行的条件。

```yaml
category: choice
name: A
inputMappings:
  - target: $.input.status
    source: $.context.status
  - target: $.input.path
    source: $.context.path
outputMappings:
  - target: $.context.path
    source: $.output.path
choices:
  - condition: $.input.[?(@.status == "succeed")]
    tasks: 
      - category: function
        resourceName: protocol://content
        pattern: task_async
        name: B1
        inputMappings:
           - target: $.input.path
             source: $.context.path
        outputMappings:
           - target: $.context.path
             source: $.output.path
  - condition: $.input.[?(@.status == "failed")]
    tasks: 
      - category: function
        resourceName: protocol://content
        pattern: task_async
        name: B2
        inputMappings:
           - target: $.input.path
             source: $.context.path
        outputMappings:
           - target: $.context.path
             source: $.output.path
next: C
```

### foreach

用来将一组子任务循环多次执行。

`tasks`字段定义了若干任务构成的待执行任务列表，通过`synchronization`（非必须）定义的条件在待执行任务列表中少选出需要执行的任务，按照`synchronization`（非必须）中定义的最大并发数并发执行。

循环执行的参数通过`iterationMapping`设置，`iterationMapping.collection`通过JsonPath格式定义了待循环集合，`item`定义了当前循环的元素名称，通过`iterationMapping`的定义，实现了子task中参数映射对应参数的获取，关于参数映射，可以参看：[参数映射](04-context-and-mapping.md)

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

空 task，当执行到 paas 任务时，任务直接被设置为成功。
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

是否跳过后续节点，当执行到 return 任务时，会根据 context 信息执行判断逻辑，检查conditions条件，若果判断逻辑执行为true，则跳过后续所有节点，否则继续执行。
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
