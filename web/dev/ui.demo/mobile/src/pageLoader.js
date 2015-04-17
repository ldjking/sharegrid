/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
x.apps={};
var rs=[];
var funs=[];
var rsLoadFlag=false;
function callFun(){
	rsLoadFlag=false;
	for(var i=0;i<funs.length;){
		var fun=funs[i];
		if(typeof(fun)=="function")	
		try{
			funs.shift();
			fun();
		}catch(e){
			//;////out("error des",e.description);
			throw e;
		}
	}
}
x.require=function(srcs,callBack,flag){/*按顺序加载资源  异步执行  执行完调用回调函数  flag是调试信息是否输出*/
	if(rsLoadFlag==true&&srcs!=null){/*表示正在加载  又有新的要求加载*/
		for(var i=0;i<srcs.length;i++){
			rs.push(srcs[i]);
		}
		if(callBack)	funs.push(callBack);
		return;/*只执行一个加载实例*/
	}
	else if(rsLoadFlag==false){/*表示第一次加载*/
		rsLoadFlag=true;
		for(var i=0;i<srcs.length;i++){
			rs.push(srcs[i]);
		}
		if(callBack)	funs.push(callBack);
	}
	var doc = document,head = doc.getElementsByTagName("head")[0];
	if(rs.length>=1){	
		var	src=rs[0];
		if(src.indexOf(".js")>0){
			var t = doc.createElement("script");
			t.setAttribute("type","text/javascript");
			t.async = true;
		}
		else{
			var t = doc.createElement("link");
			t.setAttribute("type","text/css");
			t.setAttribute("rel","stylesheet");
		}
		t.onreadystatechange = t.onload =  function(){
			if(!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete'){/*装载完成*/
				t.onreadystatechange = t.onload = t.onerror = null;
				t = null;
				if(rs.length>=0){
					rs.shift();/*从顶部删除  看来shift函数是都实现了*/
					x.require();
				}
			}
		};
		if(src.indexOf(".js")>0)	t.src = src;
		else						t.href=src;
		head.appendChild(t);
	}
	else	callFun();
}
var loadBack=function(obj){/*loadBack要能够得到一个对象*/
	obj.init();
}
x.loadPage=function(name){/*加载一个页面  按照设计规范 将要加载它的dom*/
	/*将某个页面加载进来  按照规范应该是这样的  加载一个个panel 将资源装载进来  执行该对象的init方法  装载完获得一个对象*/
	require(["src/"+name+".js"],loadBack);
}
x.actviePage=function(page,type){/*激活一个页面 将会把该页面置于最前  将当前页面隐藏   type指代方式  旋转rotate  向左滑动 slide left 
 向右滑动  slide right  缩放 sacle*/
}
})(window)