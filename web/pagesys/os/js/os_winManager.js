var winManager={};
winManager.urls=[];/*地址*/
winManager.frames=[];/*frame的dom对象*/
winManager.currFrame=null;
winManager.appNum=0;
winManager.activeWin=function(iframe){
	if(winManager.appNum==1){/*第一次打开应用程序*/
		iframe.style.display="block";
		iframe.className="active";
		winManager.currFrame=iframe;
		return;			
	}
	var width=getRect($("#desktop")).width;
	winManager.hideWin();
	iframe.style.display="block";
	iframe.style.left=width+"px";
	iframe.className="active";
	fxMove(iframe,null,0,0,null);
	//taskbar.showTask(iframe);
	winManager.currFrame=iframe;
}
winManager.hideWin=function(){/*隐藏应用程序*/
	var width=getRect($("#desktop")).width;
	if(winManager.currFrame!=null){/*做个动画把对象移动到相应位置*/
		var _temp=winManager.currFrame;
		var callback=function(){
			_temp.className="";
			_temp.style.display="none";
			_temp.style.left=width*2+"px";
		}
		//_temp.style.display="none";

		fxMove(_temp,null,-width,null,null,callback);
	}
}
winManager.openWin=function(src,obj){/*打开应用程序  应用程序首先要有一个分类的概念  这样能归类到不同的图标里  然后是*/
	////out("open",src);
	var iframe=null;
	if(indexOf(winManager.urls,src)>=0){
		////out("已存在");
		iframe=winManager.frames[indexOf(winManager.urls,src)];
		if(winManager.currFrame==iframe){
			winManager.activeWin(iframe);
			return	iframe;/*应用程序和自身相同 不需要做其他动画*/
		}
	}
	else{
		iframe=$e("iframe");
		iframe.setAttribute("frameBorder","0");
		if(obj!=null){//alert("set param!");
			iframe.appCfg=obj;
		}
		iframe.src=src;//alert(iframe.src);
		if($("#desktop").childNodes.length==0)	$("#desktop").appendChild(iframe);
		else	$("#desktop").insertBefore(iframe,$("#desktop").childNodes[0]);
		winManager.urls.push(src);
		winManager.frames.push(iframe);
		taskbar.add(iframe);
		
	}
	winManager.appNum++;
	winManager.activeWin(iframe);
	return iframe;
}

winManager.openLov=function(name,obj){/*打开一个值列表窗体  新型的值列表 支持用户查询*/
	/*参数里面应该包含  值列表打开的位置  参数  */
}

