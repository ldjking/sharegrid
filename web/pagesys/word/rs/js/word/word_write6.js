// JavaScript Document
function outPageListener(paper) {
	// var
	// paperheight=parseInt(page.h.substring(0,page.h.length-2))-parseInt(page.top.substring(0,page.top.length-2))-parseInt(page.bottom.substring((0,page.bottom.length-2)));
	var paperheight = paper.clientHeight;
	var totalHeight = 0;
	totalHeight = getTotalPaperHeight(paper);// 取得段落的所有高度
	if (totalHeight > paperheight) {
		doOutPage(paper, "toNext")
	}
	// 取得下一页的第一行
	var nextpaper = paper.nextSibling;
	if (nextpaper != null&&nextpaper.className=="page") {
		var br = nextpaper.getAttribute("br");
		if (br == null) {
			var nextpfirstline;
			var firstP = getFirstPDiv(nextpaper);
			if (firstP != null) {
				if(word.utils.isImage(firstP)){
					nextpfirstline=firstP.childNodes[0];
				}else if(word.utils.isParagraph(firstP)){
					nextpfirstline = getFirstLineDiv(firstP);
				}
			}
			if (nextpfirstline != null&& nextpfirstline.clientHeight + totalHeight <= paperheight) {
				doOutPage(paper, "toThis")
			}
		}
	}
}

function getTotalPaperHeight(paper) {
	var totalHeight = 0;
	for (var i = 0; i < paper.childNodes.length; i++) {
		var p = paper.childNodes[i]
		if(p.className=="text"){
			var ts=p.childNodes;
			for(var j=0;j<ts.length;j++){
				var t=ts[j];
				if(t.className=="p"||t.className=="img"||t.className=="table"){
					totalHeight += t.clientHeight;
				}
			}
		 }else{
	 		totalHeight += p.clientHeight;
		 }
	}
	return totalHeight;
}