"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5109],{89184:function(e,t,n){var s=n(49208),r=n(41564),o=n(23986),a=n(29810),i=n(87240),l=n(88292),w=n(59194),c=n(38276),f=n(44689);const u=new r.A({target:"map",view:new i.Ay({center:[0,0],zoom:2,extent:[-13882269,2890586,-7456136,6340207],showFullExtent:!0})}),A=new l.Ay({text:new w.A({font:"13px Calibri,sans-serif",fill:new c.A({color:"#000"}),stroke:new f.A({color:"#fff",width:4})})}),p=[new l.Ay({fill:new c.A({color:"rgba(255, 255, 255, 0.6)"}),stroke:new f.A({color:"#319FD3",width:1})}),A],d=new o.A({background:"white",source:new a.A({url:"https://openlayers.org/data/vector/us-states.json",format:new s.A}),style:function(e){return A.getText().setText([e.getId(),"bold 13px Calibri,sans-serif",` ${e.get("name")}`,"","\n","",`${e.get("density")} people/mi²`,"italic 11px Calibri,sans-serif"]),p}});u.addLayer(d)}},function(e){var t;t=89184,e(e.s=t)}]);
//# sourceMappingURL=rich-text-labels.js.map