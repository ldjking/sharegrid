// JavaScript Document
function doOutPage(paper, dir) {
	var nextpaper = paper.nextSibling;
	// while (nextpaper != null && nextpaper.nodeName != "DIV") {
	// nextpaper = nextpaper.nextSibling;
	// }
	if (dir == "toNext") {
		if (nextpaper == null) {
			nextpaper=word.insert.insertPage(paper,false);
		}
		// var paperheight=parseInt(page.h.substring(0,page.h.length-2))-parseInt(page.top.substring(0,page.top.length-2))-parseInt(page.bottom.substring((0,page.bottom.length-2)));
		while (getTotalPaperHeight(paper) > paper.clientHeight) {
			// var pageDiv=false;
			// 取得页的最后一个段落
			var endp = getLastPDiv(paper);
			if (word.utils.isImage(endp)) {
				imageToNextPage(paper,nextpaper,endp);
			} else if (word.utils.isParagraph(endp)) {
				paragraphToNextPage(paper,nextpaper,endp);
			}

		}
		// toNextPageListener(nextpaper);
	} else if (dir == "toThis") {
		if (nextpaper != null) {
			var startp = getFirstPDiv(nextpaper);
			if(word.utils.isImage(startp)){
				startline = (startp != null ? word.utils.getFirstImg(startp) : null);
			}else if(word.utils.isParagraph(startp)){
				startline = (startp != null ? getFirstLineDiv(startp) : null);
			}
			while (startline != null&& getTotalPaperHeight(paper) + startline.clientHeight < paper.clientHeight) {
				if (word.utils.isImage(startp)) {
					imageToPrePage(paper, nextpaper, startp);
				} else if (word.utils.isParagraph(startp)) {
					paragraphToPrePage(paper, startp);
				}
				startp = getFirstPDiv(nextpaper);
				if(word.utils.isImage(startp)){
					startline = (startp != null ? word.utils.getFirstImg(startp) : null);
				}else if(word.utils.isParagraph(startp)){
					startline = (startp != null ? getFirstLineDiv(startp) : null);
				}
			}
			if(startp==null){
				nextpaper.parentNode.removeChild(nextpaper);
				changarg.removearg.push(nextpaper);
			}
			var endp = getLastPDiv(paper)
			var firstline = getFirstLineDiv(endp)
			fixLine(firstline);
		}
	}
	if(nextpaper!=null){
		outPageListener(nextpaper);
	}
}
function paragraphToNextPage(paper, nextpaper, endp) {
	var endpid = getPDivId2(endp);
	var endline = (endp != null ? getLastLineDiv(endp) : null);
	// 创建段落
	var p = createPDiv(endp);
	p.setAttribute("lpid", endpid);
	var line = createLineDiv(endline);
	p.appendChild(line);
	// 取得下一页的第一个段落
	var startp = getFirstPDiv(nextpaper);
	var startpid = getPDivId(startp);
	if (startp != null) {
		if (startpid == endpid) {// 段落跨页
			p.style.textIndent = "0em";
		} else {
			pid2++;
			p.setAttribute("pid2", pid2);
			insertBeforeInPage(nextpaper, p, startp);
			startp = getFirstPDiv(nextpaper)
		}
	} else {
		appendInPage(nextpaper, p);
		startp = getFirstPDiv(nextpaper)
	}
	var startline = (startp != null ? getFirstLineDiv(startp) : null);
	startline.innerHTML = endline.innerHTML + startline.innerHTML;
	var startpid2 = startp.getAttribute("pid2");
	if (startpid2 == null) {
		pushToUpdate(startp);// 加入更新数组
	}
	if (endline.previousSibling == null) {
		// startp.setAttribute("pid",endp.getAttribute("pid"));
		// startp.removeAttribute("lpid");
		startp.style.textIndent = endp.style.textIndent;
		// startline.style.textIndent=endp.style.textIndent;
	}
	//moveCursorPosition(startline, 0)
	endp.removeChild(endline);
	if (endline != null) {
		endline = getLastLineDiv(endp);
	}
	if (endline == null) {
		removeInPage(paper, endp);
		changarg.removearg.push(endp);
	} else {
		pushToUpdate(endp);// 加入更新数组
	}
	fixLine(startline)
}
function paragraphToPrePage(paper, startp) {
	var lpid = startp.getAttribute("lpid");
	var endp = getLastPDiv(paper);
	var endpid2 = getPDivId2(endp);
	if (lpid != null && lpid == endpid2) {
		// var endline=(endp!=null)?getLastLineDiv(endp):null;
		endp.appendChild(startline);// 等于移除了startp的startline
		startline = (startp != null ? getFirstLineDiv(startp) : null);
		if (startline != null) {
			pushToUpdate(startp);// 加入更新数组
		} else {
			startp.parentNode.removeChild(startp);
			changarg.removearg.push(startp);
		}
	} else {
		// 创建新段落
		var p = createPDiv(startp);
		var line = createLineDiv(startline);
		line.innerHTML = startline.innerHTML;
		p.appendChild(line);
		insertAfter(p, endp);
		// 移除
		startp.removeChild(startline);
		startline = (startp != null ? getFirstLineDiv(startp) : null);
		if (startline != null) {// 这里是下面的段落要跨页的情况，为了配合上面的lpid要这样处理，先把原startp加入删除数组中，再把原startp变成新增的跨页段落
			var pid = startp.getAttribute("pid");
			if (pid != null) {
				var removep = startp.cloneNode(false);
				changarg.removearg.push(removep);// 删除结点时，必须要使该结点成为一个独立的结点
				startp.removeAttribute("pid");
				startp.setAttribute("lpid", pid2);
				pid2++;
				startp.setAttribute("pid2", pid2);
			} else {// 如果本来就是新增的段落，则不用再加入删除数组，也不用再编号
				var startpid2 = startp.getAttribute("pid2");
				startp.setAttribute("lpid", startpid2);
				if (startpid2 == null) {
					pid2++;
					startp.setAttribute("pid2", pid2);
				}
			}
		} else {// 移除空的段落，加入删除数组中
			startp.parentNode.removeChild(startp);
			changarg.removearg.push(startp);
		}
	}
}
function imageToNextPage(paper, nextpaper, endp) {
	//var image=word.utils.getFirstImg(endp);
	var newimg=endp.cloneNode(true);
	removeInPage(paper, endp);
	if(endp.getAttribute("pid2") == null){
		changarg.removearg.push(endp);// 删除结点时，必须要使该结点成为一个独立的结点
	}
	pid2++;
	newimg.setAttribute("pid2", pid2);
	var firstp=getFirstPDiv(nextpaper);
	if(firstp!=null){
		insertBeforeInPage(nextpaper,newimg,firstp);
	}else{
		appendInPage(nextpaper,newimg);
	}
}
/**
 * 图片上移页
 * 
 * @param {}
 *            paper
 * @param {}
 *            nextpaper
 * @param {}
 *            startp
 */
function imageToPrePage(paper, nextpaper, startp) {
	// 图片上移
	var newimg = startp.cloneNode(true);
	removeInPage(nextpaper, startp);
	if (startp.getAttribute("pid2") == null) {
		changarg.removearg.push(startp);// 删除结点时，必须要使该结点成为一个独立的结点
	}
	pid2++;
	newimg.setAttribute("pid2", pid2);
	appendInPage(paper, newimg);
	startp = getFirstPDiv(nextpaper);
	if(word.utils.isImage(startp)){
		startline = (startp != null ? word.utils.getFirstImg(startp) : null);
	}else if(word.utils.isParagraph(startp)){
		startline = (startp != null ? getFirstLineDiv(startp) : null);
	}
}