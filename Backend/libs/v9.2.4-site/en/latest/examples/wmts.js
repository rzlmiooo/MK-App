"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8508],{80759:function(e,t,a){var r=a(41564),s=a(28e3),n=a(12185),o=a(87240),i=a(58212),l=a(35603),w=a(28487),c=a(16235);const g=(0,w.Jt)("EPSG:3857"),p=g.getExtent(),u=(0,c.RG)(p)/256,m=new Array(19),y=new Array(19);for(let e=0;e<19;++e)m[e]=u/Math.pow(2,e),y[e]=e;new r.A({layers:[new n.A({source:new s.A}),new n.A({opacity:.7,source:new i.A({attributions:'Tiles © <a href="https://mrdata.usgs.gov/geology/state/" target="_blank">USGS</a>',url:"https://mrdata.usgs.gov/mapcache/wmts",layer:"sgmc2",matrixSet:"GoogleMapsCompatible",format:"image/png",projection:g,tileGrid:new l.A({origin:(0,c.Py)(p),resolutions:m,matrixIds:y}),style:"default",wrapX:!0})})],target:"map",view:new o.Ay({center:[-11158582,4813697],zoom:4})})}},function(e){var t;t=80759,e(e.s=t)}]);
//# sourceMappingURL=wmts.js.map