<!DOCTYPE html>
<html>
<head>
<title>小牛在线</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/base.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/global.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/element.css" rel="stylesheet"/>
    <script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/swipe.js"></script>
	<script type="text/javascript" src="/plugins/pwd/security.js?v=0.0.1"></script>
</head>
<body>
	<!-- <div class="logo"></div> -->
	<!--顶部 -->
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/include.css?v=20141022" rel="stylesheet"/>
<div class='top'>
	<span class='top_con'>
		<a class="we_logo" href="http://www.xiaoniu88.com/weChat/index.do"></a>
		<!-- 登陆前 -->
		<!-- 首页 -->
			<a class='index_top_btn top_btn' href='http://www.xiaoniu88.com/weChat/wx_login.do'>登录</a>
			<a class='index_top_btn top_btn' href='http://www.xiaoniu88.com/weChat/wx_reg.do'>免费注册</a>
			<!-- 其他页面 -->
			<span class='top_title top_btn'></span>
        <!-- 登陆后 -->
		</span>
</div><fieldset class="login_box clearfix">
   		<legend>用户登录</legend>
        <div class="input_box">
        	<div class="input_wap">
        		<input type="text" style="line-height:normal;" placeholder="用户名/邮箱/手机号码" id="email" name="paramMap.email" class="input_text" tabindex="1"/>
            </div>
             <div class="username ibg"></div>
        </div>
       	<div class="input_box">
        	<div class="input_wap">
            	<input type="password" style="line-height:normal;" placeholder="密码" id="password" name="paramMap.password" class="input_text" tabindex="2" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/>
            </div>
             <div class="pwd ibg"></div>
        </div>
        <div>
        	<input type="text" style="width:50%;" placeholder="请输入验证码" id="code" name="paramMap.code" class="input_box" value=""  tabindex="3"/>
       		<span class="vcode">
       			<img id="codeNum" src="admin/imageCode.do?pageId=userlogin" class="verifyImg" style="width:77px;height:30px;margin-bottom:-10px;"
					title="换一张" alt="验证码" onclick="javascript:switchCode()" />
       		</span>
        </div>
        <div id="error-box" style="display:none;color:red;"></div>
		<div class="btn fl w40" style="width:100%;">
        	<div class="btn_wap">
            	<a href="javascript:login();" tabindex="4"><div class="btn_cc">登&nbsp;&nbsp;&nbsp;&nbsp;录</div></a>
            </div>
        	<div class="btn_lc"></div>
            <div class="btn_rc"></div>
        </div>
        <div class="btn fr w40" style="width:100%;">
        	<div class="btn_wap">
            	<a href="http://www.xiaoniu88.com/weChat/wx_reg.do"><div class="btn_c">注&nbsp;&nbsp;&nbsp;&nbsp;册</div></a>
            </div>
        	<div class="btn_l"></div>
            <div class="btn_r"></div>
        </div>
        <input type="hidden" id="afterLoginUrl" value="" />
   </fieldset>
   <a class="fpwd" href="http://www.xiaoniu88.com/weChat/wx_forgetpassword.do">忘记登录密码？请点击进入</a>
   
 <script type="text/javascript">
 $(function(){
	$('.top_btn').hide();
	$('.top_title').html('登录').show();
 });
 switchCode();
//刷新验证码
 function switchCode() {
 	var timenow = new Date();

 	$("#code").css({color:'#999'});
 	$("#codeNum").attr("src", "http://www.xiaoniu88.com/admin/imageCode.do?pageId=userlogin&d=" + timenow);
 }
 var basePath = "http://www.xiaoniu88.com/"+"weChat/index.do";

 //登录
 function login() {
 	var flag = true;
 	if (flag) {
 		flag = false;
 		if ($("#email").val() == "" || $("#email").val() == "用户名/邮箱") {
 			showTipMsg("请输入用户名或邮箱地址！");
 			$("#email").focus();
 			return;
 		}
 		if ($("#password").val() == "") {
 			showTipMsg("请输入密码！");
 			$("#password").focus();
 			return;
 		}
 		if($("#code").val()=="" || $("#code").val() == "验证码"){
 			showTipMsg("请输入验证码！");
 			$("#code").focus();
 			return;
 		}
 		$('#btn_login').text('登录中...');
 		var afterLoginUrl = $("#afterLoginUrl").val();
 		var param = {};
 		param["paramMap.pageId"] = "userlogin";
 		param["paramMap.email"] = $("#email").val();
 		param["paramMap.password"] = RSAUtils.pwdEncode($("#password").val());
 		param["paramMap.code"] = $("#code").val();
 		param["paramMap.afterLoginUrl"] = afterLoginUrl;
 		$.post("wx_logining.do", param,function(data) {
 			if (data.msg == 1) {
 				if (afterLoginUrl != '') {
 					window.location.href = afterLoginUrl;
 				} else {
 					window.location.href = basePath;
 				}
 			} else if (data.msg == 2) {
 				showTipMsg("验证码错误！");
 				switchCode();
 				flag = true;
 				$('#btn_login').text('登 录');
 			} else if (data.msg == 3) {
 				switchCode();
 				flag = true;
 				$('#btn_login').text('登 录');
 				showTipMsg("用户名或密码错误！");
 			} else if (data.msg == 4) {
 				switchCode();
 				flag = true;
 				$('#btn_login').text('登 录');
 				showTipMsg("该用户已被禁用！");
 			} else if(data.msg == 5){
 				window.location.href = 'index.do';
 			} else if(data.msg == 6){
 				//验证邮箱
        			var indx = (data.mailAddress).indexOf('-');
 				var AA = (data.mailAddress).substring(indx + 1);
 				var m = (data.mailAddress).substring(0, indx);
 				window.location.href = "msgtip.do?emaladdresss=" + m + "&a=" + AA;
 			}else if(data.msg == 7){
 				//跳转到申请vip页面
 				window.location.href = 'applyVipInit.do';
 			}
 		});
 	}
 }
 

 function showTipMsg(msg){
 	if(msg!=""){
 		$("#error-box").removeClass("err2");
 		$("#error-box").addClass("err");
 		$("#error-box").html(msg);
 		$(".login_in").attr("style","top:10px;");
 		$("#error-box").show();
 	}
 }
 </script>
</body>
</html>
