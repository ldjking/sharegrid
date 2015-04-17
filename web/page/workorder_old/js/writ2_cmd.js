writ2.fn_showEditForm      =function(evt){
	activeTab(writ2.tabEdit);
}
writ2.fn_showAddForm       =function(evt){/*要把新增表单显示出来*/
	////out("showAddForm");
	activeTab(writ2.tabAdd);
	
}
writ2.e_cmdAddItem_handler =function(target){
	//msg(target.cmd.cmd+"用户自定义事件");
}
writ2.cmds=[
	{cmd:"cmdAdd"	,fn:writ2.fn_showAddForm},
	{cmd:"cmdEdit"	,fn:writ2.fn_showEditForm},
	{cmd:"cmdDelete",fn:writ2.e_cmdAddItem_handler},
	{cmd:"cmdFilter",fn:writ2.e_cmdAddItem_handler},
	{cmd:"cmdRefresh",fn:writ2.e_cmdAddItem_handler}
]
