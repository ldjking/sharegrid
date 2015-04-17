var person={};
person.grid		    =$("#c1");
person.editForm	    =$("#c2");
person.addForm		=$("#c3");
person.roleGrid	    =$("#c4");
person.tabList		=$("#tab_list");
person.tabEdit		=$("#tab_edit");
person.tabAdd		=$("#tab_add");
person.tabRole		=$("#tab_role");
person.fn_showList =function(evt){
	genGridContent(person.grid);/*要刷新内容*/
	activeTab(person.tabList);
}
person.fn_showNext =function(evt){
	selectGridRow(person.grid,1);
	person.refreshEditForm();/*重绘内容*/
}
person.fn_showPre  =function(evt){
	selectGridRow(person.grid,-1);
	person.refreshEditForm();/*重绘内容*/
}
person.init=function(){
	uiApp({dom:$("#app1"),fn:person.tabChange});
	person.grid=$("#c1");
	//c0_id	c0_name	c0_sex	c0_birthday	c0_account	c0_pw	c0_state	c0_displayname	c0_code	c0_dep	sexname
	person.cfg={dom:person.grid,multiMode:0,toolbar:1,filterMode:0,data_method:"personGets",
				rmMethod:'personRm',addMethod:"personAdd",updateMethod:"personUpdate",pageFlag:true,pageSize:10,pkAttr:"c0_id"};
	person.columns=[{text:"主键",attr:"c0_id",align:"center",width:80,frozen:1,type:"num",notEdit:0,asc:1},
	{text:"用户名",attr:"c0_name",align:"center",frozen:0,width:160,type:"str",asc:1},
	{text:"性别",attr:"sexname",align:"center",width:60,frozen:1,notEdit:1,type:"str",asc:1},
	{text:"生日",attr:"c0_birthday",align:"center",type:"str",width:80,asc:1},
	{text:"账号",attr:"c0_account",align:"left",width:160,type:"str",asc:1},
	{text:"状态",attr:"c0_state",align:"left",width:60,type:"str",notEdit:0,asc:1},
	{text:"别名",attr:"c0_displayname",align:"left",width:60,type:"str",notEdit:0,asc:1},
	{text:"用户编码",attr:"c0_code",align:"left",width:60,type:"str",notEdit:0,asc:1}];
	genGrid(person.cfg,person.columns,person.cmds,[]);
	var form={}	
	form.tables=[	{type:0,cells:[
								{type:"text",attr:"c0_id"}
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"用户名",width:80,align:"center",row:1},
								{type:"txt",attr:"c0_name",width:120,align:"left",row:1},
								{type:"lbl",text:"性别",width:80,align:"center",row:1},
								{type:"txt",attr:"sexname",attr2:"c0_sex",width:120,align:"left",row:1},/*txt代表单行元素*/
								{type:"lbl",text:"生日",width:80,align:"center",row:1},
								{type:"txt",attr:"c0_birthday",width:120,align:"left",row:1,lov:"date"}
							]
						},
						{type:2,rowNum:1,cells:[
								{type:"lbl",text:"别名",width:80,align:"center",row:1},
								{type:"txt",attr:"c0_displayname",width:120,align:"left",row:1},/*txt代表单行元素*/
								{type:"lbl",text:"账号",width:80,align:"center",row:1},
								{type:"txt",attr:"c0_account",width:120,align:"left",row:1},
								{type:"lbl",text:"密码",width:80,align:"center",row:1},
								{type:"txt",attr:"c0_pw",width:120,align:"left",row:1}
								
							]
						}
						
						
					];
		form.cmds=[
					{cmd:"update",method:"personUpdate",fn:person.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:person.fn_showPre},
					{cmd:"next",fn:person.fn_showNext}
				];
		form.cfg={dom:person.editForm,title:"人员信息",formType:"add",addMethod:"personAdd",updateMethod:"personUpdate"};
		genForm(form.cfg,form.tables,form.cmds);
		form.cmds1=[
					{cmd:"save",method:"personAdd",fn:person.fn_showList},/*表示该操作按钮式定te=1的对象上*/								
					{cmd:"pre",fn:person.fn_showPre},
					{cmd:"next",fn:person.fn_showNext}
				];
		form.cfg1={dom:person.addForm,title:"人员信息录入",formType:"add",addMethod:"personAdd",updateMethod:"personUpdate"};
		genForm(form.cfg1,form.tables,form.cmds1);
		var personrole={};
		personrole.cfg={dom:person.roleGrid,multiMode:0,toolbar:1,filterMode:0,data_method:"personRoleGets",pkAttr:"c4_id",
			rmMethod:'personRoleRm',addMethod:"personRoleAdd",updateMethod:"personRoleUpdate",pageFlag:false,pageSize:10}
		personrole.columns=[{text:"主键",attr:"c4_id",align:"left",width:80,frozen:1,type:"num",notEdit:0},
						{text:"员工",attr:"person_name",align:"center",frozen:0,type:"str",notEdit:1},
						{text:"角色",attr:"role_name",attr2:"c4_role",align:"center",width:120,type:"str",lov:"role"}
					];
		personrole.cmds=[
					{cmd:"cmdLock"		},
					{cmd:"cmdAddItem"	},
				  	{cmd:"cmdRmItem"	},
					{cmd:"cmdCommit"	},
				  	{cmd:"cmdFilter"	},
				  	{cmd:"cmdRefresh"	}
				]
		genGrid(personrole.cfg,personrole.columns,personrole.cmds,[]);
}
window.onload=person.init;	
