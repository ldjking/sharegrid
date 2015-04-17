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