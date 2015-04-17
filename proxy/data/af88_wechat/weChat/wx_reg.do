<!DOCTYPE html>
<html>
<head>
	<title>注册</title>
	<base  href="http://www.xiaoniu88.com/">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/base.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/global.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/element.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/include.css" rel="stylesheet"/>
	<script type="text/javascript">
		var basePath = "http://www.xiaoniu88.com/";
	</script>
	<script type="text/javascript" src="/plugins/pwd/security.js?v=0.0.1"></script>
<style>
		body{background-color:#fff;}
		.container{width:100%;background:#fff;}
		#pageform{width:88%;margin:0px auto;padding:0px 0px 50px;}
		.title{font-size:14px;color:#666666;padding:20px 0px 12px;}
		.ipt_area{position:relative;margin-bottom:0px;}
		.ipt_area label{position:absolute;top:13px;left:35px;font-size:14px;color:#dfdfdf;}
		.ipt{outline:none;width:100%;height:44px;border:2px solid #999999;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;font-size:16px;padding-left:35px;}
		.input_tel{background:url('images/weChat/tel.png') no-repeat 10px 10px;background-size:13px 20px;}
		.input_tel_cur{border-color:#cda148;background-image:url('images/weChat/tel_cur.png');}
		.input_pass,.input_pass_copy{background:url('images/weChat/pass.png') no-repeat 10px 10px;background-size:13px 20px;}
		.input_pass_cur{border-color:#cda148;background-image:url('images/weChat/pass_cur.png');}
		.error_msg{color:#ff0000;font-size:12px;display:none;padding-top:10px;}
		.val_btn{width:100%;height:44px;line-height:44px;background-color:#ff864a;color:#fff;font-size:20px;text-align:center;margin:30px 0px 10px;cursor:pointer;}
		a.blue{font-size:12px;color:#0077d2}
		.check_img{display:inline-block;width:15px;height:15px;background:url('images/weChat/checked.png') no-repeat;background-size:15px 15px;vertical-align:bottom;}
		.hide_btn{display:inline-block;width:50px;height:40px;line-height:40px;font-size:12px;color:#666;background-color:#f9f0dd;
					position:absolute;right:2px;top:2px;text-align:center;cursor:pointer;}
		.accept_tip{color:#666;margin-top:18px;width:105%;}
		.input_pass_copy{display:none;}
		
		
		/*增加推荐人样式*/
		.ref_area{
			height:44px;
			position:relative;
			padding-left:106px;
		}
		.ref_area .ipt_area{
			display:none;
			background-color:#F00;
			
		}
		.ref_area.check .ipt_area{
			display:block;
			overflow:hidden;
		}
		.ref_area .ipt_area input{
			padding-left:12px;
		}
		.ref_area .ipt_area label{
			position: absolute;
			top: 13px;
			left: 12px;
			font-size: 14px;
			color: #dfdfdf;
			white-space:nowrap;
			overflow:hidden;
			max-width:100%;
		}
		.ref_area .ref_check{
			position:absolute;
			left:0px;
			top:0px;
			width:96px;
			padding-top:3px;
			height:40px;
			padding-bottom:1px;
			overflow:hidden;
			background-color:#edece9;
		}
		.ref_area .ref_check i{
			font-style:normal;
			display:inline-block;
			line-height:30px;
			height:30px;
			width:34px;
			overflow:hidden;
			border:1px solid transparent;
			text-align:center;
			margin:4px;
			font-size:16px;
		}
		.ref_area .ref_check i:first-child{
			background-color:#f4f3ef;
			background-color:linear-gradient(top,#f4f3ef,#f0ede8)	;
			color:#848080;
			/*border-color:#d4d4d1 #f4f3ef #dfdeda #bbbab8;*/
			border-radius:2px;
			box-shadow: -1px -1px 2px 1px #bbbab8;
			margin-left:9px;
		}
		.ref_area .ref_check i:last-child{
			color:#cecece;
		}

		.ref_area.check .ref_check i:first-child{
			background-color:transparent;
			color:#cecece;
			box-shadow:none;
		}
		
		.ref_area.check  .ref_check i:last-child{
			background-color:#ff864a;
			color:#f7f7f7;
			border-radius:2px;
			box-shadow: -1px -1px 1px #bbbab8;

		}
		input.input_curr{
			border-color:#cda148;
		}
		.ref_check{
			cursor:default;
		}
	</style>
</head>
<body>
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
</div><div class='container'>
		<form action='weChat/wx_regtwo.do' method="post" name="pageform" id="pageform">
			<div class='title'>手机号码</div>
			<div class='ipt_area'>
				<input class='ipt input_tel input_tel_cur' type='text' maxlength="11" name="paramMap.m" id="m"/>
				<label>11位长度手机号码</label>
			</div>
			<div class='error_msg' id="tel_msg">手机号码为11位长度</div>
			<div class='title'>登录密码</div>
			<div class='ipt_area'>
				<input class='ipt input_pass' type='text' maxlength="20" name="paramMap.p" id="p" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/>
				<label>输入密码</label>
				<span class="hide_btn">隐藏</span>
			</div>
			<div class='error_msg' id="pass_msg">登录密码必须为6-16位</div>
            <div class='title'>推荐人</div>
			<div class="ref_area">
            	<div class="ref_check" id="ref_check"><i>无</i><i>有</i></div>
                <div class='ipt_area'>
                    <input class='ipt input_referer' type='text' maxlength="20" name="paramMap.r" id="r"/>
                    <label>推荐人用户名或手机号</label>
				</div>
            </div>
			<div class='error_msg' id="ref_msg">推荐人不存在</div>
			<div class='val_btn'>获取短信验证码</div>
			<div class="accept_tip">
				<input type='checkbox' id='agre' name='agre' checked style='display:none;'>
				<span class="check_img"></span>
				我已阅读并同意<a href="javascript: void(0);"onclick="fff()" class="blue">
				《使用条款》</a>和<a href="javascript: void(0);" onclick="ffftip()" class="blue">《隐私条款》</a>
			</div>
		</form>
	</div>
</body>
    <script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/swipe.js"></script>
	<script type="text/javascript" src="http://www.xiaoniu88.com/js/popom.js"></script>
    <script type=text/javascript src="http://www.xiaoniu88.com/js/lhgdialog/lhgdialog.js"></script>
    <script type="text/javascript">
    	var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
    	$(function() {
    		$('.top_btn').hide();
			$('.top_title').html('快速注册').show();
			
    		$('.input_tel').focus(function(){
    			$(this).next().hide();
    			$(this).addClass('input_tel_cur');
    		}).blur(function(){
    			$(this).removeClass('input_tel_cur');
    			var phone = this.value;
    			if(phone == ''){
    				$(this).next().show();
    				$('#tel_msg').hide();
    				return;
    			}
				if(phoneReg.test(phone)){
					$('#tel_msg').hide();
					checkedPhone(phone);
				}else{
					$('#tel_msg').html('请输入13、14、15、18或17开头的11位手机号码').show();
				}
    		});
    		$('.input_pass').live("focus",function(){
    			$('.input_tel').removeClass('input_tel_cur');
    			$(this).next().hide();
    			$(this).addClass('input_pass_cur');
    		}).live("blur",function(){
    			$(this).removeClass('input_pass_cur');
    			if(this.value == ''){
    				$(this).next().show();
    				$("#pass_msg").hide();
    				return;
    			}
    			var callbak=checkPassword(this.value);
				if(callbak.type){
					$("#pass_msg").hide();
				}else{
					$("#pass_msg").html(callbak.msg).show();
				}
    		});
    		$('.ipt_area label').click(function(){
    			$(this).prev().focus();
    		});
			
			$('#ref_check').click(function(){//推荐人输入框开关
				var $refArea=$(this).parent();
				if($refArea.hasClass("check")){
					$refArea.removeClass("check");
					$("#ref_msg").hide();
					$('.input_referer').val("").next().show();//取消推荐人后 清空数据 并显示占位符
				}
				else{
    				$refArea.addClass("check");
				}
    		});
			$(".input_referer").focus(function(){
				}).blur(function(){
					var val=this.value;
					if(!val){
						return;
					}
					$.ajax({
						url : "checkreusrexist.do",
						data  : {"refId":val},
						type : "POST",
						dataType : "json",
						success : function(data){
							if(data.statu == 1){
								$("#ref_msg").hide();
								return;
							}
							
							if(data.statu!=1&&val.match(/^1[34578][0-9]{9}$/g)){//如果没有  而且值是手机号码
								$.ajax({
									url : "ajaxCheckMobilePhoneRegister.do",
									data  : {"paramMap.mobilePhone":val},
									type : "POST",
									dataType : "json",
									success : function(data){
										if (data == 6) {
											$("#ref_msg").hide();
										} else {
											$("#ref_msg").show();
										}
									},
									error : function(){
										$("#ref_msg").show();
									}
								});
							}
							else{
								$("#ref_msg").show();
							}
						},
						error : function(){
							$("#ref_msg").show();
						}
					});
				});		
			 
			$('.ipt_area label').click(function(){
    			$(this).prev().focus();
    		});
			$('.input_referer').focus(function(){//推荐人输入框
    			$(this).next().hide();
    			$(this).addClass('input_curr');
    		}).blur(function(){
    			$(this).removeClass('input_curr');//
				var referer = this.value;
    			if(referer == ''){
    				$(this).next().show();//显示提示语部分
    				return;
    			}
    		});
			
    		$('.hide_btn').toggle(function(){
    			$(this).html('显示');
    			var pas = $('.input_pass').val();
    			$('.input_pass').replaceWith("<input class='ipt input_pass' type='password' maxlength='20' name='paramMap.p' id='p'/>");
    			$('.input_pass').val(pas);
    		},function(){
    			$(this).html('隐藏');
    			var pas = $('.input_pass').val(); 
    			$('.input_pass').replaceWith("<input class='ipt input_pass' type='text' maxlength='20' name='paramMap.p' id='p'/>");
    			$('.input_pass').val(pas);
    		});
    		$('.check_img').toggle(function(){
    			$('.check_img').css('background-image','url(images/weChat/checkbox.png)');
    			$("#agre").removeAttr("checked");
    		},function(){
    			$('.check_img').css('background-image','url(images/weChat/checked.png)');
    			$("#agre").attr("checked","checked");
    		});
    		
    		$('.val_btn').click(function(){
    			if($('.input_tel').val()==''||$('#tel_msg').is(":visible")){
    				$('.input_tel').addClass('input_tel_cur');
    				return;
    			}
    			if($('.input_pass').val()==''||$('#pass_msg').is(":visible")){
    				$('.input_pass').addClass('input_pass_cur');
    				return;
    			}
				if($('.input_referer').val()!=''){//重新校验一遍
					validateRef(submitForm);//校验成功提交一次
    				return;
    			}
    			if (!$("#agre")[0].checked) {
					$.dialog.warnTips("请勾选我已阅读并同意《使用条款》和《隐私条款》");
					return;
				}
				submitForm();
    		});
    	});
		
		//校验推荐人
		function validateRef(succ,fail){
			var val=$('.input_referer').val();
			$.ajax({
				url : "checkreusrexist.do",
				data  : {"refId":val},
				type : "POST",
				dataType : "json",
				success : function(data){
					if(data.statu == 1){
						$("#ref_msg").hide();
						succ&&succ();
						return;
					}
					
					if(data.statu!=1&&val.match(/^1[34578][0-9]{9}$/g)){//如果没有  而且值是手机号码
						$.ajax({
							url : "ajaxCheckMobilePhoneRegister.do",
							data  : {"paramMap.mobilePhone":val},
							type : "POST",
							dataType : "json",
							success : function(data){
								if (data == 6) {
									$("#ref_msg").hide();
									succ&&succ();
								} else {
									$("#ref_msg").show();
								}
							},
							error : function(){
								$("#ref_msg").show();
							}
						});
					}
					else{
						$("#ref_msg").show();
					}
				},
				error : function(){
					$("#ref_msg").show();
				}
			});
		}
		//
		function submitForm(){
			var pas = $('.input_pass').val();
			$('.input_pass').replaceWith("<input class='ipt input_pass' type='password' maxlength='20' name='paramMap.p' id='p'/>");
			$('.input_pass').val(pas);
			$('#p').val(RSAUtils.pwdEncode($("#p").val()));
			$('#pageform').submit();
		}
    	//检测手机号
    	function checkedPhone(phone){
			$(".input_tel").attr("disabled","disabled");
			$.ajax({
				url : "ajaxCheckMobilePhoneRegister.do",
				data  : {"paramMap.mobilePhone":phone},
				type : "POST",
				dataType : "json",
				success : function(data){
					$(".input_tel").removeAttr("disabled");
					if (data == 6) {
						$('#tel_msg').html('该手机号已被使用，请更换手机号').show();
					}
				},
				error : function(){
					$(".input_tel").removeAttr("disabled");
					$('#tel_msg').html('网络异常，请重试...').show();
				}
			});
		}
		//检测密码
		function checkPassword(p){
			var passWord1=/^\d+$/,
				passWord2=/^[a-z]+$/,
				passWord3=/^[A-Z]+$/,
				passWord4=/^[^0-9a-zA-Z]+$/,
				passWord5=/\s/,
				passWord6=/[\u4e00-\u9fa5]/;
			if(p.length<6||p.length>20){
				return {type:false,msg:"请输入6~20个字符的密码"};
			}
			if(passWord1.test(p)){
				return {type:false,msg:"密码不能为纯数字"};
			}
			if(passWord2.test(p)){
				return {type:false,msg:"密码不能为纯小写字母"};
			}
			if(passWord3.test(p)){
				return {type:false,msg:"密码不能为纯大写字母"};
			}
			if(passWord4.test(p)){
				return {type:false,msg:"密码不能为纯符号"};
			}
			if(passWord5.test(p)){
				return {type:false,msg:"密码不能包含空格"};
			}
			if(passWord6.test(p)){
				return {type:false,msg:"密码不能包含中文"};
			}
			return {type:true,msg:" "};
		}
		function fff(){
			ShowIframe('使用条款','querytips.do',300,300);
		}
		function ffftip(){
			ShowIframe('隐私条款','querytip.do',300,300);
		}
    </script>
</html>
