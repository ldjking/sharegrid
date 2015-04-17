(function(x){	/*grid	导航栏目  */
/*grid需要监听tree的click事件  管理功能是比较弱的 也许有些场景只是导航功能  管理分类 似乎完全没有必要*/
	x.showGridNav=function(grid){/*展示grid的导航栏*/
		var rect=x.getRect(grid);
		var cfg=grid.gridCfg;
		cfg.navState=true;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width-240+"px";
		/*重新修正滚动条*/
		x.fixGridScroll(grid);
	}
	x.hideGridNav=function(grid){/*隐藏grid的导航栏*/
		var rect=x.getRect(grid);
		var cfg=grid.gridCfg;
		cfg.navState=false;
		var container=x.$("#"+cfg.id+"_container");
		container.style.width=rect.width+"px";
		/*重新修正滚动条*/
		x.fixGridScroll(grid);
	}
	x.genGridNav=function(grid){
		var cfg=grid.gridCfg;/*为grid生成导航栏目*/
		if(cfg.navs==null)	return;
		//out("gen grid nav");
		var gridNav=$div(cfg.id+"_nav","gridNav");/*grid导航栏*/
		grid.appendChild(gridNav);/*导航栏总要分栏目*/
		//var navTop=$div(cfg.id+"_navTop","navTop");/*导航选项卡标题的高度*/
		var navTitle=$div(cfg.id+"_navTitle","navTitle");/*导航选项卡标题的高度*/
		var navMain=$div(cfg.id+"_navMain","navMain");
		
		x.addChild(gridNav,[navTitle,navMain]);/*为navMain计算高度*/
		navMain.style.height=x.getRect(grid).height-33+"px";/*这是表头部分*/
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
		
		if(cfg.showNav)	x.showGridNav(grid);
		//navfix.style.width="200px";
	}
})(window);