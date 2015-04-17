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
		var msgMain=$div("msgMain","wfform");
		//out("content",cfg.content.length);
		var content=$table(cfg.content.length,2);
		x.addChild(msgMain,content);
		for(var i in cfg.content){
			var td1=content.rows[i].cells[0];
			td1.className="td1";
			td1.innerHTML=cfg.content[i].text;
			var td2=content.rows[i].cells[1];
			td2.className="td2";
			if(cfg.content[i].type==='textarea'){
				var textarea=$e("textarea");
				textarea.className="comment";
				x.addChild(td2,textarea);
			}else{
				var node=$div(null,"node");
				x.addChild(td2,node);
				
				for(var p in cfg.content[i].values){
					var span=$span();
					x.addChild(node,span);
					var input=$e("input");
					input.type=cfg.content[i].type;
					input.name=cfg.content[i].attr;
					input.value=cfg.content[i].values[p].value;
					var label=$e("label");
					label.innerHTML=cfg.content[i].values[p].name;
					x.addChild(span,[input,label]);
				}
			}
		}
		//foot
		var msgFoot=$div("msgFoot");
		var ok=createButtonOk();
		//x.cssAdd(ok,["button","blue"]);
		var cancel=createButtonCancel();
		x.addChild(msgFoot,[ok,cancel]);
		x.bind(ok,'click',function(){
			var obj={};
			for(var i in cfg.content){
				var td2=content.rows[i].cells[1];
				if(cfg.content[i].type==='textarea'){
					var textarea=td2.childNodes[0];
					obj[cfg.content[i].attr]=textarea.value;
				}else{
					var value="";
					var inputs=td2.getElementsByTagName("input");
					for(var p=0;p<inputs.length;p++){
						if(inputs[p].checked){
							value+=inputs[p].value+";";
						}
					}
					obj[cfg.content[i].attr]=value.substring(0,value.length-1);
				}
			}
			hideMsg();
			cfg.okfn(obj);
		});
		x.bind(cancel,'click',function(){
			hideMsg();
			cfg.cancelfn();
		});
		x.addChild(dialog,[msgTop,msgMain,msgFoot]);	
	}
})(window);
