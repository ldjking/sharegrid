/*41form		表单交互*/
(function(x){	/*form由什么组成
					1cfg	定义这个表单是何种类型的表单  取数方法  数据操作权限
					2tables	这个表单是由哪些子项组成
					3cmds	操作按钮定义	提交方法  按钮定义在何种状态
					*/		
	x.genForm=function(dom,cfg){
		var form=dom;
		form.formCfg=cfg;
		cfg.dom=dom;
		/*step1 生成表单标题*/
		x.cssAdd(form,"form");
		if(cfg.bigPaper)	x.cssAdd(form,"big");
		cfg.id=x.getId("form");
		
		var cmdbar=$div(cfg.id+"_cmdbar","cmdbar");
		var container=$div(cfg.id+"_container","formContainer");
		var doc=$div(cfg.id+"_doc","doc");
		var paper=$div(cfg.id+"_paper","paper");
		var errorMsg=$div(cfg.id+"_errorMsg","errorMsg");
		var errorText=$div(cfg.id+"_errorText","info");
		var tri=$div(null,"tri");
		
		x.addChild(form,[cmdbar,container]);/*增加子项*/
		container.appendChild(doc);
		x.addChild(doc,[paper,errorMsg]);
		x.addChild(errorMsg,[errorText,tri]);

		x.uiLayout({dom:container,container:form,dx:0,dy:0,ydoms:[cmdbar]});
		
		//if(cfg.formType=="update"&&!(cfg.param!=null||cfg.data!=null))return;/*如果是修改表单，缺少数据或参数，直接返回*/
		//out("form",form);
		x.genFormScroll(form);/*先一步生成滚动条*/
		x.genFormContent(form);
		/*滚动的时候实际上是调整 doc的相对位置  所以error提示框的位置应该位于doc内部*/
		x.uiForm(form);
		x.dependeCheck(form);
		x.dependeRangeCheck(form);
	}	
	
})(window);
