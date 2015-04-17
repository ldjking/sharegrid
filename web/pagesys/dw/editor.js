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
		
		var fileEditor=$div(null,"editor");
		$("#editors").appendChild(fileEditor);
		
		fileTab.innerHTML=file.name;

		
		file.tabDom=fileTab;
		file.editorDom=fileEditor;
		
		genEditorContent(file);
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
	
	
	
	
	
	function e_preview_click(evt){
		////out("preview");
		var file=activeFile;
		if(file!=null){
			var base="http://localhost/eam/web";
			//out("filePath",file.path);
			window.open(base+file.path);
		}
	}
	
	function genEditorData(){/*生成编辑器数据*/
		var content="";
		var editor=activeEditor;
		var table=editor.childNodes[0];
		for(var i=0;i<table.rows.length;i++){
			var str=table.rows[i].cells[1].childNodes[0].innerHTML;
			if(i>0)	content+="\n";
			content+=str;
		}
		////out("content",content);
		return content;
	}
	
	function saveFile(){
		/*获取当前编辑器内容*/
		var file=activeFile;
		var param={cmd:"setData",path:file.path};
		param.data=genEditorData();
		//out("param",jsonStr(param,false));
		var result=$$("file",param,true);
		//out("saveResult",result);
	}	
		
	function e_editor_keyDown(evt){
		var keyCode=evt.keyCode;
		////out("ctrl",evt.ctrlKey);
		if(keyCode=="83"&&evt.ctrlKey){/*保存操作  自动保存更新*/
			saveFile();
			x.stopEvt(evt);
		}
	}
	
	
	function genEditorContent(file){
		////out("gen content",file.content);
		x.bind($("#preview"),"click",e_preview_click);
		var content=file.content;
		var editorDom=file.editorDom;
		var lines=content.split(/\n/g);/**/
		var table=$table(lines.length,2);
		editorDom.appendChild(table);
		table.className="editorTable";
		
		x.bind(editorDom,"keydown",e_editor_keyDown);

		for(var i=0;i<lines.length;i++){
			var cell1=table.rows[i].cells[0];
			var cell2=table.rows[i].cells[1];
			cell1.innerHTML=(i+1);
			var div=$e("pre");
			cell2.appendChild(div);

			div.contentEditable=true;
			div.innerHTML=formatHtml(lines[i]);
		}
		
	}
	function formatHtml(str){
		str=str.replace(/>/g,"&gt;");
		str=str.replace(/</g,"&lt;");
		return str;
	}

	
	
	x.openEditor=function(file){/*打开一个编辑器*/
		//out("open file",file);
		if(file.type==".txt"||file.type==".html"||file.type==".css"||file.type==".js"){
			if(file.content==null){
				var result=$$("file",{cmd:"get",path:file.path});
				////out("open file result",result);
				/*把数据清理成按行格式 如何自动缩进  能不能*/
				file.content=result.data.data;
			}
			addFile(file);
		}

	}
})(window)