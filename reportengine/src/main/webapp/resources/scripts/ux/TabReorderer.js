Ext.define("Ext.ux.TabReorderer",{extend:"Ext.ux.BoxReorderer",itemSelector:".x-tab",init:function(b){var a=this;a.callParent([b.getTabBar()]);b.onAdd=Ext.Function.createSequence(b.onAdd,a.onAdd);},afterFirstLayout:function(){var c,a,b=0,d;this.callParent(arguments);for(c=this.container.items.items,a=c.length;
b<a;b++){d=c[b];if(d.card){d.reorderable=d.card.reorderable;}}},onAdd:function(b,a){b.tab.reorderable=b.reorderable;},afterBoxReflow:function(){var a=this;Ext.ux.BoxReorderer.prototype.afterBoxReflow.apply(a,arguments);if(a.dragCmp){a.container.tabPanel.setActiveTab(a.dragCmp.card);a.container.tabPanel.move(a.startIndex,a.curIndex);
}}});