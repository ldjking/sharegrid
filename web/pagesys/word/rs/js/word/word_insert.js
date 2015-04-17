word.insert = {};
word.insert.init = function() {
	word.insert.regEvent();
}
word.insert.regEvent = function() {
	var cmdInsert = document.getElementById("cmd_insert");
	var cmdInsertGroups = cmdInsert.childNodes;
	for (var i in cmdInsertGroups) {
		var group=cmdInsertGroups[i];
		var cmds = group.childNodes;
		for (var j in cmds) {
			var cmd=cmds[j];
			if (cmd.className) {
				var divClassName = cmd.className.split(" ")[1];
				cmd.onclick = word.insert[divClassName];
				cmd.id = divClassName;
				tipsDialog(cmd,word.conts.insertTips);
			}
		}
	}
}
word.insert.insert_blankpage=function(){
	var target=content.target;
	if(target==null){
		return;
	}
	var page=getPage(target);
	var div=word.utils.getParentDiv(target);
	var page_new=word.insert.insertPageWithContent(page,div);
	page_new=word.insert.insertPage(page,true);
	var div_new=createDefaltPDiv(page_new);
	var line_new=createLineDiv(null);
	div_new.appendChild(line_new);
	appendInPage(page_new,div_new);
	setWordVar(line_new, 0);
}

word.insert.insert_paging=function(){
	var target=content.target;
	if(target==null){
		return;
	}
	var page=getPage(target);
	var div=word.utils.getParentDiv(target);
	var page_new=word.insert.insertPageWithContent(page,div);
	setWordVar(getFirstLineDiv(getFirstPDiv(page_new)), 0);
}
word.insert.insert_deleteBlankpage=function(){
	var target=content.target;
	if(target==null){
		return;
	}
	var page=getPage(target);
	var prepage=page.previousSibling;
	page.parentNode.removeChild(page);
	changarg.removearg.push(page);
	if(prepage!=null){
		outPageListener(prepage);
	}
}
word.insert.insert_deletePaging=function(){
	var target=content.target;
	if(target==null){
		return;
	}
	var page=getPage(target);
	var br=page.getAttribute("br");
	if(br!=null){
		page.removeAttribute("br");
		pushToUpdate(page);
	}
	var prepage=page.previousSibling;
	if(prepage!=null){
		outPageListener(prepage);
	}
}
word.insert.insert_table = function(e) {
	word.dialog.insert.table(e,this);
}
word.insert.table=function(rows,cells){
	var target=content.target;
	if(target==null){
		return;
	}
	var ps = splitP(content.target, content.curfocus, true)
	var parent = target.parentNode;
	parent.innerHTML = ps.phtml;
	getUpdateArg(parent);
	
	var nextp=addNextP(parent,ps);
	var nextline = getFirstLineDiv(nextp);
	fixLine(nextline);
	var page=getPage(parent);
	
	var tableDiv=document.createElement("div");
	tableDiv.className="table";
	pid2++;
	tableDiv.setAttribute("pid2", pid2);
	var width=page.style.width;
	var left=page.getAttribute("left");
	var right=page.getAttribute("right");
	left=parseInt(left.substring(0,left.length-2))-7;
	right=parseInt(right.substring(0,right.length-2))-7;
	tableDiv.style.marginLeft=left+"px";// 减7
	tableDiv.style.marginRight=right+"px";
	
	var table=document.createElement("table");
	width=(parseInt(width.substring(0,width.length-2))-left-right);
	table.style.width=width+"px";
	table.style.border="0.67px solid #000";
	table.style.borderCollapse="collapse";
	table.setAttribute("tblBorders_insideH","0.67px solid #000000");
	table.setAttribute("tblBorders_insideV","0.67px solid #000000");
	tableDiv.appendChild(table);
	var eachTdWidth=width/cells;
	for(var i=0;i<rows;i++){
		var tr=document.createElement("tr");
		table.appendChild(tr);
		for(var j=0;j<cells;j++){
			var td=document.createElement("td");
			td.className="td";
			td.style.paddingLeft="6px"//默认
			td.style.paddingRight="6px"//默认
			td.style.paddingTop="0px"//默认
			td.style.paddingBottom="0px"//默认
			td.style.border="0.67px solid #000";
			td.style.width=eachTdWidth+"px";
			td.setAttribute("tdIndex",j+1);
			tr.appendChild(td);
			var p=createTdP((eachTdWidth-12)+"px");
			td.appendChild(p);
			var line=createLineDiv(null);
			p.appendChild(line);
			
		}
	}
	insertAfter(tableDiv, parent);
	outPageListener(page);
	if(parent.innerText.length<1){//如果在段开头插入，则等于是插入了表格
		nextp.removeAttribute("pid2");
		nextp.setAttribute("pid",getPDivId(parent));
		parent.parentNode.removeChild(parent);
	}
	setWordVar(getFirstLineDiv(getFirstPDiv(table)), 0);
}
word.insert.imageUpload=function(t){
	if(t.value){
		word.dialog.insert.image(t);
	}
}
word.insert.uploadFinish=function(result){
	//result=$myStr(result);
	//alert(result);
	if(result.flag){
		var target=content.target;
		if(target==null){
			return;
		}
		var ps = splitP(content.target, content.curfocus, true)
		var parent = target.parentNode;
		parent.innerHTML = ps.phtml;
		getUpdateArg(parent);
		var nextp=addNextP(parent,ps);
		var page=getPage(parent);
		var imgDiv=document.createElement("div");
		pid2++;
		imgDiv.setAttribute("pid2", pid2);
		imgDiv.className="img";
		imgDiv.style.marginLeft=page.getAttribute("left");
		//imgDiv.style.marginTop="10px";
		//imgDiv.style.marginBottom="10px";
		var img=document.createElement("img");
		img.src=result.data.imgSrc;
		var pw=page.style.width
		var left=page.getAttribute("left");
		var right=page.getAttribute("right");
		left=parseInt(left.substring(0,left.length-2));
		right=parseInt(right.substring(0,right.length-2));
		var width=(parseInt(pw.substring(0,pw.length-2))-left-right);
		if(width>result.data.width){
			img.style.width=result.data.width+"px";
		}else{
			img.style.width=width+"px";
		}
		var text=page.childNodes[1];
		var height=text.style.height;
		if(parseInt(height.substring(0,height.length-2))>result.data.height){
			img.style.height=result.data.height+"px";
		}else{
			img.style.height=height;
		}
		img.setAttribute("imgRid",result.data.imgRid);
		imgDiv.appendChild(img);
		insertAfter(imgDiv, parent);
		
		var nextline = getFirstLineDiv(nextp);
		fixLine(nextline);
		outPageListener(page);
		if(parent.innerText.length<1){//如果在段开头插入，则等于是插入了表格
			nextp.removeAttribute("pid2");
			nextp.setAttribute("pid",getPDivId(parent));
			parent.parentNode.removeChild(parent);
		}
		setWordVar(nextline, 0);
	}
}

