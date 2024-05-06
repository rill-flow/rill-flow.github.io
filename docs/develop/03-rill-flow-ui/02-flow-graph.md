# 流程编辑工具

## 项目介绍
Flow Graph 前端基于 [Vue3](https://v3.vuejs.org/) 和 [图编辑引擎 x6](https://x6.antv.antgroup.com/) 开发。提供工作流的编辑和工作流执行详情查看功能。

## 集成到其他应用
参考[QianKun快速上手](https://qiankun.umijs.org/zh/guide)模块进行接入。

### 常见问题

#### 1. 主应用集成后，系统整体样式异常。
这是由于主应用和微应用样式冲突造成的，需要主应用和微应用样式隔离。可以使用[postcss-plugin-namespace](https://www.npmjs.com/package/postcss-plugin-namespace)插件进行样式隔离。

具体步骤如下：
- 安装[postcss-plugin-namespace](https://www.npmjs.com/package/postcss-plugin-namespace)插件
- 以VUE项目为主应用的集成为例进行配置
   - 将项目根目录下，将`index.html`的`html`标签中增加`id={app-name}`，详情可参考[rill-flow-ui项目的index.html](https://github.com/weibocom/rill-flow/blob/main/rill-flow-ui/index.html)文件。
   - 配置`postcss.config.js`文件，详情可参考[rill-flow-ui项目的postcss.config.js](https://github.com/weibocom/rill-flow/blob/main/rill-flow-ui/postcss.config.js)文件。




