# 自定义执行器
## 概述

Rill Flow大部分执行操作被封装在执行器中，在实践中，我们会根据待执行的实际执行功能使用python、java或go语言实现执行器http接口协议，接收并处理任务（也可以通过派发器扩展点扩展其他派发协议）。

![invoke executor](assets/invoke-executor.svg)

### 执行器与ResourceName
在定义任务时，任务可以通过`ResourceName`字段绑定到不同的派发和执行器，一个典型的`ResourceName`类似：

```ignorelang
http://sample-service/do_something
```

ResourceName的设计借鉴了URI的设计规范，在上面的例子里,`http`约定了派发器的名称，`sample-service`对应着部署的单元，`do_somethin`对应具体功能，调用相关的参数使用`body`传递。

如果你实现了自己的派发器，比如基于motan框架派发RPC请求，那么`ResourceName`可能会变成这样：

```ignorelang
motan://group_name/service_name
```

在实践中，也可以完全将`ResourceName`等同于`HTTP`协议，将`Executor`作为一个`HTTP`服务器进行开发和部署。

### 微服务执行器
在Rill Flow的设计中，执行器被尽可能设计成与Rill Flow的编排组件解耦的通用组件，两者之间仅通过派发和回调协议进行交互。我们没有直接引入“万能执行器”，而是仅约定了派发器-执行器间的协议。

在实践中，不同的任务可能会涉及到不同的语音、框架和执行环境，我们希望通过引入通用的执行器协议（而不是执行器实现），业务方可以更专注于使用合适的技术栈实现业务逻辑，将不同类型的任务拆分到不同的执行器实现，并通过K8S、Service Mesh或Serverless技术进行服务服务的部署和发现，从而降低“单体执行器”带来的复杂度增长和灵活性方面的约束。

### “万能执行器”

如果业务场景较为单一（或者偏好单体服务），也可以将所有逻辑全部封装到一个执行器中，此时Rill Flow的整体架构类似于`master-worker`模式，编排任务时可以通过改变`ResourceName`或`parameters`中的参数使得同一个执行器可以执行不同的逻辑。