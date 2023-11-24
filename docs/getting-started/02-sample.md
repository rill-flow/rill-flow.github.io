---
sidebar_position: 2
---

# 示例

## 简单流程示例

### 1. choice 逻辑节点示例

#### choice.yaml 示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: choiceDemo
tasks:
  - category: choice
    name: A
    inputMappings:
      - target: $.input.status
        source: $.context.status
      - target: $.input.left
        source: $.context.left
      - target: $.input.right
        source: $.context.right
    outputMappings:
      - target: $.context.left
        source: $.output.left
      - target: $.context.right
        source: $.output.right
    choices:
      - condition: $.input.[?(@.status == "succeed")]
        tasks:
          - category: function
            name: B1
            resourceName: http://127.0.0.1:8080/flow/sample/start_node.json
            pattern: task_sync
            tolerance: false
            inputMappings:
              - target: $.input.left
                source: $.context.left
              - target: $.input.right
                source: $.context.right
            outputMappings:
              - target: $.context.result_number
                source: $.output.result_number
      - condition: $.input.[?(@.status == "failed")]
        tasks:
          - category: function
            name: B2
            resourceName: http://127.0.0.1:8080/flow/sample/end_node.json
            pattern: task_sync
            tolerance: false
            inputMappings:
              - target: $.input.result_number
                source: $.context.result_number
              - target: $.input.expect_number
                source: 1024
```

#### 提交choice.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=choiceDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $choice.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "status": "succeed",
    "left": 512,
    "right": 512,
    "result_number": 1024
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 2. foreach 逻辑节点示例

#### foreach.yaml示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: foreachDemo
tasks:
  - category: foreach
    name: foreachNode
    synchronization:
      conditions:
        - $.input[?(@.signal == true)]
      maxConcurrency: 3
    iterationMapping:
      collection: $.input.segments
      item: segmentUrl
    inputMappings:
      - target: $.input.segments
        source: $.context.segments
    outputMappings:
      - target: $.context.gopUrls
        source: $.output.sub_context.[*].gopUrl
    tasks:
      - category: function
        name: B1
        resourceName: http://127.0.0.1:8080/flow/sample/foreach_segment_url.json
        pattern: task_sync
        inputMappings:
          - target: $.input.segmentUrl
            source: $.context.segmentUrl
        outputMappings:
          - target: $.context.gopPath
            source: $.output.gopPath
        next: B2
      - category: function
        name: B2
        resourceName: http://127.0.0.1:8080/flow/sample/foreach_gop_path.json
        pattern: task_sync
        inputMappings:
          - target: $.input.gopPath
            source: $.context.gopPath
        outputMappings:
          - target: $.context.gopUrl
            source: $.output.gopUrl
```

#### 提交foreach.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=foreachDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $foreach.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "segments": [
        "http://rillflow.github.com/video_segment_1.ts",
        "http://rillflow.github.com/video_segment_2.ts",
        "http://rillflow.github.com/video_segment_3.ts"
    ]
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 3. pass 逻辑节点示例

#### pass.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: passDemo
tasks:
  - category: pass
    name: A
    inputMappings:
      - target: $.input.url
        source: $.context.url
    outputMappings:
      - target: $.context.segment.text
        source: $.context.text
    next: B,C
```

#### 提交foreach.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=passDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $pass.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "url": "http://rillflow.github.com/video_segment_1.ts"
}'
```
#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 4. return 逻辑节点示例 

#### return.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: returnDemo
tasks:
  - category: return
    name: A
    inputMappings:
      - target: $.input.url
        source: $.context.url
      - target: $.input.text
        source: $.context.text
    conditions:
      - $.input.[?(@.text == "aaa" && @.url == "bbb")]
    next: B
  - category: function
    name: B
    pattern: task_sync
    resourceName: http://127.0.0.1:8080/flow/sample/start_node.json
    inputMappings:
      - target: $.input.url
        source: $.context.url
    outputMappings:
      - target: $.context.segment.text
        source: $.context.text
```

#### 提交pass.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=returnDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $pass.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "text": "aaa",
    "url": "bbb"
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 5. suspense 逻辑节点示例
#### suspense.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: suspenseDemo
tasks:
  - category: suspense
    name: A
    timeline:
      timeoutInSeconds: 10
      suspenseTimestamp: 1640918368382
      suspenseIntervalSeconds: 3
    inputMappings:
      - target: $.input.url
        source: $.context.url
    outputMappings:
      - target: $.context.segments
        source: $.output.segments
    conditions:
      - $.input.[?(@.url)]
    interruptions:
      - $.input.[?(@.url == "url")]
  - category: function
    name: B1
    resourceName: http://127.0.0.1:8080/flow/sample/foreach_segment_url.json
    pattern: task_sync
    inputMappings:
      - target: $.input.segmentUrl
        source: $.context.segmentUrl
    outputMappings:
      - target: $.context.gopPath
        source: $.output.gopPath
```

#### 提交suspense.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=suspenseDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $suspense.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "segment_url": "bbb"
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 6. 子图节点示例

#### subFlow.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: subFlowDemo
tasks:
  - category: function
    pattern: task_sync
    name: A
    resourceName: rillflow://rillFlow:returnDemo
    inputMappings:
      - target: $.input.url
        source: $.context.url
      - target: $.input.text
        source: $.context.text
