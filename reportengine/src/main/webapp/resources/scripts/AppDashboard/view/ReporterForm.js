
Ext.define('AppDashboard.view.ReporterForm',{
	extend:'Ext.form.Panel',
	alias:'widget.reporterform',
	requires : ['AppDashboard.view.TimeLine','AppDashboard.view.EmptyPanel'],
	cls:'formOuter',
	collapseMode:'mini',
	bodyPadding : 10,
	buttonAlign : 'center',
	items:[
		{
			xtype : 'container',
			layout :{
				type:  'hbox',
				align: 'stretch'
			},
			defaults:{
				labelAlign:'top',
				margin:'0 0 10 0',
				labelSeparator:''
			},
			items: [
				{
					xtype:'combo',
					cls: 'dropdown',
					width: 370,
					editable : false,
					fieldLabel:'Report By',
					name: 'reportName',
					id: 'reportName',
					store: new Ext.data.Store({
						fields : ['displayField', 'valueField'],
						data : []
					}),
					displayField : 'displayField',
					valueField : 'valueField',
					queryMode : 'local'
				},
				{
					xtype : 'timeline',
				}			
			]
		},
		{
			xtype : 'container',
			id : 'hiddenFieldsCt',
			height : 0,
			hidden : true
		}
	]
});




