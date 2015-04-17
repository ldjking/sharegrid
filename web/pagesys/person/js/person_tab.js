person.tabChange=function(target,p){
	if(p==1){
		person.refreshEditForm();
	}
	else if(p==2){/*刷新子对象内容*/
		person.refreshRoleGrid();
	}
}
person.refreshEditForm =function(){
		var obj=null;
		var cfg=person.grid.gridCfg;
		if(cfg.activeRow==null)			selectGridRow(person.grid,1);
		obj=cfg.activeRow.obj;
		if(person.editForm.formCfg.data==obj){return;}
		else{
			person.editForm.formCfg.data=obj;
			var preCmd=$("#"+person.editForm.formCfg.id+"_cmdPre");
			var nextCmd=$("#"+person.editForm.formCfg.id+"_cmdNext");
			/*如果是第一条  将按钮上一条关闭  如果是最后一条 将按钮上下一条关闭*/
			//;//out(obj.rownum);
			cssRm(preCmd,"gray");
			cssRm(nextCmd,"gray");

			if(obj.rownum==1){
				cssAdd(preCmd,"gray");
			}
			else if(obj.rownum==cfg.totalNum){
				cssAdd(nextCmd,"gray");
			}
			genFormContent(person.editForm);/*重绘内容*/
		}
	}
person.refreshRoleGrid=function(){
		var obj=null;
		var cfg=person.grid.gridCfg;
		if(cfg.activeRow==null)			selectGridRow(person.grid,1);
		obj=cfg.activeRow.obj;
		////out("main obj",obj);
		if(person.roleGrid.gridCfg.param==obj){return;}
		else{
			person.roleGrid.gridCfg.param=obj;
			genGridContent(person.roleGrid);/*重绘内容*/
		}
	}