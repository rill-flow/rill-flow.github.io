---
sidebar_position: 1
---

# Trace
## 概述
Rill Flow作为一个高性能、可扩展的分布式流程编排系统，为了方便更好地查看和理解工作流各个节点的执行情况，项目引入Trace链路跟踪功能。基于[OpenTelemetry](https://opentelemetry.io/docs/)框架，采用javaagent探针无侵入方式实现，[Jaeger](https://www.jaegertracing.io/)作为OpenTelemetry的输出源。Rill Flow默认已开启Trace，Jaeger数据收集端口号默认4317，可视化界面端口号默认16686。

## 查看Trace
- 打开jaeger可视化界面
```curl
http://127.0.0.1:16686/search
```
## 自定义Trace
### jaeger数据收集端口修改
- 同步修改rill-flow环境变量OTEL_EXPORTER_OTLP_ENDPOINT中port的值
```
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4317
```

### jaeger可视化界面端口修改
- 同步修改rill-flow中application.properties文件中rill.flow.trace.exporter.port的值
```
rill.flow.trace.exporter.port=16686
```

### 隐藏组件在链路中的信息
- rill-flow添加如下环境变量，其中JEDIS可替换成其他组件名称，如HTTP，JDBC等
```
OTEL_INSTRUMENTATION_JEDIS_ENABLED=flase
```

