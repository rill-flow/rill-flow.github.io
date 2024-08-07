"use strict";(self.webpackChunkrill_flow_github_io=self.webpackChunkrill_flow_github_io||[]).push([[8088],{2457:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var r=t(5893),i=t(1151);const s={sidebar_position:4},a="Context and Parameter Mapping",o={id:"user-guide/defination/context-and-mapping",title:"Context and Parameter Mapping",description:"Context",source:"@site/i18n/en/docusaurus-plugin-content-docs/current/user-guide/03-defination/04-context-and-mapping.md",sourceDirName:"user-guide/03-defination",slug:"/user-guide/defination/context-and-mapping",permalink:"/en/docs/user-guide/defination/context-and-mapping",draft:!1,unlisted:!1,editUrl:"https://crowdin.com/project/rill-flow/en",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Executor",permalink:"/en/docs/user-guide/defination/executor"},next:{title:"Flow Control",permalink:"/en/docs/user-guide/defination/control"}},c={},d=[{value:"Context",id:"context",level:2},{value:"Parameter Mapping",id:"parameter-mapping",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"context-and-parameter-mapping",children:"Context and Parameter Mapping"}),"\n",(0,r.jsx)(n.h2,{id:"context",children:"Context"}),"\n",(0,r.jsx)(n.p,{children:'During the execution of Rill Flow workflows, each process is allocated a separate storage area, known as the "context." Each workflow instance has its own context, and contexts are isolated between different instances.Each of the workflow examples has its own context and the context between the different examples is separate.'}),"\n",(0,r.jsx)(n.p,{children:"Variables defined in context can be passed and used between task nodes.Variables defined in the context can be passed and used between task nodes. During execution, the context can be read and written to, with Rill Flow ensuring concurrency safety during node execution."}),"\n",(0,r.jsxs)(n.p,{children:["The context variable is referenced in the format ",(0,r.jsx)(n.code,{children:"$.context.xxxx"})," in the flowchart presentation.In the workflow orchestration, context variables are referenced using the ",(0,r.jsx)(n.code,{children:"$.context.xxx"})," format. When initiating a workflow execution via the ",(0,r.jsx)(n.code,{children:"/flow/submit.json"})," interface, users can pass the required context variables in the request body to access them during task execution."]}),"\n",(0,r.jsx)(n.h2,{id:"parameter-mapping",children:"Parameter Mapping"}),"\n",(0,r.jsx)(n.p,{children:"In each task of a Rill Flow workflow, the configured mapping rules are used to map context variables to the required input parameters of the task node and update the execution results back to the context for use by subsequent tasks."}),"\n",(0,r.jsx)(n.p,{children:"Rill Flow supports three types of parameter mapping rules:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"inputMapping"}),": Input parameter mapping, which maps context variables to the input parameters of the task node."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"outputMapping"}),": Output parameter mapping, which maps the execution results of the task node back to the context for subsequent tasks."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"commonMapping"}),": Common parameter mapping, which can be reused by referencing through the ",(0,r.jsx)(n.code,{children:"reference"})," attribute."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Parameter Mapping Diagram",src:t(9018).Z+"",width:"690",height:"241"})}),"\n",(0,r.jsxs)(n.p,{children:["In Rill Flow, you can define multiple parameter mappings for each task. Each mapping must contain ",(0,r.jsx)(n.code,{children:"source"})," and ",(0,r.jsx)(n.code,{children:"target"})," attributes, both of which are of ",(0,r.jsx)(n.code,{children:"string"})," type and are formatted as ",(0,r.jsx)(n.a,{href:"https://github.com/json-path/JsonPath",children:"JsonPath"})," expressions. These expressions start with ",(0,r.jsx)(n.code,{children:"$"})," and can reference the following built-in variables",":These"," expressions begin with ",(0,r.jsx)(n.code,{children:"$"})," and can be referenced with the following built-in variable\uff1a"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"$.context"}),": Represents the workflow context."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"$.input"}),": Represents the input parameters of a task."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"$.output"}),": Represents the output parameters of a task."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["For example, to map the ",(0,r.jsx)(n.code,{children:"foo"})," attribute from the context to the ",(0,r.jsx)(n.code,{children:"bar"})," parameter of a task, you can define the following mapping:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"inputMapping:\n  - source: $.context.foo\n    target: $input.bar\n"})}),"\n",(0,r.jsxs)(n.p,{children:["In this example, if the value of ",(0,r.jsx)(n.code,{children:"foo"})," in the context is ",(0,r.jsx)(n.code,{children:"hello"}),", the dispatcher will generate the following JSON and pass it to the execution node when executing the task:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'LO\n  "bar": "hello"\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["You can also define mappings with a two-layer structure. Rill Flow will automatically create an intermediate ",(0,r.jsx)(n.code,{children:"map"})," type structure, for example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"inputMappings:\n  - source: $.context.name\n    target: $input.input.user.name\n"})}),"\n",(0,r.jsxs)(n.p,{children:["If ",(0,r.jsx)(n.code,{children:'$context.name="hello"'}),", the generated input structure will be:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'LO\n  "user": LO\n    "name": "hello"\n  }\n}\n'})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Note: Rill Flow does not support automatic creation of complex structures with more than two layers."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["In Rill Flow, mapping parameters are defined to transform context and input/output parameters during task execution. The mapping parameters have the following attributes",":Map"," parameters have the following attributes\uff1a"]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter Name"}),(0,r.jsx)(n.th,{children:"Required"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"source"}),(0,r.jsx)(n.td,{children:"Yes"}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsxs)(n.td,{children:["Enter the source.The source of input. If it starts with ",(0,r.jsx)(n.code,{children:"$"}),", it is considered a ",(0,r.jsx)(n.a,{href:"https://github.com/json-path/JsonPath",children:"JsonPath"})," expression; otherwise, it is treated as a string constant."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Target"}),(0,r.jsx)(n.td,{children:"Yes"}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsxs)(n.td,{children:["The target location for output parameters, must be a JsonPath expression starting with ",(0,r.jsx)(n.code,{children:"$"}),"."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"olerance"}),(0,r.jsx)(n.td,{children:"No"}),(0,r.jsx)(n.td,{children:"boolean"}),(0,r.jsx)(n.td,{children:"Error tolerance settings.Error tolerance setting. False indicates intolerance to errors, causing the entire mapping to fail on exception; unset or true indicates tolerance, skipping the mapping rule on exception."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Reference"}),(0,r.jsx)(n.td,{children:"No"}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsxs)(n.td,{children:["References a common parameter mapping defined in ",(0,r.jsx)(n.code,{children:"commonMapping"}),"."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Transform"}),(0,r.jsx)(n.td,{children:"No"}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsxs)(n.td,{children:["Uses ",(0,r.jsx)(n.a,{href:"https://github.com/killme2008/aviatorscript",children:"Aviator"})," expressions to transform the value obtained from ",(0,r.jsx)(n.code,{children:"mapping.source"})," and store it in ",(0,r.jsx)(n.code,{children:"mapping.target"}),". Currently, it supports only predefined variables including ",(0,r.jsx)(n.code,{children:"source"})," (mapping.source) and ",(0,r.jsx)(n.code,{children:"context"})," (the current task's context).Only pre-defined variables are currently supported, including\uff1a",(0,r.jsx)(n.code,{children:"source"}),"(mapping.source), ",(0,r.jsx)(n.code,{children:"context"})," (context of the current task)."]})]})]})]}),"\n",(0,r.jsxs)(n.p,{children:["Configuration rules: Use ",(0,r.jsx)(n.code,{children:"inputMappings"})," to configure task input (context to input mapping) and ",(0,r.jsx)(n.code,{children:"outputMappings"})," to configure task output (output to context mapping). Both ",(0,r.jsx)(n.code,{children:"inputMappings"})," and ",(0,r.jsx)(n.code,{children:"outputMappings"})," are arrays.Both ",(0,r.jsx)(n.code,{children:"inputMappings"})," and ",(0,r.jsx)(n.code,{children:"outputMappings"})," have an array of values."]}),"\n",(0,r.jsx)(n.p,{children:"Example configuration:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'type: flow\ndagName: sample_dag\ncommonMapping:\n  commonInput:\n    - source: $.context. ser\n      target: $input. ser\ntasks:\n  - name: A\n    inputMapping:\n      - source: $.context. rlCon\n        target: $input. rl\n      - source: "hello"\n        target: $input. next\n      - reference: commonInput\n    outputMappings:\n      - source: $. utput.segments\n        target: $context.segments\n'})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},9018:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/context_mapping-df09778b5bb7930371eab6227c2f64cd.svg"},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>a});var r=t(7294);const i={},s=r.createContext(i);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);