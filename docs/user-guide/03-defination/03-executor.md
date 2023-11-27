---
sidebar_position: 3
---


# 执行器

## 概述

Rill Flow 使用执行器（Executor）的概念，实现了任务流程编排与任务执行节点的解耦。每个 `task` 节点通过 `resourceName` 属性与派发器及执行器绑定。派发器负责将任务的具体执行过程委托给执行器。

在调用执行器之前，Rill Flow 的派发器会根据 `inputMappings` 属性定义的映射规则准备执行器的调用参数。执行器运行结束后，Rill Flow 通过 `outputMappings` 属性定义的映射规则，将执行器的运行结果映射回工作流的上下文。

> * 有关上下文和映射规则的更多信息，请参阅[上下文与映射](context-and-mapping)。

## 支持的执行器

### Python 执行器

Rill Flow 提供了 Python 执行器，用户可以利用 SDK 自定义业务处理逻辑。

#### 打包

用户可使用 Rill Flow 提供的打包脚本，打包 Python 执行器的 Docker 镜像。

#### 部署

用户需修改 Rill Flow 提供的执行器镜像版本，并通过 Kubernetes 命令将执行器部署在 Kubernetes 集群上。

#### 调用

使用 Rill Flow 提供的 Kubernetes Service 派发器，可以选择 Python 自定义执行器进行任务执行。
