"use strict";(self.webpackChunkrill_flow_github_io=self.webpackChunkrill_flow_github_io||[]).push([[6742],{1788:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(5893),t=n(1151);const i={sidebar_position:6},s="Workflow Reference",a={id:"user-guide/defination/ref",title:"Workflow Reference",description:"In Rill Flow, a workflow can reference another pre-defined workflow within its definition. This allows for the reuse of processes and enables the referenced workflow to act as a task within the current workflow.This would result in a process replication and would allow another defined workflow to be implemented as a task node of the current workflow.",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/user-guide/03-defination/06-ref.md",sourceDirName:"user-guide/03-defination",slug:"/user-guide/defination/ref",permalink:"/en/docs/user-guide/defination/ref",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/rill-flow/en",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Flow Control",permalink:"/en/docs/user-guide/defination/control"},next:{title:"\u6d41\u7a0b\u6267\u884c",permalink:"/en/docs/category/\u6d41\u7a0b\u6267\u884c"}},l={},c=[];function d(e){const o={code:"code",h1:"h1",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.h1,{id:"workflow-reference",children:"Workflow Reference"}),"\n",(0,r.jsx)(o.p,{children:"In Rill Flow, a workflow can reference another pre-defined workflow within its definition. This allows for the reuse of processes and enables the referenced workflow to act as a task within the current workflow.This would result in a process replication and would allow another defined workflow to be implemented as a task node of the current workflow."}),"\n",(0,r.jsx)(o.p,{children:"For example, in a YAML configuration file, another workflow can be referenced as follows:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",children:"type: flow\ndagName: sample_dag\ntasks:\n  - name: A\n    category: function\n    resourceName: rillflow://descriptorId\n"})}),"\n",(0,r.jsxs)(o.p,{children:["Here, the protocol part of ",(0,r.jsx)(o.code,{children:"resourceName"})," is ",(0,r.jsx)(o.code,{children:"rillflow"}),", indicating that ",(0,r.jsx)(o.code,{children:"resourceName"})," points to the descriptorId of another DAG diagram. When the specified workflow is completed or fails, the status of the current task will align with the execution status of that workflow, becoming either successful or failed.When the specified workflow is completed or failed, the current task status will be the same as that workflow, that is, success or failure."]}),"\n",(0,r.jsx)(o.p,{children:"This referencing mechanism simplifies the reuse of workflows, enhancing the flexibility and maintainability of workflow design."})]})}function f(e={}){const{wrapper:o}={...(0,t.a)(),...e.components};return o?(0,r.jsx)(o,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1151:(e,o,n)=>{n.d(o,{Z:()=>a,a:()=>s});var r=n(7294);const t={},i=r.createContext(t);function s(e){const o=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(i.Provider,{value:o},e.children)}}}]);