//分隔行，或者段落。isp=true段落，isp=false行
function splitP(line, p, isp) {
	if(line==null||line.innerText.length<=0){
		return;
	}
	var nhtml = "", phtml = "";
	var oR = document.body.createTextRange();
	//line.innerHTML += "<A>$</A>"
	oR.moveToElementText(line);
	var scount = p;
	oR.moveStart("character", scount);
	// nhtml=oR.htmlText.replace("<A>$</A>","");
	//nhtml = oR.htmlText.replace("<A>$</A>", "");
	//nhtml = nhtml.replace("<a>$</a>", "");
	nhtml=oR.htmlText;
	//var innerline = line.innerHTML.replace("<A>$</A>", "")
	//line.innerHTML = innerline.replace("<a>$</a>", "")
	var eoR = document.body.createTextRange();
	eoR.moveToElementText(line);
	var ccount = p - line.innerText.length;
	eoR.moveEnd("character", ccount);
	phtml = eoR.htmlText;
	//这里的nhtml可能没有span,及样式,则要加上该行中的第一个span的样式
	nhtml=setSpanInText(nhtml,line);
	if (isp) {
		var style = line.getAttribute("style");
		phtml = "<div class=\"line\" style=\"" + style
				+ "\"  contentEditable=\"true\">" + phtml + "</div>";
		nhtml = "<div class=\"line\" style=\"" + style
				+ "\" contentEditable=\"true\">" + nhtml
				+ "</div>";
		var pnode = line.previousSibling;
		while (pnode != null) {
			phtml = pnode.outerHTML + phtml;
			pnode = pnode.previousSibling;
		}
		var nnode = line.nextSibling;
		while (nnode != null) {
			nhtml = nhtml + nnode.outerHTML;
			nnode = nnode.nextSibling;
		}
	}
	var r = {}
	r.phtml = phtml;
	r.nhtml = nhtml;
	return r
}
//根据开始结束位置取得内容
function splitLine(target,start,end){
	var oR = document.body.createTextRange();
	oR.moveToElementText(target);
	oR.moveStart("character", start);
	oR.moveEnd("character",end-target.innerText.length);
	var nhtml=oR.htmlText;
	//这里的nhtml可能没有span,及样式,则要加上该行中的第一个span的样式
	nhtml=setSpanInText(nhtml,target);
	return nhtml;
}
function setSpanInText(nhtml,line){
	if(nhtml.indexOf("</SPAN>")<0){
		var s="<span"
		var span="";
		var childs=line.childNodes;
		for(var i=0;i<childs.length;i++){
			span=childs[i];
			if(span.tagName=="span"){
				break;
			}
		}
		var spanStyle=null;
		if(span.attributes!=null){
			spanStyle=span.getAttribute("style");
		}
		if(spanStyle!=null){
			s+=" style=\""+spanStyle+"\"";
		}
		s+=">"
		nhtml=s+nhtml+"</span>";
	}
	return nhtml;
}
//修订行的内容
function fixLine(line) {
	//word.table.clearMySpace(line);
	//initphtml1 = line.parentNode.innerHTML;
	//initpid1 = getPDivId(line.parentNode);
	//修订段落第一行的缩进
	line.parentNode.style.height="";
	var ind=line.parentNode.style.textIndent;
	var isFirst=isFirstLine(line);
	if(isFirst){
		var lpid=line.parentNode.getAttribute("lpid");
		if(ind!=""&&lpid==null){//如果是跨页的段落，则不用处理
			line.style.marginLeft=ind;//为了算宽度，不用textIndent;
			line.style.textIndent="0em";
		}
	}else{
		line.style.marginLeft="";//为了算宽度，不用textIndent;
		line.style.textIndent="0em";
	}
	var totalWidth = getRealWidth(line);
	if (totalWidth > line.clientWidth) {//超出，则逐个减少字符
		line.scrollLeft = 0;
		var str = line.innerText;
		var htmlstr = line.innerHTML;
		// var orgline=cloneline(line);
		var strLeft = "";
		for (var i = str.length - 1; i > 1; i--) {
			line.innerHTML = htmlstr;//还原，重新开始
			var ps1 = splitP(line, i, false);
			line.innerHTML = ps1.phtml;
			strLeft = ps1.nhtml
			var lineTotalWidth = getRealWidth(line);
			if (lineTotalWidth <= line.clientWidth) {
				break;
			}
		}
		// closeclone()
		var p = line.parentNode;
		var nextLine = line.nextSibling;
		if (nextLine != null) {//存在下一行，则修订下一行
			nextLine.innerHTML = strLeft + nextLine.innerHTML;
			fixLine(nextLine);
			// p.insertBefore(newLine,nextLine);
		} else {//创建新行
			if (strLeft.length > 0) {
				var newLine= createLineDiv(line);
				newLine.innerHTML = strLeft;
				p.appendChild(newLine);
				// newLine.focus();
				fixLine(newLine);
			}
		}
	} else {
		var totalWidth = getRealWidth(line);
		if (totalWidth < line.clientWidth) {/* 从属于一个段落中提取下一行内容 */
			var nextLine = getNextLline(line);
			// alert(nextLine)
			var oriStr = line.innerHTML;
			if (nextLine != null&&nextLine.innerText!="") {
				var str = nextLine.innerText;
				var str1 = "";
				var strLeft = "";
				for (var i = 0; i <= str.length; i++) {
					var ps = splitP(nextLine, i, false);
					var ps1 = splitP(nextLine, i + 1, false);
					var temp_str2 = ps1.phtml;
					var temp_str1 = ps.phtml;
					strLeft = ps.nhtml;
					line.innerHTML = oriStr + temp_str2;
					var lineTotalWidth = getRealWidth(line);
					if (lineTotalWidth > line.clientWidth) {
						line.innerHTML = oriStr + temp_str1;
						break;
					}
				}
				nextLine.innerHTML = strLeft;
				fixLine(nextLine);
				clearNullLine(nextLine)
			}
		}
	}
	//getUpdateArg(line.parentNode)
}
function fixParagraph(p){
	if(p==null){
		return;
	}
	var line=getFirstLineDiv(p);
//	var clientWidth = line.clientWidth;
//	var scrollWidth = line.scrollWidth;
//	if (scrollWidth > clientWidth) {
		fixLine(line);
//	}
	
}
function fixNext(p){
	if(p==null){
		return;
	}
	if(word.utils.isLine(p)){
		fixLine(p);
	}else if(word.utils.isParagraph(p)){
		fixParagraph(p);
	}else if(word.utils.isTr(p)||word.utils.isTd(p)||word.utils.isTable(p)){
		var divs=p.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			var div=divs[i];
			if(word.utils.isParagraph(div)){
				fixParagraph(div);
			}
		}
	}
}