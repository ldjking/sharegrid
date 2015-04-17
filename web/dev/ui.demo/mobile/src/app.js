/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
	x.app={};
	var page=x.app;
	page.css=["rs/login"];
	page.domStr="<div class='panel active'><div class='app' id='app'><div class='top'><div class='title'>欢迎您，刘东杰</div></div><div class='down' id='app_down'><table cellpadding='0' cellspacing='0' class='app_content'><tr><td><div id='app_1'>待办事项</div></td><td><div id='app_2'>运行日志</div></td><td><div id='app_3'>经营统计</div></td></tr><tr><td><div id='app_4'>组织机构</div></td><td><div id='app_5'>人员管理</div></td><td><div id='app_6'>设备台账</div></td></tr><tr><td><div id='app_7'>方法管理</div></td><td><div id='app_8'>方法测试</div></td><td><div id='app_9'>页面开发</div></td></tr></table></div></div></div>";
	page.dom=null;

	var e_app_click=function(evt){
		var target=evt.target;
		if(target.id=="app_2"){
			/*加载另外一个页面 list.html*/
			require(["src/list.js"],loadListBack);
		}
		if(target.id=="app_3"){
			/*加载另外一个页面 list.html*/
			require(["src/chart1.js"],loadChartBack);
		}
	}
	var loadChartBack=function(){
		//require(["src/login.js"],loadPageBack);
		var chartApp=apps.chart;
		chartApp.init();
		fx3dRotate(page.dom,0,90,1,0.7,null,800,function(){
				fx3dRotate(chartApp.dom,-90,0,0.7,1,null,800);
			});
	}
	
	var loadListBack=function(){
		//require(["src/login.js"],loadPageBack);
		var listApp=apps.list;
		listApp.init();
		fx3dRotate(page.dom,0,90,1,0.7,null,800,function(){
				fx3dRotate(listApp.dom,-90,0,0.7,1,null,800);
			});
	}
	
	page.init=function(){
		var panel=document.createElement("div");
		panel.innerHTML=page.domStr;
		panel.className="panel";
		var container=$("container");
		container.appendChild(panel);
		page.dom=panel;
		$("app_down").onclick=e_app_click;
		panel.className="panel ready";
		
		//panel.className="panel active";
	}
	
	page.render=function(){
	}
	page.destroy=function(){
	}
}
)(apps);