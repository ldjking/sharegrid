<!DOCTYPE html>
<html>
<head>
	<title>小牛在线</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/base.css?v=20141022" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/global.css?v=20141030a" rel="stylesheet"/>
    <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/element.css" rel="stylesheet"/>
     <link type="text/css" href="http://www.xiaoniu88.com/weChat/css/index.css?v=20141105" rel="stylesheet"/>
</head>
<body>
<!--网站的整体开始-->
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
</div><div class="banner_box" id="slide">
        <ul class="banner">
            <li>
				<img style="width:100%" src="http://www.xiaoniu88.com/weChat/images/banner/hongbao.jpg">
            </li>
            <li>
				<img style="width:100%" src="http://www.xiaoniu88.com/weChat/images/banner/huojiang.jpg">
            </li>
            <li>
				<img style="width:100%" src="http://www.xiaoniu88.com/weChat/images/banner/zhengming.jpg">
            </li>
            <li>
				<img style="width:100%" src="http://www.xiaoniu88.com/weChat/images/banner/mima.jpg">
            </li>
        </ul>
        <div class="banner_bottom">
        	<ul class="banner_btn" id="banner_btn">
	        	<li class='on'></li>
	        	<li></li>
	        	<li></li>
	        	<li></li>
        	</ul>
        </div>
  	</div>
  	<div class='index_box'>
  		<div class='index_con'>
  			<a href='http://www.xiaoniu88.com/weChat/financeTendering.do' class='more'></a>
  			<div class='index_container'>
  				<input type="hidden" id="borrowJd" value="100" />
  				<div class='anxinniu_title'>
  					<h2>安心牛D20141126-173</h2>
  					<div class='progress'>
  						<canvas id="canvas" width='90' height='90'></canvas>
  						<div class='progress_text'>100<span>%</span></div>
  					</div>
  				</div>
  				<div class='anxinniu_detail'>
  					<div class='anxinniu_rate'>
  						<span class='detail_title'>年化收益率</span>
  						<span class='rate_num'>12.50 - 13.10%</span>
  						<span class='amount'>计划金额：500,000 元 </span>
  					</div>
  					<div class='anxinniu_time'>
  						<span class='detail_title'>期限 </span>
  						<span class='detail_time'><span class='time_num' style='display:inline-block;'>3</span><span style='display:inline-block;vertical-align:bottom'>个月</span></span>
  						<span class='amount'>起投金额：1,000元</span>
  					</div>
  				</div>
  				<span class='join_end'>您来晚啦，已满额！</span>
  				<span class='join_num'>已有10人加入</span>
  			</div>
  		</div>
  	</div>
  	<div class="PCstyle"><a href="javascript:gotoPC()"><span>切换到电脑版</span></a></div>
  	<div class='foot_blank'></div>
  	<!--底部 -->
	<link type="text/css" href="http://www.xiaoniu88.com/weChat/css/include.css?2" rel="stylesheet"/>

<div class='foot'>
 		<div class='foot_nav_list'>
 			<span class='foot_nav'><a href='http://www.xiaoniu88.com/weChat/index.do' class='foot_nav nav_index'>首页</a></span>
 			<span class='foot_nav'><a href='http://www.xiaoniu88.com/weChat/financeTendering.do' class='foot_nav nav_invest'>我要投资</a></span>
 			<span class='foot_nav'><a href='http://www.xiaoniu88.com/weChat/wx_accountIndex.do' class='foot_nav nav_account'>我的账户</a></span>
 			<span class='foot_nav'><a href='http://www.xiaoniu88.com/weChat/company-profile.jsp' class='foot_nav nav_about'>关于小牛</a></span>
 		</div>
</div>
<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/swipe.js"></script>
    <script type="text/javascript" src="http://www.xiaoniu88.com/weChat/js/index.js"></script>
	<script>
	var borrowJd = $("#borrowJd").val();
	if(!!navigator.appVersion.match(/MicroMessenger/i)){
		$(".PCstyle").hide();
	}
	function gotoPC(){
		window.sessionStorage.setItem("platformType", "pc");
		window.location.href="http://www.xiaoniu88.com/index.do";
	}
	(function(){
		$('.top_btn').hide();
		$('.index_top_btn').show();
		$('.nav_index').addClass('nav_index_cur');
		var progress=function(opt){
			if(!opt||!opt.target){
				alert("缺少目标ID");
				return;
			}
			if(!opt.progress_val&&opt.progress_val!=0){
				alert("项目进度为0-100");
				return;
			}
			this.target=opt.target;
			this.radius=opt.radius||80;
			this.circle_x=opt.circle_x||150;
			this.circle_y=opt.circle_y||150;
			this.circle_inner_width=opt.circle_inner_width||20;
			this.circle_inner_color=opt.circle_inner_color||"#ccc";
			this.circle_center_width=opt.circle_center_width||20;
			this.circle_center_color=opt.circle_center_color||"#ccc";
			this.circle_outer_width=opt.circle_outer_width||20;
			this.circle_outer_color=opt.circle_outer_color||"red";
			this.progress_val=opt.progress_val;
			
			var canvas=document.getElementById(opt.target);
			this.can=canvas.getContext("2d");
			
			this.drawInnerCircle();
			this.drawCenterCircle();
			this.drawOuterCircle();
		}
		progress.prototype={
			drawInnerCircle:function(){
				var t=this;
				t.can.beginPath();
				t.can.lineWidth=t.circle_inner_width;
				t.can.strokeStyle=t.circle_inner_color;
				t.can.arc(t.circle_x,t.circle_y,t.radius+t.circle_inner_width/2,0,Math.PI*2,false);
				t.can.stroke();
				t.can.closePath();
			},
			drawCenterCircle:function(){
				var t=this;
				t.can.beginPath();
				t.can.lineWidth=t.circle_center_width;
				t.can.strokeStyle=t.circle_center_color;
				var r=t.radius+t.circle_inner_width+t.circle_center_width/2;
				t.can.arc(t.circle_x,t.circle_y,r,0,Math.PI*2,false);
				t.can.stroke();
				t.can.closePath();
			},
			drawOuterCircle:function(){
				var t=this;
				t.can.beginPath();
				t.can.strokeStyle=t.circle_outer_color;
				t.can.lineWidth=t.circle_outer_width;
				var r=t.radius+t.circle_inner_width+t.circle_outer_width/2;
				t.can.arc(t.circle_x,t.circle_y,r,-Math.PI/2,-Math.PI/2+Math.PI*2*t.progress_val/100,false);
				t.can.stroke();
				t.can.closePath();
			}
		}
		window.weChatProgressOfCircle=function(opt){
			return new progress(opt);
		}
	})();
	var opt={
		target:"canvas",			//目标id
		radius:25,					//半径
		circle_x:45,				//圆心X坐标
		circle_y:45,				//圆心Y坐标
		circle_inner_width:5,		//内圆弧宽
		circle_inner_color:"#dddddc",	//内圆弧色值
		circle_center_width:5,		//中间圆弧宽
		circle_center_color:"#dadad9",	//中间圆弧色值
		circle_outer_width:8,		//外圆弧宽
		circle_outer_color:"#cfa74a",	//外圆弧色值
		progress_val:borrowJd 			//进度值，必须为0-100
	}
	weChatProgressOfCircle(opt)
</script>
<!--网站页脚结束--> 
</body>

</html>