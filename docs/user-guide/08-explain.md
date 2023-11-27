---
sidebar_position: 8
---

# 名词解释

## 解释说明

本文档旨在解释工作流管理中使用的关键名词。工作流在我们的系统中被分为三个层次：业务、服务、别名，分别对应以下接口参数：`business_id`、`feature_name`、`alias`。

- **业务 (`business_id`)**：业务层代表不同的业务领域或功能模块，是工作流的最高层级。每个业务可以包含多个服务。

- **服务 (`feature_name`)**：服务层作为业务层的子集，表示特定业务下的不同功能或服务。一个业务可以包含多种服务，每个服务提供独特的功能。

- **别名 (`alias`)**：别名层是服务层的子集，用于识别服务的不同变体。一个服务可以有多个别名，每个别名可能对应不同的配置和使用场景。

通过这种层次结构，我们能够灵活管理和操作工作流，根据不同业务需求进行具体的配置和控制。

## 规则示例

**工作流唯一标识 (`descriptor_id`) 的构成规则**:

1. 基于YAML文件的MD5生成`descriptor_id`：

   ```txt
   business_id + ":" + feature_name + ":" + "md5_" + 由yaml生成的长度为32的md5字符串
   ```

   示例:

   ```txt
   demoFlowTest:demoTest:md5_4f1707841ad4413fff4afa9d53e526b4
   ```

2. 基于流程别名生成`descriptor_id`（默认使用别名下最新的YAML版本）：

   ```txt
   business_id + ":" + feature_name + ":" + alias
   ```

   示例:

   ```txt
   demoFlowTest:demoTest:sandbox
   ```

**工作流执行唯一标识 (`execution_id`) 的构成规则**:

```txt
business_id + ":" + feature_name + "_c_" + 根据时间戳生成的UUID，由"-"分隔，总长度为36
```

示例:

```txt
demoFlowTest:demoTest_c_0c0a9d5e-878b-11ee-9fe1-cfc95b641e41
```
