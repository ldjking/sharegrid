<!DOCTYPE html>
<html>
<head>
	<title>验证身份</title>
	<base href="http://www.xiaoniu88.com/">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/base.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/global.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/element.css" rel="stylesheet"/>
</head>
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
</div><fieldset class="reg_box">
    	<legend>找回密码</legend>
        <div class="group_title">验证身份</div>
        <dl class="forgetpwd">
        	<dt class="fl">用&nbsp;户&nbsp;&nbsp;名：</dt>
            <dd class="fl">millerliu</dd>
        </dl>
        <dl class="forgetpwd">
        	<dt class="fl">手机号码：</dt>
            <dd class="fl">
            	<span class="fl">150*****784</span>
            	<div class="btn fl mgl-20">
                    <div class="btn_wap" id="phonecodesend">
                        <div class="btn_c" style="font-size:14px;">获取验证码</div>
                    </div>
                    <span style="display:none;" id="phonesecond">300秒</span>
                    <div class="btn_l"></div>
                    <div class="btn_r"></div>
                </div>
            </dd>
        </dl>
        <dl id="dlphoneseconderr" class="forgetpwd" style="display:none;">
       		<dt class="fl">&nbsp;</dt>
       		<dd class="fl" id="phoneseconderr" style="color:#999;"></dd>
       	</dl>
        <input type="text" id="phonecode" placeholder="请输入验证码" class="input_box w100"/>
        <div class="btn mgc-30 w60">
            <div class="btn_wap">
                <div class="btn_cc" id="btnsubmit" >下一步</div>
            </div>
            <div class="btn_lc"></div>
            <div class="btn_rc"></div>
        </div>
      </fieldset>
</body>

<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/jquery-1.8.0.min.js"></script>
<script type=text/javascript src="http://www.xiaoniu88.com/js/lhgdialog/lhgdialog.js"></script>
<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/retrieveSend.js?153"></script>
<script type="text/javascript">
	var arictype = "password";
	$(function(){
		$('.top_btn').hide();
		$('.top_title').html('找回密码').show();
	});
</script>
</html>
