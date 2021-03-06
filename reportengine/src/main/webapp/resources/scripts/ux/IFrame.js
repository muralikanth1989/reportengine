/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.define("Ext.ux.IFrame",{extend:"Ext.Component",alias:"widget.uxiframe",loadMask:"Loading...",src:"about:blank",renderTpl:['<iframe src="{src}" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>'],initComponent:function(){this.callParent();
this.frameName=this.frameName||this.id+"-frame";this.addEvents("beforeload","load");Ext.apply(this.renderSelectors,{iframeEl:"iframe"});},initEvents:function(){var c=this,b=c.iframeEl.dom,a=c.getFrame();c.callParent();c.iframeEl.on("load",c.onLoad,c);},initRenderData:function(){return Ext.apply(this.callParent(),{src:this.src,frameName:this.frameName});
},getBody:function(){var a=this.getDoc();return a.body||a.documentElement;},getDoc:function(){try{return this.getWin().document;}catch(a){return null;}},getWin:function(){var b=this,a=b.frameName,c=Ext.isIE?b.iframeEl.dom.contentWindow:window.frames[a];return c;},getFrame:function(){var a=this;return a.iframeEl.dom;
},beforeDestroy:function(){var a=this,c,d;if(a.rendered){try{c=a.getDoc();if(c){Ext.EventManager.removeAll(c);for(d in c){if(c.hasOwnProperty&&c.hasOwnProperty(d)){delete c[d];}}}}catch(b){}}a.callParent();},onLoad:function(){var b=this,d=b.getDoc(),a=b.onRelayedEvent;if(d){try{Ext.EventManager.removeAll(d);
Ext.EventManager.on(d,{mousedown:a,mousemove:a,mouseup:a,click:a,dblclick:a,scope:b});}catch(c){}Ext.EventManager.on(window,"unload",b.beforeDestroy,b);this.el.unmask();this.fireEvent("load",this);}else{if(b.src&&b.src!=""){this.el.unmask();this.fireEvent("error",this);}}},onRelayedEvent:function(c){var b=this.iframeEl,d=b.getXY(),a=c.getXY();
c.xy=[d[0]+a[0],d[1]+a[1]];c.injectEvent(b);c.xy=a;},load:function(d){var a=this,c=a.loadMask,b=a.getFrame();if(a.fireEvent("beforeload",a,d)!==false){if(c&&a.el){a.el.mask(c);}b.src=a.src=(d||a.src);}}});