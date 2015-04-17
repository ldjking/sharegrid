word.select = {};
word.select.minTdIndex=0;
word.select.init = function() {
	word.select.regEvent();
}
word.select.regEvent = function() {
	document.onkeydown = word.select.onSelectKeyDownHandler;// ѡ�����ݺ�ȫ�ֵļ����¼�,û�еĻ������˾�ֱ����IE�ĺ�����
	document.onkeyup = word.select.onSelectKeyUpHandler;
}
word.select.onSelectKeyDownHandler = function() {
	if (startsel.target == null || endsel.target == null) {
		return;
	}
	//word.select.otherKeyHandler();
	stopEvt(event);
}
word.select.onSelectKeyUpHandler = function() {
	if (startsel.target == null || endsel.target == null) {
		return false;
	}
	if (event.keyCode == 13) {// �س�
		word.select.keyEnterHandler();
	} else if (event.keyCode == 8||event.keyCode==46) {// ����
		word.select.keyBackSpaceHandler();
	} else if (event.keyCode == 37) {// ��
		word.select.setCursorPosition(startsel.target, startsel.now);
	} else if (event.keyCode == 38) {// ��,����ִ������Ҳ��ִ��keyUpHandler,��Ϊ���ִ����������Ѿ���word����
		var preline = getPreLine(startsel.target);
		if (preline.innerText.length < startsel.now) {
			word.select.setCursorPosition(preline, preline.innerText.length);
		} else {
			word.select.setCursorPosition(preline, startsel.now);
		}
	} else if (event.keyCode == 39) {// ��
		word.select.setCursorPosition(endsel.target, endsel.now);
	} else if (event.keyCode == 40) {// ��
		var nextline = getNextLine(endsel.target);
		if (nextline.innerText.length < startsel.now) {
			word.select.setCursorPosition(nextline, nextline.innerText.length);
		} else {
			word.select.setCursorPosition(nextline, endsel.now);
		}
	} else if(event.keyCode==32) {//�ո�
		word.select.keySpaceHandler();
	}else{
		return false;
	}
	var startline = startsel.target;
	var startp = getParentP(startline);
	clearSelect();
	var thispaper = getPage(startp);
	outPageListener(thispaper);
	stopEvt(event);
	return false;
}
/**
 * �س��¼�����
 */
word.select.keyEnterHandler = function() {
	var startline = startsel.target;
	var endline = endsel.target;
	var startp = getParentP(startline);
	var endp = getParentP(endline);
	if(startp==null||endp==null){
		return false
	}
	var startps = splitP(startsel.target, startsel.now, false);
	var endps = splitP(endsel.target, endsel.now, false);
	if (startline == endline) {// ��ͬһ��
		var newDiv = createPDiv(startp);// ��������
		var newLine = createLineDiv(endline);// ������
		newDiv.appendChild(newLine);
		startline.innerHTML = startps.phtml;// ���ÿ�ʼѡ�񴦵�htmlΪ��ʼ������
		pushToUpdate(startp);
		newLine.innerHTML = endps.nhtml;
		var nextline = getNextLline(endline);
		while (nextline != null) {
			var parent = getParentP(nextline);
			var nextlineTemp = getNextLline(nextline);
			newDiv.appendChild(nextline);
			if (parent.getAttribute("lpid") != null) {// ��ҳ�Ķ���
				if (nextlineTemp == null) {
					parent.parentNode.removeChild(parent);
					changarg.removearg.push(parent);
				}
			}
			nextline = nextlineTemp;
		}
		insertAfter(newDiv, startp);
	} else if (startp == endp) {// ��ͬһ����
		var newDiv = createPDiv(startp);// ��������
		startline.innerHTML = startps.phtml;// ���ÿ�ʼѡ�񴦵�htmlΪ��ʼ������
		pushToUpdate(startp);
		endline.innerHTML = endps.nhtml;
		var nextline = getNextLline(endline);
		newDiv.appendChild(endline);// ����Ҫ����ȡ������Ԫ�صĺ���
		while (nextline != null) {
			var parent = getParentP(nextline);
			var nextlineTemp = getNextLline(nextline);
			newDiv.appendChild(nextline);// һ��ȡ������Ԫ�غ����
			if (parent.getAttribute("lpid") != null) {// ��ҳ�Ķ���
				if (nextlineTemp == null) {
					parent.parentNode.removeChild(parent);
					changarg.removearg.push(parent);
				}
			}
			nextline = nextlineTemp;
		}
		insertAfter(newDiv, startp);
	} else {// ���
		startline.innerHTML = startps.phtml;// ���ÿ�ʼѡ�񴦵�htmlΪ��ʼ������
		var nextline = getNextLineInP(startline);
		while (nextline != null) {
			var nextLineTemp = getNextLineInP(nextline);
			nextline.parentNode.removeChild(nextline);
			nextline = nextLineTemp;
		}
		pushToUpdate(startp);
		var nextp = getNextP(startp);
		while (nextp != null && nextp != endp) {
			var nextpTemp = getNextP(nextp);
			nextp.parentNode.removeChild(nextp);
			changarg.removearg.push(nextp);
			nextp = nextpTemp;
		}
		endline.innerHTML = endps.nhtml;
		pushToUpdate(endp);
	}
	var nextline = getNextP(startp).childNodes[0];
	word.select.setCursorPosition(nextline, 0);
	fixLine(nextline);
}
/**
 * �����¼�����
 */
