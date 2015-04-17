/*xlib.20require		资源加载函数*/
(function(x){
	x.define=function(id,deps,result){/*定义一个资源  id是可选项  rs可以是data也可以是函数   资源的加载*/
		for(var i=0;i<rsList.length;i++){
			var rs=rsList[i];
			if(rs.id==id){/*如果id一致,且对象处于load状态*/
				rs.state="complete";/*加载完毕*/
				rs.callBack(result);
				break;
			}
		}
	}
	/*每个rs拥有src属性，加载状态属性，加载结果*/
	var seed_id=1;
	x.require=function(id,src,callBack,flag){/*按顺序加载资源  异步执行  执行完调用回调函数  flag是调试信息是否输出*/
		/*每次require都会产生一条记录  相当于每次require只能执行一个加载请求*/
		var obj={};
		if(id==null)	id=seed_id++;
		obj.id=id;		/*关联id*/
		obj.src=src;
		obj.state="ready";/*3种状态 ready  load   complete*/
		obj.callBack=callBack;
		rsList.push(obj);

		var t = document.createElement("script");
		t.setAttribute("type","text/javascript");
		t.defer =t.async= true;/*非阻塞加载*/
		t.onreadystatechange = t.onload =  function(){
			if(!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete'){/*装载完成*/
				t.onreadystatechange = t.onload = t.onerror = null;
			}
		};
		t.src = src;
		document.body.appendChild(t);
	}
})(window);
