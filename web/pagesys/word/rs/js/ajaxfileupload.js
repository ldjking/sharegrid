var fileupload = {};
fileupload.createUploadIframe = function(id, uri) {
	// create frame
	var frameId = 'jUploadFrame' + id;
	if (window.ActiveXObject) {
		try {
			var io = document.createElement('<iframe id="' + frameId
					+ '" name="' + frameId + '" ></iframe>')
		} catch (e) {// 兼容IE9的问题
			var io = document.createElement('iframe');
			io.id = frameId;
			io.name = frameId;
		}
		if (typeof uri == 'boolean') {
			io.src = 'javascript:false';
		} else if (typeof uri == 'string') {
			io.src = uri;
		}
	} else {
		var io = document.createElement('iframe');
		io.id = frameId;
		io.name = frameId;
	}
	io.style.position = 'absolute';
	io.style.top = '-1000px';
	io.style.left = '-1000px';
	document.body.appendChild(io);
	return io
}
fileupload.createUploadForm = function(id, fileElementId) {
	// create form
	var formId = 'jUploadForm' + id;
	var fileId = 'jUploadFile' + id;
	var form =document.createElement("form");
	form.id=formId;
	form.name=formId;
	form.action="";
	form.method="POST";
	form.enctype="multipart/form-data";
	var oldElement = document.getElementById(fileElementId);
	var newElement = oldElement.cloneNode(true);
	oldElement.id = fileId;
	oldElement.parentNode.insertBefore(newElement, oldElement);
	form.appendChild(oldElement);
	// set attributes
	form.style.position = "absolute";
	form.style.top = "-1200px";
	form.style.left = "-1200px";
	document.body.appendChild(form);
	return form;
}
fileupload.ajaxFileUpload = function(s) {
	var id = new Date().getTime()
	var form = fileupload.createUploadForm(id, s.fileElementId);
	var io = fileupload.createUploadIframe(id, s.secureuri);
	var frameId = 'jUploadFrame' + id;
	//var formId = 'jUploadForm' + id;
	// Watch for a new set of requests
	var requestDone = false;
	// Create the request object
	// Wait for a response to come back
	var uploadCallback = function(isTimeout) {
		var data = {}
		var io = document.getElementById(frameId);
		try {
			if (io.contentWindow) {
				data.responseText = io.contentWindow.document.body
						? io.contentWindow.document.body.innerHTML
						: null;
				data.responseXML = io.contentWindow.document.XMLDocument
						? io.contentWindow.document.XMLDocument
						: io.contentWindow.document;

			} else if (io.contentDocument) {
				data.responseText = io.contentDocument.document.body? io.contentDocument.document.body.innerHTML: null;
				data.responseXML = io.contentDocument.document.XMLDocument
						? io.contentDocument.document.XMLDocument
						: io.contentDocument.document;
			}
		} catch (e) {
			fileupload.handleError(s, data, null, e);
		}
		if (data || isTimeout == "timeout") {
			requestDone = true;
			var status;
			try {
				status = isTimeout != "timeout" ? "success" : "error";
				// Make sure that the request was successful or notmodified
				if (status != "error") {
					// process the data (runs the xml through httpData
					// regardless of callback)
					var data = fileupload.uploadHttpData(data, s.dataType);
					// If a local callback was specified, fire it and pass
					// it the data
					if (s.success)
						s.success(data, status);
				} else
					fileupload.handleError(s, data, status);
			} catch (e) {
				status = "error";
				fileupload.handleError(s, data, status, e);
			}

			// Process result
			if (s.complete)
				s.complete(data, status);
			setTimeout(function() {
						try
						{
							io.parentNode.removeChild(io);
							form.parentNode.removeChild(form);
						} catch (e) {
							fileupload.handleError(s, data, null, e);
						}
					}, 100)
			data = null

		}
	}
	// Timeout checker
	if (s.timeout > 0) {
		setTimeout(function() {
					// Check to see if the request is still happening
					if (!requestDone)
						uploadCallback("timeout");
				}, s.timeout);
	}
	try {
		form.setAttribute("action",s.url);
		form.setAttribute('method', 'POST');
		form.setAttribute('target', frameId);
		if (form.encoding) {
			form.encoding = 'multipart/form-data';
		} else {
			form.enctype = 'multipart/form-data';
		}
		form.submit();

	} catch (e) {
		//jQuery.handleError(s, xml, null, e);
	}
	if (window.attachEvent) {
		document.getElementById(frameId).attachEvent('onload', uploadCallback);
	} else {
		document.getElementById(frameId).addEventListener('load',
				uploadCallback, false);
	}
	return {
		abort : function() {
		}
	};
}
fileupload.uploadHttpData=function( r, type ) {
    var data = !type;
    data = type == "xml" || data ? r.responseXML : r.responseText;
    // If the type is "script", eval it in global context
    if ( type == "json" )
        eval( "data = " + data );
    return data;
}
fileupload.handleError=function(s, data, status, e){
	if(e){
		alert(e);
	}
	if(status==null||status=="error"){
		return;
	}
	if (s.error)
		s.error(data, status);
}