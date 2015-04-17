/*44attr		表单输入框控制*/
(function(x){	/*menu效果*/
	x.enableFormAttr=function(form,attrs){
		var cfg=form.formCfg;/*配置*/
		for(var i=0;i<attrs.length;i++){
			/*逐项找到输入项 将disable状态设为enable*/
			var attr=attrs[i];
			var dom=$("#"+cfg.id+"_attr"+attr);
			if(dom!=null){
					dom.disabled=false;
					x.cssRm(dom.parentNode,"disable");
			}
			
		}
	}
	x.getFormAttr=function(form,attr,cell){/*获取表单输入项值  ref是参照*/
		/*第一步要知道ref是什么类型		固定类型还是相对类型*/
		var cfg=form.formCfg;
		if(cell==null)	return $("#"+cfg.id+"_attr"+attr);
		else{
			var cellDef=cell.cellDef;/*单元格定义 如果该单元格的类型是固定的*/
		}
		
	}
	x.disableFormAttr=function(form,attrs){
		var cfg=form.formCfg;/*配置*/
		for(var i=0;i<attrs.length;i++){
			/*逐项找到输入项 将disable状态设为enable*/
			var attr=attrs[i];
			var dom=$("#"+cfg.id+"_attr"+attr);
			if(dom!=null){
					dom.disabled=true;
					x.cssAdd(dom.parentNode,"disable");
			}
			
		}
	}
})(window);
