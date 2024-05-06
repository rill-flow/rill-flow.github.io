---
sidebar_position: 1
---

# 环境准备

## Rill-Flow后台管理系统
Rill-Flow 项目为项目的后台管理系统，其中工作流编辑为了多系统间复用，使用微前端框架[QianKun](https://qiankun.umijs.org/zh/guide)进行搭建，因此开发时需要分开启动。

### 安装node环境
- 安装 node 版本管理工具[nvm](https://github.com/nvm-sh/nvm)

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

- 安装版本为 v18.19.0 的 node，并设定为全局默认版本

```shell
nvm install v18.19.0
nvm alias default v18.19.0
```

### rill-flow-ui启动
> 该项目为后台管理系统的主应用。
基于 [Vue vben admin](https://github.com/vbenjs/vue-vben-admin) 开发。

> 若需要本地开发调试前端项目，则可以按照以下方式进行操作。
- 下载[Rill Flow源码](https://github.com/weibocom/rill-flow)，并打开 `rill-flow-ui`目录，执行以下命令安装依赖。
- 安装pnpm

```shell
npm install -g pnpm --registry=https://registry.npmmirror.com
```

- 安装依赖
```bash
pnpm install

```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build:prod
```

### flow-graph启动
> 该项目为工作流流程编排的功能。 以微应用的形式 集成到Rill Flow中。

Flow Graph 前端基于 [Vue3](https://v3.vuejs.org/) 和 [图编辑引擎 x6](https://x6.antv.antgroup.com/) 开发
> 若需要本地开发调试前端项目，则可以按照以下方式进行操作。
- 下载[Rill Flow源码](https://github.com/weibocom/rill-flow)，并打开 `flow-graph`目录，执行以下命令安装依赖。

- 安装依赖
```bash
cd flow-graph

pnpm install

```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build:prod
```
