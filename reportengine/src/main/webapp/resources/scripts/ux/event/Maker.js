Ext.define("Ext.ux.event.Maker",{eventQueue:[],startAfter:500,timerIncrement:500,currentTiming:0,constructor:function(a){var b=this;b.currentTiming=b.startAfter;if(!Ext.isArray(a)){a=[a];}Ext.Array.each(a,function(c){c.el=c.el||"el";Ext.Array.each(Ext.ComponentQuery.query(c.cmpQuery),function(g){var f={},d,h,e;
if(!c.domQuery){e=g[c.el];}else{e=g.el.down(c.domQuery);}f.target="#"+e.dom.id;f.type=c.type;f.button=a.button||0;d=e.getX()+(e.getWidth()/2);h=e.getY()+(e.getHeight()/2);f.xy=[d,h];f.ts=b.currentTiming;b.currentTiming+=b.timerIncrement;b.eventQueue.push(f);});if(c.screenshot){b.eventQueue[b.eventQueue.length-1].screenshot=true;
}});return b.eventQueue;}});