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