var isTrb=true;
//word.select.mergerTable=false;
function addPatch(selectfonts) {
	if (selectfonts.length >= 2) {
		clearSelect();
		var font = selectfonts[0];
		var fontend= selectfonts[selectfonts.length-1];
		var tdstart=word.utils.getParentTd(font);
		var tdend=word.utils.getParentTd(fontend);
		var line = word.utils.getParentLine(font);
		if(tdstart!=null&&tdend!=null&&tdstart!=tdend){
			setMinAndMaxIndexInFonts(selectfonts);
			startsel.target=tdstart;
			doAddPatchInTable(tdstart,tdend);
		}else{
			if(tdstart==tdend){
				isTrb=false;
			}else{
				isTrb=true;	
			}
			doAddPatch(line, true);
		}
	}

}
function setMinAndMaxIndexInFonts(selectfonts){
	var minIndex=0,maxIndex=0;
	for(var i=0,len=selectfonts.length;i<len;i++){
		var font=selectfonts[i];
		var td=word.utils.getParentTd(font);
		var tdIndex=td.getAttribute("tdIndex");
		if(i==0){
			minIndex=maxIndex=parseInt(tdIndex);
		}else{
			if(minIndex>parseInt(tdIndex)){
				minIndex=parseInt(tdIndex);
			}
			if(maxIndex<parseInt(tdIndex)){
				maxIndex=parseInt(tdIndex);
			}
		}
	}
	word.select.minTdIndex=minIndex;
	word.select.maxTdIndex=maxIndex;
}
function getSignCount(selects) {
	var signcount = 0;
	for (var i = 0; i < selects.length; i++) {
		if (selects[i].className == "font"){
			signcount++;
		}
	}
	return signcount;
}
var i=0;
function doAddPatch(line, isFirst) {
	if(line==null){
		return;
	}
	////out("i"+(i++)+document.getElementById("console").innerText+line.innerText.substring(0,3)+"="+isFirst+";");
	var selects = getSelectFont(line), hasnext = true;
	if (isFirst) {
		if (getSignCount(selects) == 2) {
			hasnext = false;
			var rect = selects[0].getBoundingClientRect();
			var rect1 = selects[selects.length - 1].getBoundingClientRect();
			setInOneLine(line,rect,rect1);
			getStartSelCursor(line,selects[0]);
			getEndSelCursor(line,selects[selects.length - 1]);
		} else if (getSignCount(selects) == 1) {
			var starttr=word.utils.getParentTr(line);
			if(starttr!=null&&isTrb){
				setTrSelect(starttr);
				line=starttr;
			}else{
				var rect = selects[0].getBoundingClientRect();
				setStartLineSelect(line,rect);
			}
			getStartSelCursor(line,selects[0]);
		}
	} else {
		if (getSignCount(selects) == 0) {
			if(word.utils.isTr(line)){
				setTrSelect(line);
			}else{
				setLine(line);
			}
		} else if (getSignCount(selects) == 1) {
			hasnext = false;
			var isstartDiv=word.utils.getParentDiv(line);
			if(word.utils.isTable(isstartDiv)){
				setTrSelect(line);
			}else if(word.utils.isParagraph(isstartDiv)){
				var rect = selects[selects.length - 1].getBoundingClientRect();
				setEndLineSelect(line,rect);
			}
			getEndSelCursor(line,selects[selects.length - 1]);
		}
	}
	if (hasnext) {
		var nextline = getPatchNextLine(line)
		//if(nextline!=null){
			doAddPatch(nextline, false)
		//}
	} else {
		return;
	}
}
function getSelectFont(line){
	var selects=[];
	var fonts=line.getElementsByTagName("font");
	for(var j=0;j<fonts.length;j++){
		var font=fonts.item(j);
		if(font!=null){
			var curStyle = style2(font);
			if (curStyle.backgroundColor == "rgb(255, 255, 255)") {
				selects.push(font);
			}
		}
	}
	return selects;
}
function setInOneLine(line,rects,recte){
	var container = document.getElementById("content");
	var containertop = container.getBoundingClientRect().top;
	var contentscroltop = container.scrollTop;
	var div=document.createElement("div")
	div.className = "selectsign";
	var p=word.utils.getParentDiv(line),height=0;
	if(getFirstLineDiv(p)==line){
		var pt=p.style.paddingTop;
		if(pt!=""){
			height+=parseFloat(pt.substring(0,pt.length-2));
		}
	}
	div.style.top = (line.getBoundingClientRect().top - containertop + contentscroltop-height)+ "px";
	div.style.left = rects.left + "px";
	if(getLastLineDiv(p)==line){
		var pb=p.style.paddingBottom;
		if(pb!=""){
			height+=parseFloat(pb.substring(0,pb.length-2));
		}
	}
	div.style.height = line.offsetHeight+height  + "px";
	var divwidth = recte.right - rects.left
	div.style.width = divwidth + "px";
	container.appendChild(div);
}
function setLine(line){
	var container = document.getElementById("content");
	var containertop = container.getBoundingClientRect().top;
	var contentscroltop = container.scrollTop;
	var div=document.createElement("div")
	div.className = "selectsign";
	var rect = line.getBoundingClientRect();
	var p=word.utils.getParentDiv(line),height=0;
	if(getFirstLineDiv(p)==line){
		var pt=p.style.paddingTop;
		if(pt!=""){
			height+=parseFloat(pt.substring(0,pt.length-2));
		}
	}
	div.style.top = (rect.top - containertop + contentscroltop-height) + "px";
	div.style.left = rect.left + "px";
	if(getLastLineDiv(p)==line){
		var pb=p.style.paddingBottom;
		if(pb!=""){
			height+=parseFloat(pb.substring(0,pb.length-2));
		}
	}
	div.style.height = rect.height+height + "px";
	div.style.width = rect.width + "px";
	//div.style.width = getRealWidth(line);
	container.appendChild(div);
}
function setStartLineSelect(line,rect){
	var container = document.getElementById("content");
	var containertop = container.getBoundingClientRect().top;
	var contentscroltop = container.scrollTop;
	var div=document.createElement("div")
	div.className = "selectsign";
	var height=0,p=word.utils.getParentDiv(line);
	if(getFirstLineDiv(p)==line){
		var pt=p.style.paddingTop;
		if(pt!=""){
			height+=parseFloat(pt.substring(0,pt.length-2));
		}
	}
	div.style.top = (line.getBoundingClientRect().top - containertop + contentscroltop-height)+ "px";
	div.style.left = rect.left + "px";
	if(getLastLineDiv(p)==line){
		var pb=p.style.paddingBottom;
		if(pb!=""){
			height+=parseFloat(pb.substring(0,pb.length-2));
		}
	}
	div.style.height = line.offsetHeight+height + "px";
	var divwidth = line.getBoundingClientRect().right - rect.left
	div.style.width = divwidth + "px";
	container.appendChild(div);
}
function setEndLineSelect(line,rect){
	var container = document.getElementById("content");
	var containertop = container.getBoundingClientRect().top;
	var contentscroltop = container.scrollTop;
	var div=document.createElement("div")
	div.className = "selectsign";
	var height=0,p=word.utils.getParentDiv(line);
	if(getFirstLineDiv(p)==line){
		var pt=p.style.paddingTop;
		if(pt!=""){
			height+=parseFloat(pt.substring(0,pt.length-2));
		}
	}
	div.style.top = (line.getBoundingClientRect().top - containertop + contentscroltop-height)+ "px";
	div.style.left =line.getBoundingClientRect().left + "px";
	if(getLastLineDiv(p)==line){
		var pb=p.style.paddingBottom;
		if(pb!=""){
			height+=parseFloat(pb.substring(0,pb.length-2));
		}
	}
	div.style.height = line.offsetHeight+height + "px";
	var divwidth = rect.right -line.getBoundingClientRect().left
	div.style.width = divwidth + "px";
	container.appendChild(div);
}
function setTrSelect(tr){
	var tds=tr.childNodes;
	for(var i=0;i<tds.length;i++){
		var td=tds[i];
		setTdSelect(td);
	}
}
function setTdSelect(td){
	if(td==null){
		return false;
	}
	var container = document.getElementById("content");
	var containertop = container.getBoundingClientRect().top;
	var contentscroltop = container.scrollTop;
	var div=document.createElement("div")
	div.className = "selectsign";
	var rect = td.getBoundingClientRect();
	div.style.top = (rect.top - containertop + contentscroltop) + "px";
	div.style.left = rect.left + "px";
	div.style.height = rect.height + "px";
	div.style.width = rect.width + "px";
	container.appendChild(div);
}
function getPatchNextLine(line) {
//	var isstarttr=word.utils.getParentTr(line);
//	if(isstarttr!=null){
//		line=isstarttr;
//	}
	var nextline = line.nextSibling;
	if (nextline == null) {
		var nextDiv = getNextPInPage(word.utils.getParentDiv(line));
		//alert(nexp.innerHTML);
		if (nextDiv == null) {
			var nextpaper = getPage(line.parentNode.parentNode).nextSibling;
			if(nextpaper!=null){
				var firstp = getFirstPDiv(nextpaper);
				if(word.utils.isParagraph(firstp)){
					nextline = getFirstLineDiv(firstp);
				}else if(word.utils.isImage(firstp)){
					nextline=firstp.childNodes[0];
				}else if(word.utils.isTable(firstp)){
					nextline=firstp.childNodes[0].childNodes[0];//tr
				}
			}
		} else {
			if(word.utils.isParagraph(nextDiv)){
				nextline = getFirstLineDiv(nextDiv);
			}else if(word.utils.isImage(nextDiv)){
				nextline=nextDiv.childNodes[0];
			}else if(word.utils.isTable(nextDiv)){
				nextline=nextDiv.childNodes[0].childNodes[0];//tr
			}
		}
	}
	return nextline;
}

