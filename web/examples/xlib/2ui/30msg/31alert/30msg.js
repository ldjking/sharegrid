(function(x){/*消息提示接口*/
	var initMsg=function(){/*初始化消息框*/
		var mask=$("#msgMask");
		if(mask==null){
			/*开始创建元素*/
			mask=$div("msgMask","msgmask");
			document.body.appendChild(mask);
			//var msg=$table(1,1);
//			msg.id="msgContainer";
//			msg.className="msg";
//			msg.rows[0].cells[0].innerHTML="<div id='msgDialog'><div id='msgTop'><div id='msgTitle'>出错提示信息</div><div id='msgClose'>&#xf00d;</div></div><div id='msgContent'></div><div id='msgFoot'><button  class='button blue' id='msgOK'>确认</button><button class='button gray' id='msgCancel'>取消</button></div></div></div>";
//			x.addChild(document.body,[mask,msg]);
			
		}
	}
	x.msgAlert=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.fn
		initMsg();
		var dialog=createDialog("msg");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","content");
		msgMain.innerHTML=cfg.content;
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		x.addChild(msgFoot,ok);
		//x.cssAdd(ok,["button","blue"]);
		x.bind(ok,'click',function(){
			hideMsg();
			cfg.okfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);
	}
	var createDialog=function(classname){
		var msg=$table(1,1);
		msg.id="msgContainer";
		msg.className=classname;
		x.addChild(document.body,msg);
		var dialog=$div("msgDialog");
		x.addChild(msg.rows[0].cells[0],dialog);
		return dialog;
	}
	var createMsgTop=function(cfg){
		var msgTop=$div("msgTop");
		var msgTitle=$div("msgTitle");
		msgTitle.innerHTML=cfg.title;
		var msgClose=$div("msgClose");
		msgClose.innerHTML="&#xf00d;";
		x.addChild(msgTop,[msgTitle,msgClose]);
		x.bind(msgClose,'click',hideMsg);
		return msgTop;
	}
	var createButtonOk=function(){
		var ok=$e("button");
		ok.id="msg_ok";
		ok.innerHTML="确认";
		ok.className="button blue";
		return ok;
	}
	var createButtonCancel=function(){
		var cancel=$e("button");
		cancel.id="msg_cancel";
		cancel.innerHTML="取消";
		cancel.className="button gray";
		return cancel;
	}
	var hideMsg=function(){
		var msgMask=$("#msgMask");
		if(msgMask){
			x.rmDom(msgMask);
		}
		var msg=$("#msgContainer");
		if(msg){
			x.rmDom(msg);
		}
	}
	x.msgConfirm=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.okfn
		//cfg.cancelFn
		initMsg();
		var dialog=createDialog("msg confirm");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","content");
		msgMain.innerHTML=cfg.content;
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		//x.cssAdd(ok,["button","blue"]);
		var cancel=createButtonCancel();
		x.addChild(msgFoot,[ok,cancel]);
		x.bind(ok,'click',function(){
			hideMsg();
			cfg.okfn();
		});
		x.bind(cancel,'click',function(){
			hideMsg();
			cfg.cancelfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);
	}
	x.msgPromot=function(cfg){/*创建一个信息条展示在dom上方，可以配置为显示3秒钟自动隐藏，不隐藏，鼠标移出后1秒自动隐藏,鼠标移入*/
		//cfg.okfn //(表单产生的数据)
		initMsg();
		var dialog=createDialog("msg");
		//标题
		var msgTop=createMsgTop(cfg);
		//content
		var msgMain=$div("msgMain","form");
		//msgMain.innerHTML=cfg.content;
		//<div id="content" style=" background-color:#FF0000; position:absolute; z-index:20"> </div>
		//var content=$div("content","form");
		//content.style="background-color:#FF0000; position:absolute; z-index:20";
		var id="form1";
		cfg.content.id=id;
		msgMain.formCfg=cfg.content;
		
		var container=$div(id+"_container","formContainer");
		var doc=$div(id+"_doc","doc");
		container.appendChild(doc);
		x.addChild(msgMain,container);
		//x.addChild(msgMain,content);
		
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		//x.cssAdd(ok,["button","blue"]);
		var cancel=createButtonCancel();
		x.addChild(msgFoot,[ok,cancel]);
		x.bind(ok,'click',function(){
			hideMsg();
			cfg.okfn();
		});
		x.bind(cancel,'click',function(){
			hideMsg();
			cfg.cancelfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);
		uiLayout({dom:msgMain,container:dialog,dx:0,dy:0,ydoms:[msgTop,msgFoot]});	
		x.uiLayout({dom:container,container:msgMain,dx:0,dy:0,ydoms:[]});
		x.genFormScroll(msgMain);/*先一步生成滚动条*/
		x.genFormContent(msgMain);
		x.uiForm(msgMain);
	}
})(window);
