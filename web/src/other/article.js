//所有文章列表
(function(){
	window.onload=init;
	
	var showArticle=function(tree,evt){
		var target=evt.target;
		var obj=target.obj;
		//out("obj",obj);
		if(obj!=null&&obj.type=="file"){
			out("is file","article/"+obj.path);
			$("#iframe").src="article/"+obj.path;
		}
	}
	
	function init(){
		//showData();
		//out("init");
		var data=xml2Json("article/data.xml");
		//out("genTree");
		genTree($("#list"),{clickHandler:showArticle,data:data});
	}
	
	
})();