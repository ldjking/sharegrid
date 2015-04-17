person.fn_showEditForm      =function(evt){
	activeTab(person.tabEdit);
}
person.fn_showAddForm       =function(evt){/*要把新增表单显示出来*/
	////out("showAddForm");
	activeTab(person.tabAdd);
}
person.e_cmdAddItem_handler =function(target){
	//msg(target.cmd.cmd+"用户自定义事件");
}
person.cmds=[
	{cmd:"cmdAdd"	,fn:person.fn_showAddForm},
	{cmd:"cmdEdit"	,fn:person.fn_showEditForm},
	{cmd:"cmdDelete",fn:person.e_cmdAddItem_handler},
	{cmd:"cmdFilter",fn:person.e_cmdAddItem_handler},
	{cmd:"cmdRefresh",fn:person.e_cmdAddItem_handler}
]
