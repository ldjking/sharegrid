//所有文章列表
(function(){
	window.onload=init;
	
	var showArticle=function(tree,evt){
		cssAdd($("#dwIndex"),"hide");
		var target=evt.target;
		var obj=target.obj;
		//out("obj",obj);
		if(obj!=null&&obj.type=="file"){
			$("#iframe").src="./assign/"+obj.path;
		}
	}
	
	function init(){
		//showData();
		var data=xml2Json("assign/data.xml");
		genTree($("#list"),{clickHandler:showArticle,data:data[1].child,nameAttr:"name"});
	}
	
	
})();