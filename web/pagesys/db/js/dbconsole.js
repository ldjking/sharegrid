(function (){

	function genData(){/*生成数据  获取文件目录信息*/
		$$("db",{cmd:"get"},false,back_getData);
		
		
	}

			
	var back_getData=function(result){
		////out("result",result);
		var data={name:"所有数据库"};
		if(result.data!=null){
			genPath("",result.data);
		}
		data.child=result.data;
		////out("result",result);
		genTree({dom:$("#fileContent")},data);
	}
	
	var genPath=function(db,data){
		if(data!=null){
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				if(obj.objType=="db"){
					obj.db=obj.name;
				}else{
					obj.db=db;
				}
				genPath(obj.db,obj.child);
			}
		}
	}
	
	function init(){/*初始化*/
		genData();
	}
	window.onload=init;	
})();
