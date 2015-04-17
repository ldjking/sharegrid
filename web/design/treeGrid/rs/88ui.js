(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
	var e_grid_mousemove=function(evt){/*垂直滚动条内鼠标移动事件 只关心垂直滚动*/
		var grid		=this;
		var target		=x.getTarget(evt);
		var gridCfg		=grid.gridCfg;						/*grid的配置文件 里面同时存放各种状态参数*/
		var id="#"+gridCfg.id;
		var gridContainer=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var grid_1		=x.$(id+"_1");					/*grid第一区域  	左上角*/
		var grid_2		=x.$(id+"_2");					/*grid第二区域	表头*/
		var grid_3		=x.$(id+"_3");					/*grid第三区域	*/
		var grid_4		=x.$(id+"_4");					/*grid第二区域	表头*/

		var gridWidth		=gridContainer.clientWidth;	/*grid的宽度*/
		var gridHeight		=gridContainer.clientHeight;
		var grid1Height		=x.getRect(grid_1).height;
		var grid1width		=x.getRect(grid_1).width;

		var contentWidth	=gridWidth-grid1width;
		var contentHeight	=gridHeight-grid1Height-26;

		/*在有固定列的情况下 contentWidth的值显然出了问题*/
		var grid4Width		=grid_4.scrollWidth;		/*内容全文宽度*/
		var grid4Hheight	=grid_4.scrollHeight;		/*内容全文高度*/
		
		if(contentHeight<grid4Hheight)	contentWidth	=contentWidth-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth<grid4Width;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight<grid4Hheight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=gridWidth-grid1width-12;				/*滚动区域宽度*/
		var	scrollHeight	=contentHeight;						/*滚动区域高度*/
		
		var barWidth		=Math.floor(contentWidth*scrollWidth/grid4Width)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(scrollHeight*contentHeight/grid4Hheight)-2;	/*滚动条高度*/
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		var barLeft_dx		=grid1width;						/*滚动条左偏移量*/
		var barTop_dy		=32+1;	/*滚动条右偏移量*/
		if(x.cssContain(grid,"filterMode"))	barTop_dy+=(32+1);/*已经打开了筛选器*/	

		var contentTop		=x.toNum(x.getStyle(grid_4).marginTop);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(grid_4).marginLeft);	/*内容上边距*/
		var contentLeft_max	=contentWidth-grid4Width;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-grid4Hheight;			/*内容上边距最大值*/
		
		if(gridCfg.scrollType=="v"){
			if(gridCfg.lastY!=null){
				var d			=evt.clientY-gridCfg.lastY;
				var barTop		=0;
				if(gridCfg.last_barTop==null)	gridCfg.last_barTop=x.toNum(x.getStyle(scrollbar_v).top);
				barTop			=gridCfg.last_barTop-barTop_dy;
				barTop			=x.limitValue(barTop+d,0,barTop_max);
				var contentTop	=Math.floor(barTop*contentTop_max/barTop_max);
				scrollbar_v.style.top		=barTop+barTop_dy+"px";
				grid_4.style.marginTop		=contentTop+"px";
				grid_4.style.marginBottom	=-contentTop+"px";
				grid_3.style.marginTop		=contentTop+"px";
				grid_3.style.marginBottom	=-contentTop+"px";
			}
		}
		else if(gridCfg.scrollType=="h"){
			if(gridCfg.lastX!=null)	{
				var d			=evt.clientX-gridCfg.lastX;
				var barLeft		=0;
				if(gridCfg.last_barLeft==null)	gridCfg.last_barLeft=x.toNum(x.getStyle(scrollbar_h).left);
				barLeft			=gridCfg.last_barLeft-barLeft_dx;
				barLeft			=x.limitValue(barLeft+d,0,barLeft_max);
				var contentLeft	=barLeft*contentLeft_max/barLeft_max;
				scrollbar_h.style.left		=barLeft+barLeft_dx+"px";
				grid_4.style.marginLeft		=contentLeft+"px";
				grid_4.style.marginRight	=-contentLeft+"px";
				grid_2.style.marginLeft		=contentLeft+"px";
				grid_2.style.marginRight	=-contentLeft+"px";
			}
		}
		
		if(gridCfg.resizeStyle==null||gridCfg.resizeStyle==""){
			var resizeStyle=getGridResizeStyle(grid,evt);
			////out("resizeStyle",resizeStyle);
			x.cssRm(grid,["resizeL11","resizeL12"]);
			if(resizeStyle!=null&&resizeStyle!=""){
				x.cssAdd(grid,resizeStyle);
			}
		}
		else{/*已经处于调整列宽状态*/
			var dx=evt.clientX-gridCfg.lastX;
			var dy=evt.clientY-gridCfg.lastY;
			resizeColumnWidth(gridCfg,dx);
			x.fixGridScroll(grid);		
		}
		
		if(x.inDom(target,grid_4)){/*鼠标滑动	设置当前行样式*/
			////out("in dom grid_4");
			var tr=x.$1("tr",target,0);
			var p=x.getDomIndex(tr);
			var trs=$("tr",grid_3,3);
			if(gridCfg.hoverRow!=null){
				x.cssRm(gridCfg.hoverRow,"hover");
				gridCfg.hoverRow=null;
			}
			if(gridCfg.hoverRow_header!=null){
				x.cssRm(gridCfg.hoverRow_header,"hover");
				gridCfg.hoverRow_header=null;
			}
			if(tr.className==""){
				x.cssAdd(tr,"hover");
				x.cssAdd(trs[p],"hover");
				gridCfg.hoverRow=trs[p];
				gridCfg.hoverRow_header=tr;
			}
		}
		else if(x.inDom(target,grid_3)){
			//return;
			/*在垂直表头区域移动*/
			var tr=x.$1("tr",target,0);
			var p=x.getDomIndex(tr);
			var trs=$("tr",grid_4,3);
			if(gridCfg.hoverRow!=null){
				x.cssRm(gridCfg.hoverRow,"hover");
				gridCfg.hoverRow=null;
			}
			if(gridCfg.hoverRow_header!=null){
				x.cssRm(gridCfg.hoverRow_header,"hover");
				gridCfg.hoverRow_header=null;
			}
			if(tr.className==""){
				x.cssAdd(tr,"hover");
				x.cssAdd(trs[p],"hover");
				gridCfg.hoverRow=trs[p];
				gridCfg.hoverRow_header=tr;
				
			}
			
		}
		x.stopEvt(evt);
	}
	var e_grid_mousewheel=function(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
		var grid=this;
		var id="#"+grid.gridCfg.id;
		var grid_1		=x.$(id+"_1");					/*grid第一区域  	左上角*/
		var grid_2		=x.$(id+"_2");					/*grid第二区域	表头*/
		var grid_3		=x.$(id+"_3");					/*grid第三区域	*/
		var grid_4		=x.$(id+"_4");					/*grid第四区域	内容*/
		var rolled = x.getEvtRolled(evt);
		var marginTop=x.toNum(x.getStyle(grid_3).marginTop);
		var clientHeight=grid.clientHeight-39-32-26-2,scrollHeight=grid_4.scrollHeight;
		if(x.cssContain(grid,"filterMode"))	clientHeight-=(32+1);/*已经打开了筛选器*/	
		var minTop=clientHeight-scrollHeight;
		//minTop-=26;
		if(minTop>0)	minTop=0;
		var maxTop=0;
		
		marginTop=x.limitValue(marginTop+rolled,minTop,maxTop);
		grid_3.style.marginTop=marginTop+"px";
		grid_3.style.marginBottom=(-marginTop)+"px";
		grid_4.style.marginTop=marginTop+"px";
		grid_4.style.marginBottom=(-marginTop)+"px";
		x.fixGridScroll(grid);
		x.stopEvt(evt);
	}
	var e_grid_mouseup=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.gridCfg;
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}
	var e_grid_mouseleave=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.gridCfg;
		if(g.hoverRow!=null){
			x.cssRm(g.hoverRow,"hover");
		}
		if(g.hoverRow_header!=null){
			x.cssRm(g.hoverRow_header,"hover");
		}
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}
	var e_grid_keyclick=function(evt){
		/*这里关心上下的选择  上键是38  下键是40*/
		var grid=this;
		var keyCode=evt.keyCode;
		if(keyCode==38){
			x.selectGridRow(grid,-1);
		}
		else if(keyCode==40){
			x.selectGridRow(grid,1);
		}
	}
	
	x.getGridResizeStyle=function(grid,evt){
		var style="";
		var id="#"+grid.gridCfg.id;
		var grid_2		=x.$(id+"_2");					/*grid第二区域	表头*/
		var target=x.getTarget(evt);
		if(x.inDom(target,grid_2)){/*如果是在表头范围内移动*/
			/*要判断元素是否位于表头  第一行 或者第一列*/
			var isFirstRow=false;/*是否为第一行*/
			var isFirstCol=false;/*是否为第一列*/
			var td=x.$1("td",target,0);
			var tr=x.$1("tr",target,0);
			if(td!=null){
				if(x.getDomIndex(td)==0)	isFirstCol=true;
				if(x.getDomIndex(tr)==0)	isFirstRow=true;
				
				var rect=x.getRect(td);
				var px=evt.clientX;
				var py=evt.clientY;
				var gap=10;
				//var flag1=rect.top+gap>py;					/*在上范围内*/
				var flag2=rect.top+rect.height<py+gap;			/*在下范围内*/
				//var flag3=rect.left+gap>px;					/*在左范围内*/
				var flag4=rect.left+rect.width<px+gap;			/*在右范围内*/
				//if(flag2&&isFirstCol)	style="resizeL11";	/*上下调整  需要是第一列  grid暂不支持调整行高*/
				if(flag4&&isFirstRow)	style="resizeL12";
			}
		}
		return style;
	}
	
	var resizeColumnWidth=function(gridCfg,dx){
		var resizeCell=gridCfg.resizeCell;
		var td=x.$1("td",resizeCell,0);
		var cells=getSameColumnCell(td);
		var texts=x.$(".cell",cells,3);
		if(gridCfg.lastCellWidth==null)	gridCfg.lastCellWidth=x.getRect(td).width;
		var width=gridCfg.lastCellWidth;
		var newWidth=width-20+dx;
		if(newWidth<40)		newWidth=40;
		if(newWidth>600)	newWidth=600;
		for(var i=0;i<texts.length;i++){
			var text=texts[i];
			text.style.width=newWidth+"px";
			if(i==0&&text.parentNode.columnDef!=null){
				text.parentNode.columnDef.width=newWidth;
			}
			text.style.height=texts[i].scrollHeight+"px";
		}

		x.fixGrid(gridCfg.dom);
		//x.setDomSize(divs,newWidth,null);
	}
	
	var getSameColumnCell=function(dom){
		var grid=$1(".grid",dom,0);
		var id="#"+grid.gridCfg.id;
		var cell=x.$1(".cell",dom,2);
		var p=x.getDomIndex(dom);
		var trs=$("tbody tr",$(id+"_4table"),2);			/*兄弟节点中查找所有tr元素*/
		var trs2=$("tbody tr",$(id+"_2table"),2);		/*兄弟节点中查找所有tr元素*/

		var cells=[];
		var divs=[];
		for(var i=0;i<trs.length;i++){
			cells.push(x.getChilds(trs[i],p));
		}
		for(var i=0;i<trs2.length;i++){
			cells.push(x.getChilds(trs2[i],p));
		}
		return cells;
	}
	
	x.uiGrid=function(grid){/*为grid注册全局事件*/
		var cfg=grid.gridCfg;
		var id="#"+cfg.id;
		x.bind(grid,		"mousemove",	e_grid_mousemove);/*垂直位移*/
		x.bind(grid,		"mouseup",		e_grid_mouseup);/*水平位移*/
		x.bind(grid,		"mouseleave",	e_grid_mouseleave);/*水平位移*/
		x.bind(grid,		"keyup",		e_grid_keyclick);/*水平位移*/
		x.bind(grid,		"mousewheel",	e_grid_mousewheel);
	}
	
})(window);