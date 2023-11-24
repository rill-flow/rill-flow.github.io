---
sidebar_position: 4
---

# 上下文与参数映射

## 上下文

工作流执行时，Rill Flow会为每个正在执行的流程分配一块存储区域，每个图都有自己的上下文，不同流程实例之间的上下文无法共享。

用户可以在上下文中定义变量，这些变量可以在任务节点中传递使用，执行过程中可以对context进行变更(Rill
Flow保证了节点执行过程中对于上下文的读写不会产生并发问题)。

流程图在编排时通过约定的`$.context.xxx`方式进行取值传递，用户调用接口`/flow/submit.json`发起流程执行时，通过`request body`
将流程执行所需的上下文变量传入，任务执行过程中就可以按约定获取到相应上下文变量值。

## 参数映射

Rill Flow
使用YAML语言进行流程图描述，支持流程编排时进行参数映射，从而实现流程的动态化配置。在流程运行时，上下文变量会自动映射到任务节点执行所需的输入参数，同时将任务节点的执行结果更新到上下文变量中，传递给后续任务节点使用，因此Rill
Flow主要定义了三个类型`Map<String, Object>`的变量映射集，分别对应流程全局变量映射`contextMapping`
、任务执行输入参数`inputMapping`、任务执行输出结果`outputMapping`。

- `contextMapping`：上下文参数映射，用于存储整个任务流执行过程的所需的参数。
- `inputMapping`：输入参数映射，用于将上下文变量映射到任务节点的输入参数中。
- `outputMapping`：输出参数映射，用于将任务节点的执行结果映射到上下文变量中，传递给后续任务节点使用。

另外Rill Flow也支持通过`commonMapping`定义公共参数映射，通过`reference`属性引用公共参数映射，实现参数映射的复用。

Mapping参数映射相关属性的定义：

| 参数名       | 是否必须 | 类型      | 描述                                                                                                                                                                     |
|-----------|------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| source    | 是    | string  | 输入来源，以$开头则认为是 [JsonPath](https://github.com/json-path/JsonPath) 表达式，其他情况则认为是字符串常量                                                                                      |
| target    | 是    | string  | 任务执行时的输入参数，需为以$开头的JsonPath表达式                                                                                                                                          |
| tolerance | 否    | boolean | 设置为false表示不容忍错误 异常时将导致整个mapping错误, 未设置或为true表示可容忍 当mapping异常时将跳过该mapping规则                                                                                             |
| reference | 否    | string  | 引用`commonMapping`中公共参数映射                                                                                                                                               |
| transform | 否    | string  | 使用 [Aviator](https://github.com/killme2008/aviatorscript) 表达式，将mapping.source获取到的值转换后存到mapping.target；当前表达式只支持系统预定义的变量，包括：source(mapping.source)、context(当前任务的context) |

配置规则：通过inputMappings配置任务输入(context到input映射)，outputMappings配置任务输出(output到context映射)
，inputMappings/outputMappings值均为数组

```yaml
type: flow
dagName: sample_dag
commonMapping:
  commonInput:
    - target: $.input.user
      source: $.context.user
tasks:
  - name: A
    inputMappings:
      - target: $.input.url
        source: $.context.urlCon
      - target: $.input.text
        source: hello
      - reference: commonInput
    outputMappings:
      - target: $.context.segments
        source: $.output.segments
```