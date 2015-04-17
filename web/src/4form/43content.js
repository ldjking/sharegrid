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
