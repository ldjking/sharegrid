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
				//out("root obj",obj);
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
			if(pid!=null&&obj[pidAttr]==pid){
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
	var genGroupData=function(obj,groupAttrs){/*对某个节点的子元素继续进行group分类*/
		var array=obj.child;
		if(groupAttrs==null||groupAttrs.length==0)	return;
		var attr1=groupAttrs[0];
		var restAttrs=groupAttrs.slice(1);
		//out("restAttrs",groupAttrs);
		
		var array1=[];
		var array2=[];
		for(var i=0;i<array.length;i++){/**/
			var node=array[i];
			var value=node[attr1];
			var index=array1.indexOf(value);
			if(index>=0){/*已加入*/
				var pNode=array2[index];
				if(restAttrs.length>0){/*如果还要继续挖掘*/
					if(pNode.child==null)	pNode.child=[];
					pNode.child.push(node);
				}
			}
			else{/*尚未加入 第一次加入*/
				out("_nodeName",value);
				var pNode=mix(obj,{_nodeName:value},true);/*这里是个错误，因为混合了obj的child属性*/
				pNode.child=null;/*取消child的复制*/
				pNode.level=obj.level+1;
				pNode[attr1]=value;
				array1.push(value);
				if(restAttrs.length>0){/*如果还要继续挖掘*/
					pNode.child=[];
					pNode.child.push(node);
				}
				array2.push(pNode);
			}
		}/*第一遍循环完毕还要进行第二遍*/
		for(var i=0;i<array2.length;i++){/**/
			genGroupData(array2[i],restAttrs);
		}
		obj.child=array2;
	}
	
	
	var getGroup=function(array,cfg){
		/*分类可能不止一项  需要逐项进行分类  分类已经和过去的数据没有瓜葛了，产生的是新的数据  新的数据一定要装载关键的属性*/
		var obj={level:0};
		obj.child=array;
		if(x.isStr(cfg.groupAttrs)){
			var groupAttrs=cfg.groupAttrs.split(",");/*按逗号进行分割*/
			genGroupData(obj,groupAttrs);
		}
		return obj.child;
	}
	x.array2Tree = function(array,cfg) {
		/*这里跟cfg.formatType有关  formatType=1代表是使用id和pid来生成树  =2代表是使用groupAttr来生成树*/
		//out("array2Tree",cfg.formatType);
		var result;
		if(cfg.formatType==1)		result= getRootObj(array,cfg);
		else if(cfg.formatType==2){
			cfg.nameAttr="_nodeName";
			result= getGroup(array,cfg);
		}
		//alert(result);
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
