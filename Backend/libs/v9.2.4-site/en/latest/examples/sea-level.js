"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4953],{40692:function(e,t,n){var o=n(41564),r=n(87240),a=n(12185),i=n(47085),s=n(55238),c=n(54272),l=n(28487);const p="get_your_own_D6rA4zTHduk6KOKTXzGB",u=new s.A({url:"https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key="+p,tileSize:512,maxZoom:14,crossOrigin:"",interpolate:!1}),m=new c.Ay({sources:[u],operation:function(e,t){const n=e[0];if(n[3]){.1*(256*n[0]*256+256*n[1]+n[2])-1e4<=t.level?(n[0]=134,n[1]=203,n[2]=249,n[3]=255):n[3]=0}return n}}),w=new o.A({target:"map",layers:[new a.A({source:new s.A({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key="+p,tileSize:512,maxZoom:22})}),new i.A({opacity:.6,source:m})],view:new r.Ay({center:(0,l.Rb)([-122.3267,37.8377]),zoom:11})}),g=document.getElementById("level"),y=document.getElementById("output");g.addEventListener("input",(function(){y.innerText=g.value,m.changed()})),y.innerText=g.value,m.on("beforeoperations",(function(e){e.data.level=g.value}));const b=document.getElementsByClassName("location");for(let e=0,t=b.length;e<t;++e)b[e].addEventListener("click",d);function d(e){const t=e.target.dataset,n=w.getView();n.setCenter((0,l.Rb)(t.center.split(",").map(Number))),n.setZoom(Number(t.zoom))}}},function(e){var t;t=40692,e(e.s=t)}]);
//# sourceMappingURL=sea-level.js.map