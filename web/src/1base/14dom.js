/*xlib.15dom  文档对象辅助  包括筛选器 $  等函数*/
(function(x){
	x.getParam=function(name){
		var url=document.URL;
		////out("url",url);
		if(url!=null&&url.indexOf("?")>0){
			var paramStr=url.substr(url.indexOf("?")+1);
			////out("paramStr",paramStr);
			if(paramStr!=null){
				var params=paramStr.split(/\&/g);
				for(var i=0;i<params.length;i++){
					if(params[i].indexOf(name)==0){
						return params[i].substr(params[i].indexOf("=")+1);
					}
				}
			}
		}
		return null;
	}
	x.inDom=function(dom1,dom2){/*判断元素是否在另一个元素内  */
		var flag=true;
		var temp=dom1;
		if(x.isElement(dom1)&&x.isElement(dom2)){
			do{	
				if(temp==dom2)	return true;
				else{
					if(temp==document.body)	return false;/*一直到最顶层了*/
					temp=temp.parentNode;
				}
			}while(true);
		}
		return false;
	}
	
	x.clearDom=function(dom){
		if(x.isElement(dom)){
			for(var i=0;i<dom.childNodes.length;){
				dom.removeChild(dom.childNodes[0]);
			}
		}
	}
	x.addChild=function(dom,ele){/*插入节点*/
		if(x.isArray(ele)){
			x.each(ele,function(e){dom.appendChild(e)})
		}
		else	dom.appendChild(ele);
		return dom;
	}
	x.insertDom=function(dom){/*插入到自身之前 还是之后*/
	}
	
	x.rmDom=function(dom){/*删除自身*/
		if(x.isArray(dom)){
			for(var i=0;i<dom.length;i++){
				dom[i].parentNode.removeChild(dom[i]);
			}
			return dom;
		}
		return dom.parentNode.removeChild(dom);
	}
	
	x.getChilds=function(dom,num){/*获取子元素  返回一个数组或某个具体的dom*/
		if(!x.isElement(dom))	return null;/*如果不是dom元素，返回空*/
		var doms=[];
		for(var i=0;i<dom.childNodes.length;i++){
			if(dom.childNodes[i].nodeType==1)
			doms.push(dom.childNodes[i]);
		}
		if(isInt(num)){
			if(num>=0&&num<doms.length)		return doms[num];
			else							return null;
		}
		return doms;
	}
	x.getNextNode=function(dom){/*下一个节点*/
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		if(_p==_childs.length-1)	return null;/*如果后面没有了 返回空*/
		return _childs[_p+1];
	}
	x.getNextNodes=function(dom){/*同级低于本节点的节点*/
		var result=[];
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		for(var i=_p+1;_p>0,i<_childs.length;i++)
		{
			result.push(_childs[i]);
		}
		return result;
	}
	x.getPreNode=function(dom){/*上一个节点*/
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		if(_p==0)	return null;
		return _childs[_p-1];
	}
	x.getPreNodes=function(dom){/*同级高于本节点的节点*/
		var result=[];
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		for(var i=0;_p>0,i<_p;i++)
		{
			result.push(_childs[i]);
		}
		return result;
	}
	x.insertDom=function(target,dom){/*在目标位置后面插入一个元素*/
		if(x.isElement(target)){
			if(target.nextSibling!=null){
				target.parentNode.insertBefore(dom,target.nextSibling);
			}
			else{
				target.parentNode.appendChild(dom);
			}
		}
	}
	x.getDomIndex=function(dom,container){/*获取自身在父元素中的位置  container不为空则获取自身在该容器的位置*/
		if(container){//如果容器不为空
			var _node=dom;
			if(_node&&_node.parentNode){
				if(_node.parentNode==container)	return x.getDomIndex(dom);
				while(true){
					_node=_node.parentNode;
					if(_node.parentNode==container){
						//;//out(_node);
						return $(_node).getP();
					}
					if(_node==document.body)/*已经到了最顶层*/return -1;
					
				}
			}
		}
		else{
			if(dom&&dom.parentNode){
				var childs=x.getChilds(dom.parentNode);/* problem maybe  _dom may be null*/
				for(var i=0;i<childs.length;i++)
					if(childs[i]==dom)	return i;
			}
		}
		return -1;
	}
	
	x.getAncestor=function(dom){/*祖先节点*/
		var result=[];
		var _p=dom.parentNode;
		while(_p&&_p!=document)
		{
			result.push($(_p));
			_p=_p.parentNode;
		}
		return result;
	}
		
	x.getAncestor2=function(dom){/*自身和祖先节点*/
		var result=[dom];
		var _p=dom.parentNode;
		while(_p&&_p!=document)
		{
			result.push($(_p));
			_p=_p.parentNode;
		}
		return result;
	}
	x.getSubs=function(dom){/*所有子孙节点*/
		//;////out("get subs!");
		var result=[];
		var _childs=x.getChilds(dom);
		//;////out("childs length:"+_childs.length);
		if(_childs.length==0){/*没有子节点了*/}
		else{
			x.add2(result,_childs);
			for(var i=0;i<_childs.length;i++){
				x.add(result,x.getSubs(_childs[i]));
			}
		}
		//;////out("result length:"+result.length);
		return result;
	}
	x.getSiblings=function(dom){/*所有子孙节点*/
		return x.getChilds(dom.parentNode);
	}
	var matchQuery=function(dom,selector){/*匹配查询*/
		var tagName=x.strSub(selector,".");
		var css=x.strSub(selector,".",1);
		//;////out("tagName:"+tagName+" css:"+css);
		var flag=null;

		if(css!=null){
			css=css.split(",");/*多重样式使用,隔开*/
			var cssNames=dom.className?dom.className.split(" "):[];
		}
		if(!isEmpty(tagName)){/*如果不为空*/
			if(dom.tagName.toLowerCase()==tagName)	flag=true;
			else									flag=false;
		}
		if((flag===null||flag===true)&&css!=null){
			if(x.includes(cssNames,css))	flag=true;
			else							flag=false;
		}
		//;////out("match query["+selector+"]cssNames:["+cssNames+"] flag:"+flag);
		return flag;
	}
	
	var getTargets=function(context,direct){/*获取目标*/
		var targets=[];
		if(context==null){
			targets=x.getSubs($(document.body));
		}
		else{
			var fun=null;
			if(direct==0)						fun=x.getAncestor2;
			else if(direct==1)					fun=x.getAncestor;
			else if(direct==2)					fun=x.getChilds;
			else if(direct==null||direct==3)	fun=x.getSubs;
			else if(direct==4)					fun=x.getPreNodes;
			else if(direct==5)					fun=x.getNextNodes;
			else if(direct==6)					fun=x.getSiblings;
			if(x.isArray(context)){
				for(var i=0;i<context.length;i++){
					var result=fun(context[i]);
					x.add2(targets,fun(context[i]));
				}
			}
			else{
				x.add2(targets,fun(context));
			}
		}
		return targets;
	}
	
	x.$1=function(selector,context,direct){
		var result=x.$(selector,context,direct);
		if(x.isArray(result))	return result[0];
		else					return result;
	}
	x.$=function(selector,context,direct){/*在上下文中查找符合条件的对象  方向也在direct里面 
		上上0（包括自身）  上1   下2  下下 3  左4  右5  同级6*/
		//if(direct==null)	{direct=2;}/*默认是2*/
		if(x.isStr(selector)){
			//alert(selector.str(1))
			if(selector.indexOf(" ")>0){/*选择器 是复合的需要递归*/
				var selectors=selector.split(" ");/*分割非可见字符*/
				var _context=context;
				for(var i=0;i<selectors.length;i++){/*分割后的选择器*/
					var s=selectors[i];
					_context=x.$(s,_context,direct);
					if(i==selectors.length-1){
						return _context;//上下文一直在变化
					}
				}
			}
			else{/*选择器 是单一的的不需要递归*/
				if(selector.indexOf("#")==0)return document.getElementById(x.strSub(selector,1));/*是按照id查找  最简单*/
				else{/*其他情况 如果是按照类名或者标签名  甚至根据属性进行查询 进行查询*/
					var targets=getTargets(context,direct);
					var doms=[];
					for(var i=0;i<targets.length;i++){/*先找到目标*/
						var dom=targets[i];
						if(matchQuery(dom,selector))	doms.push(dom);
					}
					return doms;
				}
			}
		}
		else if(x.isElement(selector))	return selector;
	}
	
		x.$e=function(name,num){
		if(isNum(num)){
			var result=[];
			for(var i=0;i<num;i++){
				result.push(document.createElement(name));
			}
			return result;
		}
		return document.createElement(name);
	}
	x.$file=function(className){
		var file=document.createElement("input");
		file.type="file";
		if(className)	file.className=className;
		return file;
	}
	x.$txt=function(className){
		var txt=document.createElement("input");
		txt.type="text";
		if(className)	txt.className=className;
		return txt;
	}
	x.$text=function(className){
		var text=document.createElement("textarea");
		//txt.type="text";
		text.rows=1;
		text.className=className;
		//if(className)	text.className=className;
		return text;
	}
	x.$table=function(rows,cols){/*创建一个table*/
		var table=x.$e("table")
		var tbody=x.$e("tbody");
		table.cellSpacing="0";
		table.cellPadding="0";
		//table.border="0";
		for(var i=0;i<rows;i++){
			var tr=x.$e("tr");
			for(var j=0;j<cols;j++){
				var td=x.$e("td");
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		return table;
	}

	x.$div=function(id,className){
		var div=x.$e("div");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	x.$checkbox=function(id,className){
		var check=x.$e("input");	check.type="checkbox";
		if(className)	check.className=className;
		if(id)			check.id=id;
		return check;
	}
	x.$span=function(id,className){
		var div=x.$e("span");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	var system_id_sequence=0;
	x.getId=function(prefix){
		var id=system_id_sequence++;
		if(prefix)	id=prefix+"_"+id;
		else		id="xdom_"+id;
		return id;
	}
})(window);

	