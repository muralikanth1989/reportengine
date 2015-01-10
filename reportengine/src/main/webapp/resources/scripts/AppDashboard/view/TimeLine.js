
Ext.define('AppDashboard.view.TimeLine',{
	extend:'Ext.panel.Panel',
	alias:'widget.timeline',
	layout : 'hbox',
	defaults:{
		labelAlign: 'top',
		labelSeparator:''
	},
	items:[
			{
				fieldLabel:'Timeline',
				xtype:'combo',
				hidden : true,
				id: 'reporttimeline',
				name: 'reporttimeline',
				displayField: 'displayField',
				valueField: 'valueField',
				queryMode: 'local',
				store: Ext.data.Store(
					{
						fields: ['displayField', 'valueField'],
						data: []
					}
				),
				width:90,
				margin:'0 0 0 10',
				cls: 'dropdown',
				editable : false
			},
			{
				xtype: 'datefield',
				id: 'fromDate',
				name: 'fromDate',
				format: 'Y-m-d',
				fieldLabel:'From',
				cls: 'datepicker',
				width: 110,
				margin:'0 0 0 10',
				editable : false,
				value : '2014-05-02'
				//value : new Date()
			},
			{
				xtype: 'datefield',
				id: 'toDate',
				name: 'toDate',
				format: 'Y-m-d',
				fieldLabel:'To',
				cls: 'datepicker',
				width: 110,
				margin:'0 0 0 10',
				editable : false,
				value : '2014-05-02'
			    //value : new Date()
			},
			{
				xtype:'button',
				text: "SUBMIT",
				margin:'24 0 0 10',
				cls: "button20",
				id: "submit",
				name: "submit"
			}
		]
});




