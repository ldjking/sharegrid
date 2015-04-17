(function(x){/**/
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		var tree=$1(".tree",target,1);
		var cfg=tree.treeCfg;
		//out("cmd",target.cmd);
		//if(cfg.excuteCmdState==true)	return;
		if(target.cmd!=null){
			if(target.disable)	return;		/*step1	判断是否禁用*//*step2	执行默认命令的操作*/
			if(target.cmd.cmd=="nodeAdd")			f_tree_addNode(tree);
			else if(target.cmd.cmd=="nodeEdit")		f_tree_editNode(tree);
			else if(target.cmd.cmd=="nodeRm")		f_tree_rmNode(tree);
			else if(target.cmd.cmd=="nodeOpen")		f_tree_open(tree);
			else if(target.cmd.cmd=="nodeClose")	f_tree_close(tree);
			else if(target.cmd.cmd=="nodeRefresh")	f_tree_refresh(tree);
			/*step3 执行自定义命令*/
			if(target.cmd.fn!=null){
				var fn=target.cmd.fn;
				fn(target);
			}
		}
	}
	
	var f_tree_open=function(tree){
		
	}
	
	var f_tree_close=function(tree){
	}
	var f_tree_refresh=function(tree){
		//out("tree refresh");
		x.genTreeContent(tree);
	}
	
	var f_tree_addNode=function(tree){
		//out("tree add");
		x.showTreeEditor(tree,"add");
	}
	
	var f_tree_editNode=function(tree){
	}
	
	var f_tree_rmNode=function(tree){
		/*删除一个节点*/
		//out("rmTree",tree.activeNode);
		var cfg=tree.treeCfg;
		var activeNode=cfg.activeNode;
		if(activeNode!=null){/*从数据上删除该条数据  如果还具有子节点，应该把子节点一并删除*/
			var obj=activeNode.obj;
			var datas=x.getNodeSons(obj);/*把子孙节点都获取到并删除*/
			//out("datas",datas);
			cfg.data=x.rmArray(cfg.data,datas);
			x.rmDom(activeNode.parentNode);
			if(cfg.rmMethod){
				var result=$$(cfg.rmMethod,obj);
				if(result.flag)	x.genTreeContent(cfg.dom);/*重绘内容*/
				else			out("删除失败",result);
			}
			//x.genTreeContent(tree);
			//out("rm obj",cfg.data);
		}
	}
	
	
	x.genTreeCmd=function(tree){/*生成树的操作按钮栏*/
		var cfg=tree.treeCfg;
		var cmds=cfg.cmds;
		var id=cfg.id;
		var cmdbar	=$("#"+id+"_cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		//x.clearDom(cmdbar);
		x.addChild(cmdbar,[cmd]);

		/*根据用户自定义的命令行类型  默认有的方式有哪些按钮  有两套按钮
		主表  新增 修改 删除 筛选 刷新
		启用编辑  新增 删除 提交 筛选 刷新*/
		var preCmds={};
		preCmds.nodeAdd		=$div(id+"_nodeAdd","nodeAdd");
		preCmds.nodeEdit	=$div(id+"_nodeEdit","nodeEdit");
		preCmds.nodeRm		=$div(id+"_nodeRm","nodeRm");
		preCmds.nodeOpen	=$div(id+"_nodeOpen","nodeOpen");
		preCmds.nodeClose	=$div(id+"_nodeClose","nodeClose");
		preCmds.nodeRefresh	=$div(id+"_nodeRefresh","nodeRefresh");
		
		var c;
		if(cmds==null)	return;/*如果为空，直接返回*/
		for(var i=0;i<cmds.length;i++){
			if(cmds[i].cmd!=null){
				c=preCmds[cmds[i].cmd];
				if(c!=null){
					c.cmd=cmds[i];
					cmd.appendChild(c);
				}
				else{/*自定义按钮如何放置*/
					c=$div();
					c.cmd=cmds[i];
					c.innerHTML=cmds[i].text;
					var className=cmds[i].class;
					if(className==null)	className="btn";
					c.className=className;/*自定义的操作按钮*/
					cmd.appendChild(c);
				}
			}
		}
		//out("cmds",cmd);
		//checkCmd(form);
		cfg.cmdGened=true;
		x.bind(cmd,	"click",e_cmd_click);
	}
})(window);
