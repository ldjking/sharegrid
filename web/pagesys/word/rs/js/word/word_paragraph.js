word.paragraph = {};
word.paragraph.b = true;
/**
 * 初始化
 */
word.paragraph.init = function() {
	word.paragraph.regEvent();
}
/**
 * 注册事件
 */
word.paragraph.regEvent = function() {
	var group3 = document.getElementsByClassName("group3")[0];
	for(a in group3.getElementsByTagName("div"))
	{
		var eachDiv = group3.getElementsByTagName("div")[a];
		if(eachDiv.className) 
		{
			var divClassName = eachDiv.className.split(" ")[1];
			eachDiv.onclick = word.paragraph[divClassName];
			eachDiv.id = divClassName;
			tipsDialog(eachDiv,word.conts.paragraphTips);
		}
	}
}
word.paragraph.alignleft = function(){
	word.paragraph.setAlign(this,"text-align", "left");	
}

word.paragraph.aligncenter = function(){
	word.paragraph.setAlign(this,"text-align", "center");
}

word.paragraph.alignright = function(){
	word.paragraph.setAlign(this,"text-align", "right");
}

word.paragraph.alignjustify = function(){
	alert("alignjustify");	
}

word.paragraph.algindispersed = function(){
	alert("algindispersed");	
}

word.paragraph.rowspace = function(e){
	word.dialog.paragraph.rowspace(e,this);
}
word.paragraph.backcolor = function(){
	alert("backcolor");	
}

word.paragraph.backcolorselect = function(e){
	word.dialog.paragraph.backcolorselect(e,this);
}

word.paragraph.border = function(){
	alert("border");	
}

word.paragraph.borderselect = function(){
	alert("borderselect");	
}

word.paragraph.projectsing = function(){
	alert("projectsing");	
}

word.paragraph.projectsing_selecet = function(){
	alert("projectsing_selecet");	
}

word.paragraph.number = function(){
	alert("number");	
}

word.paragraph.number_select = function(){
	alert("number_select");	
}

word.paragraph.manylevellist = function(){
	alert("manylevellist");	
}
//这里对应于左缩进,true增加1，false减少1
word.paragraph.reductindent = function(){
	word.paragraph.setIndent("paddingLeft",-1);
}

word.paragraph.addindent = function(){
	word.paragraph.setIndent("paddingLeft",1);
}

word.paragraph.chinesestyle = function(){
	alert("chinesestyle");	
}

word.paragraph.sort = function(){
	alert("sort");	
}

word.paragraph.shwoandhidedeitsign = function(){
	alert("shwoandhidedeitsign");	
}
word.paragraph.paragraphstyle = function(){
	var param = {};
	param.paragraph_align = "center";
	param.paragraph_outline = "2";
	param.paragraph_leftIndent = "-5.5555 em";
	param.paragraph_format = "text-indent";
	param.paragraph_formatValue = "7.7777 em";
	param.paragraph_beforeSpaceBetween = "17 行";
	param.paragraph_lineSpacingValue = "3";
	param.paragraph_lineSpacing = "multi"
	word.dialog.font.paragraphStyle(param);
}
word.paragraph.setParagraphs=function(result){
	var thispaper=null;
	if (startsel.target != null && endsel.target != null) {
		thispaper = getPage(startsel.target);
		word.paragraph.setSelectParagraph(result);
	} else if (content.target != null) {
		thispaper = getPage(content.target);
		word.paragraph.setParagraph(result);
	}
	outPageListener(thispaper);
}
/**
 * 设置对齐方式
 * 
 * @param {}
 *            name 属性
 * @param {}
 *            value 属性值
 */
word.paragraph.setAlign = function(t,name, value) {
	if (startsel.target != null && endsel.target != null) {
		word.paragraph.setSelectParagraph(name, value);
	} else if (content.target != null) {
		word.paragraph.setParagraph(name, value);
	}
	word.paragraph.setParagraphCmdState(t);
}
word.paragraph.setIndent = function(name, value) {
	var thispaper=null;
	if (startsel.target != null && endsel.target != null) {
		thispaper = getPage(startsel.target);
		word.paragraph.setSelectParagraph(name, value);
	} else if (content.target != null) {
		thispaper = getPage(content.target);
		word.paragraph.setParagraph(name, value);
		//fixLine(content.target);
	}
	outPageListener(thispaper);
}
word.paragraph.setRowspace=function(values){
	var name=values.split("_")[0];
	var value=values.split("_")[1];
	var thispaper=null;
	if (startsel.target != null && endsel.target != null) {
		thispaper = getPage(startsel.target);
		word.paragraph.setSelectParagraph(name, value);
	} else if (content.target != null) {
		thispaper = getPage(content.target);
		word.paragraph.setParagraph(name, value);
		//fixLine(content.target);
	}
	outPageListener(thispaper);
}
/**
 * 设置鼠标所在的段落
 * 
 * @param {}
 *            name 设置属性
 * @param {}
 *            value 属性值
 */
