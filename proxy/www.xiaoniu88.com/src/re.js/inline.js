/*<script text="text/javascript">*/
			var real_account_total = "229,300,300";
			var repay_will_interest = "229,300,300";
			var repay_yes_interest = "229,300,300";
			
			function isMobile() {
				if(window.sessionStorage){
					var platformType=window.sessionStorage.getItem("platformType");
					if(!!platformType)
						return false;
				}
				var mobileAgent = [ "iphone", "ipod", "android", "mobile",
						"blackberry", "webos", "incognito", "webmate", "bada",
						"nokia", "lg", "ucweb", "skyfire" ];
				var ipad="ipad";
				var browser = navigator.userAgent.toLowerCase();

				for ( var i = 0; i < mobileAgent.length; i++) {
					if (browser.indexOf(mobileAgent[i]) != -1 && browser.indexOf(ipad) < 0) {
						return true;
					}
				}
				return false;
			}
			if (isMobile()) {
				window.location.href = "weChat/index.do";
			}
/*		</script>*/



//<script type="text/javascript">
var basePath = 'http://www.xiaoniu88.com/';
function dropMenu(obj) {
	$(obj).each(function() {
		var theSpan = $(this);
		var theMenu = theSpan.find(".submenu");
		var tarHeight = theMenu.height();
		theMenu.css({height: 0});
		theSpan.hover(function() {
			$(this).addClass("selected");
			theMenu.stop().show().animate({height: tarHeight}, 400);
		}, function() {
			$(this).removeClass("selected");
			theMenu.stop().animate({height: 0}, 400, function() {
				$(this).css({display: "none"});
			});
		});
	});
}
/*
url:跳转地址
target:跳转方式 0当前窗口  1新窗口
afterLoginUrl:登陆后转向地址
*/
function gotoLogin(url,target,afterLoginUrl){
	var href=afterLoginUrl||window.location.href;
	if(href.indexOf("url=")>0)
		href=href.substring(0,href.indexOf("url=")-1);
	if(!target)
		if(url.indexOf("?")>0)
			window.location.href=url+"&url="+escape(href);
		else
			window.location.href=url+"?url="+escape(href);
	else
		if(url.indexOf("?")>0)
			window.open(url+"&url="+escape(href));
		else
			window.open(url+"?url="+escape(href));
}

/*添加客服QQ*/
var qqwpa=setInterval(function(){
		if(window.BizQQWPA){
			//清除Interval
			window.clearInterval(qqwpa);
			//生成界面
			var kfqq_thml = "<div class='kf_container kf_hide' id='qqkf'>"+
								"<div class='kf_content'>"+
									"<span id='ke_icon'></span>"+
									"<span class='size13'>周一到周五</span>"+
									"<span class='size15'>8:30-20:30</span>"+
									"<span class='size13'>周六到周日</span>"+
									"<span class='size15'>9:00-17:00</span>"+
								"</div>"+
							"</div>";
			jQuery("body").append(kfqq_thml);
			//绑定事件
			jQuery("#qqkf").bind("mouseover",function(){
				jQuery(this).removeClass("kf_hide").addClass("kf_show");
				jQuery(this).stop().animate({"right":"0px"},100);
			}).bind("mouseleave",function(){
				jQuery(this).removeClass("kf_show").addClass("kf_hide");
				jQuery(this).stop().animate({"right":"-127px"},100);
			});
			//添加QQ图标
			BizQQWPA.add({
				aty: '0', //接入到指定工号
				a:'0',//指定工号接入
				type: '1', //使用按钮类型 WPA
				nameAccount: '938045033', //营销 QQ 号码
				parent: 'ke_icon' //将 WPA 放置在 ID 为 testAdd 的元素里
			});
		}
	},1000);

	jQuery("#productSelect").bind("mouseover",function(){
		if(window._productSelect)
			window.clearTimeout(_productSelect);
		jQuery(".productSelect").show();
		$('.nav_narrow').css("transform","rotateZ(180deg)");
		$('.nav_narrow').css("-webkit-transform","rotateZ(180deg)");
		$('.nav_narrow').css("-moz-transform","rotateZ(180deg)");
		//jQuery("#productSelect").css("background-position-y","-14px");
	}).bind("mouseleave",function(){
		_productSelect=setTimeout(function(){
			jQuery(".productSelect").hide();
			$('.nav_narrow').css("transform","rotateZ(0deg)");
			$('.nav_narrow').css("-webkit-transform","rotateZ(0deg)");
			$('.nav_narrow').css("-moz-transform","rotateZ(0deg)");
		},100);
	});
	
	jQuery(".productSelect").bind("mouseover",function(){
		if(window._productSelect)
			window.clearTimeout(_productSelect);
		jQuery(".productSelect").show();
		$('.nav_narrow').css("transform","rotateZ(180deg)");
		$('.nav_narrow').css("-webkit-transform","rotateZ(180deg)");
		$('.nav_narrow').css("-moz-transform","rotateZ(180deg)");
		//jQuery("#productSelect").css("background-position-y","-14px");
	}).bind("mouseleave",function(){
		_productSelect=setTimeout(function(){
			jQuery(".productSelect").hide();
			$('.nav_narrow').css("transform","rotateZ(0deg)");
			$('.nav_narrow').css("-webkit-transform","rotateZ(0deg)");
			$('.nav_narrow').css("-moz-transform","rotateZ(0deg)");
		},100);
	});
	
