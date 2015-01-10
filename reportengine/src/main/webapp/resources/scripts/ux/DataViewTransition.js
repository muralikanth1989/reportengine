Ext.ux.DataViewTransition=Ext.extend(Object,{defaults:{duration:750,idProperty:"id"},constructor:function(a){Ext.apply(this,a||{},this.defaults);},init:function(a){this.dataview=a;var b=this.idProperty;a.blockRefresh=true;a.updateIndexes=Ext.Function.createSequence(a.updateIndexes,function(){this.getTargetEl().select(this.itemSelector).each(function(d,e,c){d.id=d.dom.id=Ext.util.Format.format("{0}-{1}",a.id,a.store.getAt(c).get(b));
},this);},a);this.dataviewID=a.id;this.cachedStoreData={};this.cacheStoreData(a.store.snapshot);a.store.on("datachanged",function(m){var j=a.getTargetEl(),f=m.getAt(0),p=this.getAdded(m),y=this.getRemoved(m),g=this.getRemaining(m),u=Ext.apply({},g,p);Ext.each(y,function(k){Ext.fly(this.dataviewID+"-"+k.get(this.idProperty)).animate({remove:false,duration:c,opacity:0,useDisplay:true});
},this);if(f==undefined){this.cacheStoreData(m);return;}var e=Ext.get(this.dataviewID+"-"+f.get(this.idProperty));var A=m.getCount(),i=e.getMargin("lr")+e.getWidth(),v=e.getMargin("bt")+e.getHeight(),r=j.getWidth(),d=Math.floor(r/i),q=Math.ceil(A/d),B=Math.ceil(this.getExistingCount()/d);j.applyStyles({display:"block",position:"relative"});
var h={},C={},s={};Ext.iterate(g,function(E,D){var E=D.get(this.idProperty),k=s[E]=Ext.get(this.dataviewID+"-"+E);h[E]={top:k.getTop()-j.getTop()-k.getMargin("t")-j.getPadding("t"),left:k.getLeft()-j.getLeft()-k.getMargin("l")-j.getPadding("l")};},this);Ext.iterate(g,function(F,E){var k=h[F],D=s[F];if(D.getStyle("position")!="absolute"){s[F].applyStyles({position:"absolute",left:k.left+"px",top:k.top+"px",width:D.getWidth(!Ext.isIE||Ext.isStrict),height:D.getHeight(!Ext.isIE||Ext.isStrict)});
}});var o=0;Ext.iterate(m.data.items,function(E){var I=E.get(b),D=s[I];var k=o%d,H=Math.floor(o/d),G=H*v,F=k*i;C[I]={top:G,left:F};o++;},this);var t=new Date(),c=this.duration,l=this.dataviewID;var z=function(){var L=new Date()-t,N=L/c;if(N>=1){for(var k in C){Ext.fly(l+"-"+k).applyStyles({top:C[k].top+"px",left:C[k].left+"px"});
}Ext.TaskManager.stop(x);}else{for(var k in C){if(!g[k]){continue;}var F=h[k],I=C[k],G=F.top,J=I.top,E=F.left,K=I.left,H=N*Math.abs(G-J),M=N*Math.abs(E-K),O=G>J?G-H:G+H,D=E>K?E-M:E+M;Ext.fly(l+"-"+k).applyStyles({top:O+"px",left:D+"px"});}}};var x={run:z,interval:20,scope:this};Ext.TaskManager.start(x);
var n=0;for(var w in p){n++;}if(Ext.global.console&&Ext.global.console.log){Ext.global.console.log("added:",n);}Ext.iterate(p,function(D,k){Ext.fly(this.dataviewID+"-"+k.get(this.idProperty)).applyStyles({top:C[k.get(this.idProperty)].top+"px",left:C[k.get(this.idProperty)].left+"px"});Ext.fly(this.dataviewID+"-"+k.get(this.idProperty)).animate({remove:false,duration:c,opacity:1});
},this);this.cacheStoreData(m);},this);},cacheStoreData:function(a){this.cachedStoreData={};a.each(function(b){this.cachedStoreData[b.get(this.idProperty)]=b;},this);},getExisting:function(){return this.cachedStoreData;},getExistingCount:function(){var c=0,b=this.getExisting();for(var a in b){c++;}return c;
},getAdded:function(a){var b={};a.each(function(c){if(this.cachedStoreData[c.get(this.idProperty)]==undefined){b[c.get(this.idProperty)]=c;}},this);return b;},getRemoved:function(a){var b=[];for(var c in this.cachedStoreData){if(a.findExact(this.idProperty,Number(c))==-1){b.push(this.cachedStoreData[c]);
}}return b;},getRemaining:function(a){var b={};a.each(function(c){if(this.cachedStoreData[c.get(this.idProperty)]!=undefined){b[c.get(this.idProperty)]=c;}},this);return b;}});