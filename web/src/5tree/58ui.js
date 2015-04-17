(function(x){/*所有tree的交互事件*/	
	var clearCfg=function(cfg){
		cfg.treeScrollType=null;
		cfg.scrollType=null;
		cfg.lastY=null;
		cfg.lastX=null;
		cfg.last_barTop	=null;
		cfg.last_barLeft=null;
	}
	var e_tree_mousedown=function(evt){
		var cfg=this.treeCfg;
		var target=evt.target;
		if(x.cssContain(target,"icon")){/*将这个节点设置成active*/
			if(cfg.activeNode)	x.cssRm(cfg.activeNode,"active");
			cfg.activeNode=target;
			x.cssAdd(target,"active");
		}
		var targetTag=x.$1(".tag",evt.target,0);
		//out("down target");
		if(targetTag!=null){/*可拖拽的目标*/
			cfg.lastSelectNode=targetTag;
			if(cfg.allowDrag){
				cfg.dragReady=true;
				//out("dragReady",cfg.dragReady);
				//var fn=x.hitch(cfg,f_tree_enableDrag);
				/*按下300毫秒后进入拖拽模式*/
				setTimeout(x.hitch(cfg,f_tree_enableDrag,evt),300);
				x.stopEvt(evt);
			}
		}
	}
	
	var f_tree_enableDrag=function(evt){/*长按0.5秒后进入拖拽模式  否则无法进入拖拽模式*/
		var cfg=this;
		//out("进入拖拽模式",cfg.dragReady);

		if(cfg.dragReady){
			cfg.dom.style.cursor="pointer";
			cfg.dragState=true;
			var moveObj=$("#"+cfg.id+"_move");
			var container=$("#"+cfg.id+"_container");
			moveObj.style.display="block";
			var nameAttr=cfg.nameAttr;
			moveObj.innerHTML=""+cfg.lastSelectNode.obj[nameAttr];
			moveObj.obj=cfg.lastSelectNode.obj;
			var rect=x.getRect(container);
			moveObj.style.left=evt.clientX+14-rect.left+"px";
			moveObj.style.top=evt.clientY-0-rect.top+"px";
			//out("innerHTML",moveObj.innerHTML);
		}		
	}
	
	var e_tree_mouseup=function(evt){
		var cfg=this.treeCfg;
		cfg.dragReady=false;
		if(cfg.dragState){
			var moveObj=$("#"+cfg.id+"_move");
			var target=x.$1(".tag",evt.target,1);
			if(target!=null){
				var obj=target.obj;
				if(cfg.lastSelectNode!=null){/*要从数据结构上处理这条数据*/
					var lastObj=cfg.lastSelectNode.obj;
					//out("lastObj",lastObj);
					//out("obj",obj);
					if(obj.type!="file"&&obj.pNode!=lastObj&&(!x.nodeContain(lastObj,obj))){/*两个对象之间不能有包含关系*/
						var pidAttr=cfg.pidAttr;
						var idAttr=cfg.idAttr;
						lastObj[pidAttr]=obj[idAttr];/*重新设置数据*/
						//out("lastObj",lastObj);
						if(cfg.updateMethod){
							var result=$$(cfg.updateMethod,lastObj);
							if(result.flag)	x.genTreeContent(cfg.dom);/*重绘内容*/
							else			out("拖拽失败",result);
						}
					}
				}
			}
			moveObj.style.display="none";
			cfg.dragState=false;
			cfg.dom.style.cursor="default";
		}
		clearCfg(cfg);
		x.stopEvt(evt);
	}
	var e_tree_mousewheel=function(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
		var tree=this;
		var cfg=tree.treeCfg;
		var id="#"+cfg.id;
		var container=$(id+"_container");
		var content=$(id+"_content");
		var rolled = x.getEvtRolled(evt)*4;
		var top=x.toNum(x.getStyle(content).top);
		
		var treeWidth		=container.clientWidth;		/*tree的宽度*/
		var treeHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth+7;		/*宽度被默认加了12  如果没有垂直滚动条再减去12*/
		var contentHeight	=content.scrollHeight+7;	/*高度被默认加了12 如果没有水平滚动条再减去12*/
		
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>treeWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>treeHeight;  	/*if_scroll_v是否有垂直滚动条*/
		
		if(!if_scroll_h)	contentHeight-=7;
		if(!if_scroll_h)	contentWidth-=7;
		
		//out("clientHeight"+clientHeight+"scrollHeight"+scrollHeight);
		var minTop=treeHeight-contentHeight;
		
		//minTop-=26;
		if(minTop>0)	minTop=0;
		var maxTop=0;
		
		var currTop=x.limitValue(top+rolled,minTop,maxTop);
		content.style.top=currTop+"px";
		//out("form mouse wheel");
		x.fixTreeScroll(tree);
		x.stopEvt(evt);
	}
	
	var e_tree_mousemove=function(evt){/*鼠标移动可能是几种事件 1是滚动 2是拖拽*/
		var cfg=this.treeCfg;/*增加一个对象*/
		var id="#"+cfg.id;
		/*如果偏离了lastSelectNode 取消dragReady标记位*/
		var target=evt.target;
		var targetTag=x.$1(".tag",evt.target,0);
		if(cfg.dragReady==true&&targetTag!=cfg.lastSelectNode){/*目标元素与最后选中元素不一致 要把dragReady变成false*/
			cfg.dragReady=false;
		}
		//out("down target");
		var container=$("#"+cfg.id+"_container");
		var moveObj=$("#"+cfg.id+"_move");
		if(cfg.dragState){
			//out("evt",evt);
			//out("name",cfg.lastSelectNode.obj.name);
			var rect=x.getRect(container);
			//out("rect",rect);
			moveObj.style.left=evt.clientX+14-rect.left+"px";
			moveObj.style.top=evt.clientY-0-rect.top+"px";
			/*如果遇到的目标是选中节点的子节点  不允许操作，变成fobidden*/
			if(target.obj==moveObj.obj){
				cfg.dom.style.cursor="pointer";/*还是自身节点*/
			}
			else{
				if(target.obj!=null&&target.obj.type=="file")	cfg.dom.style.cursor="no-drop";
				else if(x.nodeContain(moveObj.obj,target.obj))	cfg.dom.style.cursor="no-drop";
				else								cfg.dom.style.cursor="pointer";
			}
			
			x.stopEvt(evt);
		}
		
		var container	=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_content");
		
		var treeWidth		=container.clientWidth;	/*tree的宽度*/
		var treeHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth+7;/*宽度被默认加了12  如果没有垂直滚动条再减去12*/
		var contentHeight	=content.scrollHeight+7;/*高度被默认加了12 如果没有水平滚动条再减去12*/
		
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>treeWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>treeHeight;  	/*if_scroll_v是否有垂直滚动条*/
		if(!if_scroll_h)	contentHeight-=7;
		if(!if_scroll_h)	contentWidth-=7;
		var scrollWidth		=treeWidth;							/*滚动区域宽度*/
		var	scrollHeight	=treeHeight;						/*滚动区域高度*/
		if(if_scroll_h)		scrollHeight-=7;			/*如果有水平滚动条  滚动高度=树高度-12*/
		if(if_scroll_v)		scrollWidth-=7;			/*如果有水平滚动条  滚动高度=树高度-12*/
		
		
		var barWidth		=Math.floor(treeWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(treeHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		//out("barHeight"+barHeight+"scrollHeight"+scrollHeight+"content");
		//out("content",content);
		var contentTop		=x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-treeWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-treeHeight;			/*内容上边距最大值*/
		//out("contentTop_max1",contentTop_max);

		//if(if_scroll_v)		contentLeft_max	+=7;/*如果有垂直滚动条 maxLeft+7*/
		//if(if_scroll_h)		contentTop_max	+=7;
		//out("contentTop_max2",contentTop_max);
		if(cfg.treeScrollType=="v"){
			//out("");
			if(cfg.lastY!=null){
				var d			=evt.clientY-cfg.lastY;
				if(cfg.last_barTop==null)	cfg.last_barTop=x.toNum(x.getStyle(scrollbar_v).top);
				var barTop		=cfg.last_barTop;
				barTop			=x.limitValue(barTop+d,0,barTop_max);
				var contentTop	=Math.floor(barTop*contentTop_max/barTop_max);
				scrollbar_v.style.top	=barTop+"px";
				content.style.top		=-contentTop+"px";
			}
			x.stopEvt(evt);
		}
		else if(cfg.treeScrollType=="h"){
			if(cfg.lastX!=null)	{
				var d			=evt.clientX-cfg.lastX;
				if(cfg.last_barLeft==null)	cfg.last_barLeft=x.toNum(x.getStyle(scrollbar_h).left);
				var barLeft		=cfg.last_barLeft;
				barLeft			=x.limitValue(barLeft+d,0,barLeft_max);
				var contentLeft	=barLeft*contentLeft_max/barLeft_max;
				scrollbar_h.style.left		=barLeft+"px";
				content.style.left			=-contentLeft+"px";
			}
			x.stopEvt(evt);

		}
	}
	
	var e_tree_click=function(evt){
		var tree=this;
		var cfg=this.treeCfg;
		var node=evt.target;
		//out("target",node.obj);
		if(cfg&&cfg.clickHandler)	cfg.clickHandler(tree,evt);
		var target=evt.target;
		if(x.cssContain(target,"icon")){/*将这个节点设置成active*/
			if(cfg.activeNode&&cfg.activeNode!=target)	x.cssRm(cfg.activeNode,"active");
			cfg.activeNode=target;
			x.cssAdd(target,"active");
			if(cfg.editMode){
				x.showTreeEditor(tree);/*如果当前已处于编辑模式 则显示该节点的详细内容*/
			}
		}
		else if(x.cssContain(target,"tag")){
			target=target.parentNode;
			var siblings=target.parentNode.childNodes;
			
			if(cfg.exclusive&&x.cssContain(target,"close")){/*树配置为排他性  且执行了节点的打开操作*/
				for(var i=0;i<siblings.length;i++){
					var node=siblings[i];
					if(node!=target)	x.cssReplace(node,"open","close");
				}
			}
			/*如果设置了排他性 要把同级节点关闭掉*/
			x.cssToggle(target,"open","close");/*展开和关闭节点的问题*/

			x.fixTreeScroll(tree);
			//alert(target.tagName);
		}

		
	}
	var e_tree_dbl=function(evt){
		/*双击事件，如果是html文件则直接打开 进入编辑模式*/
		var tree=this;
		var cfg=this.treeCfg;
		if(cfg.dblHandler)	cfg.dblHandler(tree,evt);
		var target=evt.target;
		//out("tree edit",target);
		if(target.obj!=null&&cfg.allowEdit)	x.showTreeEditor(tree);/*双节节点对象*/
	}
	
	x.uiTree=function(tree){/**/
		var cfg=tree.treeCfg;
		x.bind(tree,	"mousedown",	e_tree_mousedown);
		x.bind(tree,	"mousemove",	e_tree_mousemove);
		x.bind(tree,	"mouseup",		e_tree_mouseup);
		x.bind(tree,	"mouseleave",		e_tree_mouseup);

		x.bind(tree,	"click",		e_tree_click);
		x.bind(tree,	"dblclick",		e_tree_dbl);
		x.bind(tree,	"mousewheel",	e_tree_mousewheel);/*水平位移*/

		
		var editSave=$("#"+cfg.id+"_editSave");
		var editObj=$("#"+cfg.id+"_editObj");

		x.bind(editSave,"click",x.hitch(null,x.saveTreeNode,tree));
		x.bind(editObj,"dblclick",x.hitch(null,x.hideTreeEditor,tree));
	}
})(window);
