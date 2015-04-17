word.utils = {};
/**
 * 取得下一个对象，包括段落，图片，表格等
 * @return {}
 */
word.utils.getNextDivInPage=function(p){
	var nsp = p.nextSibling;
	while (nsp != null && nsp.nodeName != "DIV") {
		nsp = nsp.nextSibling;
	}
	return nsp;
}
function getFirstLineDiv(ele) {
	if(ele==null){
		return;
	}
	var firstele = ele.childNodes[0];
	while (firstele != null && firstele.nodeName != "DIV"&& firstele.className != "line") {
		firstele = firstele.nextSibling;
	}
	return firstele;
}
//得到页中第一个段落,包括图片
function getFirstPDiv(paper){
	var pdivs=paper.getElementsByTagName("div");
	//var pdivs=paper.childNodes;
	for (var i = 0; i < pdivs.length; i++) {
		var pdiv=pdivs[i];
		if(pdiv.className=="p"||pdiv.className=="img"||pdiv.className=="table"){
			return pdiv;
		}
	}
	return null;
}
//得到页中最后一个段落,包括图片
function getLastPDiv(paper){
	var pdivs=paper.getElementsByTagName("div");
	//var pdivs=paper.childNodes;
	for (var i = pdivs.length-1; i >=0; i--) {
		var pdiv=pdivs[i];
		if(pdiv.className=="p"||pdiv.className=="img"||pdiv.className=="table"){
			return pdiv;
		}
	}
	return null;
}
//取得段落id
function getPDivId(p){
	if(p==null){
		return null;
	}
	var pid2=p.getAttribute("pid2");
	if(pid2==null){
		var pid=p.getAttribute("pid");
		if(pid==null){
			pid=p.getAttribute("lpid");
		}
	}
	return pid;
}
//取得段落pid，pid2
function getPDivId2(p){
	var pid=p.getAttribute("pid");
	if(pid==null){
		pid=p.getAttribute("pid2");
	}
	return pid;
}
/**
 * 在指定结点后面插入新的结点
 * @param {} newnode 新增的结点
 * @param {} oldnode 插入位置的结点
 */
function insertAfter(newnode,oldnode){
   var onode = oldnode.nextSibling;
   if(onode == undefined)
   {
    oldnode.parentNode.appendChild(newnode);
   }
   else
   {
    onode.parentNode.insertBefore(newnode,onode);
   }
  }
function insertBeforeInPage(page,newNode,oldNode){
	var childs=page.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className=="text"){
			child.insertBefore(newNode,oldNode)
		}
	}
}
function appendInPage(page,newNode){
	var childs=page.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className=="text"){
			child.appendChild(newNode)
		}
	}
}
function removeInPage(page,removeNode){
	var childs=page.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className=="text"){
			child.removeChild(removeNode)
		}
	}
}
function getLastLineDiv(ele) {
	if(ele==null){
		return;
	}
	var lastele = ele.childNodes[ele.childNodes.length - 1];
	while (lastele != null && lastele.nodeName != "DIV" && lastele.className != "line") {
		lastele = lastele.previousSibling;
	}
	return lastele;
}

