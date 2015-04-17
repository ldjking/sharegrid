var break_word_index=0;
window.onload=init;
function init(){
	
	document.onclick = closeDialog;
	document.getElementById("lock").onclick=enble_Editing;
	document.getElementById("save").onclick=e_html_save;
	//document.getElementById("close").onclick=word_edit;
	document.getElementById("refresh").onclick=word_reload;
	e_word_analysis();
}
function enble_Editing(){
	if(this.className=="lock"){
		this.className="unlock";
		word.init();
		word_edit();
		word.font.init();
		word.paragraph.init();
		word.select.init();
		word.insert.init();
		word.table.init();
		var container=document.getElementById("content");
		var firstp=getFirstPDiv(container);
		var firstline=getFirstLineDiv(firstp);
		setWordVar(firstline, 0);
		container.onkeyup=keyUpHandler;
		container.onkeydown=keyDownHandler;
		container.onmouseup=mouseUpHandler;
		container.onmousedown=mouseDownHandler;
		container.onmousemove=mouseMoveHandler;
	}
}
function word_reload(){
	var param={};
	param.cmd="getContentByDoc";
	param.t1_id="DOC201303290918321";
	var result = $$("cy_excute", param, false);
	//alert(jsonStr(result));
	if(result.flag){
		e_word_analysis(result.data);
	}
}
function e_html_save() {
	getChange();
	var objs = [];
	// 先处理删除的
	for (var i = 0; i < changarg.removearg.length; i++) {
		var obj = {};
		obj.operation = "del";
		var p = changarg.removearg[i];
		if(word.utils.isParagraph(p)){
			obj.target = "p";
			var pid=p.getAttribute("pid");
			if (pid != null) {
				obj.pid = pid;
			}
			var lpid=p.getAttribute("lpid");
			if (lpid != null) {
				obj.lpid = lpid;
			}
		}else if(word.utils.isImage(p)){
			obj.target = "img";
			var img=word.utils.getFirstImg(p);
			obj.imageId=img.getAttribute("imgId");
		}else if(word.utils.isTable(p)){
			obj.target = "table";
			var table=word.utils.getFirstTable(p);
			obj.tableId=table.getAttribute("tableId");
		}else if(word.utils.isPage(p)){
			obj.target="page";
			obj.pgid=p.getAttribute("pgid");
			var nextpage=p.nextSibling;
			if(nextpage==null){
				obj.islast=true;
			}
		}
		objs.push(obj);
	}
	// alert(changarg.addarg.length);
	// 再是增加的
	for (var i = 0; i < changarg.addarg.length; i++) {
		var p = changarg.addarg[i];
		var obj = {};
		obj.operation = "add";
		if(word.utils.isPage(p)){
			obj.target="page";
			obj.parent=p.parentNode.getAttribute("sid");
			obj.pgid=p.getAttribute("pgid");
			var prepage=p.previousSibling;
			if(prepage!=null){
				var pgid=prepage.getAttribute("pgid");
				if(pgid!=null){
					obj.before = pgid;
				}
//				var prepid2=prepage.getAttribute("pid2");
//				if(prepid2!=null){
//					obj.before =prepid2;
//					obj.beforeNew=true;
//				}
			}
			var br=p.getAttribute("br");
			if(br!=null){
				obj.br=br;
			}
			var nextpage=p.nextSibling;
			if(nextpage==null){
				obj.islast=true;
			}
		}else{
			obj.pid2 = p.getAttribute("pid2");
			obj.parent=getPage(p).getAttribute("pgid");
			if(word.utils.isImage(p)){
				obj.target = "img";
				var img=word.utils.getFirstImg(p);
				obj.imageRid=img.getAttribute("imgRid");
				obj.imageSrc=img.getAttribute("src");
				obj.width=img.style.width;
				obj.height=img.style.height;
			}else if(word.utils.isParagraph(p)){
				obj.target = "p";
				var lpid=p.getAttribute("lpid");
				if(lpid!=null){
					obj.lpid=lpid;
				}
				// 取得段落的设置
				obj.style = analysis_p_style(p);
				// 取得下面的span
				obj.spans = getSpans(p);
			}else if(word.utils.isTable(p)){
				obj.target = "table";
				var table=word.utils.getFirstTable(p);
				//obj.tableId=table.getAttribute("tableId");
				obj.style=analysis_table_style(table);
				obj.trs=getTrs(table);
				obj.tableMaxTd=word.table.getMaxTd(table);
			}
			// alert(p.previousSibling.getAttribute("pid"))
			//得到段落前一个段落结点,pid,lpid,pid2三个只有存在一个定位
			var prep = getPrePInPage(p);
			if(prep!=null){
				setBeforeId(obj,prep);
			}else{//新增的跨页段落
				if(word.utils.isParagraph(p)){
					prep=getPreP(p);
					var prepid2=prep.getAttribute("pid2");
					var plpid=p.getAttribute("lpid");
					if(plpid!=null&&prepid2!=null&&prepid2==plpid){
						obj.is_add_in_next_page="true";
					}
				}
			}
		}
		objs.push(obj);
	}
	// 修改
	for (var i = 0; i < changarg.updatearg.length; i++) {
		var p = changarg.updatearg[i];
		var obj = {};
		obj.operation = "edit";
		if(word.utils.isParagraph(p)){
			obj.target = "p";
			var pid=p.getAttribute("pid");
			if(pid!=null){
				obj.pid = pid;
			}
			var lpid=p.getAttribute("lpid");
			if(lpid!=null){
				obj.lpid=lpid;
			}
			var prep = getPrePInPage(p);
			if(prep==null){
				obj.is_first=true;
			}
			// 取得段落的设置
			obj.style = analysis_p_style(p);
			// 取得下面的span
			obj.spans = getSpans(p);
		}else if(word.utils.isTable(p)){
			obj.target = "table";
			var table=p.childNodes[0];
			obj.tableId=table.getAttribute("tableId");
			obj.style=analysis_table_style(table);
			obj.trs=getTrs(table);
			obj.tableMaxTd=word.table.getMaxTd(table);
		}else if(word.utils.isPage(p)){
			obj.target = "page";
			obj.pgid=p.getAttribute("pgid");
		}
		objs.push(obj);
	}
	// 参数
	var param = {};
	param.cmd = "updateMyXml";
	param.objs = objs;
	param.t1_id=document.getElementById("t1_id").value;
	var result=$$("word_excute", param, true);
	if(result.flag){
		clearChangarg();
	}
}
function analysis_p_style(p){
	var prop="";
	var lineHeight=p.style.lineHeight;
	if(lineHeight!=null&&lineHeight!=""){
		prop+="lineHeight:"+lineHeight+";";
		prop+="line:"+lineHeight+";";
		var line=p.getAttribute("line");
		if(line!=null){
			prop+="line:"+line+";";
		}
	}
	var pv=p.style.paddingLeft;
	if(pv!=null&&pv!=""){
		prop+="leftChars:"+pv+";";
	}
	pv=p.style.paddingRight;
	if(pv!=null&&pv!=""){
		prop+="rightChars:"+pv+";";
	}
	pv=p.style.textAlign;
	if(pv!=null&&pv!=""){
		prop+="jc:"+pv+";";
	}
	pv=p.style.textIndent;
	if(pv!=null&&pv!=""){
		prop+="firstLineChars:"+pv+";";
	}
	pv=p.style.paddingTop;
	if(pv!=null&&pv!=""){
		prop+="beforeLines:"+pv+";";
	}
	pv=p.style.paddingBottom;
	if(pv!=null&&pv!=""){
		prop+="afterLines:"+pv+";";
	}
	return prop;
}
/**
 * 取得段落下面所以的span
 * @param {} p 当前段落的dom对象
 * @return {} 返回解析后的span数组内容
 */
