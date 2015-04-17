(function(x){
	var files=[];
	var activeFile;
	var activeTab;
	var activeEditor;
	
	function activateFile(file){
		x.cssRm([activeTab,activeEditor],"active");
		activeTab=file.tabDom;
		activeEditor=file.editorDom;
		x.cssAdd([activeTab,activeEditor],"active");
		activeFile=file;
	}
	
	
	function addFileDom(file){
		var fileTab=$div(null,"tab");
		$("#pageTabs").appendChild(fileTab);
		
		//var fileEditor=$div(null,"editor");
		//alert(file.type);
		if(file.type==".html"){
			var fileEditor=$e("iframe");
			fileEditor.className="editor";
			//out(file.path);
			fileEditor.frameBorder=0;
			fileEditor.style.height="100%";
			fileEditor.style.width="100%";
			fileEditor.src="../docs/"+file.path;
			$("#editors").appendChild(fileEditor);
		}
		else{
			var fileEditor=$div(null,"editor");
			fileEditor.innerHTML=formatHtml(file.content);
			$("#editors").appendChild(fileEditor);
		}
		fileTab.innerHTML=file.name;

		
		file.tabDom=fileTab;
		file.editorDom=fileEditor;
		
	}
	
	function addFile(file){
		////out("addFile");
		var editor=$("#dwMain");
		editor.style.display="block";
		if(file.tabDom==null){
			addFileDom(file);
		}
		activateFile(file);
	}
	
	function formatHtml(str){
		
		str=str.replace(/>/g,"&gt;");
		str=str.replace(/</g,"&lt;");
		str=str.replace(/\n/g,"<br/>");
		return str;
	}

	
	
	x.openEditor=function(file){/*打开一个编辑器*/
		////out("open file",file);
		if(file.type!="folder"){
			if(file.content==null){
				var result=$$("file",{cmd:"get",path:"docs/"+file.path});
				////out("open file result",result);
				/*把数据清理成按行格式 如何自动缩进  能不能*/
				file.content=result.data.data;
			}
			addFile(file);
		}

	}
})(window)