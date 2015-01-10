Ext.define('AppDashboard.view.EmptyPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.emptypanel',
	border:false,
	style:{'text-align':'center'},
	html:'<div class = "iconMessage" style="margin:15% auto auto auto"></div><div class="errorMessageText">No data found for your selection.</div>'
});