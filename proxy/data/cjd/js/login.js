$(function(){
	// $("#email").focus();
	$("#email").focus(function() {
		if($(this).val() == '用户名/邮箱/手机号码'){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			$(this).val('用户名/邮箱/手机号码');
			$(this).css({color:'#999'});
			showTipMsg("请输入用户名或邮箱地址或手机号码！");
		}/* else{
			var index = $(this).val().indexOf("@", 0);
			if(index==-1){
				//用户名登录
				checkRegister('userName');
			}else{
				//邮箱登录
				checkRegister('email');
			}
		}*/
	});

	$("#password").focus(function() {
		if($(this).val() == ''){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			$(this).css({color:'#999'});
			showTipMsg("请输入登录密码！");
		}
	});

	$("#code").focus(function() {
		if($(this).val() == '验证码'){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			$(this).val('验证码');
			$(this).css({color:'#999'});
			showTipMsg("请输入验证码！");
		}
	});

	//处理键盘的回车键登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			login();
		}
	});

	/*
	var remember_checked = $.cookie("remember_user");
	if(remember_checked == "true"){
		$("#form_remember").attr("checked", remember_checked);
	}
	remember_checked &&
	*/
	var cookieValue = $.cookie("sysUser");
	if(cookieValue != null && cookieValue != ""){
		$("#email").focus().val(cookieValue);
	}
	switchCode();
});

//刷新验证码
function switchCode() {
	var timenow = new Date();
	$("#code").val('验证码');
	$("#code").css({color:'#999'});
	$("#codeNum").attr("src", "admin/imageCode.do?pageId=userlogin&d=" + timenow);
}

function checkRegister(obj, str) {
	var param = {};
	if (str == "userName") {
		param["paramMap.email"] = "";
		param["paramMap.userName"] = $("#email").val();
	} else {
		param["paramMap.email"] = $("#email").val();
		param["paramMap.userName"] = "";
	}
	$.post("ajaxCheckLog.do", param, function(data) {
		if (data == 2 && str == "userName") {
			showTipMsg("无效用户！");
		} else if (data == 3 && str == "userName") {
			showTipMsg("该用户还没激活！");
		}
		if (data == 0 && str == "email") {
			showTipMsg("无效邮箱！");
		} else if (data == 1 && str == "email") {
			showTipMsg("该邮箱用户还没激活！");
		}
	});
}

//登录
function login() {
	var flag = true;
	if (flag) {
		flag = false;
		if ($("#email").val() == "" || $("#email").val() == "用户名/邮箱/手机号码") {
			showTipMsg("请输入用户名或邮箱地址或手机号码！");
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
		/*
		checkRemember();*/
		$.post("logining.do", param,function(data) {
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
			} else if(data.msg == 5){// 未认证
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
			} else if(data.msg == '500_error'){
				showTipMsg("登录异常，请联系客服！");
			}
		});
	}
}

function showTipMsg(msg){
	if(msg!=""){
		$("#error-box").addClass("err");
		$("#error-box").html(msg);
	}
}

//检查是否勾选记住用户名并刷新cookie
function checkRemember(){
	var remember_checked = document.getElementById("form_remember").checked;
	//alert(remember_checked);
	if(remember_checked){
		Set_Cookie("sysUser",$("#email").val(),365,"/","","");
	}else{
		Set_Cookie("sysUser","",365,"/","","");
	}
	Set_Cookie("remember_user",remember_checked,365,"/","","");
}

//写入cookie
function Set_Cookie( name, value, expires, path, domain, secure ){
    var today = new Date();
    today.setTime(today.getTime());
    if (expires){
    	expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((secure) ? ";secure" : "");
}