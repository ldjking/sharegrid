/*
 *name:dtt
 *time:2014.9.30
 *content:右则客服js
*/
define(function(require, exports, module) {
	$("div.service").bind("mouseover",function(){
		$(this).stop().animate({right:'0px'},100);
	}).bind("mouseleave",function(){
		$(this).stop().animate({right:'-127px'},100);
	});
});
