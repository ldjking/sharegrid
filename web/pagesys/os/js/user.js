(function(){
	function back_person(result){
		//out("result",result);
		if(result.flag){
			var data=result.data;
			for(var i=0;i<data.length;i++){
				var div=$span();
				div.innerHTML=data[i].c0_name;
				div.obj=data[i];
				div.className="user";
				$("#userList").appendChild(div);
			}
		}
	}
	function loginUser(evt){
		var target=getTarget(evt);
		if(target.obj!=null){
			var obj=target.obj;
			$$("login",{account:obj.c0_account,pw:obj.c0_pw},false,function(result){
					//out("login result",result);
					if(result.flag)	window.location="os.html";
					else			;//out("login error",result);

				});
			
		}
	}
	function init(){
		////out("init");
		bind($("#userList"),"click",loginUser);

		$$("personGets","",false,back_person);
	}
	window.onload=init;
})();
