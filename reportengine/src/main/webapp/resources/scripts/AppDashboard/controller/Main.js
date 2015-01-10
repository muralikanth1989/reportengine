Ext.define('AppDashboard.controller.Main', {

	extend : 'Ext.app.Controller',
	views : [ 'Main', 'DashboardIcons', 'SubMenu', 'FileUploader',
			'NewCustomer', 'CustomersListView', 'ClientDetailsUploader', 'ReportGenerator','ReporterForm',
			'ListView','EmptyPanel','TotalVolumeByBarChart'
	],

	refs : [ {
			selector : 'main',
			ref : 'main'
		}, {
			selector : 'submenu',
			ref : 'submenu'
		},
		{
			selector : 'clientdetailsuploader',
			ref : 'clientdetailsuploader'
		},
		{
			selector : 'customerslistview',
			ref : 'customerslistview'
		},
		{
			selector : 'customerslistview button[itemId="add"]',
			ref : 'btnNewCustomer'
		},
		{
			selector : 'customerslistview button[itemId="delete"]',
			ref : 'btnDeleteCustomer'
		},
		{
			selector : 'fileuploader',
			ref : 'fileuploader'
		},
		{
			selector : 'reporterform combo[id="reportName"]',
			ref : 'reporterItems'
		},
		{
			selector : 'reporterform combo[id="reporttimeline"]',
			ref : 'reportTimeLine'
		},
		{
			selector : 'reporterform',
			ref : 'reporterform'
		},
		{
			selector : 'emptypanel',
			ref : 'emptypanel'
		},
		{
			selector : 'totalvolumebybarchart',
			ref : 'barchartDrm'
		},
		{
			selector : 'listview',
			ref : 'listview'
		}

	],
	init : function() {
		this.control({
			'main' : {
			// 'afterrender' : this.registerObservableKeyEvents
			},
			'main #btnSignout' : {
				'click' : this.signOut
			},
			'submenu' : {
				'afterrender' : this.loadMenuItems
			},
			'menuIcons button[name="btnAction"]' : {
			// 'click' : this.submitForm
			},
			'clientdetailsuploader button[id="upload"]':
			{
				'click':this.uploadClientDetails
			},
			'fileuploader button[id="btnTradeUpload"]':
			{
				'click':this.uploadTradingDetails
			},
			'customerslistview button[itemId="add"]':
			{
				'click':this.addNewCustomer
			},
			'customerslistview' : 
			{
				'selectionchange':this.enableBtnAtions
			},
			'reportgenerator' : 
			{
				'afterrender':this.loadReporterSettings
			},
			'reporterform button[name="submit"]' : {
				'click' : this.submitFormData
			},
			'reporterform combo[id="reportName"]':{
				'select':this.onReportNameChange
			},
			'listview trigger[id="datafilter"]':{
				'change':this.filterListView
			},
			'customerslistview trigger[id="datafilter1"]':{
				'change':this.filterCustomerListView
			}
		});
	},
	loadMenuItems : function(obj) {
		var menuItems = ["Home", "Upload Trade Details", "Upload Client Details",
		                  "Add New cutomer", "Data Analytics",
				"View All Customers","Add New User" ,"View All Users","Contact Us"];
		obj.getSubmenuTemplate(menuItems);
		Ext.select(".submenu li").on('click', obj.setRowSelector, this);
	},
	initAppConfig : function(taskId) {
		
		if (taskId == "Upload Trade Details") {
			this.getMain().removeAll();
			this.getMain().add({
				xtype : 'fileuploader'
			});
		} else if (taskId == "Upload Client Details") {
			this.getMain().removeAll();
			this.getMain().add({
				xtype : 'clientdetailsuploader'
			});
		} else if (taskId == "Add New cutomer") {
			this.getMain().removeAll();
			this.getMain().add({
				xtype : 'newcustomer'
			});
		} else if (taskId == "View All Customers") {
			this.loadClientDetails();
		}
		else if (taskId == "Data Analytics") {
			this.getMain().removeAll();
			this.getMain().add({
				xtype : 'reportgenerator'
			});
		}
		else if (taskId == "Home") {
			this.getMain().removeAll();
			this.getMain().add({
				xtype : 'homepage'
			});
		}
		this.getMain().doLayout();
	},
	uploadClientDetails : function()
	{
		if (!this.validateFileField(Ext.getCmp('file'))) return;
		
		var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Uploading Please wait...'});
		loader.show();
		this.getClientdetailsuploader().getForm().submit({

			url : '/reportengine/uploadClientData',
			timeout : 600,
			method : 'POST',
			success : function(form, action) {
				loader.hide();
				var jsonText = Ext.decode(action.response.responseText);
				if (jsonText.uploadStatus)
				{
				    Ext.Msg.alert("UPLOAD","Client data has been uploaded successfully.");
				}
				else
				{
					Ext.Msg.alert("UPLOAD","Client data has not been uploaded successfully.");
				}
			},
			failure : function()
			{
				loader.hide();
			}
		})
	},
	uploadTradingDetails : function()
	{
		if (!this.validateFileField(Ext.getCmp('file'))) return;
			
		var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Uploading Please wait...'});
		loader.show();
		this.getFileuploader().getForm().submit({

			url : '/reportengine/uploadTradingData',
			method : 'POST',
			timeout : 600,
			success : function(form, action) {
				loader.hide();
				var jsonText = Ext.decode(action.response.responseText);
				if (jsonText.uploadStatus)
				{
				    Ext.Msg.alert("UPLOAD","Trade data has been uploaded successfully.");
				}
				else
				{
					Ext.Msg.alert("UPLOAD","Trade data has not been uploaded successfully.");
				}
				
			},
			failure : function()
			{
				loader.hide();
			}
		})
	},
	validateFileField : function(filefield)
	{
		console.log(filefield);
		if (Ext.isEmpty(filefield.getValue()))
		{
			Ext.Msg.alert("REPORT ENGINE","Please choose a file.");
			return false;
		}
		else if (filefield.getValue().lastIndexOf(".xls") == -1 && filefield.getValue().lastIndexOf(".xlsx") == -1)
		{
			Ext.Msg.alert("REPORT ENGINE","The file with extension should be .xls or .xlsx");
			return false;
		}
		return true;
	},
	loadClientDetails : function() {

		var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Loading Please wait...'});
		loader.show();
		var me = this;
		Ext.Ajax.request({

			url : '/reportengine/loadClientDetails',
			method: 'POST',
			success : function(response) {
				loader.hide();
				var jsonText = Ext.decode(response.responseText);
				me.getMain().removeAll();
				me.getMain().add({
					xtype : 'customerslistview',
					dataStore : jsonText.clientList
				});
			},
			failure : function()
			{
				loader.hide();
			}
		})
	},
	enableBtnAtions : function(obj, selected)
	{
		this.getBtnDeleteCustomer().setDisabled(selected.length == 0);
	},
	addNewCustomer : function()
	{
		Ext.widget("window",{
			height: 640,
			title : 'Cutomer Form',
			autoScroll : true,
			doClose : function(){
				this.destroy();
			},
			width : 650,
			modal : true,
			items : [
			        {
			        	xtype : 'newcustomer',
			        	margin : 10
			        }
			]
		}).show();
	},
	loadReporterSettings : function()
	{
		var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Loading Please wait...'});
		loader.show();
		var me = this;
		Ext.Ajax.request({

			url : '/reportengine/generateReport',
			method: 'POST',
			success : function(response) {
				loader.hide();
				var jsonText = Ext.decode(response.responseText);
				me.getReporterItems().getStore().loadRawData(jsonText.listOfDefaultReports);
				me.getReporterItems().setValue("-1");
				me.getReportTimeLine().getStore().loadRawData(jsonText.timeline);
				me.getReportTimeLine().setValue("-1");
				delete jsonText;
			},
			failure : function()
			{
				loader.hide();
			}
		})
	},
	filterCustomerListView : function(obj)
	{
		var searchValue = obj.getValue();
		if (searchValue == "" || searchValue.length == 0)
		{
			this.getCustomerslistview().getStore().clearFilter();
		}
		else
		{
			this.getCustomerslistview().getStore().clearFilter();
			this.getCustomerslistview().getStore().filter("ClientCode", searchValue);
		}
	},
	filterListView : function(obj)
	{
		var searchValue = obj.getValue();
		if (searchValue == "" || searchValue.length == 0)
		{
			//Ext.get('CTrigger_0').setStyle('display','none');
			//Ext.get('CTrigger_1').setStyle('display','block');
			this.getListview().getStore().clearFilter();
		}
		else
		{
			this.getListview().getStore().clearFilter();
			this.getListview().getStore().filter("SYMBOL", searchValue);
			//Ext.get('CTrigger_1').setStyle('display','none');
			//Ext.get('CTrigger_0').setStyle('display','block');
		}
		//me.listview
	},
	onReportNameChange : function(obj)
	{
		var selectedValue = obj.getValue();
		Ext.getCmp('toDate').show();
		if (selectedValue == "REP006" || selectedValue == "REP010")
		{
			Ext.getCmp('toDate').hide();
		}
	},
	submitFormData : function()
	{
		var me = this;
		if (!this.validateFormFields()) return;
		
		var loader = new Ext.LoadMask(Ext.getBody(),{msg:'Loading Please wait...'});
		loader.show();
		this.getReporterform().getForm().submit({

			url : '/reportengine/getReportsByType',
			method : 'POST',
			success : function(form, action) {
				loader.hide();
				var jsonText = Ext.decode(action.response.responseText);
				Ext.getCmp('contentView').removeAll();
				Ext.getCmp('contentView').setTitle(me.getReporterItems().getDisplayValue().toUpperCase());
				if (jsonText.hasMoreResults == true)
				{
					if (jsonText.reportName == "REP000")
					{
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}
					else if (jsonText.reportName == "REP001")
					{
						console.log(jsonText.gridStore)
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
						//Ext.getCmp('contentView').add({
						//	xtype : 'totalvolumebybarchart'
						//});
						//me.getBarchartDrm().getStore().loadRawData(jsonText.barChartStore);
					}
					else if (jsonText.reportName == "REP002")
					{
						console.log(jsonText.gridStore)
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}
					else if (jsonText.reportName == "REP004")
					{
						console.log(jsonText.gridStore)
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}					
					else if (jsonText.reportName == "REP005")
					{
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}
					else if (jsonText.reportName == "REP006")
					{
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}
					else if (jsonText.reportName == "REP010")
					{
						Ext.getCmp('contentView').add(me.createCustomGridView(jsonText.gridColumns,jsonText.gridStore));
					}
				}
				else
				{
					Ext.getCmp('contentView').add({
						 xtype : 'emptypanel',
						 margin : 10
					});
				}

			},
			failure : function()
			{
				loader.hide();
			}
		});
	},
	createCustomGridView : function(gridColumns,gridStore)
	{
		var fields = new Array();
		var columns = new Array();
		var menuItems = new Array();
		for (var key in gridColumns)
		{
			fields.push(gridColumns[key]);
			menuItems.push({
				xtype : 'menucheckitem',text: gridColumns[key], handler: function(){}
			});
			columns.push({
				dataIndex : gridColumns[key],
				header : gridColumns[key],
				flex : 1,
				sortable : true
			});
		}
		return Ext.create("AppDashboard.view.ListView",{
			margin : 15,
			store : new Ext.data.Store({
				fields : fields,
				data : gridStore
			}),
			columns : columns
		});
	},
	validateFormFields : function()
	{
		var me = this;
		var reportType = me.getReporterItems().getValue();
		var timeline = me.getReportTimeLine().getValue();
		var from = Ext.getCmp("fromDate").getValue();
		var to = Ext.getCmp("toDate").getValue();
		
		if (reportType == "-1")
		{
			Ext.Msg.alert(appTitle,"Please choose report type.");
			return false;
		}
		else if (timeline == "-1")
		{
			if (Ext.isEmpty(from))
			{
				Ext.Msg.alert(appTitle,"From date can not be blank.");
				return false;
			}
			else if (Ext.isEmpty(to))
			{
				Ext.Msg.alert(appTitle,"To date can not be blank.");
				return false;
			}
		}
		return true;
	},
	signOut : function() {

		Ext.Msg.confirm({
			title : "Logout Confirmation",
			width : 450,
			msg : "Are you sure you want log out?",
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.QUESTION,
			fn : function(btn){
				if (btn == "yes") {
					window.location.href = "/reportengine/logout";
				}
				return;
			}
		});
		
		/*Ext.Msg.confirm("Logout Confirmation",
			'Are you sure you want log out?', function(btn) {
			if (btn == "yes") {
				window.location.href = "/reportengine/logout";
			}
			return;

		});*/
	}
});