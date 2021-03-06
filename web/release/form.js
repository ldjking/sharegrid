/*41form		表单交互*/
(function(x){	/*form由什么组成
					1cfg	定义这个表单是何种类型的表单  取数方法  数据操作权限
					2tables	这个表单是由哪些子项组成
					3cmds	操作按钮定义	提交方法  按钮定义在何种状态
					*/		
	x.genForm=function(dom,cfg){
		var form=dom;
		form.formCfg=cfg;
		cfg.dom=dom;
		/*step1 生成表单标题*/
		x.cssAdd(form,"form");
		if(cfg.bigPaper)	x.cssAdd(form,"big");
		cfg.id=x.getId("form");
		
		var cmdbar=$div(cfg.id+"_cmdbar","cmdbar");
		var container=$div(cfg.id+"_container","formContainer");
		var doc=$div(cfg.id+"_doc","doc");
		var paper=$div(cfg.id+"_paper","paper");
		var errorMsg=$div(cfg.id+"_errorMsg","errorMsg");
		var errorText=$div(cfg.id+"_errorText","info");
		var tri=$div(null,"tri");
		
		x.addChild(form,[cmdbar,container]);/*增加子项*/
		container.appendChild(doc);
		x.addChild(doc,[paper,errorMsg]);
		x.addChild(errorMsg,[errorText,tri]);

		x.uiLayout({dom:container,container:form,dx:0,dy:0,ydoms:[cmdbar]});
		
		//if(cfg.formType=="update"&&!(cfg.param!=null||cfg.data!=null))return;/*如果是修改表单，缺少数据或参数，直接返回*/
		//out("form",form);
		x.genFormScroll(form);/*先一步生成滚动条*/
		x.genFormContent(form);
		/*滚动的时候实际上是调整 doc的相对位置  所以error提示框的位置应该位于doc内部*/
		x.uiForm(form);
		x.dependeCheck(form);
		x.dependeRangeCheck(form);
	}	
	
})(window);
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
			var cfg={title:"保存错误",content:result.errorText};
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
/*43content		表单内容生成*/
(function(x){	/*menu效果*/
	var e_text_keyup=function(evt){/*判断这个对象的真实高度   判断校验是否满足  gt  lt*/
		var cellDef=this.cellDef;
		var scrollHeight=this.scrollHeight;
		if(cellDef!=null&&cellDef.height!=null){
			if(cellDef.height<scrollHeight)		this.style.height=scrollHeight+"px";
		}
		else	this.style.height=scrollHeight+"px";
	}
	var e_text_mousedown=function(evt){/*输入框的单击事件*/
		//out("mouse down");
		var target=this;
		var cellDef=this.cellDef;//out("target.disabled",target.disabled);
		if(cellDef!=null&&target.disabled!=true){
			if(cellDef.lov!=null){
				/*如果lov有依赖项  要取到依赖项的值作为参数  如果依赖项还没有值  则暂时不弹出值列表  而是弹出消息提示*/
				if(cellDef.lovdeps!=null){
					out("cellDef",cellDef);
					for(var i=0;i<cellDef.lovdeps.length;i++){
						var dep=cellDef.lovdeps[i];/*怎样找到这个对象是个问题所在*/
						
					}
				}
				else{
					x.openLov(target,cellDef.lov);
				}
			}
		}
		/*要保证该输入框被完整的呈现出来*/
		/**/
	}
	
	var e_text_focus=function(evt){/*focus和blur影响的是提示信息*/
		//out("focus");
		var target=this;
		var td=target.parentNode;
		var cellDef=this.cellDef;
		if(x.cssContain(td,"hint")){
			x.cssRm(td,"hint");
			target.value="";
			target.style.textAlign=cellDef.align;
		}
		if(x.cssContain(target,"error")){/*如果是error则显示  否则应该隐藏错误提示框*/
			f_error_show(target);
		}
		else{
			
		}
	}
	
	var e_text_mousemove=function(evt){
		var target=this;
		var form=x.$1(".form",target,0);
		var cfg=form.formCfg;
		if(cfg.lastVisit==target)	return;
		cfg.lastVisit=target;
		
		if(x.cssContain(target,"error")){
			f_error_show(target);
		}
		else{
			var errorMsg=$("#"+cfg.id+"_errorMsg");
			errorMsg.style.display="none";/*在move的过程中发现该单元格没有错误信息则隐藏错误信息框*/
		}
	}
	
	var e_text_blur=function(evt){
		//out("blur");
		var target=this;
		var td=target.parentNode;

		var cellDef=this.cellDef;
		if(cellDef.hint!=null){
			if(target.value.trim()==""){
				x.cssAdd(td,"hint");
				target.style.textAlign="right";
				target.value=cellDef.hint;
			}
		}
	}
	
	var e_text_paste=function(evt){/*禁用粘贴 */
		x.stopEvt(evt);
	}
	
	var e_text_keydown=function(evt){
		/*输入校验  1针对数字类型  2针对字符串最大长度    复制和粘贴会突破校验限制*/
		var cell=this;
		var cellDef=this.cellDef;
		var key=evt.keyCode;/*96到105是数字   48到57是数字*/
		//out("key",key);
		/*如果是控制按钮 允许放行 控制按钮  包括  左右上下home end 方向键  删除和delete按钮*/
		var ctrlKeys=[8,9,46,38,40,37,39,33,34,36,35,112,113,114,115,116,117,118,119,120,121,121,123];
		/*8是删除键 9是tab键 46是delete键  38403739是上下左右键  3334pageup pagedown 3635 home end  112至123是f1到f12*/
		if(x.contains(ctrlKeys,key)){
			//out("is ctrl key");
			return;/*对控制按钮放行*/
		}
		if(cellDef.dt=="num"){
			if(!((key>=96&&key<=105)||(key>=48&&key<=57)||key==190||key==189)){/*190是小数点  189是负号*/
				x.stopEvt(evt);/*num的允许范围较窄*/
			}
		}
		if(cellDef.maxlen>0){
			var currLen=cell.value.length;
			//out("currLen="+currLen+"maxlen="+cellDef.maxlen);
			if(currLen>=cellDef.maxlen){/*str不允许超出长度*/
				x.stopEvt(evt);
			}
		}
	}
	
	var e_childTable_click=function(evt){
		/*让所属行的颜色变色*/
		var target=evt.target;
		var form=x.$1(".form",target,1);
		var cfg=form.formCfg;
		var tr=x.$1("tr",target,1);
		if(cfg.lastSelectRow!=tr){
			x.cssRm(cfg.lastSelectRow,"selectRow");
		}
		cfg.lastSelectRow=tr;
		x.cssAdd(cfg.lastSelectRow,"selectRow");
		//out("childTable",tr);
		//tr.style.backgroundColor="#ccc";
		//for(var i=0;i<)
	}
	
	var e_text_onchange=function(evt){/*onchange 影响的是校验信息*/
		out("text change 执行校验")
		var form=x.$1(".form",evt.target,1);
		var cfg=form.formCfg;
		var cell=this;
		//out("cell change",cell);
		var docheck=function(cell,result){
			out("result",result)
			if(!result.flag){
				x.cssAdd(result.cell,"error");/*变红*/
				result.cell.error=result.error;
				f_error_show(result.cell);/*上方错误信息框*/
			}
			else{
				x.cssRm(cell,"error");/*清除错误标记*/
				cell.error=null;
				var errorMsg=$("#"+cfg.id+"_errorMsg");
				errorMsg.style.display="none";
			}
		}
		var result=x.checkFormCell(cell,form);
		docheck(cell,result);
		var cellattr=cell.cellDef.attr
		for(var i=0;i<result.rangeResult.length;i++){
			//if(cellattr==result.rangeResult[i].cell.cellDef.attr||cellattr==result.rangeResult[i].cell.cellDef.rangeCheck)
			var rangeattr=[];
			rangeattr.push(result.rangeResult[i].cell.cellDef.attr);
			for(var j=0;j<result.rangeResult[i].cell.cellDef.rangeCheck.eles.length;j++){
				if(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].gt!=null){
					rangeattr.push(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].gt);
				}
				else if(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].lt!=null){
					rangeattr.push(result.rangeResult[i].cell.cellDef.rangeCheck.eles[j].lt);
				}
			}
			if(x.contains(rangeattr,cellattr)) docheck(result.rangeResult[i].cell,result.rangeResult[i]);
			//if(!result.rangeResult[i].flag) break;
		}
		
	}
	
	var e_formTable_mousedown=function(evt){
		/*将鼠标所在的行设为active 有个明显的背景色		并记录
		  将鼠标所在的单元格设为active 有个明显的背景色  并记录
		*/
		var target=x.getTarget(evt);
		var form=x.$1(".form",target,0);
		var cfg=form.formCfg;
		////out("form",form);
		cfg.lastVisit=target;
		////out("last visit",target);
	}
	
	var f_error_show=function(cell){/*显示某个对象的错误提示信息*/
		var form=x.$1(".form",cell,0);
		var cfg=form.formCfg;
		var doc=x.$("#"+cfg.id+"_doc");
		var errorMsg=$("#"+cfg.id+"_errorMsg");
		var errorText=$("#"+cfg.id+"_errorText");
		errorText.innerHTML=cell.error;/**/
		errorMsg.style.display="block";
		var rect=x.getRect2(cell.parentNode);/*除了这个rect以外 还要考虑当前的容器的top值*/
		//out("rect",rect);
		var top=x.toNum(x.getStyle(doc).top);
		//out("top",top);
		errorMsg.style.left=Math.floor(rect.left)+"px";
		errorMsg.style.top=Math.floor(rect.top-top-14)+"px";
		
	}
	
	var genChildTableContent=function(cfg,line,rowNum,tDef,childData){
		var lineTable=$table(rowNum,tDef.columns.length);/*默认放4行内容*/
		/*要把不同的row划分出来*/
		/*子表的数据要重新计算*/
		lineTable.className="childs";
		line.appendChild(lineTable);
		x.bind(lineTable,"click",e_childTable_click);
		lineTable.childDef=tDef;
		cfg.childTables.push(lineTable);
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
			cellTd.className="lbl";
			cell.innerHTML=cellDef.name;
			cellTd.appendChild(cell);
			for(var z=1;z<rowNum;z++){/*生成剩余的行*/
				var obj=childData[z-1];
				lineTable.rows[z].data=obj;
				////out("obj",obj);
				var cellTd2=lineTable.rows[z].cells[j];/*再生成3行空白行供输入 */
				var cell2=$text("text");
				cell2.cellDef=cellDef;
				
				cellTd2.appendChild(cell2);

				x.bind(cell2,"mousedown",e_text_mousedown);
				x.bind(cell2,"keyup",e_text_keyup);
				x.bind(cell2,"change",e_text_onchange);
				cell2.rows=1;
				cell2.style.width=(cellDef.width-20)+"px";
				cell2.style.textAlign=cellDef.align;
				cellTd2.className="attr";
				
				if(obj!=null&&obj[cellDef.attr]!=null){
					cell2.value=obj[cellDef.attr];/*设置内容后要重新计算高度*/
					cell2.oriValue=obj[cellDef.attr];/*原始值*/
					if(cellDef.height==null)	cell.style.height=cell.scrollHeight+"px";
					else if(cellDef.height<cell.scrollHeight)	cell.style.height=cell.scrollHeight+"px";										
				}
			}
		}
	}
	
	var genContent=function(form){
		x.genFormCmd(form);
		var cfg=form.formCfg;
		var data=cfg.data;
		var id=cfg.id;
		var tables=cfg.tables;
		var paper=$("#"+id+"_paper");		
		paper.innerHTML="";/*代表要重绘内容*/
		var div=$div(null,"form_title");
		div.innerHTML=cfg.title;
		
		x.addChild(paper,[div]);

		var formTable=$table(tables.length,1);/*x行，每行1列*/
		formTable.className="formTable";
		x.addChild(paper,[formTable]);
		x.bind(formTable,"mousedown",e_formTable_mousedown);

		for(var i=0;i<formTable.rows.length;i++){
			var line=formTable.rows[i].cells[0];
			var tDef=tables[i];
			tDef.rowNum=tDef.rows;
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
					if(cellDef.rowspan)	cellTd.rowSpan=cellDef.rowspan;
					if(cellDef.colspan)	cellTd.colSpan=cellDef.colspan;
					
					if(cellDef.type=="lbl"||cellDef.type=="blank"){/*文本标签类*/
						var cell=$e("div");
						cellTd.appendChild(cell);
						cell.style.textAlign=cellDef.align;
						if(cellDef.left!=null)	cell.style.paddingLeft=cellDef.left+"px";
						cell.style.width=cellDef.width-20+"px";
						cellTd.className="lbl";
						if(cellDef.type=="blank")	cellTd.className="blank";
						cell.innerHTML=cellDef.text;
					}
					else if(cellDef.type=="img"){
						var rowIndex=cellDef.row;
						var attr=cellDef.attr;
						var cell=$div(id+"_attr"+attr,"img");
						cellTd.appendChild(cell);
						cfg.attrDoms.push(cell);
						cell.cellDef=cellDef;

						cellTd.style.textAlign="center";
						//out("row",cellDef.row);
						//cell.style.textAlign=cellDef.align;
						if(cellDef.left!=null)	cell.style.paddingLeft=cellDef.left+"px";
						cell.style.width=cellDef.width-20+"px";
						cell.style.height=cellDef.height+"px";
						cellTd.className="lbl";
						//cell.innerHTML=cellDef.text;
						var file=$file();
						file.id="file"+rowIndex;
						file.name="file"+rowIndex;
						file.style.height=cellDef.height+"px";
						cell.appendChild(file);
						var div=$div(null,"text");
						div.innerHTML=cellDef.text;
						cell.appendChild(div);
						div.style.top=(cellDef.height-div.clientHeight)/2+"px";
						div.style.left=(cellDef.width-div.clientWidth)/2+"px";
						if(data!=null&&data[cellDef.attr]!=null){
							cell.value=data[cellDef.attr];
							 var url="url(http://localhost"+data[cellDef.attr]+")";
							 cell.style.backgroundImage=url;
							 div.innerHTML="&nbsp;";
						}
						x.bind(file,"change",ajaxUpload);
						var onMsg=function(cell,e){
							var result = eval("("+e.data+")");  
							//alert("attr"+attr);  
							 var url="url(http://localhost"+result.data.imgSrc+")";
							 
							 //out("this",this);
							 //out("url",url);
							 cell.style.backgroundImage=url;
							 cell.value=result.data.imgSrc;
							 //cell.value2=url;
							 cell.childNodes[1].innerHTML="&nbsp;";
							 //div.innerHTML="";
						}
						window.onmessage=x.hitch({},onMsg,cell);
						//file.style.backgroundColor="#cccccc"
						file.cfg={url:cellDef.uploadurl+"?path="+cellDef.path,dom:file};						
					}
					else if(cellDef.type=="lov"){/*值列表*/
						//out("lov");
						var cell=$text("slt");
						cellTd.appendChild(cell);
						cell.id=cfg.id+"_attr"+cellDef.attr;
						x.bind(cell,"mousedown",e_text_mousedown);
						x.bind(cell,"focus",e_text_focus);
						//x.bind(cell,"blur",e_text_blur);
						//x.bind(cell,"keyup",e_text_keyup);
						//x.bind(cell,"change",e_text_onchange);
						cell.readOnly=true;
						cell.cellDef=cellDef;
						cfg.attrDoms.push(cell);
						cell.style.width=cellDef.width-20+"px";
						if(cellDef.height!=null)	cell.style.height=cellDef.height+"px";
						cell.style.textAlign=cellDef.align;
						if(data!=null&&data[cellDef.attr2]!=null){
							cell.value2=data[cellDef.attr2];/*如果提供了value2参数 直接赋值*/
						}
						if(data!=null&&data[cellDef.attr]!=null){
							cell.value=data[cellDef.attr];/*设置内容后要重新计算高度*/
							cell.oriValue=data[cellDef.attr];/*原始值*/
							if(cellDef.height==null)	cell.style.height=cell.scrollHeight+"px";
							else if(cellDef.height<cell.scrollHeight)	cell.style.height=cell.scrollHeight+"px";
						}
						cellTd.className="attr";/**/
						if(cellDef.hint!=null){
							x.cssAdd(cellTd,"hint");
							cell.value=cellDef.hint;
							cell.style.textAlign="right";
							//x.bind(cell,"focus",e_text_focus);
							//x.bind(cell,"blur",e_text_blur);
						}
						if(cellDef.disable){
							cell.disabled=true;
							x.cssAdd(cellTd,"disable");
						}
					}
					else if(cellDef.type=="txt"){/*可输入项*/
						var cell=$text("text");
						cellTd.appendChild(cell);
						cell.id=cfg.id+"_attr"+cellDef.attr;
						x.bind(cell,"mousedown",e_text_mousedown);
						x.bind(cell,"mousemove",e_text_mousemove);
						x.bind(cell,"keydown",e_text_keydown);/*对于数字型的需要监听key事件，并禁止非数字键入*/
						x.bind(cell,"keyup",e_text_keyup);
						x.bind(cell,"paste",e_text_paste);
						x.bind(cell,"change",e_text_onchange);
						x.bind(cell,"focus",e_text_focus);
						x.bind(cell,"blur",e_text_blur);

						cell.cellDef=cellDef;
						cfg.attrDoms.push(cell);
						cell.style.width=cellDef.width-20+"px";
						if(cellDef.height!=null)	cell.style.height=cellDef.height+"px";
						cell.style.textAlign=cellDef.align;
						////out("data["+cellDef.attr+"]",data[cellDef.attr]);
						if(data!=null&&data[cellDef.attr2]!=null){
							cell.value2=data[cellDef.attr2];/*如果提供了value2参数 直接赋值*/
						}
						if(data!=null&&data[cellDef.attr]!=null){
							cell.value=data[cellDef.attr];/*设置内容后要重新计算高度*/
							cell.oriValue=data[cellDef.attr];/*原始值*/
							if(cellDef.height==null)	cell.style.height=cell.scrollHeight+"px";
							else if(cellDef.height<cell.scrollHeight)	cell.style.height=cell.scrollHeight+"px";
						}
						cellTd.className="attr";/**/
						if(cellDef.hint!=null){
							x.cssAdd(cellTd,"hint");
							cell.value=cellDef.hint;
							cell.style.textAlign="right";

						}
						cell.readOnly=true;
						if(cellDef.type=="txt")			cell.readOnly=false;
						if(cellDef.disable){
							cell.disabled=true;
							x.cssAdd(cellTd,"disable");
						}
					}
				}
			}
			else if(tDef.type==3){/*代表是子表*/
				var rowNum=1+tDef.rowNum;
				var childData=[];
				/*对于新增或者修改表单是不同的处理方式*/
				if(cfg.formType=="add"){
					genChildTableContent(cfg,line,rowNum,tDef,childData);
				}
				else if(cfg.formType=="update"){
					var param={};/*这里需要主对象的参数  主对象的参数可能不止一项  也许有多项*/
					if(tDef.refAttr!=null){
						for(var z=0;z<tDef.refAttr.length;z++){
							var ref=tDef.refAttr[z];
							if(ref.name2==null)	ref.name2=ref.name;
							param[ref.name2]=data[ref.name];										
						}
					}
					var result=$$(tDef.dataMethod,param,false);
					if(result.data!=null)	childData=result.data;
					rowNum=childData.length+1;
					genChildTableContent(cfg,line,rowNum,tDef,childData);
				}
				
			}
		}
		cfg.lastData=cfg.data;
		x.fixFormScroll(form);
	}
	
	x.genFormContent=function(form){
		var	cfg=form.formCfg;
		cfg.excuteCmdState=false;
		cfg.attrDoms=[];/*属性输入*/
		cfg.childTables=[];/*子表数据*/
		/*step1 生成表单标题*/
		var data=cfg.data;
		if(cfg.dataMethod!=null){
			/*要取这个数据*/
			var result=$$(cfg.dataMethod,cfg.param,false);
			if(result.flag){
				data=result.data;
				cfg.data=data;
				genContent(form);
			}
		}
		else	genContent(form);
	}
	/*还要判断是否为新增表单  还是修改表单   新增表单不需要记录删除情况   修改表单要记录删除情况*/
	x.addFormRow=function(form){/*新增行*/
		////out("addItem click");
		var cfg=form.formCfg;
		var lastVisit=cfg.lastSelectRow;
		if(lastVisit!=null){/*判断lastVisit所处的表格是否为childs*/
			var lineTable=x.$1(".childs",lastVisit,0);
			if(lineTable!=null){/*复制一行是不可行的，要逐项加入*/
				////out("addRow");
				var tDef=lineTable.childDef;
				var tr=$e("tr");
				tr.className="row";
				//out("lastVisit",lastVisit);
				x.insertDom(lastVisit,tr);/*不能appendChild到最后一行 要放到选中行的后面*/
				for(var j=0;j<tDef.columns.length;j++){
					/*还是要把type进行细分  不同类型的使用不同的方式，还是使用textarea更方便*/
					var cellDef=tDef.columns[j];
					var cellTd2=$e("td");/*在末尾处添加 */
					var cell2=$text("text");
					cell2.cellDef=cellDef;
					tr.appendChild(cellTd2);
					cellTd2.appendChild(cell2);

					x.bind(cell2,"mousedown",e_text_mousedown);
					x.bind(cell2,"keyup",e_text_keyup);
					x.bind(cell2,"paste",e_text_paste);
					x.bind(cell2,"change",e_text_onchange);

					cell2.rows=1;
					cell2.style.width=(cellDef.width-20)+"px";
					cell2.style.textAlign=cellDef.align;
					cellTd2.className="attr";
				}
			}
		}
	}
	
	x.rmFormRow=function(form){/*新增行*/
		var cfg=form.formCfg;
		var lastVisit=cfg.lastSelectRow;
		if(lastVisit!=null){/*判断lastVisit所处的表格是否为childs*/
			var lineTable=x.$1(".childs",lastVisit,0);
			if(lineTable!=null){
				var tr=lastVisit;
				var nextTr=tr.nextSibling;
				if(nextTr==null)	nextTr=tr.previousSibling;
				cfg.lastSelectRow=nextTr;
				x.cssAdd(nextTr,"selectRow");
				if(tr==lineTable.rows[0])	return;/*表头无法被删除*/
				if(cfg.formType=="add")	lineTable.childNodes[0].removeChild(tr);/*删除*/
				else{
					if(tr.data==null)		lineTable.childNodes[0].removeChild(tr);/*删除*/
					else					tr.style.display="none";/*隐藏*/
				}
			}
		}
		cfg.lastVisit=null;/*把最后访问的对象清空*/
	}
})(window);
/*44attr		表单输入框控制*/
(function(x){	/*menu效果*/
	x.enableFormAttr=function(form,attrs){
		var cfg=form.formCfg;/*配置*/
		for(var i=0;i<attrs.length;i++){
			/*逐项找到输入项 将disable状态设为enable*/
			var attr=attrs[i];
			var dom=$("#"+cfg.id+"_attr"+attr);
			if(dom!=null){
					dom.disabled=false;
					x.cssRm(dom.parentNode,"disable");
			}
			
		}
	}
	x.getFormAttr=function(form,attr,cell){/*获取表单输入项值  ref是参照*/
		/*第一步要知道ref是什么类型		固定类型还是相对类型*/
		var cfg=form.formCfg;
		if(cell==null)	return $("#"+cfg.id+"_attr"+attr);
		else{
			var cellDef=cell.cellDef;/*单元格定义 如果该单元格的类型是固定的*/
		}
		
	}
	x.disableFormAttr=function(form,attrs){
		var cfg=form.formCfg;/*配置*/
		for(var i=0;i<attrs.length;i++){
			/*逐项找到输入项 将disable状态设为enable*/
			var attr=attrs[i];
			var dom=$("#"+cfg.id+"_attr"+attr);
			if(dom!=null){
					dom.disabled=true;
					x.cssAdd(dom.parentNode,"disable");
			}
			
		}
	}
})(window);
/*45check	表单校验部分 */
(function(x){	/*menu效果*/
	x.comptime=function(beginTime,endTime) {
			//var beginTime = "2009-09-21 00:00:00";
			//var endTime = "2009-09-21 00:00:01";
			var beginTimes = beginTime.substring(0, 10).split('-');
			var endTimes = (endTime+":00").substring(0, 10).split('-');
			var len=beginTime.substring(10, 19).length;
			beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + (beginTime.split(" ")[1]!=null&&beginTime.split(" ")[1]!=""?beginTime.split(" ")[1]:"00:00:00");
			var len=endTime.substring(10, 19).length;
			endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + (endTime.split(" ")[1]!=null&&endTime.split(" ")[1]!=""?endTime.split(" ")[1]:"00:00:00");
			var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
			return a;
	}
	x.rangeCheck=function(form){
		var result=[]
		
		var cfg=form.formCfg
		var tables=cfg.tables;
		var ranges=[];
		
		var dorangecheck=function(rangecheck,cell){
			var is=true
			var value=cell.value;
			for(var i=0;i<rangecheck.eles.length;i++){
				if(rangecheck.type=="num"){
						value=parseInt(value)
						if(rangecheck.eles[i].gt!=null){
							elevalue=parseInt($("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].gt).value);
							if(value!=null&&elevalue!=null&&isNum(value)&&isNum(elevalue)){
								if(elevalue>=value){
									is=false;
									break;
								}
							}
						}
						else if(rangecheck.eles[i].lt!=null){
							elevalue=parseInt($("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].lt).value);
							if(value!=null&&elevalue!=null&&isNum(value)&&isNum(elevalue)){
								if(elevalue<=value){
									is=false;
									break;
								}
							}
						}
				}
				else if(rangecheck.type=="datetime"){
						var elevalue;
						if(rangecheck.eles[i].gt!=null){
							elevalue=$("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].gt).value;
							if(value!=null&&elevalue!=null&&value!=""&&elevalue!="")
							if(x.comptime(elevalue,value)<=0){
									is=false;
									break;
							}
						}
						else if(rangecheck.eles[i].lt!=null){
							elevalue=$("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].lt).value;
							if(value!=null&&elevalue!=null&&value!=""&&elevalue!="")
							if(x.comptime(elevalue,value)>=0){
									is=false;
									break;
							}
						}
				}
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.rangeCheck!=null){
					ranges.push(cell);
				}
			}
		}
		for(var i=0;i<ranges.length;i++){
			var cell=ranges[i];
			var rangecheck=cell.rangeCheck;
			var c=$("#"+cfg.id+"_attr"+cell.attr)
			var is=dorangecheck(rangecheck,c);
			var r={};
			r.cell=c;
			if(!is){
				r.flag=false;
				r.error=cell.error;
			}
			else{
				r.flag=true;
				r.error=null;
			}
			result.push(r)
		}
		return result;
	}
	x.dependeRangeCheck=function(form){
		var cfg=form.formCfg
		var tables=cfg.tables;
		var dependes=[];
		var disableCell=function(cell){
			var c=$("#"+cfg.id+"_attr"+cell.attr);
			x.disableFormAttr(form,[cell.attr]);
		}
		var enableCell=function(cell){
			x.enableFormAttr(form,[cell.attr]);
		}
		var dodependecheck=function(dependerangecheck){
			var is=true
			for(var i=0;i<dependerangecheck.length;i++){
				var dom=$("#"+cfg.id+"_attr"+dependerangecheck[i].dom);
				var fn=dependerangecheck[i].dependeCheck;
				if(!fn.call(null,dom,cell)){
					is=false;
				}
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.dependeRangeCheck!=null){
					dependes.push(cell);
				}
			}
		}
		for(var i=0;i<dependes.length;i++){
			var cell=dependes[i];
			var dependerangecheck=cell.dependeRangeCheck;
			var is=dodependecheck(dependerangecheck,cell);
			if(!is) 	disableCell(cell);
			else        enableCell(cell);
		}
	}
	x.dependeCheck=function(from){
		var cfg=from.formCfg
		var tables=cfg.tables;
		var dependes=[];
		var disableCell=function(cell){
			var c=$("#"+cfg.id+"_attr"+cell.attr)
			c.value="";
			x.disableFormAttr(from,[cell.attr]);
		}
		var enableCell=function(cell){
			x.enableFormAttr(from,[cell.attr]);
		}
		var dodependecheck=function(dependecheck){
			var is=true
			for(var i=0;i<dependecheck.length;i++){
				var dependtext=$("#"+cfg.id+"_attr"+dependecheck[i]);
				if(dependtext.value=="")is=false;
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.dependeCheck!=null){
					dependes.push(cell);
				}
			}
		}
		for(var i=0;i<dependes.length;i++){
			var cell=dependes[i];
			var dependecheck=cell.dependeCheck;
			var isnull=dodependecheck(dependecheck);
			if(!isnull) disableCell(cell);
			else        enableCell(cell);
		}
	}

	
	x.checkFormCell=function(cell,form,isT){/*测试表单的输入项*/
		/*返回数据结构  result.flag   error:*/
		/*校验类别 email  包括提交给服务器校验  包括依赖项*/
		var result={}
		result.cell=cell;
		result.flag=true;
		//out("cell check",cell);
		var cellDef=cell.cellDef;
		var dt=cellDef.dt;
		var cellreg=cellDef.reg;
		var gt=cellDef.gt;
		var lt=cellDef.lt;
		var gt2=cellDef.gt2;
		var lt2=cellDef.lt2;
		//var dependecheck=cellDef.dependeCheck;
		var checkmethod=cellDef.checkMethod;
		var tricheck=cellDef.triCheck;
		//var rangecheck=cellDef.rangeCheck;
		//var reflrangecheck=cellDef.reflrangeCheck;
		//var childrangecheck=cellDef.childrangeCheck;
		var minlen=cellDef.minlen;
		var oncheckchange=cellDef.oncheckchange
		var checkdes=cellDef.des;
		var data=x.genFormData(form);
		var istri=cellDef.istri;
		if(istri&&isT==null)return result;
		/*进行数据的校验 校验类型包括  email  mobile  phone  fax   pw复杂度  */
		var value=cell.value2!=null?cell.value2:cell.value;
		var reg;
		
		var getError=function(def){
			if(isFun(def.error)){
				var errorresult=def.error.call(null,cell,form);
				return errorresult;
			}else{
				return def.error;
			}
		}
		var regTest=function(result,reg,value,msg){
			if(value==""||!reg.test(value)){
				result.flag=false;
				if(msg!=null)      result.error=msg;
				else result.error=getError(cellDef);
			}
		}
		
		if(dt=="num"){
			/*如果它的正则表单式校验不通过*/
			//out("num");
			reg=/^[-+]?\d*$/; 
			var msg="请输入数值";
			regTest(result,reg,value,msg);
			if(result.flag){
				if(gt!=null){
					var gv=parseInt(value)
					if(gv<=parseInt(gt)){
						result.flag=false;
						result.error="值要大于"+gt;
					}
				}
				if(lt!=null){
					var lv=parseInt(value)
					if(lv>=parseInt(lt)){
						result.flag=false;
						result.error="值要小于"+lt;
					}
				}
				if(gt2!=null){
					var gv=parseInt(value)
					if(gv<parseInt(gt2)){
						result.flag=false;
						result.error="值要大于等于"+gt;
					}
				}
				if(lt2!=null){
					var lv=parseInt(value)
					if(lv>parseInt(lt2)){
						result.flag=false;
						result.error="值要小于等于"+gt;
					}
				}
			}
		}
		else if(dt=="datetime"||dt=="date"){
				if(gt!=null){
					var r= x.comptime(gt,value);
					if(r<=0){
						result.flag=false;
						result.error="日期要大于"+gt;
					}
				}
				if(lt!=null){
					var r= x.comptime(lt,value);
					if(r>=0){
						result.flag=false;
						result.error="日期要小于"+lt;
					}
				}
				if(gt2!=null){
					var r= x.comptime(gt2,value);
					if(r<0){
						result.flag=false;
						result.error="日期要大于等于"+gt2;
					}
				}
				if(lt2!=null){
					var r= x.comptime(lt2,value);
					if(r>0){
						result.flag=false;
						result.error="日期要小于等于"+gt2;
					}
				}
		}
		else if(dt=="email"){
			reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
			var msg="不是正确的邮箱格式,eg: xxxx@yyy.com";
			regTest(result,reg,value,msg);
		}
		else if(dt=="mobile"){
			reg=/^((\(\d{2,3}\))|(\d{3}\-))?1[5,8,3]\d{9}$/;
			var msg="不是正确的手机格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="phone"){
			reg=/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/  
			var msg="不是正确的电话格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="url"){
			reg=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/   
			var msg="不是正确的url格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="idcard"){/*身份证信息*/
			reg=/^\d{15}(\d{2}[A-Za-z0-9])?$/ 
			var msg="不是正确的身份证格式";
			regTest(result,reg,value,msg);
		}
		else if(cellreg!=null){/*其他情况可以设置正则表达式校验   dt=reg   reg=\[a-b]{0}[]\g*/
			reg=cellreg;
			regTest(result,reg,value); 
		}
		if(oncheckchange!=null){
			if(result.flag){
				result=oncheckchange(cell,form,result)
			}
		}
		if(minlen!=null){
			if(result.flag){
				if(value.length<minlen){
						result.flag=false;
						result.error="字符的长度要大于"+minlen;
				}
			}
		}
		if(checkmethod!=null){
			if(result.flag){
				var param={value:value};
				if(checkdes!=null){
					for(var i=0;i<checkdes.length;i++){
						param[checkdes[i]]=data[checkdes[i]];
					}
					var methodr=$$(checkmethod,param);
					if(!methodr.flag){
						result.flag=false;
						result.error=methodr.errorText;
					}
				}
			}
		}
		if(tricheck!=null){
			if(result.flag){
				for(var i=0;i<tricheck.length;i++){
					var tri=tricheck[i];
					var tricell=$("#"+form.formCfg.id+"_attr"+tri);
					if(tricell!=null&&tricell.value!=""){
						var triresult=checkFormCell(tricell,form,true);
						if(!triresult.flag){
							result=triresult;
							break;
						}
					}
				}
			}
		}
		x.dependeCheck(form);
		x.dependeRangeCheck(form);
		var r=x.rangeCheck(form);
		result.rangeResult=r;
		return result;
	}
	
	/*第一步  基本正则 完成*/
	/*第二步  自定义正则 完成*/
	/*第三步  依赖关系  【gt lt】 完成*/
	/*第四步  服务器校验  简单  完成*/
	/*第五步  服务器校验  带依赖  完成*/
	/*第六步  校验触发   完成*/
	/*第七步  自定义函数  result.flag */

})(window);
(function(x){	/*45	效果 带分页 带滚动条  带列自动拖拽*/

	var e_scroll_v_mousedown=function(evt){
		//out("mousedown");
		var form	=x.$1(".form",this,0);
		var cfg=form.formCfg;
		cfg.scrollType="v";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	var e_scroll_h_mousedown=function(evt){
		var form	=x.$1(".form",this,0);
		var cfg=form.formCfg;
		cfg.scrollType="h";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	x.scrollForm=function(form,dx,dy){
		/*让网格内容滚动以便于将输入框完整呈现出来  dx水平方向位移  dy垂直方向位移*/
		var cfg=form.formCfg;
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
	x.genFormScroll=function(form){
		/*生成网络对象的滚动条*/
		//out("gen form scroll");
		var cfg=form.formCfg;
		var id=cfg.id;
		var formContainer=$("#"+id+"_container");
		var scroll_h	=x.$div(id+"_scroll_h","scroll_h");
		var scrollbar_h	=x.$div(id+"_scrollbar_h","scrollbar_h");
		var scroll_v	=x.$div(id+"_scroll_v","scroll_v");
		var scrollbar_v	=x.$div(id+"_scrollbar_v","scrollbar_v");
		x.addChild(formContainer,[scroll_h,scrollbar_h,scroll_v,scrollbar_v]);
		x.bind(scrollbar_h,	"mousedown",	e_scroll_h_mousedown);/*水平位移*/
		x.bind(scrollbar_v,	"mousedown",	e_scroll_v_mousedown);/*垂直位移*/
	}
})(window);(function(x){	/*注册grid的一些全局事件*/
	x.fixFormScroll=function(form){
		var cfg			=form.formCfg;						/*grid的配置文件 里面同时存放各种状态参数*/
		var id="#"+cfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_doc");
		
		//out("fixForm scroll");
	    //out("clientWidth",container.clientWidth);
		//out("clientHeight",container.clientHeight);
		//out("scrollWidth",container.scrollWidth);
		//out("scrollHeight",container.scrollHeight);

		var formWidth		=container.clientWidth	/*grid的宽度*/
		var formHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;

		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>formWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>formHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=formWidth-12;					/*滚动区域宽度*/
		var	scrollHeight	=formHeight;					/*滚动区域高度*/
		
		var barWidth		=Math.floor(formWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(formHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		
		//out("barHeight",barHeight);
		
		var contentTop		=-x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=-x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-formWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-formHeight;			/*内容上边距最大值*/
		
	
		var barTop		=barTop_max*contentTop/contentTop_max;			/*最终的滚动条上边距*/
		var barLeft		=barLeft_max*contentLeft/contentLeft_max;		/*最终的滚动条左边距*/
		
		x.showHide([scrollbar_h],if_scroll_h);			/*隐藏或者显示水平滚动条*/
		x.showHide([scrollbar_v],if_scroll_v);			/*隐藏或者显示垂直滚动条*/

		if(if_scroll_h){/*水平滚动*/											
			//scroll_h.style.width	=scrollWidth+"px";				/*水平滚动区域的宽度*/
			scrollbar_h.style.width	=barWidth+"px";				/*水平滚动条的宽度*/
			scrollbar_h.style.left	=barLeft+"px";				/*水平滚动条的相对位置*/
		}
		if(if_scroll_v){/*垂直滚动*/
			//scroll_v.style.height		=scrollHeight+"px";		/*垂直滚动区域的高度*/		
			scrollbar_v.style.height	=barHeight+"px";		/*垂直滚动条的高度*/
			scrollbar_v.style.top		=barTop+"px";			/*垂直滚动条的相对位置*/
		}
	}
})(window);(function(x){	/*form	效果*/
	var e_form_mousemove=function(evt){/**/
		var form		=this;
		var target		=x.getTarget(evt);
		var formCfg		=form.formCfg;						/*form的配置文件 里面同时存放各种状态参数*/
		var id="#"+formCfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_doc");
		
		var formWidth		=container.clientWidth;	/*form的宽度*/
		var formHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;
		
		if(contentHeight>formHeight)	contentWidth	=contentWidth-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>formWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>formHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=formWidth-12;			/*滚动区域宽度*/
		var	scrollHeight	=formHeight;						/*滚动区域高度*/
		
		var barWidth		=Math.floor(formWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(formHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		
		var barLeft_max		=formWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		//out("barHeight"+barHeight+"scrollHeight"+scrollHeight+"content");
		var contentTop		=x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-formWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-formHeight;			/*内容上边距最大值*/
		
		if(formCfg.scrollType=="v"){
			if(formCfg.lastY!=null){
				var d			=evt.clientY-formCfg.lastY;
				if(formCfg.last_barTop==null)	formCfg.last_barTop=x.toNum(x.getStyle(scrollbar_v).top);
				var barTop			=formCfg.last_barTop;
				barTop			=x.limitValue(barTop+d,0,barTop_max);
				var contentTop	=Math.floor(barTop*contentTop_max/barTop_max);
				scrollbar_v.style.top		=barTop+"px";
				content.style.top			=-contentTop+"px";
			}
			x.stopEvt(evt);

		}
		else if(formCfg.scrollType=="h"){
			if(formCfg.lastX!=null)	{
				var d			=evt.clientX-formCfg.lastX;
				if(formCfg.last_barLeft==null)	formCfg.last_barLeft=x.toNum(x.getStyle(scrollbar_h).left);
				var barLeft			=formCfg.last_barLeft;
				barLeft			=x.limitValue(barLeft+d,0,barLeft_max);
				var contentLeft	=barLeft*contentLeft_max/barLeft_max;
				scrollbar_h.style.left		=barLeft+"px";
				content.style.left			=-contentLeft+"px";
			}
			x.stopEvt(evt);

		}

	}
	var e_form_mousewheel=function(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
		var form=this;
		var cfg=form.formCfg;
		var id="#"+cfg.id;
		var container=$(id+"_container");
		var doc=$(id+"_doc");
		var rolled = x.getEvtRolled(evt)*4;
		var top=x.toNum(x.getStyle(doc).top);
		
		var clientHeight=container.clientHeight,scrollHeight=doc.scrollHeight;
		//out("clientHeight"+clientHeight+"scrollHeight"+scrollHeight);
		var minTop=clientHeight-scrollHeight;
		//minTop-=26;
		if(minTop>0)	minTop=0;
		var maxTop=0;
		
		var currTop=x.limitValue(top+rolled,minTop,maxTop);
		doc.style.top=currTop+"px";
		//out("form mouse wheel");
		x.fixFormScroll(form);
		x.stopEvt(evt);
	}
	
	var e_content_mousedown=function(evt){/*鼠标按下事件*/
		var cfg=this.parentNode.formCfg;
		if(cfg.lastSelectRow!=null){
			x.cssRm(cfg.lastSelectRow,"selectRow");
		}
	}
	
	var e_form_mouseup=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.formCfg;
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}
	var e_form_mouseleave=function(evt){/*滚动条内鼠标移动事件  鼠标停留时间超过1秒 进入滚动模式*/
		var g=this.formCfg;
		g.lastX=g.lastY=g.scrollType=g.resizeStyle=g.resizeCell=g.lastCellWidth=g.last_barLeft=g.last_barTop=null;
	}

	x.uiForm=function(form){/*为form注册全局事件*/
		var cfg=form.formCfg;
		var id="#"+cfg.id;
		var container=$(id+"_container");
		x.bind(form,		"mousemove",	e_form_mousemove);/*垂直位移*/
		x.bind(container,	"mousedown",	e_content_mousedown);/*水平位移*/
		x.bind(form,		"mouseup",		e_form_mouseup);/*水平位移*/
		x.bind(form,		"mouseleave",	e_form_mouseleave);/*水平位移*/
		x.bind(form,		"mousewheel",	e_form_mousewheel);
	}
	
})(window);