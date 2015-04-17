/*xlib.32layout	布局函数  这里的布局对象不允许使用padding值*/
(function(x){
	var confs=[];
	var e_win_resize=function(evt){
		/*一旦发生页面大小变化 则调整所有与body相关的dom*/		
		e_dom_resize(document.body);
	}
	var e_dom_resize=function(dom){/*找到该节点的影响节点，执行auto_size_dom操作*/
		if(dom.effectNode){
			for(var i=0;i<dom.effectNode.length;i++){
				auto_size_dom(dom.effectNode[i]);
			}
		}
	}
	var auto_size_dom=function(dom){
		var conf=dom.layoutConf;
		if(conf==null)	return;
		var container=conf.container;
		var width=null;
		var height=null;

		if(x.isNum(conf.dx)){
			var width=container.clientWidth-conf.dx;
			if(x.isArray(conf.xdoms)){
				for(var i=0;i<conf.xdoms.length;i++){
					width=width-conf.xdoms[i].clientWidth;
				}
			}
			
		}
		if(x.isNum(conf.dy)) {
			var height=container.clientHeight-conf.dy;
			if(x.isArray(conf.ydoms)){
				for(var i=0;i<conf.ydoms.length;i++){
					height=height-conf.ydoms[i].clientHeight;
				}
			}
			
		}		
		x.setDomSize(conf.dom,width,height);
		//e_dom_resize(conf.dom1);
	}
	var reg_resizeEvent=function(dom,dom2){/*注册尺寸变化监听*/
		if(x.isArray(dom))	x.each(dom,function(e){reg_resizeEvent(e)});
		else if(x.isElement(dom)){
			if(dom.resizeHandler==null)	dom.resizeHandler=[];
			if(dom.effectNode==null)	dom.effectNode=[];
			add2(dom.effectNode,dom2);	/*影响节点*/
			dom.resizeHandler.push(e_dom_resize);/*增加一个事件*/
		}
	}
	/*conf的组成  dom1   dom2  参照容器  dx 宽度  dy高度  xdoms 宽度参考节点  ydoms  高度参考节点*/
	x.uiLayout=function(conf){
		var dom=conf.dom;
		if(dom==null)	return;
		dom.layoutConf=conf;	/*布局配置*/
		reg_resizeEvent(conf.container,dom);/*容器发生变化触发事件*/

		x.add(confs,conf);/*增加一个配置项*/
		auto_size_dom(dom);
		window.onresize=e_win_resize;
	}
	
})(window);
