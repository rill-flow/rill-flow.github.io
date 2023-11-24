---
sidebar_position: 2
---

# 部署说明

Rill Flow 是一个分布式的流程编排及任务调度执行框架，支持单机部署和集群部署。

## 单机部署

Rill Flow 可以部署在单机上，用于开发、测试、调试等场景，部署方式参考[QuickStart文档](../getting-started/01-quickstart.md)。

## Kubernetes部署

### Helm

#### 安装Helm

开发者可根据实际环境参考[Helm 安装](https://helm.sh/zh/docs/intro/install/)选择合适的安装方式。

#### 部署Rill Flow

使用 Helm 一键部署 Rill Flow 到Kubernetes集群上：

```shell
helm install https://weibocom.github.io/rill-flow-helm-chart . -n rill-flow
```

Rill Flow依赖redis和jaeger组件，启动时会默认创建redis及jaeger实例Pod，默认启动方式在Rill Flow部署重启时会丢失数据，仅供开发测试使用，生产环境可通过指定`env`变量或者修改`values.yaml`文件配置持久化redis实例地址。

```shell
helm install -n=rill-flow rill-flow ./ --set redis.enabled=false --set rill_flow_descriptor_redis_host=${redis_host} --set rill_flow_default_redis_host=${redis_host} --set jaeger.enabled=false --set OTEL_EXPORTER_OTLP_ENDPOINT=${jaeger_endpoint} --set rill_flow_trace_exporter_ip=${jaeger_exporter_ip} --set rill_flow_trace_exporter_port=${jaeger_exporter_port}
```

注：
  
* `${redis_ip}` `redis_port`分别为正式环境的`redis` ip和端口
* `${jaeger_endpoint}`为 `jaeger-collector`地址
* `${jaeger_exporter_ip}` `jaeger_exporter_port`分别为 `jaeger-query`的ip和端口

## Docker 部署

Rill Flow 依赖 Redis 组件，若没有redis环境，可通过以下命令先部署redis环境（仅用于开发测试，生产环境建议正式的redis）：

```shell
docker run -d --name rill-flow-redis -p 6379:6379 redis:latest
```

另外 Rill Flow 支持 Trace 功能进行全链路跟踪，若需要开启 Trace 功能，则需要部署 Jaeger 组件，和 redis组件一样， 开发测试环境可通过以下命令部署 Jaeger 组件：

```shell
docker run -d --name rill-flow-jaeger -p 16686:16686 -p 4317:4317 -e COLLECTOR_OTLP_ENABLED=true jaegertracing/all-in-one:latest
```

然后启动 Rill Flow 容器：

```shell
docker run -d --name rill-flow -p 8080:8080 weibocom/rill-flow:latest
```

生产环境下若有正式的redis和jaeger组件服务，则通过环境变量修改为线上地址即可：

```shell
docker run -d --name rill-flow -p 8080:8080 weibocom/rill-flow:latest -e rill_flow_descriptor_redis_host=${redis_ip} -e rill_flow_descriptor_redis_port=${redis_port} -e rill_flow_default_redis_host=${redis_ip} -e rill_flow_default_redis_port=${redis_port} -e rill.flow.trace.exporter.ip=${jaeger_ip} -e rill.flow.trace.exporter.port=${jaeger_port}
```

注：

* `${redis_ip}` `redis_port`分别为正式环境的redis ip和端口
* `${jaeger_ip}` `jaeger_port`分别为正式环境的jaeger ip和端口
