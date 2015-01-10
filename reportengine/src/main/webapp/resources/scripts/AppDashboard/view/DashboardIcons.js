Ext.define('AppDashboard.view.DashboardIcons', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.menuIcons',
	bodyStyle: {
        'background': 'none'
    },
    defaults: {
        cls: 'btnTransparent',
		margin:'0 4 0 4'

    },

	items : [ {
		xtype : 'button',
		//text : 'jjjjjjjj',
		width : 100,
		height : 100,
		//iconCls : 'add_Widget_button',
		name : 'btnAction'
	}, {
		xtype : 'button',
		width : 100,
		height : 100,
		//iconCls : 'datacenter',
		name : 'btnAction'
	} ]
});