// 取得段落中的下一行，包括一个段落中以及跨页的段落中的下一行
function getNextLline(line) {
	var nextline = line.nextSibling;
	if (nextline == null) {
		var p = line.parentNode;
		// 一页中的下一个段落
		var nextp = getNextPInPage(p);
		if (nextp == null) {// 不存在，则向下一页里面寻找
			var nextpaper = (p != null ? getPage(p) : null) != null? getPage(p).nextSibling: null;
			if (nextpaper != null && nextpaper.getAttribute("br") == null) {
				var nextfirstp = getFirstPDiv(nextpaper);
				if (nextfirstp != null) {
					var lpid = nextfirstp.getAttribute("lpid");
					if (lpid != null) {
						var pid = p.getAttribute("pid");
						var pid2 = p.getAttribute("pid2");// 新境的段落，跨页
						if (lpid == pid || lpid == pid2) {
							nextline = getFirstLineDiv(nextfirstp);
						}
					}
				}
			}
		}
	}
	return nextline;
}
//得到段落中的下一行
function getNextLineInP(line){
	var nextline = line.nextSibling;
	if(nextline==null){
		return null;
	}
	return nextline;
}
// 取得前一个段落在页中
function getPrePInPage(p) {
	var pps = p.previousSibling;
	while (pps != null && (pps.className != "p"&&pps.className!="img"&&pps.className!="table")) {
		pps = pps.previousSibling;
	}
	return pps;
}
// 取得下一个段落在页中
function getNextPInPage(p) {
	if(p==null){
		return;
	}
	var nsp = p.nextSibling;
	while (nsp != null && nsp.className != "p"&&nsp.className!="img"&&nsp.className!="table") {
		nsp = nsp.nextSibling;
	}
	return nsp;
}
// 是否是段落的第一行。
function isFirstLine(line) {
	var p = line.parentNode;
	var childs = p.childNodes;
	if (childs.length > 0) {
		var child = childs[0];
		if (child == line) {
			return true;
		}
	}
	return false;
}
// 得到前一个段落，包括跨页
function getPreP(p) {
	var psp = getPrePInPage(p);
	if (psp == null) {
		// 得到前一页
		var prepaper = getPage(p) != null ? getPage(p).previousSibling : null;
		if (prepaper != null) {
			psp = getLastPDiv(prepaper);
		}
	}
	return psp;
}
function getPage(p) {
	var page = p.parentNode;
	while (page != null && page.className != "page") {
		page = page.parentNode;
	}
	return page;
}
// 得到后一个段落，包括跨页
function getNextP(p) {
	var nsp = getNextPInPage(p)
	if (nsp == null) {// 取得下一页的
		var nextpaper = getPage(p) != null ? getPage(p).nextSibling : null;
		if (nextpaper != null) {
			nsp = getFirstPDiv(nextpaper);
		}
	}
	return nsp;
}
//取得下一行，包括下一个页面的
function getNextLine(line){
	var nextline = line.nextSibling;
	if (nextline == null) {
		var p = line.parentNode;
		// 一页中的下一个段落
		var nextp = getNextP(p);
		nextline = getFirstLineDiv(nextp);
	}
	return nextline;
}
function getPreLine(line){
	var preline = line.previousSibling;
	if (preline == null) {
		var p = line.parentNode;
		// 一页中的下一个段落
		var prep = getPreP(p);
		preline=getLastLineDiv(prep);
	}
	return preline;
}
// 得到跨页的段落
function getNextLp(p) {
	var pid = getPDivId2(p);
	var nextpaper = getPage(p) != null ? getPage(p).nextSibling : null;
	if (nextpaper != null) {
		var flp = getFirstPDiv(nextpaper);
		if (flp != null) {
			var lpid = flp.getAttribute("lpid");
			if (lpid == pid) {
				return flp;
			}
		}
	}
	return null;
}
function getNext(_dom, cn) {
	var nsp = _dom.nextSibling;
	while (nsp != null && nsp.className != cn) {
		nsp = nsp.nextSibling;
	}
	return nsp;
}
function getParentP(line) {
	var p = line.parentNode;
	while (p != null && p.className != "p") {
		p = p.parentNode;
	}
	return p;
}
word.utils.RGBToHex=function(rgb){
	if(rgb.indexOf("rgb")<0){
		return rgb;
	}
   var regexp = /^rgb\(([0-9]{0,3})\,\s([0-9]{0,3})\,\s([0-9]{0,3})\)/g; 
   var a=rgb.replace(regexp, "$1 $2 $3");
   var re = rgb.replace(regexp, "$1 $2 $3").split(" ");//利用正则表达式去掉多余的部分  
   var hexColor = "#"; var hex = ['0','1','2','3','4','5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
   for (var i = 0; i < 3; i++) {
        var r = null; var c = re[i]; 
        var hexAr = [];  
        while (c > 16) {  
              r = c % 16;  
              c = (c / 16) >> 0; 
              hexAr.push(hex[r]);  
         }
         hexAr.push(hex[c]);
         if(hexAr.length==1){
         	hexAr.push(hex[0]);
         }
       hexColor += hexAr.reverse().join(''); 
    }  
   return hexColor;  
} 
/**
 * 创建段落
 * 
 * @param {}
 *            p
 * @return {}
 */
function createPDiv(p) {
	if(p==null){
		return null;
	}
	var newDiv = document.createElement("div");
	newDiv.className = "p";
	// cloneStyle(nextp,parent);
	pid2++;
	newDiv.setAttribute("pid2", pid2);
	newDiv.setAttribute("style", p.getAttribute("style"));// 复制父类样式
	if (p.getAttribute("line") != null) {
		newDiv.setAttribute("line", p.getAttribute("line"));
	}
	return newDiv;
}
function createDefaltPDiv(page){
	var newDiv = document.createElement("div");
	newDiv.className = "p";
	pid2++;
	newDiv.setAttribute("pid2", pid2);
	newDiv.style.lineHeight="20.67px";
	newDiv.style.marginLeft=page.getAttribute("left");
	newDiv.style.marginRight=page.getAttribute("right");
	return newDiv;
}
function createTdP(width){
	var newDiv = document.createElement("div");
	newDiv.className = "p";
	pid2++;
	newDiv.setAttribute("pid2", pid2);
	newDiv.style.lineHeight="20.67px";
	newDiv.style.width=width;
	return newDiv;
}
function createLineDiv(line) {
	var newLine = document.createElement("div");
	newLine.className = "line";
	if(line!=null){
		newLine.setAttribute("style", line.getAttribute("style"));
	}else{
		newLine.style.lineHeight="20.67px";//默认行高
		var span=document.createElement("span");
		newLine.appendChild(span);
	}
	newLine.style.textIndent = "0em";
	newLine.contentEditable = true;
	return newLine;
}
function stopEvt(evt) {
	evt.cacelBubble = true;
	if (evt.preventDefault)
		evt.preventDefault();
	evt.returnValue = false;
}
//取得行的实际宽度
function getRealWidth(line) {
	var childNodes = line.childNodes;
	var totalWidth = 0;
	for (var i = 0; i < childNodes.length; i++) {
		var width = childNodes[i].scrollWidth;
		if (width > 0){
			totalWidth += width;
		}
	}
	return totalWidth;
}
function cloneStyle(te, se) {
	var style = se.getAttribute("style");
	var props = style.split(";");
	// alert(props.length);
	for (var i = 0; i < props.length; i++) {
		// alert(props[i]);
		var prop = props[i];
		if (prop != null) {
			var property = prop.split(":");
			var pn = property[0];
			var pv = property[1];
			te.style[pn] = pv;
		}
	}
	return te;
}
word.utils.isLine=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.className=="line"){
		return true;
	}
	return false;
}
word.utils.isPage=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.className=="page"){
		return true;
	}
	return false;
}
word.utils.isImage=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.className=="img"){
		return true;
	}
	return false;
}
word.utils.isParagraph=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.className=="p"){
		return true;
	}
	return false;
}
word.utils.isTable=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.className=="table"){
		return true;
	}
	return false;
}
word.utils.getFirstImg=function(_dom){
	var childs=_dom.childNodes;
	for(var i=0,len=childs.length;i<len;i++){
		var child=childs[i];
		if(child.tagName=="IMG"){
			return child;
		}
	}
	return null;
}
word.utils.getFirstTable=function(_dom){
	var childs=_dom.childNodes;
	for(var i=0,len=childs.length;i<len;i++){
		var child=childs[i];
		if(child.tagName=="TABLE"){
			return child;
		}
	}
	return null;
}
word.utils.getParentLine=function(_dom){
	var div = _dom.parentNode;
	while (div != null &&div.nodeName != "DIV" && div.className != "line") {
		div = div.parentNode;
	}
	return div;
}
word.utils.getParentDiv=function(_dom){
	if(_dom != null && (_dom.className == "p"||_dom.className=="img"||_dom.className=="table")){
		return _dom;
	}
	var div = _dom.parentNode;
	while (div != null && div.className != "p"&&div.className!="img"&&div.className!="table") {
		div = div.parentNode;
	}
	return div;
}
word.utils.isTd=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.tagName=="TD"||_dom.tagName=="td"){
		return true;
	}
	return false;
	
}
word.utils.isTr=function(_dom){
	if(_dom==null){
		return false;
	}
	if(_dom.tagName=="TR"||_dom.tagName=="tr"){
		return true;
	}
	return false;
	
}
word.utils.getParentTr=function(_dom){
	var div = _dom.parentNode;
	while (div != null && div.tagName!="TR"&&div.tagName!="tr") {
		div = div.parentNode;
	}
	return div;
}
word.utils.getParentTd=function(_dom){
	var div = _dom.parentNode;
	while (div != null && div.tagName!="TD"&&div.tagName!="td") {
		div = div.parentNode;
	}
	return div;
}
word.utils.getLastTrLastTd=function(table){
	var rl=table.rows.length;
	var lastTr=table.rows[rl-1];
	var cl=lastTr.cells.length;
	var lastTd=lastTr.cells[cl-1];
	return lastTd;
}
word.utils.getFirstTrFirstTd=function(table){
	var firstTr=table.rows[0];
	var firstTd=firstTr.cells[0];
	return firstTd;
}
word.utils.getPreTrLastTd=function(tr){
	var index=tr.rowIndex;
	var preTr=tr.parentNode.rows[index-1];
	var cl=preTr.cells.length;
	var lastTd=preTr.cells[cl-1];
	return lastTd;
}
word.utils.getNextTrFirstTd=function(tr){
	var index=tr.rowIndex;
	var nextTr=tr.parentNode.rows[index+1];
	//var cl=nextTr.cells.length;
	var lastTd=nextTr.cells[0];
	return lastTd;
}
word.utils.getMaxPage=function(){
	var max=0;
	var container=document.getElementById("content");
	var ps = container.getElementsByTagName("div");
	for (var i = 0; i < ps.length; i++) {
		var p = ps[i];
		if(word.utils.isPage(p)){
			var pgid=p.getAttribute("pgid");
			if(parseInt(pgid)>max){
				max=parseInt(pgid);
			}
		}
	}
	return max;
}
//zf
var closeDialog = function(){
	var dialog = document.getElementsByClassName("dialog")[0];
	if(dialog)  dialog.parentNode.removeChild(dialog);
}
var createNode = function(nodeType,property)
{
	var node = document.createElement(nodeType);
	for(var a in property)
	{
		
		if(a == "innerHTML") {node.innerHTML = property[a]; continue}
		else if(a == "t") continue;
		else if(a == "class"? property[a]=="container":false) { containerSelector(node,property.t);}
		else if(a == "class"? property[a]=="color":false) { colorSelector(node,property.t);}
		node.setAttribute(a,property[a]);
	}
	return node;
}

