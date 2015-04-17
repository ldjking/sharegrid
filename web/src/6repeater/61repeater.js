(function(x){	/*repeater	效果 带分页 带滚动条*/
	x.genRepeater=function(dom,cfg){/*输出一个repeater出来*/
		//out("genRepeater");
		var cmds=cfg.cmds;
		var columns=cfg.columns;
		cfg.dom=dom;
		var frozenColumns=[],otherColumns=[];
		for(var i=0;i<columns.length;i++){
			var c=columns[i];
			if(c.width==null)	c.width=120;
			if(c.frozen)	frozenColumns.push(c);
			else			otherColumns.push(c);
		}
		cfg.frozenColumns=frozenColumns;
		cfg.otherColumns=otherColumns;
		cfg.cmds=cmds;
		cfg.id=x.getId("repeater");
		var repeater=cfg.dom;
		repeater.repeaterCfg=cfg;
		
		
		x.cssAdd(repeater,"repeater");
		if(cfg.treeCfg)		x.cssAdd(repeater,"tree");
		if(cfg.filterMode)	x.cssAdd(repeater,"filterMode");
		if(cfg.multiMode)	x.cssAdd(repeater,"multiMode");

		/*现在结构建立起来*/
		var cmdbar=x.genRepeaterCmd(repeater);
		var repeaterContainer=x.genRepeaterHeader(repeater);
		x.uiLayout({dom:repeaterContainer,container:repeater,dx:0,dy:1,ydoms:[cmdbar]});	
		x.genRepeaterNav(repeater);/*生成repeater的导航栏*/
		
		x.genRepeaterPager(repeater);
		x.genRepeaterScroll(repeater);

		var repeaterContent=x.genRepeaterContent(repeater,true);
		x.regResizeHanlder(repeater,x.fixRepeaterScroll);
		x.uiRepeater(repeater);
		return repeater;
	}
})(window);