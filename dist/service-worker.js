if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),f={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f683aea5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"643f3d0af0c13f3c20f99fb48021f28a"},{url:"main.css",revision:"bcfe69549f3ef538c33ab987db11337b"},{url:"main.js",revision:"226be0e1422ae03838caca1e759486d9"},{url:"main.js.LICENSE.txt",revision:"4498ca9af3e316d61817ccc8b2788526"}],{})}));