word.paragraph.setParagraph = function(name, value) {
	var p = getParentP(content.target);
	if(name=="text-align"){
		if (p.style[name] == value) {
			word.paragraph.b = false;
		} else {
			word.paragraph.b = true;
		}
	}
	word.paragraph.setPstyle(p, name, value);
	pushToUpdate(p);
	setWordVar(content.target, content.curfocus);
}

/**
 * 设置选中段落
 * 
 * @param {}
 *            name 设置属性
 * @param {}
 *            value 属性值
 */
word.paragraph.setSelectParagraph = function(name, value) {
	var startline = startsel.target;
	var endline = endsel.target;
	if(word.utils.isTd(startline)&&word.utils.isTd(endline)&&startline!=endline){
		word.paragraph.isValueInTableSelect(startline, endline, name, value);
		word.paragraph.setInTable(startline,endline,name,value);
		clearSelectsign();
		doAddPatchInTable(startline,endline);
	}else{
		var startp = word.utils.getParentDiv(startline);
		var endp = word.utils.getParentDiv(endline);
		word.paragraph.isValueInAllParagraph(startp, endp, name, value);
		if (startp == endp) {
			word.paragraph.setPstyle(startp, name, value);
			pushToUpdate(startp);
		} else {
			word.paragraph.setPstyle(startp, name, value);
			pushToUpdate(startp);
			var nextp = getNextP(startp);
			//var nextp = getPatchNextLine(startline);
			while (nextp != null && nextp != endp) {
				word.paragraph.setPstyle(nextp, name, value);
				pushToUpdate(nextp);
				nextp = getNextP(nextp);
			}
			word.paragraph.setPstyle(endp, name, value);
			pushToUpdate(endp);
		}
		clearSelectsign();
		updatePBackgroundDiv();
	}
}

word.paragraph.setInTable=function(starttd,endtd,name,value){
	word.paragraph.setPstyle(starttd, name, value);
	if(starttd==endtd){
		pushToUpdate(word.utils.getParentDiv(endtd));
		return;
	}
	var tdstartIndex=parseInt(starttd.getAttribute("tdIndex"));
	var endtdIndex=parseInt(endtd.getAttribute("tdIndex"));
	if(tdstartIndex<endtdIndex){
		var ntd=starttd.nextSibling;
		if(ntd==null){
			word.paragraph.setInTable(getNextTrTd(starttd,endtdIndex),endtd,name,value);
		}else{
			word.paragraph.setInTable(ntd,endtd,name,value);
		}
	}else{
		word.paragraph.setInTable(getNextTrTd(starttd,endtdIndex),endtd,name,value);
	}
}
/**
 * 设置选中段落的样式
 * 
 * @param {}
 *            p 选中的段落
 * @param {}
 *            name 属性
 * @param {}
 *            value 属性值
 */
word.paragraph.setPstyle = function(p, name, value) {
	if(p==null){
		return false;
	}
	if(typeof(name)=="string"){
		word.paragraph.setParagraphStyle(p,name,value);
	}else{
		word.paragraph.b=true;
		for(var i in name){
			word.paragraph.setParagraphStyle(p,i,name[i]);
		}
	}
	
}

