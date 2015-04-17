(function(x){
	var createUploadIframe = function() {
		var frameId = 'jUploadFrame';
		if(document.getElementById(frameId)!=null)	return document.getElementById(frameId);
//		var iframe =$e("iframe");
//		iframe.id = frameId;
//		iframe.name = frameId;
//		iframe.src = 'javascript:false';
		if (window.ActiveXObject) {
			try {
				var iframe = document.createElement('<iframe id="' + frameId+ '" name="' + frameId + '" ></iframe>')
			} catch (e) {// 兼容IE9的问题
				var iframe = document.createElement('iframe');
				iframe.id = frameId;
				iframe.name = frameId;
			}
			iframe.src = 'javascript:false';
		} else {
			var iframe = document.createElement('iframe');
			iframe.id = frameId;
			iframe.name = frameId;
		}
		iframe.style.position = 'absolute';
		iframe.style.top = '-1000px';
		iframe.style.left = '-1000px';
		document.body.appendChild(iframe);
		return iframe;
	}
	var createUploadForm = function(id,fileElementId) {
		var formId = 'jUploadForm'+id;
		var fileId = 'jUploadFile'+id;
		var form= document.getElementById(formId);
		if(form==null)	form=document.createElement("form");
		if(document.getElementById(fileId)!=null)	form.removeChild(document.getElementById(fileId));
		form.id=formId;
		//form.name=formId;
		form.action="";
		form.method="POST";
		form.enctype="multipart/form-data";
		var oldElement = document.getElementById(fileElementId);
		var newElement = oldElement.cloneNode(true);
		newElement.onchange=ajaxUpload;
		newElement.cfg=oldElement.cfg;
		oldElement.id = fileId;
		oldElement.namespaceURI=fileId;
		oldElement.parentNode.insertBefore(newElement, oldElement);
		form.appendChild(oldElement);
		form.style.position = "absolute";
		form.style.top = "-1200px";
		form.style.left = "-1200px";
		document.body.appendChild(form);
		return form;
	}
	x.ajaxUpload=function(evt){
		//out("上传启动",null,null,true);
		var fileDom=this;
		var cfg=fileDom.cfg;/*参数*/
		cfg.fileElementId=fileDom.id;
		ajaxFileUpload(cfg);/*代表上传操作   上传的配置信息从哪获取*/
	}
	var ajaxFileUpload = function(cfg) {
		var id = new Date().getTime();
		var form = createUploadForm(id,cfg.fileElementId);
		var iframe = createUploadIframe();
		try {
			form.setAttribute("action",cfg.url);
			form.setAttribute('target', "jUploadFrame");
			if (form.encoding) {
				form.encoding = 'multipart/form-data';
			} else {
				form.enctype = 'multipart/form-data';
			}
			form.submit();
		} catch (e) {}
	}
})(window)