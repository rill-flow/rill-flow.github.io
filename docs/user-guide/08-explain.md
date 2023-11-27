---
sidebar_position: 8
---

# 名词解释
## 解释说明
为了方便工作流的管理和使用，我们将工作流抽象为三个层次：业务、服务、别名，分别对应以下接口参数：business_id、feature_name、alias。
- 业务（business_id）：业务是工作流的最高层级，代表着不同的业务领域或功能模块。每个业务可以包含多个服务。

- 服务（feature_name）：服务是业务层级的子级，表示特定业务下不同的功能或服务。一个业务可以包含多个服务，每个服务提供不同的功能。

- 别名（alias）：别名是服务层级的子级，用于标识服务的不同别名。一个服务下可以有多个别名，每个别名可能对应不同的配置。

通过这种抽象层次结构，我们可以更灵活地管理和使用工作流，根据具体的业务需求，针对不同的业务、服务和别名进行配置和操作。
## 规则示例

工作流唯一标识descriptor_id有两种构成规则：

- 基于yaml文件md5生成descriptor_id 

    ```
    business_id + ":" + feature_name + ":" + "md5_" + 由yaml生成的长度为32的md5字符串
    ```

    descriptor_id示例:
    ```
    demoFlowTest:demoTest:md5_4f1707841ad4413fff4afa9d53e526b4
    ```

- 基于流程别名生成descriptor_id(默认使用别名下最新的yaml版本)

    ```
    business_id + ":" + feature_name + ":" + alias
    ```

    descriptor_id示例:
    ```
    demoFlowTest:demoTest:sandbox
    ```

工作流执行唯一标识execution_id构成规则
```
business_id + ":" + feature_name + "_c_" + 根据时间戳生成的UUID，由"-"分隔，总长度为36
```
descriptor_id示例:
```
demoFlowTest:demoTest_c_0c0a9d5e-878b-11ee-9fe1-cfc95b641e41
```

