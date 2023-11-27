---
sidebar_position: 4
---

# 上下文与参数映射

## 上下文

在 Rill Flow 工作流执行期间，系统为每个执行中的流程分配独立的存储区域，即“上下文”。每个工作流实例都有自己的上下文，且不同实例间的上下文是相互隔离的。

在上下文中定义的变量可在任务节点间传递和使用。在执行过程中，可以对上下文进行读写操作，Rill Flow 确保节点执行过程中的并发安全性。

在流程图的编排中，通过 `$.context.xxx` 的格式引用上下文变量。用户在调用 `/flow/submit.json` 接口发起流程执行时，可通过请求体传入所需的上下文变量，以便在任务执行过程中获取相应的值。

## 参数映射

Rill Flow 在执行流程中的每个任务时，会根据配置的映射规则，将上下文变量映射到任务节点所需的输入参数，并将执行结果更新回上下文，供后续任务使用。

Rill Flow 支持三种参数映射规则：

- `inputMapping`：输入参数映射，将上下文变量映射到任务节点的输入参数。
- `outputMapping`：输出参数映射，将任务节点的执行结果映射回上下文，供后续任务使用。
- `commonMapping`：公共参数映射，可通过 `reference` 属性引用，实现参数映射的复用。

![参数映射示意图](assets/context_mapping.svg)

在 Rill Flow 中，你可以为每个任务定义多个参数映射，每个映射需包含 `source` 和 `target` 属性，这两个属性都是 `string` 类型，并且内容为 [JsonPath](https://github.com/json-path/JsonPath) 表达式。这些表达式以 `$` 开头，可以引用以下内置变量：

- `$.context`：代表流程的上下文。
- `$.input`：代表某个任务的输入参数。
- `$.output`：代表某个任务的输出参数。

例如，若要将上下文中的 `foo` 属性映射到任务的 `bar` 参数，可定义如下映射规则：

```yaml
inputMappings:
  - source: $.context.foo
    target: $.input.bar
```

在这个例子中，如果流程上下文中 `foo` 的值为 `hello`，派发器在执行该任务时会生成以下 JSON 并传递给执行节点：

```json
{
  "bar": "hello"
}
```

你还可以定义具有两层结构的映射，Rill Flow 会自动创建 `map` 类型的中间结构，例如：

```yaml
inputMappings:
  - source: $.context.name
    target: $.input.user.name
```

如果 `$context.name="hello"`，则生成的 input 结构将为：

```json
{
  "user": {
    "name": "hello"
  }
}
```

> 注：Rill Flow 不支持自动创建超过两层的复杂结构。

在 Rill Flow 中，可以定义映射参数，用于在任务执行时进行上下文与输入输出参数之间的转换。映射参数具有以下属性：

| 参数名       | 必须 | 类型      | 描述                                                                                                                                                                     |
|-----------|----|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| source    | 是  | string  | 输入来源。如果以 `$` 开头，则视为 [JsonPath](https://github.com/json-path/JsonPath) 表达式；否则，视为字符串常量。                                                                                   |
| target    | 是  | string  | 输出参数的目标位置，必须为以 `$` 开头的 JsonPath 表达式。                                                                                                                              |
| tolerance | 否  | boolean | 错误容忍设置。false 表示不容忍错误，异常时会导致整个映射规则错误；未设置或 true 表示容忍错误，映射异常时将跳过该映射规则。                                                                           |
| reference | 否  | string  | 引用 `commonMapping` 中定义的公共参数映射。                                                                                                                                               |
| transform | 否  | string  | 使用 [Aviator](https://github.com/killme2008/aviatorscript) 表达式转换 `mapping.source` 获取到的值，然后存入 `mapping.target`。目前只支持预定义变量，包括：`source`（mapping.source）、`context`（当前任务的 context）。 |

配置规则：通过 `inputMappings` 配置任务输入（context 到 input 映射），通过 `outputMappings` 配置任务输出（output 到 context 映射）。`inputMappings` 和 `outputMappings` 的值均为数组。

示例配置：

```yaml
type: flow
dagName: sample_dag
commonMapping:
  commonInput:
    - source: $.context.user
      target: $.input.user
tasks:
  - name: A
    inputMappings:
      - source: $.context.urlCon
        target: $.input.url
      - source: "hello"
        target: $.input.text
      - reference: commonInput
    outputMappings:
      - source: $.output.segments
        target: $.context.segments
```
