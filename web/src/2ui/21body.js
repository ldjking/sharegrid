/*xlib.31core	用户交互全局事件代码*/
(function(x){
var getSameColumnCell=function(dom){
	var p=x.getDomIndex(dom);
	/*这里有一个需要注意的地方 最后一列是找不到的*/
	var trs=$("tr",dom.parentNode,6);/*兄弟节点中查找所有tr元素*/
	trs.pop();
	var cells=[];
	var divs=[];
	for(var i=0;i<trs.length;i++){
		cells.push(x.getChilds(trs[i],p));
		//cells.push(x.getChilds(trs[i],p).childNodes[0]);
	}
	return cells;
}
var resizeRowHeight=function(dom,dy){
	var cells=x.$("td",dom,6);/*所有兄弟节点*/
	var divs=x.$("div",cells,3);
	if(dom.oriHeight==null)	dom.oriHeight=x.getRect(dom.parentNode).height;
	var height=dom.oriHeight;
	/*要使用tr的高度来计算*/
	if(x.isIE)	height=height-1;	/*减去边框的值*/
	var newHeight=height+dy;
	var minHeight=0;
	if(newHeight<minHeight)	newHeight=minHeight;
	x.setDomSize(divs,null,newHeight);
}
var resizeColumnWidth=function(dom,dx){
	var cells=getSameColumnCell(dom);
	var divs=x.$("div",cells,3);
	if(dom.oriWidth==null)	dom.oriWidth=x.getDomWidth(dom);
	var width=dom.oriWidth;
	var newWidth=width+dx;
	var minWidth=0;
	if(newWidth<minWidth)	newWidth=minWidth;
	x.setDomSize(divs,newWidth,null);
}
var e_body_move=function(evt){
	if(window.resizeCell!=null){/*调整大小的表格*/
		var dom=$1("table",window.resizeCell,1);
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		if(x.cssContain(dom,"resizeL11")){/*代表上下移动  调整同行所有元素的高度*/
			resizeRowHeight(window.resizeCell,dy);
		}
		else if(x.cssContain(dom,"resizeL12")){/*代表左右移动 调整同列所有元素的高度*/
			resizeColumnWidth(window.resizeCell,dx);
		}		
	}
	if(window.resizeDom!=null){
		var dom=window.resizeDom;
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		if(dom.oriWidth==null)	dom.oriWidth=x.getDomWidth(dom);
		if(dom.oriHeight==null)	dom.oriHeight=x.getDomHeight(dom);
		
		var width=dom.oriWidth+dx;
		var height=dom.oriHeight+dy;
		var cfg=dom.resizeCfg;
		if(width<0)		width=0;
		if(height<0)	height=0;
		if(cfg.minWidth==null) cfg.minWidth=10;
		if(cfg.minHeight==null) cfg.minHeight=10;
		if(width<cfg.minWidth)	width=cfg.minWidth;
		if(width>cfg.maxWidth)	width=cfg.maxWidth;
		if(height<cfg.minHeight)	height=cfg.minHeight;
		if(height>cfg.maxHeight)	height=cfg.maxHeight;
		if(contains(["resizeC1","resizeC2","resizeL1"],window.resizeStyle))	x.setDomSize(dom,null,height);
		if(contains(["resizeC1","resizeC2","resizeL2"],window.resizeStyle))	x.setDomSize(dom,width);
	}	
	if(window.moveDom!=null){
		var dom=window.moveDom;
		var cfg=dom.moveCfg;
		if(dom.oriLeft==null)	dom.oriLeft=x.toNum(x.getStyle(dom).left);
		if(dom.oriTop==null)	dom.oriTop=x.toNum(x.getStyle(dom).top);
		var dx=evt.clientX-window.cursorStartX;
		var dy=evt.clientY-window.cursorStartY;
		
		var left=dom.oriLeft+dx;
		var top=dom.oriTop+dy;
		
		if(left<cfg.minLeft)	left=cfg.minLeft;
		if(top<cfg.minTop)		top=cfg.minTop;
		x.setDomPosition(dom,left,top);
	}
	if(window.splitDom!=null){
		var dom=window.splitDom;
		var width=x.toNum(x.getStyle(dom).width);
		var height=x.toNum(x.getStyle(dom).height);
		var childs=x.getChilds(dom);
		var dom1=childs[0];
		var dom2=childs[1];
		var cfg=dom.splitCfg;

		if(cfg.minValue==null) cfg.minValue=24;
		if(cfg.mode=="x"){	/*水平模式*/
			if(cfg.maxValue==null) cfg.maxValue=width-30;
			var dx=evt.clientX-window.cursorStartX;
			if(dom1.oriWidth==null)	dom1.oriWidth=x.toNum(x.getStyle(dom1).width)
			var width1=dom1.oriWidth+dx;
			if(isNum(cfg.minValue)&&width1<cfg.minValue)	width1=cfg.minValue;
			if(isNum(cfg.maxValue)&&width1>cfg.maxValue)	width1=cfg.maxValue;
			var width2=width-width1;
			
			x.setDomSize(dom1,width1,null);
			x.setDomSize(dom2,width2,null);
		}
		if(cfg.mode=="y"){	/*垂直模式*/
			if(cfg.maxValue==null) cfg.maxValue=height-30;
			
			var dy=evt.clientY-window.cursorStartY;
			if(dom1.oriHeight==null)	dom1.oriHeight=x.toNum(x.getStyle(dom1).height)
			var height1=dom1.oriHeight+dy;
			if(isNum(cfg.minValue)&&height1<cfg.minValue)	height1=cfg.minValue;
			if(isNum(cfg.maxValue)&&height1>cfg.maxValue)	height1=cfg.maxValue;
			var height2=height-height1;

			x.setDomSize(dom1,null,height1);
			x.setDomSize(dom2,null,height2);
		}
	}	
	x.stopEvt(evt);
}
var e_body_mouseup=function(evt){
	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;
	x.stopEvt(evt);
}
var e_body_mouseleave=function(evt){
	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;
}
var e_body_blur=function(evt){

	window.resizeDom=null;
	window.moveDom=null;
	window.splitDom=null;
	window.resizeCell=null;

}

x.bind(document.body,"mousemove",e_body_move);
x.bind(document.body,"mouseup",e_body_mouseup);
//x.bind(document.body,"mouseout",e_body_mouseout);
x.bind(document.body,"mouseleave",e_body_mouseleave);
x.bind(document.body,"blur",e_body_blur);
})(window);
