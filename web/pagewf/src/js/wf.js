(function(x){
	function init(){
		uiApp({dom:$("#app1")});
		fn_wflist_render();
		//wf.init();
		//alert(1);
	}
	var fn_wflist_render=function(){
		/*生成wflist的内容*/
		var result=$$("wfGets");
		if(result.flag){
			var rownum=Math.ceil(result.data.length/3);
			var table=$table(rownum,3);
			$("#wf_list").innerHTML="";
			$("#wf_list").appendChild(table);
			table.border=1;
			for(var i=0;i<result.data.length;i++){
				var r=Math.floor(i/3);
				var c=i%3;
				var obj=result.data[i];
				var td=table.rows[r].cells[c];
				td.className="wf";
				var div=$div();
				div.innerHTML=obj.w0_code+". "+obj.w0_cname;
				td.obj=obj;
				bind(td,"click",e_wf_click);
				td.appendChild(div);
			}
		}
		//out("result",result);
	}
	
	var e_wf_click=function(evt){/**/
		//out("data",this.obj);	/*打开表单*/
		fn_wf_showForm(this.obj);
		activeTab($("#c3"));//
	}
	
	var fixCloneObj=function(obj,obj2){
		if(obj2==null) obj2={};
		for(var p in obj){
			var p2=p;
			if(p.indexOf("_")>0){/*要把第一个——剥掉*/
				p2=p.substr(p.indexOf("_")+1);
			}
			if(x.isArray(obj[p])){
				obj2[p2]=[];
				for(var i=0;i<obj[p].length;i++){
					obj2[p2][i]={};
					fixCloneObj(obj[p][i],obj2[p2][i]);
				}
			}
			else if(x.isObj(obj[p])){
				obj2[p2]={};
				fixCloneObj(obj[p],obj2[p2]);
			}
			else obj2[p2]=obj[p];/*赋值的过程*/
		}
		return obj2;
	}
	
	var fixFormDef=function(def){
		/*主要就是要返回一个cfg*/
		var cfg=fixCloneObj(def);
		for(var i=0;i<cfg.attrs.length;i++){
			var attr=cfg.attrs[i];
			for(var j=0;j<cfg.tables.length;j++){
				var table=cfg.tables[j];
				if(table.cells==null)	table.cells=[];
				if(attr.table==table.table){
					attr.form=null;
					attr.table=null
					table.cells.push(attr);
					break;
				}
			}
		}
		cfg.attrs=null;
		out("cfg",cfg);
		return cfg;
	}
	var fn_task_save=function(){
		/*保存工作任务*/
		var data=genFormData($("#c3"));
		out("formdata",data);
		//alert("save");
	}
	var fn_task_start=function(){
		/*启动是个固定的操作  主要是弹出一个小表单  提示用户下一环节和下一环节处理人 并要求用户填写操作意见*/
		var data=genFromData()
	}
	
	var fn_wf_showForm=function(wf){/*展示工作流表单*/
		/*首先清理原对象
		  然后获取表单的配置信息，包括布局定义、操作按钮定义、自定义事件【处理校验和级联】
		*/
		var target=$("#c3");
		target.innerHTML="";
		var formDef=$$("formGet",{form:wf.w0_form});
		if(formDef.flag){/*对这条数据进行修正*/
			var cfg=fixFormDef(formDef.data);
			var tables=cfg.tables;
			var cmds=	[{cmd:"savewf",text:"保存",fn:fn_task_save},
						 {cmd:"start",text:"启动"}/*表示该操作按钮式定义在c0_state=1的对象上*/];
			cfg.formType="add";
			cfg.dom=$("#c3");
			//var cfg={dom:$("#content"),title:"新增人员表单",saveMethod:"methodAdd",formType:"add"};
			genForm(cfg,tables,cmds);
			//out("formDef",formDef.data);
		}
		//out("form",wf.w0_form);
		
	}
	
	window.onload=init;
})(window);
