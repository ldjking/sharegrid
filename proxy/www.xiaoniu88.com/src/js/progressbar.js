function animate(){
	$(".charts").each(function(i,item){
		var a=$(item).attr("w");
		a=Math.floor(a*1);
		var offset=-a*54;
		$(item).css('background-position',offset+"px 0px").html(a+"<font style='font-size:8px'>%</font>");
	});
}
animate();