var timers = 300;
var tipId;
var recomflag = true;
$(function() {
	$.formValidator.initConfig({formID:"pageform",onSuccess:function(){
		if(!$("#agre").attr("checked")) {
			$.dialog.warnTips("请勾选我已阅读并同意《使用条款》和《隐私条款》");
			return;
		} else {
			$('#loginBtn').attr('value', '注册中...');
			var afterLoginUrl = $("#afterLoginUrl").val();
			var param = {};
			param["paramMap.userName"] = $("#username").val();
			param["paramMap.password"] = $("#password").val();
			param["paramMap.confirmPassword"] = $("#confirmpwd").val();
			param["paramMap.cellPhone"] = $("#mobile").val();
			param["paramMap.vilidataNum"] = $("#vcode").val();
			param["paramMap.refferee"] = $("#refId").val();
			param["paramMap.param"] = $("#param").val();
			param["paramMap.afterLoginUrl"] = afterLoginUrl;
			$.post("register2.do", param,function(data) {
				if (data.msg == '1') {
					//注册成功直接跳转到实名登记 页面
					window.location.href = 'regSucc.do';
				} else if (data.msg == '11'){
					//财经道注册成功跳转到购买界面
					window.location.href = afterLoginUrl;
				} else {
					$.dialog.warnTips(data.msg);
					$('#loginBtn').attr('value', '注册');
				}
			});
		}
	},onError:function(){
	}});
	var forbidden_prefix = $("#forbidden_prefix").val();
	$("#username").formValidator({onShow:"6~16个字符，包括字母、数字、下划线",onFocus:"6~16个字符，包括字母、数字、下划线",onCorrect:"该用户名可以注册"})
				  .inputValidator({min:6,max:16,onError:"请输入6~16个字符的用户名"})
				  .regexValidator({regExp:"username",dataType:"enum",onError:"用户名格式不正确（或不能以\""+forbidden_prefix+"\"开头）"})
				  .ajaxValidator({type: "post",
					dataType: "html",
					async: true,
					url: "ajaxCheckRegister.do",
					data:{"paramMap.userName": function(){return $("#username").val();}},
					success: function(data){
			          	if(data == 3 || data == 4) return "该用户名已被使用，请更换用户名";
						return true;
					},
					buttons: $("#loginBtn"),
					error: function(jqXHR, textStatus, errorThrown){
						$.dialog.warnTips("服务器没有返回数据，可能服务器忙，请重试"+errorThrown);
					},
					onError: "该用户名已被使用，请更换用户名",
					onWait: "正在进行合法性校验，请稍候..."
	});
	$("#password").formValidator({onShow:"6~20个字符，包括字母、数字、特殊符号",onFocus:"6~20个字符，包括字母、数字、特殊符号",onCorrect:"密码合法"})
				  .inputValidator({min:6,max:20,empty:{leftEmpty:false,rightEmpty:false,emptyError:"密码两边不能存在空字符"},onError:"请输入6~20个字符的密码"});
	$("#confirmpwd").formValidator({onShow:"",onFocus:"请再次输入密码",onCorrect:"密码输入一致"})
				  .inputValidator({min:6,empty:{leftEmpty:false,rightEmpty:false,emptyError:"确认密码两边不能存在空字符"},onError:"确认密码不能为空"})
				  .compareValidator({desID:"password",operateor:"=",onError:"2次密码输入不一致"});
	$("#mobile").formValidator({onShow:"",onFocus:"手机的长度必须是11位",onCorrect:"手机号码合法"})
				.inputValidator({min:11,max:11,onError:"手机号码必须为11位"})
				.regexValidator({regExp:"mobile",dataType:"enum",onError:"手机的格式不正确"})
				.ajaxValidator({type: "post",
					dataType: "html",
					async: true,
					url: "ajaxCheckMobilePhoneRegister.do",
					data:{"paramMap.mobilePhone": function(){return $("#mobile").val();}},
					success: function(data){
			          	if(data == 6) return "该手机号已被使用，请更换手机号";
						return true;
					},
					buttons: $("#loginBtn"),
					error: function(jqXHR, textStatus, errorThrown){
						$.dialog.warnTips("服务器没有返回数据，可能服务器忙，请重试"+errorThrown);
					},
					onError: "该手机号已被使用，请更换手机号",
					onWait: "正在进行合法性校验，请稍候..."
				});
	$("#vcode").formValidator({onShow:"",onFocus:"请输入您手机收到的短信验证码",onCorrect:"短信验证码格式正确"})
			   .inputValidator({min:4,max:4,onError:"短信验证码长度不正确"})
			   .regexValidator({regExp:"num",dataType:"enum",onError:"短信验证码格式不正确"});
    $("#refId").formValidator({onShow:"请输入推荐人用户名,<span style='color:red'>如无可不填</span>",onFocus:"请输入推荐人用户名,<span style='color:red'>如无可不填</span>",onCorrect:""})
    		   .inputValidator({min:0,onError:"推荐人不能为空"})
	           .ajaxValidator({
	              dataType : "json",
	              async : true,
	              url : "checkreusrexist.do",
	              data:"refId="+$("#refId").val(),
	              success : function(data){
	                  if(data.statu == 0){
	                  	return "不存在该推荐人ID,请更换推荐人ID";
	                  }else if(data.statu == 1){
	                  	return true;
	                  }else if(data.statu == -1){
	                  	return "服务器验证推荐人ID出现错误!";
	                  }
	                  return true;
	              },
	              buttons: $("#loginBtn"),
	              error: function(jqXHR, textStatus, errorThrown){$.dialog.warnTips("服务器没有返回数据，可能服务器忙，请重试"+errorThrown);},
	              onError : "该推荐人ID不可用，请更换推荐人ID",
	              onWait : "正在对推荐人ID进行合法性校验，请稍候..."
	          });
	$("#loginBtn").click(function(){
		$("#pageform").submit();
	});
});
function sendVcode(){
	var phone = $("#mobile").val(); //验证手机号码
	if($.formValidator.isOneValid("username")
		&& $.formValidator.isOneValid("password")
		&& $.formValidator.isOneValid("confirmpwd")
		&& $.formValidator.isOneValid("mobile")){
		if ($("#a_sendVcode").html() == "免费获取验证码" || $("#a_sendVcode").html() == "重新获取") {
			$("#a_sendVcode").html("发送中...");
			$.post("sendSMS.do", "phone=" + phone,function(data) {
				if (data == 1) {
					timers = 300;
					tipId = window.setInterval(timer, 1000);
				} else {
					$.dialog.errorTips("手机验证码发送失败");
					$("#a_sendVcode").html("重新获取");
				}
			});
		}else{
			return;
		}
	}else{
		return;
	}
}

function timer() {
	if (timers >= 0) {
		$("#a_sendVcode").attr("disabled",true);
		$("#a_sendVcode").html("重新获取：" + timers + "秒");
		timers--;
	} else {
		window.clearInterval(tipId);
		$("#a_sendVcode").html("重新获取");
		$.post("removeCode.do", "",function(data) {});
		$("#a_sendVcode").removeAttr("disabled");
	}
}
	
function fff(){
	ShowIframe('使用条款','querytips.do',800,600);
}
function ffff(){
	ClosePop();
}
function ffftip(){
	ShowIframe('隐私条款','querytip.do',800,600);
}