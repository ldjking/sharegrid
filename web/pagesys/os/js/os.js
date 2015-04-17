var os={};
os.height=0;
os.width=0;
os.userName=null;

var infoGetBack=function(result){
	//out("info get result",result);
	if(result.flag==false){
		window.location="login.html"
	}
	else{
		$("#welcomInfo").innerHTML="欢迎您, "+result.data.c0_name+", &nbsp;	"+getTodayStr();
		$$("getOnLineUsers",null,false,function(result){
			if(result.flag&&result.data!=null){
				$("#users_online").innerHTML="当前在线"+result.data.users+"人";
			}
		});
	}
	uiLayout({dom:$("#desktop"),container:document.body,dy:20+34});
	bind($("#switch_user"),"click",function(){
		$$("logout");
		window.location="user.html"
		});
	bind($("#logout"),"click",function(){
		$$("logout");
		window.location="login.html"}
	);
	
	bind($("#osIndex"),"click",function(){
			taskbar.hideCurr();
			winManager.openWin("index1.html");
		});
	bind($("#osApps"),"click",function(){
			taskbar.hideCurr();
			winManager.openWin("apps.html");
		});
	os.height=document.body.clientHeight;
	os.width=document.body.clientWidth;
	winManager.openWin("apps.html");
}
os.init=function()
{
	$$("accountInfoGet",null,false,infoGetBack);
	
	//winManager.openWin("index1.html");

	//$("#app1").flyout(2000);
	//desktop.init();
}
os.destory=function(){
	out("destory!");
}
window.onload=os.init;
window.onunload=os.destroy;
