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
	
	
	function addTableDom(file){
		var fileTab=$div(null,"tab");
		$("#pageTabs").appendChild(fileTab);
		
		var fileEditor=$div(null,"editor");
		$("#editors").appendChild(fileEditor);
		
		fileTab.innerHTML=file.name;

		
		file.tabDom=fileTab;
		file.editorDom=fileEditor;
		
		genEditorContent(file);
	}
	
	function addTable(file){
		////out("addFile");
		var editor=$("#dwMain");
		editor.style.display="block";
		if(file.tabDom==null){
			addTableDom(file);
		}
		activateFile(file);
	}
	
	
	
	
	
	function e_preview_click(evt){
		////out("preview");
		excuteSql();
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
	
	function excuteSql(file){/**/
		if(file==null)	file=activeFile;
		if(file!=null){
			var sqlDom=file.editorDom.childNodes[0];
			var dataDom=file.editorDom.childNodes[1];
			var param={cmd:"excute"};
			param.sql=sqlDom.value;
			param.db=file.db;
			////out("param",param);
			var result=$$("db",param);
			
			/*执行完毕后  使用genTable生成一个表格 或者grid 先生成表格吧*/
			////out("excuteSql Result",result);
		}
	}
	
	
	
	function genEditorContent(file){
		////out("gen content",file.content);
		x.bind($("#preview"),"click",e_preview_click);
		var editorDom=file.editorDom;
		
		var sql="select t.* from "+file.name+" t";
		var editor=$text("sql");
		var dataDom=$div(null,"data")
		editorDom.appendChild(editor);
		editorDom.appendChild(dataDom);
		editor.value=sql;
		dataDom.innerHTML="data";
		
		excuteSql(file);
		////out("file.name",sql);
		//x.bind(editorDom,"keydown",e_editor_keyDown);

		//for(var i=0;i<lines.length;i++){
//			var cell1=table.rows[i].cells[0];
//			var cell2=table.rows[i].cells[1];
//			cell1.innerHTML=(i+1);
//			var div=$e("pre");
//			cell2.appendChild(div);
//
//			div.contentEditable=true;
//			div.innerHTML=formatHtml(lines[i]);
//		}
		
	}
	function formatHtml(str){
		str=str.replace(/>/g,"&gt;");
		str=str.replace(/</g,"&lt;");
		return str;
	}

	
	
	x.openEditor=function(file){/*打开一个编辑器*/
		////out("open file",file);
		if(file.type=="table"){
			addTable(file);
		}

	}
})(window)