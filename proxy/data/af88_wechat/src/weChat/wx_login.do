<!DOCTYPE html>
<html>
<head>
<title>小牛在线</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta content="yes" name="apple-mobile-web-app-capable" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<meta content="telephone=no" name="format-detection" />
<link rel="stylesheet" type="text/css" href="css/wx_login_my.css">
</head>
<body>
<div class='wx_top'>
  <a class="wx_top_logo" href="index.do">
  </a>
  <span class="wx_top_gap"></span>
  <span class='wx_top_title'>登录</span>
</div>
<form class="wx_login_box"  autocomplete="off">
  <div class="input_box">
    <input type="text" class="wx_icon_user" style="line-height:normal;"  placeholder="手机号码/用户名/邮箱" id="email" name="paramMap.email" class="input_text" tabindex="1"/>
  </div>
  <div class="input_box">
    <input type="password" class="wx_icon_pw"  style="line-height:normal;" placeholder="输入登录密码" id="password" name="paramMap.password" class="input_text" tabindex="2"/>
  </div>
  <div  class="wx_login_check_code">
    <input type="text" style="line-height:normal;" placeholder="请输入验证码" id="code" name="paramMap.code" class="input_text" value=""  tabindex="3"/>
    <span class="vcode">
    <img id="codeNum" class="verifyImg" style="width:109px;height:45px;"
					title="换一张" alt="验证码" onclick="javascript:switchCode()" />
    </span>
  </div>
  <input type="hidden" id="afterLoginUrl"  value="" />
  <div id="error-box" class="err wx_tips2"></div>
  <a href="javascript:login();" tabindex="4" class="btn_wap wx_btn_orange">
  立即登录
  </a>
  <div class="xn_login_blow">
    <a class="fpwd" href="wx_forgetpassword.do">
    忘记登录密码？
    </a>
    <span class="xn_noAccount">还没有账户？
    <a class="wx_reg_now" href="wx_reg.do">
    立即注册
    </a>
    </span>
  </div>
</form>
<script type="text/javascript" src="js/lib/zepto.min.js"></script>
<script type="text/javascript" src="/plugins/pwd/security.js?v=0.0.1"></script>
<script type="text/javascript" src="js/wx_login.js"></script>
</body>
</html>
