
var loginBack=function(result){
	out("result",result);
	if(result.flag&&result.data!=null){
		window.location="os.html";
	}
	else	;//out("登录失败!",result.errortext);
}
var e_login_click=function(evt){
	var param={};
	param.account=$("#user").value;
	param.pw=$("#pw").value;
	$$("login",param,false,loginBack);	
}
function init(){
	bind($("#login"),"click",e_login_click);
}

window.onload=init;