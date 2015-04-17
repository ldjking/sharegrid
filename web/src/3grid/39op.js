(function(x){	/*grid	效果 带分页 带滚动条  带列自动拖拽*/
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
})(window);