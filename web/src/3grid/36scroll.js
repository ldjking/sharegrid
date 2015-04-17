(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/

	var e_scroll_v_mousedown=function(evt){
		var grid	=x.$1(".grid",this,0);
		var gridCfg=grid.gridCfg;
		gridCfg.scrollType="v";
		gridCfg.lastX	=evt.clientX;
		gridCfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	var e_scroll_h_mousedown=function(evt){
		var grid	=x.$1(".grid",this,0);
		var gridCfg=grid.gridCfg;
		gridCfg.scrollType="h";
		gridCfg.lastX	=evt.clientX;
		gridCfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	x.scrollGrid=function(grid,dx,dy){
		/*让网格内容滚动以便于将输入框完整呈现出来  dx水平方向位移  dy垂直方向位移*/
		var cfg=grid.gridCfg;
		var id="#"+cfg.id;
		var grid_2=$(id+"_2");
		var grid_3=$(id+"_3");
		var grid_4=$(id+"_4");
		var contentTop		=x.toNum(x.getStyle(grid_4).marginTop);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(grid_4).marginLeft);	/*内容上边距*/
		contentTop	-=dy;
		contentLeft	-=dx;
		grid_4.style.marginTop		=contentTop+"px";
		grid_4.style.marginBottom	=-contentTop+"px";
		grid_3.style.marginTop		=contentTop+"px";
		grid_3.style.marginBottom	=-contentTop+"px";
		grid_4.style.marginLeft		=contentLeft+"px";
		grid_4.style.marginRight	=-contentLeft+"px";
		grid_2.style.marginLeft		=contentLeft+"px";
		grid_2.style.marginRight	=-contentLeft+"px";
		x.fixGridScroll(grid);
	}
	x.genGridScroll=function(grid){
		/*生成网络对象的滚动条*/
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var gridContainer=$("#"+id+"_container");
		var scroll_h	=x.$div(id+"_scroll_h","scroll_h");
		var scrollbar_h	=x.$div(id+"_scrollbar_h","scrollbar_h");
		var scroll_v	=x.$div(id+"_scroll_v","scroll_v");
		var scrollbar_v	=x.$div(id+"_scrollbar_v","scrollbar_v");
		x.addChild(gridContainer,[scroll_h,scrollbar_h,scroll_v,scrollbar_v]);
		x.bind(scrollbar_h,	"mousedown",	e_scroll_h_mousedown);/*水平位移*/
		x.bind(scrollbar_v,	"mousedown",	e_scroll_v_mousedown);/*垂直位移*/
	}
})(window);