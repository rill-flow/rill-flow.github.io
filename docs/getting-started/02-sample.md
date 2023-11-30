---
sidebar_position: 2
---

# 更多示例

## 流程控制

![flow_control](assets/flow_control.svg)

## 调用API并处理结果

![call_api](assets/call_api.svg)

## 并行和异步处理

![parallel](assets/parallel.svg)

[yaml定义文件](https://github.com/weibocom/rill-flow/blob/main/docs/samples/parallel-async-dag.yaml)

```cURL
curl --location 'http://<RILL_FLOW_HOST>/flow/submit.json?descriptor_id=rillFlowSample%3AparallelAsyncTask' \
--header 'Content-Type: application/json' \
--data '{
    "rand_num":20
}'
```

## 引用子图

![ref_subflow](assets/ref_subflow.svg)
[yaml定义文件](https://github.com/weibocom/rill-flow/blob/main/docs/samples/ref-dag.yaml)

```cURL
curl --location 'http://<RILL_FLOW_HOST>/flow/submit.json?descriptor_id=rillFlowSample%3AsubdagTask' \
--header 'Content-Type: application/json' \
--data '{
    "parent_rand_num":20
}'
```


## 接收kafka消息后调用AIGC翻译文本

![call_aigc_translate](assets/call_aigc_translate.svg)

```cURL
curl --location 'http://127.0.0.1:8080/flow/trigger/send_kafka_message.json' \
--header 'Content-Type: application/json' \
--data '{"message": "hello world"}'
```

## 通过文本生成图片

![text_to_pic](assets/text_to_pic.svg)

[示例yaml](https://github.com/weibocom/rill-flow/blob/main/docs/samples/txt2img.yaml)
> 提交yaml前，需要替换YAML中的占位符
> * `OPENAI_API_KEY`:调用openai的token
> * `RILL_FLOW_HOST`:Rill Flow服务地址
> * `SD_API_HOST`:Stable Diffusion UI服务地址，更多关于stable-diffusion-ui的部署说明请参考[AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

```cURL
curl --location 'http://<RILL_FLOW_HOST>/flow/submit.json?descriptor_id=rillFlow%3Atxt2img' \
--header 'Content-Type: application/json' \
--data '{
    "prompt": "Rill Flow"
}'
```