$(function(){
	//check username
	var nextStep = $("#nextStep"),inputError = $("#error-box");
	nextStep.click(function(){
		// 检测用户名是否存在
		var username = $("#usrnm").val();
		$.ajax({
			type:"post",
			url:"../retrieve.do",
			data:"username="+username,
			success:function(data){
				var data = eval("("+data+")");
				if(data.key == 1){
					window.location.href = "wx_retrievesend.do";
				}else{
					inputError.html(data.value).show();
				}
			}
		 });
		return false;
	});
	//input focus
	var inputs = $(".input-text");
	inputs.on("focus",function(){
		$(this).parents(".input-box").addClass("input-box-focus");
		inputError.hide();
	}).on("blur",function(){
		$(this).parents(".input-box").removeClass("input-box-focus");
	});
});