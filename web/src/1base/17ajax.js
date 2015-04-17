/*xlib.19ajax	服务器交互函数*/
(function(x){
	var sid=1;
	var funs=[];
	
	x.$excute=function(fnNum,result){/*fn实际上是个代码，不是具体的function*/
		var fn=funs[fnNum];
		if(isFun(fn))	fn(result);
		else			;////out("fn is not fun!");
	}
	x.$jsonp=function(method,param,fn,base_url){
		var fnNum=sid++;
		funs[fnNum]=fn;
		if(base_url==null){ 
			var url=document.URL;
			if(url.indexOf("http")==0)	base_url="../../../handler/";
			else	base_url="http://localhost/eam/handler/";
			
		}
		base_url+=method;
		base_url+="?p="+jsonStr(param,false);
		base_url+="&t=3";
		base_url+="&c="+fnNum;
		var now=new Date();
		var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
		base_url+="&r="+nowStr;
		var doc = document,head = doc.getElementsByTagName("head")[0];
		var t = doc.createElement("script");
		t.setAttribute("type","text/javascript");
		t.async = true;
		t.onreadystatechange = t.onload =  function(evt){
			if(!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete'){/*装载完成*/
				t.onreadystatechange = t.onload = t.onerror = null;
			}
		};
		t.src = base_url;
		head.appendChild(t);
	}
	
	var $callBack=function(xh,callBack){
		if(xh.readyState==4&&xh.status==200){
			var resultStr=xh.responseText;
			var resultObj=$myEval(resultStr);
			callBack(resultObj);
		}
	}
	var $myEval=function(str){
		if(str==null)	return null;
		if(str=="{}")	return {};
		if(!isStr(str))	return;
		var obj=null;
		try{
			obj=eval("("+str+")");
		}
		catch(e){/*eval发生异常*/
			alert("eval发生异常"+str);
		}
		return obj;
	}
	
	
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
	var rsList=[];
	x.require=function(id,src,callBack){/*按顺序加载资源  异步执行  执行完调用回调函数  flag是调试信息是否输出*/
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
	
	x.$$=function(method,param,post,callback,base_url){
		post=true;
		if(base_url==null){ 
			var url=document.URL;
			if(url.indexOf("http")==0)	base_url="http://localhost/eam/handler/";
			else if(!x.isIE){/*使用amd加载模式加载*/
				base_url="http://localhost/eam/handler/";
				var url=base_url+method;
				var paramStr=x.jsonStr(param,false);//参数转换
				var id=seed_id++;
				var now=new Date();
				var url2=url+"?p="+paramStr+"&t=5&c="+id+"&r="+now.getTime();
				//out("require url",url2);
				x.require(id,url2,callback);
				return;
			}
			else	base_url="http://localhost/eam/handler/";
		}
		var resultStr;
		var resultObj={};
		var url=base_url+method;
		var paramStr=x.jsonStr(param,false);//参数转换
		var now=new Date();
		var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
		
		var xh=window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if(callback!=null){
			if(post){//如果是post请求
				content = "p="+paramStr+"&now="+nowStr+"&t=2";
				
				xh.open("POST", url, true);
				xh.setRequestHeader("Content-Length",content.length);
				xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
				//xh.open("post",url,true);
				xh.send(content);
				xh.onreadystatechange=function(){$callBack(xh,callback);};
				
			}
			else{
				var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
				xh.open("get",url2,true);
				xh.send(null);
				xh.onreadystatechange=function(){$callBack(xh,callback)};
			}
		}
		else{
			try{
				if(post){//如果是post请求
					content = "p="+paramStr+"&now="+nowStr+"&t=2";
					
					xh.open("POST", url, false);
					xh.setRequestHeader("Content-Length",content.length);
					xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
					//xh.open("post",url,true);
					xh.send(content);
					resultStr=xh.responseText;
				}
				else{
					var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
					xh.open("get",url2,false);
					xh.send(null);
					resultStr=xh.responseText;
				}
			
				resultObj=$myEval(resultStr);
			}catch(e){
				//alert("json解析失败！");
				resultObj.flag=false;
				resultObj.msg="请检查数据内容！"+resultStr;
			}
			return resultObj;
		}
	}
	
		x.loadXML = function(xmlFile){	
		var xmlDoc;
		if(window.ActiveXObject)
		{
			xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = false;
			xmlDoc.load(xmlFile);
		}
		else if (document.implementation&&document.implementation.createDocument)
		{
			xmlDoc = document.implementation.createDocument('', '', null);
			xmlDoc.load(xmlFile);
		}
		else
		{
			return null;
		}
		return xmlDoc;
	}
	
	x.xml2Json=function(src){
		var doc=x.loadXML(src);
		var childs = doc.documentElement.childNodes;
		var data=[];
		for(var i=0;i<childs.length;i++){
			data[i]={};
			transNode(data[i],childs[i],null);
		}
		return data;
	}
	
	var transNode=function(obj,node,pobj){
		obj.type=node.nodeName;
		for(var i=0;i<node.attributes.length;i++){
			var attr=node.attributes[i].name;
			obj[attr]=node.getAttribute(attr);
		}
		if(pobj==null)	obj.path=obj.name;
		else			obj.path=pobj.path+"/"+obj.name;
		if(obj.type=="file")	obj.path=obj.path+".html";
		
		var childs=node.childNodes;
		if(childs!=null&&childs.length>0){
			var data=[];
			obj.child=data;
			for(var i=0;i<childs.length;i++){
				data[i]={};
				transNode(data[i],childs[i],obj);
			}
		}
	}
})(window);
