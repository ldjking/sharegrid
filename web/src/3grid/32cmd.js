(function(x){
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		/*step1	执行校验*/
		if(target.cmd!=null){
			/*将选中数据发送给校验函数 判断当前用户是否有操作权限*/
			if(target.cmd.check!=null){
				x.$$(target.cmd.check,null,false,function(result){
						/*执行校验*/
					});
			}
			else{
				/*step2	执行默认命令的操作*/
				if(target.cmd.cmd=="cmdLock")			e_lock_click(evt);
				else if(target.cmd.cmd=="cmdAddItem")	e_addItem_click(evt);
				else if(target.cmd.cmd=="cmdRmItem")	e_rmItem_click(evt);
				else if(target.cmd.cmd=="cmdCommit")	e_commit_click(evt);
				else if(target.cmd.cmd=="cmdFilter")	e_filter_click(evt);
				else if(target.cmd.cmd=="cmdRefresh")	e_refresh_click(evt);
				else if(target.cmd.cmd=="cmdDelete")	e_delete_click(evt);
				else if(target.cmd.cmd=="cmdNav")		e_nav_click(evt);
	
				/*step3 执行自定义命令*/
	
				if(target.cmd.fn!=null){
					var fn=target.cmd.fn;
					fn(target);
				}
			}
		}
		
	}
	var e_nav_click=function(evt){/*打开导航栏*/
		//out("nav click");	
		var target=x.getTarget(evt);
		var grid=$1(".grid",target,0);
		var cfg=grid.gridCfg;
		var container=x.$("#"+cfg.id+"_container");

		if(cfg.navState){
			x.hideGridNav(grid);
		}
		else{
			x.showGridNav(grid);;/*进入导航状态*/
			
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
			x.$$(cfg.rmMethod,param,false,function(result){
					if(result.flag)	x.genGridContent(grid);
				});/*删除后不应该执行刷新操作 而应该重绘内容  减少回发数据*/
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
		cfg.param={};/*参数也清空*/
		x.closeGridFilter(grid);
		x.genGridContent(grid);
		/*逐项清楚filter里面的内容 */
	}
	
	var checkCmd=function(grid){
		var cfg=grid.gridCfg;
		var id=cfg.id;
		var cmd=$("#"+id+"_cmd");
		for(var i=0;i<cmd.childNodes.length;i++){
			var c=cmd.childNodes[i];
			if(c.cmd.checkMethod!=null){
				x.cssAdd(c,"hide");
				$$(c.cmd.checkMethod,cfg.param,false,function(result){
						//out("check cmd result",result);
						if(result.flag!=true){
							c.disable=true;
							x.cssAdd(c,c.cmd.checkFalse);
						}else{
							x.cssRm(c,"hide");
						}
					});
			}
		}
	}
	
	x.genGridCmd=function(grid){
		/*为一个网格对象生成操作按钮*/
		var cfg=grid.gridCfg;
		if(cfg.cmdGened==true){
			checkCmd(grid);
			return;
		}
		var id=cfg.id;
		var cmds=cfg.cmds;
		var cmdbar	=$div(id+"_cmdbar","cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		x.addChild(grid,cmdbar);
		x.addChild(cmdbar,[cmd]);
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
		sysCmds.cmdNav		=$div(id+"_cmdNav",		"nav");

		
		var c;
		for(var i=0;i<cmds.length;i++){
			c=sysCmds[cmds[i].cmd];
			if(c!=null){
				c.cmd=cmds[i];
				cmd.appendChild(c);
			}
			else{/**/
				c=$div(id+"_"+cmds[i].cmd);
				c.cmd=cmds[i];
				c.innerHTML=cmds[i].text;
				if(cmds[i].cmd=="upload"){
					var file=$file();
					file.name=id+"upfile";
					file.id=id+"upfile";
					c.appendChild(file);
					cmds[i].class="upload";
					x.bind(file,"change",x.ajaxUpload);
				}
				var className=cmds[i].class;
				if(className==null)	className="btn";
				c.className=className;/*自定义的操作按钮*/
				cmd.appendChild(c);
			}
		}
		cfg.cmdGened=true;
		checkCmd(grid);
		x.bind(cmd,						"click",	e_cmd_click);
		return cmdbar;
	}
})(window);