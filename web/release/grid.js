(function(x){	/*grid	效果 带分页 带滚动条*/
	x.genGrid=function(dom,cfg){/*输出一个grid出来*/
		//out("genGrid");
		x.unitStart=new Date();
		var cmds=cfg.cmds;
		var columns=cfg.columns;
		cfg.dom=dom;
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
		
		
		x.cssAdd(grid,"grid");
		if(cfg.treeCfg)		x.cssAdd(grid,"tree");
		if(cfg.filterMode)	x.cssAdd(grid,"filterMode");
		if(cfg.multiMode)	x.cssAdd(grid,"multiMode");

		/*现在结构建立起来*/
		var cmdbar=x.genGridCmd(grid);
		var gridContainer=x.genGridHeader(grid);
		x.uiLayout({dom:gridContainer,container:grid,dx:0,dy:1,ydoms:[cmdbar]});	
		x.genGridNav(grid);/*生成grid的导航栏*/
		
		x.genGridPager(grid);
		x.genGridScroll(grid);

		var gridContent=x.genGridContent(grid,true);
		x.regResizeHanlder(grid,x.fixGridScroll);
		x.uiGrid(grid);
		return grid;
	}
})(window);(function(x){
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		/*step1	执行校验*/
		if(target.cmd!=null){
			/*将选中数据发送给校验函数 判断当前用户是否有操作权限*/
			if(target.cmd.check!=null){
				x.$$(target.cmd.check,null,false,function(result){
						/*执行校验*/
					});
			}
			else{
				/*step2	执行默认命令的操作*/
				if(target.cmd.cmd=="cmdLock")			e_lock_click(evt);
				else if(target.cmd.cmd=="cmdAddItem")	e_addItem_click(evt);
				else if(target.cmd.cmd=="cmdRmItem")	e_rmItem_click(evt);
				else if(target.cmd.cmd=="cmdCommit")	e_commit_click(evt);
				else if(target.cmd.cmd=="cmdFilter")	e_filter_click(evt);
				else if(target.cmd.cmd=="cmdRefresh")	e_refresh_click(evt);
				else if(target.cmd.cmd=="cmdDelete")	e_delete_click(evt);
				else if(target.cmd.cmd=="cmdNav")		e_nav_click(evt);
	
				/*step3 执行自定义命令*/
	
				if(target.cmd.fn!=null){
					var fn=target.cmd.fn;
					fn(target);
				}
			}
		}
		
	}
	var e_nav_click=function(evt){/*打开导航栏*/
		//out("nav click");	
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var cfg=grid.gridCfg;
		var container=x.$("#"+cfg.id+"_container");

		if(cfg.navState){
			x.hideGridNav(grid);
		}
		else{
			x.showGridNav(grid);;/*进入导航状态*/
			
		}
	}
	
	var e_delete_click=function(evt){
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var cfg=grid.gridCfg;
		if(cfg.activeRow!=null){
			/*删除选中数据*/
			var obj=cfg.activeRow.obj;
			var param={};
			param[cfg.pkAttr]=obj[cfg.pkAttr];
			x.$$(cfg.rmMethod,param,false,function(result){
					if(result.flag)	x.genGridContent(grid);
				});/*删除后不应该执行刷新操作 而应该重绘内容  减少回发数据*/
		}
	}
	
	var e_addItem_click=function(evt){/*新增一项*/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		x.addGridRow(grid);
	}
	var e_rmItem_click=function(evt){/*删除一项*/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		x.rmGridRow(grid);
	}
	var e_lock_click=function(evt){/**/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var id="#"+grid.gridCfg.id+"_";
		var cmd_addItem	=x.$(id+"cmdAddItem");
		var cmd_rmItem	=x.$(id+"cmdRmItem");
		var cmd_commit	=x.$(id+"cmdCommit");
		var flag=grid.gridCfg.editMode;
		if(flag){
			x.closeGridEdit(grid);
			target.className="lock";
			x.cssAdd([cmd_addItem,cmd_rmItem,cmd_commit],"gray");
		}
		else{
			x.makeGridEdit(grid);
			target.className="unlock";
			x.cssRm([cmd_addItem,cmd_rmItem,cmd_commit],"gray");
		}
	}
	var e_commit_click=function(evt){/*更新grid*/
		var grid=$1(".grid",x.getTarget(evt),0);
		saveGridChange(grid);
	}
	
	var e_filter_click=function(evt){/*数据筛选*/
		var grid=$1(".grid",x.getTarget(evt),0);
		if(grid.gridCfg.filterMode) x.closeGridFilter(grid);/*已经是筛选模式*/
		else	x.openGridFilter(grid);
	}
	var e_refresh_click=function(evt){/*刷新*/
		var grid=$1(".grid",x.getTarget(evt),0);
		var cfg=grid.gridCfg;
		var table1=$("#"+cfg.id+"_1table");
		var table2=$("#"+cfg.id+"_2table");
		for(var i=2;i<table1.rows[1].cells.length;i++){
			var query=table1.rows[1].cells[i].childNodes[0];
			query.value="";
		}
		for(var i=0;i<table2.rows[1].cells.length;i++){
			var query=table2.rows[1].cells[i].childNodes[0];
			query.value="";
		}
		cfg.filter={};
		cfg.param={};/*参数也清空*/
		x.closeGridFilter(grid);
		x.genGridContent(grid);
		/*逐项清楚filter里面的内容 */
	}
	
	var checkCmd=function(grid){
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var cmd=$("#"+id+"_cmd");
		for(var i=0;i<cmd.childNodes.length;i++){
			var c=cmd.childNodes[i];
			if(c.cmd.checkMethod!=null){
				x.cssAdd(c,"hide");
				$$(c.cmd.checkMethod,cfg.param,false,function(result){
						//out("check cmd result",result);
						if(result.flag!=true){
							c.disable=true;
							x.cssAdd(c,c.cmd.checkFalse);
						}else{
							x.cssRm(c,"hide");
						}
					});
			}
		}
	}
	
	x.genGridCmd=function(grid){
		/*为一个网格对象生成操作按钮*/
		var cfg=grid.gridCfg;
		if(cfg.cmdGened==true){
			checkCmd(grid);
			return;
		}
		var id=cfg.id;
		var cmds=cfg.cmds;
		var cmdbar	=$div(id+"_cmdbar","cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		x.addChild(grid,cmdbar);
		x.addChild(cmdbar,[cmd]);
		/*根据用户自定义的命令行类型  默认有的方式有哪些按钮  有两套按钮
		主表  新增 修改 删除 筛选 刷新
		启用编辑  新增 删除 提交 筛选 刷新*/
		var sysCmds={};/*系统默认自带按钮*/
		sysCmds.cmdAdd		=$div(id+"_cmdAdd",		"add");
		sysCmds.cmdEdit		=$div(id+"_cmdEdit",	"edit");
		sysCmds.cmdDelete	=$div(id+"_cmdDelete",	"delete");
		sysCmds.cmdLock		=$div(id+"_cmdLock",	"lock");
		sysCmds.cmdAddItem	=$div(id+"_cmdAddItem",	"addItem gray");
		sysCmds.cmdRmItem	=$div(id+"_cmdRmItem",	"rmItem gray");
		sysCmds.cmdCommit	=$div(id+"_cmdCommit",	"commit gray");
		sysCmds.cmdFilter	=$div(id+"_cmdFilter",	"filterData");
		sysCmds.cmdRefresh	=$div(id+"_cmdRefresh",	"refresh");
		sysCmds.cmdNav		=$div(id+"_cmdNav",		"nav");

		
		var c;
		for(var i=0;i<cmds.length;i++){
			c=sysCmds[cmds[i].cmd];
			if(c!=null){
				c.cmd=cmds[i];
				cmd.appendChild(c);
			}
			else{/**/
				c=$div(id+"_"+cmds[i].cmd);
				c.cmd=cmds[i];
				c.innerHTML=cmds[i].text;
				if(cmds[i].cmd=="upload"){
					var file=$file();
					file.name=id+"upfile";
					file.id=id+"upfile";
					c.appendChild(file);
					cmds[i].class="upload";
					x.bind(file,"change",x.ajaxUpload);
				}
				var className=cmds[i].class;
				if(className==null)	className="btn";
				c.className=className;/*自定义的操作按钮*/
				cmd.appendChild(c);
			}
		}
		cfg.cmdGened=true;
		checkCmd(grid);
		x.bind(cmd,						"click",	e_cmd_click);
		return cmdbar;
	}
})(window);(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
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
})(window);(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
	var back_getGridData=function(grid,result){/*回调函数*/
		x.getdataEnd=new Date();
		var cfg=grid.gridCfg;
		if(result.flag)	{
				cfg.datas=result.data;
				cfg.total=result.total;
				cfg.totalPage=Math.ceil(cfg.total/cfg.pageSize);
				cfg.currPage=result.page;
			}
			else{/*未获取到数据*/
				cfg.datas=[];
				cfg.total=0;
				cfg.totalPage=1;
				cfg.currPage=1;
			}
			
		genContent(grid);
	}
	var genContent=function(grid){
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var datas=cfg.datas;
		var gridContainer=x.$("#"+id+"_container");
		var grid_1		=x.$("#"+id+"_1");
		var grid_2		=x.$("#"+id+"_2");
		var grid_3		=x.$("#"+id+"_3");
		var grid_4		=x.$("#"+id+"_4");
		x.clearDom(grid_3);
		x.clearDom(grid_4);
		
		if(cfg.treeCfg){
			cfg.treeCfg.data=datas;
			datas=cleanData(cfg.treeCfg);
		}
		cfg.datas		=	datas;
		////out("gridCfg.datas",datas);
		var frozenColumns=cfg.frozenColumns;
		var otherColumns=cfg.otherColumns;
		
		var t3			=$table(datas.length,2+frozenColumns.length);/*左侧内容*/
		var t4			=$table(datas.length,otherColumns.length);/*右侧内容*/
		grid_3.appendChild(t3);		/*重建表格*/
		grid_4.appendChild(t4);		/*重建表格*/
		t3.id=id+"_3table";
		t4.id=id+"_4table";

		for(var i=0;i<datas.length;i++){/*表头  序号列和固定列 被绘制出来*/
			if(cfg.pageFlag)	datas[i].rownum=(cfg.currPage-1)*cfg.pageSize+i+1;
			else				datas[i].rownum=i+1;
			
			var div01=x.$div(null,"w01");
			div01.appendChild(x.$checkbox(null,"checkbox"));
			t3.rows[i].cells[0].className="w01"
			t3.rows[i].cells[0].appendChild(div01);
			var div=x.$div(null,"w02");
			t3.rows[i].cells[1].className="w02";
			div.innerHTML=(i+1);
			t3.rows[i].cells[1].appendChild(div);
			t3.rows[i].obj=datas[i];
			
			for(var j=0;j<frozenColumns.length;j++){
				var columnDef=frozenColumns[j];
				
				var text=$text("cell text");
				t3.rows[i].cells[j+2].appendChild(text);

				if(columnDef.autoWidth)	{
					x.cssAdd([text,t3.rows[i].cells[j+2]],"autoWidth");
				}
				text.style.width=frozenColumns[j].width+"px";/*冻结列的列宽不会发生变化*/
				
				if(columnDef.treeStyle){/*如果是treeStyle*/
					var obj=datas[i];
					//var div=$div(null,"cell");
					x.cssAdd(t3.rows[i].cells[j+2],"node");
					//t3.rows[i].cells[j+2].appendChild(text);
					//text.obj=obj;
					text.style.width=frozenColumns[j].width-(obj.treeLevel-1)*24-16+"px";
					text.style.marginLeft=(obj.treeLevel-1)*24+"px";
					//div.style.width=frozenColumns[j].width+"px";
					//text.style.textAlign=frozenColumns[j].align;/*固定列内容*/
					//text.innerHTML=datas[i][frozenColumns[j].attr];
					//x.bind(text,"click",e_node_click);
					//text.columnDef=frozenColumns[j];
					if(obj.hasChild)	x.cssAdd(t3.rows[i],"open");
					else{
						if(cfg.treeCfg.loadOnDemand)	x.cssAdd(t3.rows[i],"close");/*按需加载模式下默认进入close状态*/
						else							x.cssAdd(t3.rows[i],"leaf");
					}
					//continue;
				}
				
				if(!cfg.editMode)				text.readOnly=true;
				if(frozenColumns[j].notEdit)	text.readOnly=true;
				text.style.textAlign=frozenColumns[j].align;/*固定列内容*/
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
				if(datas[i][frozenColumns[j].attr]!=null)	text.innerHTML=datas[i][frozenColumns[j].attr];
				if(frozenColumns[j].attr2!=null)			text.value2=datas[i][frozenColumns[j].attr2];
				
				if(columnDef.autoWidth&&text.scrollWidth>0)	{
					text.style.width=text.scrollWidth+"px";
				}
				if(text.scrollHeight>0)		text.style.height=text.scrollHeight+"px";
				t3.rows[i].cells[j+2].columnDef=frozenColumns[j];

			}
		}
		for(var i=0;i<datas.length;i++){/*表内容 被绘制出来*/
			t4.rows[i].obj=datas[i];

			for(var j=0;j<otherColumns.length;j++){
				var text=$text("cell text");
				t4.rows[i].cells[j].appendChild(text);/*高度为何无法自适应了*/
				text.style.width=otherColumns[j].width+"px";
				if(!cfg.editMode)			text.readOnly=true;
				if(otherColumns[j].notEdit)	text.readOnly=true;
				text.style.textAlign=otherColumns[j].align;
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);

				if(datas[i][otherColumns[j].attr]!=null)	text.value=datas[i][otherColumns[j].attr];
				if(otherColumns[j].attr2!=null)				text.value2=datas[i][otherColumns[j].attr2];
				
				if(text.scrollHeight>0)		text.style.height=text.scrollHeight+"px";
				t4.rows[i].cells[j].columnDef=otherColumns[j];
			}
		}
		grid_4.style.left=x.getRect(grid_3).width+"px";
		
		var pageNum		=x.$("#"+id+"_pageNum");
		var rowNum		=x.$("#"+id+"_rowNum");
		
		if(cfg.pageFlag){/*要生成分页信息和分页按钮*/
			cfg.totalNum=cfg.total;
			pageNum.innerHTML="第"+cfg.currPage+"页/共"+cfg.totalPage+"页";
			rowNum.innerHTML="共"+cfg.totalNum+"条数据， 每页显示"+cfg.pageSize+"条";
		}
		else{
			cfg.totalNum=cfg.datas.length;
			rowNum.innerHTML="共"+cfg.totalNum+"条数据";
		}
		x.bind(grid_3,"mousedown",e_content_mousedown);
		x.bind(grid_4,"mousedown",e_content_mousedown);
		x.fixGrid(grid);
		x.fixGridScroll(grid);
		//activeGridRow(grid,0);/*选中第一行对象*/
		x.unitEnd=new Date();
	}
	x.genGridContent=function(grid,isFirst){/*重新绘制grid的内容  isFirst是否为第一次 如果是第一次则重画表头，否则按照表头绘制*/

		var cfg=grid.gridCfg;
		cfg.activeRow=null;
		if(isFirst==null)	isFirst=false;
		
		var datas=[];
		if(cfg.data_method!=null){/*获取数据*/
			var param=cfg.param;
			if(param==null)	param={pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage};
			else			param=x.mix(param,{pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage});
			if(cfg.orderby)	param.orderby=cfg.orderby;
			if(cfg.filter!=null)	param.filter=cfg.filter;
			if(cfg.refAttr!=null)	param[cfg.refAttr.name2]=param[cfg.refAttr.name];										
			cfg.param=param;
			x.getdataState=new Date();
			$$(cfg.data_method,param,false,function(result){
														back_getGridData(grid,result)
													});
			return;
		}
		else	genContent(grid);
	}
	
	var e_content_mousedown=function(evt){
		/*content mousedown*/
		var target	=x.getTarget(evt);
		var grid	=x.$1(".grid",this,0);
		var id="#"+grid.gridCfg.id;
		var grid_1		=x.$(id+"_1");					/*grid第一区域  	左上角*/
		var grid_2		=x.$(id+"_2");					/*grid第二区域	表头*/
		var grid_3		=x.$(id+"_3");					/*grid第三区域	*/
		var content		=x.$(id+"_4");					/*grid第二区域	表头*/
		
		var gridCfg	=grid.gridCfg;
		var tr		=x.$1("tr",target,0);
		var p		=x.getDomIndex(tr);
		var trs		=$("tr",grid_3,3);
		var tr_header=trs[p];
		

		if(inDom(target,grid_3)){
			tr_header=tr;
			var trs2		=$("tr",content,3);
			tr=trs2[p];
		}

		
		var trTop	=x.getChilds(tr.parentNode,p-1);
		var tr_header_top=x.getChilds(tr_header.parentNode,p-1);
		if(trTop==null){
			trTop=x.$1("tr",grid_2,3);
			tr_header_top=x.$1("tr",grid_1,3);
		}
		x.cssRm([gridCfg.activeRow,gridCfg.activeRow_header],"active");
		x.cssRm([gridCfg.activeRowTop,gridCfg.activeRow_header_top],"active_top");
		////out("e_content_mousedown tr",tr);
		//tr.className="active1";
		//tr_header.className="active1";
		x.cssAdd(tr,"active");
		x.cssAdd(tr_header,"active");
		x.cssAdd(trTop,"active_top");
		x.cssAdd(tr_header_top,"active_top");
		gridCfg.activeRow=tr;
		gridCfg.activeRowTop=trTop;
		gridCfg.activeRow_header=tr_header;
		gridCfg.activeRow_header_top=tr_header_top;
	}
	
	
	var activeGridRow=function(grid,p2){
		var cfg=grid.gridCfg;
		var id="#"+grid.gridCfg.id;
		var table3=$(id+"_3table");
		var table4=$(id+"_4table");
		var rowNum=table3.rows.length;
		if(cfg.pageFlag){
			if(p2==-1){/*变成-1就代表应该倒退一页*/
				if(cfg.currPage==1)	return;/*没有下一页*/
				else	cfg.currPage--;
				x.genGridContent(grid);/*进入下一页*/
				table3=$(id+"_3table");
				p=table3.rows.length-1;
				activeGridRow(grid,p);
				return;
			}
			if(p2>rowNum-1){
				//如果启用了分页，这里要进入下一页
				if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
				else	cfg.currPage++;
				x.genGridContent(grid);/*进入下一页*/
				activeGridRow(grid,0);
				return;
			}
		}
		var p3=p2-1;
		if(p2>=0&&p2<rowNum){/*有效的变化*/
			x.cssRm(cfg.activeRow,"active");
			x.cssRm(cfg.activeRowTop,"active_top");
			x.cssRm(cfg.activeRow_header,"active");
			x.cssRm(cfg.activeRow_header_top,"active_top");
			
			var tr=table4.rows[p2];
			var tr_header=table3.rows[p2];
			x.cssAdd(tr,"active");
			x.cssAdd(tr_header,"active");
			//tr.cells[0].focus();
			cfg.activeRow=tr;
			cfg.activeRow_header=tr_header;
			if(p3>=0){
				var trTop=table4.rows[p3];
				var tr_header_top=table3.rows[p3];
				x.cssAdd(trTop,"active_top");
				x.cssAdd(tr_header_top,"active_top");
				cfg.activeRowTop=trTop;
				cfg.activeRow_header_top=tr_header_top;
			}
		}
		/*判断这个grid的选中行是否处于显示状态 如果不处于显示状态  想办法显示它*/
		var rect=x.getRect(cfg.activeRow);
		var height=rect.top+rect.height;
		var top=rect.top;
		var visualHeight=grid.clientHeight-26;/*可见高度*/
		var visualHeightMin=39+32+1;
		if(cfg.filterMode)	visualHeightMin+=32+1;
		if(height>visualHeight){
			x.scrollGrid(grid,0,height-visualHeight);
		}
		if(top<visualHeightMin){
			x.scrollGrid(grid,0,top-visualHeightMin);
		}
	}
	x.selectGridRow=function(grid,num){
		/*第一步获取当前选中对象  如果有  如果没有*/
		var cfg=grid.gridCfg;
		var id="#"+grid.gridCfg.id;
		var table3=$(id+"_3table");
		var table4=$(id+"_4table");
		var rowNum=table3.rows.length;

		if(cfg.activeRow==null){
			if(num==1)			activeGridRow(grid,0);/*代表方向向下  那么应该选中第一个对象*/
			else if(num==-1)	activeGridRow(grid,rowNum-1);
		}
		else{
			var p=x.getDomIndex(cfg.activeRow);
			var p2=p+num;
			activeGridRow(grid,p2);
		}
	}
	
	x.addGridRow=function(grid){
		if(grid.gridCfg.editMode){/*如果处于可编辑状态  则允许新建空白行  改行的序号为空*/
			/*在当前活动行前面添加一行*/
			var cfg=grid.gridCfg;
			var id="#"+grid.gridCfg.id;
			var grid1=$(id+"_1");
			var grid2=$(id+"_2");

			var grid4=$(id+"_4");
			grid4.style.left=grid2.style.left;
			var table1=$(id+"_1table");
			var table2=$(id+"_2table");
			var table3=$(id+"_3table");
			var table4=$(id+"_4table");
			var targetTr=cfg.activeRow;
			var targetTr2=cfg.activeRow_header;

			var p=0;
			if(targetTr==null){
				targetTr=table3.rows[0];
				targetT2r=table4.rows[0];
			}
			else p=x.getDomIndex(targetTr)+1;
			var tr1=table3.insertRow(p);
			var tr2=table4.insertRow(p);

			var tds=[];
			for(var i=0;i<2+cfg.frozenColumns.length;i++){
				tds[i]=tr1.insertCell();
			}
			var div01=x.$div(null,"w01");
			div01.appendChild(x.$checkbox(null,"checkbox"));
			tds[0].className="w01"
			tds[0].appendChild(div01);
			var div=x.$div(null,"w02");
			tds[1].appendChild(div);
			tr1.appendChild(tds[0]);
			tr1.appendChild(tds[1]);
			for(var i=0;i<cfg.frozenColumns.length;i++){
				//var cell=$div(null,"cell");
				var text=$text("cell text");
				text.style.textAlign=cfg.frozenColumns[i].align;
				text.style.width=cfg.frozenColumns[i].width+"px";
				tds[i+2].appendChild(text);
				tds[i+2].columnDef=cfg.frozenColumns[i];
				tr1.appendChild(tds[i+2]);
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
			}
			
			var tds2=[];
			for(var i=0;i<cfg.otherColumns.length;i++){
				tds2[i]=tr2.insertCell();
			}
			for(var i=0;i<cfg.otherColumns.length;i++){
				//var cell=$div(null,"cell");
				var text=$text("cell text");
				text.style.textAlign=cfg.otherColumns[i].align;
				text.style.width=cfg.otherColumns[i].width+"px";
				tds2[i].appendChild(text);
				tds2[i].columnDef=cfg.otherColumns[i];
				tr2.appendChild(tds2[i]);
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
			}
		}
		x.fixGridScroll(grid);
	}
	
	x.rmGridRow=function(grid){
		/*获取activeRow*/
		var gridCfg=grid.gridCfg;
		if(grid.gridCfg.editMode){
			if(gridCfg.activeRow!=null){/*先把效果都删掉*/
				x.cssRm(gridCfg.activeRow,"active");
				x.cssRm(gridCfg.activeRowTop,"active_top");
				if(gridCfg.activeRow_header!=null){
					x.cssRm(gridCfg.activeRow_header,"active");
					x.cssRm(gridCfg.activeRow_header_top,"active_top");
					x.rmDom(gridCfg.activeRow_header);
				}
				if(gridCfg.rmDatas==null)	gridCfg.rmDatas=[];
				gridCfg.rmDatas.push(gridCfg.activeRow.obj);/*删除数据*/
				var p=x.getDomIndex(gridCfg.activeRow);
				x.rmDom(gridCfg.activeRow);
				activeGridRow(grid,p);
			}
		}
		x.fixGridScroll(grid);
	}
	var e_text_click=function(evt){/*输入框的单击事件*/
		var grid=$1(".grid",this,0);
		var cfg=grid.gridCfg;
		var id="#"+cfg.id;
		
		var target=x.getTarget(evt);
		var td=$1("td",target,0);
		var columnDef=td.columnDef;
		
		if(columnDef!=null&&columnDef.treeStyle)	e_node_click(td.parentNode);
		
		if(!(grid&&grid.gridCfg&&grid.gridCfg.editMode))	return;/*如果不是编辑模式 直接返回*/
		
		if(columnDef!=null&&columnDef.lov!=null)			x.openLov(target,columnDef.lov);
		
		/*要保证该输入框被完整的呈现出来*/
		var width0	=grid.clientWidth;
		var height0	=grid.clientHeight-26;
		var width1	=x.getRect(target.parentNode).left+x.getRect(target.parentNode).width;
		//var height1=x.getRect(target.parentNode).top+x.getRect(target.parentNode).height;
		var range 	= document.selection.createRange();
		var rect1	=range.getBoundingClientRect();
		var height1	=rect1.top+18;/*重新计算的高度*/
		var scroll_v	=x.$(id+"_scroll_v");
		if(scroll_v.style.display=="block")		width0	=width0-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
        var dx=dy=0;
		if(width1>width0)	dx=width1-width0;
		if(height1>height0)	dy=height1-height0;
		x.scrollGrid(grid,dx,dy);
		
		var top=rect1.top;
		var visualHeightMin=39+32+1;
		if(cfg.filterMode)	visualHeightMin+=32+1;
		if(top<visualHeightMin){
			x.scrollGrid(grid,0,top-visualHeightMin);
		}
	}
	var e_text_keyUp=function(evt){/*可输入区域变成 textarea 允许换行输入*/
		var target=x.getTarget(evt);
		this.style.height=this.scrollHeight+"px";/*调整了本输入框的高度  然后要调整本行的高度*/
		var tr=this.parentNode.parentNode;
		var p=x.getDomIndex(tr);
		var grid=x.$1(".grid",tr,0);
		var cfg=grid.gridCfg;
		var table_3=$("#"+cfg.id+"_3table");
		var table_4=$("#"+cfg.id+"_4table");
		var height1=x.getRect(table_3.rows[p]).height;
		var height2=x.getRect(table_4.rows[p]).height;
		var height=height1>height2?height1:height2;
		table_3.rows[p].style.height=height+"px";
		table_4.rows[p].style.height=height+"px";
		var height0	=grid.clientHeight-26;
		
		var range 	= document.selection.createRange();
		var rect1	=range.getBoundingClientRect();
		var height1	=rect1.top+18;/*重新计算的高度*/
		
		var top=rect1.top;
		var visualHeightMin=39+32+1;
		if(cfg.filterMode)	visualHeightMin+=32+1;
		if(top<visualHeightMin){
			x.scrollGrid(grid,0,top-visualHeightMin);
		}
		
		var dx=dy=0;
		if(height1>height0)	dy=height1-height0;
		if(dy>0)	x.scrollGrid(grid,dx,dy);
		else		x.fixGridScroll(grid);
		/*如何判断当前是否位于该输入框底部*/
		var rect=x.getRect(target);
		var textHeight=rect.top+rect.height;
		if(!target.readOnly){
			x.stopEvt(evt);
		}
	}
	
	
	var cleanData=function(cfg){/*整理数据  整理后的数据仍然是个数组，但是已经按照树状排列*/
		var result=[];
		addNode(result,null,cfg);
		//cfg.data=result;
		return result;		
		
	}
	var addNode=function(result,obj,cfg){
		/*找到一个对象的子节点，然后按顺序插入到result中   如果有死循环*/
		var childs=getChildData(obj,cfg);
		for(var i=0;i<childs.length;i++){
			result.push(childs[i]);/**/
			addNode(result,childs[i],cfg);
		}
	}
	
	var getRootData=function(cfg){
		/*获取根节点数据*/
		var data=cfg.data;
		var idAttr=cfg.idAttr;
		var pidAttr=cfg.pidAttr;
		var result=[];
		var rest=[];
		var z=1;
		for(var i=0;i<data.length;i++){
			var obj=data[i];
			var pid=obj[pidAttr];
			
			var flag=true;
			if(pid!=null){
				for(var j=0;j<data.length;j++){
					if(pid==data[j][idAttr]){	
						flag=false;
						break;
					}
				}
			}
			if(flag==true){
				obj.treeLevel=1;
				obj.treeCode=""+z;
				z++;
				result.push(obj);/*上层节点为空*/
			}
			else{
				rest.push(obj);
			}
		}
		cfg.data=rest;
		return result;
	}
	
	var getChildData=function(obj,cfg){
		if(obj==null)	return getRootData(cfg);
		var data=cfg.data;
		var idAttr=cfg.idAttr;
		var pidAttr=cfg.pidAttr;
		var result=[];
		var rest=[];
		var id=obj[cfg.idAttr];
		var z=1;
		for(var i=0;i<cfg.data.length;i++){
			var pid=cfg.data[i][pidAttr];
			if(pid==id){
				obj.hasChild=true;/*设置是否有child属性*/
				cfg.data[i].treeLevel=obj.treeLevel+1;
				cfg.data[i].treeCode=obj.treeCode+z;
				z++;
				result.push(cfg.data[i]);
			}
			else{
				rest.push(cfg.data[i]);
			}
		}
		cfg.data=rest;
		return result;
	}
	
		
	
	var e_node_click=function(node){/*树的单击事件  判断当前节点是否处于open状态  直接打开子孙节点*/
	/*判断是否位于某一区域*/
		////out("evt",evt.clientX+"-"+evt.clientY);
		//var target=x.getTarget(evt);
		//var node=this.parentNode.parentNode;
		/*渐进模式下需要为其生成数据   */
		var tree=node.parentNode;
		
	
		
		var p=x.getDomIndex(node);
		var grid=x.$1(".grid",node,0);
		var gridCfg=grid.gridCfg;
		var cfg=gridCfg.treeCfg;
		
		if(cfg==null)	cfg={};
		////out("treeCfg",cfg);
			
		if(cfg.openMode==null)	cfg.openMode="normal";
		if(cfg.idAttr==null)	cfg.idAttr="d1_id";
		if(cfg.pidAttr==null)	cfg.pidAttr="d1_pid";
		if(cfg.nameAttr==null)	cfg.nameAttr="d1_name";
		if(cfg.loadOnDemand){/*按需加载模式*/
			////out("obj",node.obj);
			if(node.obj.childLoad!=true)	genChildData(grid,node);////out("按需加载  子节点尚未加载");
		}	
		var grid4_table=x.$("#"+gridCfg.id+"_4table");
		////out("grid4_table",grid4_table);
		if(node.obj!=null){
			if(x.cssContain(node,"open")){/*如果是打开状态  则关闭以下所有节点*/
				x.cssReplace(node,"open","close");
				for(var i=p+1;i<tree.childNodes.length;i++){
					var node2=tree.childNodes[i];
					////out("node2",node2.obj);
					if(node.obj.treeLevel<node2.obj.treeLevel){/*是显示子孙节点还是*/
						node2.style.display="none";
						grid4_table.rows[i].style.display="none";
						x.cssReplace(node2,"open","close");/*open变close状态  收缩是这样的*/
					}
					else	break;
				}
			}
			else if(x.cssContain(node,"close")){/*展开默认只展开一层*/
				x.cssReplace(node,"close","open");
				for(var i=p+1;i<tree.childNodes.length;i++){
					var node2=tree.childNodes[i];
					if(node.obj.treeLevel>=node2.obj.treeLevel)	break;/*遇到同级元素*/
					if(cfg.openMode=="normal"){
						if(node.obj.treeLevel==node2.obj.treeLevel-1){
							node2.style.display="";
							grid4_table.rows[i].style.display="";
						}
					}
					else if(cfg.openMode=="all"){
						if(node.obj.treeLevel<node2.obj.treeLevel){
							node2.style.display="";
							grid4_table.rows[i].style.display="";
							x.cssReplace(node2,"close","open");/*close变open状态  展开所有*/
						}
					}
				}
			}
		}
		x.fixGrid(grid);
		x.fixGridScroll(grid);
	}
	
	var genChildDataBack=function(result,node,cfg){
		var p=x.getDomIndex(node);
		if(result.flag&&result.data!=null){
			if(result.data.length==0){
				node.obj.hasChild=false;
				node.obj.childs=result.data;
				x.cssRm(node,"open");/*close变open状态  展开所有*/
				x.cssRm(node,"close");/*close变open状态  展开所有*/
				x.cssAdd(node,"leaf");/*close变open状态  展开所有*/
			}
			else{
				var id=cfg.id;
				var gridContainer=x.$("#"+id+"_container");
				var grid_1		=x.$("#"+id+"_1");
				var grid_2		=x.$("#"+id+"_2");
				var grid_3		=x.$("#"+id+"_3");
				var grid_4		=x.$("#"+id+"_4");
				
				var datas		=	result.data;
				
				var frozenColumns=cfg.frozenColumns;
				var otherColumns=cfg.otherColumns;
				
				var t3			=x.$("#"+id+"_3table");;/*左侧内容*/
				var t4			=x.$("#"+id+"_4table");;/*右侧内容*/
		
				for(var i=0;i<datas.length;i++){/*表头  序号列和固定列 被绘制出来*/
					datas[i].treeLevel=node.obj.treeLevel+1;
					var tr=$e("tr");
					x.insertDom(t3.rows[p+i],tr);
					for(var j=0;j<frozenColumns.length+2;j++){
						var td=$e("td");
						tr.appendChild(td);
					}
					var div01=x.$div(null,"w01");
					div01.appendChild(x.$checkbox(null,"checkbox"));
					tr.cells[0].className="w01"
					tr.cells[0].appendChild(div01);
					var div=x.$div(null,"w02");
					tr.cells[1].className="w02";
					div.innerHTML=(i+1);
					tr.cells[1].appendChild(div);
					tr.obj=datas[i];
					
					for(var j=0;j<frozenColumns.length;j++){
						var columnDef=frozenColumns[j];
						
						var text=$text("cell text");
						tr.cells[j+2].appendChild(text);
						if(columnDef.autoWidth)	{
							x.cssAdd([text,t3.rows[i].cells[j+2]],"autoWidth");
						}
						text.style.width=frozenColumns[j].width+"px";/*冻结列的列宽不会发生变化*/
						
						if(columnDef.treeStyle){/*如果是treeStyle*/
							var obj=datas[i];
							x.cssAdd(tr.cells[j+2],"node");
							text.style.width=frozenColumns[j].width-(obj.treeLevel-1)*24-16+"px";
							text.style.marginLeft=(obj.treeLevel-1)*24+"px";

							if(obj.hasChild)	x.cssAdd(t3.rows[i],"open");
							else{
								if(cfg.treeCfg.loadOnDemand)	x.cssAdd(tr,"close");/*按需加载模式下默认进入close状态*/
								else							x.cssAdd(tr,"leaf");
							}
						}
						
						if(!cfg.editMode)				text.readOnly=true;
						if(frozenColumns[j].notEdit)	text.readOnly=true;
						text.style.textAlign=frozenColumns[j].align;/*固定列内容*/
						x.bind(text,"click",e_text_click);
						x.bind(text,"keyup",e_text_keyUp);
						if(datas[i][frozenColumns[j].attr]!=null)	text.innerHTML=datas[i][frozenColumns[j].attr];
						if(frozenColumns[j].attr2!=null)			text.value2=datas[i][frozenColumns[j].attr2];
						
						if(columnDef.autoWidth&&text.scrollWidth>0)	{
							if(text.scrollWidth>columnDef.width)	text.style.width=text.scrollWidth+"px";/*要比width大*/
						}
						if(text.scrollHeight>0)		text.style.height=text.scrollHeight+"px";
						tr.cells[j+2].columnDef=frozenColumns[j];
					}
				}
				for(var i=0;i<datas.length;i++){/*表内容 被绘制出来*/
					var tr=$e("tr");
					x.insertDom(t4.rows[p+i],tr);
					for(var j=0;j<otherColumns.length;j++){
						var td=$e("td");
						tr.appendChild(td);
					}
					tr.obj=datas[i];
		
					for(var j=0;j<otherColumns.length;j++){
						var text=$text("cell text");
						tr.cells[j].appendChild(text);/*高度为何无法自适应了*/
						text.style.width=otherColumns[j].width+"px";
						if(!cfg.editMode)			text.readOnly=true;
						if(otherColumns[j].notEdit)	text.readOnly=true;
						text.style.textAlign=otherColumns[j].align;
						x.bind(text,"click",e_text_click);
						x.bind(text,"keyup",e_text_keyUp);
		
						if(datas[i][otherColumns[j].attr]!=null)	text.value=datas[i][otherColumns[j].attr];
						if(otherColumns[j].attr2!=null)				text.value2=datas[i][otherColumns[j].attr2];
						if(columnDef.autoWidth&&text.scrollWidth>0)	{
							text.style.width=text.scrollWidth+"px";
						}
						if(text.scrollHeight>0)		text.style.height=text.scrollHeight+"px";
						tr.cells[j].columnDef=otherColumns[j];
					}
				}
			}
		}
	}
	
	var genChildData=function(grid,node){/*这个是树状列表的功能  从第几行处开始插入数据*/
		/*为某一行生成子数据  */
		var cfg=grid.gridCfg;
		var treeCfg=cfg.treeCfg;
		var method=treeCfg.getChildMethod;
		node.obj.childLoad=true;
		if(method!=null){
			////out("param",node.obj);
			var result=$$(method,node.obj,false,function(result){
					genChildDataBack(result,node,cfg);
				});
			
			////out("get child result",result);
		}
			
	}
})(window);(function(x){/*生成grid的page部分*/
	x.genGridPager=function(grid){
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var gridContainer	=$("#"+id+"_container");
		var pager			=x.$div(id+"_pager","pager");
		
		var footer_bg		=x.$div(id+"_footer","footer_bg");
		x.addChild(gridContainer,[pager,footer_bg]);
		var pagerInfo=$table(1,2);
		var pagerTable=$table(1,4);
		x.addChild(pager,[pagerInfo,pagerTable]);

		pagerInfo.className="pageInfo";
		pagerTable.className="pageTable";
		var pagerRow	=pagerTable.rows[0];
		var pageNum		=pagerInfo.rows[0].cells[1];
		var rowNum		=pagerInfo.rows[0].cells[0];
		var prePage		=pagerRow.cells[1];
		var nextPage	=pagerRow.cells[2];
		var firstPage	=pagerRow.cells[0];
		var lastPage	=pagerRow.cells[3];
		pageNum.id		=id+"_pageNum";
		rowNum.id		=id+"_rowNum";
		prePage.id		=id+"_prePage";
		nextPage.id		=id+"_nextPage";
		prePage.id		=id+"_prePage";
		firstPage.id	=id+"_firstPage";
		lastPage.id		=id+"_lastPage";
		pageNum.className	="pageNum";
		rowNum.className	="rowNum";
		prePage.className	="pagebtn";
		nextPage.className	="pagebtn";
		firstPage.className	="pagebtn";
		lastPage.className	="pagebtn";
		prePage.innerHTML	="上一页";
		nextPage.innerHTML	="下一页";
		firstPage.innerHTML	="首页";
		lastPage.innerHTML	="尾页";
		x.bind(prePage,		"click",		e_prePage);/**/
		x.bind(nextPage,	"click",		e_nextPage);
		x.bind(firstPage,	"click",		e_firstPage);
		x.bind(lastPage,	"click",		e_lastPage);
		if(!cfg.pageFlag)	pagerTable.style.display="none";
	}
	
	
	var e_prePage=function(evt){
		var grid	=x.$1(".grid",this,0);
		var cfg	=grid.gridCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage--;
		x.genGridContent(grid);
	}
	
	var e_nextPage=function(){
		var grid	=x.$1(".grid",this,0);
		var cfg	=grid.gridCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage++;
		x.genGridContent(grid);
	}
	var e_firstPage=function(){
		var grid	=x.$1(".grid",this,0);
		var cfg	=grid.gridCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage=1;
		x.genGridContent(grid);
	}
	var e_lastPage=function(){
		var grid	=x.$1(".grid",this,0);
		var cfg	=grid.gridCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage=cfg.totalPage;
		x.genGridContent(grid);
	}
	
})(window);(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/

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
})(window);(function(x){	/*注册grid的一些全局事件*/
	x.fixGrid=function(grid){
		/*	1.修正表头列的宽度		列宽		要求所有表头列必须有宽度  如果没有，则提供默认宽度120
			2.修正数据行的高度		行高		
			3.修正滚动条			滚动条
		*/
		var cfg		=grid.gridCfg;
		var id		=cfg.id;
		var grid1	=$("#"+id+"_1");
		var grid2	=$("#"+id+"_2");
		var grid3	=$("#"+id+"_3");
		var grid4	=$("#"+id+"_4");
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
		grid4.style.left=grid3.clientWidth+"px";
		grid2.style.left=grid3.clientWidth+"px";
		grid4.style.marginLeft=grid2.style.marginLeft;
		
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
	
	x.fixGridScroll=function(grid){
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
		var table_4		=x.$(id+"_4table");					/*grid第二区域	表头*/

		var gridWidth		=x.toNum(gridContainer.style.width);	/*grid的宽度*/
		var gridHeight		=x.toNum(gridContainer.style.height);
		var grid1Height		=x.getRect(grid_1).height;
		var grid1width		=x.getRect(grid_1).width;

		var contentWidth	=gridWidth-grid1width;
		var contentHeight	=gridHeight-grid1Height-26;

		/*在有固定列的情况下 contentWidth的值显然出了问题*/
		var grid4Width		=x.getRect(table_4).width;		/*内容全文宽度*/
		var grid4Hheight	=x.getRect(table_4).height;		/*内容全文高度*/
		
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
		
		if(contentLeft<contentLeft_max){/*也许由于调整列宽的关系造成这种情况出现*/
			contentLeft=contentLeft_max;
			if(contentLeft>0)	contentLeft=0;
			grid_4.style.marginLeft		=contentLeft+"px";
			grid_4.style.marginRight	=-contentLeft+"px";
			grid_2.style.marginLeft		=contentLeft+"px";
			grid_2.style.marginRight	=-contentLeft+"px";
		}
		if(contentTop<contentTop_max){/*也许由于调整列宽的关系造成这种情况出现*/
			contentTop=contentTop_max;
			if(contentTop>0)	contentTop=0;
			grid_4.style.marginTop		=contentTop+"px";
			grid_4.style.marginBottom	=-contentTop+"px";
			grid_3.style.marginTop		=contentTop+"px";
			grid_3.style.marginBottom	=-contentTop+"px";
		}

		if(gridCfg.lastWidth!=null){/*高度或者宽度发生了变化 	判断是变大还是变小*/
			var lastWidth	=gridCfg.lastWidth;
			var lastHeight	=gridCfg.lastHeight;
			if(lastWidth<contentWidth){/*变大了*/
				if((lastWidth+12)==contentWidth)	;/*由于垂直滚动条的消失 造成的问题 在这里fix*/
				else{
					contentLeft	+=(contentWidth-lastWidth);
					if(contentLeft>0)	contentLeft	=0;
					grid_4.style.marginLeft		=contentLeft+"px";
					grid_4.style.marginRight	=-contentLeft+"px";
					grid_2.style.marginLeft		=contentLeft+"px";
					grid_2.style.marginRight	=-contentLeft+"px";
				}
			}
			if(lastHeight<contentHeight){/*变高了*/
				contentTop	+=(contentHeight-lastHeight);
				if(contentTop>0)	contentTop	=0;
				grid_4.style.marginTop		=contentTop+"px";
				grid_4.style.marginBottom	=-contentTop+"px";
				grid_3.style.marginTop		=contentTop+"px";
				grid_3.style.marginBottom	=-contentTop+"px";
			}
		}
		gridCfg.lastWidth	=contentWidth;		/*记录当前最新宽度*/
		gridCfg.lastHeight	=contentHeight;		/*记录当前最新高度*/
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
})(window);(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
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
		var rolled = x.getEvtRolled(evt)*4;
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
	
	var e_grid_click=function(evt){
		var grid=this;
		var cfg=grid.gridCfg;
		var target=x.getTarget(evt);
		if(target.tagName.toLowerCase()!="td")	target=target.parentNode;
		if(target.tagName.toLowerCase()=="td")	target=target.parentNode;
		if(target.obj!=null){
			if(cfg.selectHandler!=null){
				cfg.selectHandler(grid,target,evt);
			}
		}
	}
	
	var e_grid_dbl=function(evt){
		var grid=this;
		var cfg=grid.gridCfg;
		var target=x.getTarget(evt);
		if(target.tagName.toLowerCase()!="td")	target=target.parentNode;
		if(target.tagName.toLowerCase()=="td")	target=target.parentNode;
		if(target.obj!=null){
			if(cfg.dblHandler!=null){
				cfg.dblHandler(grid,target,evt);
			}
		}
		
	}
	
	x.uiGrid=function(grid){/*为grid注册全局事件*/
		var cfg=grid.gridCfg;
		var id="#"+cfg.id;
		x.bind(grid,		"mousemove",	e_grid_mousemove);/*垂直位移*/
		x.bind(grid,		"mouseup",		e_grid_mouseup);/*水平位移*/
		x.bind(grid,		"mouseleave",	e_grid_mouseleave);/*水平位移*/
		x.bind(grid,		"keyup",		e_grid_keyclick);/*水平位移*/
		x.bind(grid,		"mousewheel",	e_grid_mousewheel);
		x.bind(grid,		"click",		e_grid_click);
		x.bind(grid,		"dblclick",		e_grid_dbl);

	}
	
})(window);(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
	x.openGridFilter=function(grid){/*打开筛选器*/
		grid.gridCfg.filterMode=true;/**/
		x.cssAdd(grid,"filterMode");
		x.fixGridScroll(grid);
		/*要重绘高度*/
	}
	x.closeGridFilter=function(grid){
		grid.gridCfg.filterMode=false;/**/
		x.cssRm(grid,"filterMode");
		x.fixGridScroll(grid);
	}
	x.closeGridEdit=function(grid){
		grid.gridCfg.editMode=false;/*在该状态下 能够删除行 新增行*/
		/*关闭分页按钮*/
		/*将当前grid的所有数据变成可编辑状态*/
		var id="#"+grid.gridCfg.id;
		var table3=$(id+"_3table");
		var prePage=$(id+"_prePage");
		var nextPage=$(id+"_nextPage");
		var firstPage=$(id+"_firstPage");
		var lastPage=$(id+"_lastPage");
		
		prePage.style.display="";
		nextPage.style.display="";
		firstPage.style.display="";
		lastPage.style.display="";


		var contentTable=$(id+"_4table");
		for(var i=0;i<contentTable.rows.length;i++){
			var row=contentTable.rows[i];
			for(var j=0;j<row.cells.length;j++){
				var cell=row.cells[j];
				var txt=cell.childNodes[0];
				txt.readOnly=true;
			}
		}
		for(var i=0;i<table3.rows.length;i++){
			var row=table3.rows[i];
			for(var j=2;j<row.cells.length;j++){
				var cell=row.cells[j];
				var txt=cell.childNodes[0];
				txt.readOnly=true;
			}
		}
	}
	x.makeGridEdit=function(grid){
		grid.gridCfg.editMode=true;/*在该状态下 能够删除行 新增行*/
		/*关闭分页按钮*/
		/*将当前grid的所有数据变成可编辑状态*/
		var id="#"+grid.gridCfg.id;
		var table3=$(id+"_3table");
		var prePage=$(id+"_prePage");
		var nextPage=$(id+"_nextPage");
		var firstPage=$(id+"_firstPage");
		var lastPage=$(id+"_lastPage");
		
		prePage.style.display="none";
		nextPage.style.display="none";
		firstPage.style.display="none";
		lastPage.style.display="none";

		var contentTable=$(id+"_4table");
		for(var i=0;i<contentTable.rows.length;i++){
			var row=contentTable.rows[i];
			for(var j=0;j<row.cells.length;j++){
				var cell=row.cells[j];
				var txt=cell.childNodes[0];
				if(!cell.columnDef.notEdit)	txt.readOnly=false;
			}
		}
		for(var i=0;i<table3.rows.length;i++){
			var row=table3.rows[i];
			for(var j=2;j<row.cells.length;j++){
				var cell=row.cells[j];//把这些允许编辑的内容设置成文本输入框更合适一些，避免了回车键等
				var txt=cell.childNodes[0];
				if(!cell.columnDef.notEdit)	txt.readOnly=false;
			}
		}
	}
	var totalNum=0;
	var rmNum=0;
	var updateNum=0;
	var addNum=0;
	var result1=[],result2=[],result3=[];

	var rmMethodBack=function(grid,result){/*删除完后执行下一项*/
		if(!result.flag) out("rm error",result);

		rmNum--;
		if(rmNum==0){/*执行更新操作*/
			saveGridChange_update(grid);
		}
	}
	
	var updateMethodBack=function(grid,result){/*删除完后执行下一项*/
		if(!result.flag) out("update error",result);

		updateNum--;
		if(updateNum==0){/*执行更新操作结束*/
			saveGridChange_add(grid);
		}
	}
	var addMethodBack=function(grid,result){
		if(!result.flag) out("add error",result);
		addNum--;
		if(addNum==0){/*执行新增操作结束*/
			saveGridChange_finish(grid);
		}
	}
	var saveGridChange_finish=function(grid){
		//out("finish save refresh grid");
		x.genGridContent(grid);
	}
	
	var saveGridChange_add=function(grid){
		//out("save excute add");
		var cfg=grid.gridCfg;
		var addDatas=cfg.addDatas;
		
		if(cfg.addMethod!=null){
			addNum=addDatas.length;
			totalNum+=addNum;
			for(var i=0;i<addDatas.length;i++){
				var obj=addDatas[i];
				if(cfg.param!=null)	obj=x.mix(obj,cfg.param);
				$$(cfg.addMethod,obj,false,function(result){
						//out("add obj",result);
						addMethodBack(grid,result);
					});
			}
		}
		if(addNum==0){
			saveGridChange_finish(grid);
		}
	}
	
	var saveGridChange_update=function(grid){/*更新的和新增的不能一起操作*/
		//out("save excute update");
		var cfg=grid.gridCfg;
		var id="#"+grid.gridCfg.id;
		var table3=$(id+"_3table");
		var table4=$(id+"_4table");
		var addDatas=[];
		var updateDatas=[];
		for(var i=0;i<table4.rows.length;i++){
			var row1=table4.rows[i];
			var row2=table3.rows[i];
			var obj={};
			for(j=2;j<row2.cells.length;j++){
				var cell=row2.cells[j];
				var txt=cell.childNodes[0];
				if(cell.columnDef!=null&&txt.value!=""){
					obj[cell.columnDef.attr]=txt.value;/*赋值的过程*/
					if(txt.value2!=null&&cell.columnDef.attr2!=null)	obj[cell.columnDef.attr2]=txt.value2;
				}
			}
			for(j=0;j<row1.cells.length;j++){
				var cell=row1.cells[j];
				var txt=cell.childNodes[0];
				if(cell.columnDef!=null&&txt.value!=""){
					if(cell.columnDef.attr2==null)	obj[cell.columnDef.attr]=txt.value;/*赋值的过程*/
					else							obj[cell.columnDef.attr2]=txt.value2;
				}
			}
			if(row1.obj==null){
				addDatas.push(obj);
			}
			else{
				var param={};
				for(var p in row1.obj){/*obj是新数据*/
					if(obj[p]!=null){
						if(obj[p]!=row1.obj[p])	param[p]=obj[p];/*只保留更新后的值*/
					}
				}
				if(!x.isEmptyObj(param)){
					param[cfg.pkAttr]=row1.obj[cfg.pkAttr];/*增加主键信息   主键信息总是要加上的*/  
					updateDatas.push(param);/*减少回发数据*/

				}
			}
		}
		cfg.addDatas=addDatas;

		if(cfg.updateMethod!=null){
			updateNum=updateDatas.length;
			totalNum+=updateNum;
			for(var i=0;i<updateDatas.length;i++){
				var obj=updateDatas[i];
				$$(cfg.updateMethod,obj,false,function(result){
						//out("update obj ",obj);
						updateMethodBack(grid,result);
					});
			}
		}
		if(updateNum==0){/*没有要更新的数据*/
			saveGridChange_add(grid);/*直接进入新增*/
		}
	}
	
	x.saveGridChange=function(grid){/*保存更改  需要配置新增方法  删除方法  修改方法  然后对数据进行分别提交*/
		/*首先将grid的删除数据提交给删除方法*/
		var cfg=grid.gridCfg;
		result1=[];result2=[];result3=[];
		rmNum=addNum=updateNum=totalNum=0;
		if(cfg.rmMethod!=null&&cfg.rmDatas!=null){
			rmNum=cfg.rmDatas.length;
			totalNum=rmNum;
			for(var i=0;i<cfg.rmDatas.length;i++){
				var obj=cfg.rmDatas[i];
				$$(cfg.rmMethod,obj,false,function(result){
					rmMethodBack(grid,result);
					});
			}
		}
		if(rmNum==0){/*没有要删除的数据*/
			saveGridChange_update(grid);/*直接进入更新模式*/
		}
		
	}
})(window);(function(x){	/*grid	导航栏目  */
/*grid需要监听tree的click事件  管理功能是比较弱的 也许有些场景只是导航功能  管理分类 似乎完全没有必要*/
	x.showGridNav=function(grid){/*展示grid的导航栏*/
		var rect=x.getRect(grid);
		var cfg=grid.gridCfg;
		cfg.navState=true;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width-240+"px";
		/*重新修正滚动条*/
		x.fixGridScroll(grid);
	}
	x.hideGridNav=function(grid){/*隐藏grid的导航栏*/
		var rect=x.getRect(grid);
		var cfg=grid.gridCfg;
		cfg.navState=false;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width+"px";
		/*重新修正滚动条*/
		x.fixGridScroll(grid);
	}
	x.genGridNav=function(grid){
		var cfg=grid.gridCfg;/*为grid生成导航栏目*/
		if(cfg.navs==null)	return;
		//out("gen grid nav");
		var gridNav=$div(cfg.id+"_nav","gridNav");/*grid导航栏*/
		grid.appendChild(gridNav);/*导航栏总要分栏目*/
		//var navTop=$div(cfg.id+"_navTop","navTop");/*导航选项卡标题的高度*/
		var navTitle=$div(cfg.id+"_navTitle","navTitle");/*导航选项卡标题的高度*/
		var navMain=$div(cfg.id+"_navMain","navMain");
		
		x.addChild(gridNav,[navTitle,navMain]);/*为navMain计算高度*/
		navMain.style.height=x.getRect(grid).height-33+"px";/*这是表头部分*/
		//out("gen nav 2");
		var navs=cfg.navs;
		var width=0;
		for(var i=0;i<navs.length;i++){/**/
			var nav=$div(cfg.id+"_nav"+i,"nav");
			var div=$div(cfg.id+"_navText"+i,"navText");
			div.innerHTML=navs[i].name;
			var panel=$div(cfg.id+"_panel"+i,"panel");
			navTitle.appendChild(nav);
			navMain.appendChild(panel);
			if(navs[i].cfg!=null){
				var treeCfg=navs[i].cfg;
				x.genTree(panel,navs[i].cfg);
			}
			nav.appendChild(div);
			if(i==0){
				x.cssAdd(div,"active");
				x.cssAdd(panel,"active");
			}

			width+=nav.scrollWidth;
		}
		var navfix=$div(cfg.id+"_navfix"+i,"navfix");
		//out("width",width);
		navTitle.appendChild(navfix);
		//navfix.innerHTML="rest";
		navfix.style.width=239-width-i+"px";
		
		if(cfg.showNav)	x.showGridNav(grid);
		//navfix.style.width="200px";
	}
})(window);