var addChild = function(parentElement,nodeType,property){
	var node = createNode(nodeType,property);
	parentElement.appendChild(node);
	return node;
}

var addMoreChild =function(parentElement,nodeType,property,array){
	for(var i=0;i<array.length;i++){
		var fontsize=array[i];
		var node = createNode(nodeType,property);
		node.innerHTML = fontsize.name;
		node.setAttribute("value", fontsize.value);
		parentElement.appendChild(node);
	}
}
//纵线
var ordinate = function(parentElement,height,left){
	var ordinateProperty = {};
	ordinateProperty.class = "ordinate";
	ordinateProperty.src = "img/line.jpg";
	ordinateProperty.style = "width:1px; height:"+height+"px";
	var ordinate = createNode("img",ordinateProperty);
	if(left) ordinate.style.marginLeft = left+"px";
	parentElement.appendChild(ordinate);
	return ordinate;
}

var findParent = function findParent(elem,findParentNodeClassName) //寻找父节点，findParentNodeClassName支持以","连接的字符创
{ 
	if(typeof(findParentNodeClassName)=="string")
	{
		while(elem)
		{
			var className = elem.className;
			if(findParentNodeClassName.indexOf(",") != -1)
			{
				var classNames = findParentNodeClassName.split(",");
				for(a in classNames) { if(className.indexOf(classNames[a]) != -1) return elem;}
				elem = elem.parentNode;
			}
			else {
				if(className.indexOf(findParentNodeClassName) != -1)  return elem;
				else elem = elem.parentNode; 
			}
		}
	}
} 

