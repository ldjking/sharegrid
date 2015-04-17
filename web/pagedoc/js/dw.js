(function (){
	function genData(){/*生成数据  获取文件目录信息*/
		var result=$$("file",{cmd:"getAll",path:"\docs"});
		//out("result",result);
		var data={name:"所有文档"};
		if(result.data!=null){
			genPath("",result.data);
		}
		data.child=result.data;
		genTree({dom:$("#fileContent")},data);
	}
	
	var genPath=function(prefix,data){
		if(data!=null){
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				obj.path=prefix+"/"+obj.name;
				genPath(obj.path,obj.child);
			}
		}
	}
	
	function init(){/*初始化*/
		genData();
	}
	window.onload=init;	
})();
