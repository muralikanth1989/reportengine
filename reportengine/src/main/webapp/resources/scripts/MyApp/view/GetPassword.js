Ext.define('login.view.GetPassword', {
	extend : 'Ext.form.FieldSet',
	alias : 'widget.getpasswordform',
	requires : ['login.view.FormErrorState'],
	id : 'getpassform',
	frame : false,
	border : true,
	margin : 'auto',
	bodyPadding : '10px 30px 0px 30px',
	layout : 'anchor',
	align : 'center',
	height : 'auto',
	buttonAlign : 'right',
	formname : null,
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			defaults : {
				labelAlign : 'top',
				msgTarget : 'side',
				invalidCls : ''//unset the invalidCls so individual fields do not get styled as invalid
			},
			items : [{
						xtype : 'container',
						align : 'center',
						html : '<center><img src="/final/images/logo.png"></center>',
						margin : '10px',
						anchor : '100%'
					}, {
						xtype : 'textfield',
						anchor : '100%',
						name : 'fusername',
						id : 'fusername',
						cls : 'textbox24',
						fieldLabel : 'username',
						value : loggedOutUser,
						allowBlank : false,
						minLength : 2,
						margin : '20px'

					}, {
						xtype : 'text',
						id : 'login',
						text : 'Login page',
						anchor : '100%',
						margin : '0px 20px 10px 20px'
					}, {
						xtype : 'formErrorState',
						id : 'errorState',
						anchor : '100%',
						margin : '10px 20px 10px 20px',
						flex : 1
					}],
			buttons : [{
						xtype : 'button',
						action : 'getpassword',
						cls : 'buttonLogin',
						margin : '10px 20px 20px 20px',
						id : 'fpass',
						formBind : true,
						disabled : true,
						text : 'get Password'
					}]

		});
		me.callParent(arguments);
	}

});