wf.wfData=[
			{code:"101",name:"预算审批流程"},
			{code:"102",name:"立项审批流程"},
			{code:"103",name:"合同审批流程"},
			{code:"201",name:"费用审批流程"},
			{code:"202",name:"休假流程"},
			{code:"203",name:"工作票"},
			{code:"301",name:"任务干预流程"},
			{code:"302",name:"采购流程"},
			{code:"303",name:"固定资产领用流程"},
			{code:"401",name:"账户管理流程"}
		  ];

wf.init=function(){
	wf.initWfList();
}
wf.initWfList=function(){
	/*初始化列表*/
	//alert("init list");
	var wfListDom=$("#wfList");
	/*创建一个table */
	var rows=Math.ceil(wf.wfData.length/3);
	clearDom(wfListDom);
	var table=$table(rows,3);
	wfListDom.appendChild(table);
	table.border=1;
	for(var i=0;i<wf.wfData.length;i++){
		var obj=wf.wfData[i];
		var row=Math.floor(i/3);
		var col=i%3;
		var td=table.rows[row].cells[col];
		td.className="wf";
		td.innerHTML=obj.code+". "+obj.name;
		td.obj=obj;
		bind(td,"click",wf.e_wfList_click);
	}
}

wf.e_wfList_click=function(evt){
	var form		=$("#c3");
	var target=evt.target;
	if(target!=null&&target.obj!=null){
		//alert("启动流程"+target.obj.name);
		activeTab(form);
	}
}