var containerSelector = function(elem,triggerObj)
{
	elem.onmouseover = function(e){
		var conse=e||window.event;
		var obj=e.relatedTarget||e.fromElement;
		if(this.contains(obj)) return;
		if(this.getElementsByClassName("ordinate")[0]) this.getElementsByClassName("ordinate")[0].style.display = "none"; //选中时线隐藏
		var backgroundDivProperty = {}
		backgroundDivProperty.style = "position:absolute; z-index:999; margin:0px 1px; opacity:0.3; top:"+(parseInt(this.offsetTop))+"px;height:"+(this.scrollHeight-2)+"px;width:"+(this.scrollWidth-4)+"px; border:1px solid #974806;background-color:#F79646";
		backgroundDivProperty.id = "backgroundDiv";
		addChild(this,"div",backgroundDivProperty);
		this.onclick = function() {
			setOperation(triggerObj,this.attributes.value.value,this.innerText)
			var dialog = findParent(this,"dialog");
			dialog.parentNode.removeChild(dialog);
		}
	}
	elem.onmouseout = function(e){
		var e=e||window.event;
		var obj=e.relatedTarget||e.toElement;
		if(this.contains(obj)) return;
		if(this.getElementsByClassName("ordinate")[0]) this.getElementsByClassName("ordinate")[0].style.display = ""; 
		var backgroundDiv = document.getElementById("backgroundDiv");
		this.removeChild(backgroundDiv);
	}
}

