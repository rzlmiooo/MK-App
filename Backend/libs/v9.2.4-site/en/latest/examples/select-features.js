"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4549],{62240:function(e,t,n){var o=n(49208),l=n(41564),c=n(68266),s=n(23986),r=n(29810),i=n(87240),u=n(88292),a=n(38276),d=n(44689),g=n(38808);const w=new u.Ay({fill:new a.A({color:"#eeeeee"})}),f=new s.A({source:new r.A({url:"https://openlayers.org/data/vector/ecoregions.json",format:new o.A}),background:"white",style:function(e){const t=e.get("COLOR")||"#eeeeee";return w.getFill().setColor(t),w}}),A=new l.A({layers:[f],target:"map",view:new i.Ay({center:[0,0],zoom:2})});let y=null;const h=new u.Ay({fill:new a.A({color:"#eeeeee"}),stroke:new d.A({color:"rgba(255, 255, 255, 0.7)",width:2})});function p(e){const t=e.get("COLOR")||"#eeeeee";return h.getFill().setColor(t),h}const k=new c.A({style:p}),m=new c.A({condition:g.jM,style:p}),v=new c.A({condition:g.N1,style:p}),C=new c.A({style:p,condition:function(e){return(0,g.jM)(e)&&(0,g.Js)(e)}}),b=document.getElementById("type"),I=function(){null!==y&&A.removeInteraction(y);const e=b.value;y="singleclick"==e?k:"click"==e?m:"pointermove"==e?v:"altclick"==e?C:null,null!==y&&(A.addInteraction(y),y.on("select",(function(e){document.getElementById("status").innerHTML="&nbsp;"+e.target.getFeatures().getLength()+" selected features (last operation selected "+e.selected.length+" and deselected "+e.deselected.length+" features)"})))};b.onchange=I,I()}},function(e){var t;t=62240,e(e.s=t)}]);
//# sourceMappingURL=select-features.js.map