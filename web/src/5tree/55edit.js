(function(x){/*树的节点属性编辑  如何编辑*/
	/*生成树的第二部分，属性编辑部分  并需要一个提交按钮*/
	var cmdbarHeight=27;
	x.genTreeEditor=function(tree){/*生成树的节点编辑器*/
		
		//out("height",rect.height);
	}
	x.showTreeEditor=function(tree,type){/*主要是高度的问题*/
		var cfg=tree.treeCfg;
		var obj=null;
		cfg.attrDoms=[];/*重设输入框*/

		var container=x.$("#"+cfg.id+"_container");/**/
		var edit=x.$("#"+cfg.id+"_edit");
		edit.style.display="block";
		var editContainer=x.$("#"+cfg.id+"_editContainer");
		var editor=x.$("#"+cfg.id+"_editor");
		var editObj=x.$("#"+cfg.id+"_editObj");
		
		if(type=="add"){	
			cfg.addMode=true;
			editObj.innerHTML="新增节点";
			if(cfg.addNodeTitle)	editObj.innerHTML=cfg.addNodeTitle;
		}
		else{
			cfg.editMode=true;
			var activeNode=cfg.activeNode;
			if(activeNode!=null){
				obj=activeNode.obj;/*只能处理简单属性  可编辑 还是不可编辑*/
				editObj.innerHTML="\""+obj[cfg.nameAttr]+"\"&nbsp;&nbsp;的属性";
			}

		}
		/**/
		
		
		var rect=x.getRect(tree);
		var height1=Math.floor((rect.height-cmdbarHeight)/2);
		container.style.height=height1+"px";
		var height2=rect.height-cmdbarHeight-height1;
		editContainer.style.height=height2+"px";
		/*然后要修正树的滚动条  to be completed*/
		/*生成编辑器 这里还是倾向于使用table生成*/
		var attrs=cfg.attrs;
		var table=$table(attrs.length,2);/*10行两列*/
		editor.innerHTML="";
		editor.appendChild(table);
		for(var i=0;i<table.rows.length;i++){
			var td1=table.rows[i].cells[0];
			td1.innerHTML=attrs[i].name;
			var td2=table.rows[i].cells[1];
			var txt=$txt();/*生成一个输入框  有些情况下可能是值列表  比如选取颜色，选取可选值  弹开一个复杂的编辑器等*/ 
			if(obj!=null)	txt.value=obj[attrs[i].attr];
			if(cfg.addMode&&attrs[i].inherit&&cfg.activeNode){
				txt.value=cfg.activeNode.obj[attrs[i].inherit];/*继承父节点的主键值*/
			}
			txt.def=attrs[i];
			if(attrs[i].hide)	table.rows[i].style.display="none";	/*可能是隐藏的*/
			/*能否把当前选中节点的主键带出来当做是这里的父键*/
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
		var rect=x.getRect(tree);
		var height1=rect.height-cmdbarHeight;
		container.style.height=height1+"px";
		x.fixTreeScroll(tree);
	}
	
	x.saveTreeNode=function(tree){/*保存树节点信息  1判断属性是否有修改，如果有则修改  没有则保持*/
		var cfg=tree.treeCfg;
		var data={};
		for(var i=0;i<cfg.attrDoms.length;i++){
			var txt=cfg.attrDoms[i];
			var def=txt.def;
			if(txt.value!=null&&txt.value!=""){
				if(def.type=="num")	data[txt.def.attr]=x.toNum(txt.value);
				else 	data[txt.def.attr]=txt.value;
			}
			//out(txt.def.attr);
		}
		if(cfg.editMode){/*修改模式*/
			var activeNode=cfg.activeNode;
			var obj=activeNode.obj;
			
			x.copy(obj,data);
			x.hideTreeEditor(tree);
			if(cfg.updateMethod){
				var result=$$(cfg.updateMethod,obj);
				//out("result",result);
			}
			//out("obj",cfg.attrDoms);
			//out("update activeNode",activeNode);
		}
		else if(cfg.addMode){/*在数据中增加一个*/
			cfg.data.push(data);/*从另外一个角度说应该是*/
			/*新增成功后要想另外的办法处理，比如当前新增表单变成编辑表单 或者隐藏新增表单*/
			if(cfg.addMethod){
				var result=$$(cfg.addMethod,data);
				//out("result",result);
			}
			x.hideTreeEditor(tree);
			//out("add data");
		}
		//out("obj",obj);

		x.genTreeContent(tree);/*重新生成了  这样很不好  应该进行局部更新，不影响现有元素是最好  但是不太好*/
	}
})(window);
