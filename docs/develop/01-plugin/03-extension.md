---
sidebar_position: 3
---

# 扩展点

`DispatcherExtension`是插件的扩展点接口，它继承了PF4J的ExtensionPoint接口：

```java
public interface DispatcherExtension extends ExtensionPoint {
    String handle(Resource resource, DispatchInfo dispatchInfo);

    String getName();

    default String getIcon() { return null; }

    default String getSchema() { return null; }
}
```

它包含了以下方法：

#### getName()

getName() 方法用来返回插件的名称，它同时将定义该插件适配的资源协议名称，亦即任务配置中的resourceProtocol字段。Rill Flow将通过resourceProtocol与任务执行器的名称二者的对应关系来为任务选择对应的执行器。

#### handle()

handle() 方法即任务处理方法，它是任务处理扩展插件的核心，当适配该执行器的任务被Rill Flow分发时，Rill Flow会调用对应执行器的handle()方法来完成该任务的处理。

handle()方法共包含两个参数：

- resource：Resource类型，包含有resourceName、schemeProtocol及schemeValue字段，用来将task配置的resourceName及解析后的结构传递到执行器中供执行器使用。
- dispatchInfo：DispatchInfo类型，包含了以下字段：
  - executionId：本次工作流执行的执行ID
  - taskInfo：TaskInfo类型，包含了当前任务的详情信息，包括任务名称、任务状态、任务的定义信息等，具体可参看该类型的代码注释及插件示例代码。

#### getIcon()

用来给管理后台页面提供任务的展示图标，默认实现返回空，将使用默认图标展示。

如果想要自定义展示图标，那么实现该方法，并返回icon的base64编码字符串。

#### getSchema()

用来给管理后台页面提供定义该协议的任务时，需要展示和填写的表单格式，具体格式可以参看：[json-schema](https://json-schema.org/)

管理后台页面在创建该协议的任务时，会解析插件返回的schema字符串，并在必要参数之后展示schema定义的表格，并将用户填写信息放置在task定义yaml的parameters字段中，在handle()方法中，你可以通过dispatchInfo.getTaskInfo().getTask().getParameters()方法获取用户填写的参数。

