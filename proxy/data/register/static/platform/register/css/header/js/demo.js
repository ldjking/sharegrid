$(function(){
	$(".xn_top_weixin").mouseover(function(){
		if(window.user_timeout)
			window.clearTimeout(user_timeout);
		$(".xn_top_weixin_pic").show();
		$(".xn_top_weixin").addClass("xn_top_weixin_lighten");
	}).mouseleave(function(){
		if(window.user_timeout)
			window.clearTimeout(user_timeout);
		user_timeout=setTimeout(function(){$(".xn_top_weixin_pic").hide();$(".xn_top_weixin").removeClass("xn_top_weixin_lighten");},300);

	});
	 
	$(".xn_sinaWeibo").mouseover(function(){
		$(".xn_sinaWeibo").addClass("xn_sinaWeibo_lighten");
	}).mouseleave(function(){
		$(".xn_sinaWeibo").removeClass("xn_sinaWeibo_lighten");
	});
	$(".xn_login_bar_login").mouseover(function(){
		$(".xn_login_bar_login").removeClass("xn_login_grey");
		$(".xn_login_bar_login").addClass("xn_login_lighten");
	}).mouseleave(function(){
		$(".xn_login_bar_login").removeClass("xn_login_lighten");
		$(".xn_login_bar_login").addClass("xn_login_grey");
	});
	$(".xn_login_bar_reg").mouseover(function(){
		$(".xn_login_bar_reg").removeClass("xn_reg_grey");
		$(".xn_login_bar_reg").addClass("xn_reg_lighten");
	}).mouseleave(function(){
		$(".xn_login_bar_reg").removeClass("xn_reg_lighten");
		$(".xn_login_bar_reg").addClass("xn_reg_grey");
	});
});

