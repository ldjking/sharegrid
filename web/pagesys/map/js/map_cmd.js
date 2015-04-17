seq.fn_showEditForm      =function(evt){
	activeTab(seq.tabEdit);
}
seq.fn_showAddForm       =function(evt){/*要把新增表单显示出来*/
	////out("showAddForm");
	activeTab(seq.tabAdd);
}
seq.e_cmdAddItem_handler =function(target){
	//msg(target.cmd.cmd+"用户自定义事件");
}
seq.cmds=[
	{cmd:"cmdAdd"	,fn:seq.fn_showAddForm},
	{cmd:"cmdEdit"	,fn:seq.fn_showEditForm},
	{cmd:"cmdDelete",fn:seq.e_cmdAddItem_handler},
	{cmd:"cmdFilter",fn:seq.e_cmdAddItem_handler},
	{cmd:"cmdRefresh",fn:seq.e_cmdAddItem_handler}
]
