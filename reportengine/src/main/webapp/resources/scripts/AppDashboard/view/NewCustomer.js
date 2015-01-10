
Ext.define('AppDashboard.view.NewCustomer', {
	extend: 'Ext.form.Panel',
	alias: 'widget.newcustomer',
	frame: false,
	border : false,
	bodyPadding:0,
	items: [
		{
			xtype : 'container',
			margin:'30 10 10 10',
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},
			defaults: {
				width : 500,
				labelWidth : 200,
				margin : '0 0 20 0'
			},
			items : [
				{
					xtype: 'textfield',
					name: 'ccode',
					id:'ccode',
					cls: 'textbox',
					fieldLabel : 'Client Code'
				},
				{
					xtype: 'textfield',
					name: 'cname',
					id:'cname',
					cls: 'textbox',
					fieldLabel : 'Client Name'
				},
				{
					xtype: 'textfield',
					name: 'costcenter',
					id:'costcenter',
					cls: 'textbox',
					fieldLabel : 'Costcenter Code'
				},
				{
					xtype: 'textfield',
					name: 'costcentername',
					id:'costcentername',
					cls: 'textbox',
					fieldLabel : 'Costcenter Name'
				},
				{
					xtype: 'textfield',
					name: 'introby',
					id:'introby',
					cls: 'textbox',
					fieldLabel : 'Intro By'
				},
				{
					xtype: 'textfield',
					name: 'subbrkbane',
					id:'subbrkbane',
					cls: 'textbox',
					fieldLabel : 'Sub Broker Name'
				},
				{
					xtype: 'textfield',
					name: 'pancardno',
					id:'pancardno',
					cls: 'textbox',
					fieldLabel : 'Pan No'
				},
				{
					xtype: 'numberfield',
					name: 'mobile',
					id:'mobile',
					cls: 'textbox',
					hideTrigger: true,
			        keyNavEnabled: false,
			        mouseWheelEnabled: false,
					fieldLabel : 'Mobile No'
				},
				{
					xtype: 'textfield',
					name: 'email',
					id:'email',
					cls: 'textbox',
					fieldLabel : 'E-mail ID'
				},
				{
					xtype: 'textfield',
					name: 'scode',
					id:'scode',
					cls: 'textbox',
					fieldLabel : 'Scheme Code'
				},
				{
					xtype: 'textfield',
					name: 'sname',
					id:'sname',
					cls: 'textbox',
					fieldLabel : 'Scheme Name'
				},
				{
					xtype: 'datefield',
					id: 'doj',
					name: 'doj',
					format: 'm/d/Y',
					fieldLabel:'From',
					cls: 'datepicker',
					editable : false,
					fieldLabel : 'Date of Joining'
				}
			]
		},
		{
			xtype : 'container',
			margin:'10 10 10 10',
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			items : [
			    {
					xtype: 'button',
					cls: 'buttonBig',
					id:'submit',
					text: 'Add Customer'
			    },
			    {
					xtype: 'button',
					cls: 'buttonBig',
					margin : '0 0 0 10',
					id:'reset',
					width : 120,
					text: 'Clear'
				}
			]
		}
	]
});



