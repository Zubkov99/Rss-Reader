if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let c={};const o=e=>s(e,t),f={module:{uri:t},exports:c,require:o};i[t]=Promise.all(n.map((e=>f[e]||o(e)))).then((e=>(r(...e),c)))}}define(["./workbox-f683aea5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"458c37cc3a4547f7ea48244071e0d3c6"},{url:"main.css",revision:"bcfe69549f3ef538c33ab987db11337b"},{url:"main.js",revision:"4485fc537ab8d7f1bc8f48c5a79ddd27"},{url:"main.js.LICENSE.txt",revision:"4498ca9af3e316d61817ccc8b2788526"}],{})}));
