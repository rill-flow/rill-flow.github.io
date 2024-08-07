"use strict";(self.webpackChunkrill_flow_github_io=self.webpackChunkrill_flow_github_io||[]).push([[2730],{3379:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var l=i(5893),t=i(1151);const s={},r="\u7f16\u6392\u957f\u4efb\u52a1",o={id:"best-practice/invoke-long-running-jobs",title:"\u7f16\u6392\u957f\u4efb\u52a1",description:"\u6211\u4eec\u628a\u6267\u884c\u65f6\u95f4\u8d85\u8fc710s\u7684\u4efb\u52a1\u5b9a\u4e49\u4e3a\u201c\u957f\u4efb\u52a1\u201d\uff0c\u6267\u884c\u957f\u4efb\u52a1\u65f6\u65e0\u6cd5\u7acb\u523b\u83b7\u53d6\u4efb\u52a1\u7ed3\u679c\uff0c\u9700\u8981\u7b49\u5f85\u4efb\u52a1\u7ed3\u675f\u540e\u518d\u6267\u884c\u4e0b\u4e00\u4e2a\u8282\u70b9\u3002",source:"@site/docs/best-practice/02-invoke-long-running-jobs.md",sourceDirName:"best-practice",slug:"/best-practice/invoke-long-running-jobs",permalink:"/docs/best-practice/invoke-long-running-jobs",draft:!1,unlisted:!1,editUrl:"https://github.com/rill-flow/rill-flow.github.io/edit/main/docs/best-practice/02-invoke-long-running-jobs.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u81ea\u5b9a\u4e49\u6267\u884c\u5668",permalink:"/docs/best-practice/customize-executor"},next:{title:"\u5bf9\u63a5Serverless\u670d\u52a1",permalink:"/docs/best-practice/work-with-servless"}},c={},d=[{value:"\u5bf9\u63a5\u8c03\u7528-\u7b49\u5f85\u578b\u957f\u4efb\u52a1",id:"\u5bf9\u63a5\u8c03\u7528-\u7b49\u5f85\u578b\u957f\u4efb\u52a1",level:2},{value:"\u8c03\u7528\u4e91\u670d\u52a1\uff1a\u6d3e\u53d1\u5668\u5efa\u7acb\u5f02\u6b65\u7ebf\u7a0b\u6c60",id:"\u8c03\u7528\u4e91\u670d\u52a1\u6d3e\u53d1\u5668\u5efa\u7acb\u5f02\u6b65\u7ebf\u7a0b\u6c60",level:3},{value:"\u8c03\u7528\u81ea\u6709\u670d\u52a1\uff1a\u589e\u52a0\u6267\u884c\u5668Agent",id:"\u8c03\u7528\u81ea\u6709\u670d\u52a1\u589e\u52a0\u6267\u884c\u5668agent",level:3},{value:"\u5bf9\u63a5\u8c03\u7528-\u8f6e\u8be2\u578b\u957f\u4efb\u52a1",id:"\u5bf9\u63a5\u8c03\u7528-\u8f6e\u8be2\u578b\u957f\u4efb\u52a1",level:2},{value:"\u5bf9\u63a5\u8c03\u7528-\u56de\u8c03\u578b\u957f\u4efb\u52a1",id:"\u5bf9\u63a5\u8c03\u7528-\u56de\u8c03\u578b\u957f\u4efb\u52a1",level:2},{value:"\u5bf9\u63a5\u6d41\u5f0f\u957f\u4efb\u52a1",id:"\u5bf9\u63a5\u6d41\u5f0f\u957f\u4efb\u52a1",level:2}];function a(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"\u7f16\u6392\u957f\u4efb\u52a1",children:"\u7f16\u6392\u957f\u4efb\u52a1"}),"\n",(0,l.jsx)(n.p,{children:"\u6211\u4eec\u628a\u6267\u884c\u65f6\u95f4\u8d85\u8fc710s\u7684\u4efb\u52a1\u5b9a\u4e49\u4e3a\u201c\u957f\u4efb\u52a1\u201d\uff0c\u6267\u884c\u957f\u4efb\u52a1\u65f6\u65e0\u6cd5\u7acb\u523b\u83b7\u53d6\u4efb\u52a1\u7ed3\u679c\uff0c\u9700\u8981\u7b49\u5f85\u4efb\u52a1\u7ed3\u675f\u540e\u518d\u6267\u884c\u4e0b\u4e00\u4e2a\u8282\u70b9\u3002"}),"\n",(0,l.jsx)(n.p,{children:"Rill Flow\u8bbe\u8ba1\u4e0a\u5bf9\u6d41\u7a0b\u4e0a\u4e0b\u6587\u505a\u4e86\u6301\u4e45\u5316\u5b58\u50a8\uff0c\u56e0\u6b64\u957f\u4efb\u52a1\u6267\u884c\u7684\u8fc7\u7a0b\u4e2d\u5373\u4f7f\u5bf9Rill Flow\u672c\u8eab\u505a\u4e86\u91cd\u542f\u6216\u5347\u7ea7\uff0c\u4e5f\u4e0d\u4f1a\u4e22\u5931\u6d41\u7a0b\u6267\u884c\u7684\u4e0a\u4e0b\u6587\u3002"}),"\n",(0,l.jsx)(n.p,{children:"\u6211\u4eec\u628a\u5e38\u89c1\u7684\u957f\u4efb\u52a1\u5206\u6210\u56db\u7c7b\uff0cRill Flow\u53ef\u4ee5\u901a\u8fc7\u4e0d\u540c\u7684\u65b9\u5f0f\u4e0e\u8fd9\u4e9b\u7c7b\u578b\u7684\u957f\u4efb\u52a1\u8fdb\u884c\u5bf9\u63a5\u3002"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"\u5728\u5b9e\u8df5\u4e2d\uff0c\u5efa\u8bae\u6267\u884c\u65f6\u95f4\u8d85\u8fc71\u4e2a\u6708\u7684\u4efb\u52a1\u4e0d\u5efa\u8bae\u4f7f\u7528Rill Flow\u7f16\u6392\uff08\u5f53\u7136\uff0c\u662f\u53ef\u4ee5\u7f16\u6392\u7684\uff09\u3002"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u5bf9\u63a5\u8c03\u7528-\u7b49\u5f85\u578b\u957f\u4efb\u52a1",children:"\u5bf9\u63a5\u8c03\u7528-\u7b49\u5f85\u578b\u957f\u4efb\u52a1"}),"\n",(0,l.jsx)(n.p,{children:"\u53d1\u8d77\u4efb\u52a1\u540e\u9700\u8981\u540c\u6b65\u7b49\u5f85\u63a5\u53e3\u8fd4\u56de\uff0c\u6839\u636e\u5bf9\u5e94\u670d\u52a1\u90e8\u7f72\u7684\u6a21\u5f0f\u4e0d\u540c\uff0c\u53ef\u4ee5\u6709\u4e24\u79cd\u5bf9\u63a5\u65b9\u5f0f\uff1a"}),"\n",(0,l.jsx)(n.h3,{id:"\u8c03\u7528\u4e91\u670d\u52a1\u6d3e\u53d1\u5668\u5efa\u7acb\u5f02\u6b65\u7ebf\u7a0b\u6c60",children:"\u8c03\u7528\u4e91\u670d\u52a1\uff1a\u6d3e\u53d1\u5668\u5efa\u7acb\u5f02\u6b65\u7ebf\u7a0b\u6c60"}),"\n",(0,l.jsxs)(n.p,{children:["\u5f53\u5bf9\u5e94\u7684\u6267\u884c\u670d\u52a1\u90e8\u7f72\u5728\u516c\u7f51\u4e0a\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u5728\u6d3e\u53d1\u5668\u4e2d\u589e\u52a0\u5f02\u6b65\u6267\u884c\u7ebf\u7a0b\u6c60\uff0c\u907f\u514d\u6d3e\u53d1\u7ebf\u7a0b\u957f\u65f6\u95f4\u88ab\u957f\u4efb\u52a1\u8bf7\u6c42\u592f\u6b7b\uff0c\u8be6\u60c5\u8bf7\u53c2\u8003\u4ee3\u7801\u4e2d\u7684",(0,l.jsx)(n.code,{children:"ChatGPT"}),"\u63d2\u4ef6\u5bf9\u5e94\u5b9e\u73b0\u3002"]}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"\u5f53Rill Flow\u670d\u52a1\u81ea\u8eab\u91cd\u542f\u65f6\uff0c\u5bf9\u5e94\u7684\u8bf7\u6c42\u4e5f\u4f1a\u4e22\u5931\uff0c\u9700\u8981\u5728\u6d3e\u53d1\u5668\u4e2d\u589e\u52a0\u4f18\u96c5\u5173\u95ed\u76f8\u5173\u903b\u8f91"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"\u8c03\u7528\u81ea\u6709\u670d\u52a1\u589e\u52a0\u6267\u884c\u5668agent",children:"\u8c03\u7528\u81ea\u6709\u670d\u52a1\uff1a\u589e\u52a0\u6267\u884c\u5668Agent"}),"\n",(0,l.jsx)(n.p,{children:"\u5f53\u5bf9\u5e94\u7684\u6267\u884c\u5668\u662f\u81ea\u6709\u670d\u52a1\u65f6\uff0c\u5efa\u8bae\u901a\u8fc7Sidecar\u65b9\u5f0f\u4e3a\u670d\u52a1\u589e\u52a0\u8c03\u7528Agent\uff0c\u7531Agent\u7ef4\u6301\u4e0e\u5b9e\u9645\u670d\u52a1\u7684\u8bf7\u6c42\uff0c\u5f53\u8bf7\u6c42\u7ed3\u675f\u65f6\u7531Agent\u56de\u8c03Rill Flow\u901a\u77e5\u4efb\u52a1\u6267\u884c\u7ed3\u679c\u3002"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{alt:"executor agent",src:i(6753).Z+"",width:"543",height:"132"})}),"\n",(0,l.jsx)(n.p,{children:"\u901a\u8fc7\u589e\u52a0Agent\uff0c\u53ef\u4ee5\u6709\u6548\u7684\u907f\u514d\u7531\u4e8e\u7f51\u7edc\u6216\u5176\u4ed6\u95ee\u9898\u5bfc\u81f4\u7684\u957f\u8fde\u63a5\u8bf7\u6c42\u5931\u8d25\u95ee\u9898\u3002"}),"\n",(0,l.jsx)(n.h2,{id:"\u5bf9\u63a5\u8c03\u7528-\u8f6e\u8be2\u578b\u957f\u4efb\u52a1",children:"\u5bf9\u63a5\u8c03\u7528-\u8f6e\u8be2\u578b\u957f\u4efb\u52a1"}),"\n",(0,l.jsx)(n.p,{children:"\u53d1\u8d77\u4efb\u52a1\u540e\u83b7\u5f97token\uff0c\u540e\u7eed\u901a\u8fc7\u4efb\u52a1\u67e5\u8be2\u63a5\u53e3\u83b7\u53d6\u8fdb\u5ea6\u3002"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u5728\u6d41\u7a0b\u4e2d\u589e\u52a0\u201c\u8c03\u7528\u201d\u548c\u201c\u67e5\u8be2\u201d\u4e24\u4e2a\u8282\u70b9"}),"\n",(0,l.jsx)(n.li,{children:"\u901a\u8fc7\u53c2\u6570\u6620\u5c04\u673a\u5236\uff0c\u5728\u4efb\u52a1\u95f4\u4f20\u9012\u4efb\u52a1\u7684token"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"\u5bf9\u63a5\u8c03\u7528-\u56de\u8c03\u578b\u957f\u4efb\u52a1",children:"\u5bf9\u63a5\u8c03\u7528-\u56de\u8c03\u578b\u957f\u4efb\u52a1"}),"\n",(0,l.jsx)(n.p,{children:"\u53d1\u8d77\u4efb\u52a1\u65f6\u6307\u5b9acallback\uff0c\u4efb\u52a1\u5b8c\u6210\u540e\u56de\u8c03\u6307\u5b9a\u63a5\u53e3\u3002"}),"\n",(0,l.jsx)(n.p,{children:"\u5728\u4efb\u52a1\u4e2d\u76f4\u63a5\u56de\u8c03Rill Flow\u5b8c\u6210\u63a5\u53e3\uff0c\u6216\u8005\u4e1a\u52a1\u5b9e\u73b0\u56de\u8c03\u8f6c\u53d1\u903b\u8f91\uff0c\u5c06\u539f\u4efb\u52a1\u7684\u56de\u8c03\u8bf7\u6c42\u8f6c\u6362\u5c01\u88c5\u540e\u8c03\u7528\u5230Rill Flow\u3002"}),"\n",(0,l.jsx)(n.h2,{id:"\u5bf9\u63a5\u6d41\u5f0f\u957f\u4efb\u52a1",children:"\u5bf9\u63a5\u6d41\u5f0f\u957f\u4efb\u52a1"}),"\n",(0,l.jsx)(n.p,{children:"\u53d1\u8d77\u4efb\u52a1\u540e\u53ef\u4ee5\u6301\u7eed\u5411\u67d0\u79cd\u6d41\u5185\u6301\u7eed\u5199\u5165\u6570\u636e\u3002"}),"\n",(0,l.jsx)(n.p,{children:"\u5f53\u524dRill Flow\u6682\u65f6\u4e0d\u652f\u6301\u539f\u751f\u7684\u6d41\u5f0f\u4efb\u52a1\u7f16\u6392\uff0c\u9700\u8981\u5c06\u6d41\u5f0f\u5904\u7406\u903b\u8f91\u81ea\u884c\u5c01\u88c5\u5230Executor\u4e2d\u3002"})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},6753:(e,n,i)=>{i.d(n,{Z:()=>l});const l=i.p+"assets/images/executor-agent-49924aa6d9d1f4696248a970157104b4.svg"},1151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>r});var l=i(7294);const t={},s=l.createContext(t);function r(e){const n=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),l.createElement(s.Provider,{value:n},e.children)}}}]);