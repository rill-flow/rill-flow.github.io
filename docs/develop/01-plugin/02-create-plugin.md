---
sidebar_position: 2
---

# 创建插件

## 依赖

Rill Flow 及插件都运行在 jdk 17 版本下，因此，插件同样需要使用 java 编程语言进行开发。

在 Rill Flow 项目中，rill-flow-plugins 模块包含了模块开发的示例代码，你可以参考 rill-flow-plugins 模块内的子模块的代码，开启你的插件开发之旅，同时，由于Rill Flow的插件机制是基于开源项目PF4J实现的，你也可以参考开源项目代码及示例：[PF4J](https://github.com/pf4j/pf4j)。

首先，你需要在你的插件项目中添加以下依赖：

```xml
<dependency>
  <groupId>com.weibo.api.video.task</groupId>
  <artifactId>rill-flow-interfaces</artifactId>
</dependency>
```

## 代码
然后在插件项目中创建插件类，并实现DispatcherExtension接口：

```java
import org.pf4j.Extension;
import com.rill.flow.interfaces.dispatcher.DispatcherExtension;

@Extension
public class UserDefineDispatcherExtension implements DispatcherExtension {
    @Override
    public String handle(Resource resource, DispatchInfo dispatchInfo) {
        return null;
    }
  
  	@Override
    public String getName() {
        return "user_define";
    }
}
```

## 打包及运行

根据PF4J的协议，在插件的resources目录下，创建META-INF目录，在MANIFEST.MF文件中填写插件的基本内容，如：

```
Manifest-Version: 1.0
Archiver-Version: Plexus Archiver
Created-By: Apache Maven
Built-By: decebal
Build-Jdk: 17.0.8
Plugin-Id: user-plugin
Plugin-Provider: rill-flow
Plugin-Version: 0.0.1
```

在pom.xml中添加build信息：

```xml
<build>
  <finalName>user-plugin</finalName>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-assembly-plugin</artifactId>
      <version>3.1.0</version>
      <configuration>
        <descriptorRefs>
          <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <finalName>${project.artifactId}-${project.version}-all</finalName>
        <appendAssemblyId>false</appendAssemblyId>
        <attach>false</attach>
        <archive>
          <manifest>
            <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
            <addDefaultSpecificationEntries>true</addDefaultSpecificationEntries>
          </manifest>
          <manifestEntries>
            <Plugin-Id>aliyun-ai-plugin</Plugin-Id>
            <Plugin-Version>1.0</Plugin-Version>
            <Plugin-Provider>rill-flow</Plugin-Provider>
          </manifestEntries>
        </archive>
      </configuration>
      <executions>
        <execution>
          <id>make-assembly</id>
          <phase>package</phase>
          <goals>
            <goal>single</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-deploy-plugin</artifactId>
      <configuration>
        <skip>true</skip>
      </configuration>
      <version>2.8.2</version>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>2.5.1</version>
      <configuration>
        <annotationProcessors>
          <annotationProcessor>org.pf4j.processor.ExtensionAnnotationProcessor</annotationProcessor>
        </annotationProcessors>
      </configuration>
    </plugin>
  </plugins>
</build>
```

如果你将插件项目作为模块放置在rill-flow-plugins中，运行quick-start会自动打包并将插件jar包放置在docker中的指定位置。

如果你需要自行打包并放置，那么执行maven的打包命令后，你将得到 user-plugin-xxxx-all.jar，将这个以-all.jar结尾的jar包在docker启动前放置在docker的`/usr/local/rill_flow/plugins`目录中即可实现插件的加载。
