word.table = {};
word.table.init = function() {
	word.table.regEvent();
}
word.table.regEvent = function() {
	var cmdTable = document.getElementById("cmd_table");
	var cmdTableGroups = cmdTable.childNodes;
	for (var i in cmdTableGroups) {
		var group=cmdTableGroups[i];
		var cmds = group.childNodes;
		for (var j in cmds) {
			var cmd=cmds[j];
			if (cmd.className) {
				var divClassName = cmd.className.split(" ")[1];
				cmd.onclick = word.table[divClassName];
				cmd.id = divClassName;
				tipsDialog(cmd,word.conts.tableTips);
			}
		}
	}
}
word.table.table_select=function(e){
	word.dialog.table.select(e,this);
}
word.table.selectCell=function(){
	var target=content.target;
	var td=word.utils.getParentTd(target);
	if(td!=null){
		setTdSelect(td);
		var firstp=getFirstPDiv(td);
		startsel.target=getFirstLineDiv(firstp);
		startsel.now=0;
		var endp=getLastPDiv(td);
		var endline=getLastLineDiv(endp);
		endsel.target=endline;
		endsel.now=endline.innerText.length;
	}
}
word.table.selectTd=function(){
	var target=content.target;
	var td=word.utils.getParentTd(target);
	var tdAllIndex=word.table.getTdAllIndex(td);
	if(td!=null){
		var minIndex=0;//必须设置最小选择列
		var table=td.parentNode.parentNode;
		for(var i=0;i<table.rows.length;i++){
			var row=table.rows[i];
			var selectCell=0;
			for(var j=0;j<row.cells.length;j++){
				var cell=row.cells[j];
				var cellAllIndex=word.table.getTdAllIndex(cell);
				if(cellAllIndex.indexOf(tdAllIndex)>=0||tdAllIndex.indexOf(cellAllIndex)>=0){
					setTdSelect(cell);
					selectCell++;
					var tdIndex=parseInt(cell.getAttribute("tdIndex"));
					if(i==0&&selectCell==1){
						minIndex=tdIndex;
						startsel.target=cell;
					}else if(i==table.rows.length-1){
						endsel.target=cell;
					}else{
						if(minIndex>tdIndex){
							minIndex=tdIndex;
						}
					}
				}
			}
		}
		word.select.minTdIndex=minIndex;
	}
}
word.table.selectTr=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		setTrSelect(tr);
		if(tr.cells.length>1){
			startsel.target=tr.cells[0];
			endsel.target=tr.cells[tr.cells.length-1];
		}else{
			var firstp=getFirstPDiv(tr);
			startsel.target=getFirstLineDiv(firstp);
			startsel.now=0;
			var endp=getLastPDiv(tr);
			var endline=getLastLineDiv(endp);
			endsel.target=endline;
			endsel.now=endline.innerText.length;
		}
	}
}
word.table.selectTable=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		var table=tr.parentNode;
		for(var i=0;i<table.rows.length;i++){
			var row=table.rows[i];
			setTrSelect(row);
		}
		startsel.target=word.utils.getFirstTrFirstTd(table);
		endsel.target=word.utils.getLastTrLastTd(table);
	}
}
word.table.table_gridding=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		var table=tr.parentNode;
		table.className="tableGridLine";
	}
}
word.table.table_property=function(){
	word.dialog.table.property();
}
word.table.setProperty=function(returnValue){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		var table=tr.parentNode;
		table.style.textAlign=returnValue.align;
		if(returnValue.marginLeftValue!=""){
			table.style.marginLeft=returnValue.marginLeftValue;
		}
		word.table.setTableBorder(table,returnValue);
	}
}
word.table.table_delete=function(e){
	word.dialog.table.deleteTable(e,this);
}

