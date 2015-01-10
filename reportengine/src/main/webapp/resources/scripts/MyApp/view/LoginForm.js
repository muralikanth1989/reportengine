Ext.define('MyApp.view.LoginForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.loginform',
	id:'loginform',
	frame: false,
	border : false,
	style:{'overflow':'visible'},
	bodyStyle:{'overflow':'visible'},
	bodyPadding:0,
	defaults: {
		anchor:'100%',
		allowBlank: false,
		msgTarget: 'none',
		invalidCls: ''
	},
	items: [
		{
			xtype: 'textfield',
			//width : 250,
			name: 'username',
			id:'username',
			cls: 'textboxLoginUserName',
			emptyText : 'Username',
			allowBlank: false,
			margin:'20px 10px 30px 10px',
			bodyPadding:'0px',
			enableKeyEvents : true
		},
		{
			xtype: 'textfield',
			//width : 250,
			cls: 'textboxLoginPassword',
			inputType: 'password',
			name: 'password',
			id:'password',
			emptyText : 'Password',
			margin:'10px 10px 30px 10px',
			allowBlank: false,
			bodyPadding:'0px'
		},
		{
			xtype : 'container',
			margin:'10 10 10 10',
			layout : {
				type : 'hbox',
				pack : 'end'
			},
			items : [{
				xtype: 'button',
				action: 'submit',
				cls: 'buttonBig',
				margin:'0 0 0 0',
				id:'submit',
				disabled: false,
				text: 'Login'
			}]
		},
		/*{
			xtype : 'container',
			margin:'0 0 10 0',
			style : {'text-align':'center'},
			html : '<span class="signUpText">Not a member? <a href="javascript:void(0)" class="signUpText">Sign up now</a></span>'
		},*/{
			xtype : 'container',
			html:'<div style="height:35px;line-height:35px;position:absolute;top:-19px;background:#0AA7AE;text-align:center;border-radius:5px;center;color:#fff;font-size:20px;width:150px;">Sign in</div>'
		}
	]
});



