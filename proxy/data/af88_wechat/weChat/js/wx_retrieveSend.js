var arictype = "password";

/*定时器*/
var tipId;
var timeRecover = 299;
var time = timeRecover;
var timerId = "phonesecond";
$(function () {
	$("#phonecodesend").click(function(){
		//灰色时，获取验证码不可点
		if($(this).hasClass("wx_row_c3_disabled")){
			return;
		}
		sendvalicode("phone");
	});
	$("#btnsubmit").click(function(){
		var $phonecode = $("#phonecode"),$s_usrnm = $("#s_usrnm");
		if($phonecode.val()==""){
			$s_usrnm.html("请输入验证码！").addClass("show");
			$phonecode.focus();
			return false;
		}
	 	valiupdatecode("phone",$phonecode.val());
	});
	$("#phonecode").on("keyup",function(){
		$("#s_usrnm").html("").removeClass("show");
	});
});
function sendvalicode(type){
	$.ajax({
			 	type:"post",
			 	url:"../retrieveverifycode.do",
			 	data:"type="+type+"&arictype="+arictype,
			 	success:function(data){
			 		succsearchuser(data,type);
			 	}
			 });
}
function succsearchuser(data,type){
	if(typeof(data)=="string"){
		data=JSON.parse(data);
	}
	if(data.key==1){
		$("#phonesecond").show();
		$("#phonecodesend").addClass("wx_row_c3_disabled");
		$("#phoneseconderr").html("验证码已发送，请查收手机短信!");
	 	$("#dlphoneseconderr").show();
	    tipId = window.setInterval(timer, 1050);
	}else{
		$("#s_usrnm").html(data.value).addClass("show");
	 	$("#dlphoneseconderr").hide();
	 	$("#phoneseconderr").html("");
	}
}
function valiupdatecode(type,code){
	$.ajax({
			 	type:"post",
			 	url:"../retrieveverifycompare.do",
			 	data:"type="+type+"&code="+code+"&arictype="+arictype,
			 	success:succscodevali
			 });
}
function succscodevali(data){
	if(typeof(data)=="string"){
		data=JSON.parse(data);
	}
	if(data.key == 1){
		window.location.href = "wx_retrieveupdateinit.do?arictype="+arictype;	
	}else{
		$("#s_usrnm").html(data.value).addClass("show");
	}
}
function timer() {
	if (time >= 0) {
		$("#"+timerId).html("("+time + ")");
		time--;
	} else {
		window.clearInterval(tipId);
		//300秒倒计时完成，恢复300秒
		$("#phonesecond").html("(300)");
		time = timeRecover;
		$("#phonecodesend").removeClass("wx_row_c3_disabled");
		$("#phoneseconderr").html("超时，请重新获取验证码，并查看手机短信!");
	}
}
