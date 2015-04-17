(function(x){	/*grid	效果 带分页 带滚动条*/
	x.genGrid=function(cfg,columns,cmds,datas){/*输出一个grid出来*/
		if(cfg.data_method!=null){
			var result=$$(cfg.data_method,{pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.pagenum});
			if(result.flag)	{
				cfg.datas=result.data;
				cfg.total=result.total;
				cfg.totalPage=Math.ceil(cfg.total/cfg.pageSize);
				cfg.currPage=result.page;
			}
		}
		var frozenColumns=[],otherColumns=[];
		for(var i=0;i<columns.length;i++){
			var c=columns[i];
			if(c.width==null)	c.width=120;
			if(c.frozen)	frozenColumns.push(c);
			else			otherColumns.push(c);
		}
		cfg.frozenColumns=frozenColumns;
		cfg.otherColumns=otherColumns;
		cfg.cmds=cmds;
		cfg.id=x.getId("grid");
		var grid=cfg.dom;
		grid.gridCfg=cfg;
		
		x.cssAdd(grid,"grid tree");
		if(cfg.filterMode)	x.cssAdd(grid,"filterMode");
		if(cfg.multiMode)	x.cssAdd(grid,"multiMode");

		/*现在结构建立起来*/
		var cmdbar=x.genGridCmd(grid);
		var gridContainer=x.genGridHeader(grid);
		x.uiLayout({dom:gridContainer,container:grid,dx:0,dy:1,ydoms:[cmdbar]});	

		x.genGridPager(grid);
		x.genGridScroll(grid);
		var gridContent=x.genGridContent(grid,true);
		x.regResizeHanlder(grid,x.fixGridScroll);
		x.uiGrid(grid);
		return grid;
	}

})(window);