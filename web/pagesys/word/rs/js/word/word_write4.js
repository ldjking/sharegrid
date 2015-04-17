function isPStart(target) {
	return target.previousSibling == null ? true : false;
}
function isLineStart(target) {
	var pos = getCursorPosition(target).now;
	return pos == 0 ? true : false;
}
function isPend(target) {
	return target.nextSibling == null ? true : false;
}
function isLineEnd(target) {
	var pos = getCursorPosition(target).now;
	return pos == target.innerText.length ? true : false;
}
function getPreviousSiblingP(p){
	var pps=p.previousSibling;
	while(pps!=null&&pps.className!="p"){
		pps=pps.previousSibling;
	}
	return pps;
}

function addNextP(parent,ps){
	var nextp = createPDiv(parent);
	nextp.innerHTML = ps.nhtml;
	var nsp = getNextPInPage(parent);
	if (nsp != null) {// 是否在后面追加。还是中间插入
		parent.parentNode.insertBefore(nextp, nsp);
	} else {
		insertAfter(nextp, parent);
		// 如果是最后一段，再分段，则再要取得跨页的段
		var lnsp = getNextLp(parent);
		if (lnsp != null) {// 如果存在跨页的段，则要把此段变成新增的段
			var lnspid = lnsp.getAttribute("lpid");
			if (lnspid != null) {
				var removep = lnsp.cloneNode(false);
				changarg.removearg.push(removep);
				lnsp.setAttribute("lpid", nextp.getAttribute("pid2"));
			}
			var lnspid2 = lnsp.getAttribute("pid2");
			if (lnspid2 == null) {
				pid2++;
				lnsp.setAttribute("pid2", pid2);
			}
		}
	}
	return nextp;
}
//得到前一个段落，以及跨页标志
function getDiVByDir(div) {
	var r = {}
	var prediv =getPrePInPage(div);
	if (prediv == null) {
		//得到前一页
		var prepaper = getPage(div) != null?  getPage(div).previousSibling: null;
		if(prepaper!=null){
			var psp=getLastPDiv(prepaper);
			if(psp!=null){
				r.prediv=psp;
				r.isreal=false
			}else{
				r.prediv=null;
			}
		}else{
			r.prediv=null;
		}
	} else {
		r.prediv = prediv;
		r.isreal = true
	}
	return r;
}
// 回退合并段落
function backSpaceTop(target) {
	var p = target.parentNode;
	if(p.parentNode.tagName=="TD"){
		return ;
	}
	var divdir = getDiVByDir(p);//取得前一个段落，及是否是跨页的
	var prep = divdir.prediv;
	var prepaper =  getPage(prep);
	var dir = divdir.isreal
	if(dir==false){//如果是前一页的最后一个段落
		var prepid=prep.getAttribute("pid");
		var plpid=p.getAttribute("lpid");
		if(plpid==prepid){//如果是跨页的段落，则删除最后一个字符字符
			//backSpaceToLine(target);
			var lastline = getLastLineDiv(prep);
			var preps = splitP(lastline, lastline.innerText.length-1, false);//分隔上一个段落的最后一行。
			lastline.innerHTML = preps.phtml;
		}
	}
	//如果p存在跨页的段落也要加起来一起考虑=========且内容是溢出换页
	var orgstr = p.innerHTML;
	var nextpaper =  getPage(p) != null? getPage(p).nextSibling: null;
	var lp=getNextLp(p);
	if(lp!=null){
		orgstr+=lp.innerHTML;
	}
	p.parentNode.removeChild(p);//移除要到最后，不然会找不到。p.parentNode
	changarg.removearg.push(p);
	if(lp!=null){
		lp.parentNode.removeChild(lp);
		changarg.removearg.push(lp);
	}
	prep.innerHTML = prep.innerHTML + orgstr;
	var firstline = getFirstLineDiv(prep)
	fixLine(firstline);
	if (prep.childNodes.length > 0){
		clearNullLine(firstline);
	}
	moveCursorPosition(firstline, firstline.innerText.length)
//	if (prepaper != null && dir == false) {
//		outPageListener(prepaper)
//		var endp = getLastPDiv(prepaper)
//		var endline = getLastLineDiv(endp)
//		moveCursorPosition(endline, endline.innerText.length)
//	}
	return firstline;

}
// 回退合并段落中的行
function backSpaceToLine(target) {
	var preline = target.previousSibling;
	if (preline != null) {
		var ps = splitP(target, 0, false);
		var leftHTML = ps.phtml;
		var thisHTML = ps.nhtml;
		var preps = splitP(preline, preline.innerText.length - 1, false);
		preline.innerHTML = preps.phtml + leftHTML;
		var prelinewidth = getRealWidth(preline);
		if (prelinewidth <= preline.clientWidth) {
			preline.innerHTML = preps.phtml + leftHTML;
			target.innerHTML = thisHTML;
		} else {
			preline.innerHTML = preps.phtml
		}
		moveCursorPosition(preline, preline.innerText.length - 1)
		fixLine(preline);
		clearNullLine(preline)
	}
	return preline;
}
//移除空行，如果没有行，则移除段落
function clearNullLine(target) {
	var p = target.parentNode;
	if(word.utils.getParentTd(p)==null){//表格中的段落不清除
		var lines=p.childNodes;
		if(lines!=null&&lines.length>0){
			var line = lines[0]
			while (line != null) {
				var nextline = line.nextSibling;
				if (line.innerText == "") {//不能innerHTML,可能是空的span，
					line.parentNode.removeChild(line)
				}
				lines=p.childNodes;
				if(lines==null||lines.length<1){//移除空的段落
					p.parentNode.removeChild(p);
					changarg.removearg.push(p);
				}
				line = nextline;
			}
		}
	}
}
