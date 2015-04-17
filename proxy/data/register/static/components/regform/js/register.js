	var b=true;
	var smsVcode = 0;
	var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
	var forbidden_prefix = "xnw";//系统保留字符
	 
	$(".reg_btn").bind("click", function() {
		$('html,body').animate({
			'scrollTop' : '0'
		}, 300);
	});
	$(".loginBtn").bind("click", function() {
		 reg();
	});
	function ffftip() {
		ShowIframe('隐私条款', 'querytip.do', 800, 600);
	}
	function fff() {
		ShowIframe('使用条款', 'querytips.do', 800, 600);
	}
	
	function sendVcode(){
		if(smsVcode == 0){
			var phone=$("#mobile").val();
			if(!phoneReg.test(phone)){
				$("#mobile").focus();
				$(".mobileTip").show();
				$("#mobileTip").html("<div class='msg shortMsg'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>手机号码格式不正确</div>");
				return;
			}
			$(".mobileTip").hide();
			$("#a_sendVcode").html("<span style='color:#fff;'>发送中<span>");
			$.post("sendSMS.do", "phone=" + $("#mobile").val(),function(data) {
				if (data == 1) {
					timeLeft(60);
					$(".getCode").css("background-image","none");
					smsVcode = 1;
					$("#mobile").attr("disabled","disabled");
					$(".voice_tip").show();
					$(".voice_tip td").html("如果没有收到验证码，请<span class='voice_val' style='color:#368ff4;cursor:pointer;padding-left:5px;'>使用语音验证</span>");
					$(".accept_tip").css("height","22px");
				} else {
					alert("手机验证码发送失败");
					$(".voice_tip").hide();
					$(".accept_tip").css("height","30px");
					$("#a_sendVcode").html("<span style='color:#fff;'>获取验证码<span>");
					$(".getCode").css("background-image","url(images/google/google_icon.png)");
				}
			});
		}
	};
	function timeLeft(time){
		$("#a_sendVcode").html("<span style='color:#6f6f6f;'>重新获取：" + time + "秒<span>");
		if(!time--){
			$("#a_sendVcode").html("<span style='color:#fff;'>重新获取<span>");
			$(".getCode").css("background-image","url(images/google/google_icon.png)");
			smsVcode=0;
			$("#a_sendVcode").css("background-position","-235px -265px");
			$("#mobile").removeAttr("disabled");
		}else{
			setTimeout(function(){timeLeft(time)},1000);
		}
	}
	/* 计算器 */
	function counter(){
		if(b){
		b=false;
		$.dialog({
			title:false,
			width:430,
			height:480,
			lock: true,
			opacity: 0.5,
			background:"#000", 
			resize:false,
			close:function (){b=true;} ,
			fixed:true,
			content: 'url:http://www.xiaoniu88.com/counter.jsp'
		});
		}
	}
	function submit(){
		//若还有提示窗口，则取消提交
		if($(".tip:visible").length > 0 || $(".correct:visible").length != 4){
			if(!$("#username").val()){
				$("#username").focus();
			}
			if(!$("#password").val()){
				$("#password").focus();
			}
			if(!$("#confirmpwd").val()){
				$("#confirmpwd").focus();
			}
			if(!$("#mobile").val()){
				$("#mobile").focus();
			}
			if(!$("#vilidataNum").val()){
				$("#vilidataNum").focus();
			}
			return;
		}
		var channelId = '';
		var param = {};
		param["paramMap.userName"] = $("#username").val();
		param["paramMap.password"] = $("#password").val();
		param["paramMap.confirmPassword"] = $("#confirmpwd").val();
		param["paramMap.cellPhone"] = $("#mobile").val();
		param["paramMap.vilidataNum"] = $("#vilidataNum").val();
		param["paramMap.cjdOpenId"] = channelId;
		$.post(
				"register2af884google.do",
				param,
				function(data) {
					if (data.msg == '1') {
							window.location.href = 'regSucc2.do?channelId=' + channelId;
					} else if (data.msg == '11') {
						 
					} else {
						$.dialog.warnTips(data.msg);
					}
		});
	}
	function reg(){
		if (!$("#agre")[0].checked) {
			$.dialog.warnTips("请勾选我已阅读并同意《使用条款》和《隐私条款》");
			return;
		}
		setTimeout(function(){
			 submit()
		},1000);
	}
	 
	$(function() {
		$('.voice_val').live("click",function(){
			$('.voice_tip td').html("请注意接听<span style='color:#ff864a;'> 400 777 1268</span> 的来电");
			$.post("sendSMS.do", "phone=" + $("#mobile").val() +"&ptype=pvoice",function(data) {
				if (data == 1) {
				} else {
					$('.voice_tip td').html("如果没有收到验证码，请<span class='voice_val' style='color:#368ff4;cursor:pointer;padding-left:5px;'>使用语音验证</span>");
					alert("语音验证码发送失败");
				}
			});
		});

		$("#username").focus(function(){
			$(".usernameTip").show();
			$("#usernameTip").parent().prev().hide();
		}).blur(function(){
			setTimeout(function(){
				if($("#usernameTip").hasClass("onCorrect")){
					$(".usernameTip").hide();
					$("#usernameTip").parent().prev().show();
				}
			},1500);
		});
		$("#confirmpwd").focus(function(){
			$(".confirmpwdTip").show();
			 $("#confirmpwdTip").parent().prev().hide();
		}).blur(function(){
			setTimeout(function(){
				if($("#confirmpwdTip").hasClass("onCorrect")){
					$(".confirmpwdTip").hide();
					 $("#confirmpwdTip").parent().prev().show();
				}
			},500);
		});
		$("#vilidataNum").focus(function(){
			$(".vilidataNumTip").show();
		}).blur(function(){
			$(".vilidataNumTip").hide();
		});
		/*$("#vilidataNum").focus(function(){
			$(".vilidataNumTip").show();
			$("#vilidataNumTip").parent().prev().hide();
		}).blur(function(){
			 setTimeout(function(){
				if($("#vilidataNumTip").hasClass("onCorrect")){
					$(".vilidataNumTip").hide();
					 $("#vilidataNumTip").parent().prev().show();
				}
			},100); 
		});*/
		$.formValidator.initConfig({formID:"pageform"});
		
		$("#username").formValidator({onFocus:"<div class='tipLongText'>6-16个字符，可包含英文字母、中文、数字和下划线。<font style='color:#f79100;font-size: 12px'>用户名注册后不可更改</font></div>",onCorrect:""})
						  .inputValidator({min:6,max:16,onError:"<div class='tipLongText  '><img class='onErrorLong_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>请输入6~16个字符的用户名（一个汉字占用2个字符）</div>"})
						  .regexValidator({regExp:"username",dataType:"enum",onError:"<div class='tipLongText  '><img class='onErrorLong_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>6-16个字符，可包含英文字母、中文、数字和下划线</div>"})
						  .regexValidator({regExp:"username1",dataType:"enum",onError:"<div class='tipText  '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>用户名不能以 xnw 开头</div>"})
						  .regexValidator({regExp:"username2",dataType:"enum",onError:"<div class='tipText  '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>用户名不能以数字开头</div>"})
						  .ajaxValidator({type: "post",
							dataType: "html",
							async: true,
							url: "ajaxCheckRegister.do",
							data:{"paramMap.userName": function(){return $("#username").val();}},
							success: function(data){
					          	if(data == 3 || data == 4) return "<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>该用户名已被使用，请更换用户名</div>";
								return true;
							},
							buttons: $("#loginBtn"),
							error: function(jqXHR, textStatus, errorThrown){
								$.dialog.warnTips("服务器没有返回数据，可能服务器忙，请重试"+errorThrown);
							},
							onError: "<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>该用户名已被使用，请更换用户名</div>",
							onWait: "<div class='tipText'>正在进行合法性校验，请稍候...</div>"
		});
		$("#confirmpwd").formValidator({onFocus:"<div class='tipText'>请再次输入密码</div>",onCorrect:""})
						  .inputValidator({min:6,empty:{leftEmpty:false,rightEmpty:false,emptyError:"<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>确认密码两边不能存在空字符</div>"},onError:"<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>请输入6~20个字符的密码</div>"})
						  .compareValidator({desID:"password",operateor:"=",onError:"<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>两次密码输入不一致</div>"});
		$("#password").bind("focus",function(){
				$(".passwordTip").show();
				$("#passwordTip").parent().prev().hide();
				$("#passwordTip").html("<div class='msg'>6~20位字符，至少包含数字、大写字母、小写字母、符号中的2种</div>");
			}).bind("blur",function(){
				var callbak=checkPassword(this.value);
				if(callbak.type){
					$(".passwordTip").hide();
					$("#passwordTip").parent().prev().show();
				}else{
					$("#passwordTip").html(callbak.msg);
				}
		});
		 
		//检测密码
		function checkPassword(p){
			var passWord1=/^\d+$/,
				passWord2=/^[a-z]+$/,
				passWord3=/^[A-Z]+$/,
				passWord4=/^[^0-9a-zA-Z]+$/;
			if(p.length<6||p.length>20){
				return {type:false,msg:"<div class='msg shortMsg'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>请输入6~20个字符的密码</div>"}
			}
			if(passWord1.test(p)){
				return {type:false,msg:"<div class='msg shortMsg '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>密码不能为纯数字</div>"}
			}
			if(passWord2.test(p)){
				return {type:false,msg:"<div class='msg shortMsg '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>密码不能为纯小写字母</div>"}
			}
			if(passWord3.test(p)){
				return {type:false,msg:"<div class='msg shortMsg '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>密码不能为纯大写字母</div>"}
			}
			if(passWord4.test(p)){
				return {type:false,msg:"<div class='msg shortMsg '><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>密码不能为纯符号</div>"}
			}
			return {type:true,msg:" "}
		}
		$("#vilidataNum").formValidator({onShow : "",onFocus : "<div class='tipText'>请输入您手机收到的短信验证码</div>",onCorrect : ""})
				.inputValidator({min : 4,max : 4,onError : "<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>短信验证码长度不正确</div>"})
				.regexValidator({regExp : "num",dataType : "enum",onError : "<div class='tipText'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>短信验证码格式不正确</div>"	}); 
		$("#mobile").bind("focus",function(){
			$(".mobileTip").show();
			$("#mobileTip").parent().prev().hide();
			$("#mobileTip").html("<div class='msg'>请输入13、14、15、18或17开头的11位手机号码</div>");
		}).bind("blur",function(){
			var phone=$(this).val();
			if(phoneReg.test(phone)){
				checkedPhone(phone);
			}else{
				smsVcode = 1;
				$("#mobileTip").html("<div class='msg'><img class='onErrorLong_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>请输入13、14、15、18或17开头的11位手机号码</div>");
			}
		});
		function checkedPhone(phone){
			$("#mobile").attr("disabled","disabled");
			$("#mobileTip").html("<div class='msg shortMsg'>正在进行合法性校验，请稍候...</div>");
			$.ajax({
				url : "ajaxCheckMobilePhoneRegister.do",
				data  : {"paramMap.mobilePhone":phone},
				type : "POST",
				dataType : "json",
				success : function(data){
					$("#mobile").removeAttr("disabled");
					if (data == 6) {
						smsVcode = 1;
						$("#mobileTip").html("<div class='msg shortMsg'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>该手机号已被使用，请更换手机号</div>");
					} else {
						smsVcode = 0;
						$(".mobileTip").hide();
						$("#mobileTip").parent().prev().show();
					}
				},
				error : function(){
					smsVcode = 1;
					$("#mobile").removeAttr("disabled");
					$("#mobileTip").html("<div class='msg shortMsg'><img class='onError_' src='http://www.xiaoniu88.com/plugins/formvalidator/themes/Default/images/onError.png'>网络异常，请重试...</div>");
				}
			});
		}
	});
	
	

