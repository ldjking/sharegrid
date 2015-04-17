word.font = {};
word.font.b = true;
word.font.init = function() {
	word.font.regEvent();
}
word.font.regEvent = function(){
	var group2 = document.getElementsByClassName("group2")[0];
	for(a in group2.getElementsByTagName("div"))
	{
		var eachDiv = group2.getElementsByTagName("div")[a];
		if(eachDiv.className) 
		{
			var divClassName = eachDiv.className.split(" ")[1];
			eachDiv.onclick = word.font[divClassName];
			eachDiv.id = divClassName;
			tipsDialog(eachDiv,word.conts.fontTips);
		}
	}
}

word.font.fontfamily = function(e){
	word.dialog.font.fontfamily(e,this);
}

word.font.fontsize = function(e){
	word.dialog.font.fontsize(e,this);
}

word.font.bigger = function(){
	var fontsizeDiv=document.getElementById("fontsize");
	var name=fontsizeDiv.innerHTML;
	var index=word.conts.getFontSizeIndex(name);
	if(index>0){
		var fontsize=word.conts.fontSizeArray[index-1];
		fontsizeDiv.innerHTML=fontsize.name;
		word.font.setSelectFont("font-size",fontsize.value+"px");	
	}
}

word.font.smaller = function(){
	var fontsizeDiv=document.getElementById("fontsize");
	var name=fontsizeDiv.innerHTML;
	var index=word.conts.getFontSizeIndex(name);
	if(index<word.conts.fontSizeArray.length-1){
		var fontsize=word.conts.fontSizeArray[index+1];
		fontsizeDiv.innerHTML=fontsize.name;
		word.font.setSelectFont("font-size",fontsize.value+"px");	
	}	
}

word.font.clearformat = function(){
	//alert("clearformat");	
	word.font.setSelectFont("clear", true);//保留了字体，宋体。
}

word.font.bold = function(){
	word.font.setSelectFont("font-weight", "bold");
	word.font.setFontCmdState(this);
}

word.font.italic = function(){
	word.font.setSelectFont("font-style", "italic");
	word.font.setFontCmdState(this);	
}

word.font.underline = function(){
	word.font.setSelectFont("text-decoration", "underline");
}

word.font.underlineselect = function(e){
	word.dialog.font.underlineselect(e,this);
}

word.font.deleteline = function(){
	word.font.setSelectFont("text-decoration", "line-through");	
}

word.font.fontcolorprominent = function(){
	var fontcolorprominent=document.getElementById("fontcolorprominent");
	var value=fontcolorprominent.getAttribute("value");
	if(value==null){
		value="#FFFF00";
	}
	word.font.setSelectFont("background-color", value);
	clearSelect();
}

word.font.fontcolorprominentselect = function(e){
	word.dialog.font.fontcolorprominentselect(e,this);
}

word.font.fontcolor = function(){
	var fontcolor=document.getElementById("fontcolor");
	var value=fontcolor.getAttribute("value");
	if(value==null){
		value="#FF0000";
	}
	word.font.setSelectFont("color", value);	
}

word.font.fontcolorselecet = function(e){	
	word.dialog.font.fontcolorselecet(e,this);
}

