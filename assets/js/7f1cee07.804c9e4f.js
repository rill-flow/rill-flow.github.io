"use strict";(self.webpackChunkrill_flow_github_io=self.webpackChunkrill_flow_github_io||[]).push([[5439],{5163:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>a});var n=t(5893),r=t(1151);const l={},i="\u5bf9\u63a5Serverless\u670d\u52a1",c={id:"best-practice/work-with-servless",title:"\u5bf9\u63a5Serverless\u670d\u52a1",description:"Serverless\u80fd\u591f\u505a\u5230\u4e1a\u52a1\u6309\u9700\u4f7f\u7528\u3001\u6309\u91cf\u8ba1\u8d39\uff0c\u540c\u65f6\uff0c\u7531\u4e8e\u51fd\u6570\u72ec\u7acb\u90e8\u7f72\u3001\u8f7b\u91cf\u5316\u7684\u7279\u6027\uff0c\u5728\u5b9e\u9645\u4e1a\u52a1\u843d\u5730\u65f6\u9700\u8981\u5f88\u591a\u201c\u80f6\u6c34\u4ee3\u7801\u201d\uff0c\u4e32\u8054\u4e0d\u540c\u7684\u51fd\u6570\u903b\u8f91\u3002",source:"@site/docs/best-practice/03-work-with-servless.md",sourceDirName:"best-practice",slug:"/best-practice/work-with-servless",permalink:"/docs/best-practice/work-with-servless",draft:!1,unlisted:!1,editUrl:"https://github.com/rill-flow/rill-flow.github.io/edit/main/docs/best-practice/03-work-with-servless.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7f16\u6392\u957f\u4efb\u52a1",permalink:"/docs/best-practice/invoke-long-running-jobs"},next:{title:"\u5bf9\u63a5\u5927\u6a21\u578b",permalink:"/docs/best-practice/work-with-llms"}},d={},a=[{value:"\u6d41\u7a0b\u63a7\u5236",id:"\u6d41\u7a0b\u63a7\u5236",level:2},{value:"\u5bf9\u63a5\u5230Serverless\u7f51\u5173",id:"\u5bf9\u63a5\u5230serverless\u7f51\u5173",level:2},{value:"OpenFaas",id:"openfaas",level:3},{value:"\u4e1a\u52a1\u96c6\u6210\u4e0e\u5f02\u6b65\u8c03\u7528",id:"\u4e1a\u52a1\u96c6\u6210\u4e0e\u5f02\u6b65\u8c03\u7528",level:2},{value:"\u4e1a\u52a1\u96c6\u6210",id:"\u4e1a\u52a1\u96c6\u6210",level:3},{value:"\u5f02\u6b65\u4efb\u52a1\u56de\u8c03\u5730\u5740",id:"\u5f02\u6b65\u4efb\u52a1\u56de\u8c03\u5730\u5740",level:3},{value:"\u5c06\u56de\u8c03\u5730\u5740\u4f5c\u4e3a\u4efb\u52a1\u53c2\u6570",id:"\u5c06\u56de\u8c03\u5730\u5740\u4f5c\u4e3a\u4efb\u52a1\u53c2\u6570",level:3}];function o(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"\u5bf9\u63a5serverless\u670d\u52a1",children:"\u5bf9\u63a5Serverless\u670d\u52a1"}),"\n",(0,n.jsx)(s.p,{children:"Serverless\u80fd\u591f\u505a\u5230\u4e1a\u52a1\u6309\u9700\u4f7f\u7528\u3001\u6309\u91cf\u8ba1\u8d39\uff0c\u540c\u65f6\uff0c\u7531\u4e8e\u51fd\u6570\u72ec\u7acb\u90e8\u7f72\u3001\u8f7b\u91cf\u5316\u7684\u7279\u6027\uff0c\u5728\u5b9e\u9645\u4e1a\u52a1\u843d\u5730\u65f6\u9700\u8981\u5f88\u591a\u201c\u80f6\u6c34\u4ee3\u7801\u201d\uff0c\u4e32\u8054\u4e0d\u540c\u7684\u51fd\u6570\u903b\u8f91\u3002"}),"\n",(0,n.jsx)(s.p,{children:"Rill Flow\u652f\u6301\u5e38\u89c1\u7684\u6d41\u7a0b\u63a7\u5236\u8bed\u53e5\uff0c\u80fd\u591f\u5f88\u597d\u7684\u5145\u5f53\u201c\u80f6\u6c34\u4ee3\u7801\u201d\uff0c\u5b9e\u73b0\u4f4e\u4ee3\u7801\u7f16\u6392Serverless\u3002"}),"\n",(0,n.jsx)(s.h2,{id:"\u6d41\u7a0b\u63a7\u5236",children:"\u6d41\u7a0b\u63a7\u5236"}),"\n",(0,n.jsxs)(s.p,{children:["Rill Flow\u4e2d\u652f\u6301\u6761\u4ef6\u3001\u5faa\u73af\u3001\u8df3\u8f6c\u7b49\u903b\u8f91\u7684\u6d41\u7a0b\u63a7\u5236\u8282\u70b9\uff0c\u901a\u8fc7\u6d41\u7a0b\u63a7\u5236\u8282\u70b9\u53ef\u4ee5\u5b9e\u73b0\u57fa\u672c\u4e1a\u52a1\u903b\u63a7\u5236\u8f91\u53ca\u8868\u8fbe\u5f0f\u6c42\u503c\uff0c\u8be6\u60c5\u53ef\u4ee5\u53c2\u8003",(0,n.jsx)(s.a,{href:"/docs/user-guide/defination/control",children:"\u6d41\u7a0b\u63a7\u5236"})]}),"\n",(0,n.jsx)(s.h2,{id:"\u5bf9\u63a5\u5230serverless\u7f51\u5173",children:"\u5bf9\u63a5\u5230Serverless\u7f51\u5173"}),"\n",(0,n.jsxs)(s.p,{children:["Rill Flow \u4ee5\u5de5\u4f5c\u6d41\u7684\u5f62\u5f0f\uff0c\u5bf9\u5305\u62ec\u4e91\u51fd\u6570\u5728\u5185\u7684\u4e91\u670d\u52a1\u8fdb\u884c\u7edf\u4e00\u7f16\u6392\uff0c\u652f\u6301\u6761\u4ef6\u3001\u5faa\u73af\u3001\u8df3\u8f6c\u7b49\u903b\u8f91\u7684\u6d41\u7a0b\u63a7\u5236\u8282\u70b9\u3002\u4efb\u52a1\u901a\u8fc7 HTTP \u8bf7\u6c42\u8f6c\u53d1\u5230 Serverless \u7f51\u5173\uff0c\u5b9e\u73b0 Serverless \u4e1a\u52a1\u7684\u96c6\u6210\u3002\u8be6\u60c5\u53ef\u4ee5\u53c2\u8003",(0,n.jsx)(s.a,{href:"/docs/user-guide/defination/task-and-dispatcher#http-%E5%8D%8F%E8%AE%AE%E6%B4%BE%E5%8F%91%E5%99%A8",children:"HTTP \u6d3e\u53d1\u5668"}),"\u3002"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:["\u540c\u65f6\u4e5f\u53ef\u4ee5\u901a\u8fc7\u81ea\u5b9a\u4e49\u6d3e\u53d1\u5668\u5b9e\u73b0 ",(0,n.jsx)(s.code,{children:"Serverless"})," \u4e13\u7528\u6d3e\u53d1\u5668\uff0c\u5f00\u53d1\u81ea\u5b9a\u4e49\u63d2\u4ef6\u8be6\u60c5\u53c2\u8003",(0,n.jsx)(s.a,{href:"/docs/develop/plugin/create-plugin",children:"\u521b\u5efa\u63d2\u4ef6"})]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"\u4ee5\u6587\u672c\u751f\u6210\u89c6\u9891\u4e3a\u4f8b\uff0c\u5176\u4e2d\u6587\u672c\u83b7\u53d6\u3001\u6587\u672c\u62c6\u5206\u3001\u6587\u672c\u6da6\u8272\u3001\u6587\u672c\u914d\u97f3\u3001\u53e3\u578b\u6821\u5bf9\u7b49\u670d\u52a1\u662f\u4e00\u4e2a\u4e2a\u72ec\u7acb\u7684\u51fd\u6570\uff0cRill Flow \u53ef\u4ee5\u901a\u8fc7\u6d41\u7a0b\u7f16\u6392\u5c06\u5404\u4e2a\u51fd\u6570\u6309\u7167\u9879\u76ee\u9700\u6c42\u6309\u9700\u7f16\u6392\u8fde\u7ebf\uff0c\u51cf\u5c11\u5f00\u53d1\u8005\u5199\u4e00\u4e9b\u4e0d\u5fc5\u8981\u7684\u201c\u80f6\u6c34\u4ee3\u7801\u201d\u3002\u53ef\u4ee5\u6839\u636e\u4e0d\u540c\u65f6\u671f\u7684\u4e0d\u540c\u9700\u6c42\uff0c\u4fee\u6539 DAG \u56fe\u6765\u5feb\u901f\u5b9e\u73b0\u4ea7\u54c1\u9700\u6c42\u8fed\u4ee3\u5f00\u53d1\u3002"}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"image",src:t(6443).Z+"",width:"1093",height:"281"})}),"\n",(0,n.jsx)(s.h3,{id:"openfaas",children:"OpenFaas"}),"\n",(0,n.jsxs)(s.p,{children:["OpenFaas gateway \u7684 ",(0,n.jsx)(s.code,{children:"namespace"}),"\u3001",(0,n.jsx)(s.code,{children:"service"})," \u548c ",(0,n.jsx)(s.code,{children:"port"})," \u53ef\u4ee5\u901a\u8fc7\u67e5\u770b ",(0,n.jsx)(s.a,{href:"https://docs.openfaas.com/deployment/kubernetes/",children:"OpenFaas"})," \u90e8\u7f72 Yaml \u786e\u8ba4\u3002 \u5728\u5b9a\u4e49\u4efb\u52a1\u65f6\uff0c\u4efb\u52a1\u53ef\u4ee5\u901a\u8fc7 ",(0,n.jsx)(s.code,{children:"ResourceName"})," \u5b57\u6bb5\u7ed1\u5b9a\u5230\u4e0d\u540c\u7684 ",(0,n.jsx)(s.code,{children:"Serverless"})," \u51fd\u6570\u3002"]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:["OpenFaas \u51fd\u6570\u540c\u6b65\u8c03\u7528\u8c03\u7528 ",(0,n.jsx)(s.code,{children:"ResourceName"})," \u7c7b\u4f3c\uff1a"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"http://{service}.{namespace}.svc.cluster.local:{service-port}/function/{function-name}/{function-uri}"})}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.img,{alt:"images",src:t(7369).Z+"",width:"583",height:"134"})}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:["OpenFaas \u51fd\u6570\u5f02\u6b65\u8c03\u7528\u8c03\u7528 ",(0,n.jsx)(s.code,{children:"ResourceName"})," \u7c7b\u4f3c\uff1a"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.code,{children:"http://{service}.{namespace}.svc.cluster.local:{service-port}/async-function/{function-name}/{function-uri}"})}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.img,{alt:"images",src:t(8688).Z+"",width:"723",height:"400"}),")"]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"\u4e1a\u52a1\u96c6\u6210\u4e0e\u5f02\u6b65\u8c03\u7528",children:"\u4e1a\u52a1\u96c6\u6210\u4e0e\u5f02\u6b65\u8c03\u7528"}),"\n",(0,n.jsx)(s.h3,{id:"\u4e1a\u52a1\u96c6\u6210",children:"\u4e1a\u52a1\u96c6\u6210"}),"\n",(0,n.jsxs)(s.p,{children:["\u5bf9\u4e8e\u666e\u901a\u4e1a\u52a1\u7684\u96c6\u6210\uff0c\u53ea\u9700\u8981\u5c06\u4e1a\u52a1\u7684\u8c03\u7528\u63a5\u53e3\u4f5c\u4e3a task \u7684 resourceName \u6765\u521b\u5efa\u4efb\u52a1\u5373\u53ef\uff0c\u5982\u679c\u4e1a\u52a1\u4e0d\u662f\u901a\u8fc7 http \u7684\u65b9\u5f0f\u8c03\u7528\uff0c\u5219\u53ef\u4ee5\u901a\u8fc7\u521b\u5efa\u81ea\u5b9a\u4e49\u7684\u6d3e\u53d1\u5668\u63d2\u4ef6\u6765\u652f\u6301\u76f8\u5e94\u7684 resourceProtocol\uff0c\u53ef\u4ee5\u53c2\u8003 ",(0,n.jsx)(s.a,{href:"/docs/develop/plugin/intro",children:"\u5f00\u53d1\u63d2\u4ef6"})]}),"\n",(0,n.jsxs)(s.p,{children:["\u5f53\u4e1a\u52a1\u51fd\u6570\u7684\u6267\u884c\u8017\u65f6\u8f83\u957f\uff0c\u53ef\u4ee5\u5c06\u8be5 task \u7684 pattern \u5b57\u6bb5\u8bbe\u7f6e\u4e3a ",(0,n.jsx)(s.code,{children:"task_async"})," \u6765\u8868\u660e\u8fd9\u662f\u4e00\u4e2a\u5f02\u6b65\u8c03\u7528\uff0c\u6b64\u65f6\uff0cRill Flow \u4f1a\u5728\u8c03\u7528\u51fd\u6570\u540e\u7acb\u5373\u8fd4\u56de\uff0c\u4e0d\u4f1a\u7b49\u5f85\u51fd\u6570\u6267\u884c\u5b8c\u6210\u3002"]}),"\n",(0,n.jsx)(s.h3,{id:"\u5f02\u6b65\u4efb\u52a1\u56de\u8c03\u5730\u5740",children:"\u5f02\u6b65\u4efb\u52a1\u56de\u8c03\u5730\u5740"}),"\n",(0,n.jsxs)(s.p,{children:["\u5bf9\u4e8e\u5f02\u6b65\u8c03\u7528\uff0cRill Flow \u4f1a\u5728 header \u4e2d\u6dfb\u52a0 ",(0,n.jsx)(s.code,{children:"X-Callback-Url"})," \u5b57\u6bb5\uff0c\u8be5\u5b57\u6bb5\u7684\u503c\u4e3a\u5f53\u524d task \u6267\u884c\u7ed3\u675f\u540e\u7684\u56de\u8c03\u5730\u5740\uff0c\u51fd\u6570\u9700\u8981\u5728\u6267\u884c\u5b8c\u6210\u540e\uff0c\u901a\u8fc7\u5411\u8be5\u5730\u5740\u53d1\u9001\u8bf7\u6c42\uff0c\u901a\u77e5 Rill Flow \u8be5 task \u5df2\u7ecf\u6267\u884c\u5b8c\u6210\u3002\u53ef\u4ee5\u53c2\u8003 ",(0,n.jsx)(s.a,{href:"/docs/user-guide/defination/task-and-dispatcher#%E5%BC%82%E6%AD%A5%E6%A8%A1%E5%BC%8Ftask_async",children:"\u5f02\u6b65\u6a21\u5f0f"}),"\uff0c\u5177\u4f53\u7684\u56de\u8c03\u5730\u5740\u4e3a\uff1a"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:"http://{rill-flow-server-host}/flow/trigger.json"}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"\u8fd9\u4e2a\u56de\u8c03\u63a5\u53e3\u540c\u65f6\u652f\u6301 GET \u548c POST \u4e24\u79cd\u65b9\u5f0f\u8c03\u7528\u3002"}),"\n",(0,n.jsx)(s.p,{children:"\u63a5\u53e3\u7684 url query \u8bf7\u6c42\u53c2\u6570\u5982\u4e0b\uff1a"}),"\n",(0,n.jsxs)(s.table,{children:[(0,n.jsx)(s.thead,{children:(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.th,{style:{textAlign:"center"}}),(0,n.jsx)(s.th,{style:{textAlign:"center"},children:"\u5fc5\u9009"}),(0,n.jsx)(s.th,{style:{textAlign:"center"},children:"\u7c7b\u578b"}),(0,n.jsx)(s.th,{style:{textAlign:"center"},children:"\u8bf4\u660e"})]})}),(0,n.jsxs)(s.tbody,{children:[(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"execution_id"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"true"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"string"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"\u6267\u884cid"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"task_name"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"true"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"string"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"\u4efb\u52a1\u540d\u79f0"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"status"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"false"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"string"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"\u4efb\u52a1\u8fd0\u884c\u72b6\u6001\uff0c\u53d6\u503c\uff1asuccess, failed\uff0c\u9ed8\u8ba4\u4e3asuccess"})]}),(0,n.jsxs)(s.tr,{children:[(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"context"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"false"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"string"}),(0,n.jsx)(s.td,{style:{textAlign:"center"},children:"JSON \u683c\u5f0f\u7684\u4efb\u52a1\u6267\u884c\u7ed3\u679c"})]})]})]}),"\n",(0,n.jsx)(s.p,{children:"\u5982\u679c\u901a\u8fc7 POST \u65b9\u5f0f\u8c03\u7528\uff0c\u53ef\u4ee5\u901a\u8fc7 body \u53c2\u6570\u4f20\u9012 JSON \u683c\u5f0f\u7684\u4efb\u52a1\u8fd4\u56de\u53c2\u6570\uff0c\u7528\u4e8e\u901a\u8fc7 outputMappings \u5bf9\u4efb\u52a1\u7684\u8fd4\u56de\u53c2\u6570\u8fdb\u884c\u5904\u7406\uff0c\u5982\u653e\u5165\u5230 context \u7b49\u64cd\u4f5c\uff0c\u56e0\u6b64\uff0c\u5bf9\u4e8e POST \u65b9\u5f0f\u8c03\u7528\uff0cheader \u4e2d\u7684 Content-Type \u5b57\u6bb5\u5fc5\u987b\u53d6\u503c\u4e3a application/json\u3002"}),"\n",(0,n.jsx)(s.p,{children:"\u5982\u679c\u540c\u65f6\u4f20\u9012\u4e86 context \u7684 query \u53c2\u6570\u548c POST body \u53c2\u6570\uff0cRill Flow \u4f1a\u5c06\u4e24\u8005\u5408\u5e76\uff0c\u76f8\u540c\u7684 key \u4f1a\u7528 query \u53c2\u6570\u8986\u76d6 body \u53c2\u6570\u3002"}),"\n",(0,n.jsx)(s.h3,{id:"\u5c06\u56de\u8c03\u5730\u5740\u4f5c\u4e3a\u4efb\u52a1\u53c2\u6570",children:"\u5c06\u56de\u8c03\u5730\u5740\u4f5c\u4e3a\u4efb\u52a1\u53c2\u6570"}),"\n",(0,n.jsx)(s.p,{children:"\u5982\u679c\u60f3\u8981\u5c06\u4e0a\u8ff0\u56de\u8c03\u63a5\u53e3\u53ca\u67d0\u4e2a\u4efb\u52a1\u5bf9\u5e94\u7684\u53c2\u6570\u4f5c\u4e3a\u67d0\u4e2a\u4efb\u52a1\u8282\u70b9\u7684\u4f20\u5165\u53c2\u6570\uff0c\u53ef\u4ee5\u5728\u5bf9\u5e94\u7684\u4efb\u52a1\u8282\u70b9\u7684 inputMappings \u4e2d\u589e\u52a0\u76f8\u5e94\u7684\u6620\u5c04\uff1a"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:"inputMappings:\n    - target: $.input.data.trigger_url\n      source: $.tasks.task1.trigger_url\n"})}),"\n",(0,n.jsx)(s.p,{children:'\u5728\u8be5\u5de5\u4f5c\u6d41\u7684\u6267\u884c\u4e2d\uff0cRill Flow \u5c31\u4f1a\u5728\u914d\u7f6e\u6709\u8be5 inputMappings \u7684\u4efb\u52a1\u6267\u884c\u65f6\uff0c\u5c06\u4efb\u52a1\u540d\u4e3a task1 \u5bf9\u5e94\u7684\u56de\u8c03\u5730\u5740\u4f5c\u4e3a\u53c2\u6570\u4e2d input["data"]["trigger_url"] \u7684\u503c\u4f20\u9012\u7ed9\u8be5\u4efb\u52a1\u3002'}),"\n",(0,n.jsx)(s.p,{children:"\u8fd9\u4e2a\u53c2\u6570\u7684\u9ed8\u8ba4\u503c\u4e3a\uff1a"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:"http://{rill-flow-server-host}/flow/trigger.json?execution_id={current-execution-id}&task_name=task1"}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"\u5982\u679c\u4f60\u9700\u8981\u5728\u8be5\u4efb\u52a1\u63a5\u6536\u5230\u7684 trigger_url \u4e2d\u989d\u5916\u6dfb\u52a0\u67d0\u4e9b\u53c2\u6570\uff0c\u53ef\u4ee5\u901a\u8fc7\u5728 trigger_url \u540e\u9762\u6dfb\u52a0 ? \u6765\u5c06\u53c2\u6570\u4ee5 key1=value1&key2=value2 \u7684\u65b9\u5f0f\u6dfb\u52a0\u5230 trigger_url \u4e2d\uff1a"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:"inputMappings:\n    - target: $.input.data.trigger_url\n      source: $.tasks.task1.trigger_url?context=%7B%22key%22%3A%20%22value%22%7D\n"})}),"\n",(0,n.jsx)(s.p,{children:"\u8fd9\u6837\uff0c\u6700\u7ec8\u751f\u6210\u7684 trigger_url \u5c31\u4f1a\u53d8\u4e3a\uff1a"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsx)(s.p,{children:"http://{rill-flow-server-host}/flow/trigger.json?execution_id={current-execution-id}&task_name=task1&context=%7B%22key%22%3A%20%22value%22%7D"}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},8688:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t.p+"assets/images/openfaas-async-4e176ab009fd91832ea7dbf62fff5747.svg"},7369:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t.p+"assets/images/openfaas-sync-ec29cdb773e5b7072f56b7f59bdf3f58.svg"},6443:(e,s,t)=>{t.d(s,{Z:()=>n});const n=t.p+"assets/images/text_to_video-f46eed6144608c644b344704f7b0a67b.svg"},1151:(e,s,t)=>{t.d(s,{Z:()=>c,a:()=>i});var n=t(7294);const r={},l=n.createContext(r);function i(e){const s=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(l.Provider,{value:s},e.children)}}}]);