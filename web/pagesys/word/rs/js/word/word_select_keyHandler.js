word.select = {};
word.select.minTdIndex=0;
word.select.init = function() {
	word.select.regEvent();
}
word.select.regEvent = function() {
	document.onkeydown = word.select.onSelectKeyDownHandler;// 选中内容后全局的键盘事件,没有的话，回退就直接在IE的后退了
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
	if (event.keyCode == 13) {// 回车
		word.select.keyEnterHandler();
	} else if (event.keyCode == 8||event.keyCode==46) {// 回退
		word.select.keyBackSpaceHandler();
	} else if (event.keyCode == 37) {// 左
		word.select.setCursorPosition(startsel.target, startsel.now);
	} else if (event.keyCode == 38) {// 上,这里执行完了也会执行keyUpHandler,因为这个执行完了鼠标已经在word中了
		var preline = getPreLine(startsel.target);
		if (preline.innerText.length < startsel.now) {
			word.select.setCursorPosition(preline, preline.innerText.length);
		} else {
			word.select.setCursorPosition(preline, startsel.now);
		}
	} else if (event.keyCode == 39) {// 右
		word.select.setCursorPosition(endsel.target, endsel.now);
	} else if (event.keyCode == 40) {// 下
		var nextline = getNextLine(endsel.target);
		if (nextline.innerText.length < startsel.now) {
			word.select.setCursorPosition(nextline, nextline.innerText.length);
		} else {
			word.select.setCursorPosition(nextline, endsel.now);
		}
	} else if(event.keyCode==32) {//空格
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
 * 回车事件处理
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
	if (startline == endline) {// 在同一行
		var newDiv = createPDiv(startp);// 创建段落
		var newLine = createLineDiv(endline);// 创建行
		newDiv.appendChild(newLine);
		startline.innerHTML = startps.phtml;// 设置开始选择处的html为开始的内容
		pushToUpdate(startp);
		newLine.innerHTML = endps.nhtml;
		var nextline = getNextLline(endline);
		while (nextline != null) {
			var parent = getParentP(nextline);
			var nextlineTemp = getNextLline(nextline);
			newDiv.appendChild(nextline);
			if (parent.getAttribute("lpid") != null) {// 跨页的段落
				if (nextlineTemp == null) {
					parent.parentNode.removeChild(parent);
					changarg.removearg.push(parent);
				}
			}
			nextline = nextlineTemp;
		}
		insertAfter(newDiv, startp);
	} else if (startp == endp) {// 在同一段落
		var newDiv = createPDiv(startp);// 创建段落
		startline.innerHTML = startps.phtml;// 设置开始选择处的html为开始的内容
		pushToUpdate(startp);
		endline.innerHTML = endps.nhtml;
		var nextline = getNextLline(endline);
		newDiv.appendChild(endline);// 必须要放在取得其它元素的后面
		while (nextline != null) {
			var parent = getParentP(nextline);
			var nextlineTemp = getNextLline(nextline);
			newDiv.appendChild(nextline);// 一定取得其它元素后加入
			if (parent.getAttribute("lpid") != null) {// 跨页的段落
				if (nextlineTemp == null) {
					parent.parentNode.removeChild(parent);
					changarg.removearg.push(parent);
				}
			}
			nextline = nextlineTemp;
		}
		insertAfter(newDiv, startp);
	} else {// 跨段
		startline.innerHTML = startps.phtml;// 设置开始选择处的html为开始的内容
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
 * 回退事件处理
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
		startline.innerHTML = startps.phtml + endps.nhtml;// 设置开始选择处的html为开始的内容
		pushToUpdate(startp);
		fixLine(startline);
	} else if (startp == endp) {
		startline.innerHTML = startps.phtml;// 设置开始选择处的html为开始的内容
		endline.innerHTML = endps.nhtml;
		pushToUpdate(startp);
		fixLine(startline);
	} else {
		startline.innerHTML = startps.phtml;// 这里可以直接用分割段的方式
		var nextline = getNextLineInP(startline);
		while (nextline != null) {
			var nextLineTemp = getNextLineInP(nextline);
			nextline.parentNode.removeChild(nextline);
			nextline = nextLineTemp;
		}
		pushToUpdate(startp);
		// 取得中间的段落，删除并存入删除数组中
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
	// 取得中间的段落，删除并存入删除数组中
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
 * 插入空格
 * @param {} line 插入空格所在的行
 * @param {} html 插入空格所在的内容
 * @return {}返回插入空格后的内容
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