(function(){//拉取最新运营数据
	$.shovePost = function(url,param,callBack){
		url = url+"?shoveDate"+new Date().getTime();
		$.post(url,param,function(data){
			if(data == "noLogin"){
				window.location.href="login.do";
				return;
			}
			if(data=="network"){
			   window.location.href="upgrade.jsp";
			  return;
			}
			if(data == "pagejump"){
				window.location.href="adminMessage.do";
				return;
			}
			callBack(data);
		});
	}
	
	$.shovePost("http://www.xiaoniu88.com/getBorrowStatistics.do", {}, function(data) {
		$("#totalInvestAmount").html(strHtml__(data.totalInvestAmount)+'万元');
		$("#beginDate").html(strHtml_(data.beginDate));
	});
	
	function strHtml__(arr){
		if(arr.length<=4)
			return arr;
		var str=arr.substring(0,arr.length-4);
			str+="亿";
			str+=arr.substring(arr.length-4,arr.length);
		return str;
	}
	function strHtml_(arr){
		var length=arr.length;
		if(length<3)
			return arr;
		var a_arr=arr.split('');
		for(var i=length-1,j=0;j<length;i--){
			if(j&&(j+1)%3==0&&j!=length-1){
				a_arr.splice(i,0,',');
			}
			j++
		}
		return a_arr.join('');
	}
})();