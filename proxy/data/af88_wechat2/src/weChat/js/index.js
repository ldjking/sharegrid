// JavaScript Document
var bullets,bannerLength;
$(function(){
	bullets = document.getElementById('banner_btn').getElementsByTagName('li');
	bannerLength=bullets.length>2?true:false;
	window.mySwipe = new Swipe(document.getElementById("slide"),{
		auto:3000,
		continuous:true,
		stopPropagation:false,
		callback:function(pos){
			 var on=document.getElementsByClassName("on");
			 if(on.length)
				 on[0].className="";
			 pos=bannerLength?pos:pos%2;
			 bullets[pos].className = 'on';
		}
	});
});

