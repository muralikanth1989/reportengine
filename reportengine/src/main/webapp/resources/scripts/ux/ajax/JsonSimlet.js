Ext.define("Ext.ux.ajax.JsonSimlet",{extend:"Ext.ux.ajax.DataSimlet",alias:"simlet.json",doGet:function(b){var e=this,g=e.getData(b),f=e.getPage(b,g),a=b.xhr.options.proxy.reader,d=e.callParent(arguments),c={};if(a.root){c[a.root]=f;c[a.totalProperty]=g.length;}else{c=f;}if(b.groupSpec){c.summaryData=e.getSummary(b,g,f);
}d.responseText=Ext.encode(c);return d;}});