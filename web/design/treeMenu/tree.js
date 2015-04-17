(function(x){	/*树状效果*/
	/*	树的几种模式   	1 	完整树  	一次加载
						2	渐进树	按需加载
		树的展示形式		1	需要表头  多列
						2	不需要表头	只有名称一列
		树的可编辑特性	1	可以编辑
						2	不可以编辑
		树的典型操作		1	收缩
						2	展开
						3	收缩全部
						4	展开全部*/
	/*树的特性是每个节点都由treeLevel属性*/
	x.genTree=function(cfg){
		/*生成一个树状结构  主要*/
		if(cfg.openMode==null)	cfg.openMode="normal";/*常规展开模式  还有all模式 展开所有子孙节点*/
		if(cfg.idAttr==null)	cfg.idAttr="id";
		if(cfg.pidAttr==null)	cfg.pidAttr="pid";
		if(cfg.nameAttr==null)	cfg.nameAttr="name";
		var tree=cfg.dom;
		tree.treeCfg=cfg;
		x.cssAdd(tree,"tree");
		var result=cleanData(cfg);
		
		////out("result",result);
		//x.bind(tree,"click",e_tree_click);
		renderTree(tree,result);
		/*这里要重新计算  先画出根节点，再画出枝叶*/
	}
	var cleanData=function(cfg){/*整理数据  整理后的数据仍然是个数组，但是已经按照树状排列*/
		var result=[];
		addNode(result,null,cfg);
		//cfg.data=result;
		return result;		
		
	}
	var addNode=function(result,obj,cfg){
		/*找到一个对象的子节点，然后按顺序插入到result中   如果有死循环*/
		var childs=getChildData(obj,cfg);
		for(var i=0;i<childs.length;i++){
			result.push(childs[i]);/**/
			addNode(result,childs[i],cfg);
		}
	}
	var renderTree=function(tree,data){
		var cfg=tree.treeCfg;
		var nameAttr=cfg.nameAttr;
		for(var i=0;i<data.length;i++){
			var obj=data[i];
			var div=$div(null,"node");
			var text=$div(null,"text");
			text.innerHTML=obj[nameAttr];
			div.obj=obj;
			div.style.paddingLeft=(obj.treeLevel-1)*24+"px";
			cfg.dom.appendChild(div);
			div.appendChild(text);
			x.bind(div,"click",e_node_click);
			if(obj.hasChild)	x.cssAdd(div,"open");
			else				x.cssAdd(div,"leaf");
		}
	}
	
	var e_node_dbl=function(evt){/*双击代表展开所有子孙节点*/
		
	}
	
	var e_node_click=function(evt){/*树的单击事件  判断当前节点是否处于open状态  直接打开子孙节点*/
		var node=this;
		var tree=node.parentNode;
		var cfg=tree.treeCfg;
		if(node.obj!=null){
			if(x.cssContain(node,"open")){/*如果是打开状态  则关闭以下所有节点*/
				var p=x.getDomIndex(node);
				x.cssReplace(node,"open","close");
				for(var i=p+1;i<tree.childNodes.length;i++){
					var node2=tree.childNodes[i];
					if(node.obj.treeLevel<node2.obj.treeLevel){/*是显示子孙节点还是*/
						node2.style.display="none";
						x.cssReplace(node2,"open","close");/*open变close状态  收缩是这样的*/
					}
					else	break;
				}
			}
			else if(x.cssContain(node,"close")){/*展开默认只展开一层*/
				var p=x.getDomIndex(node);
				x.cssReplace(node,"close","open");
				for(var i=p+1;i<tree.childNodes.length;i++){
					var node2=tree.childNodes[i];
					if(node.obj.treeLevel>=node2.obj.treeLevel)	break;/*遇到同级元素*/
					if(cfg.openMode=="normal"){
						if(node.obj.treeLevel==node2.obj.treeLevel-1){
							node2.style.display="";
						}
					}
					else if(cfg.openMode=="all"){
						if(node.obj.treeLevel<node2.obj.treeLevel){
							node2.style.display="";
							x.cssReplace(node2,"close","open");/*close变open状态  展开所有*/
						}
					}
				}
			}
		}
	}
	
	
	/*如何对数据重新构造     树有几种类型  1种是所有数据直接获取到  2是数据按需获取[需要取数方法]
		按需获取时，需要多获取一级，以便于知道下一级的特点，是节点还是叶子
	*/
	
	var getRootData=function(cfg){
		/*获取根节点数据*/
		var data=cfg.data;
		var idAttr=cfg.idAttr;
		var pidAttr=cfg.pidAttr;
		var result=[];
		var rest=[];
		var z=1;
		for(var i=0;i<data.length;i++){
			var obj=data[i];
			var pid=obj[pidAttr];
			
			var flag=true;
			if(pid!=null){
				for(var j=0;j<data.length;j++){
					if(pid==data[j][idAttr]){	
						flag=false;
						break;
					}
				}
			}
			if(flag==true){
				obj.treeLevel=1;
				obj.treeCode=""+z;
				z++;
				result.push(obj);/*上层节点为空*/
			}
			else{
				rest.push(obj);
			}
		}
		cfg.data=rest;
		return result;
	}
	
	var getChildData=function(obj,cfg){
		if(obj==null)	return getRootData(cfg);
		var data=cfg.data;
		var idAttr=cfg.idAttr;
		var pidAttr=cfg.pidAttr;
		var result=[];
		var rest=[];
		var id=obj[cfg.idAttr];
		var z=1;
		for(var i=0;i<cfg.data.length;i++){
			var pid=cfg.data[i].pid;
			if(pid==id){
				obj.hasChild=true;
				cfg.data[i].treeLevel=obj.treeLevel+1;
				cfg.data[i].treeCode=obj.treeCode+z;
				z++;
				result.push(cfg.data[i]);
			}
			else{
				rest.push(cfg.data[i]);
			}
		}
		cfg.data=rest;
		return result;
	}
})(window);  