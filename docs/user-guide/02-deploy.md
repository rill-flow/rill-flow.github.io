---
sidebar_position: 2
---

# 部署说明

Rill Flow是一个分布式的流程编排和任务调度执行框架，支持单机部署和集群部署。

## 单机部署

Rill Flow可以在单机环境下部署，适用于开发、测试和调试。单机部署的具体方法请参考[快速开始文档](../getting-started/01-quickstart.md)。

## Kubernetes部署

### 安装Helm

开发者可以根据自己的环境需求，参考[Helm 安装指南](https://helm.sh/zh/docs/intro/install/)选择合适的安装方法。

### 部署Rill Flow

使用Helm命令一键将Rill Flow部署到Kubernetes集群：

```shell
helm repo add rill-flow https://rill-flow.github.io/rill-flow-helm-chart
helm upgrade --install rill-flow rill-flow/rill-flow -n=rill-flow --create-namespace
```

查看Rill Flow的部署情况，请执行以下命令：

```shell
kubectl get pod -n=rill-flow
```

以下是预期输出：

```txt
NAME                              READY   STATUS    RESTARTS      AGE
rill-flow-56b6f8ccbd-gml5n        1/1     Running   0             10m
rill-flow-cassandra-0             1/1     Running   0             9m55s
rill-flow-jaeger-df446445-89wsh   1/1     Running   0             10m
rill-flow-redis-master-0          1/1     Running   0             10m
rill-flow-ui-858bffb6c5-zhr2n     1/1     Running   0             10m
```

如果你的实际输出与预期输出相符，表示 Rill Flow 在Kubernetes集群上部署成功。

以上部署方式默认启动redis和trace组件，适用于开发测试环境，生产环境建议使用线上的redis和trace服务，可参考以下命令修改启动参数关闭redis和trace组件启动，同时替换为线上使用的redis及trace服务地址：

```shell
helm upgrade --install rill-flow rill-flow/rill-flow -n=rill-flow --create-namespace \
--set redis.enabled=false \
--set rillFlow.backend.env.rillFlowDescriptorRedisHost=${redis_host} \
--set rillFlow.backend.env.rillFlowDescriptorRedisPort=${redis_port} \
--set rillFlow.backend.env.rillFlowDefaultRedisHost=${redis_host} \
--set rillFlow.backend.env.rillFlowDefaultRedisPort=${redis_port} \
--set jaeger.enabled=false \
--set rillFlow.backend.env.rillFlowTraceEndpoint=${jaeger_endpoint} \
--set rillFlow.backend.env.rillFlowTraceQueryHost=${jaeger_query_server}
```

注释：
  
* `${redis_host}`和`${redis_port}`分别为生产环境Redis的IP和端口。
* `${jaeger_endpoint}`为Jaeger收集器地址。
* `${jaeger_query_server}`分别为Jaeger查询服务地址

helm部署Rill Flow常用参数说明如下：

| 参数名 | 默认值 | 说明 |
| --- | --- | --- |
|rillFlow.backend.env.rillFlowDescriptorRedisHost|rill-flow-redis-master(redis组件的k8s service地址)|储存流程图(DAG)信息的redis地址|
|rillFlow.backend.env.rillFlowDescriptorRedisPort|6379|储存流程图(DAG)信息的redis端口|
|rillFlow.backend.env.rillFlowDefaultRedisHost|rill-flow-redis-master(redis组件的k8s service地址)|储存Rill Flow 其他信息的redis地址|
|rillFlow.backend.env.rillFlowDefaultRedisPort|6379|储存Rill Flow 其他信息的redis端口|
|rillFlow.backend.env.rillFlowTraceEndpoint |http://rill-flow-jaeger-collector:4317 (jaeger collector组件的k8s service地址)|trace数据采集服务地址|
|rillFlow.backend.env.rillFlowTraceQueryHost|http://rill-flow-jaeger-query:16686(jaeger query组件的k8s service地址)|trace查询服务地址，供前端页面使用|
|rillFlow.ui.backendServer|http://rill-flow-service:8080 (Rill Flow后端服务的k8s service地址)|Rill Flow后端服务地址，供前端页面调用使用|
|redis.enable|true|部署Rill Flow服务是否启动redis|
|redis.auth.enabled|false|redis启动是否开启密码认证|
|jaeger.enabled|true|部署Rill Flow 是否启动jaeger组件|

详细参数说明请参考([value.yaml](https://github.com/rill-flow/rill-flow-helm-chart/blob/main/charts/rill-flow/values.yaml))

## Docker 部署

生产环境下，若有正式的Redis和Jaeger服务，可参考以下命令通过修改环境变量变更为线上地址：

```shell
docker run -d --name rill-flow -p 8080:8080 -e rill_flow_descriptor_redis_host=${redis_ip} -e rill_flow_descriptor_redis_port=${redis_port} -e rill_flow_default_redis_host=${redis_ip} -e rill_flow_default_redis_port=${redis_port} -e rill_flow_trace_query_host=${trace_server} -e rill_flow_callback_url=${callback_url}  weibocom/rill-flow:latest  && \
docker run -d --name rill-flow-ui -p 8088:80 -e BACKEND_SERVER=${backend_server}  weibocom/rill-flow-ui:latest 
```

注释：

* `${redis_ip}`和`${redis_port}`分别为生产环境Redis的IP和端口。
* `${trace_server}`为生产环境Jaeger查询地址。
* `${backend_server}`为Rill Flow生产环境的后端服务地址
* `${callback_url}`为Rill Flow生产环境的后端服务回调地址