word.paragraph.setParagraphStyle=function(p, name, value){
	if (name == "text-align") {
		if(!word.utils.isTable(p)&&!word.utils.isTd(p)&&!word.utils.isTr(p)){
			if (word.paragraph.b) {
				p.style[name] = value;
			} else {
				p.style[name] = "left";
			}
		}else{
			var divs=p.getElementsByTagName("div");
			for(var i=0;i<divs.length;i++){
				var div=divs[i];
				if(word.utils.isParagraph(div)){
					if (word.paragraph.b) {
						div.style[name] = value;
					} else {
						div.style[name] = "left";
					}
				}
			}
		}
	}else if(name=="paddingLeft"){
		if(!word.utils.isTable(p)){
			var paddingLeft=p.style.paddingLeft;
			paddingLeft=paddingLeft.substring(0,paddingLeft.indexOf("em"));
			if(paddingLeft!=""){
				if(parseInt(paddingLeft)<=0&&value<0){
					value=0;
				}
				p.style.paddingLeft=(parseInt(paddingLeft)+value)+"em";
			}else{
				if(value>0){
					p.style.paddingLeft=value+"em";
				}
			}
			fixLine(getFirstLineDiv(p));
		}
	}else if(name=="line-height"){
		if(value.indexOf("%")>=0){
			p.setAttribute("line",value);
			value=parseFloat(value.substring(0,value.indexOf("%")))*20.67/100+"px";
			
		}
		p.style.lineHeight=value;
		var divs=p.getElementsByTagName("div");
		for(var i=0;i<divs.length;i++){
			var div=divs[i];
			if(div.className=="line"){
				div.style.height=value;
			}
		}
	}else if(name=="outline"){
		if(value!=""){
			p.setAttribute("outline",value)
		}else{
			p.removeAttribute("outline");
		}
	}else if(name=="text-indent"){
		p.style[name]=value;
		var firstLine=getFirstLineDiv(p);
		firstLine.style.marginLeft=value;
		firstLine.style.textIndent="0em";
		fixLine(firstLine);
	}else if(name=="padding-left"||name=="padding-right"){
		p.style[name]=value;
		fixLine(getFirstLineDiv(p));
	}else if(name=="padding-top"||name=="padding-bottom"){
		p.style[name]=value;
	}
}
/**
 * 判断选中所有段落中设置值的选中与否 只对对齐方式的设置有效
 * 
 * @param {}
 *            startp 开始段落
 * @param {}
 *            endp 结束段落
 * @param {}
 *            name 属性
 * @param {}
 *            value 属性值
 * @return {Boolean} 设置值的话是true.
 */
word.paragraph.isValueInAllParagraph = function(startp, endp, name, value) {
	if(startp==null){
		return false;
	}
	if(name=="text-align"){
		if (startp == endp) {
			if(word.paragraph.isValueInDiv(startp,name,value)){
				return;
			}
		} else {
			if(word.paragraph.isValueInDiv(startp,name,value)){
				return;
			}
			var nextp = getNextP(startp);
			while (nextp != null && nextp != endp) {
				if(word.paragraph.isValueInDiv(nextp,name,value)){
					return;
				}
				nextp = getNextP(nextp);
			}
			if(word.paragraph.isValueInDiv(endp,name,value)){
				return;
			}
		}
	}
	return word.paragraph.b = false;;
}
word.paragraph.isValueInTableSelect= function(starttd, endtd, name, value) {
	if(name=="text-align"){
		if(word.paragraph.isValueInTable(starttd,name,value)){
			return;
		}
		if(starttd==endtd){
			return word.paragraph.b = false;
		}
		var tdstartIndex=parseInt(starttd.getAttribute("tdIndex"));
		var endtdIndex=parseInt(endtd.getAttribute("tdIndex"));
		if(tdstartIndex<endtdIndex){
			var ntd=starttd.nextSibling;
			if(ntd==null){
				word.paragraph.isValueInTableSelect(getNextTrTd(starttd,endtdIndex),endtd,name,value);
			}else{
				word.paragraph.isValueInTableSelect(ntd,endtd,name,value);
			}
		}else{
			word.paragraph.isValueInTableSelect(getNextTrTd(starttd,endtdIndex),endtd,name,value);
		}
	}
	return word.paragraph.b = false;
}
word.paragraph.isValueInDiv=function(nextp,name,value){
	if(word.utils.isTable(nextp)){
		if(word.paragraph.isValueInTable(nextp,name,value)){
			return true;
		}
	}else{
		if (nextp.style[name] != value) {
			return word.paragraph.b = true;
		}
	}
}
word.paragraph.isValueInTable=function(nextp,name,value){
	var ps=nextp.getElementsByTagName("div");
	for(var i=0;i<ps.length;i++){
		var p=ps[i];
		if(word.utils.isParagraph(p)){
			if (p.style[name] != value) {
				return word.paragraph.b = true;
			}
		}
	}
}
/**
 * 
 */
word.paragraph.setParagraphCmdState = function(obj) {
	var curStyle = style2(obj);
	if (word.paragraph.b) {
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