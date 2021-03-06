(function(x){/*生成repeater的page部分*/
	x.genRepeaterPager=function(repeater){
		var cfg=repeater.repeaterCfg;
		var id=cfg.id;
		var repeaterContainer	=$("#"+id+"_container");
		var pager			=x.$div(id+"_pager","pager");
		
		var footer_bg		=x.$div(id+"_footer","footer_bg");
		x.addChild(repeaterContainer,[pager,footer_bg]);
		var pagerInfo=$table(1,2);
		var pagerTable=$table(1,4);
		x.addChild(pager,[pagerInfo,pagerTable]);

		pagerInfo.className="pageInfo";
		pagerTable.className="pageTable";
		var pagerRow	=pagerTable.rows[0];
		var pageNum		=pagerInfo.rows[0].cells[1];
		var rowNum		=pagerInfo.rows[0].cells[0];
		var prePage		=pagerRow.cells[1];
		var nextPage	=pagerRow.cells[2];
		var firstPage	=pagerRow.cells[0];
		var lastPage	=pagerRow.cells[3];
		pageNum.id		=id+"_pageNum";
		rowNum.id		=id+"_rowNum";
		prePage.id		=id+"_prePage";
		nextPage.id		=id+"_nextPage";
		prePage.id		=id+"_prePage";
		firstPage.id	=id+"_firstPage";
		lastPage.id		=id+"_lastPage";
		pageNum.className	="pageNum";
		rowNum.className	="rowNum";
		prePage.className	="pagebtn";
		nextPage.className	="pagebtn";
		firstPage.className	="pagebtn";
		lastPage.className	="pagebtn";
		prePage.innerHTML	="上一页";
		nextPage.innerHTML	="下一页";
		firstPage.innerHTML	="首页";
		lastPage.innerHTML	="尾页";
		x.bind(prePage,		"click",		e_prePage);/**/
		x.bind(nextPage,	"click",		e_nextPage);
		x.bind(firstPage,	"click",		e_firstPage);
		x.bind(lastPage,	"click",		e_lastPage);
		if(!cfg.pageFlag)	pagerTable.style.display="none";
	}
	
	
	var e_prePage=function(evt){
		var repeater	=x.$1(".repeater",this,0);
		var cfg	=repeater.repeaterCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage--;
		x.genRepeaterContent(repeater);
	}
	
	var e_nextPage=function(){
		var repeater	=x.$1(".repeater",this,0);
		var cfg	=repeater.repeaterCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage++;
		x.genRepeaterContent(repeater);
	}
	var e_firstPage=function(){
		var repeater	=x.$1(".repeater",this,0);
		var cfg	=repeater.repeaterCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage=1;
		x.genRepeaterContent(repeater);
	}
	var e_lastPage=function(){
		var repeater	=x.$1(".repeater",this,0);
		var cfg	=repeater.repeaterCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage=cfg.totalPage;
		x.genRepeaterContent(repeater);
	}
	
})(window);