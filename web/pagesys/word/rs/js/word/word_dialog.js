word.dialog = {}
//
word.dialog.font = {};
word.dialog.font.fontStyle = function(param){
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;
	
	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; width:440px; height:460px; z-index:100000; left:"+(width-440)/2+"px; top:"+(height-460)/3+"px; border-top:1px solid #FFFFFF; border-left:1px solid #FFFFFF; border-bottom:1px solid #404040; border-right:1px solid #404040;background-color:#D4D0C8;font-size:12px;";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var result={};
		var font = document.getElementById("fontStyle_chineseFont").attributes.value.value;
		var glyph = document.getElementById("fontStyle_glyph").value;
		var fontSize = document.getElementById("fontStyle_fontSize").value;
		var fontColor = document.getElementById("fontStyle_fontColorValue").style.backgroundColor;
		//alert("font = "+font+",  glyph = "+glyph+",  fontSize = "+fontSize+",  fontColor = "+fontColor)
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		result["font-family"]=font;
		if(glyph.indexOf("bold")>=0){
			result["font-weight"]="bold";
		}
		if(glyph.indexOf("italic")>=0){
			result["font-style"]="italic";
		}
		if(glyph.indexOf("normal")>=0){
			result["font-weight"]="normal";
			result["font-style"]="normal";
		}
		result["font-size"]=fontSize+"px";
		result["color"]=fontColor;
		word.font.setFonts(result);
	}
	var fontSelector = function(e){
		if (e)	e.stopPropagation();
		else	window.event.cancelBubble = true;
		closeDialog();
		var setFontContainer = document.getElementById("setFontContainer");
		var chineseFontSelectIsExist = document.getElementById("chineseFontSelect");
		if(chineseFontSelectIsExist) return;
		var chineseFontSelectProperty = {};
		chineseFontSelectProperty.size = "3";
		chineseFontSelectProperty.style = "width:190px;";
		chineseFontSelectProperty.id = "chineseFontSelect";
		chineseFontSelectProperty.class = "dialog";
		var chineseFontSelect = addChild(setFontContainer,"select",chineseFontSelectProperty);
		var optionProperty = {};
		for(var i = 0; i < word.conts.fontFamilyArray.length;i++) 
		{
			optionProperty.value = word.conts.fontFamilyArray[i];
			optionProperty.innerHTML = word.conts.fontFamilyArray[i];
			addChild(chineseFontSelect,"option",optionProperty)
		}
		chineseFontSelect.onclick = function(){
			var chineseFont = document.getElementById("fontStyle_chineseFont");
			chineseFont.value = this.value;
			chineseFont.innerHTML = this.value + chineseFont.innerHTML.substring(chineseFont.innerHTML.indexOf("<"));
			this.parentNode.removeChild(this)
		}
	}
	var fontColorSelectClick = function(e){	
		if (e)	e.stopPropagation();
		else	window.event.cancelBubble = true;
		closeDialog();
		var dialogProperty = {};
		dialogProperty.style = "border:1px solid #A7ABB0; background-color:white;height:160px; width:180px; position:absolute; top:220px; left:26px";
		dialogProperty.class = "dialog";
		var dialog = addChild(showDiv,"div",dialogProperty);
		var colorModalDiv = colorModal(this);
		dialog.appendChild(colorModalDiv);
		}
	var underlineStyleSelectClick = function(){
		//alert("underlineStyleSelectClick")
	}
	var effectCheckboxChange = function(){
		var className = this.className;
		var effectContainer = document.getElementById("effectContainer");
		var equalClassNameByCheckBox = effectContainer.getElementsByClassName(className);
		for(var i=0;i<equalClassNameByCheckBox.length;i++){
			if (equalClassNameByCheckBox[i]!=this) equalClassNameByCheckBox[i].checked = false;		 		
			else equalClassNameByCheckBox[i].checked = true; 
		 } 
	}
	
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "字体";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/start/font_fontStyle_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	
	var tagsProperty = {};
	tagsProperty.style = "height:20px;margin:5px 5px 0px 5px;";
	var tags = addChild(showDiv,"div",tagsProperty);
	var fontTagProperty = {};
	fontTagProperty.innerHTML  = "字体(N)";
	fontTagProperty.style = "height:19px; width:50px; padding-left:10px; line-height:20px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #D4D0C8; z-index:100001;position:absolute";
	addChild(tags,"div",fontTagProperty)

	var showContainerProperty ={};
	showContainerProperty.style= "height:380px; margin:0px 5px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; ";
	var showContainer = addChild(showDiv,"div",showContainerProperty);
	//字体样式
	var setFontStyleContainerProeprty = {};
	setFontStyleContainerProeprty.style = "position:relative;margin:20px 5px 5px 10px;height:90px";
	var setFontStyleContainer = addChild(showContainer,"div",setFontStyleContainerProeprty);
	//字体
	var setFontContainerProeprty = {};
	setFontContainerProeprty.style = "width:190px;position:absolute;left:0px" ;
	setFontContainerProeprty.id = "setFontContainer";
	var setFontContainer = addChild(setFontStyleContainer,"div",setFontContainerProeprty)
	var fontProperty = {}
	fontProperty.style="height:20px;line-height:20px;";
	fontProperty.innerHTML = "中文字体(T):"
	addChild(setFontContainer,"div",fontProperty);
	var fontSelectProperty = {};
	if(param.fontStyle_chineseFont){
		fontSelectProperty.value =	param.fontStyle_chineseFont;
		fontSelectProperty.innerHTML =	param.fontStyle_chineseFont;
	}else{
		fontSelectProperty.value ="宋体";
		fontSelectProperty.innerHTML ="宋体";
	}
	fontSelectProperty.id = "fontStyle_chineseFont"
	fontSelectProperty.style = "background-color:#fff; height:16px; line-height:16px; padding-left:5px; border-left:1px solid #000; border-top:1px solid #000;border-bottom:1px solid #fff;border-right:1px solid #fff;"
	var fontSelect = addChild(setFontContainer,"div",fontSelectProperty);
	fontSelect.onclick = fontSelector;
	var fontSelectDownImageProperty = {};
	fontSelectDownImageProperty.style = "width:16px;height:16px;background-image:url(rs/img/word/start/select_down.jpg);float:right";
	addChild(fontSelect,"div",fontSelectDownImageProperty)
	//字形
	var setGlyphContainerProperty = {};
	setGlyphContainerProperty.style = "width:100px;position:absolute;left:210px";
	var setGlyphContainer = addChild(setFontStyleContainer,"div",setGlyphContainerProperty)
	var fontProperty = {}
	fontProperty.style="height:20px;line-height:20px;";
	fontProperty.innerHTML = "字形(Y):"
	addChild(setGlyphContainer,"div",fontProperty);
	var glyphSelectProperty = {};
	glyphSelectProperty.style = "width:105px";
	glyphSelectProperty.size = "4";
	glyphSelectProperty.id = "fontStyle_glyph";
	var glyphSelect = addChild(setGlyphContainer,"select",glyphSelectProperty);
	var glyphArray = [{name:"常规",value:"normal"},{name:"倾斜",value:"italic"},{name:"加粗",value:"bold"},{name:"加粗 倾斜",value:"bold italic"}];
	for(var i = 0;i < glyphArray.length;i++){
		var glyphOptionProperty = {};
		if(param.fontStyle_glyph){if(param.fontStyle_glyph == glyphArray[i].value) glyphOptionProperty.selected = "ture" }
		else if(glyphArray[i].value == "normal") glyphOptionProperty.selected = "ture";
		glyphOptionProperty.innerHTML = glyphArray[i].name;
		glyphOptionProperty.value = glyphArray[i].value;
		addChild(glyphSelect,"option",glyphOptionProperty)
	}
	//字号
	var setFontSizeContainerProperty ={};
	setFontSizeContainerProperty.style = "width:70px;position:absolute;left:330px";
	var setFontSizeContainer = addChild(setFontStyleContainer,"div",setFontSizeContainerProperty);
	var fontProperty = {}
	fontProperty.style="height:20px;line-height:20px;";
	fontProperty.innerHTML = "字号(S):"
	addChild(setFontSizeContainer,"div",fontProperty);
	var fontSizeSelectProperty = {};
	fontSizeSelectProperty.style = "width:75px";
	fontSizeSelectProperty.size = "4";
	fontSizeSelectProperty.id = "fontStyle_fontSize";
	var fontSizeSelect = addChild(setFontSizeContainer,"select",fontSizeSelectProperty);
	for(var i = 0;i <  word.conts.fontSizeArray.length;i++){
		var fontSizeOptionProperty = {};
		if(!fontSizeSelect.value){
			if(param.fontStyle_fontSize){if(param.fontStyle_fontSize == word.conts.fontSizeArray[i].value)	{fontSizeOptionProperty.selected = "ture";}}
			else if(word.conts.fontSizeArray[i].value == 14) {fontSizeOptionProperty.selected = "ture"; }
		}
		fontSizeOptionProperty.innerHTML = word.conts.fontSizeArray[i].name;
		fontSizeOptionProperty.value = word.conts.fontSizeArray[i].value;
		addChild(fontSizeSelect,"option",fontSizeOptionProperty)
	}
	fontSizeSelect.scrollTop=fontSizeSelect.scrollTop-45;
	//所有字体标题
	var allFontTitlePeroperty = {};
	allFontTitlePeroperty.innerHTML = "所有文字";
	allFontTitlePeroperty.style = "margin-left:10px;height:20px;line-height:20px;position:relative";
	var allFontTitle = addChild(showContainer,"div",allFontTitlePeroperty);
	var allFontTitleLinePeroperty = {};
	allFontTitleLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:350px; position:absolute; left:60px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(allFontTitle,"div",allFontTitleLinePeroperty)
	//所有字体设置
	var allFontSettingProeprty = {};
	allFontSettingProeprty.style = "height:45px;position:relative;";
	var allFontSettingContainer = addChild(showContainer,"div",allFontSettingProeprty);
	//字体颜色
	var fontColorFontProperty = {};
	fontColorFontProperty.style = "position:absolute; top:0px; left:20px; width:100px; height:20px; line-height:20px";
	fontColorFontProperty.innerHTML = "字体颜色(C)";
	addChild(allFontSettingContainer,"div",fontColorFontProperty);
	var fontColorSelectProperty = {};
	fontColorSelectProperty.style = "position:absolute; top:20px; left:20px; width:100px; height:16px; background-color:#fff;  border-left:1px solid #000; border-top:1px solid #000; border-bottom:1px solid #808080; border-right:1px solid #808080;";
	fontColorSelectProperty.id = "fontStyle_fontColor";
	var fontColorSelect = addChild(allFontSettingContainer,"div",fontColorSelectProperty);
	fontColorSelect.onclick = fontColorSelectClick;
	var fontColorSelectValueProeprty = {};
	fontColorSelectValueProeprty.style = "background-color:#000; margin:1px 2px; height:14px; width:80px";
	fontColorSelectValueProeprty.id = "fontStyle_fontColorValue";
	var fontColorSelectValue = addChild(fontColorSelect,"div",fontColorSelectValueProeprty);
	if(param.fontStyle_fontColorValue) fontColorSelectValue.style.backgroundColor = param.fontStyle_fontColorValue;
	var fontColorSelectDownImageProeprty = {};
	fontColorSelectDownImageProeprty.style = "background-image:url(rs/img/word/start/select_down.jpg); height:16px; width:16px; position:absolute; top:0px; right:0px";
	addChild(fontColorSelect,"div",fontColorSelectDownImageProeprty);
	//下划线类型
	var underlineStyleFontProperty = {};
	underlineStyleFontProperty.style = "position:absolute; top:0px; left:140px; width:100px; height:20px; line-height:20px";
	underlineStyleFontProperty.innerHTML = "下划线类型(U)";
	addChild(allFontSettingContainer,"div",underlineStyleFontProperty);
	var underlineStyleSelectProperty = {};
	underlineStyleSelectProperty.style = "position:absolute; top:20px; left:140px; width:100px; height:16px; background-color:#fff;  border-left:1px solid #000; border-top:1px solid #000; border-bottom:1px solid #808080; border-right:1px solid #808080;";
	var underlineStyleSelect = addChild(allFontSettingContainer,"div",underlineStyleSelectProperty);
	underlineStyleSelect.onclick = underlineStyleSelectClick;
	var underlineStyleSelectValueProeprty = {};
	underlineStyleSelectValueProeprty.style = "padding-left:10px; margin:1px 2px; height:14px; width:80px";
	underlineStyleSelectValueProeprty.id = "fontStyle_underlineStyle";
	underlineStyleSelectValueProeprty.innerHTML = "(无)";
	underlineStyleSelectValueProeprty.value = "none";
	addChild(underlineStyleSelect,"div",underlineStyleSelectValueProeprty);
	var underlineStyleSelectDownImageProeprty = {};
	underlineStyleSelectDownImageProeprty.style = "background-image:url(rs/img/word/start/select_down.jpg); height:16px; width:16px; position:absolute; top:0px; right:0px";
	addChild(underlineStyleSelect,"div",underlineStyleSelectDownImageProeprty);
	//效果标题
	var allFontTitlePeroperty = {};
	allFontTitlePeroperty.innerHTML = "效果";
	allFontTitlePeroperty.style = "margin-left:10px;height:20px;line-height:20px;position:relative";
	var allFontTitle = addChild(showContainer,"div",allFontTitlePeroperty);
	var allFontTitleLinePeroperty = {};
	allFontTitleLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:370px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(allFontTitle,"div",allFontTitleLinePeroperty);
	var effectContainerProperty = {};
	effectContainerProperty.style = "margin-left:10px;height:90px";
	effectContainerProperty.id = "effectContainer"
	var effectContainer = addChild(showContainer,"div",effectContainerProperty);
	var effectArray =[{"name":"删除线(K)","class":"strikethrough","value":""},{"name":"阴影(W)","class":"text","value":""},{"name":"小型大写字母(M)","class":"upperCase","value":""},{"name":"双删除线(L)","class":"strikethrough","value":""},{"name":"空心(O)","class":"text","value":""},{"name":"全部大写字母(A)","class":"upperCase","value":""},{"name":"上标(P)","class":"mark","value":"sub"},{"name":"阳文(E)","class":"text","value":""},{"name":"隐藏(H)","class":"","value":""},{"name":"下标(B)","class":"mark","value":"super"},{"name":"阴文(G)","class":"text","value":"none"}]
	for(var i = 0; i < effectArray.length; i++)
	{
		var divProperty = {};
		divProperty.style = "height:20px; width:120px; float:left;"
		if(i%3 != 0)	divProperty.style += "margin-left:20px;";
		var div = addChild(effectContainer,"div",divProperty);
		var inputProperty = {};
		inputProperty.type= "checkbox";
		inputProperty.value = effectArray[i].value;
		inputProperty.class = effectArray[i].class;
		addChild(div,"input",inputProperty).onclick = effectCheckboxChange;
		var fontPropery = {};
		fontPropery.innerHTML = effectArray[i].name;
		addChild(div,"font",fontPropery).onclick = function(){
			this.previousSibling.click();
		}
	}
	//预览标题
	var allFontTitlePeroperty = {};
	allFontTitlePeroperty.innerHTML = "预览";
	allFontTitlePeroperty.style = "margin-left:10px;height:20px;line-height:20px;position:relative";
	var allFontTitle = addChild(showContainer,"div",allFontTitlePeroperty);
	var allFontTitleLinePeroperty = {};
	allFontTitleLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:370px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(allFontTitle,"div",allFontTitleLinePeroperty);
	
	
	var showButtonProperty = {};
	showButtonProperty.style = "margin-top:5px;position:relative;height:25px";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:absolute;left:270px;width:70px"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:absolute;left:365px;width:70px"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}

