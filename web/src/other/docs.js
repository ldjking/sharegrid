/*docs	负责文档格式标准化*/
(function(x){
	window.onload=function(){
		//genCatolog($("#doc"));
		uiScroll($("#doc"),{color:"#666",opacity:0.6});
		 //scrollPanelTo($("#doc"),null,null,600);
	}
	
	var e_catolog_handler=function(evt){
		var target=getTarget(evt),dom=$("#doc");
		scrollPanelTo(dom,target.targetDom);
	}
	var genCatolog=function(dom){/*顶层的容器  【——.doc样式】 */
		/*分析出来目录结构*/
		var catalog=$div("catalog","catalog");
		var content=$("#paperContent");
		var p1s=content.childNodes;
		for(var i=0;i<p1s.length;i++){
			var node=p1s[i];
			if(node.className==null)	continue;
			var c=null;
			if(cssContain(node,"p1")) 		c=$div(null,'c1');
			else if(cssContain(node,"p2"))	c=$div(null,'c2');
			else if(cssContain(node,"p3")) 	c=$div(null,'c2');
			else							continue;
			c.targetDom=node;
			c.innerHTML=node.innerHTML;
			catalog.appendChild(c);
			bind(c,'click',e_catolog_handler);
		}
	}
})(window);
