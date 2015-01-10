

Ext.define('AppDashboard.view.ClientDetailsUploader',{
	extend : 'Ext.form.Panel',
	alias : 'widget.clientdetailsuploader',

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	flex : 1,
	items : [
	    {
	    	xtype : 'container',
	    	margin : '40 0 0 0',
	    	layout : {
	    		type : 'hbox',
	    		pack: 'center',
	    	},
		    items : [
		       {
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack: 'start',
						align: 'start'
					},
					items : [
				        {
				        	xtype : 'component',
				        	cls : 'largeFont',
				        	margin : '0 0 20 0',
				        	html : 'Upload Client details'
				        },
						{
							xtype : 'fileuploadfield',
							width : 600,
							labelWidth : 150,
							itemId : 'btnUpload',
							name : 'file',
							cls : 'fileupload',
							id : 'file',
							margin : '0 0 20 0',
							emptyText : 'Please select a file',
							fieldLabel : 'Client File Location',
							buttonText : 'Browse'
						},
						{
				    		xtype : 'component',
				    		cls : 'miniFont',
				    		html : 'Supported file formats : .xlsx'
						}
					]
		       }
			]
	    },
	    {
			xtype : 'container',
			margin:'10 0 0 0',
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			items : [
		       {
					xtype: 'button',
					cls: 'buttonBig',
					id:'upload',
					text: 'Upload'
			    }
			]
		}
	]
});