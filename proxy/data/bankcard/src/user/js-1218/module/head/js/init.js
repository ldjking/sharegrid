/*
 *name:dtt
 *time:2014.10.30
 *content:头部js
*/
define(function(require, exports, module) {

	$(".header .weixin").hover(function(){
		var $th=$(this);
		$th.addClass("cur");
		$th.find("i").css("display","block");
	},function(){
		var $th=$(this);
		$th.removeClass("cur");
		$th.find("i").removeAttr("style");
	});
	$("div.bor-n").hover(function(){
		$(this).find("span.bar").css("display","block");
	},function(){
		$(this).find("span.bar").removeAttr("style");
	});

	$(".set-list").hover(
		function (){
			$(this).addClass("my-set-hover");
			$(this).find("i").css("transform","rotateZ(180deg)");
		},
		function (){
			$(this).removeClass("my-set-hover");
			$(this).find("i").removeAttr("style");
		}
	);

	//当前选中菜单
	if($("#menuCur").length>0){
		var $th=$("#menuCur"),
		iptVal=$th.val();
		var idx=0;
		switch(iptVal){
		case "index"://首页
			idx=0;
			break;
		case "list"://列表页
			idx=1;
			break;
		case "myloan"://借贷咨询
			idx=2;
			break;
		case "about"://关于我们
			idx=3;
			break;
		case "account"://我的账户
			idx=4;
			break;
		case "finances"://理财百科
			idx=5;
			break;
		}
		$("div.nav .idx").eq(idx).addClass("cur");
	}
	var widthPx=function(idx){
		var leftPx=idx==0?"13":idx==1?idx*76:idx*90,
			wid="78px";
		if(idx==0){
			wid="56px";
		}else if(idx==1){
			wid="92px";
		}else if(idx==5){
			wid="92px";
			leftPx = leftPx-1;
		}else{
			wid="78px";
		};
		return [leftPx+"px",wid];
	}

	if($(".nav .cur").length>0){
		var idx=$(".nav .cur").index();
		var lwPX=widthPx(idx);
		$(".nav-bg-line").css({"left":lwPX[0],"width":lwPX[1]});
	}
	$(".nav").delegate(".idx","mouseover",function () {
		var idx=$(this).index();
		var lwPX=widthPx(idx);
		$(".nav-bg-line").stop(true,true).animate({"left":lwPX[0],"width":lwPX[1]},90);
	});
	$(".nav").hover(function(){},function(){
		var idx=$(".nav .cur").index();
		var lwPX=widthPx(idx);
		$(".nav-bg-line").stop(true,true).animate({"left":lwPX[0],"width":lwPX[1]},90);
	});



});

/*url:跳转地址
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