var colorSelector = function(elem,triggerObj)
{
	elem.onmouseover = function(e){
		var e=e||window.event;
		var obj=e.relatedTarget||e.fromElement;
		if(elem.contains(obj)) return;
		elem.style.borderColor = "#F29436";
		var insideDivProperty = {};
		insideDivProperty.style = "margin:1px; whidth:"+(parseInt(elem.style.width) - 2)+"px; height:"+(parseInt(elem.style.height) - 2)+"px; background-color:"+elem.style.backgroundColor;
		var a = addChild(elem,"div",insideDivProperty);
		elem.style.backgroundColor = "white";
		elem.onclick = function() {
			setColorValue(triggerObj,elem.attributes.value.value)
			var dialog = findParent(elem,"dialog");
			dialog.parentNode.removeChild(dialog);
		}
	}
	elem.onmouseout = function(e){
		var e=e||window.event;
		var obj=e.relatedTarget||e.toElement;
		if(elem.contains(obj))  return;
		elem.style.borderColor = "#E2E4E7";
		elem.style.backgroundColor = elem.childNodes[0].style.backgroundColor;
		elem.removeChild(elem.childNodes[0]);
	}
}

var colorModal = function(triggerObj){
	var colorModalDivProperty = {};
	colorModalDivProperty.style = "height:160px; width:180px";
	var colorModalDiv = createNode("div",colorModalDivProperty);
	var themeColorProperty = {};
	themeColorProperty.style = "width:158px; height:20px; padding-left:20px; font-weight:bold; background-color:#F0F2F5; margin:1px;";
	themeColorProperty.class = "title";
	themeColorProperty.innerHTML = "主题颜色";
	addChild(colorModalDiv,"div",themeColorProperty);
	var allThemeColorProperty = {};
	allThemeColorProperty.style = "height:100px";
	var allThemeColor = addChild(colorModalDiv,"div",allThemeColorProperty);
	
	for(var i = 0;i < word.conts.allThemeColorArray.length;i++){
		var colorProperty = {};
		for(a in word.conts.allThemeColorArray[i])
		{
			colorProperty.value = word.conts.allThemeColorArray[i][a];
			colorProperty.style = "height:12px; width:12px; border:1px solid #E2E4E7; margin-left:3.64px; float:left;background-color:"+ word.conts.allThemeColorArray[i][a];
			colorProperty.class = "color";
			colorProperty.title = a;
			colorProperty.t = triggerObj;
			var color =addChild(allThemeColor,"div",colorProperty);
		}
		if(i < 20 ) color.style.marginTop = "6px"
	}
	var normColorProperty = {};
	normColorProperty.style = "width:158px; height:20px; padding-left:20px; font-weight:bold; background-color:#F0F2F5; margin:1px;";
	normColorProperty.class = "title";
	normColorProperty.innerHTML = "标准色";
	addChild(colorModalDiv,"div",normColorProperty);
	var  allNormColorProperty = {};
	allNormColorProperty.style = "height:20px";
	var allNormColor = addChild(colorModalDiv,"div",allNormColorProperty);
	
	for(var i = 0;i < word.conts.allNormColorArray.length;i++){
		var colorProperty = {};
		for(var a in word.conts.allNormColorArray[i])
		{
			colorProperty.value = word.conts.allNormColorArray[i][a];
			colorProperty.style = "height:12px; width:12px; border:1px solid #E2E4E7; margin-left:3.64px; float:left;background-color:"+word.conts.allNormColorArray[i][a];
			colorProperty.class = "color";
			colorProperty.title = a;
			colorProperty.t = triggerObj;
		}
		addChild(allNormColor,"div",colorProperty)
	}
	return colorModalDiv;
}

