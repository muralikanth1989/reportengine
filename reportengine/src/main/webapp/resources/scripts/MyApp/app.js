
Ext.Loader.setConfig({
 	enabled:true,
	disableCaching:false
});

Ext.application({

	name:'MyApp',
	requires:['MyApp.view.Main'],
	controllers: ['MyApp.controller.Login'],
	appFolder:'resources/scripts/MyApp',
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



