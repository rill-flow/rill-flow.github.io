---
sidebar_position: 1
---

# 快速开始

## 环境准备

首先，您需要安装好对应的依赖环境，以及工具：

- OSX/Linux环境
- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)


## 服务部署

```shell
cat << EOF > docker-compose.yaml
version: '3'
services:
  rill-flow:
    image: weibocom/rill-flow
    depends_on:
      - cache
      - jaeger
    links:
      - rill-flow-mysql
    ports:
      - "8080:8080"
    environment:
      - RILL_FLOW_DESCRIPTOR_REDIS_HOST=cache
      - RILL_FLOW_DEFAULT_REDIS_HOST=cache
      - RILL_FLOW_TRACE_ENDPOINT=http://jaeger:4317
      - RILL_FLOW_CALLBACK_URL=http://rill-flow:8080/flow/finish.json
      - RILL_FLOW_TRACE_QUERY_HOST=http://jaeger:16686
  rill-flow-mysql:
    image: mariadb:10.6.4-focal
    stdin_open: true
    tty: true
    container_name: rill-flow-mysql
    restart: always
    command: --init-file /data/application/init.sql --bind-address=0.0.0.0 --default-authentication-plugin=mysql_native_password
    volumes:
        - ./docker/init.sql:/data/application/init.sql
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=rill_flow
      - MYSQL_ROOT_HOST=%
  cache:
    image: redis:6.2-alpine
    restart: always
    command: redis-server --save 20 1 --loglevel warning
  jaeger:
    image: jaegertracing/all-in-one:1.39
    restart: always
    environment:
      - COLLECTOR_OTLP_ENABLED=true
  ui:
    image: weibocom/rill-flow-ui
    ports:
      - "8088:80"
    depends_on:
      - rill-flow
      - jaeger
    environment:
      - BACKEND_SERVER=http://rill-flow:8080
  sample-executor:
    image: weibocom/rill-flow-sample:sample-executor 
EOF
docker-compose up -d
```

## 验证安装

要查看 Rill Flow 的运行情况，请执行以下命令：

```shell
docker-compose ps
```

以下是预期输出：

```txt
     Name                    Command               State                                    Ports
----------------------------------------------------------------------------------------------------------------------------------
tmp_cache_1       docker-entrypoint.sh redis ...   Up      6379/tcp
tmp_jaeger_1      /go/bin/all-in-one-linux         Up      14250/tcp, 14268/tcp, 16686/tcp, 5775/udp, 5778/tcp, 6831/udp, 6832/udp
tmp_rill-flow_1   catalina.sh run                  Up      0.0.0.0:8080->8080/tcp
tmp_ui_1          /docker-entrypoint.sh /bin ...   Up      0.0.0.0:8088->80/tcp, 0.0.0.0:8089->8089/tcp
```

如果你的实际输出与预期输出相符，表示 Rill Flow 已经成功安装。

## 访问Rill Flow 管理后台

执行成功后，可通过 `http://localhost:8088` (admin/admin)访问 Rill Flow 管理后台。

## 提交任务

### 提交简单流程任务

- Step 1: 提交 YAML 文件定义的流程图

```ccURL
curl --location  --request POST 'http://127.0.0.1:8080/flow/bg/manage/descriptor/add_descriptor.json?business_id=rillFlowSimple&feature_name=greet&alias=release' \
--header 'Content-Type: text/plain' \
--data-raw '---
version: 1.0.0
workspace: rillFlowSimple
dagName: greet
type: flow
tasks:
  - category: function
    name: Bob 
    resourceName: http://sample-executor:8000/greet.json?user=Bob
    pattern: task_sync
    tolerance: false
    next: Alice
    inputMappings:
      - source: "$.context.Bob"
        target: "$.input.Bob"
  - category: function
    name: Alice 
    resourceName: http://sample-executor:8000/greet.json?user=Alice
    pattern: task_sync
    tolerance: false
    inputMappings:
      - source: "$.context.Alice"
        target: "$.input.Alice"
'
```

- Step 2: 提交流程图执行任务
  
```curl
curl -XPOST 'http://127.0.0.1:8080/flow/submit.json?descriptor_id=rillFlowSimple:greet'  -d '{"Bob":"Hello, I am Bob!", "Alice": "Hi, I am Alice"}' -H 'Content-Type:application/json'
```

## 查看结果

### 查看运行结果

- 打开Rill Flow管理后台查询执行详情

```cURL
http://127.0.0.1:8088/#/flow-instance/list
```

![示意图](/img/flow_sample.jpg)

> 更多关于查看结果的说明可以参考[执行状态](../user-guide/04-execution/03-status.md)

## 接下来

- 查看[更多示例](./02-sample.md)
- 查看[架构介绍](../user-guide/01-arch.md)
