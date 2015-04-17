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
			// ȡ��ҳ�����һ������
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
	// ��������
	var p = createPDiv(endp);
	p.setAttribute("lpid", endpid);
	var line = createLineDiv(endline);
	p.appendChild(line);
	// ȡ����һҳ�ĵ�һ������
	var startp = getFirstPDiv(nextpaper);
	var startpid = getPDivId(startp);
	if (startp != null) {
		if (startpid == endpid) {// �����ҳ
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
		pushToUpdate(startp);// �����������
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
		pushToUpdate(endp);// �����������
	}
	fixLine(startline)
}
function paragraphToPrePage(paper, startp) {
	var lpid = startp.getAttribute("lpid");
	var endp = getLastPDiv(paper);
	var endpid2 = getPDivId2(endp);
	if (lpid != null && lpid == endpid2) {
		// var endline=(endp!=null)?getLastLineDiv(endp):null;
		endp.appendChild(startline);// �����Ƴ���startp��startline
		startline = (startp != null ? getFirstLineDiv(startp) : null);
		if (startline != null) {
			pushToUpdate(startp);// �����������
		} else {
			startp.parentNode.removeChild(startp);
			changarg.removearg.push(startp);
		}
	} else {
		// �����¶���
		var p = createPDiv(startp);
		var line = createLineDiv(startline);
		line.innerHTML = startline.innerHTML;
		p.appendChild(line);
		insertAfter(p, endp);
		// �Ƴ�
		startp.removeChild(startline);
		startline = (startp != null ? getFirstLineDiv(startp) : null);
		if (startline != null) {// ����������Ķ���Ҫ��ҳ�������Ϊ����������lpidҪ���������Ȱ�ԭstartp����ɾ�������У��ٰ�ԭstartp��������Ŀ�ҳ����
			var pid = startp.getAttribute("pid");
			if (pid != null) {
				var removep = startp.cloneNode(false);
				changarg.removearg.push(removep);// ɾ�����ʱ������Ҫʹ�ý���Ϊһ�������Ľ��
				startp.removeAttribute("pid");
				startp.setAttribute("lpid", pid2);
				pid2++;
				startp.setAttribute("pid2", pid2);
			} else {// ����������������Ķ��䣬�����ټ���ɾ�����飬Ҳ�����ٱ��
				var startpid2 = startp.getAttribute("pid2");
				startp.setAttribute("lpid", startpid2);
				if (startpid2 == null) {
					pid2++;
					startp.setAttribute("pid2", pid2);
				}
			}
		} else {// �Ƴ��յĶ��䣬����ɾ��������
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
		changarg.removearg.push(endp);// ɾ�����ʱ������Ҫʹ�ý���Ϊһ�������Ľ��
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
 * ͼƬ����ҳ
 * 
 * @param {}
 *            paper
 * @param {}
 *            nextpaper
 * @param {}
 *            startp
 */
function imageToPrePage(paper, nextpaper, startp) {
	// ͼƬ����
	var newimg = startp.cloneNode(true);
	removeInPage(nextpaper, startp);
	if (startp.getAttribute("pid2") == null) {
		changarg.removearg.push(startp);// ɾ�����ʱ������Ҫʹ�ý���Ϊһ�������Ľ��
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