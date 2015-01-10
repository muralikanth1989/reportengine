
Ext.Loader.setConfig({
 	enabled:true,
	disableCaching:false,
	paths: {
		'Ext.ux': 'resources/scripts/ux'
	}
});

Ext.application({

	name:'AppDashboard',
	requires:['AppDashboard.view.Main'],
	controllers: ['AppDashboard.controller.Main'],
	appFolder:'resources/scripts/AppDashboard',
	launch:function(){
		
		if (Ext.get('loadmask'))
		{
			Ext.get('loadmask').remove();
		}
		Ext.create('Ext.container.Viewport',{
			layout:'fit',
			items:[
				{
					xtype:'main'
				}
			]
		});
	}
	
});



