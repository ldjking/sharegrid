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
	if (nsp != null) {// �Ƿ��ں���׷�ӡ������м����
		parent.parentNode.insertBefore(nextp, nsp);
	} else {
		insertAfter(nextp, parent);
		// ��������һ�Σ��ٷֶΣ�����Ҫȡ�ÿ�ҳ�Ķ�
		var lnsp = getNextLp(parent);
		if (lnsp != null) {// ������ڿ�ҳ�ĶΣ���Ҫ�Ѵ˶α�������Ķ�
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
//�õ�ǰһ�����䣬�Լ���ҳ��־
function getDiVByDir(div) {
	var r = {}
	var prediv =getPrePInPage(div);
	if (prediv == null) {
		//�õ�ǰһҳ
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
// ���˺ϲ�����
function backSpaceTop(target) {
	var p = target.parentNode;
	if(p.parentNode.tagName=="TD"){
		return ;
	}
	var divdir = getDiVByDir(p);//ȡ��ǰһ�����䣬���Ƿ��ǿ�ҳ��
	var prep = divdir.prediv;
	var prepaper =  getPage(prep);
	var dir = divdir.isreal
	if(dir==false){//�����ǰһҳ�����һ������
		var prepid=prep.getAttribute("pid");
		var plpid=p.getAttribute("lpid");
		if(plpid==prepid){//����ǿ�ҳ�Ķ��䣬��ɾ�����һ���ַ��ַ�
			//backSpaceToLine(target);
			var lastline = getLastLineDiv(prep);
			var preps = splitP(lastline, lastline.innerText.length-1, false);//�ָ���һ����������һ�С�
			lastline.innerHTML = preps.phtml;
		}
	}
	//���p���ڿ�ҳ�Ķ���ҲҪ������һ����=========�������������ҳ
	var orgstr = p.innerHTML;
	var nextpaper =  getPage(p) != null? getPage(p).nextSibling: null;
	var lp=getNextLp(p);
	if(lp!=null){
		orgstr+=lp.innerHTML;
	}
	p.parentNode.removeChild(p);//�Ƴ�Ҫ����󣬲�Ȼ���Ҳ�����p.parentNode
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
// ���˺ϲ������е���
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
//�Ƴ����У����û���У����Ƴ�����
function clearNullLine(target) {
	var p = target.parentNode;
	if(word.utils.getParentTd(p)==null){//����еĶ��䲻���
		var lines=p.childNodes;
		if(lines!=null&&lines.length>0){
			var line = lines[0]
			while (line != null) {
				var nextline = line.nextSibling;
				if (line.innerText == "") {//����innerHTML,�����ǿյ�span��
					line.parentNode.removeChild(line)
				}
				lines=p.childNodes;
				if(lines==null||lines.length<1){//�Ƴ��յĶ���
					p.parentNode.removeChild(p);
					changarg.removearg.push(p);
				}
				line = nextline;
			}
		}
	}
}
