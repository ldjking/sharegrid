/*34tab		选项卡效果*/
(function(x){	/*页签效果  页签的效果有多种*/
	var e_tab_trigger=function(evt){
		var target=getTarget(evt);
		var doms=getSiblings(target);
		var p=indexOf(doms,target);
		x.cssReplace(doms,"active","normal");
		x.cssReplace(target,"normal","active");
		var container=$1(".tabContainer",target,0);
		if(container.tabIndex==null)	container.tabIndex=p;
		else if(container.tabIndex==p)	return;/*已经相同 ，不需要处理*/
		container.tabIndex=p;
		
		var cfg=container.tabCfg;/*页签相关配置*/
		
		if(x.isFun(cfg.tabChange)){/**/
			if(target!=null)
			var result=cfg.tabChange(target,p);/*tabChange事件 接收两个参数  target  页签位置*/
			if(result==true)	return;/*用户要求特别的处理，不再执行默认事件*/
		}
		
		var dom2=cfg.dom2;
		if(dom2!=null){
			if(cfg.mode=="slide"){/*滑动门效果*/
				x.fxClear(dom2);
				x.fxSlide(dom2,p,cfg.pageSize,cfg.vmode,cfg.delay,cfg.duration,cfg.fn);
			}
			else{
				;////out("display only");
				var doms=x.getChilds(dom2);
				x.cssReplace(doms,"active","normal");
				x.cssReplace(doms[p],"normal","active");
			}
		}
	}
	
	x.uiTab=function(cfg){
		//;////out("ui tab!"+cfg.evt);
		var dom=cfg.dom;
		dom.tabCfg=cfg;
		var childs=x.$(".tab",dom,3);
		//;////out("childs.length",childs.length);
		x.bind(childs,cfg.evt,e_tab_trigger);
	}
	
	
	x.activeTab=function(target){
		var app=$1(".app",target,0);
		var cfg=app.appCfg;
		var p=x.getDomIndex(target);
		
		//x.cssReplace(doms,"active","normal");
		//x.cssReplace(target,"normal","active");
		if(cfg.tabIndex==null)	cfg.tabIndex=p;
		else if(cfg.tabIndex==p)	return;/*已经相同 ，不需要处理*/
		cfg.tabIndex=p;
		
		var tabs		=cfg.tabs;
		var contents	=cfg.contents;
		x.cssReplace(tabs,"active","normal");
		x.cssReplace(tabs[p],"hide","active");
		x.cssReplace(tabs[p],"normal","active");
		x.cssReplace(contents,"active","normal");
		x.cssReplace(contents[p],"normal","active");
		
		if(x.isFun(cfg.fn)){/**/
			//;////out("cfg.fn is function!");
			if(target!=null)
			var result=cfg.fn(target,p);/*tabChange事件 接收两个参数  target  页签位置*/
			//;////out("cfg.fn excute=",result);
		}
		
	}
	var e_tab_trigger2=function(evt){
		var target=getTarget(evt);
		x.activeTab(target);
		
	}
	x.uiApp=function(cfg){/*输出一个应用程序管理对象还是怎么处理出来*/
		var app=cfg.dom;
		app.appCfg=cfg;
		
		var evt=cfg.evt;
		if(evt==null)	evt="mousedown";
		var tabs=x.getChilds(x.getChilds(app,0));
		//;////out("tabs.length");
		cfg.tabs=tabs;
		x.bind(tabs,evt,e_tab_trigger2);		
		/*注册布局事件*/
		var contents=x.getChilds(x.getChilds(app,1));
		cfg.contents=contents;
		for(var i=0;i<contents.length;i++){
			var content=contents[i];
			var conf={dom:content,container:document.body,dx:0,dy:0};
			x.uiLayout(conf);
		}
	}
})(window);