word.font.charbackShade = function(){
	word.font.setSelectFont("background-color", "#D9D9D9");	
}
word.font.fontstyle = function(){
	var param = {};
	param.fontStyle_chineseFont = "仿宋";
	param.fontStyle_glyph = "bold italic";
	param.fontStyle_fontSize = "10";
	param.fontStyle_fontColorValue = "rgb(178, 161, 199)";
	word.dialog.font.fontStyle(param);
}
word.font.setFonts=function(result){
	word.font.setSelectFont(result);	
//	for(var name in result){
//		//alert(name+"="+result[name])
//		word.font.setSelectFont(name, result[name]);	
//	}
}
word.font.setSelectFont = function(name, value) {
	if(startsel.target==null&&endsel.target==null){
		return;
	}
	var startline = startsel.target;
	var endline = endsel.target;
	//var starttd=word.utils.getParentTd(startline);
	//var endtd=word.utils.getParentTd(endline);
	if(word.utils.isTd(startline)&&word.utils.isTd(endline)&&startline!=endline){
		word.font.setFontB(startline, name, value);
		word.font.setInTable(startline,endline,name,value);
		clearSelectsign();
		doAddPatchInTable(startline,endline);
	}else{
		if (startline == endline) {// 同一行选中
			word.font.setInOneline(name, value);
		} else {
			word.font.setStartline(startline, name, value);
			var nextline = getPatchNextLine(startline);
			while (nextline != null && nextline != endline) {
				word.font.setNextline(nextline, name, value);
				nextline = getPatchNextLine(nextline);
			}
			word.font.setEndline(endline, name, value);
		}
		clearSelectsign();
		updatePBackgroundDiv();
	}
}
word.font.setInTable=function(starttd,endtd,name,value){
	word.font.setNextline(starttd, name, value);
	fixNext(starttd);
	if(starttd==endtd){
		pushToUpdate(word.utils.getParentDiv(endtd));
		return;
	}
	var tdstartIndex=parseInt(starttd.getAttribute("tdIndex"));
	var endtdIndex=parseInt(endtd.getAttribute("tdIndex"));
	if(tdstartIndex<endtdIndex){
		var ntd=starttd.nextSibling;
		if(ntd==null){
			word.font.setInTable(getNextTrTd(starttd,endtdIndex),endtd,name,value);
		}else{
			word.font.setInTable(ntd,endtd,name,value);
		}
	}else{
		word.font.setInTable(getNextTrTd(starttd,endtdIndex),endtd,name,value);
	}
}
// 选中在同一行
word.font.setInOneline = function(name, value) {
	var startline=startsel.target;
	if(word.utils.isTr(startline)){
		word.font.setFontB(startline, name, value);
		word.font.setNextline(startline, name, value);
	}else{
		var startps = splitP(startline, startsel.now, false);
		var endps = splitP(endsel.target, endsel.now, false);
		var selhtml = splitLine(startline, startsel.now, endsel.now);
		selhtml = word.font.setSpans(selhtml, name, value, true);
		startline.innerHTML = startps.phtml + selhtml + endps.nhtml;
		fixNext(startline);
	}
	pushToUpdate(word.utils.getParentDiv(startline));
}
// 设置第一行
word.font.setStartline = function(startline, name, value) {
	if(word.utils.isTr(startline)){
		word.font.setFontB(startline, name, value);
		word.font.setNextline(startline, name, value);
	}else{
		var ps = splitP(startsel.target, startsel.now, false);
		var nhtml = ps.nhtml;
		// 取得所有span
		nhtml = word.font.setSpans(nhtml, name, value, true);
		startline.innerHTML = ps.phtml + nhtml;
		fixNext(startline);
	}
	pushToUpdate(word.utils.getParentDiv(startline));
}
word.font.setFontB=function(line, name, value){
	if(name=="font-weight"||name=="font-style"||name=="text-decoration"){
		var spans = line.getElementsByTagName("span");
		var span=spans[0];
		if(span!=null){
			if(span.style[name] == value){
				word.font.b = false;
			}else{
				word.font.b = true;
			}
		}else{
			word.font.b = true;
		}
	}else{
		word.font.b = true;
	}
}
word.font.setSpans = function(html, name, value, isstart) {
	if (html == "") {
		return html;
	}
	var pattern = /<(SPAN)[^>]*>([^<]+)<\/SPAN>/gi;
	var spans = html.match(pattern);
	if (spans != null) {
		for (var i = 0, len = spans.length; i < len; i++) {
			var span = spans[i];
			var newstyle = "";
			var newspan = "";
			var stylePattern = /style="[^"]+"/gi;
			var styles = span.match(stylePattern);
			if(typeof(name)=="string"){
				// var oldstyle=styles[0];
				var fontPattern = new RegExp(name + ":[^;]*(" + value + ")[^;]*;");
				if(name=="font-weight"||name=="font-style"||name=="text-decoration"){
					var bolds = span.match(fontPattern);
					if (bolds != null) {
						if (i == 0 && isstart) {
							word.font.b = false;
						}
					} else {
						if (i == 0 && isstart) {
							word.font.b = true;
						}
					}
				}else{
					word.font.b = true;
				}
				if (word.font.b) {
					if (styles != null) {
						newstyle = styles[0].substring(0, styles[0].length - 1)
								+ name + ":" + value + ";"
								+ styles[0].substring(styles[0].length - 1);
					} else {
						newstyle = "style=\""+name + ":" + value + ";\"";
					}
					if(name=="clear"){
						newstyle="font-family:宋体";
					}
				} else {
					if (styles != null) {
						newstyle = styles[0].replace(fontPattern, "");
					}
				}
			}else{
				newstyle += "style=\"";
				for(var p in name){
					newstyle+=p+":"+name[p]+";";
				}
				newstyle += "\"";
			}
			if (styles != null) {
				newspan = span.replace(stylePattern, newstyle);
			} else {
				//var spanIndex = span.indexOf("<span");这里可能还有大写的SPAN
				newspan = span.substring(0,5) +" "+ newstyle + span.substring(5, span.length);
			}
			html = html.replace(span, newspan);
		}
	}
	return html;
}
// 设置下一行的样式
word.font.setNextline = function(nextline, name, value) {
	var spans = nextline.getElementsByTagName("span");
	for (var i = 0, len = spans.length; i < len; i++) {
		var span = spans[i];
		if(typeof(name)=="string"){
			if (word.font.b) {
				span.style[name] = value;
				// span.style.cssText+=";"+name+":"+value+";";
				if(name=="clear"){
					span.setAttribute("style","font-family:宋体");
				}
			} else {
				span.style[name] = "";
				// var boldPattern=new RegExp(name+":[^;]*("+value+")[^;]*;");
				// var style=span.style.cssText;
				// style=style.replace(boldPattern,"");
				// span.style.cssText=style;
			}
		}else{
			for(var p in name){
				span.style[p] = name[p];
			}
		}
	}
	fixNext(nextline);
	pushToUpdate(word.utils.getParentDiv(nextline));
}
word.font.setEndline = function(endline, name, value) {
	if(word.utils.isTr(endline)){
		//word.font.setFontB(endline, name, value);
		word.font.setNextline(endline, name, value);
	}else{
		var ps = splitP(endsel.target, endsel.now, false);
		var phtml = ps.phtml;
		phtml = word.font.setSpans(phtml, name, value, false);
		endline.innerHTML = phtml + ps.nhtml;
	}
	fixNext(endline);
	pushToUpdate(word.utils.getParentDiv(endline));
}
word.font.setFontCmdState = function(obj) {
	var curStyle = style2(obj);
	if (word.font.b) {
		if (curStyle.backgroundPosition == "0% 0%"
				|| curStyle.backgroundPosition == "0%") {
			obj.style.backgroundPosition = "right";
		}
	} else {
		if (curStyle.backgroundPosition == "100%") {
			obj.style.backgroundPosition = "";
		}
	}
}
word.font.setCursorFontCmdState=function(){
	if (startsel.target != null && endsel.target != null) {
		//word.paragraph.setSelectParagraph(name, value);
	} else if (content.target != null) {
		var ps = splitP(content.target, content.curfocus, false);
		if(ps==null){
			return false;
		}
		var phtml=ps.phtml;
		var pattern = /<(SPAN)[^>]*>([^<]+)<\/SPAN>/g;
		var spans=phtml.match(pattern);
		if(spans!=null){
			var span=spans[spans.length-1];
			var boldPattern = new RegExp("font-weight:[^;]*(bold)[^;]*;");
			var bolds = span.match(boldPattern);
			if(bolds!=null){
				word.font.setFontCmdState(document.getElementById("bold"));
			}
			var italicPattern = new RegExp("font-style:[^;]*(italic)[^;]*;");
			var italics = span.match(italicPattern);
			if(italics!=null){
				word.font.setFontCmdState(document.getElementById("italic"));
			}
		}
	}
}