
Ext.define('AppDashboard.view.GridTemplate', {
	extend: 'Ext.grid.Panel',
	alias:'widget.gridtemplate',
	store: new Ext.data.Store({
		fields: ['Nick Name', 'HostName_OR_IP','OS','SystemName','componenetType','port','SID','hiddenField'],
		data: []
	}),
	autoScroll : true,
	scroll : true,
	cls:'gridSkin',
	emptyText : '<div class="resultTextBold" style="text-align:center;margin:16% auto auto auto">No data found.</div>',
	viewConfig : {
		deferEmptyText : false
	},
	title: 'REPORT NAME',
	columns : [
		{
			header: 'TRADE NUMBER',
			sortable: true,
			dataIndex: 'Nick Name',
			flex : 1,
			menuDisabled : false
		},
		{
			header: 'SYMBOL',
			sortable: true,
			menuDisabled : false,
			dataIndex: 'HostName_OR_IP',
			flex : 1
		},
		{
			header: 'TRADE QUANTITY',
			sortable: true,
			menuDisabled : true,
			dataIndex: 'OS',
			flex : 1
		},
		{
			header: 'PRICE',
			sortable: true,
			menuDisabled : true,
			dataIndex: 'SystemName',
			flex : 1
		},
		{
			header: 'PARTICIPANT SETTLER',
			sortable: false,
			menuDisabled : true,
			dataIndex: 'componenetType',
			flex : 1
		},
		{
			header: 'TM ID',
			sortable: false,
			dataIndex: 'port',
			width : 80,
			menuDisabled : true
		},
		{
			header: 'TRADE TIME',
			menuDisabled : true,
			sortable: false,
			dataIndex: 'SID',
			flex : 1
		}
	]
});