function getSpans(p) {
	var rs = [];
	var spans = p.getElementsByTagName("span");
	for (var j = 0; j < spans.length; j++) {
		var r = {};
		var span = spans.item(j);
		r.style = analysis_span_style(span);
		r.text = span.innerText;
		rs.push(r);
	}
	return rs;
}
function getTrs(table){
	var trs=[];
	for(var i=0;i<table.rows.length;i++){
		var row=table.rows[i];
		var tr={},tds=[];
		tr.style=analysis_tr_style(row);
		for(var j=0;j<row.cells.length;j++){
			var cell=row.cells[j];
			var td={},ps=[];
			td.style= analysis_td_style(cell);
			td.rowspan=cell.rowSpan;
			td.colspan=cell.colSpan;
			td.tdIndex=cell.getAttribute("tdIndex");
			var pDivs=cell.childNodes;
			for(var k=0;k<pDivs.length;k++){
				var pdiv=pDivs[k];
				if(word.utils.isParagraph(pdiv)){
					var p={};
					p.target = "p";
					// 取得段落的设置
					p.style = analysis_p_style(pdiv);
					// 取得下面的span
					p.spans = getSpans(pdiv);
					ps.push(p);
				}
			}
			td.ps=ps;
			tds.push(td);
		}
		tr.tds=tds;
		trs.push(tr);
	}
	return trs;
}
function analysis_tr_style(tr){
	var prop="";
	var pv=tr.style.textAlign;
	if(pv!=""){
		prop+="jc:"+pv+";";
	}
	pv=tr.style.height;
	if(pv!=""){
		prop+="trHeight:"+pv+";";
	}
	return prop;
}
function analysis_td_style(td){
	var table=td.parentNode.parentNode;
	var prop="";
	var pv=td.style.width;
	if(pv!=""){
		prop+="tcW:"+pv+";";
	}
	pv=td.style.textAlign;
	if(pv!=""){
		prop+="vAlign:"+pv+";";
	}
	pv=table.getAttribute("tblBorders_insideH");
	if(pv==null){
		pv=td.style.borderLeft;
		if(pv!=""){
			prop+="tcBorders_left:"+pv+";";
		}
		pv=td.style.borderRight;
		if(pv!=""){
			prop+="tcBorders_right:"+pv+";";
		}
	}
	pv=table.getAttribute("tblBorders_insideV");
	if(pv==null){
		pv=td.style.borderTop;
		if(pv!=""){
			prop+="tcBorders_top:"+pv+";";
		}
		pv=td.style.borderBottom;
		if(pv!=""){
			prop+="tcBorders_bottom:"+pv+";";
		}
	}
	return prop;
}
/**
 * 解析span的样式
 * @param {} span 
 * @return {}
 */
