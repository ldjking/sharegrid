/*42cmd			表单交互的操作按钮事件*/
(function(x){	/*menu效果*/
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		var form=$1(".form",target,1);
		var cfg=form.formCfg;
		if(cfg.excuteCmdState==true)	return;
		if(target.cmd!=null){
			if(target.disable)	return;		/*step1	判断是否禁用*//*step2	执行默认命令的操作*/
			if(target.cmd.cmd=="save")			saveForm(form,target);
			else if(target.cmd.cmd=="update")	updateForm(form);
			else if(target.cmd.cmd=="addItem")	x.addFormRow(form);
			else if(target.cmd.cmd=="rmItem")	x.rmFormRow(form);
			else if(target.cmd.cmd=="do")		doWork(form);
			/*step3 执行自定义命令*/
			if(target.cmd.fn!=null){
				var fn=target.cmd.fn;
				fn(target);
			}
		}
	}
	var doWork=function(form){/*处理工作流*/
		//out("do work");
	}
	var saveFormBack=function(cfg,result){
		if(result.flag==false){
			out("save form error",result);
			var cfg={title:"保存错误",content:result.error_text};
			x.msgAlert(cfg);
			return;
		}
		else{
			//out("save form success!");
		}
		var tables=cfg.childTables;
		for(var i=0;i<tables.length;i++){
			var table=tables[i];
			var def=table.childDef;
			
			if(def!=null){
				var datas=[];
				for(var j=1;j<table.rows.length;j++){
					var row=table.rows[j];
					var rowData={};
					for(var k=0;k<row.cells.length;k++){
						var text=row.cells[k].childNodes[0];
						if(text.cellDef!=null){
							var value=text.value.trim();
							if(value!=null&&value!="")	rowData[text.cellDef.attr]=value;
							var value2=text.value2;
							if(value2!=null&&value2!=""){
								rowData[text.cellDef.attr2]=value2;
							}
						}
					}
					if(x.jsonStr(rowData).trim()!="{}"){/*该行数据不是空*/
						if(def.refAttr!=null)	rowData[def.refAttr.name2]=obj[def.refAttr.name];/*需要引用主表数据*/
						////out("rowData",rowData);
						$$(def.addMethod,rowData,false,function(result){
								//out("saveitem result",result);
								if(result.flag){
								}
								else{
								}
							});
					}
					
				}
			}
		}
	}
	var saveForm=function(form,target){/*提交一个新增表单的内容*/
		var cfg=form.formCfg;
		var obj=genFormData(form);
		var method = target.cmd.bf;
		if(method!=null) {
			if(method()) {
				
			} else {
				return false;	
			}
		}
		if(isEmpty(obj))	return;
		$$(cfg.addMethod,obj,false,function(result){saveFormBack(cfg,result)});
	}
	
	var updateFormBack=function(result){
	}
	
	var updateForm=function(form){/*提交一个修改表单的内容*/
		////out("updateForm");
		form.formCfg.excuteCmdState=true;
		var cfg=form.formCfg;
		var updateMethod=cfg.updateMethod;
		var obj=genFormData(form);
		obj=x.mix(cfg.data,obj,true);/*修改主体数据*/
		if(x.jsonStr(obj,false)!=x.jsonStr(cfg.data,false)){
			var result=$$(cfg.updateMethod,obj,false);
			//out("update result",result);
		}
		/*逐项修改子表数据*/
		var tables=cfg.childTables;
		for(var i=0;i<tables.length;i++){
			var table=tables[i];
			var def=table.childDef;
			if(def!=null){
				if(def.type==3){
					for(var j=1;j<table.rows.length;j++){
						var row=table.rows[j];
						var rowData={};
						for(var k=0;k<row.cells.length;k++){
							var text=row.cells[k].childNodes[0];
							if(text.cellDef!=null){
								var value=text.value.trim();
								if(value!=null&&value!="")	rowData[text.cellDef.attr]=value;
								var value2=text.value2;
								if(value2!=null&&value2!=""){
									rowData[text.cellDef.attr2]=value2;
								}
							}
						}
						if(x.jsonStr(rowData).trim()!="{}"){/*该行数据不是空*/
							/*需要引用主表数据*/
							for(var z=0;z<def.refAttr.length;z++){
								var ref=def.refAttr[z];
								if(ref.name2==null)	ref.name2=ref.name;
								rowData[ref.name2]=obj[ref.name];										
							}
							////out("rowData",rowData);
							if(row.data==null){
								var result=$$(def.addMethod,rowData,false);
								//out("saveitem result",result);
							}
							else{
								if(row.style.display=="none"){/*代表是执行删除操作*/
									var result=$$(def.rmMethod,row.data,false);
									//out("rm child result",result);
								}
								else{/*这里要判断是否发生了变化*/
									var updateRowData=x.mix(row.data,rowData,true);/*覆盖混合*/
									var str1=x.jsonStr(row.data,false);
									var str2=x.jsonStr(updateRowData,false);
									if(str1==str2)	;/*什么叶不做  没有发生事实变化*/
									else{
										var result=$$(def.updateMethod,updateRowData,false);
										//out("update child result",result);
									}
								}
							}
						}
					}
				}
				else if(def.type==4)
				{
					var depende=table.childDef.dependeAttr;
					var dependecell=$("#"+cfg.id+"_attr"+depende);
					var result=$$(def.cleanMethod,obj);
					for(var j=1;j<table.rows.length;j++){
						var row=table.rows[j];
						var rowData={};
						for(var k=0;k<row.cells.length;k++){
							/*if(k==0){
								var checkbox=row.cells[k].childNodes[0];
								rowData.isSelected=checkbox.checked;
							}else{*/
								var text=row.cells[k].childNodes[0];
								if(text.cellDef!=null){
									var value=text.value.trim();
									if(value!=null&&value!="")	rowData[text.cellDef.attr]=value;
									var value2=text.value2;
									if(value2!=null&&value2!=""){
										rowData[text.cellDef.attr2]=value2;
									}
								}
							//}
						}
						if(x.jsonStr(rowData).trim()!="{}"){/*该行数据不是空*/
							if(rowData[def.pkAttr]!=null&&rowData[def.pkAttr]!=""&&rowData[def.pkAttr]!="0"){
								var result=$$(def.addMethod,rowData,false);
							}
							/*else if(rowData.isSelected==false&&rowData[def.pkAttr]!=null){
								var result=$$(def.rmMethod,rowData,false);
							}
							else if(rowData.isSelected==true&&rowData[def.pkAttr]!=null){
								out("updateRowData",rowData);
								var updateRowData=x.mix(row.data,rowData,true);
								var str1=x.jsonStr(row.data,false);
								var str2=x.jsonStr(updateRowData,false);
								if(str1==str2)	;
								else{
									out("updateRowData1",rowData);
									var result=$$(def.updateMethod,updateRowData,false);
								}
							}*/
						}
					}
				}
			}
		}
		/*修改成功后要刷新*/
		x.genFormContent(form);
	}
	x.genFormData=function(form){/*将一个表单的数据生成一个json对象*/
		var cfg=form.formCfg;
		var attrs=cfg.attrDoms;
		var tables=cfg.childTables;
		var obj={};
		for(var i=0;i<attrs.length;i++){
			var attr=attrs[i];
			var def=attr.cellDef;
			if(def!=null){
				if(def.type=="sid"&&cfg.formType=="add"){
					$$("sidGet",{type:def.sidType},false,function(result){
							if(result.flag){
								obj[attr.cellDef.attr]=result.data.sid;/*获取到序列值*/
							}
							else{
								//out("error",sidResult);
								return;/*如果序列值无法获取到，直接返回*/
							}
						});
					
				}
				
				if(attr.value2!=null&&attr.cellDef.attr2!=null){/*真正有用的是value2*/
					obj[attr.cellDef.attr2]=attr.value2;
				}
				else if(attr.value!=null&&attr.value.trim()!=""){
					obj[attr.cellDef.attr]=attr.value;
				}
			}
		}	
		return obj;
	}
	
	x.back_cmdCheck=function(c,checkFalse,result){
		if(result.flag==false){
			c.disable=true;
			x.cssRm(c,"hide");
			x.cssAdd(c,checkFalse);
		}else{
			c.disable=false;
			x.cssRm(c,"hide");
		}
	}
	
	var checkCmd=function(form){
		var cfg=form.formCfg;
		var cmds=cfg.cmds;
		var id=cfg.id;
		var cmd=$("#"+id+"_cmd");
		for(var i=0;i<cmd.childNodes.length;i++){
			var c=cmd.childNodes[i];
			if(c.cmd.checkMethod!=null){
				x.cssAdd(c,"hide");
				var checkFalse=cmds[i].checkFalse;
				var fn=x.hitch(null,back_cmdCheck,c,checkFalse);
				$$(cmds[i].checkMethod,cfg.param,false,fn);					
			}
		}
	}
	
	x.genFormCmd=function(form){/*每次不同的参数都要重新生成按钮吗 还是*/
		var cfg=form.formCfg;
		if(cfg.cmdGened==true){/*如果按钮已经生成过，直接进入校验环节*/
			checkCmd(form);
			return;
		}
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
					c.id = id+cmds[i].cmd;
					c.cmd=cmds[i];
					c.innerHTML=cmds[i].text;
					var className=cmds[i].class;
					if(className==null)	className="btn";
					c.className=className;/*自定义的操作按钮*/
					cmd.appendChild(c);
				}
			}
		}
		checkCmd(form);
		cfg.cmdGened=true;
		x.bind(cmd,	"click",e_cmd_click);
	}
})(window);
