(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	x.genTree=function(dom,cfg){/*生成一棵树*/
	/*第一步  判断节点是 root node leaf*/
	/*第二步  判断节点样式类型  folder file*/
	/*第三步  判断节点开关类型  open close*/
	/*第四步  判断节点位置信息  first last*/
		//alert("gen tree");
		cfg.dom=dom;
		dom.treeCfg=cfg;
		cfg.id=x.getId("tree");
		if(cfg.nameAttr==null)	cfg.nameAttr="name";

		cssAdd(dom,"tree");
		var cmd=$div(cfg.id+"_cmdbar","cmds");
		if(!cfg.showCmd)	cmd.style.display="none";/*如果配置为不显示命令行	隐藏操作按钮栏*/
		var container=$div(cfg.id+"_container","treeContainer");/*这里还要放置内容 以及滚动条*/
		var content=$div(cfg.id+"_content","content");/*内容部分*/
		var moveObj=$div(cfg.id+"_move","moveobj");
		
		var edit=$div(cfg.id+"_edit","treeEdit");/*具有滚动条*/
		var editTitle=$div(cfg.id+"_editTitle","editTitle");/*编辑对象的头部*/
		var editContainer=$div(cfg.id+"_editContainer","editContainer");/*属性编辑器容器  这里要放置滚动条*/
		var editor=$div(cfg.id+"_editor","editor");/*编辑器*/
		var editObj=$div(cfg.id+"_editObj","editObj");/*编辑对象*/
		var editSave=$div(cfg.id+"_editSave","editSave");/*编辑内容保存*/
		editSave.innerHTML="&#xf00c;";

		x.addChild(dom,[cmd,container,edit]);
		x.addChild(container,[content,moveObj]);
		x.addChild(edit,[editTitle,editContainer]);
		x.addChild(editTitle,[editObj,editSave]);
		x.addChild(editContainer,[editor]);
		x.uiLayout({dom:container,container:dom,dy:0,ydoms:[cmd]});
		//dom.appendChild(container);
		x.genTreeCmd(dom);
		x.genTreeScroll(dom);
		x.genTreeContent(dom);
		//x.showTreeEditor(dom);
		x.uiTree(dom);
	}
})(window);
