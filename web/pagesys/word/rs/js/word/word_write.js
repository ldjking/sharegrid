var content = {}
content.curfocus;
content.selecttext;
content.target;
content.isdoselect;
var startpos = {};
var endtpos = {};
var pid2 = 0;
var initphtml;
var initpid;
var initphtml1;
var initpid1;
var changarg = {}
changarg.removearg = [];
changarg.updatearg = [];
changarg.addarg = [];
var startsel = {};
var endsel = {};
var prelen = 0;
var isCursorOnImg = false;
function getChange() {
	var container=document.getElementById("content");
	var ps = container.getElementsByTagName("div");
	for (var i = 0; i < ps.length; i++) {
		var p = ps[i];
		if (word.utils.isParagraph(p)||word.utils.isImage(p)||word.utils.isTable(p)||word.utils.isPage(p)) {
			var pidattr = p.getAttribute("pid2")
			if (pidattr != null&&word.utils.getParentTd(p)==null) {
				changarg.addarg.push(p);
			}
		}
	}
	var updatearg = changarg.updatearg
	changarg.updatearg = []
	// 过滤掉已经在删除数组中的段落
	for (var i = 0; i < updatearg.length; i++) {
		if (updatearg[i].parentNode != null&&word.utils.getParentTd(updatearg[i])==null) {
			changarg.updatearg.push(updatearg[i]);
		}
	}
	// var a = changarg;
	var removearg = changarg.removearg;
	changarg.removearg = [];
	for (var i = 0, len = removearg.length; i < len; i++) {
		var pid2 = removearg[i].getAttribute("pid2");
		if (pid2 == null) {// 过滤掉新增的
			changarg.removearg.push(removearg[i]);
		}
	}
}
// 鼠标按下
function mouseDownHandler(evt) {
	var target = evt.target;
	while (target.nodeName != "DIV"&&target.nodeName !="TD") {//表格中空的td目标是td
		target = target.parentNode;
	}
	if(target.className=="numbering"){
		return;
	}
	clearSelect();
	startpos.x = evt.clientX;
	startpos.y = evt.clientY;
	// out("startpos="+startpos.x+","+startpos.y);
	// ptext="";
	var flagstart = getPositionByCursor(startpos);
	if (flagstart)
		content.isdoselect = true;
}

function mouseUpHandler(evt) {
	var target = evt.target;
	while (target.nodeName != "DIV"&&target.nodeName !="TD") {//表格中空的td目标是td
		target = target.parentNode;
	}
	if(target.className=="numbering"){
		clearFontSign();
		content.isdoselect = false;
		return;
	}
	var p = getCursorPosition(target).now;
	clearFontSign();
	content.isdoselect = false;
	if (word.utils.isImage(target)) {
		isCursorOnImg = true;
		content.target = target;
		word.utils.getFirstImg(target).style.border="1px solid #ff00ff";
	} else {
		isCursorOnImg = false;
		setWordVar(target, p);
		setCmdState();
	}
}
function mouseMoveHandler(evt) {
	var target = evt.target;
	while (target.nodeName != "DIV"&&target.nodeName !="TD") {//表格中空的td目标是td
		target = target.parentNode;
	}
	if(target.className=="numbering"){
		return;
	}
	if (content.isdoselect) {
		endtpos.x = evt.clientX;
		endtpos.y = evt.clientY;
		// out(document.getElementById("console").innerText+"endpos="+endtpos.x+","+endtpos.y);
		var len = getSelectLen(endtpos)
		if (len != null) {
			if (prelen != len) {
				var flagend = getPositionByCursor(endtpos);
				var contentDiv = document.getElementById("content");
				var fonts = contentDiv.getElementsByTagName("font");
				for (var i = 0, len = fonts.length; i < len; i++) {
					var font = fonts[i];
					if (i != fonts.length - 1 && i != 0) {
						font.className = "";
					} else {
						font.className = "font";
					}
				}
				if (flagend) {
					addSelectBackDiv()
				}
				prelen = len
			}
		}
	}
}

function setWordVar(target, pos) {
	var oldTarget=content.target;
	if(word.utils.isImage(oldTarget)){
		var img=word.utils.getFirstImg(oldTarget);
		img.style.border="0px";
	}
	content.target = target;
	if (pos != null) {
		content.curfocus = pos
	} else {
		content.curfocus = getCursorPosition(target).now;
	}
	moveCursorPosition(target, pos);
	isCursorOnImg = false;
}

function keyDownHandler(evt) {
	var target = evt.target;
	if (target.tagName.toLowerCase() != "div") {
		target = target.parentNode;
		if (target.tagName.toLowerCase() != "div") {
			stopEvt(evt)
			return;
		}
	}
	initphtml = target.parentNode.innerHTML;
	//initpid = getPDivId(target.parentNode);
	if (evt.keyCode == 13) {
		var ps = splitP(content.target, content.curfocus, true);
		var parent = target.parentNode;
		parent.innerHTML = ps.phtml;
		getUpdateArg(parent);
		var nextp=addNextP(parent,ps);
		var nextline = getFirstLineDiv(nextp);
		setWordVar(nextline, 0);
		fixLine(nextline);
		moveCursorPosition(nextline, 0)
		stopEvt(evt);
	} else {
		// fixLine(target);
	}

}

