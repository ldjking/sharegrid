(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
	x.genGridContent=function(grid,isFirst){/*重新绘制grid的内容  isFirst是否为第一次 如果是第一次则重画表头，否则按照表头绘制*/
		var cfg=grid.gridCfg;
		cfg.activeRow=null;
		if(isFirst==null)	isFirst=false;
		var id=cfg.id;
		var gridContainer=x.$("#"+id+"_container");
		var grid_1		=x.$("#"+id+"_1");
		var grid_2		=x.$("#"+id+"_2");
		var grid_3		=x.$("#"+id+"_3");
		var grid_4		=x.$("#"+id+"_4");
		x.clearDom(grid_3);
		x.clearDom(grid_4);
		var datas=[];
		if(cfg.data_method!=null){/*获取数据*/
			var param=cfg.param;
			if(param==null)	param={pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage};
			else			x.mix(param,{pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage});
			if(cfg.orderby)	param.orderby=cfg.orderby;
			if(cfg.filter!=null)	param.filter=cfg.filter;
			var result=$$(cfg.data_method,param);
			if(result.flag)	{
				datas=result.data;
				cfg.total=result.total;
				cfg.totalPage=Math.ceil(cfg.total/cfg.pageSize);
				cfg.currPage=result.page;
			}
			else{/*未获取到数据*/
				datas=[];
				cfg.total=0;
				cfg.totalPage=1;
				cfg.currPage=1;
			}
		}
		datas=cleanData({idAttr:"d1_id",pidAttr:"d1_pid",nameAttr:"d1_name",data:datas});
		cfg.datas		=	datas;
		
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
			t3.rows[i].cells[0].className="w01";
			t3.rows[i].cells[1].className="w02";
			t3.rows[i].cells[0].appendChild(div01);
			var div=x.$div(null,"w02");
			div.innerHTML=(i+1);
			t3.rows[i].cells[1].appendChild(div);
			t3.rows[i].obj=datas[i];
			
			for(var j=0;j<frozenColumns.length;j++){
				if(frozenColumns[j].attr=="d1_name"){
					var obj=datas[i];
					//var div=$div(null,"cell");
					t3.rows[i].cells[j+2].columnDef=cfg.frozenColumns[j];
					var text=$text("cell text");
					x.cssAdd(t3.rows[i].cells[j+2],"node");
					t3.rows[i].cells[j+2].appendChild(text);
					//text.obj=obj;
					text.style.marginLeft=(obj.treeLevel-1)*24+"px";
					text.style.width=frozenColumns[j].width-(obj.treeLevel-1)*24-16+"px";
					//div.style.width=frozenColumns[j].width+"px";
					text.style.textAlign=frozenColumns[j].align;/*固定列内容*/
					text.innerHTML=datas[i][frozenColumns[j].attr];
					x.bind(text,"click",e_node_click);
					if(obj.hasChild)	x.cssAdd(t3.rows[i],"open");
					else				x.cssAdd(t3.rows[i],"leaf");
					continue;
				}
				var text=$text("cell text");
				t3.rows[i].cells[j+2].appendChild(text);
				text.style.width=frozenColumns[j].width+"px";/*冻结列的列宽不会发生变化*/
				
				if(!cfg.editMode)				text.readOnly=true;
				if(frozenColumns[j].notEdit)	text.readOnly=true;
				text.style.textAlign=frozenColumns[j].align;/*固定列内容*/
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
				if(datas[i][frozenColumns[j].attr]!=null)	text.innerHTML=datas[i][frozenColumns[j].attr];
				if(frozenColumns[j].attr2!=null)			text.value2=datas[i][frozenColumns[j].attr2];
				
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
		////out("last active row",gridCfg.activeRow);
			//gridCfg.activeRow.className="";
		
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
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
				text.style.textAlign=cfg.frozenColumns[i].align;
				text.style.width=cfg.frozenColumns[i].width+"px";
				tds[i+2].appendChild(text);
				tds[i+2].columnDef=cfg.frozenColumns[i];
				tr1.appendChild(tds[i+2]);
			}
			
			var tds2=[];
			for(var i=0;i<cfg.otherColumns.length;i++){
				tds2[i]=tr2.insertCell();
			}
			for(var i=0;i<cfg.otherColumns.length;i++){
				//var cell=$div(null,"cell");
				var text=$text("cell text");
				x.bind(text,"click",e_text_click);
				x.bind(text,"keyup",e_text_keyUp);
				text.style.textAlign=cfg.otherColumns[i].align;
				text.style.width=cfg.otherColumns[i].width+"px";
				tds2[i].appendChild(text);
				tds2[i].columnDef=cfg.otherColumns[i];
				tr2.appendChild(tds2[i]);
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
		if(!(grid&&grid.gridCfg&&grid.gridCfg.editMode))	return;
		var target=x.getTarget(evt);
		var td=$1("td",target,0);
		var columnDef=td.columnDef;
		if(columnDef!=null){
			if(columnDef.lov!=null)	x.openLov(target,columnDef.lov);
		}
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
				obj.hasChild=true;
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
	
		
	
	var e_node_click=function(evt){/*树的单击事件  判断当前节点是否处于open状态  直接打开子孙节点*/
	/*判断是否位于某一区域*/
		//out("evt",evt.clientX+"-"+evt.clientY);
		var target=x.getTarget(evt);
		var node=this.parentNode.parentNode;
		var tree=node.parentNode;
		var cfg=tree.treeCfg;
		if(cfg==null)	cfg={};
		if(cfg.openMode==null)	cfg.openMode="normal";
		if(cfg.idAttr==null)	cfg.idAttr="d1_id";
		if(cfg.pidAttr==null)	cfg.pidAttr="d1_pid";
		if(cfg.nameAttr==null)	cfg.nameAttr="d1_name";
		
		var p=x.getDomIndex(node);
		var grid=x.$1(".grid",node,0);
		var gridCfg=grid.gridCfg;
		var grid4_table=x.$("#"+gridCfg.id+"_4table");
		//out("grid4_table",grid4_table);
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
	}
})(window);