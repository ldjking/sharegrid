writ2.tabChange=function(target,p){
	if(p==1){
		writ2.refreshEditForm();
	}
}
writ2.refreshEditForm =function(){
		var obj=null;
		var cfg=writ2.grid.gridCfg;
		if(cfg.activeRow==null)			selectGridRow(writ2.grid,1);
		obj=cfg.activeRow.obj;
		if(writ2.editForm.formCfg.data==obj){return;}
		else{
			writ2.editForm.formCfg.data=obj;
			var preCmd=$("#"+writ2.editForm.formCfg.id+"_cmdPre");
			var nextCmd=$("#"+writ2.editForm.formCfg.id+"_cmdNext");
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
			genFormContent(writ2.editForm);/*重绘内容*/
		}
	}
	