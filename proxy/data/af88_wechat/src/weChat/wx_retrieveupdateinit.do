<!DOCTYPE html>
<html>
<head>
	<title>设置新密码</title>
	<base href="http://www.xiaoniu88.com/">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/base.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/global.css" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/element.css" rel="stylesheet"/>
    <script type="text/javascript" src="/plugins/pwd/security.js?v=0.0.1"></script>
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
    	<legend>设置新密码</legend>
        <div class="group_title">设置新密码</div>
        <div class="input_box">
        	<div class="input_wap">
            	<input type="password" placeholder="新密码" id="onepassword" class="input_text" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/>
            </div>
             <div class="pwd ibg"></div>
        </div> 
        <div id="s_tip"></div>
        <div class="input_box">
        	<div class="input_wap">
            	<input type="password" placeholder="确认密码" id="twopassword" class="input_text" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/>
            </div>
             <div class="pwd ibg"></div>
        </div>
        <div id="sw_tip"></div>
        <div class="btn mgc-30 w60">
            <div class="btn_wap">
                <div class="btn_cc" id="btnsubmit">下一步</div>
            </div>
            <div class="btn_lc"></div>
            <div class="btn_rc"></div>
        </div>
      </fieldset>
</body>
<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/jquery-1.8.0.min.js"></script>
<script type=text/javascript src="http://www.xiaoniu88.com/js/lhgdialog/lhgdialog.js"></script>
<script type="text/javascript" src="http://www.xiaoniu88.com/js/front/retrieveUpdate.js"></script>
<script type="text/javascript">
$(function(){
		$('.top_btn').hide();
		$('.top_title').html('找回密码').show();
	});
var arictype = "password";
function succupdatefun(data){
	if(data.key == 1){
		window.location.href = "http://www.xiaoniu88.com/weChat/wx_retrievefinal.do?arictype="+arictype;
	}else{
		$.dialog.commonTips(data.value);
	}
}
</script>
</html>
