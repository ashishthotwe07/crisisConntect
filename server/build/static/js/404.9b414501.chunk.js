"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[404],{1058:(e,t,s)=>{s.d(t,{A:()=>d});var r=s(5043),a=s(5394),o=s(3003),n=s(5327),c=s(9958),l=s(579);const i=(0,c.Ay)("http://localhost:3000");const d=function(e){let{toggleChat:t,user:s}=e;const[c,d]=(0,r.useState)(""),m=(0,r.useRef)(null),g=(0,o.wA)(),{messages:x}=(0,o.d4)(n.OX);return(0,r.useEffect)((()=>{g((0,n.Oz)({user:s}))}),[x]),(0,r.useEffect)((()=>{m.current&&m.current.scrollIntoView({behavior:"smooth"})}),[x]),(0,r.useEffect)((()=>(i.on("newMessage",(e=>{g((0,n.RL)(e))})),()=>{i.off("newMessage")})),[g]),(0,l.jsx)("div",{className:"fixed bottom-0 right-0 mb-4 mr-4",children:(0,l.jsx)("div",{className:"fixed bottom-16 right-4 w-96",children:(0,l.jsxs)("div",{className:"bg-white shadow-md rounded-lg max-w-lg w-full",children:[(0,l.jsxs)("div",{className:"p-4 border-b bg-gray-500 text-white rounded-t-lg flex justify-between items-center",children:[(0,l.jsx)("p",{className:"text-lg font-semibold",children:s}),(0,l.jsx)("button",{className:"text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400",onClick:t,children:(0,l.jsx)(a.lr4,{className:"text-xl"})})]}),(0,l.jsxs)("div",{className:"p-4 h-80 overflow-y-auto",children:[0===x.length?(0,l.jsx)("div",{className:"text-center text-gray-500 py-2",children:"Start a conversation"}):x.map(((e,t)=>(0,l.jsxs)("div",{className:"mb-2 ".concat(e.sender!==s?"text-right":""),children:[(0,l.jsx)("p",{className:"bg-".concat(e.sender===s?"red":"gray","-500 text-white rounded-lg py-2 px-4 inline-block"),children:e.message}),(0,l.jsx)("p",{children:new Date(e.createdAt).toLocaleTimeString()})]},t))),(0,l.jsx)("div",{ref:m})]}),(0,l.jsxs)("div",{className:"p-4 border-t flex",children:[(0,l.jsx)("input",{type:"text",placeholder:"Type a message",className:"w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500",value:c,onChange:e=>{d(e.target.value)}}),(0,l.jsx)("button",{className:"bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300",onClick:()=>{""!==c.trim()&&(g((0,n.RL)({message:c,user:s})),d(""))},children:"Send"})]})]})})})}},8404:(e,t,s)=>{s.r(t),s.d(t,{default:()=>g});var r=s(5043),a=s(3401),o=s(184),n=s(1058),c=s(579);const l=e=>{let{emergency:t}=e;const[s,a]=(0,r.useState)(!1),l=()=>{a(!s)};return(0,c.jsxs)("div",{className:"max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4",children:[(0,c.jsx)("img",{className:"cursor-pointer",src:"https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFwfGVufDB8fDB8fHww",alt:""}),(0,c.jsxs)("div",{className:"mt-4",children:[(0,c.jsxs)("div",{className:"",children:[(0,c.jsx)("h5",{className:"text-lg font-semibold text-gray-900",children:t.type}),(0,c.jsx)("p",{className:"text-sm font-semibold mt-5 text-gray-700",children:t.details})]}),(0,c.jsxs)("div",{className:"flex justify-between mt-5",children:[(0,c.jsxs)("p",{className:"mt-1 text-sm text-gray-700 font-semibold w-40",children:[(0,c.jsx)(o.vq8,{className:"inline "})," ",t.address]}),(0,c.jsxs)("p",{className:"mt-2 text-sm text-gray-700",children:[(0,c.jsx)(o.w_X,{className:"inline mr-2"}),(e=>{const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);if(t<60)return"".concat(t," second").concat(1!==t?"s":""," ago");if(t<3600){const e=Math.floor(t/60);return"".concat(e," minute").concat(1!==e?"s":""," ago")}if(t<86400){const e=Math.floor(t/3600);return"".concat(e," hour").concat(1!==e?"s":""," ago")}{const e=Math.floor(t/86400);return"".concat(e," day").concat(1!==e?"s":""," ago")}})(t.updatedAt)]})]})]}),(0,c.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,c.jsx)("a",{href:"/emergency/details/".concat(t._id),className:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",children:"Know More"}),(0,c.jsx)("button",{className:"bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500",onClick:l,children:"Message"})]}),s&&(0,c.jsx)(n.A,{toggleChat:l,user:t.user})]})};var i=s(9958),d=s(695),m=s(3003);const g=()=>{const[e,t]=(0,r.useState)([]),{user:s}=(0,m.d4)(d.at),o=(0,i.io)("http://localhost:3000");(0,r.useEffect)((()=>{n()}),[]);const n=async()=>{try{const e=localStorage.getItem("token"),r={Authorization:"Bearer ".concat(e)},a=await fetch("http://localhost:3000/api/emergency/reports",{headers:r});if(!a.ok)throw new Error("Failed to fetch emergency reports");let o=(await a.json()).data;s&&(o=o.filter((e=>e.user!==s._id))),t(o)}catch(e){a.oR.error(e.message)}},g=e.filter((e=>"resolved"!==e.status)),x=e.filter((e=>"resolved"===e.status));return g.sort(((e,t)=>new Date(t.timestamp)-new Date(e.timestamp))),o.on("newEmergencyReport",(e=>{n()})),o.on("updatedNotification",(e=>{n()})),(0,c.jsxs)("div",{className:"w-2/3 m-auto",children:[g.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("h1",{className:"text-2xl font-bold text-center m-10 mb-4",children:"Recent Emergency Reports"}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:g.reverse().map((e=>(0,c.jsx)(l,{emergency:e},e._id)))})]}),x.length>0&&(0,c.jsxs)("div",{className:"mt-8",children:[(0,c.jsx)("h2",{className:"text-xl font-semibold mb-4 text-center",children:"Resolved Reports"}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:x.map((e=>(0,c.jsx)(l,{emergency:e},e._id)))})]})]})}}}]);
//# sourceMappingURL=404.9b414501.chunk.js.map