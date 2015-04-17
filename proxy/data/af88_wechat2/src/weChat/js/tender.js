// JavaScript Document
$(function(){
	animate();
})
function animate(){
	$(".charts").each(function(i,item){
		$(item).addClass("barred");
		var a=$(item).attr("w");
		$(item).animate({
			width: a+"%"
		},600);
	});
}
