(function(x){
	var Tree={};//这是一个命名空间

x.genTree=function(cfg,data){/*生成一棵树*/
	var dom=cfg.dom;
	cssAdd(dom,"tree");
	bind(dom,"click",e_tree_click);
	bind(dom,"dblclick",e_tree_dbl);
	dom.onselectstart=function(){return false;};
	var root=$div(null,"root open");
	var tag=$div(null,"tag");
	var childs=$div(null,"childs");
	tag.innerHTML=data.name;
	tag.obj=data;
	dom.appendChild(root);
	root.appendChild(tag);
	root.appendChild(childs);
	genChildNode(childs,data.child);
}
var  genChildNode=function(dom,datas){
	if(datas==null)	return;
	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		var node=$div();
		
		var tag=$div(null,"tag");
		var childs=$div(null,"childs");
		dom.appendChild(node);
		node.appendChild(tag);
		node.appendChild(childs);
		if(data.type=="folder")	x.cssAdd(node,	"node folder");
		else {
			x.cssAdd(node,	"leaf");
			if(data.type=="png")							x.cssAdd(node,	"png");
			else if(data.type=="jpg"||data.type=="jpeg")	x.cssAdd(node,	"png");
			else if(data.type=="gif")						x.cssAdd(node,	"gif");
			else if(data.type=="bmp")						x.cssAdd(node,	"bmp");
			else if(data.type=="js")						x.cssAdd(node,	"js");
			else if(data.type=="html")						x.cssAdd(node,	"html");
			else if(data.type=="css")						x.cssAdd(node,	"css");
			else if(data.type=="doc"||data.type=="docx")	x.cssAdd(node,	"doc");
			else 											x.cssAdd(node,	"file");
		}
		if(i==datas.length-1)	x.cssAdd(node,	"last");
		else					x.cssAdd(node,	"normal");
		x.cssAdd(node,"close");
		tag.innerHTML=data.name;
		tag.obj=data;
		
		if(data.child!=null){
			genChildNode(childs,data.child);
		}
	}
}
var e_tree_click=function(evt)
{
	var target=evt.target;
	////out("click",target.obj);
	if(target.className=="tag"){
		target=target.parentNode;
		x.cssToggle(target,"open","close");
		//alert(target.tagName);
	}
}
var e_tree_dbl=function(evt){
	/*双击事件，如果是html文件则直接打开 进入编辑模式*/
	var target=x.getTarget(evt);
	if(target.obj!=null){
		x.openEditor(target.obj);
	}
}
})(window);
