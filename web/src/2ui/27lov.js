/*51lov		值列表交互*/
(function(x){	/*grid	效果 带分页 带滚动条*/
   var genLov=function(name,param){
		/*根据lov的name找到lov的定义信息*/
		//out("gen lov param",param);
		var def=x.lovDefs[name];
		//out("gen lov def",def);

		var lovDom=null;
		if(def==null)	return null;
		else{
			if(def.dom!=null){return def.dom;}
			if(def.type=="calendar")	lovDom=genLov_calendar(def.param);
			else if(def.type=="list")	lovDom=genLov_list(def,param);
			else if(def.type=="img")	lovDom=genLov_img(def,param);
			else if(def.type=="table")	lovDom=genLov_table(def,param);
		}
		x.bind(lovDom,"mouseleave",function(){hideLov(lovDom)});
		x.bind(lovDom,"mouseenter",function(){showLov(lovDom)});
		def.dom=lovDom;
		if(lovDom!=null)	lovDom.lovDef=def;
		//x.showLov(lovDom);
		return lovDom;
	}
	x.closeLov=function(target){
		target.style.zIndex=10;
	}
	x.hideLov=function(target){
		//var target=this;
		x.fxScaleOut(target,1300,800,function(){target.style.zIndex=10;});//.style.display="none";
	}
	x.showLov=function(target){
		//var target=this;
		//x.fxClear(target);
		//x.fxScaleIn(target);//.style.display="none";
	}
    x.openLov=function(dom,lovname,param){/*为哪个dom展开lov，lov的最终选择值就影响该dom的值和显示   lovname   param传入参数*/
		/*第一步 判断lov是否存在，不存在则创建*/
		/*打开值列表后要记录最后打开的值列表 便于下次关闭隐藏*/
		if(lovname==null)	lovname=dom.lov;
		param=x.mix(param,dom.lovparam);
		out("param",dom.lovparam);
		if(param==null)		param={};
		/*还要根据dom来设置依赖项的参数*/
		if(dom.lovdepdoms!=null){
			for(var i=0;i<dom.lovdepdoms.length;i++){
				var cell=dom.lovdepdoms[i];
				if(cell!=null&&cell.getAttribute("attr")!=null&&cell.value!=null){
					param[cell.getAttribute("attr")]=cell.value;
				}
			}
		}
		//out("openlov param",param);
		var lovDom=genLov(lovname,param);
		if(lovDom==null)	return;/*未能正常生成*/
		//x.bind(dom,"mouseleave",function(){hideLov(lovDom)});
		x.fxClear(lovDom);
		x.setScale(lovDom,1,1);
		//out("lov open ");

		x.bind(lovDom,"mouseleave",function(){hideLov(lovDom)})
		/*第二步 给lov设置target*/
		/*第三步 将lov呈现在合适的位置上*/
		if(x.lastOpenLov!=null)	x.lastOpenLov.style.zIndex=10;/*隐藏最后关闭的lov*/
		//lovDom.style.display="";
		x.lastOpenLov=lovDom;
		lovDom.style.zIndex=40;/*lovDom的级别是什么  是放在哪个层次上*/
		var rect=x.getRect(dom);
		if(x.cssContain(dom,"text"))	rect=x.getRect(dom.parentNode);
		var lovWidth=lovDom.clientWidth;
		var lovHeight=lovDom.clientHeight;
		var bodyWidth=document.body.clientWidth;
		var bodyHeight=document.body.clientHeight;
		
		var left=rect.left;
		var top=rect.top+rect.height;
		
		if(left>bodyWidth-lovWidth)		left=bodyWidth-lovWidth;
		if(top>bodyHeight-lovHeight)	top=bodyHeight-lovHeight;
		lovDom.style.left=left+"px";
		lovDom.style.top=top+"px";
		lovDom.targetDom=dom;
		//out("lov open ");
		/*判断是否超出屏幕，如果超出屏幕，则要做一定的调整*/
	}
		
	var e_list_click=function(evt){
		var target=x.getTarget(evt);
		var lovDom=this;
		if(target.obj!=null){
			x.setFormAttr(lovDom.targetDom,target.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_list=function(cfg,param){/*根据配置和参数生成一个列表模式的lov*/
		/*数据列表必须满足一定的数据格式  value  name*/
		var name=cfg.name;
		param =x.mix(cfg.param,param);
		if(param==null) {
			param = {};	
		}
		out("genLovList",param);
		var lovId="lov_"+name;
		var lovDom=$div(lovId,"lov lov_list");
		if(cfg.width)	lovDom.style.width=cfg.width+"px";
		
		document.body.appendChild(lovDom);
		
		if(cfg.data_method!=null){
			var result=$$(cfg.data_method,param);
			//out("result",result);
			if(result.flag){
				cfg.datas=result.data;
			}
			else{
				cfg.datas=[];
			}
		}
		x.bind(lovDom,"click",e_list_click);/*创建一个div格式的列表即可*/
		for(var i=0;i<cfg.datas.length;i++){
			var obj=cfg.datas[i];
			var div=$div();
			div.innerHTML=obj.name;
			div.obj=obj;
			lovDom.appendChild(div);
		}
		return lovDom;
	}
	
	
	
	var e_img_click=function(evt){
		var target=x.getTarget(evt);
		var lovDom=this;
		if(target.obj!=null){
			x.setFormAttr(lovDom.targetDom,target.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_img=function(cfg,param){/*生成图像模式的值列表*/
		var div=$div("lov_"+cfg.name,"lov lov_img");
		document.body.appendChild(div);
		x.bind(div,"click",e_img_click);
		var result=$$("appImagesGet");
		if(result.flag==true){
			for(var i=0;i<result.data.length;i++){
				var obj=result.data[i];
				if(obj.type=="png"){
					var img=$div(null,"img");
					img.obj=obj;
					img.innerHTML=obj.name.substr(0,obj.name.indexOf("."));
					var url="http://ldjnotebook:8080/eam/"+obj.path;
					img.style.backgroundImage="url("+url+")";
					div.appendChild(img);
				}
			}
		}
		return div;
	}
	
	
	
	var e_table_click=function(evt){
		//alert("click");
		var target=x.getTarget(evt);
		var tr=x.$1("tr",target,0);
		//alert(tr);
		var lovDom=this;
		var def=lovDom.lovDef;
		if(tr.obj!=null){
			x.setFormAttr(lovDom.targetDom,tr.obj,lovDom.lovDef);
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
	}
	x.genLov_table=function(cfg,param){/*根据配置和参数生成一个列表模式的lov*/
		/*数据列表必须满足一定的数据格式  value  name*/
		var name=cfg.name;
		var lovId="lov_"+name;
		var lovDom=$div(lovId,"lov lov_table");
		document.body.appendChild(lovDom);
		var datas=[{id:1,name:"刘东杰",sex:"男",birthday:"1985-10-16"},
					{id:2,name:"张一帆",sex:"女",birthday:"1985-10-16"}
				]
		cfg.tableCfg.dom=lovDom;
		x.genTable(cfg.tableCfg,cfg.columns,datas);
		x.bind(lovDom,"click",e_table_click);
		return lovDom;
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
	x.setFormAttr=function(text,obj,lovDef){/*设置formAttr的值 控制翻转*/
		//lovDef定义可以有 nameAttr  valueAttr
		if(lovDef==null)	lovDef={};
		if(text!=null&&lovDef!=null){
			var nameAttr=lovDef.nameAttr;
			var valueAttr=lovDef.valueAttr;
			if(valueAttr==null)	valueAttr="value";
			if(nameAttr!=null){
				text.innerHTML=obj[nameAttr];
				text.value=obj[nameAttr];
				text.value2=obj[valueAttr];
			}
			else{
				text.innerHTML=obj[valueAttr];
				text.value=obj[valueAttr];
				text.value2=obj[valueAttr];
			}
			if(text.cellDef!=null){
				var fn=text.cellDef.onchange;/*主要是为了触发onchange事件*/
				if(fn!=null){
					fn(text,obj);
				}
				var form=x.$1(".form",text,0);
				var cfg=form.formCfg;
				var tables=cfg.tables;
				for(var i=0;i<tables.length;i++){
					if(tables[i].type==4){
						if(tables[i].dependeAttr==text.cellDef.attr){
							var mid1=form.formCfg.data[text.cellDef.attr];
							var mid2=form.formCfg.data[text.cellDef.attr2];
							form.formCfg.data[text.cellDef.attr]=text.value;
							form.formCfg.data[text.cellDef.attr2]=text.value2;
							form.formCfg.notReadDate=1;
							x.genFormContent(form);
							form.formCfg.data[text.cellDef.attr]=mid1;
							form.formCfg.data[text.cellDef.attr2]=mid2;
							form.formCfg.notReadDate=null;
						}
					}
				}
				if(text.cellDef.dt!=null||text.cellDef.checkMethod!=null||text.cellDef.rangeCheck!=null||text.cellDef.childrangeCheck!=null||text.cellDef.lov!=null){
					var docheck=function(cell,result){
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
					var result=x.checkFormCell(text,form);
					docheck(text,result);
					var cellattr=text.cellDef.attr
					if(result.rangeResult!=null)
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
			}
		}
	}
})(window);
