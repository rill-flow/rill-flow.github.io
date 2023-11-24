---
sidebar_position: 1
---

# 环境准备
基于 [Vue vben admin](https://github.com/vbenjs/vue-vben-admin) 和[图编辑引擎 X6](https://x6.antv.antgroup.com/) 开发。

> 若需要本地开发调试前端项目，则可以按照以下方式进行操作。
- 下载[Rill Flow源码](https://github.com/weibocom/rill-flow)
- 安装 node 版本管理工具[nvm](https://github.com/nvm-sh/nvm)

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

- 安装版本为 v16.20.2 的 node，并设定为全局默认版本

```shell
nvm install v16.20.2
nvm alias default v16.20.2
```

- 安装pnpm

```shell
npm install -g pnpm --registry=https://registry.npmmirror.com
```

- 安装依赖
```bash
cd rill-flow-ui

pnpm install

```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build
```

