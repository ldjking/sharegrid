(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	var cmdbarHeight=27;
	x.genTreeContent=function(tree){
		var cfg=tree.treeCfg;
		cfg.addMode=null;
		cfg.editMode=null;
		cfg.activeNode=null;
		if(cfg.dataMethod!=null){
			var result=$$(cfg.dataMethod,cfg.param);
			//out("result",result);
			if(result.flag)	cfg.data=result.data;
			else			cfg.data=[];
		}
		var data=cfg.data;
		var formatData=data;
		if(cfg.formatType)	formatData=x.array2Tree(data,cfg);
		
		var container=$("#"+cfg.id+"_container");
		var content=$("#"+cfg.id+"_content");
		//if(!cfg.editMode)	container.style.height=x.getRect(tree).height-cmdbarHeight+"px";/*如果还未进入编辑模式 为容器赋高度值*/
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
				if(cfg.openAll)	x.cssAdd(node,"open");
				else			x.cssAdd(node,"close");
			}
			else{
				if(obj.child!=null&&obj.child.length>0){
					if(obj.type==null)	obj.type="folder";
					x.cssAdd(node,"node");
					if(cfg.openAll)	x.cssAdd(node,"open");
					else			x.cssAdd(node,"close");
				}
				else{
					if(obj.type==null)	obj.type="file";
					x.cssAdd(node,"leaf");
				}
			}
			x.cssAdd(node,obj.type);
			if(i==0&&d.length>1)	x.cssAdd(node,"first");
			if(d.length>1&&i==d.length-1) x.cssAdd(node,"last");
			
			
			text.innerHTML=d[i][nameAttr];
			
			tag.obj=obj;
			text.obj=obj;
			genChildNode(childs,d[i].child,obj,cfg);
		}
		x.fixTreeScroll(tree);
	}
	var  genChildNode=function(dom,datas,pobj,cfg){
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
				if(obj.type==null)	obj.type="folder";

				if(cfg.openAll)		x.cssAdd(node,"open");
				else				x.cssAdd(node,"close");
			}
			else{
				if(obj.type==null)	obj.type="file";
				x.cssAdd(node,"leaf");
			}
			x.cssAdd(node,obj.type);
			if(i==datas.length-1)						x.cssAdd(node,"last");
			
			text.innerHTML=obj[cfg.nameAttr];
			tag.obj=obj;
			text.obj=obj;
			
			if(obj.child!=null){
				genChildNode(childs,obj.child,obj,cfg);
			}
		}
	}
})(window);
