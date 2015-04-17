var writ2={};
writ2.grid		    =$("#c1");
writ2.editForm	    =$("#c2");
writ2.addForm		=$("#c3");
writ2.roleGrid	    =$("#c4");
writ2.tabList		=$("#tab_list");
writ2.tabEdit		=$("#tab_edit");
writ2.tabAdd			=$("#tab_add");
writ2.fn_showList =function(evt){
	genGridContent(writ2.grid);/*要刷新内容*/
	activeTab(writ2.tabList);
}
writ2.fn_showNext =function(evt){
	selectGridRow(writ2.grid,1);
	writ2.refreshEditForm();/*重绘内容*/
}
writ2.fn_showPre  =function(evt){
	selectGridRow(writ2.grid,-1);
	writ2.refreshEditForm();/*重绘内容*/
}
function jiaoban(){
	alert("ddd");
}
function banci_change(target,data){/*班次值变化触发事件*/
		/*跟数据有关系  设置另外一个输入项的默认值*/
		var form=writ2.editForm;
		var text=$("#"+form.formCfg.id+"_e0_persons");
		var result=$$("writ2Gets",{d2_id:data.value});
		var personstr="";
		if(result.flag)
		{
			for(var i=0;i<result.data.length;i++){
				personstr+=result.data[i].c0_name+" ";
			}
		}
		text.value=personstr;
		//out("data",data);
		//out("result",result);
		alert("banci change");
	}
writ2.init=function(){
	uiApp({dom:$("#app1"),fn:writ2.tabChange});
	writ2.grid=$("#c1");
	//e0_id  e0_remark  e0_class  e0_status  e0_type  e0_person1  e0_person2  e0_person3  e0_time1  e0_time2  e0_persons  e0_plan  e0_finish  e0_where
	writ2.cfg={dom:writ2.grid,multiMode:0,toolbar:1,filterMode:0,data_method:"writ2Gets",
				rmMethod:'writ2Rm',addMethod:"writ2Add",updateMethod:"writ2Update",pageFlag:true,pageSize:20,pkAttr:"f0_id"};
	writ2.columns=[{text:"主键",attr:"f0_id",align:"center",width:80,frozen:1,type:"num",notEdit:0,asc:1},
	{text:"设备编码",attr:"f0_assetnum",align:"center",frozen:0,width:160,type:"str",asc:1},
	{text:"部门",attr:"f0_department",align:"center",width:200,frozen:1,notEdit:1,type:"str",asc:1},
	{text:"编号",attr:"f0_code",align:"center",type:"str",width:80,asc:1},
	{text:"工作负责人",attr:"f0_per_fzr",align:"center",width:100,type:"str",asc:1},
	{text:"工作班成员",attr:"f0_member",align:"center",width:160,type:"str",notEdit:0,asc:1},
	{text:"设备双重名称",attr:"f0_double_name",align:"left",width:260,type:"str",notEdit:0,asc:1},
	{text:"签发人",attr:"f0_per_qfr",align:"left",width:100,type:"str",notEdit:0,asc:1}];
	genGrid(writ2.cfg,writ2.columns,writ2.cmds,[]);
	var form={};
	form.tables=[	
						{type:0,rowNum:1,cells:[/*隐藏字段  在提交时方获得值，该值可能对子表产生影响*/
								{type:"sid",attr:"f0_id",sidType:"method",width:120,align:"left",row:1}/*txt代表单行元素*/
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"部门（单位）",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_department",width:280,align:"left",row:1},/*txt代表单行元素*/
								{type:"lbl",text:"编号",width:80,align:"center",row:1},
								{type:"txt",attr:"f0_code",width:160,align:"center",row:1},
							]
						},
						{type:2,rowNum:1,cells:[
								
								{type:"lbl",text:"工作负责人",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_per_fzr",width:120,align:"left",row:1},
								{type:"lbl",text:"工作班成员",width:80,align:"center",row:1},
								{type:"txt",attr:"f0_member",width:320,align:"left",row:1}								
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"工作人数",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_member_num",width:80,align:"left",row:1},
								{type:"lbl",text:"工作班组",width:100,align:"center",row:1},
								{type:"txt",attr:"f0_class",width:140,align:"left",lov:"gzClass",row:1},
								{type:"lbl",text:"工作票类型",width:100,align:"center",row:1},
								{type:"txt",attr:"f0_worktype",width:100,align:"left",row:1},
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"设备双重名称",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_double_name",width:520,align:"left",height:50,row:1}
							]
						},
					   {type:2,rowNum:1,cells:[
								{type:"lbl",text:"工作计划开始时间",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_schedstart",width:200,align:"left",lov:"datetime",row:1},
								{type:"lbl",text:"工作计划结束时间",width:120,align:"center",row:1},
								{type:"txt",attr:"f0_schedfinish",width:200,align:"left",lov:"datetime",row:1},
							]
						},
						{type:2,rowNum:1,cells:[
						      {type:"lbl",text:"工作条件",width:120,align:"center",row:1},
							  {type:"txt",attr:"f0_condition",width:520,align:"left",height:100,row:1}
														]
						},
						
					];
					
					//修改form
			form.cmds=[	
					{cmd:"update",method:"writ2Update",fn:writ2.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:writ2.fn_showPre},
					{cmd:"next",fn:writ2.fn_showNext}
				];
				
	    form.cfg={dom:writ2.editForm,title:"第二种工作票",formType:"add",addMethod:"writ2Add",updateMethod:"writ2Update"};	
		genForm(form.cfg,form.tables,form.cmds);
		
		
		//保存form
		form.cmds1=[	
					{cmd:"save",method:"writ2Add",fn:writ2.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:writ2.fn_showPre},
					{cmd:"next",fn:writ2.fn_showNext}
				];
		form.cfg1={dom:writ2.addForm,title:"第二种工作票",formType:"add",addMethod:"writ2Add",updateMethod:"writ2Update"};
		genForm(form.cfg1,form.tables,form.cmds1);
}

writ2.e_cmdJiaoBan_handler=function(evt){
	
}
writ2.e_cmdJiaoBan_handler=function(evt){
}
writ2.e_cmdJiaoBan_handler=function(evt){
}

window.onload=writ2.init;	
