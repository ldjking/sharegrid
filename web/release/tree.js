(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	x.genTree=function(dom,cfg){/*生成一棵树*/
	/*第一步  判断节点是 root node leaf*/
	/*第二步  判断节点样式类型  folder file*/
	/*第三步  判断节点开关类型  open close*/
	/*第四步  判断节点位置信息  first last*/
		//alert("gen tree");
		cfg.dom=dom;
		dom.treeCfg=cfg;
		cfg.id=x.getId("tree");
		if(cfg.nameAttr==null)	cfg.nameAttr="name";

		cssAdd(dom,"tree");
		var cmd=$div(cfg.id+"_cmdbar","cmds");
		var container=$div(cfg.id+"_container","treeContainer");/*这里还要放置内容 以及滚动条*/
		var content=$div(cfg.id+"_content","content");/*内容部分*/
		var moveObj=$div(cfg.id+"_move","moveobj");
		
		var edit=$div(cfg.id+"_edit","treeEdit");/*具有滚动条*/
		var editTitle=$div(cfg.id+"_editTitle","editTitle");/*编辑对象的头部*/
		var editContainer=$div(cfg.id+"_editContainer","editContainer");/*属性编辑器容器  这里要放置滚动条*/
		var editor=$div(cfg.id+"_editor","editor");/*编辑器*/
		var editObj=$div(cfg.id+"_editObj","editObj");/*编辑对象*/
		var editSave=$div(cfg.id+"_editSave","editSave");/*编辑内容保存*/
		editSave.innerHTML="&#xf00c;";

		x.addChild(dom,[cmd,container,edit]);
		x.addChild(container,[content,moveObj]);
		x.addChild(edit,[editTitle,editContainer]);
		x.addChild(editTitle,[editObj,editSave]);
		x.addChild(editContainer,[editor]);
		
		//dom.appendChild(container);
		x.genTreeCmd(dom);
		x.genTreeScroll(dom);
		x.genTreeContent(dom);
		//x.showTreeEditor(dom);
		x.uiTree(dom);
	}
})(window);
(function(x){/**/
	var e_cmd_click=function(evt){
		var target=x.getTarget(evt);
		var tree=$1(".tree",target,1);
		var cfg=tree.treeCfg;
		//out("cmd",target.cmd);
		//if(cfg.excuteCmdState==true)	return;
		if(target.cmd!=null){
			if(target.disable)	return;		/*step1	判断是否禁用*//*step2	执行默认命令的操作*/
			if(target.cmd.cmd=="nodeAdd")			f_tree_addNode(tree);
			else if(target.cmd.cmd=="nodeEdit")		f_tree_editNode(tree);
			else if(target.cmd.cmd=="nodeRm")		f_tree_rmNode(tree);
			else if(target.cmd.cmd=="nodeOpen")		f_tree_open(tree);
			else if(target.cmd.cmd=="nodeClose")	f_tree_close(tree);
			else if(target.cmd.cmd=="nodeRefresh")	f_tree_refresh(tree);
			/*step3 执行自定义命令*/
			if(target.cmd.fn!=null){
				var fn=target.cmd.fn;
				fn(target);
			}
		}
	}
	
	var f_tree_open=function(tree){
		
	}
	
	var f_tree_close=function(tree){
	}
	var f_tree_refresh=function(tree){
	}
	
	var f_tree_addNode=function(tree){
	}
	
	var f_tree_editNode=function(tree){
	}
	
	var f_tree_rmNode=function(tree){
		/*删除一个节点*/
		//out("rmTree",tree.activeNode);
		var cfg=tree.treeCfg;
		var activeNode=cfg.activeNode;
		if(activeNode!=null){/*从数据上删除该条数据  如果还具有子节点，应该把子节点一并删除*/
			var obj=activeNode.obj;
			var datas=x.getNodeSons(obj);
			//out("datas",datas);
			cfg.data=x.rmArray(cfg.data,datas);
			x.rmDom(activeNode.parentNode);
			//x.genTreeContent(tree);
			//out("rm obj",cfg.data);
		}
	}
	
	
	x.genTreeCmd=function(tree){/*生成树的操作按钮栏*/
		var cfg=tree.treeCfg;
		var cmds=cfg.cmds;
		var id=cfg.id;
		var cmdbar	=$("#"+id+"_cmdbar");
		var cmd		=$div(id+"_cmd","cmd");
		//x.clearDom(cmdbar);
		x.addChild(cmdbar,[cmd]);

		/*根据用户自定义的命令行类型  默认有的方式有哪些按钮  有两套按钮
		主表  新增 修改 删除 筛选 刷新
		启用编辑  新增 删除 提交 筛选 刷新*/
		var preCmds={};
		preCmds.nodeAdd		=$div(id+"_nodeAdd","nodeAdd");
		preCmds.nodeEdit	=$div(id+"_nodeEdit","nodeEdit");
		preCmds.nodeRm		=$div(id+"_nodeRm","nodeRm");
		preCmds.nodeOpen	=$div(id+"_nodeOpen","nodeOpen");
		preCmds.nodeClose	=$div(id+"_nodeClose","nodeClose");
		preCmds.nodeRefresh	=$div(id+"_nodeRefresh","nodeRefresh");
		
		var c;
		if(cmds==null)	return;/*如果为空，直接返回*/
		for(var i=0;i<cmds.length;i++){
			if(cmds[i].cmd!=null){
				c=preCmds[cmds[i].cmd];
				if(c!=null){
					c.cmd=cmds[i];
					cmd.appendChild(c);
				}
				else{/*自定义按钮如何放置*/
					c=$div();
					c.cmd=cmds[i];
					c.innerHTML=cmds[i].text;
					var className=cmds[i].class;
					if(className==null)	className="btn";
					c.className=className;/*自定义的操作按钮*/
					cmd.appendChild(c);
				}
			}
		}
		//out("cmds",cmd);
		//checkCmd(form);
		cfg.cmdGened=true;
		x.bind(cmd,	"click",e_cmd_click);
	}
})(window);
(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	var cmdbarHeight=27;
	x.genTreeContent=function(tree){
		var cfg=tree.treeCfg;
		if(cfg.dataMethod!=null){
			var result=$$(cfg.dataMethod,cfg.param);
			//out("result",result);
			if(result.flag)	cfg.data=result.data;
			else			cfg.data=[];
		}
		var data=cfg.data;
		var formatData=data;
		if(cfg.formatFlag)	formatData=x.array2Tree(data,cfg);
		
		var container=$("#"+cfg.id+"_container");
		var content=$("#"+cfg.id+"_content");
		if(!cfg.editMode)	container.style.height=x.getRect(tree).height-cmdbarHeight+"px";/*如果还未进入编辑模式 为容器赋高度值*/
		content.innerHTML="";
		
		//dom.onselectstart=function(){return false;};	/*禁止树的选中效果*/
		var nameAttr=cfg.nameAttr;
		if(nameAttr==null) 	nameAttr="name";		/*节点名称*/
		var childsAttr="childs";	/*用于子数据 要求必须是数组*/
		var typeAttr="type";		/*用于css样式*/
		/*data如果是个数组*/
		var d=[];
		if(isArray(formatData))	d=formatData;
		else d[0]=formatData;
		for(var i=0;i<d.length;i++){
			var obj=d[i];
			var node=$div();
			var tag=$div(null,"tag");
			var text=$div(null,"icon");
			var childs=$div(null,"childs");
			content.appendChild(node);
			node.appendChild(tag);
			tag.appendChild(text);
			node.appendChild(childs);
			if(d.length==1){
				if(obj.type==null)	obj.type="folder";
				x.cssAdd(node,"root");
				x.cssAdd(node,"open");
			}
			else{
				if(obj.child!=null&&obj.child.length>0){
					if(obj.type==null)	obj.type="folder";
					x.cssAdd(node,"node");
					x.cssAdd(node,"open");
				}
				else	x.cssAdd(node,"leaf");
			}
			x.cssAdd(node,obj.type);
			if(i==0&&d.length>1)	x.cssAdd(node,"first");
			if(d.length>1&&i==d.length-1) x.cssAdd(node,"last");
			
			
			text.innerHTML=d[i][nameAttr];
			var rootFlag = "tree_"+i;
			obj.rootFlag = rootFlag;
			obj.flag = rootFlag;
			tag.obj=obj;
			text.obj=obj;
			genChildNode(childs,d[i].child,rootFlag,obj,cfg);
		}
		x.fixTreeScroll(tree);
	}
	var  genChildNode=function(dom,datas,rootFlag,pobj,cfg){
		if(datas==null||datas.length<1)		return;
		for(var i=0;i<datas.length;i++){
			var obj=datas[i];
			var node=$div();
			var tag=$div(null,"tag");
			var text=$div(null,"icon");
			var childs=$div(null,"childs");
			
			dom.appendChild(node);
			node.appendChild(tag);
			tag.appendChild(text);
			node.appendChild(childs);
			if(obj.child!=null&&obj.child.length>0)	{
				x.cssAdd(node,"node");
				x.cssAdd(node,"open");
			}
			else{
				x.cssAdd(node,"leaf");
			}
			if(obj.type==null)	obj.type="folder";
			x.cssAdd(node,obj.type);
			if(i==datas.length-1)						x.cssAdd(node,"last");
			
			text.innerHTML=obj[cfg.nameAttr];
			obj.rootFlag = rootFlag;
			obj.flag = pobj.flag+"_child";
			tag.obj=obj;
			text.obj=obj;
			
			if(obj.child!=null){
				genChildNode(childs,obj.child,rootFlag,obj,cfg);
			}
		}
	}
})(window);
(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	var getIDs=function(array,cfg){
		var idAttr=cfg.idAttr;
		var ids=[];
		if(idAttr==null||idAttr=="")	idAttr="id";
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			obj.child=null;/*清空child元素*/
			x.add2(ids,obj[idAttr]);
		}
		return ids;
	}
	var getRootObj=function(array,cfg){/*获取顶级对象*/
		var ids=getIDs(array,cfg);
		//out("ids",ids);
		//out("array",array);
		var pidAttr=cfg.pidAttr;
		var rootElement=[];
		if(pidAttr==null||pidAttr=="")	pidAttr="pid";	
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			var pid=obj[pidAttr];
			//out("pid",obj);
			if(pid==null){
				rootElement.push(obj);	/*直接是顶级元素*/
				
				genChilds(obj,array,cfg);/*生成子节点*/
			}
			else{
				if(!x.contains(ids,pid)){/*如果一个元素的pid在整个id范围内找不到，也认为是顶级元素*/
					rootElement.push(obj);/*得到一个顶级元素的同时为其生成子元素集合*/
					genChilds(obj,array,cfg);/*生成子节点*/
					//out("find root",obj);
				}
			}
		}
		//out("root",rootElement);
		return rootElement;
	}
	var genChilds=function(node,array,cfg){/*寻找一个节点的所有子节点*/
		var idAttr=cfg.idAttr;
		var pidAttr=cfg.pidAttr;
		if(idAttr==null||idAttr=="")	idAttr="id";
		if(pidAttr==null||pidAttr=="")	pidAttr="pid";
		var pid=node[idAttr];
		var childs=[];
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			if(obj[pidAttr]==pid){
				childs.push(obj);/*增加子节点*/
				obj.pNode=node;/*给每个元素一个pNode指向*/
				genChilds(obj,array,cfg);/*这里array存在问题  多余的元素没有删除  性能较差*/
			}
		}
		if(childs!=null&&childs.length>0) {
			node.child=childs;
		}
		
		//if(node.child.length)
	}
	x.array2Tree = function(array,cfg) {
		var result= getRootObj(array,cfg);
		//out("array2Tree",result);
		return result;
	}
	
	x.nodeContain=function(nodeA,nodeB){/*节点具有包含关系  A 包含 B*/
		//out("nodeContain",nodeA);
		//out("nodeContain",nodeB);

		var temp=nodeB;
		if(nodeA==null||nodeB==null)	return false;
		var flag=true;
		var i=0;
		while(true){/*要避免死循环  不是很容易处理*/
			i++;
			if(temp==null)		return false;
			if(nodeA===temp)	return true;
			temp=temp.pNode;

			if(i>20)	return false;/*担心死循环的问题*/
		}
	}
	x.getNodeSons=function(node,array){/*获取一个节点的子孙节点集合*/
		if(array==null)	array=[];
		array.push(node);
		if(node.child!=null&&node.child.length>0){
			for(var i=0;i<node.child.length;i++){
				getNodeSons(node.child[i],array);
			}
		}
		return array;
	}
})(window);
(function(x){/*树的节点属性编辑  如何编辑*/
	/*生成树的第二部分，属性编辑部分  并需要一个提交按钮*/
	x.genTreeEditor=function(tree){/*生成树的节点编辑器*/
		
		//out("height",rect.height);
	}
	
	x.showTreeEditor=function(tree){/*主要是高度的问题*/
		var cfg=tree.treeCfg;
		cfg.editMode=true;
		cfg.attrDoms=[];
		var activeNode=cfg.activeNode;
		var obj=activeNode.obj;/*只能处理简单属性  可编辑 还是不可编辑*/
		/**/
		var container=x.$("#"+cfg.id+"_container");/**/
		var edit=x.$("#"+cfg.id+"_edit");
		edit.style.display="block";
		var editContainer=x.$("#"+cfg.id+"_editContainer");
		var editor=x.$("#"+cfg.id+"_editor");
		var editObj=x.$("#"+cfg.id+"_editObj");
		
		editObj.innerHTML="\""+activeNode.obj[cfg.nameAttr]+"\"&nbsp;&nbsp;的属性";
		var rect=x.getRect(tree);
		var cmdbarHeight=33;
		var height1=Math.floor((rect.height-cmdbarHeight)/2);
		container.style.height=height1+"px";
		var height2=rect.height-cmdbarHeight-height1;
		editContainer.style.height=height2+"px";
		/*然后要修正树的滚动条  to be completed*/
		/*生成编辑器 这里还是倾向于使用table生成*/
		var attrs=[];
		for(var p in obj){
			if(x.isSimple(obj[p])){
				var attr=p;
				if(cfg.map!=null){/*属性映射*/
					var def=cfg.map[attr];
					if(def!=null&&def.hide!=1){	
						def.attr=p;
						attrs.push(def);
					}
				}
			}
		}
		var table=$table(attrs.length,2);/*10行两列*/
		editor.innerHTML="";
		editor.appendChild(table);
		for(var i=0;i<table.rows.length;i++){
			var td1=table.rows[i].cells[0];
			td1.innerHTML=attrs[i][cfg.nameAttr];
			var td2=table.rows[i].cells[1];
			var txt=$txt();/*生成一个输入框  有些情况下可能是值列表  比如选取颜色，选取可选值  弹开一个复杂的编辑器等*/ 
			txt.value=obj[attrs[i].attr];
			txt.def=attrs[i];
			td2.appendChild(txt);
			cfg.attrDoms.push(txt);
		}
		x.fixTreeScroll(tree);
	}
	
	x.hideTreeEditor=function(tree){
		//out("hide editor");
		var cfg=tree.treeCfg;
		var container=x.$("#"+cfg.id+"_container");/**/
		var edit=x.$("#"+cfg.id+"_edit");
		//out("edit",edit);
		edit.style.display="none";
		var cmdbarHeight=33;
		var rect=x.getRect(tree);
		var height1=rect.height-cmdbarHeight;
		container.style.height=height1+"px";
		x.fixTreeScroll(tree);
	}
	
	x.saveTreeNode=function(tree){/*保存树节点信息  1判断属性是否有修改，如果有则修改  没有则保持*/
		var cfg=tree.treeCfg;
		var activeNode=cfg.activeNode;
		var obj=activeNode.obj;
		//out("obj",cfg.attrDoms);
		//out("save activeNode",activeNode);
		for(var i=0;i<cfg.attrDoms.length;i++){
			var txt=cfg.attrDoms[i];
			obj[txt.def.attr]=txt.value;
			//out(txt.def.attr);
		}
		//out("obj",obj);

		x.genTreeContent(tree);
	}
})(window);
(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	var e_scroll_v_mousedown=function(evt){
		//out("mousedown");
		var tree	=x.$1(".tree",this,0);
		var cfg=tree.treeCfg;
		cfg.treeScrollType="v";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	var e_scroll_h_mousedown=function(evt){
		var tree	=x.$1(".tree",this,0);
		var cfg=tree.treeCfg;
		cfg.treeScrollType="h";
		cfg.lastX	=evt.clientX;
		cfg.lastY	=evt.clientY;
		x.stopEvt(evt);
	}
	
	x.genTreeScroll=function(tree){/*为树生成滚动条*/
		var cfg=tree.treeCfg;
		var id=cfg.id;/*有两部分滚动条要处理  1是内容部分 2是编辑器部分*/
		var treeContainer=$("#"+id+"_container");
		var scroll_h	=x.$div(id+"_scroll_h","scroll_h");
		var scrollbar_h	=x.$div(id+"_scrollbar_h","scrollbar_h");
		var scroll_v	=x.$div(id+"_scroll_v","scroll_v");
		var scrollbar_v	=x.$div(id+"_scrollbar_v","scrollbar_v");
		x.addChild(treeContainer,[scroll_h,scrollbar_h,scroll_v,scrollbar_v]);
		x.bind(scrollbar_h,	"mousedown",	e_scroll_h_mousedown);/*水平位移*/
		x.bind(scrollbar_v,	"mousedown",	e_scroll_v_mousedown);/*垂直位移*/
		//fixTreeScroll(tree);
	}
	
	x.fixTreeScroll=function(tree){
		var cfg			=tree.treeCfg;						/*grid的配置文件 里面同时存放各种状态参数*/
		var id="#"+cfg.id;
		var container=x.$(id+"_container");
		var scroll_h	=x.$(id+"_scroll_h");
		var scrollbar_h	=x.$(id+"_scrollbar_h");
		var scroll_v	=x.$(id+"_scroll_v");
		var scrollbar_v	=x.$(id+"_scrollbar_v");
		var content		=x.$(id+"_content");/*树的内容部分*/
		
		//out("fixTree scroll");
	    //out("clientWidth",	container.clientWidth);
		//out("clientHeight",	container.clientHeight);
		//out("scrollWidth",	content.scrollWidth);
		//out("scrollWidth2",	x.getRect(content).width);
		//out("scrollWidth3",	x.getRect(content.childNodes[0]).scrollWidth);


		//out("scrollHeight",	content.scrollHeight);

		var treeWidth		=container.clientWidth	/*grid的宽度*/
		var treeHeight		=container.clientHeight;

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;

		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>treeWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>treeHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=treeWidth-12;					/*滚动区域宽度*/
		var	scrollHeight	=treeHeight;					/*滚动区域高度*/
		
		var barWidth		=Math.floor(treeWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(treeHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		var barLeft_max		=scrollWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		
		//out("barHeight",barHeight);
		
		var contentTop		=-x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=-x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-treeWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-treeHeight;			/*内容上边距最大值*/
		if(if_scroll_v)		contentLeft_max	+=7;/*如果有垂直滚动条 maxLeft+7*/
		if(if_scroll_h)		contentTop_max	+=7;
	
		var barTop		=barTop_max*contentTop/contentTop_max;			/*最终的滚动条上边距*/
		var barLeft		=barLeft_max*contentLeft/contentLeft_max;		/*最终的滚动条左边距*/
		x.showHide([scroll_h,scrollbar_h],if_scroll_h);			/*隐藏或者显示水平滚动条*/
		x.showHide([scroll_v,scrollbar_v],if_scroll_v);			/*隐藏或者显示垂直滚动条*/

		if(if_scroll_h){/*水平滚动*/											
			//scroll_h.style.width	=scrollWidth+"px";				/*水平滚动区域的宽度*/
			scrollbar_h.style.width	=barWidth+"px";				/*水平滚动条的宽度*/
			scrollbar_h.style.left	=barLeft+"px";				/*水平滚动条的相对位置*/
		}
		else
		{
			content.style.left="0px";
		}
		if(if_scroll_v){/*垂直滚动*/
			//scroll_v.style.height		=scrollHeight+"px";		/*垂直滚动区域的高度*/		
			scrollbar_v.style.height	=barHeight+"px";		/*垂直滚动条的高度*/
			scrollbar_v.style.top		=barTop+"px";			/*垂直滚动条的相对位置*/
		}
		else{
			content.style.top="0px";
		}
	}
})(window);
(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	
})(window);
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
			moveObj.innerHTML=""+cfg.lastSelectNode.obj.name;
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
						lastObj.pid=obj.id;/*重新设置数据*/
						x.genTreeContent(cfg.dom);
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
		
		var clientHeight=container.clientHeight,scrollHeight=content.scrollHeight;
		//out("clientHeight"+clientHeight+"scrollHeight"+scrollHeight);
		var minTop=clientHeight-scrollHeight;
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

		var contentWidth	=content.scrollWidth;
		var contentHeight	=content.scrollHeight;
		
		if(contentHeight>treeHeight)	contentWidth	=contentWidth-12;	/*有垂直滚动条时减去垂直滚动条的宽度*/
		/*当切换分页时 由于滚动条的消失 重现  消失 重现  造成水平偏移不断变小*/
		var if_scroll_h		=contentWidth>treeWidth;		/*是否需要水平滚动条*/
		var if_scroll_v		=contentHeight>treeHeight;  	/*if_scroll_v是否有垂直滚动条*/
		var scrollWidth		=treeWidth-12;					/*滚动区域宽度*/
		var	scrollHeight	=treeHeight;						/*滚动区域高度*/
		
		var barWidth		=Math.floor(treeWidth*scrollWidth/contentWidth)-2;	/*滚动条宽度*/
		var barHeight		=Math.floor(treeHeight*scrollHeight/contentHeight)-2;	/*滚动条高度*/
		
		var barLeft_max		=treeWidth-barWidth;			/*滚动条左边距最大值*/
		var barTop_max		=scrollHeight-barHeight;			/*滚动条上边距最大值*/
		//out("barHeight"+barHeight+"scrollHeight"+scrollHeight+"content");
		//out("content",content);
		var contentTop		=x.toNum(x.getStyle(content).top);	/*内容左边距*/
		var contentLeft		=x.toNum(x.getStyle(content).left);	/*内容上边距*/
		var contentLeft_max	=contentWidth-treeWidth;			/*内容左边距最大值*/
		var contentTop_max	=contentHeight-treeHeight;			/*内容上边距最大值*/
		//out("contentTop_max1",contentTop_max);

		if(if_scroll_v)		contentLeft_max	+=7;/*如果有垂直滚动条 maxLeft+7*/
		if(if_scroll_h)		contentTop_max	+=7;
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
			x.cssToggle(target,"open","close");
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
(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	x.enableTreeDrag=function(dom){/*启用tree的drag效果*/
		var cfg=dom.treeCfg;
		cfg.allowDrag=true;
	}
})(window);
