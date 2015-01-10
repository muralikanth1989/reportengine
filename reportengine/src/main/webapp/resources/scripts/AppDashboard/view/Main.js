

Ext.define('AppConfigMenu',{
	extend : 'Ext.AbstractPlugin',
	alias : 'plugin.appmenu',

	init : function(panel){

		this.panel = panel;
		this.callParent();
		panel.on('render',this.loadMenus);
	},
	loadMenus : function()
	{
		this.getHeader().insert(0,[{xtype:'appmenuitems'}]);
	}

});

Ext.define('AppDashboard.view.Main',{
	extend:'Ext.panel.Panel',
	alias:'widget.main',
	cls:'outerpanel',
	requires: ['AppDashboard.view.AppMenuItems',
		'AppDashboard.view.GridTemplate',
		'AppDashboard.view.SubMenu','AppDashboard.view.FileUploader',
		'AppDashboard.view.HomePage'
	],
	margin: 10,
	header:{
		height:42,
	},
	tools : [
        {
        	xtype : 'container',
        	margin: '5 10 0 0',
        	id : 'greetingsCt',
        	cls : 'greetingsMsg',
        	html : 'Welcome admin'
        },
		{
			xtype: 'button',
			style: {
				background: 'none',
				border: '0px'
			},
			height : 24,
			width : 28,
			id : 'btnSignout',
			margin: '0 4px 0 1px',
			iconCls : 'Logout'
		}
	],
	dockedItems :[
	{
		xtype : 'toolbar',
		dock: 'left',
		padding: '0',
		layout : {type:'hbox',align:'stretch'},
		width : 180,
		items: [
			{
				xtype: 'submenu',
				flex : 1
			}
		]
	}],
	layout :{
		type:  'vbox',
		align: 'stretch'
	},
	plugins : [
		{ptype : 'appmenu'}
	],
	scroll:true,
	frame:false,
	border:false,
	autoScroll:true,

	header:{cls:'textUpper'},
	items : [
		{
			xtype : 'homepage'
		}
	]
});