word.table.table_delete.deleteTd=function(){
	var target=content.target;
	var td=word.utils.getParentTd(target);
	if(td!=null){
		var deleteTdIndex= word.table.getTdAllIndex(td);
		var table=td.parentNode.parentNode;
		var tableMaxTd=word.table.getMaxTd(table);
		var thispaper = getPage(td);
		for(var i=0;i<table.rows.length;i++){
			var row=table.rows[i];
			var trTdMax=word.table.getTrTdMax(row);
			var maxRows=word.table.getMaxTrRows(row);
			for(var j=0;j<row.cells.length;j++){
				var cell=row.cells[j];
				var cellIndex= word.table.getTdAllIndex(cell);
				if(deleteTdIndex.indexOf(cellIndex)>=0||cellIndex.indexOf(deleteTdIndex)>=0){
					//word.table.deleteCell(cell,i,j);
					cell.parentNode.removeChild(cell);
					j--;
				}else if(cellIndex>deleteTdIndex){
					cell.setAttribute("tdIndex",parseInt(cell.getAttribute("tdIndex"))-td.colSpan+"");
				}
			}
			if(row.cells.length==0){
				word.table.reduceMergerTr(row,tableMaxTd,trTdMax,maxRows);
				row.parentNode.removeChild(row);
				i--;
			}
		}
		if(table.rows.length==0){
			var nextp=getNextP(word.utils.getParentDiv(table));
			var line=getFirstLineDiv(nextp);
			setWordVar(line,0);
			table.parentNode.removeChild(table);
			changarg.removearg.push(word.utils.getParentDiv(table));
		}else{
			word.table.updateTableWidth(table);
			var line=table.rows[0].cells[0].childNodes[0].childNodes[0];
			setWordVar(line,0);
			pushToUpdate(word.utils.getParentDiv(table));
		}
		outPageListener(thispaper);
	}
}
word.table.table_delete.deleteTr=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		var thispaper = getPage(tr);
		var table=tr.parentNode;
		var tableMaxTd=word.table.getMaxTd(table);
		var trTdMax=word.table.getTrTdMax(tr);
		var maxRows=word.table.getMaxTrRows(tr);
		if(tableMaxTd>trTdMax){
			word.table.reduceMergerTr(tr,tableMaxTd,trTdMax,maxRows);
		}else{
			if(maxRows>1){
				var nexttr=tr.nextSibling;
				for(var i=0;i<tr.cells.length;i++){
					var cell=tr.cells[i];
					if(cell.rowSpan>1){
						var cell_new=word.table.insertCellByIndex(nexttr,cell,cell.rowSpan-1);
						cell_new.setAttribute("tdIndex",cell.getAttribute("tdIndex"));
					}
				}
			}
		}
		tr.parentNode.removeChild(tr);
		if(table.rows.length==0){
			var nextp=getNextP(word.utils.getParentDiv(table));
			var line=getFirstLineDiv(nextp);
			setWordVar(line,0);
			table.parentNode.removeChild(table);
			changarg.removearg.push(word.utils.getParentDiv(table));
		}else{
			word.table.updateTableWidth(table);
			var line=table.rows[0].cells[0].childNodes[0].childNodes[0];
			setWordVar(line,0);
			pushToUpdate(word.utils.getParentDiv(table));
		}
		outPageListener(thispaper);
	}
}
word.table.table_delete.deleteTable=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		var thispaper = getPage(tr);
		var tableDiv=word.utils.getParentDiv(tr);
		var nextp=getNextP(tableDiv);
		var line=getFirstLineDiv(nextp);
		setWordVar(line,0);
		tableDiv.parentNode.removeChild(tableDiv);
		changarg.removearg.push(tableDiv);
		outPageListener(thispaper);
	}
}
word.table.table_upInsert=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		word.table.upInsertRow(tr);
		pushToUpdate(word.utils.getParentDiv(tr));
		var thispaper = getPage(tr);
		outPageListener(thispaper);
	}
}
word.table.table_downInsert=function(){
	var target=content.target;
	var tr=word.utils.getParentTr(target);
	if(tr!=null){
		word.table.downInsertRow(tr);
		pushToUpdate(word.utils.getParentDiv(tr));
		var thispaper = getPage(tr);
		outPageListener(thispaper);
	}
}
word.table.table_leftInsert=function(){
	var target=content.target;
	var td=word.utils.getParentTd(target);
	if(td!=null){
		word.table.insertCell(td,"left");
		pushToUpdate(word.utils.getParentDiv(td));
		var thispaper = getPage(td);
		outPageListener(thispaper);
	}
}
word.table.table_rightInsert=function(){
	var target=content.target;
	var td=word.utils.getParentTd(target);
	if(td!=null){
		word.table.insertCell(td,"right");
		pushToUpdate(word.utils.getParentDiv(td));
		var thispaper = getPage(td);
		outPageListener(thispaper);
	}
}
word.table.table_mergeCells=function(){
	if(startsel.target==null||endsel.target==null){
		return;
	}
	var startline = startsel.target;
	var endline = endsel.target;
	//var starttd=word.utils.getParentTd(startline);
	//var endtd=word.utils.getParentTd(endline);
	if(word.utils.isTd(startline)&&word.utils.isTd(endline)&&startline!=endline){
		var starttdIndex=startline.getAttribute("tdIndex");
		var endtdIndex=endline.getAttribute("tdIndex");
		var startTr=word.utils.getParentTr(startline);
		var endTr=word.utils.getParentTr(endline);
		if(startTr==endTr){//合并列
			word.table.setCellMergerTrue(startline,endline);
			if(word.table.bmerger){
				startline.colSpan+=parseInt(endtdIndex)-parseInt(starttdIndex);
				startline.setAttribute("tdIndex",parseInt(starttdIndex)+startline.colSpan-1);
				var endCellIndex=endline.cellIndex;
				for(var i=startline.cellIndex+1;i<=endtdIndex;){
					var cell=startTr.cells[i];
					if(cell!=null){
						startline.innerHTML+=cell.innerHTML;
						startTr.removeChild(cell);
					}else{
						break;
					}
				}
			}else{
				alert("所选内容不符合合并规则！要不合并行，要么合并列。");
			}
		}else{//合并行
			word.table.setTrMergerTrue(startline,endline);
			if(word.table.bmerger){
				startline.rowSpan+=endTr.rowIndex-startTr.rowIndex;
				for(var i=startTr.rowIndex+1;i<=endTr.rowIndex;i++){
					var tr=startTr.parentNode.rows[i];
					var td=getTdByIndex(tr,endtdIndex);
					startline.innerHTML+=td.innerHTML;
					tr.removeChild(td);
				}
			}else{
				alert("所选内容不符合合并规则！要不合并行，要么合并列。");
			}
		}
		pushToUpdate(word.utils.getParentDiv(startTr));
		var thispaper = getPage(startTr);
		outPageListener(thispaper);
	}
}

