function getCursorPosition(target) {
	var rangeData = {
		text : "",
		start : 0,
		end : 0,
		now : 0
	};
	var oS = document.selection.createRange(),
	// Don't: oR = textarea.createTextRange()
	oR = document.body.createTextRange();
	oR.moveToElementText(target);
	rangeData.text = oR.text;
	//oS.setEndPoint("StartToStart",target.createTextRange())
	rangeData.end = rangeData.text.length;
	var cursor;
	for (cursor = 0; oR.compareEndPoints("StartToStart", oS) < 0; cursor++) {
		oR.moveStart("character", 1);
	}
	rangeData.now = cursor;
	return rangeData
}

function moveCursorPosition(target, pos) {
	var i, oS = document.selection.createRange(), oR = document.body
			.createTextRange();
	try {
		oR.moveToElementText(target);
		oR.move("character", pos);
		oR.select();
	} catch (e) {
	}
}