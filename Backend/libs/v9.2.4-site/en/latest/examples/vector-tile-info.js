"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1176],{18851:function(e,t,n){var r=n(4158),s=n(41564),i=n(88887),o=n(98267),c=n(87240);const a=new s.A({target:"map",view:new c.Ay({center:[0,0],zoom:2}),layers:[new i.A({source:new o.A({format:new r.A,url:"https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"})})]});a.on("pointermove",(function(e){const t=a.getFeaturesAtPixel(e.pixel);if(0==t.length)return l.innerText="",void(l.style.opacity=0);const n=t[0].getProperties();l.innerText=JSON.stringify(n,null,2),l.style.opacity=1}));const l=document.getElementById("info")}},function(e){var t;t=18851,e(e.s=t)}]);
//# sourceMappingURL=vector-tile-info.js.map