---
sidebar_position: 7
---

# API 文档

## 重点API

### 创建工作流

- **URL**：/flow/bg/manage/descriptor/add_descriptor.json
- **请求方式**：POST
- **请求参数说明**：

    | 参数名称 | 必填 |  类型 | 说明 |
    |------|------|-------|------|
    | business_id  | 是 | String | 工作流业务ID |
    | feature_name  | 是 | String | 工作流服务名称 |
    | alias  | 是 | String | 工作流别名 |
    | descriptor  | 是 | String | 工作流YAML描述 |

- **descriptor参数示例**：

```yaml
version: 20230829         
workspace: demoFlowTest    
dagName: demoTest         
type: flow                
tasks:
  - category: function     
    name: startNode        
    next: endNode         
    resourceName: http://127.0.0.1:8080/flow/sample/start_node.json  
    pattern: task_sync     
    inputMappings:         
      - target: $.input.right
        source: $.context.right
      - target: $.input.left
        source: $.context.left
    outputMappings:       
      - target: $.context.result_number
        source: $.output.result_number
  - category: function
    name: endNode
    resourceName: http://127.0.0.1:8080/flow/sample/end_node.json
    pattern: task_sync
    inputMappings:
      - target: $.input.result_number
        source: $.context.result_number
      - target: $.input.expect_number
        source: $.context.result_number
```

- **返回结果**：

```txt
{
    "ret": true, // 创建成功：true，创建失败：false
    "descriptor_id": "" // 工作流ID
}
```

### 执行工作流

- **URL**：/flow/submit.json
- **请求方式**：POST
- **请求参数说明**：

  | 参数名称 | 必填 |  类型 | 说明 |
  |------|------|-------|------|
  | descriptor_id  | 是 | String | 工作流ID |
  | callback  | 否 | String | 执行完成后的回调地址 |
  | resource_check  | 否 | String | 资源检测规则 |
  | data  | 否 | JSONObject | 工作流执行的context信息 |

- **data参数示例**：

```txt
{"left": 512, "right": 512}
```

- **返回结果**：

```txt
{
    "execution_id": "" // 执行ID
}
```

### 任务完成回调

- **URL**：/flow/finish.json
- **请求方式**：POST
- **请求参数说明**：

  | 参数名称 | 必填 |  类型 | 说明 |
  |------|------|-------|------|
  | executionId  | 是 | String | 执行ID |
  | taskName  | 是 | String | 任务名称 |
  | result  | 否 | JSONObject | 工作流执行的context信息 |

- **result参数示例**：

```txt
{
  "result_type": "SUCCESS", // 任务执行结果：成功 - SUCCESS，失败 - FAIL
  "passthrough": {
    "execution_id": "882a5c3b-82be-4570-99f7-15bb2b1c0dce",
    "task_name": "A" // 完成的任务名称
  },
  "response": { // 需更新的上下文内容，outputMappings中使用
    "xxx": "xxx"
  }
}
```

- **返回结果**：

```txt
{
    "result": "ok" 
}
```

### 获取工作流执行情况

- **URL**：/flow/get.json
- **请求方式**：GET
- **请求参数说明**：

  | 参数名称 | 必填 |  类型 | 说明 |
  |------|------|-------|------|
  | execution_id  | 是 | String | 工作流执行ID |
  | brief  | 否 | boolean | 是否返回简略信息（true：只返回工作流本身执行情况，false：返回工作流及各节点执行情况） |

- **返回结果**：

```txt
{
    "ret": {
        "execution_id": "", // 工作流执行ID
        "dag_status": "RUNNING", // 工作流执行状态
        "process": 100, //

 工作流当前执行进度（100代表100%）
        "tasks": {  // brief为true时不返回tasks。tasks是以节点名称为key，节点信息为value的map结构
            "startNode": {
                "contains_sub": false, // 是否包含子节点
                "name": "startNode", // 节点名称
                "next": ["endNode"], // 下一个节点名称
                "status": "NOT_STARTED", // 节点状态
                "task": {    
                  "name": "startNode",
                  "next": "endNode",
                  "resourceName": "http://127.0.0.1:8080/flow/sample/start_node.json", 
                  "pattern": "task_sync", 
                  "inputMappings": [  // 输入映射规则
                    ...
                  ],
                  "outputMappings": [  // 输出映射规则
                    ...
                  ]
                }
            },
            "endNode": {
                ...
            }
        }
    }
}
```

## 其他API

项目已集成[Swagger2](https://swagger.io/)框架，完整接口描述可在服务启动后访问以下地址：

```txt
http://127.0.0.1:8080/swagger-ui.html
```
