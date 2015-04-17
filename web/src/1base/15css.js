/*xlib.16css		样式控制相关函数*/
(function(x){
	/*依赖关系	引用core.js*/
	x.getRect=function(dom){/*获取页面元素的位置*/
		if(x.isIE<9){
				var rect=dom.getBoundingClientRect();
				var obj={top:rect.top,left:rect.left,right:rect.right,bottom:rect.bottom}
				obj.width=rect.right-rect.left;
				obj.height=rect.bottom-rect.top;
				return obj;
				
			}
		if(dom&&dom.getBoundingClientRect){
			return dom.getBoundingClientRect();
		}
		else return {};
	}
	x.getRect2=function(dom){
		/*向上寻找 直到找到一个position为reletive的元素*/
		var d2=dom;
		var flag=true;
		while(flag){
			d2=d2.parentNode;
			flag=x.getStyle(d2).position!="relative";
			if(d2==document.body)	flag=false;
		}
		var rect1=x.getRect(dom);
		var rect2=x.getRect(d2);
		var obj={};
		obj.left=rect1.left-rect2.left;
		obj.top=rect1.top-rect2.top;
		obj.width=rect1.width;
		obj.height=rect1.height;
		return obj;
	}
	
	
	x.getStyle=function(dom){/*读取或者摄者属性值*/
		if(x.isElement(dom)){
			if(window.getComputedStyle)		return window.getComputedStyle(dom);
			else	return 	dom.currentStyle;
		}
	}
	/*html5 的支持  以下方法不要求所有浏览器支持  目前只支持火狐*/
	x.setOpacity=function(dom,alpha){/*透明度*/
		dom.style.opacity=alpha;
	}
	x.getOpacity=function(dom){/*透明度*/
		var alpha=x.toNum(x.getStyle(dom).opacity);
		if(alpha==null)	alpha=1;
		return alpha;
	}
	x.setScale=function(dom,dx,dy,p){
		if(isFF){/*火狐的缩放*/
			if(x==null){
				dom.style.MozTransform="";
				dom.style.MozTranformOrigin="";
			}
			dom.style.MozTransform="scale("+dx+","+dy+")";
			dom.style.MozTransformOrigin="left top";
			//alert(dom.style.MozTranformOrigin);
		}
		else if(isChrome){/*谷歌的缩放*/
			dom.style.webkitTransform="scale("+dx+","+dy+")";
			if(p)	dom.style.webkitTransformOrigin=p;
		}
		else if(x.isIE){/*IE浏览器 使用filter*/
			var rad = 0;
			var scale=x;
			if(scale==null||scale=="")	dom.style.filter ="";
			else{
				if(isIE>9){
					dom.style.transform="scale("+dx+","+dy+")";
					dom.style.transformOrigin="0 0";
				}
				else{
					var m11 = Math.cos(rad) * scale, m12 = -1 * Math.sin(rad) * scale, m21 = Math.sin(rad) * scale, m22 = m11;
					dom.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+ m11 +",M12="+ m12 +",M21="+ m21 +",M22="+ m22 +",SizingMethod='auto expand')";/用filter/
				}
			}
		}
	}
	x.getScale=function(dom){/*获取缩放比例 */
		var result;
		if(isFF)			result=dom.style.MozTransform;
		else if(isChrome)	result=dom.style.webkitTransform;
		else if(isIE)		result=dom.style.msTransform;
		result=x.capture1(result,/scale\(([ |\d|\.|-]+)/g);
		if(result==null)	result=1;
		return  Math.round(result);
	}
	
	x.setRotate=function(dom,degree){/*degree旋转度数  旋转中心*/
		if(isFF){/*火狐的缩放*/
			dom.style.MozTransform="rotate("+degree+"deg)";
		}
		else if(isChrome){/*谷歌的缩放*/
			dom.style.webkitTransform="rotate("+degree+"deg)";
		}
		else if(isIE){/*IE浏览器 使用filter*/
			dom.style.msTransform="rotate("+degree+"deg)";
		}
	}
	x.getRotate=function(dom){
		var result;
		if(isFF)			result=dom.style.MozTransform;
		else if(isChrome)	result=dom.style.webkitTransform;
		else if(isIE)		result=dom.style.msTransform;
		result=x.capture1(result,/rotate\(([ |\d|\.|-]+)/g);
		if(result==null)	result=0;
		return Math.round(result);
	}
	
	x.cssContain=function(dom,css1){/*判断是否包含此样式*/
		if(isElement(dom)){
			var css=dom.className.split(/\s+/g);
			if(x.contains(css,css1)){/*如果没有该样式 方添加*/
				return true;
			}
		}
		return false;
	}
	
	x.cssAdd=function(dom,css1){/*给元素添加样式*/
		if(x.isArray(dom)){
			x.each(dom,function(e){
					x.cssAdd(e,css1);
				});
		}
		else if(isElement(dom)){
			if(dom.className!=null){
				var css=dom.className.split(/\s+/g);
				if(!x.contains(css,css1)){/*如果没有该样式 方添加*/
					css.push(css1);
					dom.className=css.join(" ").trim();
				}
			}
			else	dom.className=css1;
		}
	}
	
	x.cssToggle=function(dom,css1,css2){/*开关样式*/
		if(x.isArray(dom)){
			x.each(dom,function(e){
					x.cssToggle(e,css1,css2);
				});
		}
		else if(isElement(dom)){
			var css=dom.className.split(/\s+/g);
			if(x.contains(css,css1)){
				dom.className=x.replaceObj(css,css1,css2).join(" ");
			}
			else if(x.contains(css,css2)){
				dom.className=x.replaceObj(css,css2,css1).join(" ");
			}
		}
	}
	x.cssRm=function(dom,css1){
		if(x.isArray(dom)){
			x.each(dom,function(e){
					x.cssRm(e,css1);
				});
		}
		else if(x.isElement(dom)){
			if(x.isArray(css1)){
				x.each(css1,function(e){
					x.cssRm(dom,e);
				});
			}
			else{
				var css=dom.className.split(/\s+/g);
				if(x.contains(css,css1)){
					dom.className=x.replaceObj(css,css1,"").join(" ");
				}
			}
		}
	}
	x.cssReplace=function(dom,css1,css2){/*样式替换*/
		if(x.isArray(dom)){
			x.each(dom,function(e){
					x.cssReplace(e,css1,css2);
				});
		}
		else if(x.isElement(dom)){
			var css=dom.className.split(" ");
			if(x.contains(css,css1)){
				if(css2)	dom.className=x.replaceObj(css,css1,css2).join(" ");
				else		dom.className=x.replaceObj(css,css1,"").join(" ");
			}
		}
	}
	x.showHide=function(dom,flag){/*根据开关变量  flag 来显示或者隐藏dom对象*/
		if(x.isArray(dom))	x.each(dom,function(e){x.showHide(e,flag)})
		else if(x.isElement(dom)){
			if(flag===true)		dom.style.display="block";
			if(flag===false)	dom.style.display="none";
		}	
	}
	
	
	x.getDomHeight=function(dom){/*在有些情况下 getStyle得到的width height值为auto,这时候就需要其他的计算方式*/
		var style=x.getStyle(dom);
		if(style.height==""||style.height=="auto"){
			return x.getRect(dom).height;
		}
		else return x.toNum(style.height);
	}
	x.getDomWidth=function(dom){
		var style=x.getStyle(dom);
		if(style.width==""||style.width=="auto"){
			return x.getRect(dom).width;
		}
		else return x.toNum(style.width);
	}
	x.setDomSize=function(dom,width,height){/*固定数值模式*/
		//;////out("resize");
		if(x.isArray(dom)){
			x.each(dom,function(e){x.setDomSize(e,width,height)});
		}
		else if(x.isElement(dom)){
			if(x.isNum(width))	dom.style.width=width+"px";
			if(x.isNum(height)){
				dom.style.height=height+"px";
			}
			if(dom&&dom.scrollCfg!=null)	{
				x.uiScroll({dom:dom});
			}
			if(dom&&dom.resizeHandler!=null){
				for(var i=0;i<dom.resizeHandler.length;i++){
					var fn=dom.resizeHandler[i];
					fn(dom);
				}
			}
		}
	}
	x.reSizeDom=function(dom,dx,dy){/*按照变量改变dom大小*/
		if(x.isArray(dom)){
			x.each(dom,function(e){x.reSizeDom(e,dx,dy)});
		}
		else if(x.isElement(dom)){
			var width=x.toNum(x.getStyle(dom).width);
			var height=x.toNum(x.getStyle(dom).height);
	
			if(x.isNum(dx)) width+=dx;
			//else			width=null;
			if(x.isNum(dy)) height+=dy;
			//else			height=null;	
			x.setDomSize(dom,width,height);
		}
	}
	x.setDomPosition=function(dom,left,top){
		if(isNum(left))	dom.style.left=left+"px"
		if(isNum(top))	dom.style.top=top+"px"
	}
})(window);


	