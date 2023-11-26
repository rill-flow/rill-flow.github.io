---
sidebar_position: 4
---

# 改进文档

## 概述

* 文档地址为[https://rill-flow.github.io](https://rill-flow.github.io)
* Rill Flow基于 [Docusaurus](http://docusaurus.io) 组织项目文档
* 文档项目托管在 [https://github.com/rill-flow/rill-flow.github.io](https://github.com/rill-flow/rill-flow.github.io)
* 文档的多语言翻译项目托管在 [https://crowdin.com/project/rill-flow](https://crowdin.com/project/rill-flow)
* 项目主页使用[Github Pages](https://pages.github.com)托管
* 文档插图使用[draw.io](https://draw.io)绘制

更新文档或翻译内容后，文档Github项目将执行Github Action流程：
* 与`Crowdin`项目同步，获取多语言翻译内容
* 通过`Docusaurus`构建静态页面
* 将静态内容提交至gh-pages分支，并部署至Github Pages

## 在线编辑文档

如果仅进行小规模更新，可以点击文档页面下方 `编辑此页` 链接，跳转到对应编辑页面进行操作。

## 离线编辑文档
### 项目结构
```
├── docs   //文档目录
├── src    //页面目录
└── static //静态资源
```

### 本地预览
```
yarn start
```

> 更多信息请参考[Docusaurus](http://docusaurus.io)

## 多语言

项目使用[Crowdin](https://crowdin.com)进行多语言管理，目前多语言版本包含：

* English

### 改进翻译

在[https://crowdin.com/project/rill-flow](https://crowdin.com/project/rill-flow)项目中进行翻译和校对。

> 更多信息请参考[Crowdin](https://crowdin.com)