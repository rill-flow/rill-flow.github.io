---
sidebar_position: 3
---


# 执行器
## 概述 

Rill Flow 使用执行器概念，解耦了任务流程编排与任务执行节点。每个`task`节点通过`resourceName`属性绑定派发和执行器。派发器将任务的具体执行过程派发给执行器运行。

在调用执行器前，Rill Flow的派发器会通过`inputMappings`属性定义的映射规则准备执行器的调用参数，在执行器运行结束后，Rill Flow 会通过`outputMappings`属性定义的映射规则将执行器的运行结果映射回图的上下文存储。

> * 更多关于上下文和规则映射的内容可以参考[上下文与映射](context-and-mapping)

## 支持的执行器

### python

Rill Flow 提供 Python 执行器用户可以根据 SDK 自定义业务处理逻辑。

#### 打包

Rill Flow 提供 ，执行打包脚本打包 Python 执行器 docker 镜像。

#### 部署

修改 Rill Flow 提供执行器镜像版本，通过 K8s 命令将执行器部署在 K8s 集群上。

#### 调用

通过 Rill Flow 提供的 K8s Service 派发器来选择使用 Python 自定义执行器。