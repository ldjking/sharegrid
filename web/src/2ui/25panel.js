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
