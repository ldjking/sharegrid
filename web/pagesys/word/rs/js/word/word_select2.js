// JavaScript Document

function addSelectBackDiv() {
	var contentDiv=document.getElementById("content");
	var selectsign = getSelectFont(contentDiv);
	if (selectsign.length >= 2) {
		addPatch(selectsign)
		//addBc(fonts);
	}
}
function style2(_dom){/*读取或者摄者属性值*/
	if(window.getComputedStyle)		return window.getComputedStyle(_dom)
	else	return 	_dom.currentStyle;
}
function clearSelect(){
	clearSelectsign();
	startsel={};
	endsel={};
}
//清除选择内容
function clearSelectsign(){
	var contentDiv=document.getElementById("content");
	var divs=contentDiv.getElementsByTagName("div");
	for(i=divs.length-1;i>=0;i--){
		var select = divs[i];
		if (select.className == "selectsign") {
			contentDiv.removeChild(select);
		}else{
			break;
		}
	}
}
function clearFontSign(){
	var contentDiv=document.getElementById("content");
	var lines = contentDiv.getElementsByTagName("div");
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.className == "line") {
			line.innerHTML = line.innerHTML.replace(/<(font)[^>]*>/g, "");
		}
	}
}