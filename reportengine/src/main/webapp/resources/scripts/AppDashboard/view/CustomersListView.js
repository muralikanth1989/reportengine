

Ext.define('AppDashboard.view.CustomersListView', {
	extend: 'Ext.grid.Panel',
	alias:'widget.customerslistview',
	
	requires : ['Ext.ux.data.PagingMemoryProxy'],
	autoScroll : true,
	scroll : true,
	dataStore : null,
	pageLimit : 40,
	cls:'gridSkin',
	emptyText : '<div class = "iconMessage" style="margin:15% auto auto auto"></div><div class="errorMessageText" style="text-align:center">No data found for your search.</div>',
	viewConfig : {
		deferEmptyText : false
	},
	
	tools: [
	     {
	    	xtype: 'button',
			cls: 'buttonAdd',
			style : {
				'padding':'0px !important'
			},
            itemId: 'add',
            text: 'Add Customer'
        },
        { xtype: 'tbspacer', width: 10 },
        //{
        //	xtype: 'button',
		//	cls: 'buttonAdd',
		//	style : {
		//		'padding':'0px !important'
		//	},
        //    text: 'Delete Selected',
        //    disabled : true,
        //    itemId: 'delete'
        //}
        {
	        	xtype: 'trigger',
				trigger1Cls: 'x-form-clear-trigger',
				trigger2Cls: 'x-form-search-trigger',
				cls:'whitedropdown_search',
				id: 'datafilter1',
				name: 'datafilter1',
				emptyText: 'Search by client code',
				margin: '1 1 1 5',
				width: 220,
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
	
	flex : 1,
	margin : 10,
	title: 'AVAILABLE CUSTOMERS',
	
	initComponent : function()
	{
		var me = this;
		//this.selModel = new Ext.selection.CheckboxModel({
		//	checkOnly: true,
		//	cls:'checkbt',
		//	injectCheckbox: 'first',
		//});
		
		this.store = Ext.create('Ext.data.Store', {
			fields: [
			     	{name: 'ClientCode',  type: 'string'},
			     	{name: 'ClientName',   type: 'string'},
			     	{name: 'CostCenterCode', type: 'string'},
			     	{name: 'CostCenterName', type: 'string'},
			     	{name: 'IntroBy', type: 'string'},
			     	{name: 'SubBrokerName', type: 'string'},
			     	{name: 'PanNo', type: 'string'},
			     	{name: 'MobileNumber', type: 'int'},
			     	{name: 'EmailID', type: 'string'},
			     	{name: 'SchemeCode', type: 'string'},
			     	{name: 'SchemeName', type: 'string'},
			     	{name: 'DateOfJoin', type: 'date'}
			],
			pageSize : me.pageLimit,
			data : me.dataStore,
			proxy: {
		        type: 'pagingmemory',
		        reader: {
		            type: 'json'
		        }
		    }
		});
	
		this.columns = [
			{
				header : '<div class="iconEdit"></div>',
				xtype: 'actioncolumn',
				width: 40,
				id: 'EditOver',
				//icon: 'resources/images/edit.png',
				iconCls: 'iconEdit',
				tooltip: 'Modify',
				sortable: false,
				handler: function(grid, rowIndex, colIndex) {
					//appCnt.handleEditIconClick(grid, rowIndex, colIndex);
				}
			},
			{
				header: 'Client Code',
				sortable: true,
				dataIndex: 'ClientCode',
				width : 200,
				menuDisabled : true
			},
			{
				header: 'Client Name',
				sortable: true,
				menuDisabled : true,
				dataIndex: 'ClientName',
				width : 200,
			},
			{
				header: 'Costcenter Code',
				sortable: true,
				menuDisabled : true,
				dataIndex: 'CostCenterCode',
				width : 200
			},
			{
				header: 'Costcenter Name',
				sortable: true,
				menuDisabled : true,
				dataIndex: 'CostCenterName',
				width : 200
			},
			{
				header: 'Intro By',
				sortable: true,
				menuDisabled : true,
				dataIndex: 'IntroBy',
				width : 200
			},
			{
				header: 'Sub Broker Name',
				sortable: true,
				dataIndex: 'SubBrokerName',
				width : 200,
				menuDisabled : true
			},
			{
				header: 'Pan No',
				menuDisabled : true,
				sortable: false,
				dataIndex: 'PanNo',
				width : 200
			},
			{
				header: 'Mobile No',
				sortable: true,
				dataIndex: 'mobile',
				menuDisabled : true,
				width : 200
			},
			{
				header: 'E-mail ID',
				sortable: true,
				dataIndex: 'EmailID',
				menuDisabled : true,
				width : 200
			},
			{
				header: 'Scheme Code',
				sortable: true,
				dataIndex: 'SchemeCode',
				menuDisabled : true,
				width : 200
			},
			{
				header: 'Scheme Name',
				sortable: true,
				dataIndex: 'SchemeName',
				menuDisabled : true,
				width : 200
			},
			{
				header: 'Date of Joining',
				sortable: true,
				dataIndex: 'DateOfJoin',
				menuDisabled : true,
				xtype : 'datecolumn',
				//renderer: Ext.util.Format.dateRenderer('m/d/Y'),
				width : 200
			},
		]
	
		this.dockedItems = [{
	        xtype: 'pagingtoolbar',
	        cls : 'pagingtoolbar',
	        store: me.store,
	        dock: 'bottom',
	        displayInfo: true
	    }]
		this.callParent();
	}
});



