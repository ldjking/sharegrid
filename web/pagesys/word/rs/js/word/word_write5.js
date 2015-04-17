// JavaScript Document
/*
 * 1.向上移动如果同段之内还有上一行，移动到上一行
 * 2.向上移动如果同段内没有上一段则移动到上一段的最后一行
 * 3.向下移动如果同段内还有下一行移动到同段的下一行
 * 4.向下移动如果同段内没有下一行则移动到下一段的最后一行
 * 5.向左移动如果位于行首如果同段内还有上一行就移动到上一行的行末
 * 6.向左移动如果位于行首并且同段内没有上一行就移动到上一段最后一行的行末
 * 7.向右移动如果位于行末且同段还有下一行就移动到下一行的行首
 * 8.向右移动如果位于行末且同段没有下一行就移动到下一段第一行的行首
 */
function controlCursor(target, dir) {
	var ispstart = isPStart(target);
	var ispend = isPend(target);
	var islinestart = isLineStart(target);
	var islineend = isLineEnd(target);
	if (dir == "top") {
		var td=word.utils.getParentTd(target);
		if(td!=null){
			if(isTdFirstPStart(target)){
				if(isTableFirstTr(td)){
					moveCursor("toPrePLastLine", td)
				}else{
					moveCursor("toPreTrLastLine", target);
				}
			}else{
				if (ispstart||isCursorOnImg) {
					moveCursor("toPrePLastLine", target)
				} else {
					moveCursor("toPreLine", target)
				}
			}
		}else{
			if (ispstart||isCursorOnImg) {
				moveCursor("toPrePLastLine", target)
			} else {
				moveCursor("toPreLine", target)
			}
		}
	} else if (dir == "bottom") {
		var td=word.utils.getParentTd(target);
		if(td!=null){
			if(isTdLastPEnd(target)){
				if(isTableLastTr(td)){
					moveCursor("toNextPFirstLine", td);
				}else{
					moveCursor("toNextTrFirstLine", target)
				}
			}else{
				if (ispend) {
					moveCursor("toNextPFirstLine", target)
				} else {
					moveCursor("toNextLine", target);
				}
			}
		}else{
			if (ispend) {
				moveCursor("toNextPFirstLine", target)
			} else {
				moveCursor("toNextLine", target);
			}
		}
	} else if (dir == "left" && islinestart) {
		var td=word.utils.getParentTd(target);
		if(td!=null){
			if(isTdFirstPStart(target)){
				if(isTableFirstTr(td)){
					if(isTrFirstTd(td)){
						moveCursor("toPrePLastLineEnd", td);
					}else{
						moveCursor("toPreTdLastLineEnd", target);
					}
				}else{
					if(isTrFirstTd(td)){
						moveCursor("toPreTrLastLine", target);
					}else{
						moveCursor("toPreTdLastLineEnd", target);
					}
				}
			}else{
				if (ispstart) {
					moveCursor("toPrePLastLineEnd", target);
				} else {
					moveCursor("toPreLineEnd", target);
				}
			}
		}else{
			if (ispstart) {
				moveCursor("toPrePLastLineEnd", target);
			} else {
				moveCursor("toPreLineEnd", target);
			}
		}
	} else if (dir == "right" && islineend) {
		var td=word.utils.getParentTd(target);
		if(td!=null){
			if(isTdLastPEnd(target)){
				if(isTableLastTr(td)){
					if(isTrLastTd(td)){
						moveCursor("toNextPFirstLineStart", td);
					}else{
						moveCursor("toNextTdFirstLineStart", target);
					}
				}else{
					if(isTrLastTd(td)){
						moveCursor("toNextTrFirstLine", target)
					}else{
						moveCursor("toNextTdFirstLineStart", target);
					}
				}
			}else{
				if (ispend) {
					moveCursor("toNextPFirstLineStart", target);
				} else {
					moveCursor("toNextLineStart", target);
				}
			}
		}else{
			if (ispend) {
				moveCursor("toNextPFirstLineStart", target);
			} else {
				moveCursor("toNextLineStart", target);
			}
		}
	}
}
function moveCursor(dir, target) {
	var pos = getCursorPosition(target).now, line;
	if (dir == "toPrePLastLine") {
		if(isCursorOnImg){
			target=content.target;
		}
		var prep = getPreP(word.utils.getParentDiv(target));
		if(word.utils.isParagraph(prep)){
			line = prep != null? getLastLineDiv(prep): null;
			if (pos < line.innerText.length) {
				setWordVar(line, pos);
			} else {
				setWordVar(line, line.innerText.length);
			}
		}else if(word.utils.isImage(prep)){
			setCursonInImage(prep);
		}else if(word.utils.isTable(prep)){
			setCursorInTableLast(prep);
		}
	} else if(dir=="toPreTrLastLine"){
		var tr=word.utils.getParentTr(target);
		var lastTd=word.utils.getPreTrLastTd(tr);
		setCursorInTdLast(lastTd);
	}else if (dir == "toPreLine") {
		line = target.previousSibling;
		if (pos < line.innerText.length) {
			setWordVar(line, pos);
		} else {
			setWordVar(line, line.innerText.length);
		}
	} else if (dir == "toNextPFirstLine") {
		if(isCursorOnImg){
			target=content.target;
		}
		var nextp=getNextP(word.utils.getParentDiv(target));
		if(word.utils.isParagraph(nextp)){
			line=getFirstLineDiv(nextp);
			if (pos < line.innerText.length) {
				setWordVar(line, pos);
			} else {
				setWordVar(line, line.innerText.length);
			}
		}else if(word.utils.isImage(nextp)){
			setCursonInImage(nextp);
		}else if(word.utils.isTable(nextp)){
			setCursorInTableFirst(nextp);
		}
	}else if(dir=="toNextTrFirstLine"){
		var tr=word.utils.getParentTr(target);
		var firstTd=word.utils.getNextTrFirstTd(tr);
		setCursorInTdFirst(firstTd);
	} else if (dir == "toNextLine") {
		line = target.nextSibling;
		if (pos < line.innerText.length) {
			setWordVar(line, pos)
		} else {
			setWordVar(line, line.innerText.length)
		}
	} else if (dir == "toPrePLastLineEnd") {
		var prep = getPreP(word.utils.getParentDiv(target));
		if(word.utils.isParagraph(prep)){
			line = prep != null? getLastLineDiv(prep): null;
			if (line != null)
				setWordVar(line, line.innerText.length)
		}else if(word.utils.isImage(prep)){
			setCursonInImage(prep)
		}else if(word.utils.isTable(prep)){
			setCursorInTableLast(prep);
		}
	}else if(dir=="toPreTdLastLineEnd"){
		var td=word.utils.getParentTd(target);
		var preTd=td.previousSibling;
		setCursorInTdLast(preTd);
	} else if (dir == "toPreLineEnd") {
		line = target.previousSibling;
		if (line != null)
			setWordVar(line, line.innerText.length)
	} else if (dir == "toNextPFirstLineStart") {
		var nextp=getNextP(word.utils.getParentDiv(target));
		if(word.utils.isParagraph(nextp)){
			line = getFirstLineDiv(nextp);
			if (line != null)
				setWordVar(line, 0)
		}else if(word.utils.isImage(nextp)){
			setCursonInImage(nextp);
		}else if(word.utils.isTable(nextp)){
			setCursorInTableFirst(nextp);
		}
	}else if(dir=="toNextTdFirstLineStart"){
		var td=word.utils.getParentTd(target);
		var nextTd=td.nextSibling;
		setCursorInTdFirst(nextTd);
	} else if (dir == "toNextLineStart") {
		line = target.nextSibling
		if (line != null)
			setWordVar(line, 0)
	}
}
function setCursonInImage(imageDiv){
	isCursorOnImg = true;
	content.target=imageDiv;
	var img=word.utils.getFirstImg(imageDiv);
	img.style.border="1px solid #ff00ff";
	//moveCursorPosition(imageDiv, 0);
}
function setCursorInTableLast(tableDiv){
	var table=word.utils.getFirstTable(tableDiv);
	var lastTd=word.utils.getLastTrLastTd(table);
	setCursorInTdLast(lastTd);
}
function setCursorInTableFirst(tableDiv){
	var table=word.utils.getFirstTable(tableDiv);
	var lastTd=word.utils.getFirstTrFirstTd(table);
	setCursorInTdFirst(lastTd);
}
function setCursorInTdLast(td){
	var lastP=getLastPDiv(td);
	var lastLine=getLastLineDiv(lastP);
	setWordVar(lastLine,lastLine.innerText.length);
}
function setCursorInTdFirst(td){
	var firstp=getFirstPDiv(td);
	var firstLine=getFirstLineDiv(firstp);
	setWordVar(firstLine,0);
}
function isTdFirstPStart(target){
	var td=word.utils.getParentTd(target);
	var firstp=getFirstPDiv(td);
	var firstLine=getFirstLineDiv(firstp);
	if(target==firstLine){
		return true;
	}else{
		return false;
	}
}
function isTdLastPEnd(target){
	var td=word.utils.getParentTd(target);
	var lastp=getLastPDiv(td);
	var lastLine=getLastLineDiv(lastp);
	if(target==lastLine){
		return true;
	}else{
		return false;
	}
}
function isTableFirstTr(td){
	var b=false;
	var tr=word.utils.getParentTr(td);
	if(tr.rowIndex==0){
		b=true;
	}
	return b;
}
function isTableLastTr(td){
	var b=false;
	var tr=word.utils.getParentTr(td);
	if(tr.rowIndex==tr.parentNode.rows.length-1){
		b=true;
	}
	return b;
}
function isTrFirstTd(td){
	var b=false;
	if(td.cellIndex==0){
		b=true;
	}
	return b;
}
function isTrLastTd(td){
	var b=false;
	var tr=td.parentNode;
	if(td.cellIndex==tr.cells.length-1){
		b=true;
	}
	return b;
}