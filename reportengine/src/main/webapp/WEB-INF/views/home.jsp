
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragma","no-cache");
	response.setDateHeader("Expires", -1);

%>
<html>
<head>
<script type="text/javascript" src="resources/ext-all.js"></script>
<script type="text/javascript" src="resources/scripts/eg_DateUtil.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/ext-eg.css">
<link rel="stylesheet" type="text/css" href="resources/eGLightThemeIcons.css">
<link rel="stylesheet" href="resources/eGLightTheme.css"/>
<script src="resources/scripts/AppDashboard/app.js"></script>
<script type="text/javascript">
	var appTitle = "REPORT ENGINE";
</script>

<style type="text/css">

.outerFrame {
	background:#FFF !important;
}

.menuItems li {
	/*margin : 3px 3px 3px 27px;*/
	margin-left: 27px;
	font-size : 14px;
	font-family: calibri;
	font-weight : bold;
	display:inline-block;
	color :#D2D2D2; /*#A5C3E2;*/
	cursor : pointer;
}


.Logout {
	background : url('resources/images/LogoutIcon2.png') no-repeat top left;
	width: 24px !important; height: 24px !important; 
}

.submenuSelected {
	color: #FDFDFD !important;
	background-color: #B3B7BD !important;
	border-color: #474A52 !important;
}

.submenu li:active {
	color: #FDFDFD !important;
	background-color: #5278AA !important;
	border-color: #474A52 !important;
}

.submenu li:hover {
	color: #FDFDFD !important;
	background-color: #B3B7BD !important;
	border-color: #474A52 !important;
}

.submenu li {
	background-color: #30415A;
	height: 45px;
	color: #DDDEE0; /*#A3ACBD;*/
	border-bottom: 1px solid #8E8F99;
	font-family: calibri;
	font-weight: bold;
	cursor:pointer;
	font-size : 14px;
	padding-top: 2px;
	padding-left: 10px;
	line-height: 37px;
	text-overflow : ellipsis;
}

.userIcon {
	background : url('userIcon2.png') no-repeat top left;
	width: 32px !important; height: 32px !important;
	cursor: pointer;
}
</style>
</head>
<body class="outerFrame">
	<div id="loadmask" class="x-mask-msg x-layer x-mask-msg-default" style="z-index: 19001;left:45%;top:35%;"><div class="x-mask-loading" style="position:relative">Loading...</div></div>
</body>
</html>