//提示
var tipsDialog = function(elem,tipsArray)
{
	elem.onmouseover = function(e){
		var className = this.className;//当前div的classname
		for(var a in tipsArray)
		{
			var icon = tipsArray[a];
			for(var b in icon)
			{
				var iconClassName = b;//数组中子自定义的classname
				if(iconClassName && className.indexOf(iconClassName) != -1)
				{
					var parentNode = findParent(this,"group");
					var explainProperty = {};
					explainProperty.style = "left:"+this.offsetLeft+"px";
					explainProperty.class = "tips";
					var explainDialog = addChild(parentNode,"div",explainProperty);
					var explainTitleProperty = {};
					explainTitleProperty.innerHTML = icon[b].title;
					explainTitleProperty.style = " margin:5px; font-weight:bolder;margin-top:5px";
					addChild(explainDialog,"div",explainTitleProperty);
					var explainContentProperty = {};
					explainContentProperty.innerHTML = icon[b].content;
					explainContentProperty.style = "margin:10px 15px;line-height:20px;"
					addChild(explainDialog,"div",explainContentProperty);
					return;
				}
			}
		}
	}
	elem.onmouseout = function(e){
		var parentNode = findParent(this,"group");
		var explain = parentNode.getElementsByClassName("tips")[0];
		if(explain) parentNode.removeChild(explain);
	}
}

//操作
var setOperation = function(triggerObj,operationValue,html){
	var triggerId = triggerObj.id
	//alert(operationValue);
	if(triggerId == "fontfamily"){//
		triggerObj.innerHTML=html;
		triggerObj.setAttribute("value",operationValue);
		word.font.setSelectFont("font-family", operationValue);
		//triggerObj.click();
	}else if(triggerId == "fontsize"){
		triggerObj.innerHTML=html;
		triggerObj.setAttribute("value",operationValue);
		word.font.setSelectFont("font-size", operationValue+"px");
	}else if(triggerId=="table_select"){
		if(operationValue=="选择单元格"){
			word.table.selectCell();
		}else if(operationValue=="选择列"){
			word.table.selectTd();
		}else if(operationValue=="选择行"){
			word.table.selectTr();
		}else if(operationValue=="选择表格"){
			word.table.selectTable();
		}
	}else if(triggerId == "table_delete"){
		//alert(operationValue);
		if(operationValue == "删除单元格"){
			word.dialog.table.deleteTable.deleteCell();
		}else if(operationValue == "删除列"){
			word.table.table_delete.deleteTd();
		}else if(operationValue == "删除行"){
			word.table.table_delete.deleteTr();
		}else if(operationValue == "删除表格"){
			word.table.table_delete.deleteTable();
		}
	}else if (triggerId == "insert_table"){
		word.dialog.insert.insertTable()
	}else if(triggerId=="rowspace"){
		word.paragraph.setRowspace(operationValue);
	}
}
//操作
var setColorValue = function(triggerObj,operationValue){
	var triggerId = triggerObj.id
	if(triggerId == "fontStyle_fontColor" || triggerId == "table_property_borderAndShading_borderColor"){
		triggerObj.childNodes[0].style.backgroundColor = operationValue;
	}else if(triggerId == "fontcolorprominentselect"){
		document.getElementById("fontcolorprominent_cover").style.backgroundColor=operationValue;
		word.font.setSelectFont("background-color", operationValue);
		clearSelect();
	}else if(triggerId == "fontcolorselecet"){
		document.getElementById("fontcolor_cover").style.backgroundColor=operationValue;
		word.font.setSelectFont("color", operationValue);
	}else if(triggerId == "table_property_borderAndShading_borderColor"){
		var borderColorValue = document.getElementById("table_property_borderAndShading_borderColorValue");
		borderColorValue.style.backgroundColor = operationValue;
	}
}