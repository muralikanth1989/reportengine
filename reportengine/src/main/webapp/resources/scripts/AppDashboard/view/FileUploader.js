

Ext.define('AppDashboard.view.FileUploader',{
	extend : 'Ext.form.Panel',
	alias : 'widget.fileuploader',

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
				        	html : 'Upload Trade details'
				        },
						{
							xtype : 'fileuploadfield',
							width : 600,
							labelWidth : 150,
							itemId : 'btnUpload',
							name : 'file',
							id : 'file',
							cls : 'fileupload',
							margin : '0 0 20 0',
							emptyText : 'Please select a file',
							fieldLabel : 'Trade File Location',
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
					id:'btnTradeUpload',
					text: 'Upload'
			    }
			]
		}
	]
});