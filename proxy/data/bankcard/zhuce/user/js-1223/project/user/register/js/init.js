/*
 *name:dtt
 *time:2014.12.01
 *content:注册页
 */
seajs.config({
    // 别名配置
    alias: {
        'head':'../../../../module/head/js/init.js',
		'service':'../../../../module/service/js/init.js',
		'rightTips':'../../../../module/rightTips/js/init.js',
		'dialog':'../../../../module/dialog/js/init.js'
    }
});

define(function(require, exports, module) {
    require('head');
	require('service');
    require('rightTips');
	require('dialog');

	//输入框
	var $form=$("form[name='register']");
	$form.find("input").blur(function(){
		var $th=$(this),
			$val=$th.val(),
			$leb=$th.parent("span.bor").siblings("span.po");
		$form.find("span.bor").removeClass("cur");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		switch($th.attr("name")){
			case "userName"://用户名
				var length=$val.replace(/[\u2E80-\u9FFF]/g,"aa").length;
				if(length>=6&&!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g.test($val)){
					$leb.addClass("err").addClass("lh").html("6-16个字符，可包含英文字母、中文、数字和下划线。");
				}else if(length<6||length>16||!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g.test($val)){
					$leb.addClass("err").addClass("lh").html($th.attr("data-err"));
				}else if(length>=6&&/^[0-9]/g.test($val)){
					$leb.addClass("err2").removeClass("lh").html("用户名不能以数字开头");
				}else if(length>=6&&/^xnw/g.test($val)){
					$leb.addClass("err2").removeClass("lh").html("用户名不能以 xnw 开头");
				}else{
					$leb.addClass("onload").html("正在进行校验，请稍候...");
					$.ajax({
						url:$th.attr("data-url")+encodeURI(encodeURI($val)),
						type:"get",
						dataType:"json",
						success:function(data){
							switch(data){
								case "1":
									$leb.addClass("succ").html("");
									break;
								case "3":
									$leb.addClass("err2").removeClass("lh").html("该用户名已被使用，请更换用户名");
									break;
								case "9":
									$leb.addClass("err").addClass("lh").html($th.attr("data-err"));
									break;
							}
						},
						error:function(){
							$leb.addClass("err2").removeClass("lh").html("服务器没有返回数据，可能服务器忙");
						}
					});
				}
			break;
			case "password"://密码
				var length=$val.length,
					sibLeb=$leb.addClass("err2").removeClass("lh");
				if(length<6||length>20){
					sibLeb.html($th.attr("data-err"));
				}else if(length>=6&&/^[0-9]+$/g.test($val)){
					sibLeb.html("密码不能为纯数字");
				}else if(length>=6&&/^[A-Z]+$/g.test($val)){
					sibLeb.html("密码不能为纯大写字母");
				}else if(length>=6&&/^[a-z]+$/g.test($val)){
					sibLeb.html("密码不能为纯小写字母");
				}else if(length>=6&&/^\W+$/g.test($val)){
					sibLeb.html("密码不能为纯符号");
				}else if(length>=6&&/^\s+$/g.test($val)){
					sibLeb.html("密码不能包含空格");
				}else{
					$leb.removeClass("err2").addClass("succ").html("");
				}
			break;
			case "confirmPassword"://重复密码
				var pwdOne=$form.find("input[name='password']").val();
				if($val.length<6){
					$leb.addClass("err2").html($th.attr("data-err"));
				}else if(pwdOne.length>=6&&pwdOne!=$val&&$val.length>=6){
					$leb.addClass("err2").html("两次密码输入不一致");
				}else if(pwdOne.length>=6&&pwdOne==$val){
					$leb.addClass("succ").html("");
				}else{
					$leb.html("");
				}
			break;
			case "verifyCode"://验证码
				if($val==""||$val.length<4){
					$leb.addClass("err2").html($th.attr("data-err"));
				}else{
					$leb.removeClass("err2").html("");
				}
			break;
			case "refferee"://推荐人
				if($val!=""){
					$.ajax({
						url:$th.attr("data-url")+encodeURI(encodeURI($val)),
						type:"get",
						dataType:"json",
						success:function(data){
							switch(data){
								case "20":
									$leb.addClass("succ").html("");
									break;
								case "21":
									$leb.addClass("err2").removeClass("lh").html("该推荐人不存在");
									break;
							}
						},
						error:function(){
							$leb.addClass("err2").removeClass("lh").html("服务器验证推荐人出现错误");
						}
					});
				}else{
					$leb.html("");
				}
			break;
			case "mobile"://手机号
				phone($th);
			break;
			case "phoneCode"://手机验证码
			break;
		}

	}).focus(function(){
		var $th=$(this),
			$leb=$th.parent("span.bor").siblings("span.po");
		$th.parent("span.bor").addClass("cur");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		if($th.attr("name")=="userName"||$th.attr("name")=="password"){
			$leb.addClass("lh").html($th.attr("data-po"));
			code($th.val());
		}else if($th.attr("name")=="mobile"){
			phone($th);
		}else{
			$th.parent("span.bor").siblings("span.po").html($th.attr("data-po"));
		}
	});


	(function ($) {
	/*
	 * 0-弱
	 * 1-中
	 * 2-强
	 */
	var pswstrength = function () {}
	pswstrength.prototype = {
		constructor: pswstrength,
		//Unicode 编码区分数字，字母，特殊字符
		CharMode: function (iN) {
			if (iN >= 48 && iN <= 57) //数字（U+0030 - U+0039）
				return 1; //二进制是0001
			if (iN >= 65 && iN <= 90) //大写字母（U+0041 - U+005A）
				return 2; //二进制是0010
			if (iN >= 97 && iN <= 122) //小写字母（U+0061 - U+007A）
				return 4; //二进制是0100
			else //其他算特殊字符
				return 8; //二进制是1000
		},
		bitTotal: function (num) {
			modes = 0;
			for (i = 0; i < 4; i++) {
				if (num & 1) //num不是0的话
					modes++; //复杂度+1
				num >>>= 1; //num右移1位
			}
			return modes;
		},
		check: function (sPW) {
			if (sPW.length < 6) //小于7位，直接“弱”
				return 0;
			Modes = 0;
			for (i = 0; i < sPW.length; i++) { //密码的每一位执行“位运算 OR”
				Modes |= this.CharMode(sPW.charCodeAt(i));
			}
			return this.bitTotal(Modes);
		}
	}
	window.pswstrength=new pswstrength();
	})(jQuery);

	var code=function(val){
		var a=pswstrength.check(val);
		$(".tab span.po span").removeClass("cl");
		$(".tab span.po span:lt("+a+")").addClass("cl");
	}

	//密码强、中、弱
	$form.find("input[name='password']").keyup(function(){
		var $th=$(this),$val=$th.val();
		code($val);
	});
	//验证回调提示
	var fnbreak=function(leb,info){
		$('ul.but .r a.next').removeClass("no-push").html('下一步');
		leb.parent().siblings(".po").removeClass("err");
		leb.parent().siblings(".po").removeClass("err2");
		leb.parent().siblings(".po").removeClass("succ");
		leb.parent().siblings(".po").removeClass("onload");
		leb.parent().siblings(".po").addClass("err2").removeClass("lh").html(info);
	}

	//第一步提交
	var register=true;
	var registerPush=function(){
		for(var i=0;i<$form.find("input.ipt").length;i++){
			if($form.find("input.ipt").eq(i).val()==""){
				$form.find("input.ipt").eq(i).focus();
				return false;
			}
		}
		if(register){
			register=false;
			$('ul.but .r a.next').addClass("no-push").html('提交中...');
			//设置密码加密
			var pwdval=$("input[name='password']").val(),
				pwdval2=$("input[name='confirmPassword']").val();
			if(pwdval.length<=20){
				pwdval=RSAUtils.pwdEncode($("input[name='password']").val());
				pwdval2=RSAUtils.pwdEncode($("input[name='confirmPassword']").val());
			}
			$form.find("input[name='password']").val(pwdval);
			$form.find("input[name='confirmPassword']").val(pwdval2);
			var param=$form.serialize();
			$.ajax({
				url:$form.attr("data-url"),
				data:param,
				type:"POST",
				dataType: "json",
				success: function(data){
					register=true;
					switch(data){
						case "1":
							//注册成功
							$form.submit();
							$('ul.but .r a.next').addClass("no-push").html('提交中...');
						break;
						case "13":
							fnbreak($form.find("input[name='userName']"),"用户名为空");
							break;
						case "14":
							fnbreak($form.find("input[name='password']"),"密码为空");
							break;
						case "15":
							fnbreak($form.find("input[name='confirmPassword']"),"密码不匹配");
							break;
						case "17":
							fnbreak($form.find("input[name='verifyCode']"),"验证码为空");
							break;
						case "18":
							fnbreak($form.find("input[name='verifyCode']"),"验证码错误");
							break;
						case "3":
							fnbreak($form.find("input[name='userName']"),"该用户名已被使用，请更换用户名");
							break;
						case "9":
							fnbreak($form.find("input[name='userName']"),"用户名格式错误");
							break;
						case "10":
							fnbreak($form.find("input[name='password']"),"密码格式错误");
							break;
						case "5":
							fnbreak($form.find("input[name='password']"),"密码检验失败");
							break;
					}

				}
			});
		}
	}

	//第二步提交
	var registerTwo=true;
	var registerPushTwo=function(){
		for(var i=0;i<$form.find("input.ipt").length;i++){
			if($form.find("input.ipt").eq(i).val()==""){
				$form.find("input.ipt").eq(i).focus();
				return false;
			}
		}
		if(registerTwo){
			registerTwo=false;
			$('ul.but .r a.next').addClass("no-push").html('提交中...');
			//设置密码加密
			var pwdval=$("input[name='password']").val(),
				pwdval2=$("input[name='confirmPassword']").val();
			if(pwdval.length<=20){
				pwdval=RSAUtils.pwdEncode($("input[name='password']").val());
				pwdval2=RSAUtils.pwdEncode($("input[name='confirmPassword']").val());
			}
			$form.find("input[name='mobile']").removeAttr("disabled");
			var param=$form.serialize();
			$.ajax({
				url:$form.attr("data-url"),
				data:param,
				type:"POST",
				dataType: "json",
				success: function(data){
					registerTwo=true;
					switch(data){
						case "1":
							//注册成功
							$form.submit();
							$('ul.but .r a.next').addClass("no-push").html('提交中...');
							//$('ul.but .r a.next').html('下一步');
						break;
						case "22":
							fnbreak($form.find("input[name='mobile']"),"手机号码为空");
							break;
						case "23":
							fnbreak($form.find("input[name='phoneCode']"),"手机验证码为空");
							break;
						case "28":
							fnbreak($form.find("input[name='phoneCode']"),"服务器没有返回数据，请重发短信");
							break;
						case "24":
							fnbreak($form.find("input[name='phoneCode']"),"手机验证码不匹配");
							break;
						case "25":
							fnbreak($form.find("input[name='mobile']"),"手机号码不匹配");
							break;
						case "2":
							fnbreak($form.find("input[name='phoneCode']"),"您所注册的用户名已存在,请重新注册");
							break;
						case "6":
							fnbreak($form.find("input[name='mobile']"),"手机号码已被使用，请更换手机号码");
							break;
					}

				}
			});
		}
	}
	var subutNext=function(){
		if($(".no-push").length<=0){
			if($(".btn-one").length&&$(".color-agre input[name='agre']").is(":checked")){
				if(!$("span.err").length>0&&!$("span.err2").length>0){
					registerPush();
				}
			}else{
				registerPushTwo();
			}
		}
	}
	$("ul.but .r").delegate("a.next","click",function(event){
		event.preventDefault();
		subutNext();
		return false;
	});
	//处理键盘的回车键登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			subutNext();
		}
	});
	//选中使用条款及隐私条款
	$(".color-agre").delegate("input[name='agre']","click",function(){
		if($(this).is(":checked")){
			registerTwo=true;
			$('ul.but .r a.next').removeClass("no-push");
		}else{
			registerTwo=false;
			$('ul.but .r a.next').addClass("no-push");
		}
	});

	//使用条款及隐私条款
	$("ul.color-agre").delegate("a.info","click",function(event){
		event.preventDefault();
		var $th=$(this),til=$th.index()==0?"使用条款":"隐私条款";
		var urlCen=$th.attr("data-url");
		$.dialog({
			title:til,
			width:800,
			height:600,
			lock: true,
			opacity: 0.5,
			background:'#000',
			max: false,
			padding:0,
    		min: false,
			content:'<iframe class="iframe-height" src="'+urlCen+'" marginheight="0" marginwidth="0" frameborder="0" width="800" height="600"></iframe>'
		});
		return false;
	});



	//手机验证
	var phone=function(tmp){
		var $th=tmp,$val=$th.val(),
			$leb=$th.parent("span.bor").siblings("span.po");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		$(".send-modle .send-vcode").removeClass("clk-bg");
		if($val.length==11&&/(^[1][34587][0-9]{9}$)/g.test($val)){
			$th.parent("span.bor").siblings("span.po").removeClass("lh").addClass("onload").html("正在进行合法性校验，请稍候...");
			$.ajax({
				url:$th.attr("data-url")+$val,
				type:"get",
				dataType:"json",
				success:function(data){
					switch(data){
						case "1":
							$leb.addClass("succ").html("");
							$(".send-modle .send-vcode").addClass("clk-bg");
							break;
						case "22":
							$leb.addClass("err2").removeClass("lh").html("手机号码为空");
							break;
						case "6":
							$leb.addClass("err2").removeClass("lh").html("注册手机号重复");
							break;
						case "8":
							$leb.addClass("err2").removeClass("lh").html("手机号码格式错误");
							break;
					}
				}
			});
		}else if($val.length<11){
			$leb.addClass("lh").html($th.attr("data-err"));
		}
	}

	//手机号验证
	$form.find("input[name='mobile']").keyup(function(){
		phone($(this));
	});


	//选择有或无推荐人选项
	$(".name-h ul").delegate("li","click",function(){
		var $th=$(this),$leb=$th.parent("ul").siblings("span.po");;
		$leb.html("");
		$leb.siblings(".bor").find("input").val("");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		if(!$th.hasClass("check")){
			$th.addClass("check").siblings().removeClass("check");
		}
		if($th.index()==1&&$th.hasClass("check")){
			$(".name-h .bor").addClass("bor-show");
		}else{
			$(".name-h .bor").removeClass("bor-show");
		}
	}).delegate("li","mouseover",function(){
		$(this).addClass("ckcur");
	}).delegate("li","mouseout",function(){
		$(this).removeClass("ckcur");
	});


	//注册成功互动方式鼠标滑过加背景
	$(".start-suc").delegate("li","mouseover",function(){
		$(this).addClass("bg");
	}).delegate("li","mouseout",function(){
		$(this).removeClass("bg");
	})
	//注册成功微信二维码显示
	$(".start-suc li").delegate("i.i01","mouseover",function(){
		$(".start-suc li i.i02").show("fast");
	}).delegate("i.i01","mouseout",function(){
		$(".start-suc li i.i02").hide("fast");
	})


	var switchCode=function(tmp){
		var timenow =eval(+(new Date));
		var imgUrl=$("ul.ipt-code img").attr("data-img");
		tmp.parent("li").find("input").val("");
		tmp.parent("li").find("img").attr("src", imgUrl+"?" + timenow);
	}

	//刷新验证码
	$("ul.ipt-code").delegate("a.cd-a","click",function(event){
		event.preventDefault();
		var $th=$(this);
		switchCode($th);
		return false;
	});
	$("ul.ipt-code").delegate("img","click",function(){
		var $th=$(this);
		var timenow =eval(+(new Date));
		var imgUrl=$("ul.ipt-code img").attr("data-img");
		$th.attr("src", imgUrl+"?" + timenow);
	});
	var stopInfo=function(leb){
		leb.html("重发短信");
		leb.addClass("clk-bg");
		$("ul.send-modle span.pvoice").html("&nbsp;");
		$form.find("input[name='mobile']").removeAttr("disabled");
	}
	var timeLefts;
	var timeDwon=function(leb,time){
		leb.html("重发短信("+time+")");
		if(!time--){
			stopInfo(leb);
		}else{
			timeLefts = setTimeout(function(){timeDwon($(".send-vcode"),time)},1000);
		}
	}
	var pushCode=function(start,info){
		var leb=$(".send-modle .po");
		leb.removeClass("err2");
		leb.removeClass("succ");
		leb.removeClass("onload");
		$form.find("input[name='mobile']").attr("disabled","disabled");
		$.ajax({
			url:$(".send-vcode").attr("data-url"),
			type:"post",
			data:{"mobile":$form.find("input[name='mobile']").val(),"type":start},
			dataType:"json",
			success:function(data){
				switch(data){
					case "1":
						timeDwon($(".send-vcode"),60);
						$(".send-vcode").removeClass("clk-bg");
						if(start=="sms"){
							$("span.pvoice").addClass("pve-line").html(info);
						}else{
							$("span.pvoice").removeClass("pve-line").html(info);
						}
						leb.addClass("succ").html("");
						break;
					case "26":
						stopInfo($(".send-vcode"));
						leb.addClass("err2").removeClass("lh").html("非正常跳转用户，禁止发送短信");
						break;
					case "27":
						stopInfo($(".send-vcode"));
						leb.addClass("err2").removeClass("lh").html("发送验证码失败");
						break;
					case "22":
						stopInfo($(".send-vcode"));
						leb.addClass("err2").removeClass("lh").html("手机号码为空");
						break;
				}
			}
		});
	}

	//手机验证码
	$("ul.send-modle").delegate("span.clk-bg","click",function(){
		clearTimeout(timeLefts);
		pushCode("sms",$(this).attr("data-po"));
	});

	//发送语音验证码
	$("ul.send-modle span").delegate("i.phd","click",function(){
		clearTimeout(timeLefts);
		pushCode("pvoice",$(".send-vcode").attr("data-pvoice"));
	});


});

