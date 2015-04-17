/*38table	表格交互   带筛选器 排序  分页功能的表格  */
(function(x){	/*table 效果  能自由拖拽列宽*/
	var e_txt_click=function(evt){
		this.focus();
	}
	
	var e_prePage=function(evt){
		var table	=x.$1(".table",this,0);
		var cfg	=table.tableCfg;
		if(cfg.currPage==1)	return;/*没有上一页*/
		else	cfg.currPage--;
		x.genTableContent(table);
	}
	
	var e_nextPage=function(){
		var table	=x.$1(".table",this,0);
		var cfg	=table.tableCfg;
		if(cfg.currPage==cfg.totalPage)	return;/*没有下一页*/
		else	cfg.currPage++;
		x.genTableContent(table);
	}
	
	x.genTableContent=function(dom){/*每次不应该重画所有的内容，相反应该想办法尽可能减少重画*/
		var cfg=dom.tableCfg;
		var data=cfg.data;
		var columns=cfg.columns;
		var id=cfg.id;
		var table=$("#"+id);
		//x.clearDom(dom);
		if(cfg.data_method!=null){/*获取数据*/
			var param=cfg.param;
			if(param==null)	param={pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage};
			else			x.mix(param,{pageflag:cfg.pageFlag,pagesize:cfg.pageSize,pagenum:cfg.currPage});
			if(cfg.orderby)	param.orderby=cfg.orderby;
			if(cfg.filter!=null)	param.filter=cfg.filter;
			////out("param",param);
			var result=$$(cfg.data_method,param);
			////out("result",result);
			if(result.flag)	{
				data=result.data;
				if(data==null||data.length==0) {
					data=[];
					cfg.total=0;
					cfg.totalPage=1;
					cfg.currPage=1;
				} else {
					cfg.total=result.total;
					cfg.totalPage=Math.ceil(cfg.total/cfg.pageSize);
					cfg.currPage=result.page;
				}
			}
			else{/*未获取到数据*/
				data=[];
				cfg.total=0;
				cfg.totalPage=1;
				cfg.currPage=1;
			}
		}
		cfg.data		=	data;

		for(var i=2;i<table.rows.length-1;i++){
			var tr=table.rows[i];
			tr.obj=data[i-2];

			tr.className="row";
			for(var j=0;j<columns.length;j++){
				x.clearDom(tr.childNodes[j]);
				if(tr.obj==null)	continue;

				var cell=x.$div(null,"cell");
				tr.childNodes[j].appendChild(cell);
				if(columns[j].type=="seq")	cell.innerHTML=i-1;
				else if(data[i-2][columns[j].attr]!=null)	cell.innerHTML=data[i-2][columns[j].attr];
				if(columns[j].align==null)	columns[j].align="center";
				cell.style.textAlign=columns[j].align;
				if(x.isNum(columns[j].width))	cell.style.width=columns[j].width+"px";
			}
		}
		
		var pagerInfo=$("#"+id+"_pagerInfo");
		
		cfg.totalNum=cfg.total;
		pagerInfo.innerHTML="共"+cfg.totalNum+"条记录,每页"+cfg.pageSize+"条, &nbsp;";
		pagerInfo.innerHTML+="第"+cfg.currPage+"页/共"+cfg.totalPage+"页";
	}
	
	x.genTable=function(cfg,columns,data){/*生成一个表格  如果有targetDom 则在targetDom处生成*/
		var dom=cfg.dom;		
		var id=x.getId("table");
		cfg.id=id;
		cfg.columns=columns;
		cfg.data=data;
		var table=$table(cfg.pageSize+1+1,columns.length);/*表头行 筛选行 分页控制行*/
		table.id=id;
		dom.appendChild(table);
		x.cssAdd(dom,"table");
		
		if(cfg.filterMode)	x.cssAdd(dom,"filterMode");
		if(cfg.pageFlag)	x.cssAdd(dom,"pageMode");
		
		var tr_header=table.rows[0];/*表头不需要重新设置*/
		var tr_filter=table.rows[1];
		tr_header.className="header";
		tr_filter.className="filter";
		for(var i=0;i<tr_header.cells.length;i++){
			var cell=x.$div(null,"cell");
			tr_header.cells[i].appendChild(cell);
			tr_header.cells[i].columnDef=columns[i];
			cell.innerHTML=columns[i].text;
			if(columns[i].attr!=null){
				tr_header.cells[i].className="asc";
				x.bind(tr_header.cells[i],"click",e_header_click);
			}
		}
		for(var i=0;i<tr_filter.cells.length;i++){
			var cell=x.$txt("query");
			tr_filter.cells[i].appendChild(cell);
			tr_filter.cells[i].columnDef=columns[i];
			if(x.isNum(columns[i].width))	cell.style.width=columns[i].width+"px";
			if(columns[i].attr!=null){
				x.bind(cell,"click",e_txt_click);
				x.bind(cell,"keydown",function(evt){if(evt.keyCode==13)filter_table(dom)});			
			}
		}
		
		var pager=table.insertRow(table.rows.length);
		pager.className="pager";
		var pagerCell=pager.insertCell(0);
		pagerCell.colSpan=columns.length;
		//dom.style.width=x.getRect(table).width+"px";
		var pagerDiv=$div(id+"_pager","pagerDiv");
		pagerCell.appendChild(pagerDiv);
		var pagerInfo=$div(id+"_pagerInfo","pagerInfo");
		var pagerBtn=$div(id+"_pagerBtn","pagerBtn");
		var pagerPre=$span(id+"_pagerPre","pagerPre");
		var pagerNext=$span(id+"_pagerNext","pagerNext");
		pagerInfo.innerHTML="共19条记录，每页10条, 第1页/共5页 ";
		pagerPre.innerHTML="上一页";
		pagerNext.innerHTML="下一页";
		x.addChild(pagerBtn,[pagerPre,pagerNext]);
		x.addChild(pagerDiv,[pagerInfo,pagerBtn]);
		
		x.bind(pagerPre,	"click",		e_prePage);/**/
		x.bind(pagerNext,	"click",		e_nextPage);
		
		dom.tableCfg=cfg;
		genTableContent(dom);
	}
	var e_header_click=function(evt){
		var target=x.getTarget(evt);
		var td=x.$1("td",target,0);
		var table=x.$1(".table",td,0);
		var columnDef=td.columnDef;
		if(columnDef&&columnDef.attr){
			if(columnDef.desc==null)		columnDef.desc="desc";
			else if(columnDef.desc=="desc")	columnDef.desc="asc";
			else if(columnDef.desc=="asc")	columnDef.desc="desc";
			
			td.className=columnDef.desc;
			table.tableCfg.orderby=columnDef.attr+" "+columnDef.desc;
			x.genTableContent(table);
		}
		else{
		}
	}
	
	var filter_table=function(dom){/*对grid的内容进行筛选*/
		var id="#"+dom.tableCfg.id;
		var table=$(id);
		var queryTds=table.rows[1].cells;
		var filter={};
		for(var i=0;i<queryTds.length;i++){
			var columnDef=queryTds[i].columnDef;
			var txt=queryTds[i].childNodes[0];
			if(txt.value!=""){
				var obj={};
				if(columnDef.type==null)	columnDef.type="str";
				obj.type=columnDef.type;/*文本框类型*/
				obj.value=txt.value;/*值*/
				filter[columnDef.attr]=obj;
			}
		}
		dom.tableCfg.currPage=1;
		dom.tableCfg.filter=filter;
		x.genTableContent(dom);
	}
})(window);