function openUrl(url){
	jQuery(".productSelect").hide();
	window.location.href=url;
}

jQuery(".login_name *").bind('mouseover',function(){
	if(window.user_timeout)
		window.clearTimeout(user_timeout);
	jQuery(".logged_bar_list").show();
}).bind("mouseleave",function(){
	if(window.user_timeout)
		window.clearTimeout(user_timeout);
	user_timeout=setTimeout(function(){jQuery(".logged_bar_list").hide();},300);
});

/*</script>
*/

//<script type="text/javascript">
var currIndex = 0;
function setCurrNavBg(){
	currIndex = $('#menu_xl li.curr').index();
	currIndex = currIndex>=3?currIndex-1:currIndex;
	var wid = currIndex==-1?0:currIndex==0?56:currIndex==1?92:78;
	var x=currIndex==0?-6:currIndex==1?57:currIndex==2?160:currIndex==3?249:currIndex==4?339:-145;
	//$("#menu_xl").animate({"background-position-x":x+"px"},90);
	$(".nav_line").stop(true,true).css({"width":wid+"px"}).animate({"left":x+"px"},90);
}
function loadUInfo(){
	$.shovePost("upUserInfo.do", param, null);
};
$(document).ready(function(){
	setTimeout("setCurrNavBg()",50);
	//loadUInfo();
		$("#menu_xl>li").mouseenter(function(){
		var index = $(this).index();
		if(index==6) return;
		index = index>=3?index-1:index;//去掉导航活期牛所占索引值
		var wid = index==0?56:index==1?92:78;
		var x=index==0?-6:index==1?57:index==2?160:index==3?249:index==4?339:-145;
		//$("#menu_xl").animate({"background-position-x":x+"px"},90);
		//$(".nav_line").stop(true,true).animate({"left":x+"px","width":wid+"px"},90);
		$(".nav_line").stop(true,true).css({"width":wid+"px"}).animate({"left":x+"px"},90);
	}).mouseleave(function(){});
	$("#menu_xl").mouseleave(function(){
		var index=$("#menu_xl li.curr").index();
		index = index>=3?index-1:index;//去掉导航活期牛所占索引值
		var wid = index==-1?0:index==0?56:index==1?92:78;
		var x=index==0?-6:index==1?57:index==2?160:index==3?249:index==4?339:-145;
		//$("#menu_xl").animate({"background-position-x":x+"px"},90);
		$(".nav_line").stop(true,true).css({"width":wid+"px"}).animate({"left":x+"px"},90);
	});
	dropMenu(".drop-menu-effect");
	//获取我的消息数量
	var now=new Date();
	var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	$.get("queryMyMsg.do?random="+number,function(data){
		$(".nav_menus").html(data.result);
		if(data.result>0){
			$(".top_msg").addClass("top_msg_red");
			$(".nav_menus").css("color","#ef6612");
		}
	});
	//获取我的红包数量
	var now=new Date();
	var number = now.getYear().toString()+now.getMonth().toString()+now.getDate().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString();
	//要替换成查询红包数量
	$.get("findBonusUnusedNumber.do?random="+number,function(data){
		$(".nav_menus_bonus").html(data.total);
		if(data.total>0){
			$(".top_bouns").show();
		}
	});
	$(".top_weixin").mouseover(function(){
		if(window.user_timeout)
			window.clearTimeout(user_timeout);
		$(".top_weixin_pic").show();
		$(".top_weixin").addClass("top_weixin_lighten");
	}).mouseleave(function(){
		if(window.user_timeout)
			window.clearTimeout(user_timeout);
		user_timeout=setTimeout(function(){$(".top_weixin_pic").hide();$(".top_weixin").removeClass("top_weixin_lighten");},300);

	});
	 
	$(".sinaWeibo").mouseover(function(){
		$(".sinaWeibo").addClass("sinaWeibo_lighten");
	}).mouseleave(function(){
		$(".sinaWeibo").removeClass("sinaWeibo_lighten");
	});
	$(".login_bar_login").mouseover(function(){
		$(".login_bar_login").removeClass("login_grey");
		$(".login_bar_login").addClass("login_lighten");
		// $(".login_bar_login").css("background","url(../images/indexNew/top_btn2.png) no-repeat 2px 9px");
	}).mouseleave(function(){
		$(".login_bar_login").removeClass("login_lighten");
		$(".login_bar_login").addClass("login_grey");
	});
	$(".login_bar_reg").mouseover(function(){
		$(".login_bar_reg").removeClass("reg_grey");
		$(".login_bar_reg").addClass("reg_lighten");
		//$(".login_bar_reg").css("background","url(../images/indexNew/top_btn2.png) no-repeat -57px 9px");
	}).mouseleave(function(){
		$(".login_bar_reg").removeClass("reg_lighten");
		$(".login_bar_reg").addClass("reg_grey");
	});
});
/*//</script>
*/

