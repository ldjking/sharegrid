/*
 * 对话框插件,基于zepto开发,只应用于移动端
 * 调用实例:
 * 手动关闭: $.dialogClose();
 * $.dialog("提示信息"); 
 * $.dialog("确认提示,确定后调用confirm回函数",{type:"confirm",confirm:function(){ alert('ok'); }},);
 * $.dialog("带回调",function(){ alert(0); }
 */
(function($){
	$.dialog = function(tips,options,callback){
		//默认配置
		var defaults = {
			id: "dialog",
			width: null, //数字
			height:null, //数字
			className: "dialog",
			type:"alert", //alert,confirm,error
			touchmove: false, //默认会禁用对话框的touchmove事件,即弹出对话框时,不允许滚动屏幕
			mask: {
				id: "dialogMask",
				className: "dialog-mask",
				show:true,	//false时不显示遮罩层
				close: false	//true时单击遮罩层会关闭对话框
			},
			wrap:{
				id: "dialogWrap",
				className: "dialog-wrap"
			},
			title:{
				id: "dialogTitle",
				name: "温馨提示",		//等于false或""空字符时，不显示标题
				className: "dialog-title",
				closeBtn: true,
				closeClass: "dialog-title-close"
			},
			content:{
				id:"dialogContent",
				className:"dialog-content",
				html:""
			},
			btn:{
				confirmCancel:"取消",	//设置为false时，按钮不显示
				confirmOK:"确认"	//设置为false时，按钮不显示
			},
			confirm:null	//按确定按钮时，触发的回调函数
		};
		tips = tips ?  tips : "";
		callback = callback ? callback : (typeof(arguments[1])==="function" ? arguments[1] : null);
		var s =  typeof(arguments[1])==="function" ? defaults : $.extend(true,{},defaults,options);
		var doc = document,
			win = window,
			bd=$("body"),
			winWidth  = $(win).width(),
			winHieght = $(win).height(),
			bodyHeight = bd.height();
		bodyHeight = (bodyHeight > winHieght) ? bodyHeight : winHieght;
		var mask;
		//创建遮罩层;
		if(s.mask.show){
			mask = doc.getElementById(s.mask.id);
			if(mask){ $(mask).remove();}
			mask = doc.createElement("div");
			mask.id = s.mask.id;
			mask.className = s.mask.className;
			$(mask).css({
				width:winWidth,
				height:bodyHeight
			});
			bd.prepend(mask);
			//单击创建遮罩层,关闭对话框
			if(s.mask.close){
				$(mask).on('click',function(){
					$.dialogClose(mask);
					return false;
				});
			}
		}
		//检查是否已有对话框存在,存在则先移除.默认只能允许一个对话框存在;
		var dialog =  doc.getElementById(s.id);
		if(dialog){ $(dialog).remove(); }
		//创建对话框层
		dialog = doc.createElement("div");
		dialog.id= s.id;
		dialog.className= s.className;
		dialog.style.visibility = "hidden";
		
		if(s.mask.show){
			$(mask).after(dialog);
		} else {
			bd.prepend(dialog);
		}
		//在对话框层内添加wrap层;
		var wrap = doc.createElement("div");
		wrap.id = s.wrap.id;
		wrap.className = s.wrap.className;
		$(dialog).html(wrap);
		
		if(!s.touchmove){
			if(mask){
				//禁用遮罩层touchmove事件
				mask.addEventListener('touchmove', function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			}
			//禁用对话框的touchmove事件
			dialog.addEventListener('touchmove', function(e) {
				e.stopPropagation();
				e.preventDefault();
			});			
		}
		
		//对话框标题
		if(s.title.name!==false && s.title.name!==""){
			var title = doc.createElement("div");
			title.id = s.title.id;
			title.className = s.title.className;
			title.innerHTML = s.title.name;
			//标题内的"关闭"按钮
			if((s.title.closeBtn && s.type!=="confirm") || (!s.btn.confirmOK && !s.btn.confirmCancel)){
				$(title).append("<a href='javascript:$.dialogClose();' class='"+s.title.closeClass+"'><i></i></a>");	
			} else {
				$(title).css({"text-align":"center","padding-left":0});
			}
			$(wrap).html(title);
		}
		//对话框内容
		var dialogContent = doc.createElement("div");
		dialogContent.id = s.content.id;
		dialogContent.className = s.content.className;
		dialogContent.innerHTML = "<i class='"+s.id+"-"+s.type+"-icon'></i><p>"+tips+"</p>";
		$(wrap).append(dialogContent);
		
		//确认类型对话框
		var confirmBtn;
		if(s.type=="confirm"){
			if(!(!s.btn.confirmOK && !s.btn.confirmCancel)){
				confirmBtn = doc.createElement("div");
				confirmBtn.className = s.id+"-confirm";
				$(dialog).append(confirmBtn);
				//取消按钮
				if(s.btn.confirmCancel!==false){
					$(confirmBtn).append("<span><a href='javascript:$.dialogClose();' class='"+s.id+"-confirm-cancel' id='"+s.id+"ConfirmCancel'>"+s.btn.confirmCancel+"</a></span>");
				}
				//确定按钮
				if(s.btn.confirmOK!==false){
					$(confirmBtn).append("<span><a href='javscript:$.dialogClose();' class='"+s.id+"-confirm-OK' id='"+s.id+"ConfirmOK'>"+s.btn.confirmOK+"</a></span>");
					$(doc.getElementById(s.id+"ConfirmOK")).on("click",function(){
						if(s.confirm && typeof(s.confirm==="function")){
							s.confirm(mask,dialog);	
						}
						$.dialogClose(mask,dialog);
						return false;
					});
				}
			}
		}
		//设置宽度和高度
		if(s.width){
			$(dialog).css({"width":s.width,"margin-left":-s.width/2});
		}
		if(s.height){
			$(dialog).css({"height":s.height});
			$(wrap).css({"height":s.height-(confirmBtn ? $(confirmBtn).height() : 0)});
		}
		//显示及计算对话框位置;
		$(dialog).css({"margin-top":-$(dialog).height()/2,"visibility":"visible"});
		//调用回调
		if(callback){
			callback();
		}
	};
	//关闭对话框
	//如果有配置对话框的ID和遮罩层的ID，请传参数，否则关闭函数将失效
	$.dialogClose = function(mask,dialog){
		if(mask){
			$(mask).remove();	
		}
		if(dialog){
			$(dialog).remove();
			return;
		}
		//未传参数时,默认移除dialogMask和dialog;
		$("#dialogMask,#dialog").remove();
	};
})(Zepto);