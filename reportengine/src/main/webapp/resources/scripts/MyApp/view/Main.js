

Ext.define('MyApp.view.Main', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.main',
	frame : false,
	padding :20,
	cls : 'indexOuterFrame',
	id : 'main',
	margin : 0,
	border : 0,
	autoScroll : false,
	layout : 'fit',
	requires:['MyApp.view.LoginForm'],
	items: [
	{
		xtype : 'container',
		layout : {
			type : 'vbox',
			align:'center',
			pack:'center'
		},
		items : [{
			xtype : 'container',
			width : 350,
			border : true,
			bodyPadding :0,
			cls : 'loginOuterFrame',
			items : [{
				xtype : 'loginform',
				bodyPadding :'20 5 20 5',
				align : 'center',
				//cls:'loginpanelInner',
				autoHeight : true
			}]
		}]
	}]
});