function analysis_span_style(span){
	var prop="";
	var pv=span.style.fontFamily;
	if(pv!=null&&pv!=""){
		prop+="eastAsia:"+pv+";";
	}
	pv=span.style.fontSize;
	if(pv!=null&&pv!=""){
		prop+="sz:"+pv+";";
	}
	pv=span.style.fontWeight;
	if(pv!=null&&pv!=""){
		prop+="b:"+pv+";";
	}
	pv=span.style.fontStyle;
	if(pv!=null&&pv!=""){
		prop+="i:"+pv+";";
	}
	pv=span.style.color;
	if(pv!=null&&pv!=""){
		prop+="color:"+word.utils.RGBToHex(pv)+";";
	}
	return prop;
}
function analysis_table_style(table){
	var prop="";
	var pv=table.style.width;
	if(pv!=""){
		prop+="tblW:"+pv+";";
	}
	pv=table.style.marginLeft;
	if(pv!=""){
		prop+="tblInd:"+pv+";";
	}
	pv=table.style.borderTop;
	if(pv!=""){
		prop+="tblBorders_top:"+getBorderColor(pv)+";";
	}
	pv=table.style.borderLeft;
	if(pv!=""){
		prop+="tblBorders_bottom:"+getBorderColor(pv)+";";
	}
	pv=table.style.borderRight;
	if(pv!=""){
		prop+="tblBorders_right:"+getBorderColor(pv)+";";
	}
	pv=table.style.borderLeft;
	if(pv!=""){
		prop+="tblBorders_left:"+getBorderColor(pv)+";";
	}
	pv=table.getAttribute("tblBorders_insideH");
	if(pv!=null){
		prop+="tblBorders_insideH:"+pv+";";
	}
	pv=table.getAttribute("tblBorders_insideV");
	if(pv!=null){
		prop+="tblBorders_insideV:"+pv+";";
	}
	pv=table.getAttribute("tblCellMar_top");
	if(pv!=null){
		prop+="tblCellMar_top:"+pv+";";
	}
	pv=table.getAttribute("tblCellMar_bottom");
	if(pv!=null){
		prop+="tblCellMar_bottom:"+pv+";";
	}
	pv=table.getAttribute("tblCellMar_left");
	if(pv!=null){
		prop+="tblCellMar_left:"+pv+";";
	}
	pv=table.getAttribute("tblCellMar_right");
	if(pv!=null){
		prop+="tblCellMar_right:"+pv+";";
	}
	return prop;
}
function getBorderColor(pv){
	if(pv.indexOf("rgb")<0){
		return pv;
	}else{
		var newv=pv.substring(0,pv.indexOf("rgb"))+word.utils.RGBToHex(pv.substring(pv.indexOf("rgb"),pv.length));
		return newv;
	}
}
function setBeforeId(obj,prep){
	if(word.utils.isParagraph(prep)){
		var b=true;
		var prepid=prep.getAttribute("pid");
		if (prepid != null) {
			b=false
			obj.before = prepid;
		}
		var prelpid=prep.getAttribute("lpid");
		if (prelpid != null) {
			b=false;
			obj.before = prelpid;
		}
		if(b){
			var prepid2=prep.getAttribute("pid2");
			if(prepid2!=null){
				obj.before =prepid2;
				obj.beforeNew=b;
			}
		}
	}else if(word.utils.isImage(prep)){
		var img=word.utils.getFirstImg(prep);
		var imgId=img.getAttribute("imgId");
		if(imgId!=null){
			obj.before=imgId;
		}
		var prepid2=prep.getAttribute("pid2");
		if(prepid2!=null){
			obj.before =prepid2;
			obj.beforeNew=true;
		}
	}else if(word.utils.isTable(prep)){
		var table=word.utils.getFirstTable(prep);
		var tableId=table.getAttribute("tableId");
		if(tableId!=null){
			obj.before=tableId;
		}
		var prepid2=prep.getAttribute("pid2");
		if(prepid2!=null){
			obj.before =prepid2;
			obj.beforeNew=true;
		}
	}
}
function word_edit(){
	//alert(1);
	var contentDiv=document.getElementById("content");
	var sections=contentDiv.childNodes;
	for (var i = 0,len=sections.length; i < len; i++) {
		var section=sections[i];
		var pages=section.childNodes;
		for (var j = 0,plen=pages.length; j < plen; j++) {
			var page=pages[j];
			var ps=page.childNodes;
			for (var k = 0; k <ps.length; k++) {
				var p=ps[k];
				if(p.className=='text'){
					var ts=p.childNodes;
					for(var n=0;n<ts.length;n++){
						var t=ts[n];
						if(word.utils.isParagraph(t)){
							break_p_line(t);
						}
						if(word.utils.isImage(t)){
							//t.setAttribute("contentEditable",true);
//							t.onclick=function(){
//								var img=this.childNodes[0];
//								img.style.border="1px solid #ff00ff";
//							}
						}
						if(word.utils.isTable(t)){
							//t.setAttribute("contentEditable",true);
							var tblDivs=t.getElementsByTagName("div");
							for(var m=0;m<tblDivs.length;m++){
								var tdDiv=tblDivs[m];
								if(tdDiv.className=="p"){
									break_p_line(tdDiv);
								}
							}
						}
					}
					//return;
				}
			}
		}
	}
}
function break_p_line(p){
	//alert("2");
	var spans=[];
	for(var i=0;i<p.childNodes.length;){
		spans.push(p.removeChild(p.childNodes[i]));
	}
	var div=document.createElement("div");
	div.className="line";
	div.setAttribute("contentEditable",true);
	div.style.whiteSpace="nowrap";
	//t行高要继承过来
	//div.style.lineHeight=p.style.lineHeight;//只有一行可以直接写成height
	div.style.height=p.style.lineHeight;
	p.appendChild(div);
	//alert(p.getAttribute("pid"));
	for(var i=0;i<spans.length;i++){
		var span=spans[i];
		if(div==null){
			div=getLastLineDiv(p);
		}
		//if(div!=null){
			div.appendChild(span);
			//alert(div.scrollWidth+" "+div.clientWidth);
			if(div.scrollWidth>div.clientWidth){
				//分span，找出合适的断字位置。
				div=d_create_new_line(p,div,span);
			}
		//}
	}
}
//找出分词的位置
function d_text(div,span,text,value){
	if(value==''){//不用加入下一个span的内容
		break_word_index=1;
		return;
	}
	//alert(value);
	span.innerText=value;
	if(div.scrollWidth>div.clientWidth){
		if(break_word_index>0){
			return;
		}else{
			d_text(div,span,text,text.substring(0,value.length/2));
		}
	}else{
		break_word_index=value.length;
		if(value.length<=1){//如果刚好加入一个字符
			break_word_index=1;
			return;
		}else{
			d_text(div,span,text,text.substring(0,(value.length*3)/2));
		}
	}
}
function d_create_new_line(p,div,span){
	var span_new=span.cloneNode(false);
//	var rid=span.getAttribute("rid");
//	if(rid!=null){
//		span_new.removeAttribute("rid");
//		span_new.setAttribute("lrid",rid);
//	}
	var text=span.innerText;
	var length=text.length;
	var value=text.substring(0,length/2);
	d_text(div,span,text,value);
	//alert(break_word_index);
//	if(rid=="103"){
//		alert(break_word_index+"="+length);
//	}
	for(j=break_word_index;j<=length;j++){
		span.innerText=text.substring(0,j);
		if(div.scrollWidth>div.clientWidth){//分完。
			span.innerText=text.substring(0,j-1);
			//重启新行
			div=document.createElement("div");
			div.className="line";
			div.setAttribute("contentEditable",true);
			div.style.whiteSpace="nowrap";
			div.style.textIndent="0em";
			div.style.lineHeight=p.style.lineHeight;
			p.appendChild(div);
			div.appendChild(span_new);
			span_new.innerText=text.substring(j-1,length);
			if(div.scrollWidth>div.clientWidth){//span断字后的文本还超出了一行的大小 ，就要继续断字。
//				text=span_new.innerText;
//				length=text.length;
//				value=text.substring(0,length/2);
//				d_text(div,span_new,text,value);
				d_create_new_line(p,div,span_new);
				return null;
			}else{
				break_word_index=0;
				return div;
			}
		}
	}
}