word.select.keyBackSpaceHandler = function() {
	var startline = startsel.target;
	var endline = endsel.target;
	var startp = getParentP(startline);
	var endp = getParentP(endline);
	if(startp==null||endp==null){
		return false
	}
	var startps = splitP(startsel.target, startsel.now, false);
	var endps = splitP(endsel.target, endsel.now, false);
	if (startline == endline) {
		startline.innerHTML = startps.phtml + endps.nhtml;// ���ÿ�ʼѡ�񴦵�htmlΪ��ʼ������
		pushToUpdate(startp);
		fixLine(startline);
	} else if (startp == endp) {
		startline.innerHTML = startps.phtml;// ���ÿ�ʼѡ�񴦵�htmlΪ��ʼ������
		endline.innerHTML = endps.nhtml;
		pushToUpdate(startp);
		fixLine(startline);
	} else {
		startline.innerHTML = startps.phtml;// �������ֱ���÷ָ�εķ�ʽ
		var nextline = getNextLineInP(startline);
		while (nextline != null) {
			var nextLineTemp = getNextLineInP(nextline);
			nextline.parentNode.removeChild(nextline);
			nextline = nextLineTemp;
		}
		pushToUpdate(startp);
		// ȡ���м�Ķ��䣬ɾ��������ɾ��������
		var nextp = getNextP(startp);
		while (nextp != null && nextp != endp) {
			var nextpTemp = getNextP(nextp);
			nextp.parentNode.removeChild(nextp);
			changarg.removearg.push(nextp);
			nextp = nextpTemp;
		}
		endline.innerHTML = endps.nhtml;
		pushToUpdate(endp);
		fixLine(endline);
	}
	word.select.setCursorPosition(startline, startsel.now);
}
word.select.setCursorPosition = function(target, position) {
	setWordVar(target, position);
	//moveCursorPosition(target, position);
}
word.select.keySpaceHandler = function() {
	var startline = startsel.target;
	var endline = endsel.target;
	var startp = getParentP(startline);
	var endp = getParentP(endline);
	if(startp==null||endp==null){
		return false
	}
	var startps = splitP(startsel.target, startsel.now, false);
	var endps = splitP(endsel.target, endsel.now, false);
	var phtml=startps.phtml;
	phtml=word.select.insertSpace(startline,phtml);
	startline.innerHTML=phtml+endps.nhtml;
	var nextline = getNextLineInP(startline);
	while (nextline != null) {
		var nextLineTemp = getNextLineInP(nextline);
		nextline.parentNode.removeChild(nextline);
		nextline = nextLineTemp;
	}
	// ȡ���м�Ķ��䣬ɾ��������ɾ��������
	var nextp = getNextP(startp);
	while (nextp != null && nextp != endp) {
		var nextpTemp = getNextP(nextp);
		nextp.parentNode.removeChild(nextp);
		changarg.removearg.push(nextp);
		nextp = nextpTemp;
	}
	nextline = getNextLineInP(endline);
	while (nextline != null) {
		var nextLineTemp = getNextLineInP(nextline);
		startp.appendChild(nextline);
		nextline = nextLineTemp;
	}
	changarg.removearg.push(endp);
	endp.parentNode.removeChild(endp);
	word.select.setCursorPosition(startline, startsel.now+1);
	fixLine(startline);
}
/**
 * ����ո�
 * @param {} line ����ո����ڵ���
 * @param {} html ����ո����ڵ�����
 * @return {}���ز���ո�������
 */

word.select.insertSpace=function(line,html){
	if(html!=""){
		if(html.lastIndexOf("</SPAN>")<0){
			var s="<span"
			var span=line.childNodes[0];
			var spanStyle=span.getAttribute("style");
			if(spanStyle!=null){
				s+=" style=\""+spanStyle+"\"";
			}
			s+=">&nbsp;"
			html=s+html+"</SPAN>";
		}else{
			var index=html.lastIndexOf("</SPAN>");
			html=html.substring(0,index)+"&nbsp;"+html.substring(index,html.length);
		}
	}
	return html;
}