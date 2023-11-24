---
sidebar_position: 1
---
# 架构介绍

## 系统架构图

![架构图](assets/flow_arch.png)

## 架构说明

Rill Flow是一个基于DAG的流程编排和任务执行框架，主要由流程编排、流程触发和任务执行三个功能版块组成。

- 流程触发：Rill Flow支持多种触发方式，包括定时任务触发、消息事件触发、API接口触发，用户可以根据实际需求选择触发方式。
- 流程编排：Rill Flow支持可视化和Yaml编辑两种流程图编排方式，用户可以轻松地定义和管理业务流程。
- 任务执行：Rill Flow支持多种任务执行器调度，包括HTTP、Servless Function、GPT接口、自定义扩展执行器、远程执行器等，用户可以根据实际需求定制任务执行器。

## 核心模块

- DagParser：DAG图解析器，负责解析用户定义的DAG图，生成可执行的任务流。
- DagTravelsal：DAG图遍历器，负责遍历DAG图选择当前可执行的任务节点。
- TaskDispatcher：任务执行器调度，负责将可执行的任务节点，调度至匹配的任务执行器中执行。