/*<script type="text/javascript">
*/	var b=true;
	$(function(){
		
		/* var href=window.location.href;
		if(href.indexOf('af88')==-1){
			$(".attest05").hide();
		}  */
		if ($(window).width() < 1105) {
			$(".rightTips").addClass("rightTipAuto")
		} else {
			$(".rightTips").removeClass("rightTipAuto")
		}
		$(window).scroll(function(){
			if($(window).scrollTop()>50){
				$(".go_top").css("visibility", "visible");
			}else{
				$(".go_top").css("visibility", "hidden");
			}
		});
		$(".go_top").click(function(){
			$('body,html').animate({scrollTop:0},800);
			return false;
		});
		$(window).resize(function(){
			if ($(window).width() < 1105) {
				$(".rightTips").addClass("rightTipAuto");
			} else {
				$(".rightTips").removeClass("rightTipAuto");
			}
		});
	});
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
/*</script>
*//*	<script type="text/javascript">
*/		var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fbfadffd6cb8f795e488eccaeb28cab61' type='text/javascript'%3E%3C/script%3E"));
	</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40603427-1', 'xiaoniu88.com');
  ga('send', 'pageview');
/*</script>*/


/*<script type="text/javascript">
*/			$(function(){
				loadUInfo();
				LoadAxnList();
				$(".login_form").animate({top:"100px"},800);
				/* $(".indexNewsTitle li:not(.newsMore)").toggle(function(){
					$(this).parent().parent().next().show();			 
					$(".newsIcon").css("background-image","url('images/indexNew/newsUp.jpg')");
					//$(this).parent().parent().parent().css({"border-top":"#d0a149 1px solid","border-bottom":"#d0a149 1px solid"});
				},function(){
					$(this).parent().parent().next().hide(); 
					$(".newsIcon").css("background-image","url('images/indexNew/newsDown.jpg')");
					$(".indexNews").css("margin-bottom","10px");					
				}); */
				$(".icon1").mouseover(function(){
					$(".p_msg1").slideUp();
					$(".p_msg12").slideDown(); 
				}).mouseleave(function(){				 
					$(".p_msg12").stop(true,true).slideUp();
					$(".p_msg1").stop(true,true).slideDown(); 
				});
				$(".icon2").mouseover(function(){
					$(".p_msg2").slideUp();
					$(".p_msg22").slideDown();
				}).mouseleave(function(){
					$(".p_msg22").stop(true,true).slideUp();
					$(".p_msg2").stop(true,true).slideDown();
				}); 
				$(".icon3").mouseover(function(){
					$(".p_msg3").slideUp();
					$(".p_msg32").slideDown();
				}).mouseleave(function(){
					$(".p_msg32").stop(true,true).slideUp();
					$(".p_msg3").stop(true,true).slideDown();
				});  
				$(".icon4").mouseover(function(){
					$(".p_msg4").slideUp();
					$(".p_msg42").slideDown();
				}).mouseleave(function(){
					$(".p_msg42").stop(true,true).slideUp();
					$(".p_msg4").stop(true,true).slideDown();
				});  
				var rate= $(".progress_rate").html();
				if(rate != null && rate.indexOf("%") > -1){
					rate=rate.substring(0,rate.indexOf("%"));
				}else{
					rate = 0;
				}
				var height=154*(100-rate)/100;
				$(".progress_full").attr("style","height:"+height+"px;");
				/* $(".new_product").click(function(e){
					window.location.href="activity/5/huoqibao.jsp";          
				}); */
				
			});
			function loadUInfo(){
				$.shovePost("upUserInfo.do", param,function (data) {
					var str=data.kyye;
					var xsw=str.split(".");
					if(xsw&&xsw.length>1)
						$("#kyye").text(strHtml_(xsw[0])+"."+xsw[1]);
				});
			};
		 	function LoadAxnList(){
				var param={};
				$.shovePost("relievedProductIndex.do", param, function (data) {
					if(!!data){
						$("#anxinniuListContent").html(data);
						
						checkForAnxinniu();
						$("#anxinniu").show();
						setInterval(function() { checkForAnxinniu(); },1000);
					}
				});
			}
			function checkForAnxinniu() {
				$(".checkForAnxinniu").each(function() {
					var left_time_int = $(this).attr("left_time_int");
					var bid = $(this).attr("bid");
					if (left_time_int >= 0) {
						var time_string = counterClock(left_time_int)+"后<br/>开始加入";
						if (left_time_int == 0) {
							var target=jQuery(this);
							var bid=target.attr("bid");
							var url=target.attr("url");
							target.attr("href",url).attr("class","fllbtn fllbtn2").text("加入").after("<p>已有<font>0</font>人加入</p>");
						} else {
							$(this).html(time_string);
							$(this).attr("left_time_int", left_time_int - 1);
						}
					}
				});
			}
			
/*		</script>
*/
		<!-- 回头客 -->
/*		<script type="text/javascript">
*/		<!-- 
		(function (d) {
		window.bd_cpro_rtid="P1b1rHn";
		var s = d.createElement("script");s.type = "text/javascript";s.async = true;s.src = location.protocol + "//cpro.baidu.com/cpro/ui/rt.js";
		var s0 = d.getElementsByTagName("script")[0];s0.parentNode.insertBefore(s, s0);
		})(document);
		//-->
/*		</script>*/