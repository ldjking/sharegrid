/*51editor		编辑器*/
(function(x){	/*编辑器第一步能把页面的内容捕获出来*/
	x.getFile=function(src,fn){
		var iframe=$("#iframe1");
		//iframe.style.display="none";
		iframe.src="test1.html";
		iframe.onreadystatechange=function(){
			if(iframe.readyState=="complete"){
				fn(iframe);
			}
		}
		document.body.appendChild(iframe);
	}
	var transHtml=function(html){
		var str=html;
		str=str.replace(/\>/g,"&gt");
		str=str.replace(/\</g,"&lt");
		return str;
	}
	var fn=function(iframe){
		/*获取到iframe的内容并展示到编辑器内*/
		var html=iframe.contentWindow.document.body.parentNode.outerHTML;
		//alert(html);
		$("#editor").innerHTML=transHtml(html);
	}
	x.preview=function(){
		/*预览模式*/
		var iframe=$("#iframe2");
		//iframe.contentEditable=true;
		var doc=iframe.contentWindow.document;
		/*要把有脚本的地方单独拿出来运行*/
		var html=$("#editor").value;
		var script=html.substr(html.indexOf("<script"));
		//alert(script);
		
		 var editor;
      editor = document.getElementById("iframe2").contentWindow;
   // 针对IE浏览器, make it editable
     // editor.document.designMode = 'On';
     // editor.document.contentEditable = true;
   // For compatible with FireFox, it should open and write something to make it work
editor.document.open();
editor.document.writeln(html);
//editor.document.writeln('<html><head>');
//editor.document.writeln('<style>body {background: white;font-size:9pt;margin: 2px; padding: 0px;}</style>');
//editor.document.writeln('</head><body>fqaflkas f</body></html>');
editor.document.close();
		//var src=script.substr(script.indexOf(">")+1);
//		src=src.substr(0,src.lastIndexOf("<script>"));
//		//alert(src);
//		var script=doc.createElement("script");
//		script.innerHTML=src;
//		doc.body.appendChild(script);
		
		//iframe.contentWindow.document.body.innerHTML=$("#editor").value;
	}
	//x.getFile("test1.html",fn);
})(window);
