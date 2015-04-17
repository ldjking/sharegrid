/*44pager		把文章拆分成word页面形式  识别文档的段落标记，形成索引目录*/
(function(x){	/*menu效果*/
	x.genDoc=function(dom){
		/**/
	}
	x.genCatolog=function(dom){/*顶层的容器  【——.doc样式】 */
		/*分析出来目录结构*/
		var e_paperto_handler=function(evt){
			var target=getTarget(evt),dom=$("#doc");
			scrollPanelTo(dom,target.targetDom);
		}
		var catelog=$("#catelog");
		var content=$("#paperContent");
		var p1s=content.childNodes;
		for(var i=0;i<p1s.length;i++){
		var node=p1s[i];
		if(node.className==null)	   continue;
		var c=null;
		if(cssContain(node,"p1")) 	   c=$div(null,'c1');
		else if(cssContain(node,"p2")) c=$div(null,'c2');
		else if(cssContain(node,"p3")) c=$div(null,'c2');
		else 						   continue;
		c.targetDom=node;
		c.innerHTML=node.innerHTML;
		catelog.appendChild(c);
		bind(c,'click',e_paperto_handler);
		}
	}
	x.genPaper=function(dom){
	}
})(window);
