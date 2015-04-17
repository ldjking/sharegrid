var doc = {};
var sharePeo="<option value=\"0\"></option>";
var shareRole="<option value=\"0\"></option>";
var auths=[1020,1021,1022];
var authsName=['读','写','授权'];
var setting = {
	async : {
		enable : true,
		url : getUrl,
		dataFilter : ajaxDataFilter
	},
	edit:{
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data : {
		key : {
			name : "t1_name"
		},
		simpleData : {
			enable : true,
			idKey : "t1_id",
			pIdKey : "t1_pid",
			rootPId : 0
		}
	},
	view : {
		expandSpeed : ""
	},
	callback : {
		beforeExpand : beforeExpand,
		onAsyncSuccess : onAsyncSuccess,
		onAsyncError : onAsyncError,
		onClick : zTreeOnClick,
		foreDrag: beforeDrag,
		beforeDrop: beforeDrop,
		onDrop:zTreeOnDrop
	}
};
doc.init = function() {
	var param={};
	//取是所有的人。
	param.cmd="getAllPeo";
	var pr = $$("cy_excute", param, false);
	$.each(pr.data,function(i,obj){
		sharePeo+="<option value=\""+obj.c0_id+"\">"+obj.c0_name+"</option>";
	});
	//取得所有的角色
	param.cmd="getAllRole";
	var rr = $$("cy_excute", param, false);
	$.each(rr.data,function(i,obj){
		shareRole+="<option value=\""+obj.c1_id+"\">"+obj.c1_name+"</option>";
	});
	doc.regEvent();
	doc.personalDataInit();
}

doc.regEvent = function() {
	// 初始化页签事件
	$("#personal").bind("click", doc.personalDataInit);
	$("#share").bind("click", doc.shareDataInit);
	// 按钮事件初始化
	$("#makeDir").bind("click", doc.makeDir);
	$("#makeFile").bind("click", doc.makeFile);
	$("#del").bind("click", doc.del);
	$("#shareFile").bind("click", doc.share);
	$("#shareSave").bind("click", doc.saveShare);
	$("#editContent").bind("click",doc.editContent);
	$("#upload").bind("click",doc.upload);
	$("#download").bind("click",doc.download);
	$("#view").bind("click",doc.view);
	//初始化工具栏
	$("#fontsize").bind("change",function(){
		_doc.execCommand("fontsize",false,this.value);
	});
	$("#fontname").bind("change",function(){
		_doc.execCommand("fontname",false,this.value);
	});
	$("#color").bind("change",function(){
		_doc.execCommand("ForeColor",false,this.value);
	});
	$("#background").bind("change",function(){
		_doc.execCommand("BackColor",false,this.value);
	});
	$("#bold").bind("click",function(){
		_doc.execCommand("Bold",false,null);
	});
	$("#underline").bind("click",function(){
		_doc.execCommand("underline",false,null);
	});
	$("#italic").bind("click",function(){
		_doc.execCommand("italic",false,null);
	});
	$("#cut").bind("click",function(){
		if (navigator.userAgent.indexOf("Firefox") > 0) {
           alert("您的浏览器安全设置不允许编辑器自动执行剪切操作，请使用键盘快捷键(Ctrl+X)来完成。");
           _win.focus();
        }else{
        	_doc.execCommand("cut",false,null);
        }
	});
	$("#copy").bind("click",function(){
		if (navigator.userAgent.indexOf("Firefox") > 0) {
           alert("您的浏览器安全设置不允许编辑器自动执行剪切操作，请使用键盘快捷键(Ctrl+C)来完成。");
           _win.focus();
        }else{
        	_doc.execCommand("copy",false,null);
        }
	});
	$("#paste").bind("click",function(){
		if (navigator.userAgent.indexOf("Firefox") > 0) {
           alert("您的浏览器安全设置不允许编辑器自动执行剪切操作，请使用键盘快捷键(Ctrl+V)来完成。");
           _win.focus();
        }else{
          _doc.execCommand("paste",false,null);
        }
	});
	$("#undo").bind("click",function(){
		_doc.execCommand("undo",false,null);
	});
	$("#redo").bind("click",function(){
		_doc.execCommand("redo",false,null);
	});
	$("#delete").bind("click",function(){
		_doc.execCommand("delete",false,null);
	});
	//分页事件的绑定
	$("#xPagingAnalyse").bind("click",function(){
		Paging.init();
	});
	$("#xPagingCreate").bind("click",function(){
		Paging.create();
	});
	$("#xPagingDelete").bind("click",function(){
		Paging.remove();
	});
	$("#xPagingUnite").bind("click",function(){
		Paging.unite();
	});

}


doc.personalDataInit = function() {
	var result = doc.getPersonalRoot();
	var objs=[];
	var r={}
//	obj=result.data;
	$.each(result.data,function(i,obj){
		//alert(obj.isparent);
		r=clone(obj);
		r.isParent=obj.isparent;
		objs.push(r);
	});
//	for (var p in result.data) {
//		alert(result.data[p].isparent);
//	}
//	alert($myStr(objs));
//	alert(obj[0].isparent);
	$.fn.zTree.init($("#treeDemo"), setting, objs);
}
// 取得个人所拥有的目录
doc.getPersonalRoot = function() {
	var param = {};
	param.cmd = "getPersonalRoot";
	var result = $$("cy_excute", param, false);
	return result;
}
// 取得共享根目录
doc.shareDataInit = function() {
	var param = {};
	param.cmd = "getShareRoot";
	var result = $$("cy_excute", param, false);
//	for(var i in result.data){
//		alert(i+"="+result.data[i]);
//	}
	var r=clone(result.data);
	r.isParent=result.data.isparent;
	$.fn.zTree.init($("#treeDemo"), setting,r);
}
//初始化创建目录
doc.makeDir = function() {
	var c0_name="";
	var param = {};
	param.cmd = "getPersonNameById";
	var result = $$("cy_excute", param, false);
	if (result.flag) {
		c0_name=result.data.c0_name;
	}
	var l = $("#table2 tbody tr").length;
	var name = "<input type=\"text\" id=\"newDir_" + l
			+ "\"  onblur=\"doc.submitMakeDir(this)\" />"
	var html = "<tr><td><input type=\"checkbox\" id=\"cb_" + l
			+ "\" value=\"\" /></td><td id=\"tdName_" + l + "\">" + name
			+ "</td><td>" + $("#t1_path").val()
			+ "</td><td>"+c0_name+"</td><td>文件夹</td></tr>"
	$("#table2 tbody").append(html);
	$("#newDir_" + l)[0].focus();
}
//提交创建目录
doc.submitMakeDir = function(t) {
	var v = t.value;
	// var v=$("#newDir").val();
	if (v == "") {
		alert("请输入文件夹名称！");
		return false;
	}
	var l = $("#table2 tbody tr").length;
	var param = {};
	param.cmd = "mkdir";
	param.t1_name = v;
	param.t1_path = $("#t1_path").val();
	param.t1_pid = $("#t1_pid").val();
	param.t1_type = "1010";
	param.t2_auths=$("#t2_auths").val();
	var result = $$("cy_excute", param, false);
	if (result.flag) {
		var id = t.id;
		var index = id.substring((id.indexOf("_") + 1), id.length);
		$("#tdName_" + index).html(v);
		$("#tdName_" + index).bind("dblclick", function() {
			doc.reName(index, result.data.t1_id, v)
		});
		$("#cb_" + index).attr("value", result.data.t1_id)
	}else{
		alert(result.msg);
	}
}
//初始化创建文件
doc.makeFile = function() {
	var c0_name="";
	var param = {};
	param.cmd = "getPersonNameById";
	var result = $$("cy_excute", param, false);
	if (result.flag) {
		c0_name=result.data.c0_name;
	}
	var l = $("#table2 tbody tr").length;
	var name = "<input type=\"text\" id=\"newFile_" + l
			+ "\"  onblur=\"doc.submitMakeFile(this)\" />"
	var html = "<tr><td><input type=\"checkbox\" id=\"cb_" + l
			+ "\" value=\"\" /></td><td id=\"tdName_" + l + "\">" + name
			+ "</td><td>" + $("#t1_path").val()
			+ "</td><td>"+c0_name+"</td><td>文件</td></tr>"
	$("#table2 tbody").append(html);
	$("#newFile_" + l)[0].focus();
}
//提交创建文件
doc.submitMakeFile = function(t) {
	var v = t.value;
	if (v == "") {
		alert("请输入文件名称！");
		return false;
	}
	var param = {};
	param.cmd = "mkfile";
	param.t1_name = v;
	param.t1_path = $("#t1_path").val();
	param.t1_pid = $("#t1_pid").val();
	param.t1_type = "1011";
	param.t2_auths=$("#t2_auths").val();
	var result = $$("cy_excute", param, false);
	if (result.flag) {
		var id = t.id;
		var index = id.substring((id.indexOf("_") + 1), id.length);
		$("#tdName_" + index).html(v);
		$("#tdName_" + index).bind("dblclick", function() {
			doc.reName(index, result.data.t1_id, v)
		});
		$("#cb_" + index).attr("value", result.data.t1_id)
	}else{
		alert(result.msg);
		$(t).parent().parent().remove();
	}
}
//初始化重命名
doc.reName = function(i, t1_id, t1_name) {
	// alert(i+"="+id);
	var html = "<input type=\"text\" id=\"new_" + i
			+ "\"  onblur=\"doc.submitReName(this,'" + t1_id + "','" + t1_name
			+ "')\" value=\"" + t1_name + "\" />"
	$("#tdName_" + i).html(html);
	$("#new_" + i)[0].focus();
}
//提交重命名
doc.submitReName = function(t, t1_id, t1_name) {
	var v = t.value;
	if (v != t1_name) {
		var param = {};
		param.cmd = "rename";
		param.t1_id = t1_id;
		param.t1_name = v;
		param.t2_auths=$("#t2_auths").val();
		param.t1_pid = $("#t1_pid").val();
		var result = $$("cy_excute", param, false);
		if (result.flag) {
			var id = t.id;
			var index = id.substring((id.indexOf("_") + 1), id.length);
			$("#tdName_" + index).html(v);
			$("#tdName_" + index).unbind("dblclick").bind("dblclick",function() {
				doc.reName(index, t1_id, v)
			});
		}else{
			alert(result.msg);
			var id = t.id;
			var index = id.substring((id.indexOf("_") + 1), id.length);
			$("#tdName_" + index).html(t1_name);
		}
	} else {
		var id = t.id;
		var index = id.substring((id.indexOf("_") + 1), id.length);
		$("#tdName_" + index).html(t1_name);
	}
}
//删除文件
doc.del = function() {
	var cbs = $("#table2 input:checked");
	var l = cbs.length;
	if (l > 0) {
		if (window.confirm("确定要删除这些记录吗\n删除文件夹时，会把其下所有的文件都删除")) {
			var t1_id = "";
			cbs.each(function() {
				// alert($(this).val());//$(obj).clone(false).wrap("<div/>").parent().html();
				t1_id += $(this).val() + ";"
			});
			var param = {};
			param.cmd = "delete";
			param.t1_id = t1_id;
			param.t2_auths=$("#t2_auths").val();
			param.t1_pid = $("#t1_pid").val();
			var result = $$("cy_excute", param, false);
			if (result.flag) {
				cbs.each(function() {
					$(this).parent().parent().remove();
				});
				alert("删除成功！");
			}else{
				alert(result.msg);
			}
		}
	} else {
		alert("请至少选择一条记录！");
		return false;
	}
}
//初始化文件的共享
doc.share = function() {
	var cbs = $("#table2 input:checked");
	var l = cbs.length;
	if (l > 0) {
		$("#shareSave").attr("disabled",false);
		//alert(cbs.get(0).value);
		//alert(cbs.eq(0).val());
		//取得共享的记录
		//alert(cbs.eq(0).val());
		var param={};
		param.cmd="getShareByDoc";
		param.t1_id=cbs.eq(0).val();
		param.t2_auths=$("#t2_auths").val();
		param.t1_pid = $("#t1_pid").val();
		$("#share_t1_id").attr("value",cbs.eq(0).val());
		var id = cbs.eq(0).attr("id");
		var index = id.substring((id.indexOf("_") + 1), id.length);
		var docName=$("#tdName_" + index).html();
		var result = $$("cy_excute", param, false);
		var tableHtml="<table id=\"tableShare\" class=\"table2\"><thead><tr><th>文件名称</th><th>共享人</th><th>共享角色</th><th>权限</th><th>是否继承权限</th><th><img src=\"rs/img/edit_add.gif\" onclick=\"doc.addShare('"+docName+"')\"></th></tr></thead><tbody>";
		if(result.flag){
			$.each(result.data, function(i, obj) {
				var peoHtml="<select id=\"sel_peo_"+i+"\">"+sharePeo+"</select><script type=\"text/javascript\">$(\"#sel_peo_"+i+"\").attr(\"value\","+obj.c0_id+")</script>";
				var roleHtml="<select id=\"sel_role_"+i+"\">"+shareRole+"</select><script type=\"text/javascript\">$(\"#sel_role_"+i+"\").attr(\"value\","+obj.c1_id+")</script>";
				var authsHtml="";
				for(var i=0,l=auths.length;i<l;i++){
					//alert(obj.t2_auths.indexOf(auths[i]));
					if(obj.t2_auths.indexOf(auths[i])>=0){
						authsHtml+="<input type=\"checkbox\" name=\"auths_"+i+"\" value=\""+auths[i]+"\" checked=\"checked\" />";
					}else{
						authsHtml+="<input type=\"checkbox\" name=\"auths_"+i+"\" value=\""+auths[i]+"\" />";
					}
					authsHtml+=authsName[i]+"&nbsp;&nbsp;";
				}
				var isChilds="";
				if(obj.t2_is_effect_childs==1030){
					isChilds+="<input type=\"checkbox\" name=\"isChilds_"+i+"\" checked=\"checked\" />";
				}else{
					isChilds+="<input type=\"checkbox\" name=\"isChilds_"+i+"\" />";
				}
				tableHtml+="<tr><td>"+docName+"</td><td>"+peoHtml+"</td><td>"+roleHtml+"</td><td>"+authsHtml+"</td><td>"+isChilds+"</td><td><img src=\"rs/img/edit_remove.gif\" onclick=\"doc.removeShare(this)\"></td></tr>";
			});
		}else{
			alert(result.msg);
		}
		tableHtml+="</tbody></table>"
		$("#shareTable").html(tableHtml);
	}else {
		alert("请选择要共享的文件！");
		return false;
	}
}
//增加一行共享记录
doc.addShare=function(docName){
	var l = $("#shareTable tbody tr").length
	var peoHtml="<select id=\"sel_peo_"+l+"\">"+sharePeo+"</select>";
	var roleHtml="<select id=\"sel_role_"+l+"\">"+shareRole+"</select>"
	var authsHtml="";
	for(var i=0,len=auths.length;i<len;i++){
		if(i==0){
			authsHtml+="<input type=\"checkbox\" name=\"auths_"+l+"\" value=\""+auths[i]+"\" checked=\"checked\" />"
		}else{
			authsHtml+="<input type=\"checkbox\" name=\"auths_"+l+"\" value=\""+auths[i]+"\" />"
		}
		authsHtml+=authsName[i]+"&nbsp;&nbsp;";
	}
	var isChilds="<input type=\"checkbox\" name=\"isChilds_"+l+"\"/>"
	var trHtml="<tr><td>"+docName+"</td><td>"+peoHtml+"</td><td>"+roleHtml+"</td><td>"+authsHtml+"</td><td>"+isChilds+"</td><td><img src=\"rs/img/edit_remove.gif\" onclick=\"doc.removeShare(this)\"></td></tr>";
	$("#shareTable tbody").append(trHtml);
}
//删除一行共享记录
doc.removeShare=function(t){
	$(t).parent().parent().remove();
}
//保存共享
doc.saveShare=function(){
	var l=$("#shareTable tbody tr").length;
	if(l>0){
		var objs=[];
		$("#shareTable tbody tr").each(function(){
			var c0_id=$(this).children().eq(1).find("select").val();
			var c1_id=$(this).children().eq(2).find("select").val();
			if(c0_id!=0||c1_id!=0){//共享人与共享角色至少有一个
				var auths="";
				$(this).children().eq(3).find("input:checked").each(function(i){
					auths+=$(this).val()+";";
				});
				var isChilds="1031";
				if($(this).children().eq(4).find("input:checked").length>0){
					isChilds="1030";
				}
				var obj={};
				obj.c0_id=c0_id;
				obj.c1_id=c1_id;
				obj.t2_auths=auths;
				obj.t2_is_effect_childs=isChilds;
				objs.push(obj);
			}else{
				$(this).remove();
			}
		});
		//alert($myStr(objs));
		var param={};
		param.cmd="saveShares";
		param.shareDatas=objs;
		param.t1_id=$("#share_t1_id").val();
		param.t2_auths=$("#t2_auths").val();
		param.t1_pid = $("#t1_pid").val();
		var result = $$("cy_excute", param, false);
		if(result.flag){
			alert("操作成功!");
		}else{
			alert(result.msg);
		}
	}
}
doc.upload=function(){
	$("#uploadDiv").css("display","block");
	$("#t1_pid_upload").attr("value",$("#t1_pid").val());
	$("#t1_path_upload").attr("value",$("#t1_path").val());
}
doc.addUpload=function(t){
	$("#uploadTable").append($(t).parent().parent().clone());
}
doc.deleteUpload=function(t){
	var len=$("#uploadTable tr").length;
	if(len>1){
		$(t).parent().parent().remove();
	}else{
		alert("请至少保留一个上传文件！");
	}
}
doc.download=function(){
	var cbs = $("#table2 input:checked");
	var l = cbs.length;
	if (l > 0) {
//		var param={};
//		param.cmd="download";
//		param.t1_id=cbs.eq(0).val();
//		var result = $$("cy_excute", param, false);
		//$.post("upload",{cmd:"download",t1_id:cbs.eq(0).val()},function(data){
		//	alert(data);
		//});
		window.location.href="download?t1_id="+cbs.eq(0).val();
	}else{
		alert("请选择一个下载文件！");
	}
}
doc.view=function(){
	var cbs = $("#table2 input:checked");
	var l = cbs.length;
	if (l > 0) {
		var openwin=window.open("word_new.html");
		var param={};
		param.cmd="getContentByDoc";
		param.t1_id=cbs.eq(0).val();
		var result = $$("cy_excute", param, false);
		if(result.flag){
			//var content=result.data.t1_content;
			//alert(content);
			//var container=openwin.document.getElementById("container");
			openwin.e_word_analysis(result.data);
		}
	}
}
doc.editContent=function(){
	var cbs = $("#table2 input:checked");
	var l = cbs.length;
	if (l > 0) {
		var param={};
		param.cmd="getContentByDoc";
		param.t1_id=cbs.eq(0).val();
		var result = $$("cy_excute", param, false);
		if(result.flag){
			$("#docContent").css("display","block");
			//content.document.designMode = "on";
			_win=$('#content')[0].contentWindow; // 我们用 _win 变量代替 iframe window 
			_doc=_win.document;                        // 用 _doc 变量代替 iframe的document 
			_doc.designMode = 'On'; 
			_doc.open();
			if(result.data.t1_content!=null){
				if(result.data.t1_pageflag==1){
					Paging.init(result.data.t1_content);//初始化分页
				}else{
					_doc.innerHTML += _doc.write(result.data.t1_content);
				}
			}
			_doc.close();
			//content.focus();
			$("#saveContent").bind("click",function(){
				doc.submitEditContent(result.data.t1_id,result.data.t1_name,result.data.t1_path);
			});
			
		}
	}
}

doc.submitEditContent=function(t1_id,t1_name,t1_path){
	//alert(t1_name);
	//alert($("#content").val());
	var param={};
	param.cmd="saveContent";
	param.t1_id=t1_id;
	param.t1_name=t1_name;
	param.t1_path=t1_path;
	param.content=_doc.body.innerHTML;
	param.t1_pageflag=$("#t1_pageflag").val();
	var result = $$("cy_excute", param, false);
	if(result.flag){
		alert("操作成功！");
	}else{
		alert(result.msg);
	}
}
$(doc.init())

function ajaxDataFilter(treeId, parentNode, result) {
	var objs=[];
	var r={}
	$.each(result.data,function(i,obj){
		r=clone(obj);
		r.isParent=obj.isparent;
		objs.push(r);
	});
	return objs;
};
function getUrl(treeId, treeNode) {
	var param = {};
	param.cmd = "getAllByPid";
	param.t1_pid = treeNode.t1_id;
	param.t2_is_effect_childs = treeNode.t2_is_effect_childs;
	param.t2_auths=treeNode.t2_auths;
	return "../../json/cy_excute?param=" + $myStr(param);
}
function beforeExpand(treeId, treeNode) {
	if (!treeNode.isAjaxing) {
		ajaxGetNodes(treeNode, "refresh");
		return true;
	} else {
		alert("zTree 正在下载数据中，请稍后展开节点。。。");
		return false;
	}
}
function onAsyncSuccess(event, treeId, treeNode, msg) {
	if (!msg || msg.length == 0) {
		return;
	}
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	treeNode.icon = "";
	zTree.updateNode(treeNode);
	zTree.selectNode(treeNode.children[0]);
}
function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus,
		errorThrown) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	alert("异步获取数据出现异常。");
	treeNode.icon = "";
	zTree.updateNode(treeNode);
}
function ajaxGetNodes(treeNode, reloadType) {
	//alert("beforeExpand");
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if (reloadType == "refresh") {
		treeNode.icon = "../../lib/zTree/zTreeStyle/img/loading.gif";
		zTree.updateNode(treeNode);
	}
	zTree.reAsyncChildNodes(treeNode, reloadType, true);
}
/**
 * 如果是共享根目录，只有共享操作权限。
 * @param {} event
 * @param {} treeId
 * @param {} treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
	// doc.getAllByPid(treeNode.t1_id);
	$("#t1_pid").attr("value", treeNode.t1_id);
	$("#t1_path").attr("value", treeNode.t1_path + treeNode.t1_name + "/");
	$("#t2_auths").attr("value", treeNode.t2_auths);
	//alert(treeNode.t2_is_effect_childs);
	if(treeNode.isParent){
		//alert(treeNode.t2_auths);
		if(treeNode.t1_id==1){
				// 激活按钮，隐藏父结点信息
//			$("#makeDir").attr("disabled", true);
//			$("#makeFile").attr("disabled", true);
//			$("#upload").attr("disabled",true);
//			$("#download").attr("disabled",true);
//			$("#del").attr("disabled", true);
//			$("#shareFile").attr("disabled", false);
		}else{
			if (treeNode.t2_auths == undefined) {
//				$("#makeDir").attr("disabled", false);
//				$("#makeFile").attr("disabled", false);
//				$("#del").attr("disabled", false);
//				$("#shareFile").attr("disabled", false);
//				$("#editContent").attr("disabled",false);
//				$("#upload").attr("disabled",false);
//				$("#download").attr("disabled",false);
//				$("#view").attr("disabled",false);
			} else {
				// 先还原初始状态，再通过权限来判断
//				$("#makeDir").attr("disabled", true);
//				$("#makeFile").attr("disabled", true);
//				$("#del").attr("disabled", true);
//				$("#shareFile").attr("disabled", true);
//				if (treeNode.t2_auths.indexOf(auths[1]) >= 0) {
//					$("#makeDir").attr("disabled", false);
//					$("#makeFile").attr("disabled", false);
//					$("#del").attr("disabled", false);
//				}
//				if (treeNode.t2_auths.indexOf(auths[2]) >= 0) {
//					$("#shareFile").attr("disabled", false);
//				}
			}
		}
		// 取得子结点
		var param = {};
		param.cmd = "getAllByPid";
		param.t1_pid = treeNode.t1_id;
		param.t2_is_effect_childs = treeNode.t2_is_effect_childs;
		param.t2_auths=treeNode.t2_auths;
		var result = $$("cy_excute", param, false);
		if (result.flag) {
			var tableHtml = "<table id=\"table2\" class=\"table2\"><thead><tr><th></th><th>文件名称</th><th>文件路径</th><th>文件创建人</th><th>文件类型</th></tr></thead><tbody>"
			$.each(result.data, function(i, obj) {
						// alert(i+"="+obj.t1_id);
				var t1_typeName="文件";
				if(obj.t1_type==1010){
					t1_typeName="文件夹";
				}
				tableHtml += "<tr><td><input type=\"checkbox\" id=\"cb_"
						+ i + "\" value=\"" + obj.t1_id
						+ "\" /></td><td id=\"tdName_" + i
						+ "\" ondblclick=\"doc.reName(" + i + ",'"
						+ obj.t1_id + "','" + obj.t1_name + "')\">"
						+ obj.t1_name + "</td><td>" + obj.t1_path
						+ "</td><td>" + obj.c0_name + "</td><td>"
						+ t1_typeName + "</td></tr>";
			})
			tableHtml += "</tbody></table>"
			$("#tableDemo").html(tableHtml);
		}
	}else{
		//alert(treeNode.t2_auths);
//		$("#makeDir").attr("disabled", true);
//		$("#makeFile").attr("disabled", true);
//		$("#del").attr("disabled", true);
//		$("#shareFile").attr("disabled", true);
//		$("#tableDemo").html("");
	}
};

function beforeDrag(treeId, treeNodes) {
	for (var i=0,l=treeNodes.length; i<l; i++) {
		if (treeNodes[i].drag === false) {
			return false;
		}
	}
	return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
	//return targetNode ? targetNode.drop !== false : true;
	//for (var i=0,l=treeNodes.length; i<l; i++) {
	//	alert(treeNodes[i].t1_name);
	//}
	if(!targetNode.open){
		beforeExpand(treeId,targetNode);//手动先
	}
	//alert("beforeDrop");
	var param={};
	param.cmd="move";
	param.t1_id=treeNodes[0].t1_id;
	param.t1_name=treeNodes[0].t1_name;
	param.t1_id_target=targetNode.t1_id;
	param.t1_path=targetNode.t1_path;
	var result = $$("cy_excute", param, false);
	if(result.flag){
		return true;
	}else{
		alert(result.msg);
		return false;
	}
}
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    //alert(treeNodes.length + "," + (targetNode ? (targetNode.tId + ", " + targetNode.name) : "isRoot" ));
};

function clone(myObj){
  if(typeof(myObj) != 'object') return myObj;
  if(myObj == null) return myObj;
  
  var myNewObj = new Object();
  
  for(var i in myObj)
    myNewObj[i] = clone(myObj[i]);
  
  return myNewObj;
}
