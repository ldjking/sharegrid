(function(x){	/*注册repeater的一些全局事件*/
	x.fixRepeater=function(repeater){
		/*	1.修正表头列的宽度		列宽		要求所有表头列必须有宽度  如果没有，则提供默认宽度120
			2.修正数据行的高度		行高		
			3.修正滚动条			滚动条
		*/
		var cfg		=repeater.repeaterCfg;
		var id		=cfg.id;
		var repeater1	=$("#"+id+"_1");
		var repeater2	=$("#"+id+"_2");
		var repeater3	=$("#"+id+"_3");
		var repeater4	=$("#"+id+"_4");
		var table1	=$("#"+id+"_1table");
		var table2	=$("#"+id+"_2table");
		var table3	=$("#"+id+"_3table");
		var table4	=$("#"+id+"_4table");
		/*重新修正表头*/
		////out("table3",table3.rows[0]);
		if(table3.rows[0]==null)	return;
		if(table3==null&&table3.rows.length==0)	return;
		for(var i=0;i<table1.rows[0].cells.length;i++){
			var rect=x.getRect(table3.rows[0].cells[i]);
			////out("列"+i+" rect.width",rect.width);
			/*让宽度渐变调整*/
			//fxResize(table1.rows[0].cells[i].childNodes[0],rect.width-21);
			table1.rows[0].cells[i].childNodes[0].style.width=rect.width-21+"px";
		}
		
		/*cfg可选模式  自适应列宽  autoWidth   这里不得不考虑最大宽度问题*/
		
		/*修正左右问题*/
		repeater4.style.left=repeater3.clientWidth+"px";
		repeater2.style.left=repeater3.clientWidth+"px";
		repeater4.style.marginLeft=repeater2.style.marginLeft;
		
		/*修正表头列的宽度			列宽已经不需要操心了  如果没有设置列宽 将会有默认列宽*/

		/*修正行的高度*/
		/*修正一行的高度 比较复杂  需要遍历找出最高的textarea值*/
		for(var i=0;i<table3.rows.length;i++){/*有些列可能要自动行高*/
			var heightMax=0;
			for(var j=2;j<cfg.frozenColumns.length+2;j++){
				var text=table3.rows[i].cells[j].childNodes[0];
				if(heightMax<text.scrollHeight)	heightMax=text.scrollHeight+10;
			}
			for(var j=0;j<cfg.otherColumns.length;j++){
				var text=table4.rows[i].cells[j].childNodes[0];
				if(heightMax<text.scrollHeight)	heightMax=text.scrollHeight+10;
				////out("text.scrollHeight",text.scrollHeight);
			}
			////out("row["+i+"].heightMax",heightMax);
			table3.rows[i].style.height=heightMax+"px";
			table4.rows[i].style.height=heightMax+"px";
			//var heightMax=
			//var height1=x.getRect(table3.rows[i]).height;
			//var height2=x.getRect(table4.rows[i]).height;
			//if(height1<height2)	table3.rows[i].style.height=height2+"px";
			//if(height1>height2)	table4.rows[i].style.height=height1+"px";
		}
	}
	
	x.fixRepeaterScroll=function(repeater){
		var repeaterCfg		=repeater.repeaterCfg;						/*repeater的配置文件 里面同时存放各种状态参数*/
		var id="#"+repeaterCfg.id;
		var repeaterContainer=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var repeater_1		=x.$(id+"_1");					/*repeater第一区域  	左上角*/
		var repeater_2		=x.$(id+"_2");					/*repeater第二区域	表头*/
		var repeater_3		=x.$(id+"_3");					/*repeater第三区域	*/
		var repeater_4		=x.$(id+"_4");					/*repeater第二区域	表头*/
		var table_4		=x.$(id+"_4table");					/*repeater第二区域	表头*/

		var repeaterWidth		=x.toNum(repeaterContainer.style.width);	/*repeater的宽度*/
		var repeaterHeight		=x.toNum(repeaterContainer.style.height);
		var repeater1Height		=x.getRect(repeater_1).height;
		var repeater1width		=x.getRect(repeater_1).width;

		var contentWidth	=repeaterWidth-repeater1width;
		var contentHeight	=repeaterHeight-repeater1Height-26;

		/*在有固定列的情况下 contentWidth的值显然出了问题*/
		var repeater4Width		=x.getRect(table_4).width;		/*内容全文宽度*/
		var repeater4Hheight	=x.getRect(table_4).height;		/*内容全文高度*/
		
		if(contentHeight<repeater4Hheight)	contentWidth	=contentWidth-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth<repeater4Width;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight<repeater4Hheight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=repeaterWidth-repeater1width-12;				/*滚动区域宽度*/
		var	scrollHeight	=contentHeight;						/*滚动区域高度*/
		
		var barWidth		=Math.floor(contentWidth*scrollWidth/repeater4Width)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(scrollHeight*contentHeight/repeater4Hheight)-2;	/*滚动条高度*/
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		var barLeft_dx		=repeater1width;						/*滚动条左偏移量*/
		var barTop_dy		=32+1;	/*滚动条右偏移量*/
		if(x.cssContain(repeater,"filterMode"))	barTop_dy+=(32+1);/*已经打开了筛选器*/	

		var contentTop		=x.toNum(x.getStyle(repeater_4).marginTop);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(repeater_4).marginLeft);	/*内容上边距*/
		var contentLeft_max	=contentWidth-repeater4Width;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-repeater4Hheight;			/*内容上边距最大值*/
		
		if(contentLeft<contentLeft_max){/*也许由于调整列宽的关系造成这种情况出现*/
			contentLeft=contentLeft_max;
			if(contentLeft>0)	contentLeft=0;
			repeater_4.style.marginLeft		=contentLeft+"px";
			repeater_4.style.marginRight	=-contentLeft+"px";
			repeater_2.style.marginLeft		=contentLeft+"px";
			repeater_2.style.marginRight	=-contentLeft+"px";
		}
		if(contentTop<contentTop_max){/*也许由于调整列宽的关系造成这种情况出现*/
			contentTop=contentTop_max;
			if(contentTop>0)	contentTop=0;
			repeater_4.style.marginTop		=contentTop+"px";
			repeater_4.style.marginBottom	=-contentTop+"px";
			repeater_3.style.marginTop		=contentTop+"px";
			repeater_3.style.marginBottom	=-contentTop+"px";
		}

		if(repeaterCfg.lastWidth!=null){/*高度或者宽度发生了变化 	判断是变大还是变小*/
			var lastWidth	=repeaterCfg.lastWidth;
			var lastHeight	=repeaterCfg.lastHeight;
			if(lastWidth<contentWidth){/*变大了*/
				if((lastWidth+12)==contentWidth)	;/*由于垂直滚动条的消失 造成的问题 在这里fix*/
				else{
					contentLeft	+=(contentWidth-lastWidth);
					if(contentLeft>0)	contentLeft	=0;
					repeater_4.style.marginLeft		=contentLeft+"px";
					repeater_4.style.marginRight	=-contentLeft+"px";
					repeater_2.style.marginLeft		=contentLeft+"px";
					repeater_2.style.marginRight	=-contentLeft+"px";
				}
			}
			if(lastHeight<contentHeight){/*变高了*/
				contentTop	+=(contentHeight-lastHeight);
				if(contentTop>0)	contentTop	=0;
				repeater_4.style.marginTop		=contentTop+"px";
				repeater_4.style.marginBottom	=-contentTop+"px";
				repeater_3.style.marginTop		=contentTop+"px";
				repeater_3.style.marginBottom	=-contentTop+"px";
			}
		}
		repeaterCfg.lastWidth	=contentWidth;		/*记录当前最新宽度*/
		repeaterCfg.lastHeight	=contentHeight;		/*记录当前最新高度*/
		var barTop		=barTop_max*contentTop/contentTop_max+barTop_dy;			/*最终的滚动条上边距*/
		var barLeft		=barLeft_max*contentLeft/contentLeft_max+barLeft_dx;		/*最终的滚动条左边距*/
		
		x.showHide([scroll_h,scrollbar_h],if_scroll_h);			/*隐藏或者显示水平滚动条*/
		x.showHide([scroll_v,scrollbar_v],if_scroll_v);			/*隐藏或者显示垂直滚动条*/

		if(if_scroll_h){/*水平滚动*/											
			scroll_h.style.width	=scrollWidth+"px";				/*水平滚动区域的宽度*/
			scrollbar_h.style.width	=barWidth+"px";				/*水平滚动条的宽度*/
			scrollbar_h.style.left	=barLeft+"px";				/*水平滚动条的相对位置*/
		}
		if(if_scroll_v){/*垂直滚动*/
			scroll_v.style.height		=scrollHeight+"px";		/*垂直滚动区域的高度*/		
			scrollbar_v.style.height	=barHeight+"px";		/*垂直滚动条的高度*/
			scrollbar_v.style.top		=barTop+"px";			/*垂直滚动条的相对位置*/
		}
	}
})(window);