(function(){
	function genData(){/*生成数据  获取文件目录信息*/
		var result=$$("file",{cmd:"getAll"});
		//out("result",result);
		var data={name:"站点-风电资产管理系统",type:"folder"};
		if(result.data!=null){
			genPath("",result.data);
		}
		data.child=result.data;
		genTree($("#fileContent"),{editmode:0,data:data,dblHandler:function(tree,evt){
						/*双击事件，如果是html文件则直接打开 进入编辑模式*/
						var target=getTarget(evt);
						//out("target",target);
						if(target.obj!=null){
							openEditor(target.obj);
						}
					}});
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
