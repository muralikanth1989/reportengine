Ext.define('MyApp.controller.Login', {
	extend : 'Ext.app.Controller',
	refs : [{
		selector : 'main',
		ref : 'main'
	}, {
		selector : 'loginform',
		ref : 'loginform'
	}],
	init : function() {
		this.control({
			'loginform' : {
				'afterrender' : this.registerObservableKeyEvents
			},
			'loginform button[id="submit"]' : {
				'click' : this.submitForm
			}
		});
	},
	submitForm : function() {

		if (this.valform()) {
			var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Please wait'});
			loader.show();
			this.getLoginform().getForm().submit({

				url : '/reportengine/login.authenticate',
				method : 'POST',
				success : function(form, action) {
					loader.hide();
					var jsonText = Ext.decode(action.response.responseText);
					if (jsonText.result) {
						window.location.href = "/reportengine/home";
					} else {
						Ext.Msg.alert("Login","Username or Password is incorrect...!");
					}
				},
				failure : function() {
					loader.hide();
				}
			})
		}
	},
	valform : function() {
		
		var thisForm = this.getLoginform().getForm();
		var username = thisForm.findField("username").getValue();
		var password = thisForm.findField("password").getValue();
		if (Ext.isEmpty(username)) {
			Ext.Msg.show({
				title : 'Login',
				msg : 'User field can not be blank' + '.',
				buttons : Ext.Msg.OK,
				fn : function(bt) {
					thisForm.findField("username").focus();
				},
				icon : 'iconExclamation'
			});
			return false;
		}
		if (Ext.isEmpty(password)) {
			Ext.Msg.show({
				title : 'Login',
				msg : 'Password field can not be blank' + '.',
				buttons : Ext.Msg.OK,
				fn : function(bt) {
					thisForm.findField("password").focus();
				},
				icon : 'iconExclamation'
			});
			return false;
			
		}
		return true;
	},
	registerObservableKeyEvents : function(view, options) {
		Ext.EventManager.on(view.getEl(), 'keyup', function(evt, t, o) {
			if (evt.keyCode === Ext.EventObject.ENTER) {
				this.submitForm();
			}
		}, this);
	}
});