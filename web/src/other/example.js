//所有文章列表
(function(){
	window.onload=init;
	
	var transHtml=function(html){
		var str=html;
		str=str.replace(/\>/g,"&gt");
		str=str.replace(/\</g,"&lt");
		return str;
	}
	var fn_preview=function(evt){
		//iframe.contentEditable=true;
		out("preview");
		/*要把有脚本的地方单独拿出来运行*/
		var html=$("#editor").value;
		var iframe=$("#iframe");
		editor =iframe.contentWindow;
		editor.document.open();
		editor.document.writeln(html);
		editor.document.close();
	}
	var showArticle=function(tree,evt){
		var target=evt.target;
		var obj=target.obj;
		//out("obj",obj);
		if(obj!=null&&obj.type=="file"){
			out("is file",obj.path);
			$("#iframe").onreadystatechange=function(){
				//alert(this.readyState);
				if(this.readyState=="complete"){
					var html=this.contentWindow.document.body.parentNode.outerHTML;
					$("#editor").innerHTML=transHtml(html);
				}
			}
			$("#iframe").src=obj.path;
		}
	}
	
	function init(){
		//showData();
		bind($("#preview"),"click",fn_preview);

		var data=xml2Json("rs/data.xml");
		genTree($("#list"),{clickHandler:showArticle,data:data,nameAttr:"name"});
	}
	
	
})();