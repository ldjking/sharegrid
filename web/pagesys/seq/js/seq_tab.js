seq.tabChange=function(target,p){
	if(p==1){
		seq.refreshEditForm();
	}
}
seq.refreshEditForm =function(){
		var obj=null;
		var cfg=seq.grid.gridCfg;
		if(cfg.activeRow==null)			selectGridRow(seq.grid,1);
		obj=cfg.activeRow.obj;
		if(seq.editForm.formCfg.data==obj){return;}
		else{
			seq.editForm.formCfg.data=obj;
			var preCmd=$("#"+seq.editForm.formCfg.id+"_cmdPre");
			var nextCmd=$("#"+seq.editForm.formCfg.id+"_cmdNext");
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
			genFormContent(seq.editForm);/*重绘内容*/
		}
	}
	