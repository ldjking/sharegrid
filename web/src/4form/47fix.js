(function(x){	/*注册grid的一些全局事件*/
	x.fixFormScroll=function(form){
		var cfg			=form.formCfg;						/*grid的配置文件 里面同时存放各种状态参数*/
		var id="#"+cfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_doc");
		
		//out("fixForm scroll");
	    //out("clientWidth",container.clientWidth);
		//out("clientHeight",container.clientHeight);
		//out("scrollWidth",container.scrollWidth);
		//out("scrollHeight",container.scrollHeight);

		var formWidth		=container.clientWidth	/*grid的宽度*/
		var formHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;

		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>formWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>formHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=formWidth-12;					/*滚动区域宽度*/
		var	scrollHeight	=formHeight;					/*滚动区域高度*/
		
		var barWidth		=Math.floor(formWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(formHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		
		//out("barHeight",barHeight);
		
		var contentTop		=-x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=-x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-formWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-formHeight;			/*内容上边距最大值*/
		
	
		var barTop		=barTop_max*contentTop/contentTop_max;			/*最终的滚动条上边距*/
		var barLeft		=barLeft_max*contentLeft/contentLeft_max;		/*最终的滚动条左边距*/
		
		x.showHide([scrollbar_h],if_scroll_h);			/*隐藏或者显示水平滚动条*/
		x.showHide([scrollbar_v],if_scroll_v);			/*隐藏或者显示垂直滚动条*/

		if(if_scroll_h){/*水平滚动*/											
			//scroll_h.style.width	=scrollWidth+"px";				/*水平滚动区域的宽度*/
			scrollbar_h.style.width	=barWidth+"px";				/*水平滚动条的宽度*/
			scrollbar_h.style.left	=barLeft+"px";				/*水平滚动条的相对位置*/
		}
		if(if_scroll_v){/*垂直滚动*/
			//scroll_v.style.height		=scrollHeight+"px";		/*垂直滚动区域的高度*/		
			scrollbar_v.style.height	=barHeight+"px";		/*垂直滚动条的高度*/
			scrollbar_v.style.top		=barTop+"px";			/*垂直滚动条的相对位置*/
		}
	}
})(window);