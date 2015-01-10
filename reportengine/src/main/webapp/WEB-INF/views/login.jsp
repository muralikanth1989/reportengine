
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
<link rel="stylesheet" type="text/css" href="resources/css/ext-eg.css">
<link rel="stylesheet" type="text/css" href="resources/eGLightThemeIcons.css">
<link rel="stylesheet" href="resources/eGLightTheme.css"/>
<script src="resources/scripts/MyApp/app.js"></script>
<style type="text/css">

.indexOuterFrame {
	background:#474A52;
   /*background:#524442; #E9F1F3*/
}

.loginOuterFrame {
	border-radius: 0;
	-moz-border-radius: 0;
	-khtml-border-radius: 0;
	-o-border-radius: 0;
	-webkit-border-radius: 0;
	margin: 10px;
	background: #ededed;
	border: 1px solid #a5a5a5;
	-webkit-box-shadow: -1px 0px 14px 0px rgba(0,0,0,0.18);
-moz-box-shadow: -1px 0px 14px 0px rgba(0,0,0,0.18);
box-shadow: -1px 0px 14px 0px rgba(0,0,0,0.18);
}

.signUpText {
	font-size: 15px;
	letter-spacing: -1px;
	color: #787878;
}

</style>
</head>
<body>
	<div id="loadmask" class="x-mask-msg x-layer x-mask-msg-default" style="z-index: 19001;left:45%;top:35%;"><div class="x-mask-loading" style="position:relative">Loading...</div></div>
</body>
</html>


