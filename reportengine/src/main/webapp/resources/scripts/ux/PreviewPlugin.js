Ext.define("Ext.ux.PreviewPlugin",{extend:"Ext.AbstractPlugin",alias:"plugin.preview",requires:["Ext.grid.feature.RowBody","Ext.grid.feature.RowWrap"],hideBodyCls:"x-grid-row-body-hidden",bodyField:"",previewExpanded:true,constructor:function(b){this.callParent(arguments);var a=this.bodyField,e=this.hideBodyCls,d=this.getCmp(),c=[{ftype:"rowbody",getAdditionalData:function(i,f,h,k,g){var j=Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this,arguments);
Ext.apply(j,{rowBody:i[a],rowBodyCls:d.previewExpanded?"":e});return j;}},{ftype:"rowwrap"}];d.previewExpanded=this.previewExpanded;if(!d.features){d.features=[];}d.features=c.concat(d.features);},toggleExpanded:function(b){var a=this.getCmp();this.previewExpanded=a.previewExpanded=b;a.refresh();}});