/*xlib.22effect		动画特效*/
(function(x){	/*动画效果*/
	var fnResize=function(cfg){/*调整大小  需要计算当前大小*/
		var dom=cfg.dom;
		//if(x.getStyle(cfg.dom).display=="none"){  cfg.dom.style.display="block";}/*如果现在是隐藏状态*/
		var rate=cfg.rates[cfg.excuteTime];

		if(cfg.startWidth==null){/*如果原始宽度为空*/
			cfg.startWidth=x.toNum(x.getRect(dom).width);
			cfg.startHeight=x.toNum(x.getRect(dom).height);
		}
		if(cfg.width==null)		cfg.targetWidth=cfg.startWidth;
		else					cfg.targetWidth=cfg.width;
		if(cfg.height==null)	cfg.targetHeight=cfg.startHeight;
		else					cfg.targetHeight=cfg.height;
		var width=(cfg.targetWidth-cfg.startWidth)*rate+cfg.startWidth;				
		var height=(cfg.targetHeight-cfg.startHeight)*rate+cfg.startHeight;
		if(isNum(width)&&isNum(height)){
			cfg.dom.style.width=width+"px";
			cfg.dom.style.height=height+"px";
		}
		if(rate==1){
			cfg.startWidth=null;
			cfg.startHeight=null;
			cfg.targetWidth=null;
			cfg.targetHeight=null;
			return true;//隐藏
		}
	}
	var fnShow=function(cfg){
		var dom=cfg.dom;
		if(x.getStyle(cfg.dom).display=="none"){  cfg.dom.style.display="block";}/*如果现在是隐藏状态*/
		if(cfg.dom.oriWidth!=null){/*要有原始状态的值 不然不知道如何恢复  设置原始数据 用于反向动画 hide*/
			if(cfg.startWidth==null){
				cfg.startWidth=x.toNum(x.getStyle(dom).width);
				cfg.startHeight=x.toNum(x.getStyle(dom).height);
				cfg.targetWidth=dom.oriWidth;
				cfg.targetHeight=dom.oriHeight;
			}
			var rate=cfg.rates[cfg.excuteTime];
			var width=(cfg.targetWidth-cfg.startWidth)*rate+cfg.startWidth;				
			var height=(cfg.targetHeight-cfg.startHeight)*rate+cfg.startHeight;
			if(isNum(width)&&isNum(height)){
				cfg.dom.style.width=width+"px";
				cfg.dom.style.height=height+"px";
			}
			if(rate==1){
				cfg.startWidth=null;
				cfg.startHeight=null;
				cfg.targetWidth=null;
				cfg.targetHeight=null;
				return true;//隐藏
			}
			return false;
		}
		else	return true;/*缺少渐变的参数*/
		return true;
	}
	var fnHide=function(cfg){
		var dom=cfg.dom;
		if(dom.oriWidth==null){//需要保存原始的样式
			dom.oriWidth=x.toNum(x.getStyle(dom).width);
			dom.oriHeight=x.toNum(x.getStyle(dom).height);
		}
		if(cfg.startWidth==null){
			cfg.startWidth=x.toNum(x.getStyle(dom).width);/*按照当前样式*/
			cfg.startHeight=x.toNum(x.getStyle(dom).height);
			cfg.targetWidth=0;
			cfg.targetHeight=0;
		}
		/*按照执行次序逐步降低高度和宽度*/
		var rate=cfg.rates[cfg.excuteTime];
		var width=(cfg.targetWidth-cfg.startWidth)*rate+cfg.startWidth;				
		var height=(cfg.targetHeight-cfg.startHeight)*rate+cfg.startHeight;
		if(isNum(width)&&isNum(height)){
			cfg.dom.style.width=width+"px";
			cfg.dom.style.height=height+"px";
		}
		if(width==0||height==0){
			//cfg.dom.style.display="none";
			cfg.startWidth=null;
			cfg.startHeight=null;
			cfg.targetWidth=null;
			cfg.targetHeight=null;
			return true;//隐藏
		}
	}
	var fnFade=function(cfg){/*cfg 需要提供startOpacity 开始透明度 endOpacity 结束透明度*/
		var rate=cfg.rates[cfg.excuteTime];
		if(cfg.alpha1==null)	cfg.alpha1=x.getOpacity(cfg.dom);
		var alpha1=cfg.alpha1;
		var alpha2=cfg.alpha2;
		var alpha=alpha2-alpha1;
		var currAlpha=alpha*rate+alpha1;
		//;////out("currAlpha",currAlpha);
		//;////out("currAlpha:"+currAlpha+" alpha1:"+alpha1+" alpha2:"+alpha2+" rate:"+rate);
		if(currAlpha>=0&&currAlpha<=1)	x.setOpacity(cfg.dom,currAlpha);
		if(rate==1){
			return true;//隐藏
		}
	}
	var fnScale=function(cfg){/*cfg 需要提供startOpacity 开始透明度 endOpacity 结束透明度*/
		var rate=cfg.rates[cfg.excuteTime];
		if(cfg.scale1==null)	cfg.scale1=x.getScale(cfg.dom);
		var scale1=cfg.scale1;
		var scale2=cfg.scale2;
		var scale=scale2-scale1;
		var currScale=scale*rate+scale1;
		//;////out("currScale:"+currScale);
		if(currScale>=0)	x.setScale(cfg.dom,currScale,currScale,"top left");
		if(rate==1){
			return true;//隐藏
		}
	}
	
	var fnMove=function(cfg){/*移动对象  要求只能使用top和left属性来移动对象*/
		var rate=cfg.rates[cfg.excuteTime];
		if(cfg.top1==null){	
			if(x.getStyle(cfg.dom).top=="auto"){/*要判断对象是否为bottom布局  如果是bottom布局还要想办法转成top值  父容器的高度-自身高度-bottom值*/
				if(x.getStyle(cfg.dom).bottom!="auto"){
					var totalHeight=x.getRect(cfg.dom.parentNode).height;
					var selfHeight=x.getRect(cfg.dom).height;
					var bottom=x.toNum(x.getStyle(cfg.dom).bottom);
					cfg.top1=totalHeight-selfHeight-bottom;
				}
				else	cfg.top1=0;/*如果没有找到定义 暂设为0*/
			}
			else	cfg.top1=x.toNum(x.getStyle(cfg.dom).top);/*top值是相对于relative容器而言，这个相对准确 但是定位有时候使用right值*/
		}
		if(cfg.left1==null){
			if(x.getStyle(cfg.dom).left=="auto"){/*要判断对象是否为bottom布局  如果是bottom布局还要想办法转成top值  父容器的高度-自身高度-bottom值*/
				if(x.getStyle(cfg.dom).right!="auto"){
					var totalWidth=x.getRect(cfg.dom.parentNode).width;
					var selfWidth=x.getRect(cfg.dom).width;
					var right=x.toNum(x.getStyle(cfg.dom).right);
					cfg.left1=totalWidth-selfWidth-right;
				}
				else	cfg.left1=0;/*如果没有找到定义 暂设为0*/
			}
			else	cfg.left1=x.toNum(x.getStyle(cfg.dom).left);/*top值是相对于relative容器而言，这个相对准确 但是定位有时候使用right值*/
		}
		var d_top=cfg.top2-cfg.top1;
		var d_left=cfg.left2-cfg.left1;
		var top=d_top*rate+cfg.top1;
		var left=d_left*rate+cfg.left1;

		//;////out("curr position","top="+top.toFixed(2)+" left="+left.toFixed(2));
		if(isNum(top)&&isNum(cfg.top2))	cfg.dom.style.top=top+"px";
		if(isNum(left)&&isNum(cfg.left2))	cfg.dom.style.left=left+"px";
		if(rate==1)		return true;/*结束动画*/
	}
	
	var fnSlide=function(cfg){
		var rate=cfg.rates[cfg.excuteTime];
		//;////out("fnSlide");
		if(cfg.marginLeft1==null)	cfg.marginLeft1	=x.toNum(x.getStyle(cfg.dom).marginLeft);
		//;////out("error not here!");
		if(cfg.marginTop1==null)	cfg.marginTop1	=x.toNum(x.getStyle(cfg.dom).marginTop);
		var d_top	=	cfg.marginTop2-cfg.marginTop1;
		var d_left	=	cfg.marginLeft2-cfg.marginLeft1;
		
		var top	=d_top*rate+cfg.marginTop1;
		var left=d_left*rate+cfg.marginLeft1;
		//;////out("curr margin","top="+top+" left="+left);
		if(isNum(top))	cfg.dom.style.marginTop=top+"px";
		if(isNum(left))	cfg.dom.style.marginLeft=left+"px";
		if(rate==1)		return true;/*结束动画*/
	}
	
	var fnMoveDoms=function(cfg){/*dom数组  按照一定间隔来移动对象  移动的速度保持匀速  尚未启用*/
		var doms=cfg.doms;
		var excuteTime=cfg.excuteTime;/*每间隔两个移动部分对象*/
		
		for(var i=0,j=0;j<excuteTime;i++,j+=133){
			if(i<doms.length){/*在范围内的dom都会变化自身的top 和left 值  速度还不一样*/
				var left=x.toNum(doms[i].style.left)-2;
				var top=x.toNum(doms[i].style.top)-2;
				doms[i].style.left=left+"px";
				doms[i].style.top=top+"px";
			}
		}
		if(x.toNum(doms[doms.length-1].style.left)<0){
			return true;
		}
	}
	
	var fnRotate=function(cfg){/*旋转一个对象  匀速旋转*/
		var deg1=x.getRotate(cfg.dom);/*获取对象的旋转角度*/
		var deg=(deg1+cfg.indent)%360;
		x.setRotate(cfg.dom,deg);/*步进*/

		//;////out("curr rotate","degree="+deg+" indent="+cfg.indent+" time:"+cfg.excuteTime);

		if(cfg.maxNum>0&&cfg.excuteTime>=cfg.maxNum){
			return true;//隐藏
		}
	}
	
	var fnFly=function(cfg){
		var dom=cfg.dom;
		/*按照执行次序逐步变化 透明度  缩放 位置*/
		if(cfg.startAlpha==null)	cfg.startAlpha=x.getOpacity(dom);
		if(cfg.startScale==null)	cfg.startScale=x.getScale(dom);
		if(cfg.startX==null)		cfg.startX=x.toNum(x.getStyle(dom).left);
		if(cfg.startY==null)		cfg.startY=x.toNum(x.getStyle(dom).top);
		
		var rate=cfg.rates[cfg.excuteTime];
		var top=(cfg.endY-cfg.startY)*rate+cfg.startY;	
		var left=(cfg.endX-cfg.startX)*rate+cfg.startX;
		var alpha=(cfg.endAlpha-cfg.startAlpha)*rate+cfg.startAlpha;
		var scale=(cfg.endScale-cfg.startScale)*rate+cfg.startScale;
		dom.style.left=left+"px";
		dom.style.top=top+"px";

		x.setOpacity(dom,alpha);

		
		x.setScale(dom,scale,scale,"top left");
		
		
		if(rate==1){
			dom.style.display="none";
			return true;//隐藏
		}
	}
	
	x.fxShow=function(dom,delay,duration,fn){/*展示自身*/
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnShow,delay:delay,time:duration,callBack:fn};
		a.run(cfg);
		return dom;
	}
	x.fxResize=function(dom,width,height,delay,duration,fn){
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnResize,delay:delay,time:duration,callBack:fn,width:width,height:height};
		a.run(cfg);
		return dom;
	}
	x.fxHide=function(dom,delay,duration,fn){/*展示自身*/
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnHide,delay:delay,time:duration,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxFade=function(dom,alpha2,delay,duration,fn){/*透明度渐变*/
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnFade,delay:delay,time:duration,alpha2:alpha2,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxFadeOut=function(dom,delay,duration,fn){/*透明度渐变*/
		return x.fxFade(dom,0,delay,duration,fn);
	}
	
	x.fxFadeIn=function(dom,delay,duration,fn){/*透明度渐变*/
		return x.fxFade(dom,1,delay,duration,fn);
	}
	
	x.fxScale=function(dom,scale2,delay,duration,fn){/*缩放渐变*/
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnScale,delay:delay,time:duration,scale1:1,scale2:scale2,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxScaleOut=function(dom,delay,duration,fn){/*透明度渐变*/
		return x.fxScale(dom,0,delay,duration,fn);
	}
	
	x.fxScaleIn=function(dom,delay,duration,fn){/*透明度渐变*/
		return x.fxScale(dom,1,delay,duration,fn);
	}
	
	x.fxMove=function(dom,top,left,delay,duration,fn){/*移动对象  需要目标top和left值*/
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnMove,delay:delay,time:duration,top2:top,left2:left,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxRotate=function(dom,indent,maxNum,delay,duration,fn){
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnRotate,delay:delay,time:duration,indent:indent,maxNum:maxNum,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxFly=function(dom,endX,endY,endAlpha,endScale,delay,duration,fn){
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var cfg={dom:dom,fun:fnFly,delay:delay,time:duration,endX:endX,endY:-100,endAlpha:0,endScale:0,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxSlide=function(dom,page,pageSize,vmode,delay,duration,fn){
		var a=dom._animate;
		if(a==null)	dom._animate=a=new Animation();
		var top=null,left=null;
		if(vmode)	top=-page*pageSize/*垂直模式*/
		else		left=-page*pageSize;/*水平模式*/
		var cfg={dom:dom,fun:fnSlide,delay:delay,time:duration,marginTop2:top,marginLeft2:left,callBack:fn};
		a.run(cfg);
		return dom;
	}
	
	x.fxClear=function(dom){
		var a=dom._animate;
		if(a!=null)	a.clear();
		return dom;
	}
	
})(window);
