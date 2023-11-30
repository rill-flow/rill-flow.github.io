---
sidebar_position: 8
---

# 名词解释

## 关键名词说明

本文档旨在阐明工作流管理中所用到的核心名词。在我们的系统中，工作流被划分为三个层次：业务层、服务层、别名层，它们分别对应以下接口参数：`business_id`、`feature_name`、`alias`。

- **业务 (`business_id`)**：业务层代表了不同的业务领域或功能模块，是工作流中最高的层级。每个业务领域可以包括多个服务。

- **服务 (`feature_name`)**：服务层是业务层的子集，指代特定业务领域下的各种功能或服务。一个业务领域内可以有多个不同的服务，每个服务提供其独特的功能。

- **别名 (`alias`)**：别名层属于服务层的子集，主要用于标识服务的不同版本或变体。一个服务可能有多个别名，每个别名可能代表不同的配置或使用场景。

这种层次结构使我们能够灵活地管理和操作工作流，根据不同的业务需求进行详细的配置和控制。

## 规则示例

### 工作流唯一标识 (`descriptor_id`) 的生成规则

1. **基于YAML文件MD5的生成方式**：

   格式:

   ```txt
   business_id + ":" + feature_name + ":" + "md5_" + 由yaml文件生成的32位md5字符串
   ```

   示例:

   ```txt
   demoFlowTest:demoTest:md5_4f1707841ad4413fff4afa9d53e526b4
   ```

2. **基于流程别名的生成方式**（默认使用别名下最新的YAML版本）：

   格式:

   ```txt
   business_id + ":" + feature_name + ":" + alias
   ```

   示例:

   ```txt
   demoFlowTest:demoTest:sandbox
   ```

### 工作流执行唯一标识 (`execution_id`) 的生成规则

格式:

```txt
business_id + ":" + feature_name + "_c_" + 基于时间戳生成的36位UUID
```

示例:

```txt
demoFlowTest:demoTest_c_0c0a9d5e-878b-11ee-9fe1-cfc95b641e41
```
