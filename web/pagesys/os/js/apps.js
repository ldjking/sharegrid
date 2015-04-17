
var apps={};
apps.lastClickTime;
apps.init=function(){/*根据当前账户权限获取桌面配置数据 并呈现出来*/
	//out("apps init!");
	apps.container=$("apps");
	////out("apps init!");
	apps.initApps();
	var d=$("#appModule");
	var c=$("#appContainer");
	uiTab({dom:d,dom2:c,mode:"slide",vmode:false,pageSize:"1003",evt:"mouseover",duration:30});
	//ui_slide({dom_control:$("#module_table"),dom_content:$("#appContainer"),pageWidth:1003});
	/*注册动画事件*/
	/*注册桌面应用程序双击事件  双击则打开对应应用程序*/
	//$("#apps").bind("dblclick",apps.e_app_click);
}
apps.initApps=function(){/*初始化应用程序*/
	////out("apps init apps!");
	var table=$table(1,os_apps_modules.length);
	table.className="module_table";
	var tr=table.rows[0];
	tr.id="module_table";
	tr.childNodes[0].className="active"
	for(var i=0;i<tr.childNodes.length;i++){
		tr.childNodes[i].innerHTML=os_apps_modules[i].cname;
		tr.childNodes[i].className="tab";
	}
	$("#appModule").appendChild(table);
	var pages=$e("div",os_apps_modules.length);
	for(var i=0;i<os_apps.length;i++){
		var app=$e("div");
		app.obj=os_apps[i];
		app.innerHTML=os_apps[i].name;
		//if(os_apps[i].type==4)	app.className="workflow";
		//else	
		app.style.backgroundImage="url(../../images/"+os_apps[i].img+")";
		pages[os_apps[i].type-1].appendChild(app);
		bind(app,"click",apps.e_app_click);
	}
	for(var i=0;i<pages.length;i++){
		pages[i].className="page";
		$("#appContainer").appendChild(pages[i]);
	}
	//out(table);
}
apps.e_app_click=function(evt){
	var target=getTarget(evt);
	if(apps.lastClickTime!=null){
		var now=new Date();
		if((now.getTime()-apps.lastClickTime)<1800){
			return;/*1秒内不再响应别的单击请求*/
		}
	}
	apps.lastClickTime=new Date();
	/*最后单击事件*/
	if(target!=null&&target.obj!=null&&target.obj.url!=null){
		////out("打开应用程序"+target.obj.url);
		if(target.win==null)	target.win=parent.winManager.openWin(target.obj.url,target.obj);
		else{
			parent.winManager.activeWin(target.win);
			parent.taskbar.showTask(target.win);
		}
	}
	//alert("打开应用程序");
}

window.onload=apps.init;