function keyUpHandler(evt) {
	// if(startsel.target!=null){
	// return false;
	// }
	var target = evt.target;
	var isposi = false;
	if (target.tagName.toLowerCase() != "div") {
		target = target.parentNode;
		if (target.tagName.toLowerCase() != "div") {
			stopEvt(evt)
			return;
		}
	}
	var pos = getCursorPosition(target).now;
	if (evt.keyCode == 8) {
		if (isCursorOnImg) {
			deleteImg();
			isposi = true;
		} else {
			if (isPStart(target) && isLineStart(target)) {// 回退合并段落
				target = backSpaceTop(target);
				isposi = true;
			} else if (isLineStart(target)) {// 回退上移行
				target = backSpaceToLine(target);
				isposi = true;
			} else {// 删除行内文字
				fixLine(target);
			}
		}
	} else if (evt.keyCode == 38) {// 上
		controlCursor(target, "top")
		isposi = true;
	} else if (evt.keyCode == 40) {// 下
		controlCursor(target, "bottom");
		isposi = true;
	} else if (evt.keyCode == 37) {// 左
		controlCursor(target, "left")
		isposi = true;
	} else if (evt.keyCode == 39) {// 右
		controlCursor(target, "right");
		isposi = true;
	} else {// 输入其它键，修订行。
		if (target.className == "line") {
			var clientWidth = target.clientWidth;
			var scrollWidth = target.scrollWidth;
			if (scrollWidth > clientWidth) {
				fixLine(target);
				// alert("width="+clientWidth+" scrollWidth="+scrollWidth);
			}else{
				//word.table.clearMySpace(target);
			}
		}
	}
	if (!isposi) {
		if (pos > target.innerText.length) {
			setWordVar(target.nextSibling, pos - target.innerText.length);
		} else {
			setWordVar(target, pos);
		}
	}
	var thispaper = getPage(target);
	outPageListener(thispaper);
	getUpdateArg(word.utils.getParentDiv(target));
	stopEvt(evt);
}
function getUpdateArg(psp) {
	if (psp != null) {
		var pid2 = psp.getAttribute("pid2");
		if (pid2 == null) {
			var phtml = psp.innerHTML;
			if (initphtml != phtml) {
				if (filterExist(psp)){
					var td=word.utils.getParentTd(psp);
					if(td!=null&&filterExist(word.utils.getParentDiv(td))){
						changarg.updatearg.push(word.utils.getParentDiv(td));
					}else{
						changarg.updatearg.push(psp);
					}
				}
			}
		}
	}
}
//function getUpdateArg(initpid) {
//	var ps = document.getElementsByTagName("div");
//	for (var i = 0; i < ps.length; i++) {
//		var psp = ps[i];
//		if (psp != null) {
//			var pid2 = psp.getAttribute("pid2");
//			if (pid2 == null) {
//				var id = getPDivId(psp);
//				if (id != null && id == initpid) {
//					var phtml = psp.innerHTML;
//					if (initphtml != phtml) {
//						if (filterExist(psp)){
//							var td=word.utils.getParentTd(psp);
//							if(td!=null&&filterExist(word.utils.getParentDiv(td))){
//								changarg.updatearg.push(word.utils.getParentDiv(td));
//							}else{
//								word.utils.getParentTd(psp)
//							}
//						}
//					}
//				}
//			}
//		}
//	}
//}
function pushToUpdate(p) {
	if (p == null) {
		return;
	}
	if (filterExist(p)) {
		changarg.updatearg.push(p);
	}
}
// 存在的不重新加入
function filterExist(p) {
	if(word.utils.isParagraph(p)){
		var pid2 = p.getAttribute("pid2");
		if (pid2 != null) {// 过滤掉新增的
			return false;
		}
		var pid = p.getAttribute("pid");
		var lpid = p.getAttribute("lpid");
		for (var i = 0; i < changarg.updatearg.length; i++) {
			if (pid != null) {
				var oripid = changarg.updatearg[i].getAttribute("pid");
				if (oripid != null && oripid == pid) {
					return false;
				}
	
			}
			if (lpid != null) {
				var orilpid = changarg.updatearg[i].getAttribute("lpid");
				if (orilpid != null && orilpid == lpid) {
					return false;
				}
			}
		}
	}else if(word.utils.isTable(p)){
		var tableId = p.getAttribute("tableId");
		for (var i = 0; i < changarg.updatearg.length; i++) {
			var oriTableId = changarg.updatearg[i].getAttribute("tableId");
			if (oriTableId == tableId) {
				return false;
			}
		}
	}
	return true;
}
// 清除保存的操作
function clearChangarg() {
	changarg = {}
	changarg.removearg = [];
	changarg.updatearg = [];
	changarg.addarg = [];
}
function setCmdState() {
	word.font.setCursorFontCmdState();
}
function deleteImg() {
	var img = content.target;
	var text = img.parentNode;
	// 创建段落
	var p = createDefaltPDiv(getPage(img));
	var line = createLineDiv(null);
	p.appendChild(line);
	text.insertBefore(p, img);
	text.removeChild(img);
	changarg.removearg.push(img);
	setWordVar(line, 0);
	//删除服务器图片，上传的图片，再删除，经测试图片可以不用删除，word也可以打开
	
}