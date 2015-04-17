var word={};
var page={};
var tableWidth=0;
var map=null;
word.init=function(){
	var tabContainer=document.getElementById("tabContainer");
	var childs=tabContainer.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className){
			child.id=child.className.split(" ")[1];
			child.onclick=function(){
				//alert(this.className);
				word.tabsChange(this);
			}
		}
	}
	var cmds = document.getElementById("cmds");
	childs=cmds.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className){
			child.id=child.className.split(" ")[1];
		}
	}
}
// 为了取得行距
function e_html_save() {
	// 参数
	var param = {};
	param.cmd = "write2word";
	var result=$$("word_excute", param, false);
}
function e_word_analysis() {
	map=new Map();
	var param={};
	param.cmd="getContentByDoc";
	//param.t1_id="DOC201303290918321";
	param.t1_id=getParam("id");
	if(param.t1_id==null)	param.t1_id="DOC201303291243522";
	if(param.t1_id==null){
		return;
	}
	var data;
	var result = $$("cy_excute", param, false);
	//alert(result.flag);
	if(result.flag){
		data=result.data;
	}else{
		out("error",result.errorText);
	}
	word.styles=data.styles;
	
	document.getElementById("t1_id").value=data.t1_id;
	document.getElementById("docName").innerHTML=data.t1_name;
	//alert(data.styles);
	var contentDiv=document.getElementById("content");
	//取得默认的正文样式
	var style=getStyle();
	if(style!=null){
		for(var i=0;i<style.childNodes.length;i++){
			var child=style.childNodes[i];
			if(child.nodeName=="pStyle"){
				parse_paragraph_style(contentDiv,getNodeAttribute(child,"style"));
			}else if(child.nodeName=="rStyle"){
				parse_span_style(contentDiv,getNodeAttribute(child,"style"));
			}
		}
	}
	// 解析xml
	var domxml=  createXml(data.t1_content);
	var sections=domxml.getElementsByTagName("section");
	//alert(sections.length)
	for (var i = 0; i < sections.length; i++) {
		// 节
		var section=sections.item(i);
		var style=getNodeAttribute(section,"style");
		parse_page_style(style);
		var sectionDiv=document.createElement("div");
		sectionDiv.setAttribute("sid",getNodeAttribute(section,"sid"));
		d_page_element(section,sectionDiv);
		contentDiv.appendChild(sectionDiv);
	}
}
// 遍历页
function d_page_element(elem,div){
	var elems=elem.childNodes;
	if(elems==null||elems.length<1){
		return ;
	}else{
		for(var i=0;i<elems.length;i++){
			var e=elems.item(i);
			// 创建页
			var ediv=create_page(div);
			ediv.setAttribute("pgid",getNodeAttribute(e,"pgid"));
			var br=getNodeAttribute(e,"br");
			if(br!=null){
				ediv.setAttribute("br",br);
			}
			// 创建页眉
			create_header(ediv);
			// 文本区域
			var etext=create_text(ediv);
			d_paragraph_element(e,etext);
			// 创建页脚
			create_footer(ediv);
		}
	}
}
// 遍历段落
function d_paragraph_element(elem,div){
	var elems=elem.childNodes;
	if(elems==null||elems.length<1){
		return ;
	}else{
		for(var i=0;i<elems.length;i++){
			var e=elems.item(i);
			if(e.tagName==='paragraph'){
				var numberingDiv=null
				var numbering=getNodeAttribute(e,"numbering");
				if(numbering!=null){
					numberingDiv=create_numbering(numbering,div);
				}
				var ediv=create_paragraph(e,div);
				if(numberingDiv!=null){
					var left=parseInt(ediv.style.marginLeft)+parseInt(numberingDiv.style.width);
					if(numberingDiv.style.paddingRight!=""){
						left+=parseInt(numberingDiv.style.paddingRight);
					}
					if(numberingDiv.style.paddingLeft!=""){
						left+=parseInt(numberingDiv.style.paddingLeft);
					}
					ediv.style.marginLeft=left+"px";
				}
				d_span_element(e,ediv);
				if(ediv!=null&&ediv.innerText.length==0){
					var pv=ediv.style.lineHeight;
					if(ediv.clientHeight<pv.substring(0,pv.length-2)){//空文本的段落，启用编辑的时候再去掉
						ediv.style.height=pv;
					}
				}
			}else if(e.tagName==="image"){
				createImage(e,div);
			}else if(e.tagName==="table"){
				tableWidth=0;
				var table=createTable(e,div);
				table.className="tableGridLine";
				dTrElement(e,table);
				//删除需要删除的列
				var tds=table.getElementsByTagName("td");
				for(var j=0;j<tds.length;j++){
					var td=tds[j];
					if(td.className=="td delete"){
						td.parentNode.removeChild(td);
						j--;
					}
				}
			}
			
		}
	}
}
// 遍历文本
function d_span_element(elem,div){
	var elems=elem.childNodes;
	if(elems==null||elems.length<1){
		return ;
	}else{
		for(var i=0;i<elems.length;i++){
			var e=elems.item(i);
			if(e.tagName==='span'){
				create_span(e,div);
			}
		}
	}
}
function dTrElement(elem,table){
	var elems=elem.childNodes;
	if(elems==null||elems.length<1){
		return false;
	}else{
		for(var i=0;i<elems.length;i++){
			var e=elems.item(i);
			if(e.tagName==='tr'){
				var tr=createTr(e,table);
				dTdElement(e,tr);
				if(table.style.width==""&&tableWidth>0){
					table.style.width=tableWidth+"px";
					tableWidth=0;
				}
			}
		}
	}
}
function dTdElement(elem,tr){
	var elems=elem.childNodes;
	if(elems==null||elems.length<1){
		return false;
	}else{
		for(var i=0;i<elems.length;i++){
			var e=elems.item(i);
			if(e.tagName==='td'){
				var td=createTd(e,tr);
				d_paragraph_element(e,td);
			}
		}
	}
}
// 创建页
function create_page(div){
	var pageDiv=document.createElement("div");
	pageDiv.className="page";
	// pageDiv.style.position="relative";
	pageDiv.style.width=page.w;
	pageDiv.style.height=page.h;
	pageDiv.setAttribute("left",page.left);
	pageDiv.setAttribute("right",page.right);
	// pageDiv.style.paddingTop=page.top;
	// pageDiv.style.paddingBottom=page.bottom;
	div.appendChild(pageDiv);
	return pageDiv;
}
// 创建页眉
function create_header(div){
	var headerDiv=document.createElement("div");
	headerDiv.className="header";
	headerDiv.style.height=page.top;
	headerDiv.style.display="table-cell";
	headerDiv.style.verticalAlign="bottom";
	// 创建页眉内容
	var headerTextDiv=document.createElement("div");
	headerTextDiv.className="header_text";
	headerTextDiv.style.paddingBottom="25px";
	headerTextDiv.style.width=parseInt(page.w)-parseInt(page.left)-parseInt(page.right)+"px";
	headerTextDiv.style.marginLeft=page.left;
	headerTextDiv.style.marginRight=page.right;
	// headerTextDiv.innerText="第一页";
	// headerTextDiv.ondblclick=e_header_setEditable();
	headerDiv.appendChild(headerTextDiv);
	// 创建页眉图片
	var headerImgTable=document.createElement("table");
	// headerImgTable.style.position="absolute";
	// headerImgTable.style.left="0px";
	// headerImgTable.style.top=(parseInt(t.substring(0,t.length-2))-25)+"px";
	headerImgTable.style.width="100%";
	var headerImgTr=document.createElement("tr");
	var leftTd=document.createElement("td");
	leftTd.className="header_img_left";
	leftTd.style.width=page.left;
	headerImgTr.appendChild(leftTd);
	var td=document.createElement("td");
	headerImgTr.appendChild(td);
	var rightTd=document.createElement("td");
	rightTd.className="header_img_right";
	rightTd.style.width=page.right;
	headerImgTr.appendChild(rightTd);
	headerImgTable.appendChild(headerImgTr);
	headerDiv.appendChild(headerImgTable);
	div.appendChild(headerDiv);
}
// 创建页眉
function create_footer(div){
	var b=page.bottom;
	var footerDiv=document.createElement("div");
	footerDiv.className="footer";
	footerDiv.style.height=b;
	// 创建页眉图片
	var footerImgTable=document.createElement("table");
	// footerImgTable.style.position="absolute";
	footerImgTable.style.width="100%";
	// footerImgTable.style.left="0px";
	// footerImgTable.style.bottom=(parseInt(b.substring(0,b.length-2))-25)+"px";
	var footerImgTr=document.createElement("tr");
	var leftTd=document.createElement("td");
	leftTd.className="footer_img_left";
	leftTd.style.width=page.left;
	footerImgTr.appendChild(leftTd);
	var td=document.createElement("td");
	footerImgTr.appendChild(td);
	var rightTd=document.createElement("td");
	rightTd.className="footer_img_right";
	rightTd.style.width=page.right;
	footerImgTr.appendChild(rightTd);
	footerImgTable.appendChild(footerImgTr);
	footerDiv.appendChild(footerImgTable);
	// 创建页眉内容
	var footerTextDiv=document.createElement("div");
	footerTextDiv.className="footer_text";
	footerTextDiv.style.marginLeft=page.left;
	footerTextDiv.style.marginRight=page.right;
	// footerTextDiv.ondblclick=e_footer_setEditable();
	footerDiv.appendChild(footerTextDiv);
	div.appendChild(footerDiv);
}
// 创建文本区域
function create_text(div){
	var textDiv=document.createElement("div");
	textDiv.className="text";
	// 算出文本区域高度
	var h=page.h;
	var top=page.top;
	var bottom=page.bottom;
	var height=parseInt(h)-parseInt(top)-parseInt(bottom)+"px";
	textDiv.style.height=height;
	div.appendChild(textDiv);
	return textDiv;
}
function create_numbering(numbering,div){
	var numText="",index=1,ilvl=0,numType="";
	var numberingDiv=document.createElement("div");
	numberingDiv.className="numbering";
	numberingDiv.style.marginLeft=page.left;
	var attrs=numbering.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==="numType"){
			numType=pv;
			if(pv==="lowerLetter"){
				if(parseInt((index-1)/26)>0){
					numText+=String.fromCharCode(parseInt((index-1)/26)+96);
				}
				numText+=String.fromCharCode(parseInt(index-1)%26+97);
			}else if(pv==="upperLetter"){
				if(parseInt((index-1)/26)>0){
					numText+=String.fromCharCode(parseInt((index-1)/26)+64);
				}
				numText+=String.fromCharCode(parseInt(index-1)%26+65);
			}else if(pv==="decimal"){
				numText+=index;
			}else if(pv==="chineseCountingThousand"){
				var str = '十一二三四五六七八九'
				if(parseInt(index/11)>0){
					numText+=str.chartAt(parseInt(index/11)-1);
				}
				numText+=str.charAt(parseInt(index%10));
			}else if(pv==="lowerRoman"){
				var str = ['x','i','ii','iii','iv','v','vi','vii','viii','ix'];
				if(parseInt(index/11)>0){
					numText+=str[parseInt(index/11)-1];
				}
				numText+=str[parseInt(index%10)];
			}
		}else if(pn==="start"){
			index=parseInt(pv);
		}else if(pn==="ilvl"){
			ilvl=pv;
		}else if(pn==="numId"){
			var key=pv+"_"+ilvl;
			var keys=map.keys();
			for(var j=0;j<keys.length;j++){
				var k=keys[j];
				var ks=k.split("_");
				if(pv==ks[0]&&ks[1]>ilvl){
					map.remove(k);
				}
			}
			if(map.containsKey(key)){
				index=map.get(key);
				index++;
			}
			map.put(key,index);
		}else if(pn==="lvlText"){
			numText+=pv;
		}else if(pn==="lvlJc"){
			numberingDiv.style.textAlign=pv;
		}else if(pn==="lvlLeft"){
			if(numType==="lowerRoman"){
				numberingDiv.style.paddingRight=pv;
			}else{
				numberingDiv.style.paddingLeft=pv;
			}
		}else if(pn==="width"){
			numberingDiv.style.width=pv;
		}
	}
	numberingDiv.innerHTML=numText;
	div.appendChild(numberingDiv);
	return numberingDiv;
}
// 创建段落
function create_paragraph(e,div){
	if(div==null){
		return;
	}
	var style=getNodeAttribute(e,"style");
	var pDiv=document.createElement("div");
	var pid=getNodeAttribute(e,"pid");
	if(pid!=null){
		pDiv.setAttribute("pid",pid);
	}
	var lpid=getNodeAttribute(e,"lpid");
	if(lpid!=null){
		pDiv.setAttribute("lpid",lpid);
	}
	if(getNodeAttribute(e,"pStyle")!=null){
		var pstyle=getStyle(getNodeAttribute(e,"pStyle"));
		for(var i=0;i<pstyle.childNodes.length;i++){
			var child=pstyle.childNodes[i];
			if(child.nodeName=="pStyle"){
				parse_paragraph_style(pDiv,getNodeAttribute(child,"style"));
			}else if(child.nodeName=="rStyle"){
				parse_span_style(pDiv,getNodeAttribute(child,"style"));
			}
		}
	}
	parse_paragraph_style(pDiv,style);
	pDiv.className="p";
	// pDiv.style.border="1px solid #FF0000";
	if(div.tagName!="TD"){
		pDiv.style.marginLeft=page.left;
		pDiv.style.marginRight=page.right;
	}else{
		var tdwidth=div.style.width;
		var paddingLeft=div.style.paddingLeft;
		var paddingRight=div.style.paddingRight;
		var w=parseInt(tdwidth.substring(0,tdwidth.length-2))-parseInt(paddingLeft.substring(0,paddingLeft.length-2))-parseInt(paddingRight.substring(0,paddingRight.length-2));
		pDiv.style.width=w+"px";
	}
	pDiv.style.overflow="visible";
	div.appendChild(pDiv);
	return pDiv;
}
// 创建图片
function createImage(e,div){
	var imgDiv=document.createElement("div");
	imgDiv.className="img";
	imgDiv.style.marginLeft=page.left;
	//imgDiv.style.marginTop="10px";
	//imgDiv.style.marginBottom="10px";
	// imgDiv.style.marginRight=page.right;//宽度超了就会向右边挤
	var img=document.createElement("img");
	// alert(getNodeAttribute(e,"width"));
	img.setAttribute("imgId",getNodeAttribute(e,"imageId"));
	img.setAttribute("imgRid",getNodeAttribute(e,"imageRid"));
	var imgBaseUrl="http://localhost";
	img.src=imgBaseUrl+getNodeAttribute(e,"imageSrc");
	img.style.width=getNodeAttribute(e,"width");
	img.style.height=getNodeAttribute(e,"height");
	imgDiv.appendChild(img);
	div.appendChild(imgDiv);
}
function createTable(e,div){
	var tableDiv=document.createElement("div");
	tableDiv.className="table";
	var left=page.left;
	var right=page.right;
	left=parseInt(left.substring(0,left.length-2))-7;
	right=parseInt(right.substring(0,right.length-2))-7;
	tableDiv.style.marginLeft=left+"px";// 减7
	tableDiv.style.marginRight=right+"px";
	var table=document.createElement("table");
	table.setAttribute("tableId",getNodeAttribute(e,"tableId"));
	var style=getNodeAttribute(e,"style");
	parseTableStyle(table,style);
	//alert(getNodeAttribute(e,"tblStyle"));
	if(getNodeAttribute(e,"tblStyle")!=null){
		style=getStyle(getNodeAttribute(e,"tblStyle"));
		var childs=style.childNodes;
		if(childs.length>0){
			var tblStyle=childs[0];
			parseTableStyle(table,getNodeAttribute(tblStyle,"style"));
		}
	}
	tableDiv.appendChild(table);
	div.appendChild(tableDiv);
	return table;
}
function createTr(e,table){
	var tr=document.createElement("tr");
	var style=getNodeAttribute(e,"style");
	parseTrStyle(tr,style);
	table.appendChild(tr);
	return tr;
}
function createTd(e,tr){
	var vMerge=getNodeAttribute(e,"vMerge");
	if(vMerge!=null){
		if(vMerge==="restart"){// 算出合并的行数。。。
			var td=createTdToTr(e,tr);
			td.setAttribute("vMerge","restart");
			return td;
		}else if(vMerge==="null"){
			//先增加一个空，不影响它的结构，不然上一行有合并行的时候，就会对就不上了。处理完后再删除
			var td_delete=document.createElement("td");
			td_delete.className="td delete";
			tr.appendChild(td_delete);
			var trs=tr.parentNode.childNodes;
			for(var j=trs.length-2;j>=0;j--){
				var index=0;
				var tds=trs[j].childNodes;
				for(var i=0;i<tds.length;i++){
					var td=tds[i];
					index+=td.colSpan;// colSpan默认是1。。
					//alert(index+"e="+e.xml+"==="+getIndex(e));
					if(index==getTdIndex(td_delete)&&td.getAttribute("vMerge")!=null){
						td.rowSpan=td.rowSpan+1;
						return null;
					}
				}
			}
		}
	}else{
		return createTdToTr(e,tr);
	}
}
function createTdToTr(e,tr){
	var td=document.createElement("td");
	//td.className="td";
	td.style.paddingLeft="6px"//默认
	td.style.paddingRight="6px"//默认
	td.style.paddingTop="0px"//默认
	td.style.paddingBottom="0px"//默认
	var style=getNodeAttribute(e,"style");
	tr.appendChild(td);
	parseTdStyle(td,style);
	if(getNodeAttribute(e,"gridSpan")!=null){
		td.colSpan=getNodeAttribute(e,"gridSpan");
	}
	td.setAttribute("tdIndex",getTdIndex(td));
	return td;
}
function getTdIndex(td){
	var index=0;
	var tds=td.parentNode.childNodes;
	for(var i=0;i<tds.length;i++){
		var child=tds[i];
		index+=child.colSpan;// colSpan默认是1。。
		if(td==child){
			return index;
		}
	}
	return index;
}
// 创建文本
function create_span(e,div){
	var style=getNodeAttribute(e,"style");
	var span=document.createElement("span");
	// span.setAttribute("rid",getNodeAttribute(e,"rid"));
	// span.style.whiteSpace="pre-wrap";
	if(navigator.userAgent.indexOf("MSIE")>0){
		// if(getNodeAttribute(e,"rid")=="30") alert("aa"+e.nodeTypedValue);
		 // var pattern = /<span[^>]+>([^<]+)<\/span>/;
		 var pattern = /^<span[^>]+>([^<]+)<\/span>$/;
		 // var pattern = "<span[^>]+>([^<]+)<\/span>";
		 var x=e.xml;
		 // if(getNodeAttribute(e,"rid")=="28") alert(e.xml);
		 // if(getNodeAttribute(e,"rid")=="28") alert("aa"+e.text);
		 var texts=x.match(pattern);
		 if(texts!=null){
			 var text=texts[1];
			 // if(getNodeAttribute(e,"rid")=="28")alert(text);
			 	// span.innerHTML=text.replace(" ","&nbsp;&nbsp;");
		 	span.innerHTML=text.replace(/\s/g,"&nbsp;");
		 }else{
		 	// span.innerHTML=e.text;
		 }
	}else{
		// if(getNodeAttribute(e,"rid")=="30") alert("aa"+e.textContent);
		// span.innerHTML=e.textContent.replace(" ","&nbsp;");
		span.innerHTML=e.textContent.replace(/\s/g,"&nbsp;&nbsp;");
	}
	if(getNodeAttribute(e,"space")!=null){
		//span.innerHTML="&nbsp;"+span.innerHTML;
	}
	parse_span_style(span,style);
	div.appendChild(span);
}
// 解析页样式
function parse_page_style(style){
	if(style==null){
		return;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		// alert(attrs[i]);
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		page[pn]=prop[1];
	}
}
// 解析段落样式
function parse_paragraph_style(pDiv,style){
	if(style==null){
		return;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==='jc'){
			pDiv.style.textAlign=pv;
		}else if(pn==='firstLineChars'||pn==='firstLine'){
			pDiv.style.textIndent=pv;
		}else if(pn==='left'||pn==='leftChars'){
			pDiv.style.paddingLeft=pv;
		}else if(pn==='right'||pn==='rightChars'){
			pDiv.style.paddingRight=pv;
		}else if(pn==='lineHeight'){// 200%怎么搞
			pDiv.style.lineHeight=pv;
		}else if(pn==='beforeLines'){
			pDiv.style.paddingTop=pv;// 换成paddingTop,这样就包含在clientHeight中
		}else if(pn==='afterLines'){
			pDiv.style.paddingBottom=pv;
		}else if(pn==='line'){// 200%怎么搞
			if(pv.indexOf("%")>0){
				pDiv.setAttribute("line",pv);
			}
		}
	}
}
function parseTableStyle(table,style){
	if(style==null){
		return false;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==='jc'){
			// table.style.textAlign=pv;
		}else if(pn==="tblW"){
			table.style.width=pv;
		}else if(pn==="tableLayout"){
			// table.style.tableLayout=pv;
		}else if(pn==="tblInd"){
			table.style.marginLeft=pv;
		}else if(pn==="tblBorders_top"){
			table.style.borderTop=pv;
		}else if(pn==="tblBorders_left"){
			table.style.borderLeft=pv;
		}else if(pn==="tblBorders_bottom"){
			table.style.borderBottom=pv;
		}else if(pn==="tblBorders_right"){
			table.style.borderRight=pv;
		}else if(pn==="tblBorders_insideH"||pn==="tblBorders_insideV"){
			table.setAttribute(pn,pv);
			table.style.borderCollapse="collapse";
		}else if(pn==="tblCellMar_top"||pn==="tblCellMar_bottom"||pn==="tblCellMar_left"||pn==="tblCellMar_right"){
			table.setAttribute(pn,pv);
		}
	}
}
function parseTrStyle(tr,style){
	if(style==null){
		return false;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==='jc'){
			tr.style.textAlign=pv;
		}else if(pn==="trHeight"){
			tr.style.height=pv;
		}
	}
}
function parseTdStyle(td,style){
	var table=td.parentNode.parentNode;
	var tblBorders_insideH=table.getAttribute("tblBorders_insideH");
	if(tblBorders_insideH!=null){
		td.style.borderLeft=tblBorders_insideH;
		td.style.borderRight=tblBorders_insideH;
	}
	var tblBorders_insideV=table.getAttribute("tblBorders_insideV");
	if(tblBorders_insideV!=null){
		td.style.borderTop=tblBorders_insideV;
		td.style.borderBottom=tblBorders_insideV;
	}
	var tblCellMar_top=table.getAttribute("tblCellMar_top");
	if(tblCellMar_top!=null){
		td.style.paddingTop=tblCellMar_top;
	}
	var tblCellMar_bottom=table.getAttribute("tblCellMar_bottom");
	if(tblCellMar_bottom!=null){
		td.style.paddingBottom=tblCellMar_bottom;
	}
	var tblCellMar_left=table.getAttribute("tblCellMar_left");
	if(tblCellMar_left!=null){
		td.style.paddingLeft=tblCellMar_left;
	}
	var tblCellMar_right=table.getAttribute("tblCellMar_right");
	if(tblCellMar_right!=null){
		td.style.paddingRight=tblCellMar_right;
	}
	if(style==null){
		return false;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==="tcW"){
			td.style.width=pv;
			tableWidth=tableWidth+parseInt(pv);
		}else if(pn==="vAlign"){
			td.style.textAlign=pv;
		}else if(pn==="tcMar_top"){
			td.style.paddingTop=pv;
		}else if(pn==="tcMar_bottom"){
			td.style.paddingBottom=pv;
		}else if(pn==="tcMar_left"){
			td.style.paddingLeft=pv;
		}else if(pn==="tcMar_right"){
			td.style.paddingRight=pv;
		}else if(pn==="tcBorders_left"){
			td.style.borderLeft=pv;
		}else if(pn==="tcBorders_right"){
			td.style.borderRight=pv;
		}else if(pn==="tcBorders_bottom"){
			td.style.borderBottom=pv;
		}else if(pn==="tcBorders_top"){
			td.style.borderTop=pv;
		}
	}
}
// 解析文本样式
function parse_span_style(span,style){
	if(style==null){
		return false;
	}
	var attrs=style.split(";");
	for (var i = 0,len=attrs.length; i < len; i++) {
		var attr=attrs[i];
		var prop=attr.split(":");
		var pn=prop[0];
		var pv=prop[1];
		if(pn==='sz'){
			span.style.fontSize=pv;
		}else if(pn==='ascii'||pn==='eastAsia'){
			span.style.fontFamily=""+pv+"";
		}else if(pn==='b'){
			span.style.fontWeight=pv;
		}else if(pn==='i'){
			span.style.fontStyle=pv;
		}else if(pn==='color'){// 200%怎么搞
			span.style.color=pv;
		}
	}
}
// 创建xml解析器
function createXml(str){
	if(document.all){
		var xmlDom=new ActiveXObject("Microsoft.XMLDOM");
		xmlDom.async="false";
		xmlDom.loadXML(str);
		return xmlDom;
	}else{
		return new DOMParser().parseFromString(str, "text/xml");
	}
}
function getStyle(styleId){
	var domxml=  createXml(word.styles);
	var styles=domxml.getElementsByTagName("style");
	for(var i=0,len=styles.length;i<len;i++){
		var style=styles[i];
		if(styleId==null||styleId==""){
			if(getNodeAttribute(style,"type")=="paragraph"&&getNodeAttribute(style,"isDefault")=="1"){
				return style;
			}
		}else{
			var id=getNodeAttribute(style,"styleId");
			if(id!=null&&id==styleId){
				return style;
			}
		}
	}
	return null;
}
function getNodeAttribute(node,name)
 {
     if(!node || !name)
     {
         return null;
     }
     return getAttribute(name,node.attributes);
 }
 // 得到某个属性
 function getAttribute(name,list)
 {
     if(!list)
     {
         return null;
     }
     for(var i=0;i<list.length;i++)
     {
         if(list[i].nodeName.toLowerCase()==name.toLowerCase())
         {
             return list[i].value;
         }
     }
     return null;    
} 
//页签切换
word.tabsChange = function(t){
	var tabContainer=document.getElementById("tabContainer");
	var childs=tabContainer.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className){
			if(child==t){
				child.className=child.className+" active";
				document.getElementById(child.className.split(" ")[1].replace("tab","cmd")).style.display = "block";
			}else{
				child.className=child.className.replace(" active","")
				document.getElementById(child.className.split(" ")[1].replace("tab","cmd")).style.display = "none";
			}
		}
	}
}