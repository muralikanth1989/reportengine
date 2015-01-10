Ext.define("Ext.ux.DataView.DragSelector",{requires:["Ext.dd.DragTracker","Ext.util.Region"],init:function(a){this.dataview=a;a.mon(a,{beforecontainerclick:this.cancelClick,scope:this,render:{fn:this.onRender,scope:this,single:true}});},onRender:function(){this.tracker=Ext.create("Ext.dd.DragTracker",{dataview:this.dataview,el:this.dataview.el,dragSelector:this,onBeforeStart:this.onBeforeStart,onStart:this.onStart,onDrag:this.onDrag,onEnd:this.onEnd});
this.dragRegion=Ext.create("Ext.util.Region");},onBeforeStart:function(a){return a.target==this.dataview.getEl().dom;},onStart:function(b){var c=this.dragSelector,a=this.dataview;this.dragging=true;c.fillRegions();c.getProxy().show();a.getSelectionModel().deselectAll();},cancelClick:function(){return !this.tracker.dragging;
},onDrag:function(l){var b=this.dragSelector,k=b.dataview.getSelectionModel(),q=b.dragRegion,p=b.bodyRegion,n=b.getProxy(),g=b.regions,c=g.length,m=this.startXY,s=this.getXY(),f=Math.min(m[0],s[0]),d=Math.min(m[1],s[1]),a=Math.abs(m[0]-s[0]),r=Math.abs(m[1]-s[1]),o,h,j;Ext.apply(q,{top:d,left:f,right:f+a,bottom:d+r});
q.constrainTo(p);n.setRegion(q);for(j=0;j<c;j++){o=g[j];h=q.intersect(o);if(h){k.select(j,true);}else{k.deselect(j);}}},onEnd:Ext.Function.createDelayed(function(c){var a=this.dataview,b=a.getSelectionModel(),d=this.dragSelector;this.dragging=false;d.getProxy().hide();},1),getProxy:function(){if(!this.proxy){this.proxy=this.dataview.getEl().createChild({tag:"div",cls:"x-view-selector"});
}return this.proxy;},fillRegions:function(){var a=this.dataview,b=this.regions=[];a.all.each(function(c){b.push(c.getRegion());});this.bodyRegion=a.getEl().getRegion();}});