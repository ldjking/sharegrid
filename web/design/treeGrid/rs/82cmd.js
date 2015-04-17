(function(x){
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		/*step1	执行校验*/
		if(target.cmd!=null){
			/*将选中数据发送给校验函数 判断当前用户是否有操作权限*/
			if(target.cmd.check!=null){
				var result=x.$$(target.cmd.check);
				if(result.flag==false){
					//x.msg("check failed",result);
					//return;
				}
			}
			/*step2	执行默认命令的操作*/
			if(target.cmd.cmd=="cmdLock")			e_lock_click(evt);
			else if(target.cmd.cmd=="cmdAddItem")	e_addItem_click(evt);
			else if(target.cmd.cmd=="cmdRmItem")	e_rmItem_click(evt);
			else if(target.cmd.cmd=="cmdCommit")	e_commit_click(evt);
			else if(target.cmd.cmd=="cmdFilter")	e_filter_click(evt);
			else if(target.cmd.cmd=="cmdRefresh")	e_refresh_click(evt);
			else if(target.cmd.cmd=="cmdDelete")	e_delete_click(evt);

			/*step3 执行自定义命令*/

			if(target.cmd.fn!=null){
				var fn=target.cmd.fn;
				fn(target);
			}
		}
		
	}
	
	var e_delete_click=function(evt){
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var cfg=grid.gridCfg;
		if(cfg.activeRow!=null){
			/*删除选中数据*/
			var obj=cfg.activeRow.obj;
			var param={};
			param[cfg.pkAttr]=obj[cfg.pkAttr];
			var result=$$(cfg.rmMethod,param);/*删除后不应该执行刷新操作 而应该重绘内容  减少回发数据*/
			if(result.flag)	x.genGridContent(grid);
		}
	}
	
	var e_addItem_click=function(evt){/*新增一项*/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		x.addGridRow(grid);
	}
	var e_rmItem_click=function(evt){/*删除一项*/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		x.rmGridRow(grid);
	}
	var e_lock_click=function(evt){/**/
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var id="#"+grid.gridCfg.id+"_";
		var cmd_addItem	=x.$(id+"cmdAddItem");
		var cmd_rmItem	=x.$(id+"cmdRmItem");
		var cmd_commit	=x.$(id+"cmdCommit");
		var flag=grid.gridCfg.editMode;
		if(flag){
			x.closeGridEdit(grid);
			target.className="lock";
			x.cssAdd([cmd_addItem,cmd_rmItem,cmd_commit],"gray");
		}
		else{
			x.makeGridEdit(grid);
			target.className="unlock";
			x.cssRm([cmd_addItem,cmd_rmItem,cmd_commit],"gray");
		}
	}
	var e_commit_click=function(evt){/*更新grid*/
		var grid=$1(".grid",x.getTarget(evt),0);
		saveGridChange(grid);
	}
	
	var e_filter_click=function(evt){/*数据筛选*/
		var grid=$1(".grid",x.getTarget(evt),0);
		if(grid.gridCfg.filterMode) x.closeGridFilter(grid);/*已经是筛选模式*/
		else	x.openGridFilter(grid);
	}
	var e_refresh_click=function(evt){/*刷新*/
		var grid=$1(".grid",x.getTarget(evt),0);
		var cfg=grid.gridCfg;
		var table1=$("#"+cfg.id+"_1table");
		var table2=$("#"+cfg.id+"_2table");
		for(var i=2;i<table1.rows[1].cells.length;i++){
			var query=table1.rows[1].cells[i].childNodes[0];
			query.value="";
		}
		for(var i=0;i<table2.rows[1].cells.length;i++){
			var query=table2.rows[1].cells[i].childNodes[0];
			query.value="";
		}
		cfg.filter={};
		x.closeGridFilter(grid);
		x.genGridContent(grid);
		/*逐项清楚filter里面的内容 */
	}
	
	x.genGridCmd=function(grid){
		/*为一个网格对象生成操作按钮*/
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var cmds=cfg.cmds;
		var cmdbar	=$div(id+"_cmdbar","cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		/*根据用户自定义的命令行类型  默认有的方式有哪些按钮  有两套按钮
		主表  新增 修改 删除 筛选 刷新
		启用编辑  新增 删除 提交 筛选 刷新*/
		var sysCmds={};/*系统默认自带按钮*/
		sysCmds.cmdAdd		=$div(id+"_cmdAdd",		"add");
		sysCmds.cmdEdit		=$div(id+"_cmdEdit",	"edit");
		sysCmds.cmdDelete	=$div(id+"_cmdDelete",	"delete");
		sysCmds.cmdLock		=$div(id+"_cmdLock",	"lock");
		sysCmds.cmdAddItem	=$div(id+"_cmdAddItem",	"addItem gray");
		sysCmds.cmdRmItem	=$div(id+"_cmdRmItem",	"rmItem gray");
		sysCmds.cmdCommit	=$div(id+"_cmdCommit",	"commit gray");
		sysCmds.cmdFilter	=$div(id+"_cmdFilter",	"filterData");
		sysCmds.cmdRefresh	=$div(id+"_cmdRefresh",	"refresh");
		
		for(var i=0;i<cmds.length;i++){
			var c=sysCmds[cmds[i].cmd];
			if(c!=null){
				c.cmd=cmds[i];
				cmd.appendChild(c);
			}
			else{/**/
				var div=$div(id+"_"+cmds[i].cmd,cmds[i].type);
				div.cmd=cmds[i];
				cmd.appendChild(div);
			}
		}
		x.addChild(grid,cmdbar);
		x.addChild(cmdbar,[cmd]);
		x.bind(cmd,						"click",	e_cmd_click);
		return cmdbar;
	}
})(window);