```

#### 提交subFlow.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=subFlowDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $subFlow.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "segment_url": "bbb"
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 7. 资源灰度管理示例

#### 添加资源灰度管理
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/modify_function_ab.json?add=true&business_id=rillFlow&config_key=rillFlowDemoConfigKey&resource_name=rillflow%3A%2F%2FrillFlow%3AabDemo&ab_rule=default' \
--header 'Content-Type: application/json' \
--data '{}'
```
#### ab.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: abDemo
tasks:
  - category: function
    name: A
    resourceName: ab://rillFlow:abDemo
    pattern: task_sync
    inputMappings:
      - target: $.input.url
        source: $.context.url
      - target: $.input.text
        source: $.context.text
    conditions:
      - $.input.[?(@.text == "aaa" && @.url == "bbb")]
```

#### 提交ab.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=abDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $ab.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "segment_url": "bbb"
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

### 8. aviator表达式示例

#### 添加ab资源灰度管理
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/modify_function_ab.json?add=true&business_id=rillFlow&config_key=rillFlowDemoConfigKey&resource_name=rillflow%3A%2F%2FrillFlow%3AabDemo&ab_rule=rand(100)%20%3C%2010' \
--header 'Content-Type: application/json' \
--data '{}'
```

#### aviator.yaml图示例
```yaml
version: 0.0.1
type: flow
workspace: rillFlow
dagName: aviatorDemo
tasks:
  - category: function
    name: A
    resourceName: ab://rillFlow:abDemo
    keyExp: "rand(100) < 10"
    pattern: task_sync
    inputMappings:
      - target: $.input.url
        source: $.context.url
      - target: $.input.text
        source: $.context.text
    conditions:
      - $.input.[?(@.text == "aaa" && @.url == "bbb")]
```

#### 提交aviator.yaml流程
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlow&feature_name=aviatorDemo&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw $aviator.yaml
```

#### 提交任务
```cURL
curl --location 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=$descriptor_id' \
--header 'Content-Type: application/json' \
--data '{
    "segment_url": "bbb"
}'
```

#### 查看运行结果
- 打开 Rill Flow [管理后台](http://127.0.0.1:8080/)查看任务执行详情

#### 注：参考资料 [aviator表达式](https://code.google.com/archive/p/aviator/)


## AIGC流程示例
该流程将调用阿里云通义千问服务，将一段简单的文本翻译成英文，最终执行中英文的文本合并。

### Step 1: 更新定义文件中的ApiKey
#### aliyun_ai.yaml
```yaml
version: "1.0.0"
workspace: "rillFlowAliyunAiSample"
dagName: "aiTask"
type: "flow"
tasks:
  - category: "function"
    name: "openaiNode"
    resourceName: "aliyun_ai://"
    pattern: "task_sync"
    inputMappings:
      - source: "$.context.ai_message"
        target: "$.input.ai_message"
    outputMappings:
      - source: "$.output.result"
        target: "$.context.response"
    resourceProtocol: "aliyun_ai"
    parameters: "{\"apikey\":\"${apikey}\"}"
    next: "translateChi,translateEng"
  - category: "function"
    name: "translateChi"
    resourceName: "aliyun_ai://"
    pattern: "task_sync"
    inputMappings:
      - source: "$.context.response"
        target: "$.input.ai_message"
    outputMappings:
      - source: "$.output.result"
        target: "$.context.chi_response"
    resourceProtocol: "aliyun_ai"
    parameters: "{\"operate\":\"翻译成中文\",\"apikey\":\"${apikey}\"}"
    next: "mergeNode"
  - category: "function"
    name: "translateEng"
    resourceName: "aliyun_ai://"
    pattern: "task_sync"
    inputMappings:
      - source: "$.context.response"
        target: "$.input.ai_message"
    outputMappings:
      - source: "$.output.result"
        target: "$.context.eng_response"
    resourceProtocol: "aliyun_ai"
    parameters: "{\"operate\":\"translate to English\",\"apikey\":\"${apikey}\"}"
    next: "mergeNode"
  - category: "function"
    name: "mergeNode"
    resourceName: "http://127.0.0.1:8080/flow/sample/merge_text.json"
    pattern: "task_sync"
    inputMappings:
      - source: "$.context.chi_response"
        target: "$.input.first_text"
      - source: "$.context.eng_response"
        target: "$.input.second_text"
    outputMappings:
      - source: "$.context.result"
        target: "$.context.result"'
```

### Step 2: 提交 YAML 文件定义的流程图

- 提交流程图的 YAML 定义：
```cURL
curl --location 'http://127.0.0.1:8080/flow/bg/add_descriptor.json' \
--header 'Content-Type: text/plain' \
--data $aliyun_ai.yaml
```

> 更多关于YAML定义的介绍，请参考[工作流定义](../user-guide/03-defination/01-flow.md)

### Step 3: 提交流程图执行任务
- 提交流程图执行任务：
```cURL
curl -XPOST 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=rillFlowAliyunAiSample:aiTask' 
-d '{"openai_message":"'你是谁?'"}' 
-H'Content-Type:application/json'
```
> 更多关于流程图执行的介绍，请参考[工作流执行](../user-guide/04-execution/01-execute.md)