word.table.table_splitCells=function(){
	word.dialog.table.splitCells();
}
word.table.splitCells=function(rows,cells){
	var target=content.target;
	if(target!=null){
		var td=word.utils.getParentTd(target);
		var tdIndex=parseInt(td.getAttribute("tdIndex"));
		var cellIndexOri=td.cellIndex;
		var tr=td.parentNode;
		var table=tr.parentNode;
		var width=td.style.width;
		width=parseInt(width.substring(0,width.length-2));
		var eachCellWidth=width/cells+td.colSpan-1;
		var tdAllIndex=word.table.getTdAllIndex(td);
		if(td.rowSpan>1){
			cells=1;
		}
		for(var j=0;j<cells;j++){
			//var cell_new=word.table.insertCellByIndex(tr,td,td.rowSpan);//这样不行
			var cell_new=word.table.cloneCell(td);
			cell_new.style.width=eachCellWidth+"px";
			if(td.colSpan>1){
				cell_new.colSpan=td.colSpan/parseInt(cells);
			}
			cell_new.setAttribute("tdIndex",j+tdIndex+"");
			tr.insertBefore(cell_new,td);
			var pdiv=word.table.getTdP(td,j);
			if(pdiv!=null){
				cell_new.innerHTML=pdiv.outerHTML;
			}
			word.table.setTdParagraphWidth(cell_new);
		}
		for(var i=0;i<table.rows.length;i++){
			var row=table.rows[i];
			if(row!=tr){
				for(var j=0;j<row.cells.length;j++){
					var cell=row.cells[j];
					var cellAllIndex=word.table.getTdAllIndex(cell);
					if(cellAllIndex.indexOf(tdAllIndex)>=0){
						cell.colSpan=cell.colSpan+parseInt(cells)-1;
						cell.setAttribute("tdIndex",parseInt(cell.getAttribute("tdIndex"))+parseInt(cells)-1+"");
					}else if(cellAllIndex>tdAllIndex){
						cell.setAttribute("tdIndex",parseInt(cell.getAttribute("tdIndex"))+parseInt(cells)-1+"");
					}
				}
			}else{
				var cellIndex=td.cellIndex;
				//alert(cellIndex);
				for(var j=0;j<row.cells.length;j++){
					var cell=row.cells[j];
					if(cell.cellIndex>cellIndex){
						cell.setAttribute("tdIndex",parseInt(cell.getAttribute("tdIndex"))+parseInt(cells)-1+"");
						if(td.rowSpan==1){
							cell.rowSpan+=parseInt(rows)-1;
						}
					}else if(cell.cellIndex<cellIndexOri){
						if(td.rowSpan==1){
							cell.rowSpan+=parseInt(rows)-1;
						}
					}
				}
			}
		}
		var nextTr=tr;
		for(var i=0;i<rows-1;i++){
			if(td.rowSpan>1){
				for(var j=0;j<cells;j++){
					//var cell_new=word.table.insertCellByIndex(tr,td,td.rowSpan);//这样不行
					nextTr=nextTr.nextSibling;
					var cell_new=nextTr.insertCell(cellIndexOri);
					cell_new.style.width=eachCellWidth+"px";
					cell_new.setAttribute("tdIndex",j+tdIndex+"");
					cell_new.setAttribute("style",td.getAttribute("style"));
					if(td.colSpan>1){
						cell_new.colSpan=td.colSpan/parseInt(cells);
					}
					word.table.cloneCellP(cell_new,td);
					word.table.setTdParagraphWidth(cell_new);
				}
			}else{
				var new_tr=table.insertRow(tr.rowIndex+1);
				for(var j=0;j<cells;j++){
					//var cell_new=word.table.insertCellByIndex(tr,td,td.rowSpan);//这样不行
					var cell_new=word.table.cloneCell(td);
					cell_new.style.width=eachCellWidth+"px";
					cell_new.setAttribute("tdIndex",j+tdIndex+"");
					word.table.setTdParagraphWidth(cell_new);
					if(td.colSpan>1){
						cell_new.colSpan=td.colSpan/parseInt(cells);
					}
					new_tr.appendChild(cell_new);
				}
			}
		}
		//td.parentNode.deleteCell(cellIndex+cells);
		tr.removeChild(td);
		pushToUpdate(word.utils.getParentDiv(tr));
		var thispaper = getPage(tr);
		outPageListener(thispaper);
	}
}
word.table.getTdP=function(td,index){
	var divs=td.childNodes;
	var p=0;
	for(var i=0;i<divs.length;i++){
		var div=divs[i];
		if(word.utils.isParagraph(div)){
			if(p==index){
				return div;
			}
			p++;
		}
	}
	return null;
}
word.table.table_splitTable=function(){
	var target=content.target;
	if(target!=null){
		var tr=word.utils.getParentTr(target);
		var tableDiv=word.utils.getParentDiv(tr);
		var thispaper = getPage(tableDiv);
		if(tr!=null){
			if(tr.rowIndex>0){
				var table=word.utils.getFirstTable(tableDiv);
				var newtableDiv=tableDiv.cloneNode(false);
				pid2++;
				newtableDiv.setAttribute("pid2", pid2);
				var newtable=table.cloneNode(false);
				var tableMaxTd=word.table.getMaxTd(table);
				var trTdMax=word.table.getTrTdMax(tr);
				var index=tr.rowIndex;
				if(tableMaxTd>trTdMax){
					var mergerTdIndex=word.table.getMergerTdIndex(tr,tableMaxTd);
					var restartTd=tableMaxTd-trTdMax;//需向上找合并行的个数
					//var maxRows=word.table.getMaxTrRows(tr);
					outerloop:for(var i=index-1;i>=0;i--){
						var prerow=tr.parentNode.rows[i];
						for(var j=0;j<prerow.cells.length;j++){
							var cell=prerow.cells[j];
							//还需要取得需要增加合并行的下标。
							if(cell.rowSpan>1&&restartTd>0&&mergerTdIndex.indexOf(parseInt(cell.getAttribute("tdIndex"))+";")>=0){
								var insert_new_cell=word.table.insertCellByIndex(tr,cell,cell.rowSpan-(index-i));
								cell.rowSpan-=insert_new_cell.rowSpan;//这里应该减去当前行距合并行有多少行。。。
								//restartTd=restartTd-maxRows;
								restartTd=restartTd-1;
							}
							if(restartTd==0){
								break outerloop;
							}
						}
					}
				}
				for(var i=0;i<index;i++){
					newtable.appendChild(table.rows[0]);
				}
				newtableDiv.appendChild(newtable);
				tableDiv.parentNode.insertBefore(newtableDiv,tableDiv);
			}
			var newp=createDefaltPDiv(thispaper);
			var newline=createLineDiv(null);
			newp.appendChild(newline);
			tableDiv.parentNode.insertBefore(newp,tableDiv);
			setWordVar(newline,0);
		}
		pushToUpdate(tableDiv);
		outPageListener(thispaper);
	}
}

