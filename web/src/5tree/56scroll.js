(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	var e_scroll_v_mousedown=function(evt){
		//out("mousedown");
		var tree	=x.$1(".tree",this,0);
		var cfg=tree.treeCfg;
		cfg.treeScrollType="v";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	var e_scroll_h_mousedown=function(evt){
		var tree	=x.$1(".tree",this,0);
		var cfg=tree.treeCfg;
		cfg.treeScrollType="h";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	
	x.genTreeScroll=function(tree){/*为树生成滚动条*/
		//out("genTreeScroll");
		var cfg=tree.treeCfg;
		var id=cfg.id;/*有两部分滚动条要处理  1是内容部分 2是编辑器部分*/
		var treeContainer=$("#"+id+"_container");
		var scroll_h	=x.$div(id+"_scroll_h","scroll_h");
		var scrollbar_h	=x.$div(id+"_scrollbar_h","scrollbar_h");
		var scroll_v	=x.$div(id+"_scroll_v","scroll_v");
		var scrollbar_v	=x.$div(id+"_scrollbar_v","scrollbar_v");
		x.addChild(treeContainer,[scroll_h,scrollbar_h,scroll_v,scrollbar_v]);
		x.bind(scrollbar_h,	"mousedown",	e_scroll_h_mousedown);/*水平位移*/
		x.bind(scrollbar_v,	"mousedown",	e_scroll_v_mousedown);/*垂直位移*/
		//fixTreeScroll(tree);
	}
	
	x.fixTreeScroll=function(tree){
		var cfg			=tree.treeCfg;						/*grid的配置文件 里面同时存放各种状态参数*/
		var id="#"+cfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_content");			/*树的内容部分*/

		var treeWidth		=container.clientWidth;		/*tree的宽度*/
		var treeHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth+7;		/*宽度被默认加了12  如果没有垂直滚动条再减去12*/
		var contentHeight	=content.scrollHeight+7;	/*高度被默认加了12 如果没有水平滚动条再减去12*/
		
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>treeWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>treeHeight;  	/*if_scroll_v是否有垂直滚动条*/
		if(!if_scroll_h)	contentHeight-=7;
		if(!if_scroll_h)	contentWidth-=7;
		var scrollWidth		=treeWidth;							/*滚动区域宽度*/
		var	scrollHeight	=treeHeight;						/*滚动区域高度*/
		if(if_scroll_h)		scrollHeight-=7;			/*如果有水平滚动条  滚动高度=树高度-12*/
		if(if_scroll_v)		scrollWidth-=7;			/*如果有水平滚动条  滚动高度=树高度-12*/
		
		
		var barWidth		=Math.floor(treeWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(treeHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		
		//out("barHeight",barHeight);
		
		var contentTop		=-x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=-x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-treeWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-treeHeight;			/*内容上边距最大值*/
		//if(if_scroll_v)		contentLeft_max	+=7;/*如果有垂直滚动条 maxLeft+7*/
		//if(if_scroll_h)		contentTop_max	+=7;
	
		var barTop		=barTop_max*contentTop/contentTop_max;			/*最终的滚动条上边距*/
		var barLeft		=barLeft_max*contentLeft/contentLeft_max;		/*最终的滚动条左边距*/
		x.showHide([scroll_h,scrollbar_h],if_scroll_h);			/*隐藏或者显示水平滚动条*/
		x.showHide([scroll_v,scrollbar_v],if_scroll_v);			/*隐藏或者显示垂直滚动条*/

		if(if_scroll_h){/*水平滚动*/											
			//scroll_h.style.width	=scrollWidth+"px";				/*水平滚动区域的宽度*/
			scrollbar_h.style.width	=barWidth+"px";				/*水平滚动条的宽度*/
			scrollbar_h.style.left	=barLeft+"px";				/*水平滚动条的相对位置*/
		}
		else
		{
			content.style.left="0px";
		}
		if(if_scroll_v){/*垂直滚动*/
			//scroll_v.style.height		=scrollHeight+"px";		/*垂直滚动区域的高度*/		
			scrollbar_v.style.height=barHeight+"px";		/*垂直滚动条的高度*/
			scrollbar_v.style.top=barTop+"px";			/*垂直滚动条的相对位置*/
		}
		else{
			content.style.top="0px";
		}
	}
})(window);
