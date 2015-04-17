(function(x){	/*form	效果*/
	var e_form_mousemove=function(evt){/**/
		var form		=this;
		var target		=x.getTarget(evt);
		var formCfg		=form.formCfg;						/*form的配置文件 里面同时存放各种状态参数*/
		var id="#"+formCfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_doc");
		
		var formWidth		=container.clientWidth;	/*form的宽度*/
		var formHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;
		
		if(contentHeight>formHeight)	contentWidth	=contentWidth-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>formWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>formHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=formWidth-12;			/*滚动区域宽度*/
		var	scrollHeight	=formHeight;						/*滚动区域高度*/
		
		var barWidth		=Math.floor(formWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(formHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		
		var barLeft_max		=formWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		//out("barHeight"+barHeight+"scrollHeight"+scrollHeight+"content");
		var contentTop		=x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-formWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-formHeight;			/*内容上边距最大值*/
		
		if(formCfg.scrollType=="v"){
			if(formCfg.lastY!=null){
				var d			=evt.clientY-formCfg.lastY;
				if(formCfg.last_barTop==null)	formCfg.last_barTop=x.toNum(x.getStyle(scrollbar_v).top);
				var barTop			=formCfg.last_barTop;
				barTop			=x.limitValue(barTop+d,0,barTop_max);
				var contentTop	=Math.floor(barTop*contentTop_max/barTop_max);
				scrollbar_v.style.top		=barTop+"px";
				content.style.top			=-contentTop+"px";
			}
			x.stopEvt(evt);

		}
		else if(formCfg.scrollType=="h"){
			if(formCfg.lastX!=null)	{
				var d			=evt.clientX-formCfg.lastX;
				if(formCfg.last_barLeft==null)	formCfg.last_barLeft=x.toNum(x.getStyle(scrollbar_h).left);
				var barLeft			=formCfg.last_barLeft;
				barLeft			=x.limitValue(barLeft+d,0,barLeft_max);
				var contentLeft	=barLeft*contentLeft_max/barLeft_max;
				scrollbar_h.style.left		=barLeft+"px";
				content.style.left			=-contentLeft+"px";
			}
			x.stopEvt(evt);

		}

	}
	var e_form_mousewheel=function(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
		var form=this;
		var cfg=form.formCfg;
		var id="#"+cfg.id;
		var container=$(id+"_container");
		var doc=$(id+"_doc");
		var rolled = x.getEvtRolled(evt)*4;
		var top=x.toNum(x.getStyle(doc).top);
		
		var clientHeight=container.clientHeight,scrollHeight=doc.scrollHeight;
		//out("clientHeight"+clientHeight+"scrollHeight"+scrollHeight);
		var minTop=clientHeight-scrollHeight;
		//minTop-=26;
		if(minTop>0)	minTop=0;
		var maxTop=0;
		
		var currTop=x.limitValue(top+rolled,minTop,maxTop);
		doc.style.top=currTop+"px";
		//out("form mouse wheel");
		x.fixFormScroll(form);
		x.stopEvt(evt);
	}
	
	var e_content_mousedown=function(evt){/*鼠标按下事件*/
		var cfg=this.parentNode.formCfg;
		if(cfg.lastSelectRow!=null){
			x.cssRm(cfg.lastSelectRow,"selectRow");
		}
	}
	
	var e_form_mouseup=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.formCfg;
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}
	var e_form_mouseleave=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.formCfg;
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}

	x.uiForm=function(form){/*为form注册全局事件*/
		var cfg=form.formCfg;
		var id="#"+cfg.id;
		var container=$(id+"_container");
		x.bind(form,		"mousemove",	e_form_mousemove);/*垂直位移*/
		x.bind(container,	"mousedown",	e_content_mousedown);/*水平位移*/
		x.bind(form,		"mouseup",		e_form_mouseup);/*水平位移*/
		x.bind(form,		"mouseleave",	e_form_mouseleave);/*水平位移*/
		x.bind(form,		"mousewheel",	e_form_mousewheel);
	}
	
})(window);