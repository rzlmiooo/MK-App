"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1392],{7499:function(t,e,n){var a=n(41564),r=n(87240),o=n(55238),s=n(28e3),u=n(96256);const c={};function i(t,e){return["+",["*",65280,["band",1,t,e]],["*",255,["band",2,t,e]],["*",255/256,["band",3,t,e]],-32768]}const l=["*",2,["resolution"]],v=["*",["var","vert"],i(-1,0)],m=["/",["-",["*",["var","vert"],i(1,0)],v],l],b=["*",["var","vert"],i(0,-1)],d=["/",["-",["*",["var","vert"],i(0,1)],b],l],h=["atan",["sqrt",["+",["^",m,2],["^",d,2]]]],p=["clamp",["atan",["-",0,m],d],-Math.PI,Math.PI],f=["*",Math.PI/180,["var","sunEl"]],w=["*",255,["+",["*",["sin",f],["cos",h]],["*",["cos",f],["sin",h],["cos",["-",["*",Math.PI/180,["var","sunAz"]],p]]]]],y=new u.A({opacity:.3,source:new o.A({url:"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",maxZoom:15,attributions:'<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank">Data sources and attribution</a>'}),style:{variables:c,color:["color",w]}});["vert","sunEl","sunAz"].forEach((function(t){const e=document.getElementById(t),n=document.getElementById(t+"Out");function a(){n.innerText=e.value,c[t]=Number(e.value)}a(),e.addEventListener("input",(function(){a(),y.updateStyleVariables(c)}))}));new a.A({target:"map",layers:[new u.A({source:new s.A}),y],view:new r.Ay({center:[-13615645,4497969],zoom:13})})}},function(t){var e;e=7499,t(t.s=e)}]);
//# sourceMappingURL=webgl-shaded-relief.js.map