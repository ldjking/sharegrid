$(function () {
	var arictype = "password",
		$btnsubmit= $("#btnsubmit"),
		$onepassword = $("#onepassword"),
		$twopassword = $("#twopassword"),
		$s_tip = $("#s_tip"),
		$sw_tip = $("#sw_tip");
	$btnsubmit.on("click",function(){
		if(valicheck()){
			var param = getParams();
			valiupdatecode(param);
		}
	});
	
	
	$onepassword.on("blur",function() {
		var onepassword = $onepassword.val();
		if (onepassword == "") {
			$s_tip.html("新密码不能为空").addClass("show");
			return false;
		} else if (onepassword.length < 6 || onepassword.length > 20) {
			$s_tip.html("新密码长度必须为6-20个字符").addClass("show");
			return false;
		} else {
			$s_tip.html("").removeClass("show");;
		}
		//$s_tip.html("").removeClass("show");
	});
	
	$twopassword.on("blur",function() {
		var onepassword = $onepassword.val();
		var twopassword = $twopassword.val();
		if (twopassword == "") {
			$sw_tip.html("确认新密码不能为空").addClass("show");
			//$twopassword.focus();
			return false;
		} else if (twopassword.length < 6 || twopassword.length > 20) {
			$sw_tip.html("确认新密码长度必须为6-20个字符").addClass("show");
			//$twopassword.focus();
			return false;
		} else {
			$sw_tip.html("").removeClass("show");
		}
		//验证两个密码是否相等
		if(onepassword != twopassword){
			$sw_tip.html("两次输入的密码不一致").addClass("show");
			//$twopassword.focus();
			return false;
		}
		//$s_tip.html("").removeClass("show");
	});
	
	$onepassword.on("keyup",function() {
		//$s_tip.html("").removeClass("show");
	});
	
	$twopassword.on("keyup",function() {
		//$sw_tip.html("").removeClass("show");
	});
	
	function valicheck(){	
		//验证新密码
		var onepassword = $onepassword.val();
		if (onepassword == "") {
			$s_tip.html("新密码不能为空").addClass("show");
			$onepassword.focus();
			return false;
		} else if (onepassword.length < 6 || onepassword.length > 20) {
			$s_tip.html("新密码长度必须为6-20个字符").addClass("show");
			$onepassword.focus();
			return false;
		} else {
			$s_tip.html("").removeClass("show");
		}
		//验证确认密码
		var twopassword = $twopassword.val();
		if (twopassword == "") {
			$sw_tip.html("确认新密码不能为空").addClass("show");
			$twopassword.focus();
			return false;
		} else if (twopassword.length < 6 || twopassword.length > 20) {
			$sw_tip.html("确认新密码长度必须为6-20个字符").addClass("show");
			$twopassword.focus();
			return false;
		} else {
			$sw_tip.html("").removeClass("show");
		}
		//验证两个密码是否相等
		if(onepassword != twopassword){
			$sw_tip.html("两次输入的密码不一致").addClass("show");
			$twopassword.focus();
			return false;
		}
		return true;
	}
	function getParams(){
		var onepwd = RSAUtils.pwdEncode($onepassword.val());
		var twopwd = RSAUtils.pwdEncode($twopassword.val());   
		return "onepwd="+onepwd+"&twopwd="+twopwd;
	}
	function valiupdatecode(param){
		var urlstr = "../retrieveupdate.do";
		if(arictype != null && arictype == "paycode"){
			urlstr = "../forgetwidthdraw.do";
		}
		$.ajax({
			type:"post",
			url:urlstr,
			data:param,
			success:succupdatefun
		});
	}
	function succupdatefun(data){
		if(typeof(data)=="string"){
			data=JSON.parse(data);
		}
		if(data.key == 1){
			window.location.href = "wx_retrievefinal.do?arictype="+arictype;
		}else{
			$("#s_usrnm2").html(data.value).addClass("show");
		}
	}
});
