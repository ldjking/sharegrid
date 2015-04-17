/*xlib.31core	用户交互全局事件代码*/
(function(x){
var getSameColumnCell=function(dom){
	var p=x.getDomIndex(dom);
	/*这里有一个需要注意的地方 最后一列是找不到的*/
	var trs=$("tr",dom.parentNode,6);/*兄弟节点中查找所有tr元素*/
	trs.pop();
	var cells=[];
	var divs=[];
	for(var i=0;i<trs.length;i++){
		cells.push(x.getChilds(trs[i],p));
		//cells.push(x.getChilds(trs[i],p).childNodes[0]);
	}
	return cells;
}
var resizeRowHeight=function(dom,dy){
	var cells=x.$("td",dom,6);/*所有兄弟节点*/
	var divs=x.$("div",cells,3);
	if(dom.oriHeight==null)	dom.oriHeight=x.getRect(dom.parentNode).height;
	var height=dom.oriHeight;
	/*要使用tr的高度来计算*/
	if(x.isIE)	height=height-1;	/*减去边框的值*/
	var newHeight=height+dy;
	var minHeight=0;
	if(newHeight<minHeight)	newHeight=minHeight;
	x.setDomSize(divs,null,newHeight);
}
var resizeColumnWidth=function(dom,dx){
	var cells=getSameColumnCell(dom);
	var divs=x.$("div",cells,3);
	if(dom.oriWidth==null)	dom.oriWidth=x.getDomWidth(dom);
	var width=dom.oriWidth;
	var newWidth=width+dx;
	var minWidth=0;
	if(newWidth<minWidth)	newWidth=minWidth;
	x.setDomSize(divs,newWidth,null);
}
var e_body_move=function(evt){
	if(window.resizeCell!=null){/*调整大小的表格*/
		var dom=$1("table",window.resizeCell,1);
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		if(x.cssContain(dom,"resizeL11")){/*代表上下移动  调整同行所有元素的高度*/
			resizeRowHeight(window.resizeCell,dy);
		}
		else if(x.cssContain(dom,"resizeL12")){/*代表左右移动 调整同列所有元素的高度*/
			resizeColumnWidth(window.resizeCell,dx);
		}		
	}
	if(window.resizeDom!=null){
		var dom=window.resizeDom;
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		if(dom.oriWidth==null)	dom.oriWidth=x.getDomWidth(dom);
		if(dom.oriHeight==null)	dom.oriHeight=x.getDomHeight(dom);
		
		var width=dom.oriWidth+dx;
		var height=dom.oriHeight+dy;
		var cfg=dom.resizeCfg;
		if(width<0)		width=0;
		if(height<0)	height=0;
		if(cfg.minWidth==null) cfg.minWidth=10;
		if(cfg.minHeight==null) cfg.minHeight=10;
		if(width<cfg.minWidth)	width=cfg.minWidth;
		if(width>cfg.maxWidth)	width=cfg.maxWidth;
		if(height<cfg.minHeight)	height=cfg.minHeight;
		if(height>cfg.maxHeight)	height=cfg.maxHeight;
		if(contains(["resizeC1","resizeC2","resizeL1"],window.resizeStyle))	x.setDomSize(dom,null,height);
		if(contains(["resizeC1","resizeC2","resizeL2"],window.resizeStyle))	x.setDomSize(dom,width);
	}	
	if(window.moveDom!=null){
		var dom=window.moveDom;
		var cfg=dom.moveCfg;
		if(dom.oriLeft==null)	dom.oriLeft=x.toNum(x.getStyle(dom).left);
		if(dom.oriTop==null)	dom.oriTop=x.toNum(x.getStyle(dom).top);
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		
		var left=dom.oriLeft+dx;
		var top=dom.oriTop+dy;
		
		if(left<cfg.minLeft)	left=cfg.minLeft;
		if(top<cfg.minTop)		top=cfg.minTop;
		x.setDomPosition(dom,left,top);
	}
	if(window.splitDom!=null){
		var dom=window.splitDom;
		var width=x.toNum(x.getStyle(dom).width);
		var height=x.toNum(x.getStyle(dom).height);
		var childs=x.getChilds(dom);
		var dom1=childs[0];
		var dom2=childs[1];
		var cfg=dom.splitCfg;

		if(cfg.minValue==null) cfg.minValue=24;
		if(cfg.mode=="x"){	/*水平模式*/
			if(cfg.maxValue==null) cfg.maxValue=width-30;
			var dx=evt.clientX-window.cursorStartX;
			if(dom1.oriWidth==null)	dom1.oriWidth=x.toNum(x.getStyle(dom1).width)
			var width1=dom1.oriWidth+dx;
			if(isNum(cfg.minValue)&&width1<cfg.minValue)	width1=cfg.minValue;
			if(isNum(cfg.maxValue)&&width1>cfg.maxValue)	width1=cfg.maxValue;
			var width2=width-width1;
			
			x.setDomSize(dom1,width1,null);
			x.setDomSize(dom2,width2,null);
		}
		if(cfg.mode=="y"){	/*垂直模式*/
			if(cfg.maxValue==null) cfg.maxValue=height-30;
			
			var dy=evt.clientY-window.cursorStartY;
			if(dom1.oriHeight==null)	dom1.oriHeight=x.toNum(x.getStyle(dom1).height)
			var height1=dom1.oriHeight+dy;
			if(isNum(cfg.minValue)&&height1<cfg.minValue)	height1=cfg.minValue;
			if(isNum(cfg.maxValue)&&height1>cfg.maxValue)	height1=cfg.maxValue;
			var height2=height-height1;

			x.setDomSize(dom1,null,height1);
			x.setDomSize(dom2,null,height2);
		}
	}	
	x.stopEvt(evt);
}
var e_body_mouseup=function(evt){
	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;
	x.stopEvt(evt);
}
var e_body_mouseleave=function(evt){
	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;
}
var e_body_blur=function(evt){

	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;

}

x.bind(document.body,"mousemove",e_body_move);
x.bind(document.body,"mouseup",e_body_mouseup);
//x.bind(document.body,"mouseout",e_body_mouseout);
x.bind(document.body,"mouseleave",e_body_mouseleave);
x.bind(document.body,"blur",e_body_blur);
})(window);
/*xlib.32layout	布局函数  这里的布局对象不允许使用padding值*/
(function(x){
	var confs=[];
	var e_win_resize=function(evt){
		/*一旦发生页面大小变化 则调整所有与body相关的dom*/		
		e_dom_resize(document.body);
	}
	var e_dom_resize=function(dom){/*找到该节点的影响节点，执行auto_size_dom操作*/
		if(dom.effectNode){
			for(var i=0;i<dom.effectNode.length;i++){
				auto_size_dom(dom.effectNode[i]);
			}
		}
	}
	var auto_size_dom=function(dom){
		var conf=dom.layoutConf;
		if(conf==null)	return;
		var container=conf.container;
		var width=null;
		var height=null;

		if(x.isNum(conf.dx)){
			var width=container.clientWidth-conf.dx;
			if(x.isArray(conf.xdoms)){
				for(var i=0;i<conf.xdoms.length;i++){
					width=width-conf.xdoms[i].clientWidth;
				}
			}
			
		}
		if(x.isNum(conf.dy)) {
			var height=container.clientHeight-conf.dy;
			if(x.isArray(conf.ydoms)){
				for(var i=0;i<conf.ydoms.length;i++){
					height=height-conf.ydoms[i].clientHeight;
				}
			}
			
		}		
		x.setDomSize(conf.dom,width,height);
		//e_dom_resize(conf.dom1);
	}
	var reg_resizeEvent=function(dom,dom2){/*注册尺寸变化监听*/
		if(x.isArray(dom))	x.each(dom,function(e){reg_resizeEvent(e)});
		else if(x.isElement(dom)){
			if(dom.resizeHandler==null)	dom.resizeHandler=[];
			if(dom.effectNode==null)	dom.effectNode=[];
			add2(dom.effectNode,dom2);	/*影响节点*/
			dom.resizeHandler.push(e_dom_resize);/*增加一个事件*/
		}
	}
	/*conf的组成  dom1   dom2  参照容器  dx 宽度  dy高度  xdoms 宽度参考节点  ydoms  高度参考节点*/
	x.uiLayout=function(conf){
		var dom=conf.dom;
		if(dom==null)	return;
		dom.layoutConf=conf;	/*布局配置*/
		reg_resizeEvent(conf.container,dom);/*容器发生变化触发事件*/

		x.add(confs,conf);/*增加一个配置项*/
		auto_size_dom(dom);
		window.onresize=e_win_resize;
	}
	
})(window);
/*xlib.33spliter		移动、调整大小等特效*/
(function(x){	/*spliter效果  如果把一个容器设置为spliter 则该容器内部的元素宽度、高度可调，根据布局不同能够自动变化 */
	/*有全局事件的处理*/
	var genResizeStyle=function(evt,dom){
		var conf=dom.resizeCfg;
		var rect=x.getRect(dom);
		var px=evt.clientX;
		var py=evt.clientY;
		var gap=15;
		var flag1=rect.top+gap>py;
		var flag2=rect.top+rect.height<py+gap;
		var flag3=rect.left+gap>px;
		var flag4=rect.left+rect.width<px+gap;
		var style="";
		//if(flag1&&flag3)	style="resizeC1";
		if(flag2&&flag4)	style="resizeC1";
		if(flag1&&flag4)	style="resizeC2";
		if(flag2&&flag3)	style="resizeC2";
		if(conf.resizeMode!=null){
			if(!x.contains(conf.resizeMode,"xy"))	style="";/*如果不允许xy方向上调整尺寸*/
		}
		
		//if(flag1&&(!flag3&&!flag4))	style="resizeL1";
		if(flag2&&(!flag3&&!flag4)){
			style="resizeL1";	
			if(conf.resizeMode!=null){
				if(!x.contains(conf.resizeMode,"y"))	style="";/*如果不允许垂直方向上调整尺寸*/
			}
		}
		//if(flag3&&(!flag1&&!flag2))	style="resizeL2";
		if(flag4&&(!flag1&&!flag2)){
			style="resizeL2";
			if(conf.resizeMode!=null){
				if(!x.contains(conf.resizeMode,"x"))	style="";/*如果不允许水平方向上调整尺寸*/
			}
		}
		
		var target=x.getTarget(evt);
		if(target.className.indexOf("scrollbar_")>=0) style="";/*滚动条上不允许改变 光标样式*/
		return style;
	}
	var e_target_resize_move=function(evt){
		var dom=this;
		var style=genResizeStyle(evt,dom);
		cssRm(dom,["resizeC1","resizeC2","resizeL1","resizeL2"]);
		cssAdd(dom,style);
	}
	var e_target_resize_mousedown=function(evt){
		var dom=this;
		var style=genResizeStyle(evt,dom);
		if(style!=""){
			dom.oriWidth=null;
			dom.oriHeight=null;
			window.resizeDom=dom;
			window.resizeStyle=style;
			window.cursorStartX=evt.clientX;
			window.cursorStartY=evt.clientY;
			x.stopEvt(evt);
		}
		x.stopEvt(evt);
	}
	
	var e_target_move_move=function(evt){/*对象移动  允许移动的区域需要定义*/
		var dom=this;
		var allowMove=ifAllowMove(evt,dom);
		if(allowMove)	x.cssAdd(dom,"moveable");
		else			x.cssRm(dom,"moveable");
	}
	
	
	var ifAllowMove=function(evt,dom){
		var px=evt.clientX;
		var py=evt.clientY;
		var rect=x.getRect(dom);
		var cfg=dom.moveCfg;
		if(cfg.area==null)			cfg.area="top";/*默认顶部允许移动*/
		if(cfg.gap==null)			cfg.gap=15;
		if(cfg.area=="all")			return true;
		if(cfg.area=="top")			return rect.top+cfg.gap>py;
		if(cfg.area=="left")		return rect.left+cfg.gap>px;
		if(cfg.area=="right")		return rect.left+rect.width-cfg.gap<px;
		if(cfg.area=="bottom")		return rect.top+rect.height-cfg.gap<py;
	}
	var e_target_move_mousedown=function(evt){
		
		var dom=this;
		var allowMove=ifAllowMove(evt,dom);
		if(allowMove){
			window.cursorStartX=evt.clientX;
			window.cursorStartY=evt.clientY;
			window.moveDom=dom;
			dom.oriLeft=null;
			dom.oriTop=null;
			x.stopEvt(evt);
		}
	}
	var e_target_split_move=function(evt){/*对象移动  允许移动的区域需要定义*/
		var dom=this;
		
		var allowSplit=ifAllowSplit(evt,dom);
		if(allowSplit){
			if(dom.splitCfg.mode=="x")	x.cssAdd(x.getChilds(dom),"resizeL2");
			if(dom.splitCfg.mode=="y")	x.cssAdd(x.getChilds(dom),"resizeL1");
		}
		else	x.cssRm(x.getChilds(dom),["resizeL1","resizeL2"]);
	}
	
	var e_target_split_leave=function(evt){/*对象移动  允许移动的区域需要定义*/
		window.splitDom=null;
	}
	
	var ifAllowSplit=function(evt,dom){
		var result=false;
		var px=evt.clientX;
		var py=evt.clientY;
		var rect=x.getRect(x.getChilds(dom,0));/**/
		var cfg=dom.splitCfg;
		var w=rect.left+rect.width;
		var h=rect.top+rect.height;
		if(cfg.mode==null)			cfg.mode="x";/*默认是水平方向*/
		if(cfg.gap==null)			cfg.gap=15;/*默认是20的间距*/
		
		if(cfg.mode=="x")	result=w+cfg.gap>px&&w-cfg.gap<px;
		if(cfg.mode=="y")	result=h+cfg.gap>py&&h-cfg.gap<py;
		return result;

	}
	var e_target_split_mousedown=function(evt){
		var dom=this;
		var allowSplit=ifAllowSplit(evt,dom);
		if(allowSplit){
			window.cursorStartX=evt.clientX;
			window.cursorStartY=evt.clientY;
			window.splitDom=dom;
			var dom1=x.getChilds(dom,0);/*获取第一个子元素*/
			dom1.oriWidth=null;
			dom1.oriHeight=null;
			x.stopEvt(evt);

		}
	}
		
	x.uiResize=function(cfg){/*允许设置min值，max值  resizeMode等  
	可变允许地方  四个边 四个角 1 top bottom left right 2 c1 c2 c3 c4 */
		var dom=cfg.dom;
		dom.resizeCfg=cfg;
		bind(dom,"mousemove",e_target_resize_move);
		bind(dom,"mousedown",e_target_resize_mousedown);
	}
	
	x.uiMove=function(cfg){/*设置一个对象是否允许位置移动  这里就必须要有个区域的概念  允许移动的区域area  top  间距 gap 32px 20px*/
		var dom=cfg.dom;
		dom.moveCfg=cfg;
		bind(dom,"mousemove",e_target_move_move);
		bind(dom,"mousedown",e_target_move_mousedown);
	}
	
	x.uiSpliter=function(cfg){/*设置一个对象允许内部调整大小 宽度和高度可调需要明确一种  典型情况为里面有两个对象  */
		var dom=cfg.dom;
		dom.splitCfg=cfg;
		bind(dom,"mousemove",e_target_split_move);
		bind(dom,"mousedown",e_target_split_mousedown);
		bind(dom,"mouseleave",e_target_split_leave);
	}
	
	x.regResizeHanlder=function(dom,fn){/*注册尺寸调整监听事件*/
		if(x.isElement(dom)){
			if(dom.resizeHandler==null)	dom.resizeHandler=[];
			if(!x.contains(dom.resizeHandler,fn))	dom.resizeHandler.push(fn);
		}
		
	}
	
})(window);
/*34tab		选项卡效果*/
(function(x){	/*页签效果  页签的效果有多种*/
	var e_tab_trigger=function(evt){
		var target=getTarget(evt);
		var doms=getSiblings(target);
		var p=indexOf(doms,target);
		x.cssReplace(doms,"active","normal");
		x.cssReplace(target,"normal","active");
		var container=$1(".tabContainer",target,0);
		if(container.tabIndex==null)	container.tabIndex=p;
		else if(container.tabIndex==p)	return;/*已经相同 ，不需要处理*/
		container.tabIndex=p;
		
		var cfg=container.tabCfg;/*页签相关配置*/
		
		if(x.isFun(cfg.tabChange)){/**/
			if(target!=null)
			var result=cfg.tabChange(target,p);/*tabChange事件 接收两个参数  target  页签位置*/
			if(result==true)	return;/*用户要求特别的处理，不再执行默认事件*/
		}
		
		var dom2=cfg.dom2;
		if(dom2!=null){
			if(cfg.mode=="slide"){/*滑动门效果*/
				x.fxClear(dom2);
				x.fxSlide(dom2,p,cfg.pageSize,cfg.vmode,cfg.delay,cfg.duration,cfg.fn);
			}
			else{
				;////out("display only");
				var doms=x.getChilds(dom2);
				x.cssReplace(doms,"active","normal");
				x.cssReplace(doms[p],"normal","active");
			}
		}
	}
	
	x.uiTab=function(cfg){
		//;////out("ui tab!"+cfg.evt);
		var dom=cfg.dom;
		dom.tabCfg=cfg;
		var childs=x.$(".tab",dom,3);
		//;////out("childs.length",childs.length);
		x.bind(childs,cfg.evt,e_tab_trigger);
	}
	
	
	x.activeTab=function(target){
		var app=$1(".app",target,0);
		var cfg=app.appCfg;
		var p=x.getDomIndex(target);
		
		//x.cssReplace(doms,"active","normal");
		//x.cssReplace(target,"normal","active");
		if(cfg.tabIndex==null)	cfg.tabIndex=p;
		else if(cfg.tabIndex==p)	return;/*已经相同 ，不需要处理*/
		cfg.tabIndex=p;
		
		var tabs		=cfg.tabs;
		var contents	=cfg.contents;
		x.cssReplace(tabs,"active","normal");
		x.cssReplace(tabs[p],"hide","active");
		x.cssReplace(tabs[p],"normal","active");
		x.cssReplace(contents,"active","normal");
		x.cssReplace(contents[p],"normal","active");
		
		if(x.isFun(cfg.fn)){/**/
			//;////out("cfg.fn is function!");
			if(target!=null)
			var result=cfg.fn(target,p);/*tabChange事件 接收两个参数  target  页签位置*/
			//;////out("cfg.fn excute=",result);
		}
		
	}
	var e_tab_trigger2=function(evt){
		var target=getTarget(evt);
		x.activeTab(target);
		
	}
	x.uiApp=function(cfg){/*输出一个应用程序管理对象还是怎么处理出来*/
		var app=cfg.dom;
		app.appCfg=cfg;
		
		var evt=cfg.evt;
		if(evt==null)	evt="mousedown";
		var tabs=x.getChilds(x.getChilds(app,0));
		//;////out("tabs.length");
		cfg.tabs=tabs;
		x.bind(tabs,evt,e_tab_trigger2);		
		/*注册布局事件*/
		var contents=x.getChilds(x.getChilds(app,1));
		cfg.contents=contents;
		for(var i=0;i<contents.length;i++){
			var content=contents[i];
			var conf={dom:content,container:document.body,dx:0,dy:0};
			x.uiLayout(conf);
		}
	}
})(window);
/*35panel	容器滚动特效*/
(function(x){
	var e_grid_selectstart=function(){
		
	}
	var e_mouse_wheel=function(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
		var target=this,content=x.$1(".scroll_content",target,2);
		if(!target.scrollY)	return;
		var rolled = x.getEvtRolled(evt)*5;
		var top=x.toNum(x.getStyle(content).top);
		var clientHeight=target.clientHeight,scrollHeight=content.scrollHeight;
		var minTop=clientHeight-scrollHeight;
		if(target.scrollX)	minTop-=15;
		var maxTop=0;
		
		top=x.limitValue(top+rolled,minTop,maxTop);
		content.style.top=top+"px";
		fixScroll(target);
		x.stopEvt(evt);
	}
	var e_scroll_mouseenter=function(){/*鼠标进入事件*/
	}
	var e_scroll_v_mousedown=function(evt){
		var target=this;
		target.parentNode.scrollType="v";
		x.stopEvt(evt);
	}
	var e_scroll_h_mousedown=function(evt){
		var target=this;
		target.parentNode.scrollType="h";
		x.stopEvt(evt);
	}
	var e_dom_mousemove=function(evt){/*垂直滚动条内鼠标移动事件 只关心垂直滚动*/
		//;////out("dom move");
		var dom=this;
		var scroll_h	=x.$1(".scroll_h"		,dom,2);
		var scrollbar_h	=x.$1(".scrollbar_h"	,dom,2);
		var scroll_v	=x.$1(".scroll_v"		,dom,2);
		var scrollbar_v	=x.$1(".scrollbar_v"	,dom,2);
		var scrollfix	=x.$1(".scroll_fix"		,dom,2);
		var content		=x.$1(".scroll_content"	,dom,2);

		var width1=dom.clientWidth,width2=content.scrollWidth;/*可见宽度 高度*/
		/*[!重要修正 ]*/width2=content.scrollWidth;
		var height1=dom.clientHeight,height2=content.scrollHeight;/*内容实际宽度 高度*/
		var flag1=width1<width2,flag2=height1<height2;
		var width3=x.toNum(scroll_h.style.width), height3=x.toNum(scroll_v.style.height);/*scroll 的实际width 和height*/
		var width=x.toNum(scrollbar_h.style.width),height=x.toNum(scrollbar_v.style.height);/*scrollbar 的实际width和height*/

		if(dom.scrollType=="v"){
			if(dom.lastY==null)	dom.lastY=evt.clientY;
			else{
				var d=evt.clientY-dom.lastY;
				dom.lastY=evt.clientY;
				var barTop=x.toNum(x.getStyle(scrollbar_v).top);/**/
				barTop=x.limitValue(barTop+d,0,height3-height-2);
				var currTop=-barTop*(height2-height3)/(height3-height-2);
				//;////out("barTop="+barTop+"d="+d+" marginTop="+marginTop+" height5="+height5+" height1="+height1);
				scrollbar_v.style.top=barTop+"px";
				content.style.top=currTop+"px";
			}
			//x.stopEvt(evt);
		}
		else if(dom.scrollType=="h"){
			if(dom.lastX==null)	dom.lastX=evt.clientX;
			else{
				var d=evt.clientX-dom.lastX;
				dom.lastX=evt.clientX;
				var barLeft=x.toNum(x.getStyle(scrollbar_h).left);/**/
				barLeft=x.limitValue(barLeft+d,0,width3-width-2);
				
				var currLeft=-barLeft*(width2-width3)/(width3-width-2);
				//;////out("barLeft="+barLeft+"d="+d+" marginLeft="+marginLeft+" width2="+width2);
				scrollbar_h.style.left=barLeft+"px";
				content.style.left=currLeft+"px";
			}
			//x.stopEvt(evt);
		}
	}
	var e_dom_mouseup=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var target=this;
		target.lastX=target.lastY=target.scrollType=null;
		//x.stopEvt(evt);
	}
	var e_dom_mouseleave=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var target=this;
		target.lastX=target.lastY=target.scrollType=null;
		//x.stopEvt(evt);
	}
	var genScroll=function(dom){/*为一个dom对象生成滚动条*/
		var cfg=dom.scrollCfg;
		x.cssAdd(dom,"scroll");/*给父容器加上scroll样式*/
		var content		=x.$1(".scroll_content",dom,2);/*寻找要滚动内容*/
		if(content==null){/*尚未进行scroll初始化*/
			var childs=x.getChilds(dom);
			if(childs.length==1)	x.cssAdd(childs[0],"scroll_content");/*把第一个子元素当做要滚动的对象*/
			else if(childs.length>1){/*如果子元素不止一个 使用一个div，把内容装起来*/
				var div=x.$e("div");div.className="scroll_content";
				div.style.width=dom.scrollWidth+"px";
				x.addChild(div,x.rmDom(childs));
				x.addChild(dom,div);
			}
		}
		var scrollbar_h=x.$1(".scrollbar_h",dom,2);/*寻找要滚动内容*/
		if(scrollbar_h==null){/*初始化建立滚动条*/
			var div1=$e("div");div1.className="scroll_h";
			var div2=$e("div");div2.className="scrollbar_h";
			var div3=$e("div");div3.className="scroll_v";
			var div4=$e("div");div4.className="scrollbar_v";
			var div5=$e("div");div5.className="scroll_fix1";
			var div6=$e("div");div6.className="scroll_fix2";
			//out("add Child");
			//dom.appendChild();
			x.addChild(dom,[div1,div2,div3,div4,div5,div6]);
			//out("add Child2");

			//;////out("bind evt");
			if(cfg.color!=null){
				div2.style.backgroundColor=cfg.color;
				div4.style.backgroundColor=cfg.color;
			}
			if(cfg.opacity!=null){
				div2.style.opacity=cfg.opacity;
				div4.style.opacity=cfg.opacity;
			}	
			x.bind(dom,	"mousemove",e_dom_mousemove);/*水平位移*/
			x.bind(dom,	"mouseup",e_dom_mouseup);/*水平位移*/
			x.bind(dom,	"mouseleave",e_dom_mouseleave);/*水平位移*/
			x.bind(div2,"mousedown",e_scroll_h_mousedown);/*水平位移*/
			x.bind(div4,"mousedown",e_scroll_v_mousedown);/*垂直位移*/
		}
		fixScroll(dom);
	}
	
	x.scrollPanelTo=function(panalDom,targetDom,px,py){
		var domTop,domLeft,content,height2,height1,width2,width1,l,d;
		if(targetDom!=null)  {domTop =getRect(targetDom).top;domLeft =getRect(targetDom).left;}
		else                 {domTop =py                     ;domLeft=px}
		content	=$1(".scroll_content"	,panalDom,2);
		
		d=domTop-toNum(getStyle(content).top);
		l=domLeft-toNum(getStyle(content).left);
		out("target d:",d);
		height2=content.scrollHeight;
		height1=panalDom.clientHeight;
		width2 =content.scrollWidth;
		width1 =panalDom.clientWidth;
		d=limitValue(d,0,height2-height1)
		l=limitValue(l,0,width2-width1)
		content.style.top=-d+"px";
		content.style.left=l+"px";
		fixScroll(doc);
	}
	var fixScroll=function(dom){/*为一个dom对象重新修正滚动条位置*/
		var scroll_h	=x.$1(".scroll_h"		,dom,2);
		var scrollbar_h	=x.$1(".scrollbar_h"	,dom,2);
		var scroll_v	=x.$1(".scroll_v"		,dom,2);
		var scrollbar_v	=x.$1(".scrollbar_v"	,dom,2);
		var scrollfix1	=x.$1(".scroll_fix1"	,dom,2);
		var scrollfix2	=x.$1(".scroll_fix2"	,dom,2);
		var content		=x.$1(".scroll_content"	,dom,2);
		var contents	=x.$1(".scroll_content2"	,dom,2);
		
		var width1=dom.clientWidth,width2=dom.scrollWidth,width21=content.scrollWidth;/*内容可见宽度 高度*/
		/*[!重要修正 ]*/width2=width21;
		var height1=dom.clientHeight,height2=content.scrollHeight;/*内容实际宽度 高度*/
		var flag1=width1<(width2),flag2=height1<(height2);/*flag1是否有水平滚动条  flag2是否有垂直滚动条*/

		var width3=flag2?width1-10:width1, height3=flag1?height1-10:height1;/*scroll 的实际width 和height  
		   有垂直滚动条时  水平滚动宽度-15   有水平滚动条时 垂直滚动高度-15*/
		var width=width3*width3/width2,	height=height3*height3/height2;
		
		var top		=	x.toNum(x.getStyle(content).top);/*当前的marginTop即是向上滚动的高度*/
		var left	=	x.toNum(x.getStyle(content).left);/*当宽度在发生变化时  marginLeft 应同时做调整  
		按照百分比进行  高度的百分比   不然按照这个比例不合适  也许容器高度已经变化到可以不滚动的地步*/
		if(dom.scrollCfg.lastWidth==null){
			dom.scrollCfg.lastWidth=width1;
			dom.scrollCfg.lastHeight=height1;
		}
		else{/*高度或者宽度发生了变化 	判断是变大还是变小*/
			var lastWidth=dom.scrollCfg.lastWidth;
			var lastHeight=dom.scrollCfg.lastHeight;
			
			if(lastWidth<width1){/*变大了*/
				if(left<0){
					left+=(width1-lastWidth);
					if(left>0)	left=0;
					content.style.left=left+"px";/**/
				}
			}
			if(lastHeight<height1){/*变高了*/
				if(top<0){
					top+=(height1-lastHeight);
					if(top>0)	top=0;
					content.style.top=top+"px";
				}
			}
			
			dom.scrollCfg.lastWidth=width1;
			dom.scrollCfg.lastHeight=height1;
		}
		var barTop=(height3-height-2)*(-top)/(height2-height3);/*注意-2是滚动条的边框 height2-height3是最高滚动高度*/
		var barLeft=(width3-width-2)*(-left)/(width2-width3);/*注意-2是滚动条的边框  width2-width3是最高滚动宽度*/
		dom.scrollX=flag1;dom.scrollY=flag2;
		
		x.showHide([scroll_h,scrollbar_h],flag1);
		x.showHide([scroll_v,scrollbar_v],flag2);
		x.showHide([scrollfix1,scrollfix2],flag1&&flag2);

		if(flag1){/*水平滚动*/
			scroll_h.style.width=width3+"px";			
			scrollbar_h.style.width=width+"px";	
			scrollbar_h.style.left=barLeft+"px";	
		}
		if(flag2){/*垂直滚动*/
			scroll_v.style.height=height3+"px";		/*垂直滚动条的高度*/		
			scrollbar_v.style.height=height+"px";	/*垂直滚动条的*/
			scrollbar_v.style.top=barTop+"px";
		}
	}
	x.uiScroll=function(dom,cfg){/*自动为该dom生成滚动条  注册滚动事件*/
		if(dom&&dom.scrollCfg!=null)	fixScroll(dom);
		else{
			dom.scrollCfg=cfg;
			cfg.dom=dom;
			genScroll(dom);
			x.bind(dom,"mousewheel",e_mouse_wheel);
		}
	}
})(window);
/*38table	表格交互   带筛选器 排序  分页功能的表格  */
(function(x){	/*table 效果  能自由拖拽列宽*/
	var e_txt_click=function(evt){
		this.focus();
	}
	
	var e_prePage=function(evt){
		var table	=x.$1(".table",this,0);
		var cfg	=table.tableCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage--;
		x.genTableContent(table);
	}
	
	var e_nextPage=function(){
		var table	=x.$1(".table",this,0);
		var cfg	=table.tableCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage++;
		x.genTableContent(table);
	}
	
	x.genTableContent=function(dom){/*每次不应该重画所有的内容，相反应该想办法尽可能减少重画*/
		var cfg=dom.tableCfg;
		var data=cfg.data;
		var columns=cfg.columns;
		var id=cfg.id;
		var table=$("#"+id);
		//x.clearDom(dom);
		if(cfg.data_method!=null){/*获取数据*/
			var param=cfg.param;
			if(param==null)	param={pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage};
			else			x.mix(param,{pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage});
			if(cfg.orderby)	param.orderby=cfg.orderby;
			if(cfg.filter!=null)	param.filter=cfg.filter;
			////out("param",param);
			var result=$$(cfg.data_method,param);
			////out("result",result);
			if(result.flag)	{
				data=result.data;
				if(data==null||data.length==0) {
					data=[];
					cfg.total=0;
					cfg.totalPage=1;
					cfg.currPage=1;
				} else {
					cfg.total=result.total;
					cfg.totalPage=Math.ceil(cfg.total/cfg.pageSize);
					cfg.currPage=result.page;
				}
			}
			else{/*未获取到数据*/
				data=[];
				cfg.total=0;
				cfg.totalPage=1;
				cfg.currPage=1;
			}
		}
		cfg.data		=	data;

		for(var i=2;i<table.rows.length-1;i++){
			var tr=table.rows[i];
			tr.obj=data[i-2];

			tr.className="row";
			for(var j=0;j<columns.length;j++){
				x.clearDom(tr.childNodes[j]);
				if(tr.obj==null)	continue;

				var cell=x.$div(null,"cell");
				tr.childNodes[j].appendChild(cell);
				if(columns[j].type=="seq")	cell.innerHTML=i-1;
				else if(data[i-2][columns[j].attr]!=null)	cell.innerHTML=data[i-2][columns[j].attr];
				if(columns[j].align==null)	columns[j].align="center";
				cell.style.textAlign=columns[j].align;
				if(x.isNum(columns[j].width))	cell.style.width=columns[j].width+"px";
			}
		}
		
		var pagerInfo=$("#"+id+"_pagerInfo");
		
		cfg.totalNum=cfg.total;
		pagerInfo.innerHTML="共"+cfg.totalNum+"条记录,每页"+cfg.pageSize+"条, &nbsp;";
		pagerInfo.innerHTML+="第"+cfg.currPage+"页/共"+cfg.totalPage+"页";
	}
	
	x.genTable=function(cfg,columns,data){/*生成一个表格  如果有targetDom 则在targetDom处生成*/
		var dom=cfg.dom;		
		var id=x.getId("table");
		cfg.id=id;
		cfg.columns=columns;
		cfg.data=data;
		var table=$table(cfg.pageSize+1+1,columns.length);/*表头行 筛选行 分页控制行*/
		table.id=id;
		dom.appendChild(table);
		x.cssAdd(dom,"table");
		
		if(cfg.filterMode)	x.cssAdd(dom,"filterMode");
		if(cfg.pageFlag)	x.cssAdd(dom,"pageMode");
		
		var tr_header=table.rows[0];/*表头不需要重新设置*/
		var tr_filter=table.rows[1];
		tr_header.className="header";
		tr_filter.className="filter";
		for(var i=0;i<tr_header.cells.length;i++){
			var cell=x.$div(null,"cell");
			tr_header.cells[i].appendChild(cell);
			tr_header.cells[i].columnDef=columns[i];
			cell.innerHTML=columns[i].text;
			if(columns[i].attr!=null){
				tr_header.cells[i].className="asc";
				x.bind(tr_header.cells[i],"click",e_header_click);
			}
		}
		for(var i=0;i<tr_filter.cells.length;i++){
			var cell=x.$txt("query");
			tr_filter.cells[i].appendChild(cell);
			tr_filter.cells[i].columnDef=columns[i];
			if(x.isNum(columns[i].width))	cell.style.width=columns[i].width+"px";
			if(columns[i].attr!=null){
				x.bind(cell,"click",e_txt_click);
				x.bind(cell,"keydown",function(evt){if(evt.keyCode==13)filter_table(dom)});			
			}
		}
		
		var pager=table.insertRow(table.rows.length);
		pager.className="pager";
		var pagerCell=pager.insertCell(0);
		pagerCell.colSpan=columns.length;
		//dom.style.width=x.getRect(table).width+"px";
		var pagerDiv=$div(id+"_pager","pagerDiv");
		pagerCell.appendChild(pagerDiv);
		var pagerInfo=$div(id+"_pagerInfo","pagerInfo");
		var pagerBtn=$div(id+"_pagerBtn","pagerBtn");
		var pagerPre=$span(id+"_pagerPre","pagerPre");
		var pagerNext=$span(id+"_pagerNext","pagerNext");
		pagerInfo.innerHTML="共19条记录，每页10条, 第1页/共5页 ";
		pagerPre.innerHTML="上一页";
		pagerNext.innerHTML="下一页";
		x.addChild(pagerBtn,[pagerPre,pagerNext]);
		x.addChild(pagerDiv,[pagerInfo,pagerBtn]);
		
		x.bind(pagerPre,	"click",		e_prePage);/**/
		x.bind(pagerNext,	"click",		e_nextPage);
		
		dom.tableCfg=cfg;
		genTableContent(dom);
	}
	var e_header_click=function(evt){
		var target=x.getTarget(evt);
		var td=x.$1("td",target,0);
		var table=x.$1(".table",td,0);
		var columnDef=td.columnDef;
		if(columnDef&&columnDef.attr){
			if(columnDef.desc==null)		columnDef.desc="desc";
			else if(columnDef.desc=="desc")	columnDef.desc="asc";
			else if(columnDef.desc=="asc")	columnDef.desc="desc";
			
			td.className=columnDef.desc;
			table.tableCfg.orderby=columnDef.attr+" "+columnDef.desc;
			x.genTableContent(table);
		}
		else{
		}
	}
	
	var filter_table=function(dom){/*对grid的内容进行筛选*/
		var id="#"+dom.tableCfg.id;
		var table=$(id);
		var queryTds=table.rows[1].cells;
		var filter={};
		for(var i=0;i<queryTds.length;i++){
			var columnDef=queryTds[i].columnDef;
			var txt=queryTds[i].childNodes[0];
			if(txt.value!=""){
				var obj={};
				if(columnDef.type==null)	columnDef.type="str";
				obj.type=columnDef.type;/*文本框类型*/
				obj.value=txt.value;/*值*/
				filter[columnDef.attr]=obj;
			}
		}
		dom.tableCfg.currPage=1;
		dom.tableCfg.filter=filter;
		x.genTableContent(dom);
	}
})(window);
/*51lov		值列表交互*/
(function(x){	/*grid	效果 带分页 带滚动条*/
   var genLov=function(name,param){
		/*根据lov的name找到lov的定义信息*/
		//out("gen lov param",param);
		var def=x.lovDefs[name];
		//out("gen lov def",def);

		var lovDom=null;
		if(def==null)	return null;
		else{
			if(def.dom!=null){return def.dom;}
			if(def.type=="calendar")	lovDom=genLov_calendar(def.param);
			else if(def.type=="list")	lovDom=genLov_list(def,param);
			else if(def.type=="img")	lovDom=genLov_img(def,param);
			else if(def.type=="table")	lovDom=genLov_table(def,param);
		}
		x.bind(lovDom,"mouseleave",function(){hideLov(lovDom)});
		x.bind(lovDom,"mouseenter",function(){showLov(lovDom)});
		def.dom=lovDom;
		if(lovDom!=null)	lovDom.lovDef=def;
		//x.showLov(lovDom);
		return lovDom;
	}
	x.closeLov=function(target){
		target.style.zIndex=10;
	}
	x.hideLov=function(target){
		//var target=this;
		x.fxScaleOut(target,1300,800,function(){target.style.zIndex=10;});//.style.display="none";
	}
	x.showLov=function(target){
		//var target=this;
		//x.fxClear(target);
		//x.fxScaleIn(target);//.style.display="none";
	}
    x.openLov=function(dom,lovname,param){/*为哪个dom展开lov，lov的最终选择值就影响该dom的值和显示   lovname   param传入参数*/
		/*第一步 判断lov是否存在，不存在则创建*/
		/*打开值列表后要记录最后打开的值列表 便于下次关闭隐藏*/
		if(lovname==null)	lovname=dom.lov;
		param=x.mix(param,dom.lovparam);
		out("param",dom.lovparam);
		if(param==null)		param={};
		/*还要根据dom来设置依赖项的参数*/
		if(dom.lovdepdoms!=null){
			for(var i=0;i<dom.lovdepdoms.length;i++){
				var cell=dom.lovdepdoms[i];
				if(cell!=null&&cell.getAttribute("attr")!=null&&cell.value!=null){
					param[cell.getAttribute("attr")]=cell.value;
				}
			}
		}
		//out("openlov param",param);
		var lovDom=genLov(lovname,param);
		if(lovDom==null)	return;/*未能正常生成*/
		//x.bind(dom,"mouseleave",function(){hideLov(lovDom)});
		x.fxClear(lovDom);
		x.setScale(lovDom,1,1);
		//out("lov open ");

		x.bind(lovDom,"mouseleave",function(){hideLov(lovDom)})
		/*第二步 给lov设置target*/
		/*第三步 将lov呈现在合适的位置上*/
		if(x.lastOpenLov!=null)	x.lastOpenLov.style.zIndex=10;/*隐藏最后关闭的lov*/
		//lovDom.style.display="";
		x.lastOpenLov=lovDom;
		lovDom.style.zIndex=40;/*lovDom的级别是什么  是放在哪个层次上*/
		var rect=x.getRect(dom);
		if(x.cssContain(dom,"text"))	rect=x.getRect(dom.parentNode);
		var lovWidth=lovDom.clientWidth;
		var lovHeight=lovDom.clientHeight;
		var bodyWidth=document.body.clientWidth;
		var bodyHeight=document.body.clientHeight;
		
		var left=rect.left;
		var top=rect.top+rect.height;
		
		if(left>bodyWidth-lovWidth)		left=bodyWidth-lovWidth;
		if(top>bodyHeight-lovHeight)	top=bodyHeight-lovHeight;
		lovDom.style.left=left+"px";
		lovDom.style.top=top+"px";
		lovDom.targetDom=dom;
		//out("lov open ");
		/*判断是否超出屏幕，如果超出屏幕，则要做一定的调整*/
	}
		
	var e_list_click=function(evt){
		var target=x.getTarget(evt);
		var lovDom=this;
		if(target.obj!=null){
			x.setFormAttr(lovDom.targetDom,target.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_list=function(cfg,param){/*根据配置和参数生成一个列表模式的lov*/
		/*数据列表必须满足一定的数据格式  value  name*/
		var name=cfg.name;
		param =x.mix(cfg.param,param);
		if(param==null) {
			param = {};	
		}
		out("genLovList",param);
		var lovId="lov_"+name;
		var lovDom=$div(lovId,"lov lov_list");
		if(cfg.width)	lovDom.style.width=cfg.width+"px";
		
		document.body.appendChild(lovDom);
		
		if(cfg.data_method!=null){
			var result=$$(cfg.data_method,param);
			//out("result",result);
			if(result.flag){
				cfg.datas=result.data;
			}
			else{
				cfg.datas=[];
			}
		}
		x.bind(lovDom,"click",e_list_click);/*创建一个div格式的列表即可*/
		for(var i=0;i<cfg.datas.length;i++){
			var obj=cfg.datas[i];
			var div=$div();
			div.innerHTML=obj.name;
			div.obj=obj;
			lovDom.appendChild(div);
		}
		return lovDom;
	}
	
	
	
	var e_img_click=function(evt){
		var target=x.getTarget(evt);
		var lovDom=this;
		if(target.obj!=null){
			x.setFormAttr(lovDom.targetDom,target.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_img=function(cfg,param){/*生成图像模式的值列表*/
		var div=$div("lov_"+cfg.name,"lov lov_img");
		document.body.appendChild(div);
		x.bind(div,"click",e_img_click);
		var result=$$("appImagesGet");
		if(result.flag==true){
			for(var i=0;i<result.data.length;i++){
				var obj=result.data[i];
				if(obj.type=="png"){
					var img=$div(null,"img");
					img.obj=obj;
					img.innerHTML=obj.name.substr(0,obj.name.indexOf("."));
					var url="http://ldjnotebook:8080/eam/"+obj.path;
					img.style.backgroundImage="url("+url+")";
					div.appendChild(img);
				}
			}
		}
		return div;
	}
	
	
	
	var e_table_click=function(evt){
		//alert("click");
		var target=x.getTarget(evt);
		var tr=x.$1("tr",target,0);
		//alert(tr);
		var lovDom=this;
		var def=lovDom.lovDef;
		if(tr.obj!=null){
			x.setFormAttr(lovDom.targetDom,tr.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_table=function(cfg,param){/*根据配置和参数生成一个列表模式的lov*/
		/*数据列表必须满足一定的数据格式  value  name*/
		var name=cfg.name;
		var lovId="lov_"+name;
		var lovDom=$div(lovId,"lov lov_table");
		document.body.appendChild(lovDom);
		var datas=[{id:1,name:"刘东杰",sex:"男",birthday:"1985-10-16"},
					{id:2,name:"张一帆",sex:"女",birthday:"1985-10-16"}
				]
		cfg.tableCfg.dom=lovDom;
		x.genTable(cfg.tableCfg,cfg.columns,datas);
		x.bind(lovDom,"click",e_table_click);
		return lovDom;
	}
	var f_error_show=function(cell){/*显示某个对象的错误提示信息*/
		var form=x.$1(".form",cell,0);
		var cfg=form.formCfg;
		var doc=x.$("#"+cfg.id+"_doc");
		var errorMsg=$("#"+cfg.id+"_errorMsg");
		var errorText=$("#"+cfg.id+"_errorText");
		errorText.innerHTML=cell.error;/**/
		errorMsg.style.display="block";
		var rect=x.getRect2(cell.parentNode);/*除了这个rect以外 还要考虑当前的容器的top值*/
		//out("rect",rect);
		var top=x.toNum(x.getStyle(doc).top);
		//out("top",top);
		errorMsg.style.left=Math.floor(rect.left)+"px";
		errorMsg.style.top=Math.floor(rect.top-top-14)+"px";
		
	}
	x.setFormAttr=function(text,obj,lovDef){/*设置formAttr的值 控制翻转*/
		//lovDef定义可以有 nameAttr  valueAttr
		if(lovDef==null)	lovDef={};
		if(text!=null&&lovDef!=null){
			var nameAttr=lovDef.nameAttr;
			var valueAttr=lovDef.valueAttr;
			if(valueAttr==null)	valueAttr="value";
			if(nameAttr!=null){
				text.innerHTML=obj[nameAttr];
				text.value=obj[nameAttr];
				text.value2=obj[valueAttr];
			}
			else{
				text.innerHTML=obj[valueAttr];
				text.value=obj[valueAttr];
				text.value2=obj[valueAttr];
			}
			if(text.cellDef!=null){
				var fn=text.cellDef.onchange;/*主要是为了触发onchange事件*/
				if(fn!=null){
					fn(text,obj);
				}
				var form=x.$1(".form",text,0);
				var cfg=form.formCfg;
				var tables=cfg.tables;
				for(var i=0;i<tables.length;i++){
					if(tables[i].type==4){
						if(tables[i].dependeAttr==text.cellDef.attr){
							var mid1=form.formCfg.data[text.cellDef.attr];
							var mid2=form.formCfg.data[text.cellDef.attr2];
							form.formCfg.data[text.cellDef.attr]=text.value;
							form.formCfg.data[text.cellDef.attr2]=text.value2;
							form.formCfg.notReadDate=1;
							x.genFormContent(form);
							form.formCfg.data[text.cellDef.attr]=mid1;
							form.formCfg.data[text.cellDef.attr2]=mid2;
							form.formCfg.notReadDate=null;
						}
					}
				}
				if(text.cellDef.dt!=null||text.cellDef.checkMethod!=null||text.cellDef.rangeCheck!=null||text.cellDef.childrangeCheck!=null||text.cellDef.lov!=null){
					var docheck=function(cell,result){
						if(!result.flag){
							x.cssAdd(result.cell,"error");/*变红*/
							result.cell.error=result.error;
							f_error_show(result.cell);/*上方错误信息框*/
						}
						else{
							x.cssRm(cell,"error");/*清除错误标记*/
							cell.error=null;
							var errorMsg=$("#"+cfg.id+"_errorMsg");
							errorMsg.style.display="none";
						}
					}
					var result=x.checkFormCell(text,form);
					docheck(text,result);
					var cellattr=text.cellDef.attr
					if(result.rangeResult!=null)
					for(var i=0;i<result.rangeResult.length;i++){
						//if(cellattr==result.rangeResult[i].cell.cellDef.attr||cellattr==result.rangeResult[i].cell.cellDef.rangeCheck)
						var rangeattr=[];
						rangeattr.push(result.rangeResult[i].cell.cellDef.attr);
						for(var j=0;j<result.rangeResult[i].cell.cellDef.rangeCheck.eles.length;j++){
							if(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].gt!=null){
								rangeattr.push(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].gt);
							}
							else if(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].lt!=null){
								rangeattr.push(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].lt);
							}
						}
						if(x.contains(rangeattr,cellattr)) docheck(result.rangeResult[i].cell,result.rangeResult[i]);
						//if(!result.rangeResult[i].flag) break;
					}
				}
			}
		}
	}
})(window);
(function(x){	/*LOV  calendar 效果 */
	var doms={};
	var cfg={mode:"datetime"};/*日历的模式 1代表只显示日期  2代表只显示时间  3代表日期和时间都显示   2暂时不使用*/
	var $id=function(id){
		return $("#lov_calendar_"+id);
	}
	var setDoms=function(){/*设置dom  value */
		var ids=["year","month","day","hour","min","header","years","months","days"
				,"hours","mins","yearCurr","ok","time","curr"];
		for(var i=0;i<ids.length;i++){
			var id=ids[i];
			doms[id]=$id(id);
		}
	}
	

	var getDayNum=function(year,month){//根据年月获取该月的天数
		switch(month){
			case 1,3,5,7,8,10,12:{return 31;}
			case 4,6,9,11:return 30;
		}
		if(month==2){
			if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))	return 29;
			else	return 28;
		}
	}
	var hideAll=function(){
		x.showHide([doms.years,doms.months,doms.header,doms.days,doms.hours,doms.mins],false);
	}
	var showDay=function(){
		hideAll();
		x.showHide([doms.header,doms.days],true);
		
		var year=parseInt(doms.year.innerHTML);
		var month=parseInt(doms.month.innerHTML);
		var date=new Date();date.setFullYear(year);date.setMonth(month-1);date.setDate(1);
		var weekDay=date.getDay();//0-6代表星期
		if(weekDay==0)	weekDay=7;
		var daysNum=getDayNum(year,month);//一个月的天数
		var days=x.getChilds(doms.days);
		//确保星期显示正确
		for(var i=0;i<6;i++){
			if(i<weekDay-1)	days[i].style.display="block";
			else			days[i].style.display="none";
		}
		//确保时间显示正确
		for(var i=0;i<4;i++)			days[34+i].style.display="block";/*先显示*/
		for(var i=daysNum+1;i<32;i++)		days[i+6].style.display="none";/*29 30 31 这几日 该隐藏的隐藏掉*/
	}
	var render=function(){
		var container=$div("lov_calendar");
		container.innerHTML="<div id='lov_calendar_curr'><a id='lov_calendar_year'>2012</a>年<a id='lov_calendar_month'>12</a>月<a id='lov_calendar_day'>12</a>日<span id='lov_calendar_time'><a id='lov_calendar_hour'>12</a>:<a id='lov_calendar_min'>12</a></span></div><div id='lov_calendar_content'><p id='lov_calendar_years'><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a>1</a><a>2</a><a>3</a><a>19</a><a>20</a><a>4</a><a>5</a><a>6</a><a>0</a><a id='lov_calendar_ok'>ok</a><a>7</a><a>8</a><a>9</a><a id='lov_calendar_yearCurr'></a></p><p id='lov_calendar_months'></p><p id='lov_calendar_header'></p><p id='lov_calendar_days'></p><p id='lov_calendar_hours'></p><p id='lov_calendar_mins'></p></div>";
		document.body.appendChild(container);
		setDoms();
		doms.months.innerHTML="";
		doms.days.innerHTML="";
		for(var i=0;i<12;i++){
			var month=i+1;
			doms.months.innerHTML+="<a v="+month+">"+month+"月</a>";
		}
		for(var i=0;i<7;i++){
			var weekdays=["一","二","三","四","五","六","日"];
			var weekay=weekdays[i];
			doms.header.innerHTML+="<a value="+i+">"+weekay+"</a>";
		}
		for(var i=0;i<51;i++){
			var day=i-6;
			if(day<1||day>31)	day="";
			doms.days.innerHTML+="<a>"+day+"</a>";
		}
		for(var i=6;i<24+6;i++){
			var hour=i;
			if(i>23)	hour=i-24;
			doms.hours.innerHTML+="<a>"+hour+"</a>";
		}
		for(var i=0;i<60;i++){
			var m=i;
			if(i<10)	m="0"+i;
			doms.mins.innerHTML+="<a>"+i+"</a>";
		}
		/*细项的内容包括  月  天  小时  分钟  秒*/
		return container;
	}
	var init=function(conf){
		if(conf!=null)	cfg=conf;
		var lov_calendar=$("#lov_calendar");
		if(lov_calendar==null)	render();
		/*给dom变量赋值*/
		setDoms();
		if(cfg.mode=="date")	x.showHide(doms.time,false);

		var now=new Date();
		var year=now.getFullYear();
		var month=parseInt(now.getMonth());
		var day=parseInt(now.getDate());
		var hour=now.getHours();
		var min=now.getMinutes();
		month=month+1;
		
		x.getChilds(doms.days,5+day).className="active";
		doms.year.innerHTML=year;
		doms.month.innerHTML=month;
		doms.day.innerHTML=day;
		//if(day<10)	doms.day.innerHTML="0"+day;
		doms.hour.innerHTML=hour;
		if(hour<10)	doms.hour.innerHTML="0"+hour;
		doms.min.innerHTML=min;
		if(min<10)	doms.min.innerHTML="0"+min;
		x.bind(doms.year,"mouseover",e_year_enter);
		x.bind(doms.month,"mouseover",e_month_enter);
		x.bind(doms.day,"mouseover",e_day_enter);
		x.bind(doms.hour,"mouseover",e_hour_enter);
		x.bind(doms.min,"mouseover",e_min_enter);

		x.bind(doms.years,"click",e_years_click);
		x.bind(doms.months,"click",e_months_click);
		x.bind(doms.days,"click",e_days_click);
		x.bind(doms.hours,"click",e_hours_click);
		x.bind(doms.mins,"click",e_mins_click);

		/*根据当前年份 生成当前激活当前年份，当前月份*/
		for(var i=0;i<10;i++){
			x.getChilds(doms.years,i).innerHTML=year-5+i;
		}
		showDay();
	}
	x.e_min_enter=function(evt){			
		hideAll();
		x.showHide(doms.mins,true);
	}
	x.e_hour_enter=function(evt){			
		hideAll();
		x.showHide(doms.hours,true);
	}
	x.e_year_enter=function(evt){
		hideAll();
		x.showHide(doms.years,true);
	}
	x.e_day_enter=function(evt){
		hideAll();
		x.showHide([doms.header,doms.days],true);
	}
	x.e_month_enter=function(evt){
		hideAll();
		x.showHide(doms.months,true);
	}
	
	x.e_years_click=function(evt){
		var target=x.getTarget(evt);
		if(target.id=="lov_calendar_ok"){
			if(doms.yearCurr.innerHTML.length>0){
				doms.year.innerHTML=doms.yearCurr.innerHTML;
			}
			x.e_month_enter();
			return;
		}
		var year=target.innerHTML;
		if(year.length==4){/*长度为4 则直接返回*/
			doms.year.innerHTML=year;
			x.e_month_enter();
		}
		else{
			doms.yearCurr.innerHTML+=year;
			if(doms.yearCurr.innerHTML.length==4){
				doms.year.innerHTML=doms.yearCurr.innerHTML;
				setTimeout(x.e_month_enter,500);
			}
		}
	}
	x.e_months_click=function(evt){	
		var target=x.getTarget(evt);
		var month=target.getAttribute("v");
		$("#lov_calendar_month").innerHTML=month;
		showDay();/*展示天*/
	}
	
	var e_days_click=function(evt){//单击某天
		var target=x.getTarget(evt);
		if(target.innerHTML=="")	return;
		var year=parseInt(doms.year.innerHTML);
		var month=parseInt(doms.month.innerHTML);
		var selectDay=parseInt(target.innerHTML);
		doms.day.innerHTML=selectDay;

		if(month<10)	month="0"+month;
		if(selectDay<10)	selectDay="0"+selectDay;	
		var str=(year+"-"+month+"-"+selectDay);
		var str=(year+"-"+month+"-"+selectDay);
		if(cfg.mode=="date"){
			var lovDom=$("#lov_calendar");
			if(x.setFormAttr)		x.setFormAttr(lovDom.targetDom,{value:str});
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
		else{
			e_hour_enter();
		}
	}
	
	var e_hours_click=function(evt){
		var target=x.getTarget(evt);
		var hour=parseInt(target.innerHTML);
		if(hour<10)	hour="0"+hour;
		doms.hour.innerHTML=hour;
		e_min_enter();
	}
	var e_mins_click=function(evt){
		var target=x.getTarget(evt);
		var min=parseInt(target.innerHTML);
		if(min<10)		min="0"+min;	

		doms.min.innerHTML=min;
		var year=doms.year.innerHTML;
		var month=parseInt(doms.month.innerHTML);
		var day=parseInt(doms.day.innerHTML);
		var hour=parseInt(doms.hour.innerHTML);
		

		if(month<10)	month="0"+month;
		if(day<10)		day="0"+day;	
		if(hour<10)		hour="0"+hour;	
		var str1=(year+"-"+month+"-"+day);
		var str2=(hour+":"+min);
		var str;

		if(cfg.mode=="datetime"){
			str=str1+" "+str2;
			//alert(str);
		}
		var lovDom=$("#lov_calendar");
		if(x.setFormAttr)		x.setFormAttr(lovDom.targetDom,{value:str});
		if(x.closeLov!=null)	x.closeLov(lovDom);
	}

	x.genLov_calendar=function(conf){/*生成日期选择器*/
		init(conf);/*支持一个额外的配置,能指定是选择日期还是选择时间*/
		return $("#lov_calendar");
	}	
})(window);  (function(x){/*消息提示接口*/
	var initMsg=function(){/*初始化消息框*/
		var mask=$("#msgMask");
		if(mask==null){
			/*开始创建元素*/
			mask=$div("msgMask","msgmask");
			document.body.appendChild(mask);
			//var msg=$table(1,1);
//			msg.id="msgContainer";
//			msg.className="msg";
//			msg.rows[0].cells[0].innerHTML="<div id='msgDialog'><div id='msgTop'><div id='msgTitle'>出错提示信息</div><div id='msgClose'>&#xf00d;</div></div><div id='msgContent'></div><div id='msgFoot'><button  class='button blue' id='msgOK'>确认</button><button class='button gray' id='msgCancel'>取消</button></div></div></div>";
//			x.addChild(document.body,[mask,msg]);
			
		}
	}
	x.msgAlert=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.fn
		initMsg();
		var dialog=createDialog("msg");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","content");
		msgMain.innerHTML=cfg.content;
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		x.addChild(msgFoot,ok);
		//x.cssAdd(ok,["button","blue"]);
		x.bind(ok,'click',function(){
			hideMsg();
			cfg.okfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);
	}
	var createDialog=function(classname){
		var msg=$table(1,1);
		msg.id="msgContainer";
		msg.className=classname;
		x.addChild(document.body,msg);
		var dialog=$div("msgDialog");
		x.addChild(msg.rows[0].cells[0],dialog);
		return dialog;
	}
	var createMsgTop=function(cfg){
		var msgTop=$div("msgTop");
		var msgTitle=$div("msgTitle");
		msgTitle.innerHTML=cfg.title;
		var msgClose=$div("msgClose");
		msgClose.innerHTML="&#xf00d;";
		x.addChild(msgTop,[msgTitle,msgClose]);
		x.bind(msgClose,'click',hideMsg);
		return msgTop;
	}
	var createButtonOk=function(){
		var ok=$e("button");
		ok.id="msg_ok";
		ok.innerHTML="确认";
		ok.className="button blue";
		return ok;
	}
	var createButtonCancel=function(){
		var cancel=$e("button");
		cancel.id="msg_cancel";
		cancel.innerHTML="取消";
		cancel.className="button gray";
		return cancel;
	}
	var hideMsg=function(){
		var msgMask=$("#msgMask");
		if(msgMask){
			x.rmDom(msgMask);
		}
		var msg=$("#msgContainer");
		if(msg){
			x.rmDom(msg);
		}
	}
	x.msgConfirm=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.okfn
		//cfg.cancelFn
		initMsg();
		var dialog=createDialog("msg confirm");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","content");
		msgMain.innerHTML=cfg.content;
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		//x.cssAdd(ok,["button","blue"]);
		var cancel=createButtonCancel();
		x.addChild(msgFoot,[ok,cancel]);
		x.bind(ok,'click',function(){
			hideMsg();
			cfg.okfn();
		});
		x.bind(cancel,'click',function(){
			hideMsg();
			cfg.cancelfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);
	}
	x.msgPromot=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.okfn //(表单产生的数据)
		initMsg();
		var dialog=createDialog("msg");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","wfform");
		//out("content",cfg.content.length);
		var content=$table(cfg.content.length,2);
		x.addChild(msgMain,content);
		for(var i in cfg.content){
			var td1=content.rows[i].cells[0];
			td1.className="td1";
			td1.innerHTML=cfg.content[i].text;
			var td2=content.rows[i].cells[1];
			td2.className="td2";
			if(cfg.content[i].type==='textarea'){
				var textarea=$e("textarea");
				textarea.className="comment";
				x.addChild(td2,textarea);
			}else{
				var node=$div(null,"node");
				x.addChild(td2,node);
				
				for(var p in cfg.content[i].values){
					var span=$span();
					x.addChild(node,span);
					var input=$e("input");
					input.type=cfg.content[i].type;
					input.name=cfg.content[i].attr;
					input.value=cfg.content[i].values[p].value;
					var label=$e("label");
					label.innerHTML=cfg.content[i].values[p].name;
					x.addChild(span,[input,label]);
				}
			}
		}
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		//x.cssAdd(ok,["button","blue"]);
		var cancel=createButtonCancel();
		x.addChild(msgFoot,[ok,cancel]);
		x.bind(ok,'click',function(){
			var obj={};
			for(var i in cfg.content){
				var td2=content.rows[i].cells[1];
				if(cfg.content[i].type==='textarea'){
					var textarea=td2.childNodes[0];
					obj[cfg.content[i].attr]=textarea.value;
				}else{
					var value="";
					var inputs=td2.getElementsByTagName("input");
					for(var p=0;p<inputs.length;p++){
						if(inputs[p].checked){
							value+=inputs[p].value+";";
						}
					}
					obj[cfg.content[i].attr]=value.substring(0,value.length-1);
				}
			}
			hideMsg();
			cfg.okfn(obj);
		});
		x.bind(cancel,'click',function(){
			hideMsg();
			cfg.cancelfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);	
	}
})(window);