function doAddPatchInTable(tdstart,tdend){
	setTdSelect(tdstart);
	if(tdstart==tdend){
		endsel.target=tdend;
		return;
	}
	var tdstartIndex=parseInt(tdstart.getAttribute("tdIndex"));
	var tdendIndex=parseInt(tdend.getAttribute("tdIndex"));
	if(tdstartIndex<tdendIndex){
		var ntd=tdstart.nextSibling;
		if(ntd==null){
			doAddPatchInTable(getNextTrTd(tdstart,tdendIndex),tdend);
		}else{
			doAddPatchInTable(ntd,tdend);
		}
	}else{
		doAddPatchInTable(getNextTrTd(tdstart,tdendIndex),tdend);
	}
}
//取得下一行的td,
function getNextTrTd(tdstart,tdendIndex){
	var nextTr=tdstart.parentNode.nextSibling;
	var nextTrtd=getTdByIndex(nextTr,tdendIndex);
	while(nextTrtd==null){
		 nextTr=nextTr.nextSibling;
		 nextTrtd=getTdByIndex(nextTr,tdendIndex);
	}
	return nextTrtd;
}
function getMinIndex(startIndex,endIndex){
	if(parseInt(startIndex)>=parseInt(endIndex)){
		return parseInt(endIndex);
	}else{
		return parseInt(startIndex);
	}
}
//返回第一个满足下标范围的td
function getTdByIndex(tr,endIndex){
	var tds=tr.childNodes;
	for(var i=0;i<tds.length;i++){
		var td=tds[i];
		//var tdIndex=parseInt(td.getAttribute("tdIndex"))-td.colSpan+1;
		var tdIndex=parseInt(td.getAttribute("tdIndex"));
		var tdAllIndex=word.table.getTdAllIndex(td);
		//if(word.select.minTdIndex<=tdIndex&&tdIndex<=endIndex){
		if(word.select.minTdIndex<=tdIndex&&(tdAllIndex.indexOf(endIndex)>=0||tdIndex<=endIndex)){
			return td;
		}
	}
	return null;
}
function updatePBackgroundDiv(){
	var start=startsel.target;
	var end=endsel.target
	if(start==end){
		var oRs = document.body.createTextRange();
		oRs.moveToElementText(start);
		oRs.moveStart('character',startsel.now);
		var rects=oRs.getBoundingClientRect();
		var oRe = document.body.createTextRange();
		oRe.moveToElementText(end);
		oRe.move("character", endsel.now);//move
		var recte=oRe.getBoundingClientRect();
		setInOneLine(start,rects,recte);
	}else{
		doUpdatePBackgroundDiv(start);
	}
}
function doUpdatePBackgroundDiv(line){
	if(line==startsel.target){
		if(word.utils.isTr(line)){
			setTrSelect(line);
		}else{
			var oR = document.body.createTextRange();
			oR.moveToElementText(line);
			oR.moveStart('character',startsel.now);
			var rect=oR.getBoundingClientRect();
			setStartLineSelect(line,rect);
		}
	}else if(line==endsel.target){
		if(word.utils.isTr(line)){
			setTrSelect(line);
		}else{
			var oR = document.body.createTextRange();
			oR.moveToElementText(line);
			//oR.moveStart("character", endsel.now);//moveEnd -(line.innerText.length-endsel.now)
			oR.move("character", endsel.now);//moveEnd没有起到效果
			var rect=oR.getBoundingClientRect();
			setEndLineSelect(line,rect);
		}
		return ;
	}else{
		if(word.utils.isTr(line)){
			setTrSelect(line);
		}else{
			setLine(line);
		}
	}
	var nextline = getPatchNextLine(line)
	doUpdatePBackgroundDiv(nextline);
}
//取得开始选中所在行的位置
function getStartSelCursor(line,start){
	var oR = document.body.createTextRange();
	oR.moveToElementText(start);
	var eoR= document.body.createTextRange();
	eoR.moveToElementText(line);
	//if(oR.inRange(eoR)){
		//startCursor.inRange=true;
		eoR.setEndPoint("EndToStart",oR);
	//}
	//startsel.text=oR.text;
	startsel.target=line;
	startsel.now=eoR.text.length;
}
function getEndSelCursor(line,end){
	var oR = document.body.createTextRange();
	oR.moveToElementText(end);
	var eoR= document.body.createTextRange();
	eoR.moveToElementText(line);
	//if(oR.inRange(eoR)){
		//startCursor.inRange=true;
		eoR.setEndPoint("EndToEnd",oR);
	//}
	//endsel.text=oR.text;
	endsel.target=line;
	endsel.now=eoR.text.length;
}