word.dialog.font.paragraphStyle = function(param){
	//alert("word.dialog.font.paragraphStyle");
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;
	
	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; width:400px; height:460px; z-index:100000; left:"+(width-400)/2+"px; top:"+(height-460)/3+"px; border-top:1px solid #FFFFFF; border-left:1px solid #FFFFFF; border-bottom:1px solid #404040; border-right:1px solid #404040;background-color:#D4D0C8;font-size:12px;";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var result={};
		var align = document.getElementById("paragraph_align").value;
		var outline = document.getElementById("paragraph_outline").value;
		var leftIndent = document.getElementById("paragraph_leftIndent").value;
		var rightIndent = document.getElementById("paragraph_rightIndent").value;
		var format = document.getElementById("paragraph_format").value;
		var formatValue = document.getElementById("paragraph_formatValue").value;
		var beforeSpaceBetween = document.getElementById("paragraph_beforeSpaceBetween").value;
		var afterSpaceBetween = document.getElementById("paragraph_afterSpaceBetween").value;
		var lineSpacing = document.getElementById("paragraph_lineSpacing").value;
		var lineSpacingValue = document.getElementById("paragraph_lineSpacingValue").value;
		alert("align = "+align+",  outline = "+outline+",   leftIndent = "+leftIndent+",   rightIndent = "+rightIndent+",   format = "+format+",    formatValue = "+formatValue+",   beforeSpaceBetween = "+beforeSpaceBetween+",   afterSpaceBetween = "+afterSpaceBetween+",   lineSpacing = "+lineSpacing+",   lineSpacingValue = "+lineSpacingValue)
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		result["text-align"]=align;
		result["outline"]=outline;
		result["padding-left"]=parseFloat(leftIndent)+"em";
		result["padding-right"]=parseFloat(rightIndent)+"em";
		if(format!=""){
			result[format]=parseFloat(formatValue)+"em";
		}
		if(beforeSpaceBetween=="自动"){
			beforeSpaceBetween=0;
		}
		if(afterSpaceBetween=="自动"){
			afterSpaceBetween=0;
		}
		result["padding-top"]=parseFloat(beforeSpaceBetween)*20.67+"px";
		result["padding-bottom"]=parseFloat(afterSpaceBetween)*20.67+"px";
		if(lineSpacing=="min"||lineSpacing=="fixed"){
			result["line-height"]=parseFloat(lineSpacingValue)*4/3+"px";
		}else if(lineSpacing=="multi"){
			result["line-height"]=parseFloat(lineSpacingValue)*100+"%";
		}else{
			result["line-height"]=parseFloat(lineSpacing)*100+"%";
		}
		//alert($myStr(result));
		word.paragraph.setParagraphs(result);
	}
	var lineSpacingValueChange = function(){
		var lineSpacing = document.getElementById("paragraph_lineSpacing");
		if(lineSpacing.value == "min" || lineSpacing.value == "fixed")	this.value = parseFloat(this.value).toFixed(1)*100/100 + "磅";	
		else {this.value = parseFloat(this.value).toFixed(2)*100/100; lineSpacing.value = "multi"}
	}
	var lineSpacingSelectChange = function(){
		var value = this.value;
		var lineSpacingValue = document.getElementById("paragraph_lineSpacingValue");
		if(value == "min" || value == "fixed")	lineSpacingValue.value = "12 磅";
		else if(value == "multi")	lineSpacingValue.value = 3;
		else lineSpacingValue.value = "";
	}
	var formatSelectChange = function(){
		var value = this.value;
		var formatValue = document.getElementById("paragraph_formatValue");
		//console.log(value,formatValue.value)
		if(value){
			if(formatValue.value)	formatValue.value = parseFloat(formatValue.value).toFixed(2)*100/100 + " 字符";
			else	formatValue.value = "2 字符";
		}
		else	formatValue.value = "";
	}
	var formatValueChange = function(){
		var format = document.getElementById("paragraph_format");
		if(!format.value)	format.value = "ind"
		this.value = parseFloat(this.value).toFixed(2)*100/100 + "字符";	
	}
	var up = function(){
		var id = this.previousSibling.id;
		var value = parseInt(parseFloat(this.previousSibling.value).toFixed(2)*100/100/0.5)*0.5
		var format = document.getElementById("paragraph_format");
		var lineSpacing = document.getElementById("paragraph_lineSpacing");
		//console.log(id,"value = "+value,parseInt(parseFloat(this.previousSibling.value).toFixed(2)*100/100/0.5)*0.5)
		if(id == "paragraph_leftIndent" || id == "paragraph_rightIndent"){
			if(!value) this.previousSibling.value = "0.5 字符";
			else	this.previousSibling.value = (value+0.5)+" 字符";
		}
		else if(id == "paragraph_formatValue"){
			if(!format.value) format.value = "ind";
			if(!value) this.previousSibling.value = "0.5 字符";
			else	this.previousSibling.value = (value+0.5)+" 字符";
		}
		else if(id == "paragraph_beforeSpaceBetween" || id == "paragraph_afterSpaceBetween"){
			if(isNaN(value)) this.previousSibling.value = "0 行";
			else	this.previousSibling.value = (value+0.5)+" 行";
		}
		else if(id == "paragraph_lineSpacingValue"){
			if(lineSpacing.value == "min" || lineSpacing.value == "fixed"){
				var value = parseInt(this.previousSibling.value)
				if(isNaN(value)) this.previousSibling.value = "1 磅";
				else	this.previousSibling.value = (value+1)+" 磅";
			}else{
				var value = parseInt(parseFloat(this.previousSibling.value).toFixed(2)*100/100/0.25)*0.25
				if(lineSpacing.value != "multi")	lineSpacing.value = "multi"
				if(isNaN(value)) this.previousSibling.value = 0.25;
				else	this.previousSibling.value = (value+0.25);
			}
		}
	}
	var down = function(){
		var id = this.previousSibling.previousSibling.id;
		var value = parseFloat(this.previousSibling.previousSibling.value).toFixed(2)*100/100/0.5;
		if(value.toString().indexOf(".") != -1) value = (parseInt(value)+1)*0.5;
		else	value = parseInt(value)*0.5;
		var format = document.getElementById("paragraph_format");
		var lineSpacing = document.getElementById("paragraph_lineSpacing");
		//console.log(id,"value = "+value)
		if(id == "paragraph_leftIndent" || id == "paragraph_rightIndent"){
			if(!value) this.previousSibling.previousSibling.value = "-0.5 字符";
			else	this.previousSibling.previousSibling.value = (value-0.5)+" 字符";
		}
		else if(id == "paragraph_formatValue"){
			if(!format.value) format.value = "ind";
			if(!value) this.previousSibling.previousSibling.value = "0 字符";
			else if (value == 0)	return;
			else	this.previousSibling.previousSibling.value = (value-0.5)+" 字符";
		}
		else if(id == "paragraph_beforeSpaceBetween" || id == "paragraph_afterSpaceBetween"){
			if(!value) this.previousSibling.previousSibling.value = "自动";
			else if (value == "自动")	return;
			else	this.previousSibling.previousSibling.value = (value-0.5)+" 字符";
		}
		else if(id == "paragraph_lineSpacingValue"){
			if(lineSpacing.value == "min" || lineSpacing.value == "fixed"){
				var value = parseFloat(this.previousSibling.previousSibling.value).toFixed(2)*100/100;
				if(value.toString().indexOf(".") != -1) value = (parseInt(value)+1);
				else	value = parseInt(value);
				if(!value) this.previousSibling.previousSibling.value = "0 磅";
				else	this.previousSibling.previousSibling.value = (value-1)+" 磅";
			}else{
				var value = parseFloat(this.previousSibling.previousSibling.value).toFixed(2)*100/100/0.25;
				if(value.toString().indexOf(".") != -1) value = (parseInt(value)+1)*0.25;
				else	value = parseInt(value)*0.25;
				if(lineSpacing.value != "multi")	lineSpacing.value = "multi"
				if(!value) this.previousSibling.previousSibling.value = 0.25;
				else if (value == 0.25)	return;
				else	this.previousSibling.previousSibling.value = value - 0.25;
			}
		}
	}
	
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "段落";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/start/font_fontStyle_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	
	var tagsProperty = {};
	tagsProperty.style = "height:20px;margin:5px 5px 0px 5px;";
	var tags = addChild(showDiv,"div",tagsProperty);
	var fontTagProperty = {};
	fontTagProperty.innerHTML  = "缩进和间距(I)";
	fontTagProperty.style = "height:19px; width:85px; padding-left:10px; line-height:20px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #D4D0C8; z-index:100001;position:absolute";
	addChild(tags,"div",fontTagProperty)
	
	var showContainerProperty ={};
	showContainerProperty.style= "height:380px; margin:0px 5px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; ";
	var showContainer = addChild(showDiv,"div",showContainerProperty);
	//常规标题
	var generalTitlePeroperty = {};
	generalTitlePeroperty.innerHTML = "常规";
	generalTitlePeroperty.style = "margin-top:10px;margin-left:10px;height:20px;line-height:20px;position:relative";
	var generalTitle = addChild(showContainer,"div",generalTitlePeroperty);
	var generalTitleLinePeroperty = {};
	generalTitleLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:330px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(generalTitle,"div",generalTitleLinePeroperty)
	
	var alignContainerProperty = {};
	alignContainerProperty.innerHTML = "对齐方式(G):";
	alignContainerProperty.style= "margin-top:5px;margin-left:20px;height:20px;line-height:20px;position:relative";
	var alignContainer = addChild(showContainer,"div",alignContainerProperty);
	var alignSelectProperty = {};
	alignSelectProperty.id = "paragraph_align";
	alignSelectProperty.size = "1";
	alignSelectProperty.style = "position:absolute; left:90px; height:20px; width:80px";
	var alignSelect = addChild(alignContainer,"select",alignSelectProperty)
	alignArray = [{"name":"左对齐","value":"left","defaultName":"default"},{"name":"居中","value":"center"},{"name":"右对齐","value":"right"}];
	for(var i = 0; i < alignArray.length; i++){
		var optionProperty = {};
		optionProperty.value = alignArray[i].value;
		optionProperty.innerHTML = alignArray[i].name;
		if(param.paragraph_align ){ if( param.paragraph_align == alignArray[i].value)	{optionProperty.selected = "true";}}
		else if(alignArray[i].defaultName)	{optionProperty.selected = "true";}
		//else if(alignArray[i].value == param.paragraph_align)	{optionProperty.selected = "true";}
		addChild(alignSelect,"option",optionProperty)
	}
	
	var outlineContainerProperty = {};
	outlineContainerProperty.innerHTML = "大纲级别(O):";
	outlineContainerProperty.style= "margin-top:5px;margin-left:20px;height:20px;line-height:20px;position:relative";
	var outlineContainer = addChild(showContainer,"div",outlineContainerProperty);
	var outlineSelectProperty = {};
	outlineSelectProperty.id = "paragraph_outline";
	outlineSelectProperty.size = "1";
	outlineSelectProperty.style = "position:absolute; left:90px; height:20px";
	var outlineSelect = addChild(outlineContainer,"select",outlineSelectProperty)
	outlineArray = [{"name":"正文文本","value":"","isDefault":true},{"name":"1级","value":"0"},{"name":"2级","value":"1"},{"name":"3级","value":"2"},{"name":"4级","value":"3"},{"name":"5级","value":"4"},{"name":"6级","value":"5"},{"name":"7级","value":"6"},{"name":"8级","value":"7"},{"name":"9级","value":"8"}];
	for(var i = 0; i < outlineArray.length; i++){
		var optionProperty = {};
		optionProperty.value = outlineArray[i].value;
		optionProperty.innerHTML = outlineArray[i].name;
		if(param.paragraph_outline){if(param.paragraph_outline == outlineArray[i].value)	optionProperty.selected = "true";}
		else if(outlineArray[i].isDefault)	{optionProperty.selected = "true";}
		addChild(outlineSelect,"option",optionProperty)
	}
	
	//缩进标题
	var indentTitlePeroperty = {};
	indentTitlePeroperty.innerHTML = "缩进";
	indentTitlePeroperty.style = "margin-top:20px;margin-left:10px;height:20px;line-height:20px;position:relative";
	var indentTitle = addChild(showContainer,"div",indentTitlePeroperty);
	var indentTitleLinePeroperty = {};
	indentTitleLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:330px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(indentTitle,"div",indentTitleLinePeroperty);
	//缩进
	var indentContainerProperty = {};
	indentContainerProperty.style = "height:40px; position:relative;margin-left:20px; ";
	var indentContainer = addChild(showContainer,"div",indentContainerProperty);
	
	var leftIndentContainerProperty = {};
	leftIndentContainerProperty.style = "height:20px; line-height:20px; width:170px;"
	leftIndentContainerProperty.innerHTML = "左侧(L):";
	var leftIndentContainer = addChild(indentContainer,"div",leftIndentContainerProperty);
	var leftIndentValueContainer = {};
	leftIndentValueContainer.style = " height:16px; width:80px; position:absolute; left:90px; top:1px;  border:1px solid #808080";
	var leftIndentValueContainer = addChild(leftIndentContainer,"div",leftIndentValueContainer);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:58px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_leftIndent";
	if(param.paragraph_leftIndent)	inputValueProperty.value = param.paragraph_leftIndent;
	else	inputValueProperty.value = "0 字符";
	var inputValue = addChild(leftIndentValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:64px; top:1px";
	addChild(leftIndentValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:64px; top:2px";
	addChild(leftIndentValueContainer,"div",imageUpPeroperty).onclick = down
	
	var rightIndentContainerProperty = {};
	rightIndentContainerProperty.style = "height:20px; line-height:20px; width:170px; position:absolute; top:20px;"
	rightIndentContainerProperty.innerHTML = "右侧(R):";
	var rightIndentContainer = addChild(indentContainer,"div",rightIndentContainerProperty);
	var rightIndentValueContainer = {};
	rightIndentValueContainer.style = " height:16px; width:80px; position:absolute; left:90px; top:1px;  border:1px solid #808080";
	var rightIndentValueContainer = addChild(rightIndentContainer,"div",rightIndentValueContainer);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:58px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_rightIndent";
	if(param.paragraph_rightIndent)	inputValueProperty.value = param.paragraph_rightIndent;
	else	inputValueProperty.value = "0 字符";
	var inputValue = addChild(rightIndentValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:64px; top:1px";
	addChild(rightIndentValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:64px; top:2px";
	addChild(rightIndentValueContainer,"div",imageUpPeroperty).onclick = down
	
	var formatContainerProperty = {};
	formatContainerProperty.style = "height:40px; width:80px; position:absolute; left:190px; top:0px;"
	formatContainerProperty.innerHTML = "特殊格式(S)"
	var formatContainer = addChild(indentContainer,"div",formatContainerProperty);
	var formatSelectProperty = {};
	formatSelectProperty.size = "1";
	formatSelectProperty.style = "margin-top:5px"
	formatSelectProperty.id  = "paragraph_format"
	var formatSelect = addChild(formatContainer,"select",formatSelectProperty);
	formatSelect.onchange = formatSelectChange;
	formatArray = [{"name":"(无)","value":"","isDefault":true},{"name":"首行缩进","value":"text-indent"}];
	for(var i = 0; i < formatArray.length; i++){
		var optionProperty = {};
		optionProperty.value = formatArray[i].value;
		optionProperty.innerHTML = formatArray[i].name;
		if(param.paragraph_format) {if(param.paragraph_format == formatArray[i].value)	optionProperty.selected = "true";}
		if(formatArray[i].isDefault)	{optionProperty.selected = "true";}
		addChild(formatSelect,"option",optionProperty)
	}
	
	var formatValueContainerProperty = {};
	formatValueContainerProperty.style = "height:40px; width:70px; position:absolute; left:280px; top:0px;"
	formatValueContainerProperty.innerHTML = "磅值(Y)"
	var formatValueContainer = addChild(indentContainer,"div",formatValueContainerProperty);
	var formatValueDivContainerProperty = {};
	formatValueDivContainerProperty.style = " height:16px; width:70px; position:absolute; left:0px; top:21px;  border:1px solid #808080";
	var formatValueDivContainer = addChild(formatValueContainer,"div",formatValueDivContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:48px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_formatValue";
	if(param.paragraph_formatValue)	inputValueProperty.value = param.paragraph_formatValue;
	else	inputValueProperty.value = "";
	var inputValue = addChild(formatValueDivContainer,"input",inputValueProperty);
	inputValue.onchange = formatValueChange;
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:54px; top:1px";
	addChild(formatValueDivContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:54px; top:2px";
	addChild(formatValueDivContainer,"div",imageUpPeroperty).onclick = down;
	//间距标题
	var spaceBetweenTitlePeroperty = {};
	spaceBetweenTitlePeroperty.innerHTML = "间距";
	spaceBetweenTitlePeroperty.style = "margin-top:20px;margin-left:10px;height:20px;line-height:20px;position:relative";
	var spaceBetweenTitle = addChild(showContainer,"div",spaceBetweenTitlePeroperty);
	var spaceBetweenLinePeroperty = {};
	spaceBetweenLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:330px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(spaceBetweenTitle,"div",spaceBetweenLinePeroperty);
	//间距
	var spaceBetweenContainerProperty = {};
	spaceBetweenContainerProperty.style = "height:40px; position:relative;margin-left:20px; ";
	var spaceBetweenContainer = addChild(showContainer,"div",spaceBetweenContainerProperty);
	
	var beforeSpaceBetweenContainerProperty = {};
	beforeSpaceBetweenContainerProperty.style = "height:20px; line-height:20px; width:170px;"
	beforeSpaceBetweenContainerProperty.innerHTML = "段前(B):";
	var beforeSpaceBetweenContainer = addChild(spaceBetweenContainer,"div",beforeSpaceBetweenContainerProperty);
	var beforeSpaceBetweenValueContainer = {};
	beforeSpaceBetweenValueContainer.style = " height:16px; width:80px; position:absolute; left:90px; top:1px;  border:1px solid #808080";
	var beforeSpaceBetweenValueContainer = addChild(beforeSpaceBetweenContainer,"div",beforeSpaceBetweenValueContainer);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:58px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_beforeSpaceBetween";
	if(param.paragraph_beforeSpaceBetween) inputValueProperty.value = param.paragraph_beforeSpaceBetween;
	else	inputValueProperty.value = "自动";
	var inputValue = addChild(beforeSpaceBetweenValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:64px; top:1px";
	addChild(beforeSpaceBetweenValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:64px; top:2px";
	addChild(beforeSpaceBetweenValueContainer,"div",imageUpPeroperty).onclick = down;
	
	var afterSpaceBetweenContainerProperty = {};
	afterSpaceBetweenContainerProperty.style = "height:20px; line-height:20px; width:170px; position:absolute; top:20px;"
	afterSpaceBetweenContainerProperty.innerHTML = "段后(F):";
	var afterSpaceBetweenContainer = addChild(spaceBetweenContainer,"div",afterSpaceBetweenContainerProperty);
	var afterSpaceBetweenValueContainer = {};
	afterSpaceBetweenValueContainer.style = " height:16px; width:80px; position:absolute; left:90px; top:1px;  border:1px solid #808080";
	var afterSpaceBetweenValueContainer = addChild(afterSpaceBetweenContainer,"div",afterSpaceBetweenValueContainer);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:58px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_afterSpaceBetween";
	if(param.paragraph_afterSpaceBetween)	inputValueProperty.value = param.paragraph_afterSpaceBetween
	else inputValueProperty.value = "自动";
	var inputValue = addChild(afterSpaceBetweenValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:64px; top:1px";
	addChild(afterSpaceBetweenValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:64px; top:2px";
	addChild(afterSpaceBetweenValueContainer,"div",imageUpPeroperty).onclick = down
	
	var lineSpacingContainerProperty = {};
	lineSpacingContainerProperty.style = "height:40px; width:80px; position:absolute; left:190px; top:0px;"
	lineSpacingContainerProperty.innerHTML = "行距(N)"
	var lineSpacingContainer = addChild(spaceBetweenContainer,"div",lineSpacingContainerProperty);
	var lineSpacingSelectProperty = {};
	lineSpacingSelectProperty.size = "1";
	lineSpacingSelectProperty.style = "margin-top:5px; width:80px"
	lineSpacingSelectProperty.id  = "paragraph_lineSpacing"
	var lineSpacingSelect = addChild(lineSpacingContainer,"select",lineSpacingSelectProperty);
	lineSpacingSelect.onchange = lineSpacingSelectChange;
	lineSpacingArray = [{"name":"单位行距","value":"1","defaultName":"default"},{"name":"1.5倍行距","value":"1.5"},{"name":"2倍行距","value":"2"},{"name":"最小值","value":"min"},{"name":"固定值","value":"fixed"},{"name":"多倍行距","value":"multi"}];
	for(var i = 0; i < lineSpacingArray.length; i++){
		var optionProperty = {};
		optionProperty.value = lineSpacingArray[i].value;
		optionProperty.innerHTML = lineSpacingArray[i].name;
		if(param.paragraph_lineSpacing){if(param.paragraph_lineSpacing ==lineSpacingArray[i].value)	optionProperty.selected = "true";}
		else if(lineSpacingArray[i].defaultName)	{optionProperty.selected = "true";}
		addChild(lineSpacingSelect,"option",optionProperty)
	}
	
	var lineSpacingValueContainerProperty = {};
	lineSpacingValueContainerProperty.style = "height:40px; width:70px; position:absolute; left:280px; top:0px;"
	lineSpacingValueContainerProperty.innerHTML = "设置值(A)"
	var lineSpacingValueContainer = addChild(spaceBetweenContainer,"div",lineSpacingValueContainerProperty);
	var lineSpacingValueDivContainerProperty = {};
	lineSpacingValueDivContainerProperty.style = " height:16px; width:70px; position:absolute; left:0px; top:21px;  border:1px solid #808080";
	var lineSpacingValueDivContainer = addChild(lineSpacingValueContainer,"div",lineSpacingValueDivContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:48px; float:left; position:absolute; padding-left:5px;";
	inputValueProperty.id="paragraph_lineSpacingValue";
	if(param.paragraph_lineSpacingValue)	inputValueProperty.value = param.paragraph_lineSpacingValue;
	else 	inputValueProperty.value = "";
	var inputValue = addChild(lineSpacingValueDivContainer,"input",inputValueProperty);
	inputValue.onchange = lineSpacingValueChange;
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:54px; top:1px";
	addChild(lineSpacingValueDivContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:54px; top:2px";
	addChild(lineSpacingValueDivContainer,"div",imageUpPeroperty).onclick = down;

	//预览标题
	var spaceBetweenTitlePeroperty = {};
	spaceBetweenTitlePeroperty.innerHTML = "预览";
	spaceBetweenTitlePeroperty.style = "margin-top:20px;margin-left:10px;height:20px;line-height:20px;position:relative";
	var spaceBetweenTitle = addChild(showContainer,"div",spaceBetweenTitlePeroperty);
	var spaceBetweenLinePeroperty = {};
	spaceBetweenLinePeroperty.style = "background-image:url(rs/img/word/start/font_css_line.jpg); height:20px; width:330px; position:absolute; left:40px; top:0px; background-repeat:repeat-x; background-position:center";
	addChild(spaceBetweenTitle,"div",spaceBetweenLinePeroperty);
	
	var showButtonProperty = {};
	showButtonProperty.style = "margin-top:5px;position:relative;height:25px";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:absolute;left:230px;width:70px"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:absolute;left:325px;width:70px"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}

word.dialog.font.fontfamily = function(e, t) {
	// 停止事件冒泡
	var a = this
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();
	var group2 = document.getElementsByClassName("group2")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "left:10px; top:30px; height:320px; width:150; overflow-y: scroll";
	var dialog = addChild(group2, "div", dialogProperty);
	// 主题字体标签
	var themeProperty = {};
	themeProperty.class = "title";
	themeProperty.style = "height:20px;width:150px; padding:2px 5px;";
	themeProperty.innerHTML = "主题字体";
	addChild(dialog, "div", themeProperty);

	var themeArray = ["Cambria_(标题)", "Calibri_(正文)", "宋体_(标题)", "宋体_(正文)"]
	for (a in themeArray) {
		var font1 = themeArray[a].split("_")[0];
		var font2 = themeArray[a].split("_")[1];
		var themeFontProperty = {};
		themeFontProperty.class = "container";
		themeFontProperty.style = "height:20px;";
		themeFontProperty.value = themeArray[a];
		themeFontProperty.t = t;
		var themeFont = addChild(dialog, "div", themeFontProperty)
		themeFontProperty1 = {};
		themeFontProperty1.innerHTML = font1;
		themeFontProperty1.style = "margin-left:20px; font-size:120%";
		addChild(themeFont, "font", themeFontProperty1);
		themeFontProperty2 = {};
		themeFontProperty2.innerHTML = font2;
		themeFontProperty2.style = "float:right; font-size:100%; margin-right:10px";
		addChild(themeFont, "font", themeFontProperty2);
	}
	// 所有字体标签
	var fontFamilyAllProperty = {};
	fontFamilyAllProperty.class = "title";
	fontFamilyAllProperty.style = "height:20px;width:150px; padding:2px 5px;";
	fontFamilyAllProperty.innerHTML = "所有字体";
	addChild(dialog, "div", fontFamilyAllProperty);
	for (var i = 0; i < word.conts.fontFamilyArray.length; i++) {
		var eachFontProperty = {};
		eachFontProperty.class = "container";
		eachFontProperty.style = "height:25px;";
		eachFontProperty.value = word.conts.fontFamilyArray[i];
		eachFontProperty.t = t;
		var eachFont = addChild(dialog, "div", eachFontProperty)
		var eachFontImgProperty = {};
		eachFontImgProperty.src = "./rs/img/word/start/fontFamily_font.jpg";
		eachFontImgProperty.style = "margin:5px";
		addChild(eachFont, "img", eachFontImgProperty);
		var eachFontProperty = {};
		eachFontProperty.style = "position:absolute; left:30px; font-size:120%; font-family:"
				+ word.conts.fontFamilyArray[i];
		eachFontProperty.innerHTML = word.conts.fontFamilyArray[i];
		var a = addChild(eachFont, "font", eachFontProperty);
		a.style.top = 135 + i * 25 + "px";
	}
}
word.dialog.font.fontsize = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var group2 = document.getElementsByClassName("group2")[0];
	var fontSizeDialogProperty = {};
	fontSizeDialogProperty.class = "dialog";
	fontSizeDialogProperty.style = "left:100px; top:30px; height:250px; width:55px; overflow-y:scroll";
	var fontSizeDialog = addChild(group2, "div", fontSizeDialogProperty);
	var fontSizeProperty = {};
	fontSizeProperty.style = "width:30px; margin:3px";
	fontSizeProperty.class = "container";
	fontSizeProperty.t = t;
	addMoreChild(fontSizeDialog, "div", fontSizeProperty,
			word.conts.fontSizeArray);
}
word.dialog.font.underlineselect = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var group2 = document.getElementsByClassName("group2")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "height:255px; width:180px; top:53px; left:57px";
	var dialog = addChild(group2, "div", dialogProperty);
	// 各种下划线容器
	var underLineContainerProperty = {};
	underLineContainerProperty.style = "height:200px; overflow-y:scroll; border-bottom:1px solid #E2E4E7; ";
	var underLineContainer = addChild(dialog, "div", underLineContainerProperty);
	var underLineTitleArray = ["下划线", "双下划线", "粗线", "点式下划线", "虚下划线", "点-短下划线",
			"点-点-短下划线", "波浪线"]
	for (var i = 0; i < underLineTitleArray.length; i++) {
		var underLineProperty = {}
		underLineProperty.style = "height:25px; background-image:url(./rs/img/word/start/underlineselect_"
				+ (i + 1)
				+ ".jpg); background-repeat:no-repeat; background-position:center";
		underLineProperty.class = "container";
		underLineProperty.title = underLineTitleArray[i];
		underLineProperty.value = underLineTitleArray[i];
		underLineProperty.t = t;
		addChild(underLineContainer, "div", underLineProperty);
	}
	// 其他下划线
	var otherUnderLineProperty = {};
	otherUnderLineProperty.class = "container";
	otherUnderLineProperty.style = "height:25px";
	otherUnderLineProperty.value = "其他下划线";
	var otherUnderLineContainer = addChild(dialog, "div",
			otherUnderLineProperty);
	ordinate(otherUnderLineContainer, 25, 30);
	var otherUnderLineFonrProperty = {};
	otherUnderLineFonrProperty.style = "position:absolute; top:205px; left:40px";
	otherUnderLineFonrProperty.innerHTML = "其他下划线(M)..."
	addChild(otherUnderLineContainer, "font", otherUnderLineFonrProperty);
	// 下划线颜色
	var underLineColorProperty = {};
	underLineColorProperty.class = "container";
	underLineColorProperty.style = "height:25px";
	underLineColorProperty.value = "下划线颜色";
	underLineProperty.t = t;
	var underLineColorContainer = addChild(dialog, "div",
			underLineColorProperty);
	var underLineColorImageProperty = {};
	underLineColorImageProperty.style = "margin:3px 6px";
	underLineColorImageProperty.src = "./rs/img/word/start/underLineColor.jpg";
	addChild(underLineColorContainer, "img", underLineColorImageProperty);
	ordinate(underLineColorContainer, 24);
	var underLineColorFontProperty = {};
	underLineColorFontProperty.style = "position:absolute; top:230px; left:40px";
	underLineColorFontProperty.innerHTML = "下划线颜色(U)";
	addChild(underLineColorContainer, "font", underLineColorFontProperty);
	var underLineColorImageProperty = {};
	underLineColorImageProperty.style = "margin:9px 10px; float:right";
	underLineColorImageProperty.src = "./rs/img/word/start/underlineselect_right.jpg";
	addChild(underLineColorContainer, "img", underLineColorImageProperty);
}

word.dialog.font.fontcolorprominentselect = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var group2 = document.getElementsByClassName("group2")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "width:180px; height:165px; top:53px; left:118px";
	var dialog = addChild(group2, "div", dialogProperty);
	// 颜色容器
	var colorContainerProperty = {};
	colorContainerProperty.style = "height:110px;";
	var colorContainer = addChild(dialog, "div", colorContainerProperty)
	var colorArray = [{
				"黄色" : "#FFFF00"
			}, {
				"鲜绿" : "#00FF00"
			}, {
				"青绿" : "#00FFFF"
			}, {
				"粉红" : "#FF00FF"
			}, {
				"蓝色" : "#0000FF"
			}, {
				"红色" : "#FF0000"
			}, {
				"深蓝" : "#000080"
			}, {
				"青色" : "#008080"
			}, {
				"绿色" : "#008000"
			}, {
				"紫罗兰" : "#800080"
			}, {
				"深红" : "#800000"
			}, {
				"深黄" : "#808000"
			}, {
				"灰色 -50%" : "#808080"
			}, {
				"灰色 -25%" : "#C0C0C0"
			}, {
				"黑色" : "#000000"
			}];
	for (var i = 0; i < colorArray.length; i++) {
		var eachColorProperty = {};
		eachColorProperty.class = "color";
		for (a in colorArray[i]) {
			eachColorProperty.value = colorArray[i][a];
			eachColorProperty.style = "margin:4px; height:25px; width:25px; float:left;background-color:"
					+ colorArray[i][a];
			eachColorProperty.title = a;
			eachColorProperty.t = t;
		}
		addChild(colorContainer, "div", eachColorProperty);
	}
	// 无颜色行
	var noColorContianerProperty = {};
	noColorContianerProperty.class = "container";
	noColorContianerProperty.style = "height:25px; border-bottom:1px solid #E2E4E7";
	noColorContianerProperty.value = "无颜色";
	noColorContianerProperty.t = t;
	var noColorContianer = addChild(dialog, "div", noColorContianerProperty);
	noColorImageProperty = {};
	noColorImageProperty.src = "./rs/img/word/start/fontColorProminentSelect_noColor.jpg";
	noColorImageProperty.style = "margin:1px 5px;"
	addChild(noColorContianer, "img", noColorImageProperty)
	ordinate(noColorContianer, 24);
	var noColorFontProperty = {};
	noColorFontProperty.innerHTML = "无颜色(N)";
	noColorFontProperty.style = "position:absolute; top:115px; left:40px";
	addChild(noColorContianer, "font", noColorFontProperty);
	// 突出行
	var highlightedContainerProperty = {};
	highlightedContainerProperty.class = "container";
	highlightedContainerProperty.style = "height:25px";
	highlightedContainerProperty.value = "停止突出显示";
	highlightedContainerProperty.t = t;
	var highlightedContainer = addChild(dialog, "div",
			highlightedContainerProperty);
	ordinate(highlightedContainer, 25, 32);
	var highlightedFontProperty = {};
	highlightedFontProperty.innerHTML = "停止突出显示(S)";
	highlightedFontProperty.style = "position:absolute; top:142px; left:40px";
	addChild(highlightedContainer, "font", highlightedFontProperty);
}

word.dialog.font.fontcolorselecet = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();
	var group2 = document.getElementsByClassName("group2")[0];
	// 弹出div
	var dialogProperty = {};
	dialogProperty.style = "top:53px; left:154px; height:240px; width:180px";
	dialogProperty.class = "dialog";
	var dialog = addChild(group2, "div", dialogProperty);
	// 自动行
	var autoContainerProperty = {};
	autoContainerProperty.class = "container";
	autoContainerProperty.style = "height:25px";
	autoContainerProperty.value = "自动";
	autoContainerProperty.t = t;
	var autoContainer = addChild(dialog, "div", autoContainerProperty);
	var autoContainerImgProperty = {};
	autoContainerImgProperty.style = "margin:2px 5px";
	autoContainerImgProperty.src = "./rs/img/word/start/fontColorSelecet_auto.jpg";
	addChild(autoContainer, "img", autoContainerImgProperty);
	ordinate(autoContainer, 24);
	autoContainerFontProperty = {};
	autoContainerFontProperty.innerHTML = "自动(A)";
	autoContainerFontProperty.style = "position:absolute;top:5px;left:40px";
	addChild(autoContainer, "font", autoContainerFontProperty);
	// 色板模板
	var colorModalDiv = colorModal(t);
	dialog.appendChild(colorModalDiv);
	// 其他颜色
	var otherColorProperty = {}
	otherColorProperty.style = "height:25px";
	otherColorProperty.class = "container";
	otherColorProperty.value = "其他颜色";
	otherColorProperty.t = t;
	var otherColor = addChild(dialog, "div", otherColorProperty);
	var otherColorImgProperty = {};
	otherColorImgProperty.style = "margin:5px";
	otherColorImgProperty.src = "./rs/img/word/start/fontColorSelecet_palette.jpg";
	addChild(otherColor, "img", otherColorImgProperty);
	ordinate(otherColor, 25);
	otherColorFontProperty = {};
	otherColorFontProperty.innerHTML = "其他颜色(M)...";
	otherColorFontProperty.style = "position:absolute;top:190px;left:30px";
	addChild(otherColor, "font", otherColorFontProperty);
	// 渐变行
	var shadeProperty = {}
	shadeProperty.style = "height:25px";
	shadeProperty.class = "container";
	shadeProperty.t = t;
	shadeProperty.value = "渐变";
	var shade = addChild(dialog, "div", shadeProperty);
	var shadeImgProperty = {};
	shadeImgProperty.style = "margin:5px";
	shadeImgProperty.src = "./rs/img/word/start/fontColorSelecet_shade.jpg";
	addChild(shade, "img", shadeImgProperty);
	ordinate(shade, 25);
	shadeFontProperty = {};
	shadeFontProperty.innerHTML = "渐变(G)";
	shadeFontProperty.style = "position:absolute;top:215px;left:30px";
	addChild(shade, "font", shadeFontProperty);
}

word.dialog.paragraph = {};
word.dialog.paragraph.rowspace = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();
	var group3 = document.getElementsByClassName("group3")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	//dialogProperty.style = "top:53px; left:105px; width:130px; height:230px;";
	dialogProperty.style = "top:28px; left:55px; width:130px; height:230px;";
	var dialong = addChild(group3, "div", dialogProperty)
	for (var i = 0; i < word.conts.rowSpaceArray.length; i++) {
		var property=word.conts.rowSpaceArray[i];
		var rowspaceContainerProperty = {};
		rowspaceContainerProperty.style = "height:25px";
		rowspaceContainerProperty.class = "container";
		rowspaceContainerProperty.value = property.value;
		rowspaceContainerProperty.t = t;
		var rowspaceContainer = addChild(dialong, "div",
				rowspaceContainerProperty);
		if (i == 6){
			rowspaceContainer.style.borderBottom = "1px solid #E2E4E7";
		}
		if (i > 6) {
			var imageProperty = {}
			if (i == 7) {
				imageProperty.src = "./rs/img/word/start/rowspace_beforeParagraph.jpg";
				imageProperty.style = "position:absolute; left:5px; top:180px";
				rowspaceContainer.setAttribute("value",property.value);
			} else if (i == 8) {
				imageProperty.src = "./rs/img/word/start/rowspace_afterParagraph.jpg";
				imageProperty.style = "position:absolute; left:5px; top:205px";
				rowspaceContainer.setAttribute("value",property.value);
			}
			addChild(rowspaceContainer, "img", imageProperty)
		}
		ordinate(rowspaceContainer, 25, 25);
		var eachFontProperty = {};
		eachFontProperty.style = "position:absolute; left:30px;";
		eachFontProperty.innerHTML = property.name;
		var a = addChild(rowspaceContainer, "font", eachFontProperty);
		a.style.top = 4 + i * 25 + "px";
	}
}
word.dialog.paragraph.backcolorselect = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();
	var group3 = document.getElementsByClassName("group3")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "top:53px; left:161px; width:180px; height:215px;";
	var dialog = addChild(group3, "div", dialogProperty);
	// 色板
	var colorModalDiv = colorModal(t);
	dialog.appendChild(colorModalDiv);
	// 无颜色行
	var noColorContianerProperty = {};
	noColorContianerProperty.class = "container";
	noColorContianerProperty.style = "height:25px; border-bottom:1px solid #E2E4E7";
	noColorContianerProperty.value = "无颜色";
	noColorContianerProperty.t = t;
	var noColorContianer = addChild(dialog, "div", noColorContianerProperty);
	noColorImageProperty = {};
	noColorImageProperty.src = "./rs/img/word/start/fontColorProminentSelect_noColor.jpg";
	noColorImageProperty.style = "margin:1px 5px;"
	addChild(noColorContianer, "img", noColorImageProperty)
	ordinate(noColorContianer, 24);
	var noColorFontProperty = {};
	noColorFontProperty.innerHTML = "无颜色(N)";
	noColorFontProperty.style = "position:absolute; top:165px; left:40px";
	addChild(noColorContianer, "font", noColorFontProperty);
	// 其他颜色
	var otherColorProperty = {}
	otherColorProperty.style = "height:25px";
	otherColorProperty.class = "container";
	otherColorProperty.value = "其他颜色";
	otherColorProperty.t = t;
	var otherColor = addChild(dialog, "div", otherColorProperty);
	var otherColorImgProperty = {};
	otherColorImgProperty.style = "margin:5px";
	otherColorImgProperty.src = "./rs/img/word/start/fontColorSelecet_palette.jpg";
	addChild(otherColor, "img", otherColorImgProperty);
	ordinate(otherColor, 25, 6);
	otherColorFontProperty = {};
	otherColorFontProperty.innerHTML = "其他颜色(M)...";
	otherColorFontProperty.style = "position:absolute;top:190px;left:40px";
	addChild(otherColor, "font", otherColorFontProperty);
}

word.dialog.insert = {}
word.dialog.insert.table = function(e, t) {
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "width:197px; height:210px; top:80px; left:5px;";
	var insert_group2 = document.getElementsByClassName("insert_group3")[0];
	var dialog = addChild(insert_group2, "div", dialogProperty);
	var tableTitleProperty = {};
	tableTitleProperty.class = "title";
	tableTitleProperty.style = "height:25px; line-height:25px;padding-left:10px";
	tableTitleProperty.innerHTML = "插入表格";
	var tableTitle = addChild(dialog, "div", tableTitleProperty);
	var tableDivProperty = {};
	tableDivProperty.style = "height:157px;width:197px; border-bottom:1px solid #E2E4E7";
	var tableDiv = addChild(dialog, "div", tableDivProperty);
	for (var i = 0; i < 80; i++) {
		var cellProperty = {};
		cellProperty.style = "height:14px; width:14px; border:1px solid #000000; float:left; margin:1.5px; ";
		cellProperty.id = parseInt(i / 10) + "" + i % 10;
		if (i % 10 == 0)
			cellProperty.style += "margin-left:5px;"
			addChild(tableDiv,"div",cellProperty);
	}
	var max_x = 0,x=0;
	var max_y = 0,y=0;
	tableDiv.onmousemove = function(event) {
		x = parseInt((event.clientX -199) / 19) + 1;
		y = parseInt((event.clientY -146) / 19) + 1;
		tableTitle.innerHTML = x + "x" + y + " 表格";
		if (max_x < x)
			max_x = x;
		if (max_y < y)
			max_y = y;
		// console.log(x,y,max_x,max_y)
		for (var i = 0; i < y; i++) {
			for (var j = 0; j < x; j++) {
				var id = i + "" + j;
				var div = document.getElementById(id);
				if (div)
					div.style.borderColor = "#EF4810";
			}
		}
		if (max_y > y) {
			for (var i = y; i < max_y; i++) {
				for (var j = 0; j < max_x; j++) {
					var id = i + "" + j;
					var div = document.getElementById(id);
					if (div)
						div.style.borderColor = "#000000";
				}
			}
			max_y = y;
		} else if (max_x > x) {
			for (var i = 0; i < y; i++) {
				for (var j = x; j < max_x; j++) {
					var id = i + "" + j;
					var div = document.getElementById(id);
					if (div)
						div.style.borderColor = "#000000";
				}
			}
		}
	}
	 tableDiv.onclick=function(){
	 	word.insert.table(x,y);
	 }
	tableDiv.onmouseout = function() {
		tableTitle.innerHTML = "插入表格";
		var divs = tableDiv.getElementsByTagName("div");
		for (var i = 0; i < divs.length; i++) {
			divs[i].style.borderColor = "#000000";
		}
	}
	var insertTableProperty = {};
	insertTableProperty.class = "container";
	insertTableProperty.style = "height:25px;"
	insertTableProperty.value = "插入表格";
	insertTableProperty.t = t;
	var insertTable = addChild(dialog, "div", insertTableProperty);
	var imageProperty = {};
	imageProperty.src = "./rs/img/word/insert/table_insertTable.jpg";
	imageProperty.style = "margin:6px"
	addChild(insertTable, "img", imageProperty);
	ordinate(insertTable, 25)
	var fontProperty = {};
	fontProperty.style = "position:absolute; top:190px;left:35px";
	fontProperty.innerHTML = "插入表格(I)...";
	addChild(insertTable, "font", fontProperty)
}

word.dialog.insert.insertTable = function(){
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;

	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; width:245px; height:130px; z-index:100000; left:"+(width-245)/2+"px; top:"+(height-130)/2+"px; border:1px solid #FFFFFF; background-color:#D4D0C8";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var cellsValue  = document.getElementById("insertTable_rowNumberValue").value;
		var rowsValue  = document.getElementById("insertTable_lineNumberValue").value;
		//alert("rowValue = "+rowValue+ "  ,lineValue = "+lineValue)
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		word.insert.table(rowsValue,cellsValue);
	}
	var up = function(){
		var value =  this.previousSibling.value;
		this.previousSibling.value = parseInt(value)+1;
	}
	var down = function(){
		var value =  this.previousSibling.previousSibling.value;
		if(value == 1) return;
		this.previousSibling.previousSibling.value = parseInt(value)-1;
	}
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "插入表格";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/insert/table_insertTable_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	
	var tableSizeContainerBytableSizeProperty ={};
	tableSizeContainerBytableSizeProperty.style= "height:65px;";
	var tableSizeContainer = addChild(showDiv,"div",tableSizeContainerBytableSizeProperty);
	
	var tableSizeTitleProperty = {};
	tableSizeTitleProperty.style = "height:20px"
	var tableSizeTitle = addChild(tableSizeContainer,"div",tableSizeTitleProperty)
	var tableSizeFontProeprty = {};
	tableSizeFontProeprty.innerHTML = "表格尺寸";
	tableSizeFontProeprty.style = "height:20px;font-size:12px; line-height:20px; float:left;padding-left:10px"
	addChild(tableSizeTitle,"div",tableSizeFontProeprty)
	var tableSizeLineProperty ={}
	tableSizeLineProperty.style = "height:20px; margin-left:60px; background-image:url(rs/img/word/insert/table_insertTable_line.jpg); background-repeat:repeat-x; background-position:center; "
	addChild(tableSizeTitle,"div",tableSizeLineProperty);
	
	var rowNumberContainerProperty = {};
	rowNumberContainerProperty.style = "height:20px";
	var rowNumberContainer = addChild(tableSizeContainer,"div",rowNumberContainerProperty);
	var rowNumberFontProperty = {};
	rowNumberFontProperty.innerHTML = "列数(C):"
	rowNumberFontProperty.style = "height:20px;font-size:12px; line-height:20px;padding-left:20px;float:left";
	addChild(rowNumberContainer,"div",rowNumberFontProperty)
	var rowNumberValueContainerProperty = {};
	rowNumberValueContainerProperty.style = "border:1px solid #808080; height:16px; width:80px; position:relative;left:80px;float:left";
	var rowNumberValueContainer = addChild(rowNumberContainer,"div",rowNumberValueContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:63px;float:left";
	inputValueProperty.id="insertTable_rowNumberValue";
	inputValueProperty.value = "5";
	addChild(rowNumberValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/insert/table_insertTable_up.jpg); position:relative; left:64px; top:1px";
	addChild(rowNumberValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/insert/table_insertTable_down.jpg); position:relative; left:64px; top:2px";
	addChild(rowNumberValueContainer,"div",imageUpPeroperty).onclick = down;
	
	var lineNumberContainerProperty = {};
	lineNumberContainerProperty.style = "height:20px";
	var lineNumberContainer = addChild(tableSizeContainer,"div",lineNumberContainerProperty);
	var lineNumberFontProperty = {};
	lineNumberFontProperty.innerHTML = "行数(R):"
	lineNumberFontProperty.style = "height:20px;font-size:12px; line-height:20px;padding-left:20px;float:left";
	addChild(lineNumberContainer,"div",lineNumberFontProperty)
	var lineNumberValueContainerProperty = {};
	lineNumberValueContainerProperty.style = "border:1px solid #808080; height:16px; width:80px; position:relative;left:80px;float:left";
	var lineNumberValueContainer = addChild(lineNumberContainer,"div",lineNumberValueContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:63px;float:left";
	inputValueProperty.id="insertTable_lineNumberValue";
	inputValueProperty.value = "2";
	addChild(lineNumberValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/insert/table_insertTable_up.jpg); position:relative; left:64px; top:1px";
	addChild(lineNumberValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/insert/table_insertTable_down.jpg); position:relative; left:64px; top:2px";
	addChild(lineNumberValueContainer,"div",imageUpPeroperty).onclick = down;

	var showButtonProperty = {};
	showButtonProperty.style = "height:25px; margin-top:10px";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:relative;left:120px;"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:relative;left:140px;"
	addChild(showButton, "input", cancelProperty).onclick = colse;
	
}

word.dialog.insert.image = function(t) {
	var insert_image=document.getElementById("insert_image");
	var insert_group3 = insert_image.parentNode;
	var form = document.getElementById("imageUpload");
	if (form) {
		var childs=form.childNodes;
		for(var i=0;i<childs.length;i++){
			var child=childs[i];
			if(child.type=="file"){
				form.removeChild(child);
			}
		}
		var file_new=t.cloneNode(true);
		t.parentNode.appendChild(file_new);
		form.appendChild(t);
		if (t.value)
			form.submit();
		return;
	}
	var formProperty = {};
	formProperty.action = "http://eamdev/eam/web/page/word/wordImageUpload";
	formProperty.enctype = "multipart/form-data";
	formProperty.method = "post";
	//formProperty.onsubmit = "alert(1111)";
	formProperty.target = "hidden_iframe";
	formProperty.id = "imageUpload";
	formProperty.style = "display:none";
	var form = addChild(insert_group3, "form", formProperty);
	var iframeProperty = {};
	iframeProperty.name = "hidden_iframe";
	iframeProperty.style = "display:none";
	addChild(insert_group3, "iframe", iframeProperty);
	var t1_idProperty = {};
	t1_idProperty.type = "text";
	t1_idProperty.name = "t1_id";
	t1_idProperty.value=document.getElementById("t1_id").value;
	addChild(form, "input", t1_idProperty);
	var file_new=t.cloneNode(true);
	t.parentNode.appendChild(file_new);
	form.appendChild(t);
	if (t.value){
			form.submit();
	}
	
}

word.dialog.table = {}
word.dialog.table.select = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var table_group2 = document.getElementsByClassName("table_group1")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "top:80px; left:5px; width:140px; height:100px;";
	dialogProperty.t = t;
	var dialog = addChild(table_group2, "div", dialogProperty)
	var selectValue = ["选择单元格(L)", "选择列(C)", "选择行(R)", "选择表格(T)"]
	for (var i = 0; i < selectValue.length; i++) {
		var containerProperty = {};
		containerProperty.class = "container"
		containerProperty.style = "height:25px;";
		containerProperty.t = t;
		containerProperty.value = selectValue[i].split("(")[0];
		var container = addChild(dialog, "div", containerProperty);
		var imageProperty = {};
		imageProperty.style = "margin:6px";
		imageProperty.src = "./rs/img/word/table/select_" + i + ".jpg"
		addChild(container, "img", imageProperty);
		ordinate(container, 25)
		var fontProperty = {};
		fontProperty.innerHTML = selectValue[i];
		fontProperty.style = "position:absolute; top:" + (5 + i * 25)
				+ "px; left:35px";
		addChild(container, "font", fontProperty);
	}
}
word.dialog.table.deleteTable = function(e, t) {
	// 停止事件冒泡
	if (e)
		e.stopPropagation();
	else
		window.event.cancelBubble = true;
	closeDialog();

	var table_group2 = document.getElementsByClassName("table_group2")[0];
	var dialogProperty = {};
	dialogProperty.class = "dialog";
	dialogProperty.style = "top:80px; left:5px; width:140px; height:75px;";
	var dialog = addChild(table_group2, "div", dialogProperty)
	//var selectValue = ["删除单元格(D)", "删除列(C)", "删除行(R)", "删除表格(T)"]
	var selectValue = [ "删除列(C)", "删除行(R)", "删除表格(T)"]
	for (var i = 0; i < selectValue.length; i++) {
		var containerProperty = {};
		containerProperty.class = "container"
		containerProperty.style = "height:25px;";
		containerProperty.t = t;
		containerProperty.value = selectValue[i].split("(")[0];
		var container = addChild(dialog, "div", containerProperty);
		var imageProperty = {};
		imageProperty.style = "margin:5.5px;";
		imageProperty.src = "./rs/img/word/table/delete_" + (i+1) + ".jpg";
		addChild(container, "img", imageProperty);
		ordinate(container, 25);
		var fontProperty = {};
		fontProperty.innerHTML = selectValue[i];
		fontProperty.style = "position:absolute; top:" + (5 + i * 25)
				+ "px; left:35px";
		addChild(container, "font", fontProperty);
	}
}
/*word.dialog.table.deleteTable.deleteCell = function() {
	var width = (document.body.scrollWidth > document.body.clientWidth)
			? document.body.scrollWidth
			: document.body.clientWidth;// 如果滚动条的宽度大于页面的宽度，取得滚动条的宽度，否则取页面宽度
	var height = (document.body.scrollHeight > document.body.clientHeight)
			? document.body.scrollHeight
			: document.body.clientHeight;// 如果滚动条的高度大于页面的高度，取得滚动条的高度，否则取高度

	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:" + width
			+ "px; height:" + height + "px; z-index:99999; left:0px; top:0px;";
	var coverDiv = addChild(document.body, "div", coverDivProperty);

	var showdDivProperty = {};
	showdDivProperty.id = "show";
	showdDivProperty.style = "position:absolute; width:170px; height:140px; z-index:100000; left:"+ (width - 200)/ 2+ "px; top:"+ (height - 200)/ 2+ "px; border:1px solid #FFFFFF; background-color:#D4D0C8";
	var showDiv = addChild(document.body, "div", showdDivProperty);

	var showTitleProperty = {};
	showTitleProperty.innerHTML = "删除单元格";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/table/deleteCell_BackgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold; font-size:12px;line-height:20px";
	addChild(showDiv, "div", showTitleProperty);

	var showContentProperty = {};
	showContentProperty.style = "height:95px;";
	var showContent = addChild(showDiv, "div", showContentProperty);
	var array = ["右侧单元格左移(L)", "下方单元格上移(U)", "删除整行(R)", "删除整列(C)"];
	for (var i = 0; i < array.length; i++) {
		var radioPerperty = {};
		if (i == 0)
			radioPerperty.checked = "checked";
		radioPerperty.type = "radio";
		radioPerperty.value = array[i].split("(")[0];
		radioPerperty.name = "select";
		radioPerperty.style = "margin:2px;"
		addChild(showContent, "input", radioPerperty);
		var fontPerperty = {};
		fontPerperty.innerHTML = array[i];
		fontPerperty.style = "font-size:12px;position:relative; top:-4px"
		addChild(showContent, "font", fontPerperty);
		addChild(showContent, "br")
	}
	var colse = function() {
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function() {
		var returnvalue = "";
		var allRadio = document.getElementsByName("select");
		for (var i = 0; i < allRadio.length; i++) {
			if (allRadio[i].checked)
				returnvalue = allRadio[i].value;
		}
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		alert(returnvalue)
	}
	var showButtonProperty = {};
	showButtonProperty.style = "height:25px;";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:relative;left:20px;"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:relative;left:50px;"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}*/

word.dialog.table.splitCells = function(){
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;
	var coverDivProperty = {};
	
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; width:180px; height:120px; z-index:100000; left:"+(width-180)/2+"px; top:"+(height-140)/2+"px; border:1px solid #FFFFFF; background-color:#D4D0C8";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var cellsValue  = document.getElementById("insertTable_rowNumberValue").value;
		var rowsValue  = document.getElementById("insertTable_lineNumberValue").value;
		//alert("rowValue = "+rowValue+ "  ,lineValue = "+lineValue+ "   ,checkbox = "+checkbox.checked)
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		word.table.splitCells(rowsValue,cellsValue);
	}
	var up = function(){
		var target=content.target;
		if(target!=null){
			var td=word.utils.getParentTd(target);
			if(td.rowSpan>1&&this.previousSibling.id=="insertTable_lineNumberValue"){
				this.previousSibling.value = td.rowSpan;
			}else if(td.colSpan>1&&this.previousSibling.id=="insertTable_rowNumberValue"){
				this.previousSibling.value = td.colSpan;
			}else{
				var value =  this.previousSibling.value;
				this.previousSibling.value = parseInt(value)+1;
			}
		}
	}
	var down = function(){
		var target=content.target;
		if(target!=null){
			var td=word.utils.getParentTd(target);
			if(td.rowSpan>1&&this.previousSibling.previousSibling.id=="insertTable_lineNumberValue"){
				this.previousSibling.previousSibling.value = 1;
				this.previousSibling.previousSibling.value = 1;
			}else if(td.colSpan>1&&this.previousSibling.previousSibling.id=="insertTable_rowNumberValue"){
				this.previousSibling.previousSibling.value = 1;
			}else{
				var value =  this.previousSibling.previousSibling.value;
				if(value == 1) return;
				this.previousSibling.previousSibling.value = parseInt(value)-1;
			}
		}
	}
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "拆分单元格";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/table/splitCells_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	
	var showContainerProperty ={};
	showContainerProperty.style= "height:55px;";
	var showContainer = addChild(showDiv,"div",showContainerProperty);
	
	var rowNumberContainerProperty = {};
	rowNumberContainerProperty.style = "height:20px;margin-top:5px";
	var rowNumberContainer = addChild(showContainer,"div",rowNumberContainerProperty);
	var rowNumberFontProperty = {};
	rowNumberFontProperty.innerHTML = "列数(C):"
	rowNumberFontProperty.style = "height:20px;font-size:12px; line-height:20px;padding-left:10px;float:left";
	addChild(rowNumberContainer,"div",rowNumberFontProperty)
	var rowNumberValueContainerProperty = {};
	rowNumberValueContainerProperty.style = "border:1px solid #808080; height:16px; width:80px; position:relative;left:10px;float:left";
	var rowNumberValueContainer = addChild(rowNumberContainer,"div",rowNumberValueContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:63px;float:left";
	inputValueProperty.id="insertTable_rowNumberValue";
	inputValueProperty.value = "1";
	addChild(rowNumberValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/splitCells_up.jpg); position:relative; left:64px; top:1px";
	addChild(rowNumberValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/splitCells_down.jpg); position:relative; left:64px; top:2px";
	addChild(rowNumberValueContainer,"div",imageUpPeroperty).onclick = down;
	
	var lineNumberContainerProperty = {};
	lineNumberContainerProperty.style = "height:20px;margin-top:5px";
	var lineNumberContainer = addChild(showContainer,"div",lineNumberContainerProperty);
	var lineNumberFontProperty = {};
	lineNumberFontProperty.innerHTML = "行数(R):"
	lineNumberFontProperty.style = "height:20px;font-size:12px; line-height:20px;padding-left:10px;float:left";
	addChild(lineNumberContainer,"div",lineNumberFontProperty)
	var lineNumberValueContainerProperty = {};
	lineNumberValueContainerProperty.style = "border:1px solid #808080; height:16px; width:80px; position:relative;left:10px;float:left";
	var lineNumberValueContainer = addChild(lineNumberContainer,"div",lineNumberValueContainerProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:63px;float:left";
	inputValueProperty.id="insertTable_lineNumberValue";
	inputValueProperty.value = "1";
	addChild(lineNumberValueContainer,"input",inputValueProperty);
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/splitCells_up.jpg); position:relative; left:64px; top:1px";
	addChild(lineNumberValueContainer,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/splitCells_down.jpg); position:relative; left:64px; top:2px";
	addChild(lineNumberValueContainer,"div",imageUpPeroperty).onclick = down;

	var showButtonProperty = {};
	showButtonProperty.style = "height:25px; margin-top:10px";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:relative;left:30px;"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:relative;left:60px;"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}

word.dialog.table.property =function(){
	var returnValue={};
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;
	
	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; font-size:12px;width:420px; height:320px; z-index:100000; left:"+(width-420)/2+"px; top:"+(height-280)/3+"px; border:1px solid #FFFFFF; background-color:#D4D0C8";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var paramWidth = document.getElementById("paramWidth");
		var sizeWidth = "";
		var align = showDiv.getElementsByClassName("active")[0].attributes.value.value;
		var marginLeftValue = "";
		if(paramWidth.checked)	sizeWidth = document.getElementById("property_sizeWidth").value;
		if(align == "左对齐") marginLeftValue =document.getElementById("property_marginLeft").value;
		//alert("sizeWidth = "+sizeWidth+",  align = "+align+",  marginLeftValue ="+marginLeftValue);
		returnValue.align=align;
		returnValue.marginLeftValue=marginLeftValue.replace(" 厘米","em");
		alert($myStr(returnValue));
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		word.table.setProperty(returnValue);
	}
	var sizeValueCheckboxChange = function(){
		var sizeWidth = document.getElementById("property_sizeWidth");
		var sizeUnitFont = document.getElementById("property_sizeUnitFont");
		var sizeUnit = document.getElementById("property_sizeUnit");
		var paramWidth = document.getElementById("paramWidth");
		if(paramWidth.checked) {
			sizeWidth.disabled = "";
			sizeUnit.disabled = "";
			sizeUnitFont.style.color = "#000000";
		}
		else{
			sizeWidth.disabled = "true";
			sizeUnit.disabled = "true";
			sizeUnitFont.style.color = "#808080";
		}
	}
	var inputValueChange = function(){
		var sizeUnit = document.getElementById("property_sizeUnit");
		var value = parseFloat(this.value);
		if(this.value){
			if(!isNaN(value)){
				if(value > 55.87) {
					if(value.toString().indexOf(".") != -1)	this.value = value.toFixed(1)+"%";
					else	this.value = value+"%";
					sizeUnit.value = "百分比"
				}
				else if(value < 0){
					sizeUnit.value = "厘米";
					alert("度量值必须介于 0 厘米 和 55.87 厘米 之间");
					this.value = "";
				}
				else{
					if(value.toString().indexOf(".") != -1){
						if(sizeUnit.value == "百分比")	this.value = value.toFixed(1)+"%";
						else this.value = value.toFixed(2)+" 厘米";
					}
					else{
						if(sizeUnit.value == "百分比")	this.value = value+"%";
						else this.value = value+" 厘米";
					}
				}
			}
		}
	}
	var unitChange = function(){
		var sizeWidth = document.getElementById("property_sizeWidth");
		var sizeWidthValue = parseFloat(sizeWidth.value);
		var sizeUnit = document.getElementById("property_sizeUnit").value;
		if(sizeWidthValue){
			if(sizeUnit == "百分比"){
				if(!sizeWidthValue) {sizeWidth.value = ""; alert("无效数值");}
				else if (sizeWidthValue == 0 )	sizeWidth.value  = "0%";
				else {
					if(sizeWidthValue/16.88 > 1)	sizeWidth.value  = "100%";
					else {
						if((sizeWidthValue/16.88*100).toFixed(1).toString().split(".")[1] =="0")
							sizeWidth.value = (sizeWidthValue/16.88*100).toFixed(1).toString().split(".")[0] + "%";
						else	sizeWidth.value = (sizeWidthValue/16.88*100).toFixed(1)+"%";
					}
				}
			}
			else{
				if(!sizeWidthValue) {sizeWidth.value = ""; alert("无效数值");}
				else if(sizeWidthValue == 0)	sizeWidth.value = "0 厘米";
				else {
					if(sizeWidthValue/100*16.88 > 55.87)	sizeWidth.value  = "55.87 厘米";
					else {
						if((sizeWidthValue/100*16.88).toFixed(2).toString().split(".")[1] == "00")
							sizeWidth.value = (sizeWidthValue/100*16.88).toFixed(2).toString().split(".")[0] +" 厘米";
						else	sizeWidth.value  = (sizeWidthValue/100*16.88).toFixed(2)+" 厘米";
					}
				}
			}
		}
	}
	var up = function(){
		var sizeWidth = document.getElementById("property_sizeWidth");
		var sizeWidthValue = parseFloat(sizeWidth.value);
		var sizeUnit = document.getElementById("property_sizeUnit").value;
		if(sizeWidth.disabled)	return;
		if(sizeUnit == "厘米"){
			//console.log("up-厘米",sizeWidthValue);
			if(!sizeWidthValue || sizeWidthValue < 0 ) sizeWidth.value = (0 * 10 + 1)/10 +" 厘米";
			else if (sizeWidthValue == 55.87) return;
			else	sizeWidth.value = parseInt((sizeWidthValue* 10) + 1)/10 +" 厘米";
		}
		else{
			//console.log("up-%",sizeWidthValue);
			if(!sizeWidthValue || sizeWidthValue < 0 )	sizeWidth.value = "1%";
			else if(sizeWidthValue == 600) return;
			else sizeWidth.value = (parseInt(sizeWidthValue)+1)+"%";
		}
	}
	var down = function(){
		var sizeWidth = document.getElementById("property_sizeWidth");
		var sizeWidthValue = parseFloat(sizeWidth.value);
		var sizeUnit = document.getElementById("property_sizeUnit").value;
		if(sizeWidth.disabled)	return;
		if(sizeUnit == "厘米"){
			//console.log("down-厘米",sizeWidthValue);
			if(!sizeWidthValue || sizeWidthValue < 0 || sizeWidthValue > 55.87)	
				sizeWidth.value = "0 厘米";
			else{
				if(sizeWidthValue.toString().indexOf(".") != -1 && sizeWidthValue.toString().split(".")[1].length == 2){
				sizeWidth.value = sizeWidthValue.toString().split(".")[0]+"."+sizeWidthValue.toString().split(".")[1].charAt(0) +" 厘米";
				}
				else sizeWidth.value = (sizeWidthValue * 10 - 1)/10 +" 厘米";
			}
		}
		else{
			//console.log("down-%",sizeWidthValue);
			if(!sizeWidthValue || sizeWidthValue < 0 || sizeWidthValue > 600)	
				sizeWidth.value = "0%";
			else{
				if(sizeWidth.value.indexOf(".") != -1){
					sizeWidth.value = sizeWidth.value.split(".")[0]+"%"
				}
				else sizeWidth.value = (sizeWidthValue - 1) +"%";
			}
		}
	}
	var alignImageChange = function(){
		var selectedAlignImage = showDiv.getElementsByClassName("active")[0];
		selectedAlignImage.style.backgroundImage = selectedAlignImage.style.backgroundImage.split("-")[0]+"-1.jpg\"\)";
		selectedAlignImage.className = "";
		this.style.backgroundImage = this.style.backgroundImage.split("-")[0]+"-2.jpg\"\)";
		this.className = "active";
		if(this.id != "property_align_left") document.getElementById("property_marginLeft").disabled = "true";
		else	document.getElementById("property_marginLeft").disabled = "";
	}
	var marginLeftUp = function(){
		var marginLeft = document.getElementById("property_marginLeft");
		if(marginLeft.disabled) return;
		var marginLefValue = parseFloat(marginLeft.value);
		if(marginLefValue > 38.09) return;
		else if(!marginLefValue) marginLeft.value="0.1 厘米";
		else marginLeft.value = (parseInt(marginLefValue*10)+1)/10 +" 厘米";
	}
	var marginLeftDown =function(){
		var marginLeft = document.getElementById("property_marginLeft");
		if(marginLeft.disabled) return;
		var marginLefValue = parseFloat(marginLeft.value);
		if(marginLefValue < -38.09) return;
		else if(!marginLefValue) marginLeft.value="-0.1 厘米";
		else marginLeft.value = (parseInt(marginLefValue*10)-1)/10 +" 厘米";
	}
	//显示的标题
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "表格属性";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/table/property_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	var tagsProperty = {};
	tagsProperty.style = "height:20px;margin:5px 5px 0px 5px;";
	var tags = addChild(showDiv,"div",tagsProperty);
	var fontTagProperty = {};
	fontTagProperty.innerHTML  = "表格(T)";
	fontTagProperty.style = "height:19px; width:50px; padding-left:10px; line-height:20px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #D4D0C8; z-index:100001;position:absolute";
	addChild(tags,"div",fontTagProperty);

	//显示的内容
	var showContainerProperty ={};
	showContainerProperty.style= "height:240px; margin:0px 5px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; ";
	var showContainer = addChild(showDiv,"div",showContainerProperty);
	
	var sizeTitlePropery = {};
	sizeTitlePropery.style="height:20px;margin:5px;";
	var sizeTitle = addChild(showContainer,"div",sizeTitlePropery)
	var sizeTitleFontPropery = {};
	sizeTitleFontPropery.innerHTML = "尺寸";
	sizeTitleFontPropery.style = "font-size:12px;line-height:20px;margin-left:5px;float:left";
	addChild(sizeTitle,"div",sizeTitleFontPropery);
	var sizeTitleLinePropery ={};
	sizeTitleLinePropery.style ="height:20px; background-image:url(rs/img/word/table/property_line.jpg); background-repeat:repeat-x; background-position:center; margin-left:40px";
	addChild(sizeTitle,"div",sizeTitleLinePropery)
	
	var sizeValueContainerProperty = {};
	sizeValueContainerProperty.style ="height:20px;margin:5px;";
	var sizeValueContainer = addChild(showContainer,"div",sizeValueContainerProperty);
	var sizeValueCheckboxProperty = {};
	sizeValueCheckboxProperty.value = "指定宽度";
	sizeValueCheckboxProperty.id = "paramWidth";
	sizeValueCheckboxProperty.type = "checkbox";
	sizeValueCheckboxProperty.style = "margin-left:15px";
	var sizeValueCheckbox = addChild(sizeValueContainer,"input",sizeValueCheckboxProperty);
	sizeValueCheckbox.onchange = sizeValueCheckboxChange;
	var sizeValueFontProperty = {};
	sizeValueFontProperty.innerHTML = "指定宽度(W):";
	sizeValueFontProperty.style = "font-size:12px;position:relative;top:-3px"
	addChild(sizeValueContainer,"font",sizeValueFontProperty).onclick = function(){
			if(sizeValueCheckbox.checked)	sizeValueCheckbox.checked ="";
			else	sizeValueCheckbox.checked ="true";
			sizeValueCheckboxChange();
		}
	
	var sizeValueProperty = {};
	sizeValueProperty.style = "border:1px solid #808080; height:16px; width:100px; position:absolute; left:120px; top:78px";
	var sizeValue = addChild(sizeValueContainer,"div",sizeValueProperty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:83px;float:left";
	inputValueProperty.id="property_sizeWidth";
	inputValueProperty.disabled = "true";
	inputValueProperty.value = "0 厘米";
	var inputValue = addChild(sizeValue,"input",inputValueProperty);
	inputValue.onchange = inputValueChange;
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:84px; top:1px";
	addChild(sizeValue,"div",imageUpPeroperty).onclick = up;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:84px; top:2px";
	addChild(sizeValue,"div",imageUpPeroperty).onclick = down;
	
	var unitFontProeprty = {};
	unitFontProeprty.innerHTML = "亮度单位(M):";
	unitFontProeprty.style = "font-size:12px;position:absolute;top:80px;left:250px;color:#808080";
	unitFontProeprty.id = "property_sizeUnitFont";
	addChild(sizeValueContainer,"font",unitFontProeprty)
	var unitValueProperty = {};
	unitValueProperty.style="border:1px solid #808080; height:18px; width:80px; position:absolute; left:325px; top:78px";
	unitValueProperty.size = "1";
	unitValueProperty.id = "property_sizeUnit";
	unitValueProperty.value = "厘米";
	unitValueProperty.disabled = "true";
	var unitValue = addChild(sizeValueContainer,"select",unitValueProperty);
	unitValue.onchange = unitChange;
	var unitValueOption = {};
	unitValueOption.value = "厘米";
	unitValueOption.innerHTML = "厘米";
	unitValueOption.selected = "true";
	addChild(unitValue,"option",unitValueOption);
	var unitValueOption = {};
	unitValueOption.value = "百分比";
	unitValueOption.innerHTML = "百分比";
	addChild(unitValue,"option",unitValueOption);
	
	var alignTitlePropery = {};
	alignTitlePropery.style="height:20px;margin:5px;";
	var alignTitle = addChild(showContainer,"div",alignTitlePropery)
	var alignTitleFontPropery = {};
	alignTitleFontPropery.innerHTML = "对齐方式";
	alignTitleFontPropery.style = "font-size:12px;line-height:20px;margin-left:5px;float:left;";
	addChild(alignTitle,"div",alignTitleFontPropery);
	var alignTitleLinePropery ={};
	alignTitleLinePropery.style ="height:20px; background-image:url(rs/img/word/table/property_line.jpg); background-repeat:repeat-x; background-position:center; margin-left:70px";
	addChild(alignTitle,"div",alignTitleLinePropery);
	
	var alignContainerProperty ={};
	alignContainerProperty.style = "height:115px;margin:5px;";
	var alignContainer = addChild(showContainer,"div",alignContainerProperty);
	for(var i = 0;i < 3; i++){
		var imageProperty = {};
		imageProperty.style = "width:56px;height:67px;margin-left:10px;float:left;";
		if(i==0)	{
			imageProperty.style += "background-image:url(rs/img/word/table/property_align"+i+"-2.jpg);"
			imageProperty.id = "property_align_left";
			imageProperty.class = "active";
			imageProperty.value = "左对齐"
		}
		else {
			imageProperty.style += "background-image:url(rs/img/word/table/property_align"+i+"-1.jpg);"
			if(i==1)	{imageProperty.id = "property_align_centered";	imageProperty.value = "居中";}
			else if(i ==2)	{imageProperty.id = "property_align_right";	imageProperty.value = "右对齐";}
		}	
		addChild(alignContainer,"div",imageProperty).onclick = alignImageChange;
	}
	var marginLeftProperty ={};
	marginLeftProperty.style ="font-size:12px;margin:10px;float:left";
	marginLeftProperty.innerHTML = "左缩进(I):"
	var marginLeft = addChild(alignContainer,"div",marginLeftProperty);
	var marginLeftValueProeprty = {};
	marginLeftValueProeprty.style = "border:1px solid #808080; height:16px; width:100px; position:absolute; left:220px; top:155px";
	var marginLeftValue = addChild(marginLeft,"div",marginLeftValueProeprty);
	var inputValueProperty = {};
	inputValueProperty.type= "text";
	inputValueProperty.style= "height:14px; border:0px; width:83px;float:left";
	inputValueProperty.id="property_marginLeft";
	inputValueProperty.value = "0 厘米";
	var inputValue = addChild(marginLeftValue,"input",inputValueProperty);
	inputValue.onchange = function(){
		if(!isNaN(this.value)){	
		if(parseFloat(this.value).toFixed(2).toString().split(".")[1] == "00")
			this.value = parseFloat(this.value).toFixed(2).toString().split(".")[0]+" 厘米";
		else this.value = parseFloat(this.value).toFixed(2)+" 厘米";
		}
	}
	var imageUpPeroperty = {};
	imageUpPeroperty.style ="width:16px;height:7px;background-image:url(rs/img/word/table/table_property_up.jpg); position:relative; left:84px; top:1px";
	addChild(marginLeftValue,"div",imageUpPeroperty).onclick = marginLeftUp;
	var imageDownPeroperty = {};
	imageUpPeroperty.style = "width:16px;height:7px; background-image:url(rs/img/word/table/table_property_down.jpg); position:relative; left:84px; top:2px";
	addChild(marginLeftValue,"div",imageUpPeroperty).onclick = marginLeftDown;
	
	var borderAndShadingButtonProperty = {};
	borderAndShadingButtonProperty.style = "margin-top:95px;margin-left:65px;float:left";
	borderAndShadingButtonProperty.type = "button";
	borderAndShadingButtonProperty.value = "边框和底纹(B)..."
	addChild(alignContainer,"input",borderAndShadingButtonProperty).onclick =function(){ word.dialog.table.property.borderAndShading(returnValue)};
	
	//按钮
	var showButtonProperty = {};
	showButtonProperty.style = "height:25px; margin-top:5px;position:relative;";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:absolute;left:250px;width:70px"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:absolute;left:345px;width:70px"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}

word.dialog.table.property.borderAndShading = function(returnValue){
	var width = (document.body.scrollWidth > document.body.clientWidth )? document.body.scrollWidth:document.body.clientWidth;
	var height = (document.body.scrollHeight > document.body.clientHeight )? document.body.scrollHeight:document.body.clientHeight;
	
	var coverDivProperty = {};
	coverDivProperty.id = "cover";
	coverDivProperty.style = "position:absolute; width:"+width+"px; height:"+height+"px; z-index:99999;left:0px; top:0px;";
	var coverDiv = addChild(document.body,"div",coverDivProperty);
	
	var showDivProperty = {};
	showDivProperty.id = "show";
	showDivProperty.style = "position:absolute; width:310px; height:330px; z-index:100000; left:"+(width-300)/2+"px; top:"+(height-300)/3+"px; border:1px solid #FFFFFF; background-color:#D4D0C8;font-size:12px";
	var showDiv = addChild(document.body,"div",showDivProperty);
	
	var colse = function(){
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
	}
	var confirm = function(){
		var borderSetting = showDiv.getElementsByClassName("borderSetting")[0].attributes.value.value;
		var borderStyle = showDiv.getElementsByClassName("borderStyle")[0].attributes.value.value;
		var borderColor = document.getElementById("table_property_borderAndShading_borderColorValue").style.backgroundColor;
		var borderWidth = document.getElementById("borderWidth").value;
		alert("borderSetting = "+borderSetting+",  borderStyle = "+borderStyle+",  borderColor = "+borderColor+",  borderWidth = "+borderWidth)
		document.body.removeChild(showDiv);
		document.body.removeChild(coverDiv);
		returnValue.borderSetting=borderSetting;
		returnValue.borderStyle=borderStyle;
		returnValue.borderColor=borderColor;
		returnValue.borderWidth=borderWidth;
	}
	
	var settingsChange = function(){
		var selectSettingIamge = showDiv.getElementsByClassName("borderSetting")[0];
		selectSettingIamge.style.backgroundImage = selectSettingIamge.style.backgroundImage.split("-")[0]+"-1.jpg\"\)";
		selectSettingIamge.className = "";
		this.style.backgroundImage = this.style.backgroundImage.split("-")[0]+"-2.jpg\"\)";
		this.className = "borderSetting";
	}
	var styleImageChange = function(){
		var selectStyleImage = showDiv.getElementsByClassName("borderStyle")[0];
		selectStyleImage.style.borderColor = "#ffffff";
		selectStyleImage.className = "";
		this.style.borderColor = "#0B266B";
		this.className = "borderStyle";
	}
	var colorDialog = function (e){
		if (e)	e.stopPropagation();
		else	window.event.cancelBubble = true;
		var dialogProperty = {};
		dialogProperty.style = "border:1px solid #A7ABB0; background-color:white;height:160px; width:180px;position:absolute;top:220px;left:140px";
		dialogProperty.class = "dialog";
		var dialog = addChild(showDiv,"div",dialogProperty);
		var colorModalDiv = colorModal(this);
		dialog.appendChild(colorModalDiv);
	}
	
	var showTitleProperty = {};
	showTitleProperty.innerHTML = "边框和底纹";
	showTitleProperty.style = "height:20px; background-image:url(rs/img/word/table/property_backgroundColor.jpg); background-repeat:repeat-y; margin-left:1px; margin-top:1px; color:#ffffff; font-weight:bold;font-size:12px;line-height:20px;padding-left:5px";
	addChild(showDiv,"div",showTitleProperty);
	
	var tagsProperty = {};
	tagsProperty.style = "height:20px;margin:5px 5px 0px 5px;";
	var tags = addChild(showDiv,"div",tagsProperty)
	var fontTagProperty = {};
	fontTagProperty.innerHTML  = "边框(B)";
	fontTagProperty.style = "height:19px; width:50px; padding-left:10px; line-height:20px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #D4D0C8; z-index:100001;position:absolute";
	addChild(tags,"div",fontTagProperty)

	var showContainerProperty = {};
	showContainerProperty.style = "height:250px; margin:0px 5px;border-left:1px solid #fff; border-top:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080;position:relative ";
	var showContainer = addChild(showDiv,"div",showContainerProperty);
	
	var settlingsContainerProperty = {};
	settlingsContainerProperty.style = "width:110px;height:230px;position:absolute;left:10px;top:10px;font-size:12px";
	settlingsContainerProperty.innerHTML = "设置:"
	var settlingsContainer = addChild(showContainer,"div",settlingsContainerProperty);
	for(var i = 0; i < 3;i++){
		var imageProperty = {};
		imageProperty.style = "width:87px;height:38px;margin-top:10px;";
		if(i == 2){
			imageProperty.style += "background-image:url(rs/img/word/table/property_borderAndShading_setting2-2.jpg)"
			imageProperty.class = "borderSetting";
			imageProperty.value = "all";
		}
		else 
		{
			imageProperty.style += "background-image:url(rs/img/word/table/property_borderAndShading_setting"+i+"-1.jpg)";
			if(i ==1)	imageProperty.value = "border";
			if(i ==0)	imageProperty.value = "none";
		}
		addChild(settlingsContainer,"div",imageProperty).onclick = settingsChange;
	}
	var lineProperty = {};
	lineProperty.style = "width:2px; height:230px; position:absolute;left:120px; top:10px; background-image:url(rs/img/word/table/property_borderAndShading_line.jpg);background-repeat:repeat-y;";
	addChild(showContainer,"div",lineProperty)
	
	var styleContainerProperty = {};
	styleContainerProperty.style = "width:170px;height:230px;position:absolute;left:122px;top:10px"
	var styleContainer = addChild(showContainer,"div",styleContainerProperty);
		
	var styleFontProeprty = {};
	styleFontProeprty.innerHTML = "样式(Y):";
	styleFontProeprty.style = "font-size:12px;margin-left:10px"
	addChild(styleContainer,"font",styleFontProeprty);
	var styleSelectorContainerProperty = {};
	styleSelectorContainerProperty.style = "width:150px;height:110px;overflow-y:scroll;margin-left:10px;background-color;red;border-top:1px solid #878787;border-left:1px solid #8B8B8B;border-bottom:1px solid #fff;border-right:1px solid #fff;background-color:#ffffff;"
	var styleSelectorContainer = addChild(styleContainer,"div",styleSelectorContainerProperty)
	for(var i = 0; i < 4; i++){
		var styleImageProperty = {};
		styleImageProperty.style = " width:126px; height:23px;margin:2px 3px;border:1px solid #ffffff; background-image:url(rs/img/word/table/property_borderAndShading_style"+i+".jpg);";
		if(i == 0){styleImageProperty.class = "borderStyle";styleImageProperty.style += "border-color:#0B266B";styleImageProperty.value ="solid"}
		if(i == 1){styleImageProperty.value ="dotted"}
		if(i == 2){styleImageProperty.value ="dashed"}
		if(i == 3){styleImageProperty.value ="double"}
		addChild(styleSelectorContainer,"div",styleImageProperty).onclick = styleImageChange;
	}
	
	var styleFontProeprty = {};
	styleFontProeprty.innerHTML = "颜色(C):";
	styleFontProeprty.style = "font-size:12px;margin-left:10px"
	addChild(styleContainer,"font",styleFontProeprty);
	var colorSelectDivProperty = {};
	colorSelectDivProperty.id = "table_property_borderAndShading_borderColor";
	colorSelectDivProperty.value ="#000000";
	colorSelectDivProperty.style = "background-color:#fff;height:16px;width:150px;line-height:16px;margin-left:10px;text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #fff;border-right:1px solid #fff;"
	var colorSelectDiv =addChild(styleContainer,"div",colorSelectDivProperty);
	colorSelectDiv.onclick = colorDialog;
	var colorSelectValueProperty = {};
	colorSelectValueProperty.id = "table_property_borderAndShading_borderColorValue";
	colorSelectValueProperty.style= "height:14px;width:130px;background-color:#000;margin:1px 2px;float:left";
	addChild(colorSelectDiv,"div",colorSelectValueProperty);
	var colorSelectDownImage = {};
	colorSelectDownImage.style= "width:16px;height:16px;background-image:url(rs/img/word/table/select_down.jpg);float:left";
	addChild(colorSelectDiv,"div",colorSelectDownImage)
	
	var styleFontProeprty = {};
	styleFontProeprty.innerHTML = "宽度(W):";
	styleFontProeprty.style = "font-size:12px;margin-left:10px"
	addChild(styleContainer,"font",styleFontProeprty);
	var widthSelectProperty = {};
	widthSelectProperty.value ="0.67";
	widthSelectProperty.style = "width:150px;margin-left:10px;text-align:center"
	widthSelectProperty.size = "1";
	widthSelectProperty.id = "borderWidth"
	var widthSelect =addChild(styleContainer,"select",widthSelectProperty);
	var widthArray =["0.25磅","0.5磅","0.75磅","1.0磅","1.5磅","2.25磅","3.0磅","4.5磅","6.0磅"]
	for(var i = 0; i < widthArray.length;i++){
		var optionProperty = {};
		optionProperty.innerHTML = widthArray[i];
		optionProperty.style ="text-align:center"
		optionProperty.value = (parseFloat(widthArray[i])*4/3).toFixed(2)*100/100;
		if(i ==1 )	optionProperty.selected = "true";
		addChild(widthSelect,"option",optionProperty)
		
	}
	
	
	var showButtonProperty = {};
	showButtonProperty.style = "margin-top:5px;position:relative;";
	var showButton = addChild(showDiv, "div", showButtonProperty);
	var confirmProperty = {};
	confirmProperty.type = "button";
	confirmProperty.value = "确定";
	confirmProperty.style = "position:absolute;left:140px;width:70px"
	addChild(showButton, "input", confirmProperty).onclick = confirm;
	var cancelProperty = {};
	cancelProperty.type = "button";
	cancelProperty.value = "取消";
	cancelProperty.style = "position:absolute;left:235px;width:70px"
	addChild(showButton, "input", cancelProperty).onclick = colse;
}