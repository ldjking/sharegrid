/*41form		表单编辑器 静态表单*/
(function(x){		
	x.genForm=function(cfg,tables,cmds){
		cfg.tables=tables;
		cfg.cmds=cmds;
		
		var form=cfg.dom;
		form.formCfg=cfg;
		/*step1 生成表单标题*/
		x.cssAdd(form,"form");
		if(cfg.bigPaper)	x.cssAdd(form,"big");
		cfg.id=x.getId("form");
		
		var cmdbar=$div(cfg.id+"_cmdbar","cmdbar");
		var container=$div(cfg.id+"_container","formContainer");
		x.addChild(form,[cmdbar,container]);/*增加子项*/
		
		x.genFormContent(form);
	}	
	
	x.genFormCmd=function(form){/*每次不同的参数都要重新生成按钮吗 还是*/
		var cfg=form.formCfg;

		var cmds=cfg.cmds;
		var id=cfg.id;
		var cmdbar	=$("#"+id+"_cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		//x.clearDom(cmdbar);
		x.addChild(cmdbar,[cmd]);

		/*根据用户自定义的命令行类型  默认有的方式有哪些按钮  有两套按钮
		主表  新增 修改 删除 筛选 刷新
		启用编辑  新增 删除 提交 筛选 刷新*/
		var preCmds={};
		preCmds.addItem	=$div(id+"_cmdAddItem","addItem");
		preCmds.rmItem	=$div(id+"_cmdRmItem","rmItem");
		preCmds.save	=$div(id+"_cmdSave","save");
		preCmds.update	=$div(id+"_cmdUpdate","update");
		preCmds.pre		=$div(id+"_cmdPre","pre");
		preCmds.next	=$div(id+"_cmdNext","next");
		preCmds.cancel	=$div(id+"_cmdCancel","cancel");
		
		var c;
		for(var i=0;i<cmds.length;i++){
			if(cmds[i].cmd!=null){
				c=preCmds[cmds[i].cmd];
				if(c!=null){
					c.cmd=cmds[i];
					cmd.appendChild(c);
				}
				else{/*自定义按钮如何放置*/
					c=$div();
					c.cmd=cmds[i];
					c.innerHTML=cmds[i].text;
					var className=cmds[i].class;
					if(className==null)	className="btn";
					c.className=className;/*自定义的操作按钮*/
					cmd.appendChild(c);
				}
			}
		}
		cfg.cmdGened=true;
	}
	
	var genContent=function(form){
		x.genFormCmd(form);
		var cfg=form.formCfg;
		var data=cfg.data;
		var id=cfg.id;
		var tables=cfg.tables;
		var container=$("#"+id+"_container");
		container.innerHTML="";/*代表要重绘内容*/
		var paper=$div(id+"_paper","paper");
		var div=$div(null,"form_title");
		div.innerHTML=cfg.title;
		
		x.addChild(paper,[div]);
		x.addChild(container,[paper]);

		var formTable=$table(tables.length,1);/*x行，每行1列*/
		formTable.className="formTable";
		x.addChild(paper,[formTable]);

		for(var i=0;i<formTable.rows.length;i++){
			var line=formTable.rows[i].cells[0];
			var tDef=tables[i];
			if(tDef.type==0){/*隐藏元素*/
				var lineTable=$table(1,tDef.cells.length);
				lineTable.className="hidden";
				
				line.appendChild(lineTable);
				for(var j=0;j<tDef.cells.length;j++){
					/*还是要把type进行细分  不同类型的使用不同的方式，还是使用textarea更方便*/
					var cellTd=lineTable.rows[0].cells[j];
					var cellDef=tDef.cells[j];
	
					var cell=$txt();
					cfg.attrDoms.push(cell);
					cell.cellDef=cellDef;
					cellTd.appendChild(cell);
					if(data!=null&&data[cellDef.attr]!=null){
						cell.value=data[cellDef.attr];
					}
				}
				line.style.display="none";
			}
			else if(tDef.type==2){/*多行元素  有布局的情形在里面*/
				var lineTable=$table(tDef.rowNum,0);/*每个里面只有一个格子 能不能没有格子*/
				/*要把不同的row划分出来*/
				lineTable.className="rows";
				line.appendChild(lineTable);
				for(var j=0;j<lineTable.rows.length;j++){
					lineTable.rows[j].className="row";
				}
				for(var j=0;j<tDef.cells.length;j++){
					/*还是要把type进行细分  不同类型的使用不同的方式，还是使用textarea更方便*/
					var cellDef=tDef.cells[j];
					var cellTd=lineTable.rows[cellDef.row-1].insertCell(-1);/*插入一个格子*/
					if(cellDef.rowSpan)	cellTd.rowSpan=cellDef.rowSpan;
					if(cellDef.colSpan)	cellTd.colSpan=cellDef.colSpan;
					
					var cell=$e("div");
					cellTd.appendChild(cell);
					cell.style.textAlign=cellDef.align;
					if(cellDef.left!=null)	cell.style.paddingLeft=cellDef.left+"px";
					cell.style.width=cellDef.width-20+"px";
					if(cellDef.height!=null)	cell.style.height=cellDef.height+"px";

					cellTd.className="cell";
					if(cellDef.type=="blank")	cellTd.className="blank";
					if(cellDef.text!=null)		cell.innerHTML=cellDef.text;

				}
			}
			else if(tDef.type==3){/*代表是子表*/
				var rowNum=1+tDef.rowNum;
				var childData=[];
				/*对于新增或者修改表单是不同的处理方式*/
				if(cfg.formType=="add"){
				}
				else if(cfg.formType=="update"){
					var param={};/*这里需要主对象的参数*/
					param[tDef.refAttr.name2]=data[tDef.refAttr.name];										
					var childDataResult=$$(tDef.dataMethod,param);/*这就有了数据*/
					if(childDataResult.data!=null)	childData=childDataResult.data;
					rowNum=childData.length+1;
				}
				var lineTable=$table(rowNum,tDef.columns.length);/*默认放4行内容*/
				/*要把不同的row划分出来*/
				/*子表的数据要重新计算*/
				lineTable.className="childs select";
				line.appendChild(lineTable);
				lineTable.childDef=tDef;
				/*先生成表头，然后逐行生成空白行*/
				for(var j=0;j<lineTable.rows.length;j++){
					lineTable.rows[j].className="row";
				}
				for(var j=0;j<tDef.columns.length;j++){
					/*还是要把type进行细分  不同类型的使用不同的方式，还是使用textarea更方便*/
					var cellDef=tDef.columns[j];
					var cellTd=lineTable.rows[0].cells[j];/*先生成表头 */
					var cell=$e("div");
					cell.style.width=cellDef.width-20+"px";
					cellTd.className="cell";
					cell.innerHTML=cellDef.name;
					cellTd.appendChild(cell);
				}
			}
		}
	}
	
	x.genFormContent=function(form){
		var	cfg=form.formCfg;
		/*step1 生成表单标题*/
		genContent(form);
	}
})(window);

