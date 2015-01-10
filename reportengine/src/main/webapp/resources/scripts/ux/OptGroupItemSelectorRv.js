Ext.define("Ext.ux.OptGroupItemSelectorRv",{extend:"Ext.ux.OptGroup.OptGroupItemSelector",alias:["widget.optgroupitemselectorfield","widget.optgroupitemselector"],alternateClassName:["Ext.ux.OptGroupItemSelectorRv"],buttons:["top","up","add","remove","down","bottom","addConnects"],buttonsText:{top:"Move to Top",up:"Move Up",add:"Add to Selected",remove:"Remove from Selected",down:"Move Down",bottom:"Move to Bottom",addConnects:"Connects"},groupBoundList:"",initComponent:function(){var a=this;
groupBoundList=a;if(a.id!="itemselectHostsForSegment"){a.ddGroup=a.id+"-dd";}a.callParent();a.bindStore(a.store);},onAddBtnClick:function(){var c=this,b=c.getSelections(c.fromField.boundList);c.moveRec(true,b);c.toField.boundList.getSelectionModel().select(b);c.groupToFieldItems();c.fromField.boundList.refresh();
var a=Ext.getCmp("itemselectHostsForSegment");if(a!=null&&a!="undefined"){addToManage("L");}},onAddConnectsBtnClick:function(){var c=this,b=c.getSelections(c.fromField.boundList);c.moveRec(true,b);c.toField.boundList.getSelectionModel().select(b);var a=Ext.getCmp("itemselectHostsForSegment");if(a!=null&&a!="undefined"){addToManage("N");
}},onRemoveBtnClick:function(){var c=this,b=c.getSelections(c.toField.boundList);var d=c.toField.boundList.getStore().getCount();if(b.length==d||d==1){Ext.Msg.alert("Segment",minimumOneCompA+". "+minimumOneCompB);}else{c.moveRec(false,b);c.fromField.boundList.getSelectionModel().select(b);c.groupFromFieldItems();
c.toField.boundList.refresh();var a=Ext.getCmp("itemselectHostsForSegment");if(a!=null&&a!="undefined"){addToManage("remove");}}},moveRec:function(f,e){var c=this,g=c.fromField,a=c.toField,b=f?g.store:a.store,d=f?a.store:g.store;b.suspendEvents();d.suspendEvents();b.remove(e);d.add(e);b.resumeEvents();
d.resumeEvents();g.boundList.refresh();a.boundList.refresh();c.syncValue();},syncValue:function(){var a=this;a.mixins.field.setValue.call(a,a.setupValue(a.toField.store.getRange()));},onItemDblClick:function(a,d){var c=this;if(a==c.toField.boundList){c.onRemoveBtnClick();}else{if(a==c.fromField.boundList){var b=Ext.getCmp("itemselectHostsForSegment");
if(b==null||b=="undefined"){c.onAddBtnClick();}}}}});function addToManage(n){var x=Ext.getCmp("itemselectHostsForSegment").getValue();var u=Ext.getCmp("imagecombo").getValue();if(n=="L"||n=="N"){if(x==""){Ext.Msg.alert("Segment",publicJSON["screenLabels"]["admin.common.Please choose a component"]);return false;
}if(u==null||u=="-1"||u.length==0){Ext.Msg.alert(pageTitle,"Please choose an image");reloadItemSelector();return false;}}var f=new Array();for(var s=0;s<Ext.getCmp("itemselectHostsForSegment").getStore().getCount();s++){var l=Ext.getCmp("itemselectHostsForSegment").getStore().getAt(s).get("valueField");
var a=false;for(var r=0;r<x.length;r++){if(l==x[r]){a=true;break;}}if(!a){f[f.length]=l;}}var e=f;var t=e.toString();if(n=="remove"){if(t==""){Ext.Msg.alert("Segment","No component to remove");return;}}var o=Ext.getCmp("compTypeCombo").getValue();var h=Ext.getCmp("componentsList").getValue();var d="";
var c="";var k=publicJSON["mode"];if(k=="add"){d=Ext.getCmp("segmentName").getValue();c="true";}else{if(k=="modify"){d=Ext.getCmp("segmentNameCombo").getValue();c="false";}}var w=Ext.getCmp("assocZoneCombo").getValue();var q=publicJSON["showIndCheck"];var b="100";var p=Ext.getCmp("hiddencontainer");var v={xtype:"hiddenfield",name:"showIndOnlyParam",value:q};
p.add(v);v={xtype:"hiddenfield",name:"associatedComps",value:x};p.add(v);v={xtype:"hiddenfield",name:"otherComps",value:t};p.add(v);v={xtype:"hiddenfield",name:"returnToMain",value:returnToMain};p.add(v);v={xtype:"hiddenfield",name:"mainUrl",value:mainUrl};p.add(v);var m="Segments/data/EgAdminTopologyJson.jsp?mode="+k+"&segment="+d+"&newsegment="+c+"&zone="+w+"&comptype="+o+"&compname="+h;
if(n=="L"||n=="N"){m=m+"&callFrom=fromItemSelector"+"&lornString="+n;m=m+"&imageName="+u;}else{if(n=="remove"){m=m+"&callFrom=removeItemSelector";}}var g=Ext.getCmp("componentsegment").getForm();g.submit({url:m+"&validate=true",method:"POST",standardSubmit:false,success:function(A,M){var O=M.response.responseText;
publicJSON=Ext.decode(O);if(!Ext.isEmpty(O)&&M.response.status==200){Ext.getCmp("itemselectHostsForSegment").getStore().loadRawData(publicJSON["itemSelectorValue"]);Ext.getCmp("itemselectHostsForSegment").setValue(publicJSON["associatedComponentsArr"]);var L=publicJSON["topologyUrl"];var I=Ext.getCmp("itemselectHostsForSegment").getValue();
var C=new Array();for(var P=0;P<Ext.getCmp("itemselectHostsForSegment").getStore().getCount();P++){var F=Ext.getCmp("itemselectHostsForSegment").getStore().getAt(P).get("valueField");var y=false;for(var N=0;N<I.length;N++){if(F==I[N]){y=true;break;}}if(!y){C[C.length]=F;}}var B=C;var Q=B.toString();var E="Segments/data/EgadmintopologypJson.jsp?mode="+k+"&newsegment="+c+"&comptype="+o+"&compname="+h+"&segment="+d+"&zone="+w+"&zoomValue="+b+"&updateZone=false"+"&update=true";
var G=Ext.getCmp("hiddenprocesscontainer");var K={xtype:"hiddenfield",name:"fmanage",value:I};G.add(K);var K={xtype:"hiddenfield",name:"fumanage",value:Q};G.add(K);var K={xtype:"hiddenfield",name:"showIndOnlyParam",value:!q};G.add(K);var J=publicJSON["screenLabels"]["isValid"];if(J=="false"){Ext.Msg.alert("Segment",publicJSON["screenLabels"]["admin.common.ErroInAddingSegment"]);
return;}else{var D=publicJSON["showIndCheck"];var H="";if(k!=null&&k=="modify"){H=publicJSON["oldSegmentName"];}var z=Ext.getCmp("componentsegment").getForm();z.submit({url:E+"&oldSegmentName="+H,method:"POST",standardSubmit:false,success:function(j,S){var R=S.response.responseText;var T=Ext.decode(R);
var i=T["isError"];if(i=="true"){Ext.Msg.alert("Segment",T["screenLabels"]["admin.error.Error"]);reloadItemSelector();}else{Ext.getCmp("segmentName").setDisabled(true);Ext.getCmp("assocZoneCombo").setDisabled(true);if(!Ext.getCmp("topologyFrame").isVisible()&&!Ext.getCmp("topologyPanel").isVisible()){Ext.getCmp("topologyPanel").setVisible(true);
Ext.getCmp("topologyFrame").setVisible(true);}Ext.getCmp("topologyFrame").update('<iframe src="'+L+'" style="width:945px" height="540"></iframe>');if(!D){Ext.getCmp("association").setValue(true);}showAssociationPanel();}G.removeAll();},failure:function(){G.removeAll();}});}}p.removeAll();},failure:function(){p.removeAll();
}});}function showAssociationPanel(){var g=publicJSON["mode"];var f=Ext.getCmp("componentsList").getValue();var e="";var d="";if(g=="add"){e=Ext.getCmp("segmentName").getValue();d="true";}else{if(g=="modify"){e=Ext.getCmp("segmentNameCombo").getValue();d="false";}}var a=Ext.getCmp("assocZoneCombo").getValue();
var c=Ext.getCmp("association").getValue();var b=Ext.getCmp("compTypeCombo").getValue();Ext.Ajax.request({url:"Segments/data/EgAdminTopologyJson.jsp?mode="+g+"&segment="+e+"&newsegment="+d+"&zone="+a+"&showIndOnlyParam="+!c+"&comptype="+b+"&compname="+f+"&validate=true"+"&returnToMain="+returnToMain+"&mainUrl="+mainUrl,method:"POST",async:false,success:function(n){if(n.status==200&&!Ext.isEmpty(n.responseText)){var k=n.responseText;
var r=Ext.decode(k);var l=r["isZone"];if(l=="true"){table='<table width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:12px">';table+='<tr><td align="left"><table border="0" cellspacing="4" cellspacing="0" style="font-size:12px"><tr>';var m=r["AssociatedServiceList"];if(m!=null&&m!=undefined&&m.length>0){table+='<td width="120"><i>Service(s) mapping</i></td><td width="10">:</td>';
table+="<td>";var i="";for(var t=0;t<m.length;t++){var o=m[t];var q=r["AssociatedServiceUrl"][o];table+='<a style="text-decoration:none;color:#000;" href='+q+">"+o+"</a>";if(t!=(m.length-1)){table+=", ";}}table+="</td>";}var j=r["AssociatedZoneForEdit"];var p=r["configZoneLink"];var h=r["dissociateZonelink"];
table+="</tr>";table+='<tr><td width="120" align="left" nowrap><i>Zone mapping</i></td><td width="10">:</td>';table+='<td align="left"><a style="text-decoration:none;color:#000;" href='+p+">"+j+"</a>";if(publicJSON["disassString"]!=null&&publicJSON["disassString"]!=undefined){table+=' (<a style="text-decoration:none;color:#000;" href=# onclick="javascript:disassociateZone();">Disassociate)';
}table+="</td></tr></table></td></tr>";table+="</table>";Ext.getCmp("associationPanel").show();Ext.getCmp("associationDiv").show();Ext.getCmp("associationDiv").update({html:table});}else{Ext.getCmp("associationPanel").hide();Ext.getCmp("associationDiv").hide();}}}});}function reloadItemSelector(){var g=publicJSON["mode"];
var f=Ext.getCmp("componentsList").getValue();var e="";var d="";if(g=="add"){e=Ext.getCmp("segmentName").getValue();d="true";}else{if(g=="modify"){e=Ext.getCmp("segmentNameCombo").getValue();d="false";}}var a=Ext.getCmp("assocZoneCombo").getValue();var c=Ext.getCmp("association").getValue();var b=Ext.getCmp("compTypeCombo").getValue();
Ext.Ajax.request({url:"Segments/data/EgAdminTopologyJson.jsp?mode="+g+"&segment="+e+"&newsegment="+d+"&zone="+a+"&showIndOnlyParam="+!c+"&comptype="+b+"&compname="+f+"&validate=true"+"&returnToMain="+returnToMain+"&mainUrl="+mainUrl,method:"POST",async:false,success:function(h){if(h.status==200&&!Ext.isEmpty(h.responseText)){var i=h.responseText;
var j=Ext.decode(i);Ext.getCmp("itemselectHostsForSegment").getStore().loadRawData(j["itemSelectorValue"]);Ext.getCmp("itemselectHostsForSegment").setValue(j["associatedComponentsArr"]);}}});}