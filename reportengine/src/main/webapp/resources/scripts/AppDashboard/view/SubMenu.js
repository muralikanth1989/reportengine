
Ext.define('AppDashboard.view.SubMenu', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.submenu',
	layout : 'fit',
	bodyPadding : 0,
	margin : 0,
	bodyStyle : {
		'background' : 'none'
	},
	items : [{
		xtype : 'container',
		itemId : 'submenuItem',
		scope : this,
		style : {
			'margin-top' : '15px'
		},
		html : ''
	}],
	setRowSelector : function(event, el, obj) {
		
		var elements = Ext.select(".submenu li").elements;
		for ( var index in elements) {
			if (elements[index].id != el.id) {
				Ext.get(elements[index].id).removeCls("submenuSelected");
			}
		}
		Ext.get(Ext.get(el).getAttribute("taskid")).addCls("submenuSelected");
		this.initAppConfig(Ext.get(el).getAttribute("taskid"));
	},
	applyHoverStyle : function() {
		if (Ext.select(".submenu li").hasCls("submenuHover"))
			Ext.select(".submenu li").removeCls("submenuHover");
		Ext.select(".submenu li").addCls("submenuHover");
	},
	getSubmenuTemplate : function(menuItems) {
		this.getComponent("submenuItem").update(
				this.getMenuTemplate().apply(menuItems));
	},
	getMenuTemplate : function() {
		return new Ext.XTemplate('<ul class="submenu">', '<tpl for=".">',
				'<li id="{.}" taskid="{.}"><img taskid="{.}" src="resources/images/{[this.getImage(values)]}.png" width="32" height="32" style="vertical-align: middle;margin-right:3px;"/><span taskid="{.}">{.}</span></li>', 
				'</tpl></ul>',
				{
					getImage : function(taskId)
					{
						var imageName = "";
						if (taskId == "Upload Trade Details") {
							imageName = "iconUpload";
						}
						if (taskId == "Upload Client Details") {
							imageName = "uploadSheet";
						}
						else if (taskId == "Add New cutomer") {
							imageName = "addCustomer";
						}
						else if (taskId == "View All Customers") {
							imageName = "listView";
						}
						else if (taskId == "Data Analytics") {
							imageName = "reports";
						}
						else if (taskId == "Home") {
							imageName = "home1";
						}
						else if (taskId == "Contact Us") {
							imageName = "contact";
						}
						else if (taskId == "Add New User") {
							imageName = "addUser";
						}
						else if (taskId == "View All Users") {
							imageName = "listView";
						}
						return imageName;
					}
				}
		);
	}
});