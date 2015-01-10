
Ext.define('AppDashboard.view.ReportGenerator',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.reportgenerator',
	requires : ['AppDashboard.view.ReporterForm','AppDashboard.view.EmptyPanel'],

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	flex : 1,
	items : [
         {
        	xtype : 'reporterform',
        	margin : 10
         },
         {
        	 xtype : 'container',
        	 layout : {
        			type : 'vbox',
        			align : 'stretch'
        		},
        	 hidden : false,
        	 margin : 5,
        	 flex : 1,
        	 items : [
        	         {
        	        	 xtype : 'panel',
        	        	 margin : 5,
        	        	 title : 'REPORTS',
        	        	 cls : 'datapanel',
        	        	 id: 'contentView',
        	        	 autoScroll : true,
        	        	 scroll : true,
        	        	 flex : 1,
        	        	 tools : [
    	     			     /*{
    	     			    	xtype: 'splitbutton',
    	     			    	margin: '0 5 0 0',
    	     			    	text: 'Search Options',
    	     			    	menu : new Ext.menu.Menu({
    	     			    		cls : 'filterByMenu',
    	     			    		id : 'searchBy',
    	     			    		items : []
    	     			    	}),
    	     			     },*/
    	     		         {
    	     		        	xtype: 'trigger',
    	     					trigger1Cls: 'x-form-clear-trigger',
    	     					trigger2Cls: 'x-form-search-trigger',
    	     					cls:'whitedropdown_search',
    	     					id: 'datafilter',
    	     					name: 'datafilter',
    	     					emptyText: 'Search',
    	     					margin: '1 1 1 0',
    	     					width: 220,
    	     					hidden: true,
    	     					getTriggerMarkup: function() {
    	     						var me = this,
    	     							i = 0,
    	     							hideTrigger = (me.readOnly || me.hideTrigger),
    	     							triggerCls,
    	     							triggerBaseCls = me.triggerBaseCls,
    	     							triggerConfigs = [],
    	     							unselectableCls = Ext.dom.Element.unselectableCls,
    	     							style = 'width:' + me.triggerWidth + 'px;' + (hideTrigger ? 'display:none;' : ''),
    	     							cls = me.extraTriggerCls + ' ' + Ext.baseCSSPrefix + 'trigger-cell ' + unselectableCls;
    	     	
    	     						if (!me.trigger1Cls) {
    	     							me.trigger1Cls = me.triggerCls;
    	     						}
    	     	
    	     						// Create as many trigger elements as we have trigger<n>Cls configs, but always at least one
    	     						for (i = 0; (triggerCls = me['trigger' + (i + 1) + 'Cls']) || i < 1; i++) {
    	     	
    	     								triggerConfigs.push({
    	     									tag: 'td',
    	     									role: 'presentation',
    	     									valign: 'top',
    	     									cls: cls,
    	     									id : 'CTrigger_'+i,
    	     									style: style,
    	     									cn: {
    	     										cls: [Ext.baseCSSPrefix + 'trigger-index-' + i, triggerBaseCls, triggerCls].join(' '),
    	     										role: 'presentation'
    	     									}
    	     								});
    	     						}
    	     						triggerConfigs[0].cn.cls += ' ' + triggerBaseCls + '-first';
    	     	
    	     						return Ext.DomHelper.markup(triggerConfigs);
    	     					},
    	     					onTrigger1Click : function() {
    	     						this.reset();
    	     					},
    	     					onTrigger2Click : function() {
    	     						//appCnt.mainGridSearch();
    	     					}
    	     		         }
    	     			],
        	        	 items : [
							{
								 xtype : 'emptypanel',
								 margin : 10
							}
        	        	 ]
        	         }
        	  ]
         }
         
	]
});