/**
 * 复制tr中所有的样式，一直到line下面的第一个span
 * @param {} tr
 */
word.table.upInsertRow=function(tr){
	var table=tr.parentNode;
	var tableMaxTd=word.table.getMaxTd(table);
	var trTdMax=word.table.getTrTdMax(tr);
	if(tableMaxTd>trTdMax){
		word.table.addMergerTr(tr,tableMaxTd,trTdMax);
	}
	var row_new=tr.cloneNode(false);
//	if(direction=="up"){
		table.insertBefore(row_new,tr);
//	}else if(direction=="down"){
//		insertAfter(row_new,tr);
//	}
	for(var i=0,len=tr.cells.length;i<len;i++){
		var cell=tr.cells[i];
		word.table.appendTdToTr(row_new,cell);
	}
	//clearSelect();
	//startsel.target=row_new;
	endsel.target=row_new;
	content.target=null;
	setTrSelect(row_new);
}
word.table.downInsertRow=function(tr){
	var table=tr.parentNode;
	var tableMaxTd=word.table.getMaxTd(table);
	var trTdMax=word.table.getTrTdMax(tr);
	if(tableMaxTd>trTdMax){
		tr=tr.nextSibling;
		word.table.addMergerTr(tr,tableMaxTd,trTdMax);
		var row_new=tr.cloneNode(false);
		table.insertBefore(row_new,tr);
		for(var i=0,len=tr.cells.length;i<len;i++){
			var cell=tr.cells[i];
			word.table.appendTdToTr(row_new,cell);
		}
	}else{
		var row_new=tr.cloneNode(false);
		insertAfter(row_new,tr);
		for(var i=0,len=tr.cells.length;i<len;i++){
			var cell=tr.cells[i];
			if(cell.rowSpan==1){
				word.table.appendTdToTr(row_new,cell);
			}else{
				cell.rowSpan+=1;
			}
		}
	}
	endsel.target=row_new;
	content.target=null;
	setTrSelect(row_new);
}
word.table.setTableBorder=function(table,returnValue){
	var borderValue="";
	if(returnValue.borderSetting=="none"){
		borderValue=returnValue.borderWidth+"px "+"none "+returnValue.borderColor;
	}else if(returnValue.borderSetting=="all"||returnValue.borderSetting=="border"){
		borderValue=returnValue.borderWidth+"px "+returnValue.borderStyle+" "+returnValue.borderColor;
	}
	table.style.border=borderValue;
	if(returnValue.borderSetting=="none"||returnValue.borderSetting=="all"){
		table.setAttribute("tblBorders_insideH",borderValue);
		table.setAttribute("tblBorders_insideV",borderValue);
		var tds=table.getElementsByTagName("td");
		for(var i=0;i<tds.length;i++){
			var td=tds[i];
			td.style.border=borderValue;
		}
	}else{
		table.removeAttribute("tblBorders_insideH");
		table.removeAttribute("tblBorders_insideV");
	}
}
word.table.insertCell=function(td,direction){
	var tdIndex=td.getAttribute("tdIndex");
	var index=parseInt(tdIndex);
	if(direction=="left"){
		index=index-1;
	}
	var table=td.parentNode.parentNode;
	var tableMaxTd=word.table.getMaxTd(table);
	var w=table.style.width;
	var tableWidth=parseInt(w.substring(0,w.length-2));
	var eachCellWidth=tableWidth/(tableMaxTd+1);
	for(var i=0;i<table.rows.length;i++){
		var row=table.rows[i];
		var sum=0;
		var tds=row.cells;
		var cell=null;
		for(var j=0;j<tds.length;j++){
			cell=tds[j];
			var cellTdIndex=parseInt(cell.getAttribute("tdIndex"));
			if(cellTdIndex>index&&sum==0){
				sum++,j++;
				var cell_new=word.table.cloneCell(cell);
				cell_new.colSpan=1;
				cell_new.style.width=eachCellWidth+"px";
				cell_new.setAttribute("tdIndex",cellTdIndex-cell.colSpan+1+"");//单元格有合并的话，tdIndex不正确。。。
				word.table.setTdParagraphWidth(cell_new);
				row.insertBefore(cell_new,cell);
				//setTdSelect(cell_new);
				if(i==0){
					startsel.target=cell_new;
				}else if(i==table.rows.length-1){
					endsel.target=cell_new;
				}
			}
			cell.style.width=cell.colSpan*eachCellWidth+"px";
			word.table.setTdParagraphWidth(cell);
			if(cellTdIndex>index){
				cell.setAttribute("tdIndex",cellTdIndex+1+"");
			}
		}
		if(sum==0){
			var cell_new=word.table.cloneCell(cell);
			cell_new.colSpan=1;
			cell_new.style.width=eachCellWidth+"px";
			cell_new.setAttribute("tdIndex",index+1+"");
			word.table.setTdParagraphWidth(cell_new);
			insertAfter(cell_new,cell);
			//setTdSelect(cell_new);
			if(i==0){
				startsel.target=cell_new;
			}else if(i==table.rows.length-1){
				endsel.target=cell_new;
			}
		}
	}
	doAddPatchInTable(startsel.target,endsel.target);
	content.target=null;
}
word.table.setTdParagraphWidth=function(td){
	var tdwidth=td.style.width;
	var paddingLeft=td.style.paddingLeft;
	var paddingRight=td.style.paddingRight;
	var w=parseInt(tdwidth.substring(0,tdwidth.length-2))-parseInt(paddingLeft.substring(0,paddingLeft.length-2))-parseInt(paddingRight.substring(0,paddingRight.length-2));
	var ps=td.childNodes;
	for(var i=0;i<ps.length;i++){
		var p=ps[i];
		if(word.utils.isParagraph(p)){
			p.style.width=w+"px";
			fixParagraph(p);
		}
	}
}
word.table.getMergerTdIndex=function(tr,tableMaxTd){
	var index="";
	for(var i=1;i<=tableMaxTd;i++){
		index+=i+";";
	}
	for(var i=0;i<tr.cells.length;i++){
		var cell=tr.cells[i];
		var tdIndex=cell.getAttribute("tdIndex");
		for(var j=0;j<=cell.colSpan-1;j++){
			index=index.replace((parseInt(tdIndex)-j)+";","");
		}
	}
	return index;
}
word.table.updateTableWidth=function(table){
	if(table.rows.length>0){
		var tableWidth=0;
		var row=table.rows[0];
		//alert(row.clientWidth);
		for(var i=0;i<row.cells.length;i++){
			var cell=row.cells[i];
			var pv=cell.style.width;
			tableWidth=tableWidth+parseInt(pv.substring(0,pv.length-2));
		}
		table.style.width=tableWidth+"px";
	}
}
word.table.getTdAllIndex=function(td){
	var deleteTdIndex="";
	var tdIndex=parseInt(td.getAttribute("tdIndex"));
	for(var i=0;i<td.colSpan;i++){
		deleteTdIndex+=(tdIndex-i)+";";
	}
	return deleteTdIndex;
}
word.table.addMergerTr=function(tr,tableMaxTd,trTdMax){
	var mergerTdIndex=word.table.getMergerTdIndex(tr,tableMaxTd);
	var restartTd=tableMaxTd-trTdMax;//需向上找合并行的个数
	var index=tr.rowIndex;
	outerloop:for(var i=index-1;i>=0;i--){
		var prerow=tr.parentNode.rows[i];
		for(var j=0;j<prerow.cells.length;j++){
			//还需要取得需要增加合并行的下标。
			if(prerow.cells[j].rowSpan>1&&restartTd>0&&mergerTdIndex.indexOf(parseInt(prerow.cells[j].getAttribute("tdIndex"))+";")>=0){
				prerow.cells[j].rowSpan+=1;
				restartTd=restartTd-1;
			}
			if(restartTd==0){
				break outerloop;
			}
		}
	}
}
word.table.reduceMergerTr=function(tr,tableMaxTd,trTdMax,maxRows){
	var mergerTdIndex=word.table.getMergerTdIndex(tr,tableMaxTd);
	var restartTd=tableMaxTd-trTdMax;//需向上找合并行的个数
	var index=tr.rowIndex;
	outerloop:for(var i=index-1;i>=0;i--){
		var prerow=tr.parentNode.rows[i];
		for(var j=0;j<prerow.cells.length;j++){
			//还需要取得需要增加合并行的下标。
			if(prerow.cells[j].rowSpan>1&&restartTd>0&&mergerTdIndex.indexOf(parseInt(prerow.cells[j].getAttribute("tdIndex"))+";")>=0){
				prerow.cells[j].rowSpan-=1;
				restartTd=restartTd-maxRows;
			}
			if(restartTd==0){
				break outerloop;
			}
		}
	}
}
word.table.getMaxTrRows=function(tr){
	var index=1;
	for(var i=0;i<tr.cells.length;i++){
		var cell=tr.cells[i];
		if(cell.rowSpan>1){
			index=cell.rowSpan;
		}
	}
	return index;
}
word.table.appendTdToTr=function(tr,cell){
	var cell_new=word.table.cloneCell(cell);
	tr.appendChild(cell_new);
}
word.table.insertCellByIndex=function(tr,cell,rowSpan){
	//var cell_new=word.table.cloneCell(cell);
	var insert_new_cell=tr.insertCell(cell.cellIndex);
	//insert_new_cell.className="td";
	insert_new_cell.setAttribute("style",cell.getAttribute("style"));
	insert_new_cell.rowSpan=rowSpan;
	if(insert_new_cell.rowSpan>1){
		insert_new_cell.setAttribute("vMerge","restart");
	}
	word.table.cloneCellP(insert_new_cell,cell);
	//insert_new_cell.innerHTML=cell_new.innerHTML;
	return insert_new_cell;
}
word.table.cloneCell=function(cell){
	var cell_new=cell.cloneNode(false);
	cell_new.removeAttribute("vMerge");
	cell_new.rowSpan=1;
//	var vMerge=cell.getAttribute("vMerge");
//	if(vMerge!=null){
//		
//	}
	word.table.cloneCellP(cell_new,cell);
	return cell_new;
}
word.table.cloneCellP=function(cell_new,cell){
	var p=cell.childNodes[0];
	var p_new=p.cloneNode(false);
	cell_new.appendChild(p_new);
	var line=getFirstLineDiv(p);
	var line_new=line.cloneNode(false);
	p_new.appendChild(line_new);
	var span=line.childNodes[0];
	//var span_new=span.cloneNode(false);不能复制，复制的话光标不能定位
	//span_new.style.minWidth="10px";
	//span_new.innerHTML="<t>&nbsp;";//为了好输入,光标所在位置，必须要设置一个空格，，，，，，
	var span_new=document.createElement("span");
	span_new.setAttribute("style",span.getAttribute("style"));
	line_new.appendChild(span_new);
}
word.table.getMaxTd=function(table){
	var row=table.rows[0];
	return word.table.getTrTdMax(row);
}
word.table.getTrTdMax=function(tr){
	var maxTd=0;
	for(var i=0;i<tr.cells.length;i++){
		var cell=tr.cells[i];
		maxTd+=cell.colSpan;
	}
	return maxTd;
}
word.table.setCellMergerTrue=function(starttd,endtd){
	var rows=starttd.rowSpan;
	var startTr=word.utils.getParentTr(starttd);
	for(var i=starttd.cellIndex+1;i<=endtd.cellIndex;i++){
		if(startTr.cells[i].rowSpan!=rows){
			return word.table.bmerger=false;
		}
	}
	return word.table.bmerger=true;
}
word.table.setTrMergerTrue=function(starttd,endtd){
	var starttdIndex=parseInt(starttd.getAttribute("tdIndex"));
	var endtdIndex=parseInt(endtd.getAttribute("tdIndex"));
	
	var startTdAllIndex=word.table.getTdAllIndex(starttd);
	var endTdAllIndex=word.table.getTdAllIndex(endtd);
	if(startTdAllIndex!=endTdAllIndex){
		return word.table.bmerger=false;
	}
	if(starttd==endtd){
		return word.table.bmerger=true;
	}
	if(starttdIndex<endtdIndex){
		var ntd=starttd.nextSibling;
		if(ntd==null){
			word.table.setTrMergerTrue(getNextTrTd(starttd,endtdIndex),endtd);
		}else{
			word.table.setTrMergerTrue(ntd,endtd);
		}
	}else{
		word.table.setTrMergerTrue(getNextTrTd(starttd,endtdIndex),endtd);
	}
}
word.table.clearMySpace=function(line){
	if (line.className == "line") {
		if(line.innerText.length>1){
			line.innerHTML = line.innerHTML.replace(/<t>&nbsp;/g, "");
		}
	}
}