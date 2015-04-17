$(function(){
	var amount = $("#amount");
	var investBtn = $("#wx_BtnInvest");
	var tip = investBtn.closest("li").find(".wx_tip");
	investBtn.on("click",function(){
		//验证有效性
		var val = $.trim(amount.val());
		check(val);
		return false;
	});
	//keyup
	amount.on("keyup",function(){
		tip.html("").hide();
	});
	//blur
	amount.on("blur",function(){
		check($(this).val());
	});
	
	//check;
	function check(val){
		if(val==""){
			tip.html("购买金额需为1000元的整数倍！").show();	
		}
	}
});
