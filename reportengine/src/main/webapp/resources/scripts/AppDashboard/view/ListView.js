

Ext.define('AppDashboard.view.ListView', {
	extend: 'Ext.grid.Panel',
	alias:'widget.listview',
	
	//autoScroll : true,
	//scroll : true,
	cls:'gridSkin',
	emptyText : '<div class="resultTextBold" style="text-align:center;margin:15% auto 15% auto">No data found for your current search.</div>',
	viewConfig : {
		deferEmptyText : false
	}
});



