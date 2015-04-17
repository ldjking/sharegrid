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
