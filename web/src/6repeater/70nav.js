(function(x){	/*repeater	导航栏目  */
/*repeater需要监听tree的click事件  管理功能是比较弱的 也许有些场景只是导航功能  管理分类 似乎完全没有必要*/
	x.showRepeaterNav=function(repeater){/*展示repeater的导航栏*/
		var rect=x.getRect(repeater);
		var cfg=repeater.repeaterCfg;
		cfg.navState=true;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width-240+"px";
		/*重新修正滚动条*/
		x.fixRepeaterScroll(repeater);
	}
	x.hideRepeaterNav=function(repeater){/*隐藏repeater的导航栏*/
		var rect=x.getRect(repeater);
		var cfg=repeater.repeaterCfg;
		cfg.navState=false;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width+"px";
		/*重新修正滚动条*/
		x.fixRepeaterScroll(repeater);
	}
	x.genRepeaterNav=function(repeater){
		var cfg=repeater.repeaterCfg;/*为repeater生成导航栏目*/
		if(cfg.navs==null)	return;
		//out("gen repeater nav");
		var repeaterNav=$div(cfg.id+"_nav","repeaterNav");/*repeater导航栏*/
		repeater.appendChild(repeaterNav);/*导航栏总要分栏目*/
		//var navTop=$div(cfg.id+"_navTop","navTop");/*导航选项卡标题的高度*/
		var navTitle=$div(cfg.id+"_navTitle","navTitle");/*导航选项卡标题的高度*/
		var navMain=$div(cfg.id+"_navMain","navMain");
		
		x.addChild(repeaterNav,[navTitle,navMain]);/*为navMain计算高度*/
		navMain.style.height=x.getRect(repeater).height-33+"px";/*这是表头部分*/
		//out("gen nav 2");
		var navs=cfg.navs;
		var width=0;
		for(var i=0;i<navs.length;i++){/**/
			var nav=$div(cfg.id+"_nav"+i,"nav");
			var div=$div(cfg.id+"_navText"+i,"navText");
			div.innerHTML=navs[i].name;
			var panel=$div(cfg.id+"_panel"+i,"panel");
			navTitle.appendChild(nav);
			navMain.appendChild(panel);
			if(navs[i].cfg!=null){
				var treeCfg=navs[i].cfg;
				x.genTree(panel,navs[i].cfg);
			}
			nav.appendChild(div);
			if(i==0){
				x.cssAdd(div,"active");
				x.cssAdd(panel,"active");
			}

			width+=nav.scrollWidth;
		}
		var navfix=$div(cfg.id+"_navfix"+i,"navfix");
		//out("width",width);
		navTitle.appendChild(navfix);
		//navfix.innerHTML="rest";
		navfix.style.width=239-width-i+"px";
		
		if(cfg.showNav)	x.showRepeaterNav(repeater);
		//navfix.style.width="200px";
	}
})(window);