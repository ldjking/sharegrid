var map={};
map.grid		=$("#c1");
map.editForm	=$("#c2");
map.addForm		=$("#c3");
map.tabList		=$("#tab_list");
map.tabEdit		=$("#tab_edit");
map.tabAdd		=$("#tab_add");
map.fn_showList =function(evt){
	genGridContent(map.grid);/*要刷新内容*/
	activeTab(map.tabList);
}
map.fn_showNext =function(evt){
	selectGridRow(map.grid,1);
	map.refreshEditForm();/*重绘内容*/
}
map.fn_showPre  =function(evt){
	selectGridRow(map.grid,-1);
	map.refreshEditForm();/*重绘内容*/
}
map.init=function(){
	uiApp({dom:$("#app1"),fn:map.tabChange});
	map.grid=$("#c1");
	//b1_name	b1_code	b1_start	b1_step	b1_curr	b1_des	b1_length
	map.cfg={dom:map.grid,multiMode:0,toolbar:1,filterMode:0,data_method:"seqGets",
				rmMethod:'seqRm',addMethod:"seqAdd",updateMethod:"seqUpdate",pageFlag:true,pageSize:6,pkAttr:"b1_name"};
	map.columns=[{text:"主键",attr:"b1_name",align:"center",width:80,frozen:1,type:"num",notEdit:0,asc:1},
	{text:"序列代码",attr:"b1_code",align:"center",frozen:0,frozen:1,notEdit:1,width:160,type:"str",asc:1},
	{text:"序列初始值",attr:"b1_start",align:"center",width:60,frozen:1,notEdit:1,type:"str",asc:1},
	{text:"步长",attr:"b1_step",align:"center",type:"str",width:80,asc:1},
	{text:"当前值",attr:"b1_curr",align:"left",width:160,type:"str",asc:1},
	{text:"序列描述",attr:"b1_des",align:"left",width:160,type:"str",notEdit:0,asc:1},
	{text:"序列长度",attr:"b1_length",align:"left",width:60,type:"str",notEdit:0,asc:1}];
	genGrid(map.cfg,map.columns,map.cmds,[]);
	var form={}	
	form.tables=[	{type:0,cells:[
								{type:"text",attr:"b1_name"}
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"序列名称",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_name",width:120,align:"left",row:1},
								{type:"lbl",text:"序列代码",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_code",width:120,align:"left",row:1},/*txt代表单行元素*/
								{type:"lbl",text:"序列初始值",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_start",width:120,align:"left",row:1}
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"步长",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_step",width:120,align:"left",row:1},
								{type:"lbl",text:"当前值",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_curr",width:120,align:"left",row:1},/*txt代表单行元素*/
								{type:"lbl",text:"序列长度",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_length",width:120,align:"left",row:1}
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"序列描述",width:80,align:"center",row:1},
								{type:"txt",attr:"b1_des",width:520,align:"left",row:1,height:120}
							]
						},
						
					];
		form.cmds=[	
					{cmd:"update",method:"seqUpdate",fn:map.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:map.fn_showPre},
					{cmd:"next",fn:map.fn_showNext}
				];
		form.cfg={dom:map.editForm,title:"序列详细信息",formType:"add",addMethod:"seqAdd",updateMethod:"seqUpdate"};
		genForm(form.cfg,form.tables,form.cmds);
		form.cmds1=[	
					{cmd:"save",method:"seqAdd",fn:map.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:map.fn_showPre},
					{cmd:"next",fn:map.fn_showNext}
				];
		form.cfg1={dom:map.addForm,title:"序列详细信息",formType:"add",addMethod:"seqAdd",updateMethod:"seqUpdate"};
		genForm(form.cfg1,form.tables,form.cmds1);
}
window.onload=map.init;	
