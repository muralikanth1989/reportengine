Ext.define('login.view.MainFields', {
			extend : 'Ext.form.FieldSet',
			alias : 'widget.mainfields',
			requires : ['login.view.FormErrorState'],
			id : 'mainfieldsid',
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
				me.callParent(arguments);
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
						name : 'username',
						id : 'username',
						cls : 'textbox24',
						fieldLabel : 'username',
						value : loggedOutUser,
						margin : '20px 10px 30px 10px',
						allowBlank : false,
						minLength : 2

					}, {
						xtype : 'textfield',
						anchor : '100%',
						cls : 'textbox24',
						inputType : 'password',
						name : 'password',
						id : 'password',
						margin : '0px 10px 30px 10px',
						fieldLabel : 'Password',
						allowBlank : false

					}, {
						xtype : 'combo',
						labelAlign : 'top',
						fieldLabel : 'Component',
						id : 'domainCombo',
						name : 'domainCombo',
						cls : 'dropdown24',
						hidden : isDomainConfigured,
						displayField : 'displayField',
						valueField : 'valueField',
						queryMode : 'local',
						anchor : '100%',
						store : new Ext.data.Store({
									fields : ['displayField', 'valueField'],
									data : []
								}),
						margin : '0px 10px 30px 10px',

					}, {
						xtype : 'text',
						id : 'forgotpass',
						text : 'Forgot Password?',
						anchor : '100%',
						margin : '0px 20px 10px 20px'
					},

					{
						xtype : 'formErrorState',
						id : 'errorState',
						anchor : '100%',
						margin : '10px 20px 10px 20px',
						flex : 1
					}, {
						xtype : 'label',
						align : 'center',
						id : 'help',
						hidden : true,
						text : '',
						margin : '0px 0px 10px 0px'
					}],
			buttons : [{
						xtype : 'button',
						action : 'submit',
						cls : 'buttonLogin',
						margin : '10px 20px 20px 20px',
						id : 'submit',
						formBind : true,
						disabled : false,
						text : 'Sign In'
					}]

		});