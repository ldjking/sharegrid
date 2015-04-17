(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	x.genTree=function(cfg,data,dom){/*生成一棵树*/
	/*第一步  判断节点是 root node leaf*/
	/*第二步  判断节点样式类型  folder file*/
	/*第三步  判断节点开关类型  open close*/
	/*第四步  判断节点位置信息  first last*/
		//alert("gen tree");
		cfg.dom=dom;
		dom.treeCfg=cfg;
		cssAdd(dom,"tree");
		x.bind(dom,"click",e_tree_click);

		//dom.onselectstart=function(){return false;};	/*禁止树的选中效果*/
		
		var nameAttr="name";		/*节点名称*/
		var childsAttr="childs";	/*用于子数据 要求必须是数组*/
		var typeAttr="type";		/*用于css样式*/
		/*data如果是个数组*/
		var d=[];
		if(!isArray(data))	d[0]=data;
		else d=data;
		for(var i=0;i<d.length;i++){
			var obj=d[i];
			var node=$div();
			var tag=$div(null,"tag");
			var text=$div(null,"icon");
			var childs=$div(null,"childs");
			dom.appendChild(node);
			node.appendChild(tag);
			tag.appendChild(text);
			node.appendChild(childs);
			if(d.length==1)	x.cssAdd(node,"root");
			else x.cssAdd(node,"node");
			x.cssAdd(node,obj.type);
			x.cssAdd(node,"open");
			if(i==0&&d.length>1)	x.cssAdd(node,"first");
			if(d.length>1&&i==d.length-1) x.cssAdd(node,"last");
			
			
			text.innerHTML=d[i].name;
			tag.obj=obj;
			text.obj=obj;

			
			
			genChildNode(childs,d[i].child);
		}
	}
	var  genChildNode=function(dom,datas){
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
			if(obj.child!=null&&obj.child.length>0)		x.cssAdd(node,"node");
			else										x.cssAdd(node,"leaf");
			
			x.cssAdd(node,obj.type);
			if(obj.child!=null&&obj.child.length>0)		x.cssAdd(node,"open");
			if(i==datas.length-1)						x.cssAdd(node,"last");
			
			text.innerHTML=obj.name;
			tag.obj=obj;
			text.obj=obj;
			
			if(obj.child!=null){
				genChildNode(childs,obj.child);
			}
		}
	}
	
	
	var e_tree_click=function(evt){
		var tree=this;
		var cfg=this.treeCfg;
		if(cfg&&cfg.clickHandler)	cfg.clickHandler(tree,evt);
		var target=evt.target;
		//out("tree click",target.obj);
		if(target.className!="tag")	target=target.parentNode;
		if(target.className=="tag"){
			target=target.parentNode;
			x.cssToggle(target,"open","close");
			//alert(target.tagName);
		}
		
	}
	var e_tree_dbl=function(evt){
		/*双击事件，如果是html文件则直接打开 进入编辑模式*/
		var tree=this;
		var cfg=this.treeCfg;
		if(cfg.dblHandler)	cfg.dblHandler(tree,evt);
	}
})(window);
