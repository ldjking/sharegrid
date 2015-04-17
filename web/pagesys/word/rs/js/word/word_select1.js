//var ptext="";
function getPositionByCursor(pos) {
	try {
		var target = document.getElementById("content")
		var oR = document.body.createTextRange();
		oR.moveToElementText(target);
//		var contenttop = target.getBoundingClientRect().top;
//		oR.moveToPoint(pos.x, pos.y + contenttop);
		oR.moveToPoint(pos.x,pos.y);
		oR.moveEnd("character", 1);
		oR.select();
		//ptext+=r+"="+oR.text+";";
		document.execCommand('BackColor', false, '#fff');
		return true;
	} catch (e) {
		return false;
	}
}
function getSelectLen(pos) {
	try {
		var target = document.getElementById("content");
		var oR = document.body.createTextRange();
		oR.moveToElementText(target);
//		var contenttop = target.getBoundingClientRect().top;
//		oR.moveToPoint(pos.x, pos.y + contenttop);
		oR.moveToPoint(pos.x,pos.y);
		oR.moveEnd("character", target.innerText.length);
		return oR.text.length
	} catch (e) {
		return null;
	}
}
