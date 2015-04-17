(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
	var e_header_h_mousedown=function(evt){
		var grid=$1(".grid",this,0);
		var resizeStyle=x.getGridResizeStyle(grid,evt);
		var gridCfg=grid.gridCfg;
		gridCfg.resizeStyle	=resizeStyle;	/*调整列宽*/
		gridCfg.resizeCell	=x.getTarget(evt);
		gridCfg.lastX	=evt.clientX;
		gridCfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	x.genGridHeader=function(grid){
		var cfg=grid.gridCfg;
		var id=cfg.id
		var gridContainer=$div(id+"_container","gridContainer");
		var grid_1		=x.$div(id+"_1","top_left");
		var grid_2		=x.$div(id+"_2","top_right");
		var grid_3		=x.$div(id+"_3","center_left");
		var grid_4		=x.$div(id+"_4","center_right");
		
		
		var header_bg	=x.$div(id+"_header","header_bg");
		var header_bg2	=x.$div(id+"_header","header_bg2");

		grid.appendChild(gridContainer);
		x.addChild(gridContainer,[grid_1,grid_2,grid_3,grid_4,header_bg,header_bg2]);
		
		x.bind(grid_1,		"click",		e_header_click);/*水平位移*/
		x.bind(grid_2,		"click",		e_header_click);/*水平位移*/
		x.bind(grid_2,		"mousedown",	e_header_h_mousedown);/*水平位移*/
		
		var frozenColumns=cfg.frozenColumns;
		var otherColumns=cfg.otherColumns;
		
		var t1			=$table(2,2+frozenColumns.length);/*表头左侧*/
		var t2			=$table(2,otherColumns.length);/*表头右侧*/
		grid_1.appendChild(t1);
		grid_2.appendChild(t2);
		t1.id=id+"_1table";
		t2.id=id+"_2table";
		x.cssAdd([t1.rows[1],t2.rows[1]],"filter");
		
		var w1=$div(null,"w01");
		var selectAll=$checkbox(id+"_selectAll","checkbox");
		w1.appendChild(selectAll);
		x.bind(selectAll,"click",e_selectAll_click);
		
		t1.rows[0].cells[0].className="w01";
		t1.rows[0].cells[1].className="w02";
		t1.rows[0].cells[0].appendChild(w1);
		var w2=$div(null,"w02");
		w2.innerHTML="序号";
		t1.rows[0].cells[1].appendChild(w2);
		t1.rows[1].cells[0].className="w01";
		t1.rows[1].cells[1].className="w02";
		t1.rows[1].cells[1].appendChild($div(null,"w02"));
		for(var i=0;i<frozenColumns.length;i++){/*固定列部分 表头被绘制出来*/
			var cell=x.$div(null,"cell");
			cell.innerHTML=frozenColumns[i].text;
			var input=x.$e("input");
			input.type="text";	input.className=" query cell"
			input.attr=frozenColumns[i].attr;
			input.datatype=frozenColumns[i].type;
			t1.rows[0].cells[i+2].columnDef=frozenColumns[i];
			if(frozenColumns[i].desc==null)	frozenColumns[i].desc="asc";
			t1.rows[0].cells[i+2].className=frozenColumns[i].desc;
			cell.style.width=frozenColumns[i].width+"px";
			input.style.width=frozenColumns[i].width+"px";
			
			t1.rows[0].cells[i+2].columnDef=frozenColumns[i];
			t1.rows[0].cells[i+2].appendChild(cell);
			t1.rows[1].cells[i+2].appendChild(input);


			x.bind(input,"click",function(evt){this.focus();})
			x.bind(input,"keydown",function(evt){if(evt.keyCode==13)filter_grid(grid)});			
		}
		for(var i=0;i<otherColumns.length;i++){/*其余列表头被绘制出来*/
			var cell=x.$div(null,"cell");
			cell.innerHTML=otherColumns[i].text;
			var input=x.$e("input");input.type="text";	input.className=" query cell"
			input.attr=otherColumns[i].attr;
			input.datatype=otherColumns[i].type;
			
			cell.style.width=otherColumns[i].width+"px";
			input.style.width=otherColumns[i].width+"px";
			
			if(otherColumns[i].desc==null)	otherColumns[i].desc="asc";
			t2.rows[0].cells[i].className=otherColumns[i].desc;
			t2.rows[0].cells[i].columnDef=otherColumns[i];
			t2.rows[0].cells[i].appendChild(cell);
			
			t2.rows[1].cells[i].appendChild(input);

			x.bind(input,"click",function(evt){this.focus();})
			x.bind(input,"keydown",function(evt){if(evt.keyCode==13)filter_grid(grid)});			
		}

		grid_2.style.left=x.getRect(grid_1).width+"px";
		grid_4.style.left=x.getRect(grid_1).width+"px";
		return gridContainer;
	}
	
	var e_selectAll_click=function(evt){
		var target=this;
		var flag=false;
		if(target.checked)	flag=true;
		var grid_3=$("#"+target.id.substr(0,target.id.lastIndexOf("_"))+"_3");
		var table=grid_3.childNodes[0];
		for(var i=0;i<table.rows.length;i++){
			table.rows[i].cells[0].childNodes[0].childNodes[0].checked=flag;
		}
	}
	var e_header_click=function(evt){/*如果表格当前处于调整列宽中  直接返回 不执行排序操作*/
		var target=x.getTarget(evt);
		if(target.tagName.toLowerCase()=="td")	return;
		var td=x.$1("td",target,0);
		var grid=x.$1(".grid",td,0);
		var columnDef=td.columnDef;
		if(columnDef&&columnDef.attr){
			if(columnDef.desc==null)		columnDef.desc="desc";
			else if(columnDef.desc=="desc")	columnDef.desc="asc";
			else if(columnDef.desc=="asc")	columnDef.desc="desc";
			
			td.className=columnDef.desc;
			grid.gridCfg.orderby=columnDef.attr+" "+columnDef.desc;
			x.genGridContent(grid);
		}
		else{
		}
	}
	
	
	var filter_grid=function(grid){
		/*对grid的内容进行筛选*/
		var id="#"+grid.gridCfg.id;
		var grid1=$(id+"_1");
		var grid2=$(id+"_2");
		var query1=$(".query",grid1,3);/*寻找筛选项*/
		var query2=$(".query",grid2,3);/*寻找筛选项*/
		var filter={};
		for(var i=0;i<query1.length;i++){
			var txt=query1[i];
			if(txt.value!=""){
				var obj={};
				obj.type=txt.datatype;/*文本框类型*/
				obj.value=txt.value;/*值*/
				filter[txt.attr]=obj;
			}
		}
		for(var i=0;i<query2.length;i++){
			var txt=query2[i];
			if(txt.value!=""){
				var obj={};
				obj.type=txt.datatype;/*文本框类型*/
				obj.value=txt.value;/*值*/
				filter[txt.attr]=obj;
			}
		}
		grid.gridCfg.currPage=1;
		grid.gridCfg.filter=filter;
		x.genGridContent(grid);
	}
	/*header区域的事件 主要为列宽调整事件*/
})(window);