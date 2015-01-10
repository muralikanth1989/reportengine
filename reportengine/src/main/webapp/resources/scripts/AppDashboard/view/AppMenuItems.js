
Ext.define('AppDashboard.view.AppMenuItems',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.appmenuitems',

	layout : {
		type : 'hbox',
		align : 'stretch'
	},

	defaults: {
		margin:'0 4 0 0'
	},
	bodyStyle: {
		'background': 'none'
	},
	items : [
		{
			xtype : 'splitbutton',
			width : 160,
			itemId : 'headerLogo',
			id : 'headerLogo',
			hidden : true,
			text : 'THE TRADERS CORNER',
			handler: function() { //#4486D8
				//alert("The button was clicked");
			},
			menu: new Ext.menu.Menu({
				width : 240,
				height : 200,
				items: [
					{text: 'About Us', handler: function(){ alert("Item 1 clicked"); }},
					{text: 'Site Map', handler: function(){ alert("Item 2 clicked"); }}
				]
			})
		},
		{
			xtype: 'component',
			cls : 'appHeaderTitle',
			html : 'THE TRADERS CORNER'
		},
		//{
		//	xtype: 'container',
		//	style : {'padding':'3px'},
		//	html : '<ul class="menuItems"><li>Home</li><li>About Us</li></ul>'
		//}
	]
});