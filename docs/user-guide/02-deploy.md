---
sidebar_position: 2
---

# 部署说明

Rill Flow是一个分布式的流程编排和任务调度执行框架，支持单机部署和集群部署。

## 单机部署

Rill Flow可以在单机环境下部署，适用于开发、测试和调试。单机部署的具体方法请参考[快速开始文档](../getting-started/01-quickstart.md)。

## Kubernetes部署

### Helm

#### 安装Helm

开发者可以根据自己的环境需求，参考[Helm 安装指南](https://helm.sh/zh/docs/intro/install/)选择合适的安装方法。

#### 部署Rill Flow

使用Helm命令一键将Rill Flow部署到Kubernetes集群：

```shell
helm repo add rill-flow https://rill-flow.github.io/rill-flow-helm-chart
helm upgrade --install rill-flow rill-flow/rill-flow --namespace rill-flow --create-namespace
```

Rill Flow依赖于Redis和Jaeger组件。默认部署方式将在Rill Flow重启时丢失数据，仅适用于开发测试环境。生产环境应通过设置`env`变量或修改`values.yaml`文件配置持久化的Redis实例地址：

```shell
helm upgrade --install rill-flow rill-flow/rill-flow --namespace rill-flow --create-namespace --set redis.enabled=false --set rill_flow_descriptor_redis_host=${redis_host} --set rill_flow_default_redis_host=${redis_host} --set jaeger.enabled=false --set OTEL_EXPORTER_OTLP_ENDPOINT=${jaeger_endpoint} --set rill_flow_trace_exporter_ip=${jaeger_exporter_ip} --set rill_flow_trace_exporter_port=${jaeger_exporter_port}
```

注释：
  
* `${redis_host}`和`${redis_port}`分别为生产环境Redis的IP和端口。
* `${jaeger_endpoint}`为Jaeger收集器地址。
* `${jaeger_exporter_ip}`和`${jaeger_exporter_port}`分别为Jaeger查询服务的IP和端口。

## Docker 部署

若没有Redis环境，可以用以下命令部署Redis（仅适用于开发和测试环境）：

```shell
docker run -d --name rill-flow-redis -p 6379:6379 redis:latest
```

若需要开启Trace功能进行全链路跟踪，则需部署Jaeger组件，开发测试环境可用以下命令部署Jaeger：

```shell
docker run -d --name rill-flow-jaeger -p 16686:16686 -p 4317:4317 -e COLLECTOR_OTLP_ENABLED=true jaegertracing/all-in-one:latest
```

启动Rill Flow容器：

```shell
docker run -d --name rill-flow -p 8080:8080 weibocom/rill-flow:latest
```

生产环境下，若有正式的Redis和Jaeger服务，可通过环境变量设置线上地址：

```shell
docker run -d --name rill-flow -p 8080:8080 weibocom/rill-flow:latest -e rill_flow_descriptor_redis_host=${redis_ip} -e rill_flow_descriptor_redis_port=${redis_port} -e rill_flow_default_redis_host=${redis_ip} -e rill_flow_default_redis_port=${redis_port} -e rill.flow.trace.exporter.ip=${jaeger_ip} -e rill.flow.trace.exporter.port=${jaeger_port}
```

注释：

* `${redis_ip}`和`${redis_port}`分别为生产环境Redis的IP和端口。
* `${jaeger_ip}`和`${jaeger_port}`分别为生产环境Jaeger的IP和端口。