word.insert.insertPage=function(page,isInsert){
	var page_new=page.cloneNode(false);
	page_new.setAttribute("pgid",word.utils.getMaxPage()+1);
	if(isInsert){
		page_new.setAttribute("br","page");
	}
	pid2++;
	page_new.setAttribute("pid2", pid2);
	insertAfter(page_new,page);
	var childs=page.childNodes;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		if(child.className!="text"){
			var child_new=child.cloneNode(true);
			page_new.appendChild(child_new);
		}else{
			var child_new=child.cloneNode(false);
			page_new.appendChild(child_new);
		}
	}
	return page_new;
}
word.insert.insertPageWithContent=function(page,div){
	var page_new=word.insert.insertPage(page,true);
	if(word.utils.isParagraph(div)){
		var ps = splitP(content.target, content.curfocus, true);
		div.innerHTML = ps.phtml;
		getUpdateArg(div);
		var nextp = createPDiv(div);
		nextp.innerHTML = ps.nhtml;
		appendInPage(page_new,nextp);
		var next=getNextPInPage(div);
		while(next!=null){
			var removep =null;//表格跟图片div的时候必须要取得它的第一个子结点即表格跟图片
			if(word.utils.isParagraph(next)){
				 removep=next.cloneNode(false);
				 next.removeAttribute("pid");
				 next.removeAttribute("lpid");
			}else{
				 removep=next.cloneNode(true);
//				 if(word.utils.isTable(next)){
//				 	next.removeAttribute("tableId");
//				 }else{
//				 	next.removeAttribute("imageId");
//				 }
			}
			changarg.removearg.push(removep);
			pid2++;
			next.setAttribute("pid2", pid2);
			//next.removeAttribute("pid");
			var nextTemp=getNextPInPage(next);
			appendInPage(page_new,next);
			next=nextTemp;
		}
	}
	outPageListener(page_new);
	return page_new;
}
