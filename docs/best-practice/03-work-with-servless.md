# 对接Serverless服务

Serverless能够做到业务按需使用、按量计费，同时，由于函数独立部署、轻量化的特性，在实际业务落地时需要很多“胶水代码”，串联不同的函数逻辑。

Rill Flow支持常见的流程控制语句，能够很好的充当“胶水代码”，实现低代码编排Serverless。

## 流程控制
Rill Flow中支持条件、循环、跳转等逻辑的流程控制节点，通过流程控制节点可以实现基本业务逻控制辑及表达式求值，详情可以参考[流程控制](../user-guide/03-defination/05-control.md)

## 对接到Serverless网关
TODO