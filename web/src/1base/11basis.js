/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
x.isNull=function(obj){return obj==null}/*包含了undefine 和null*/
x.isEmpty=function(obj){
	if(obj==null)		return true;
	if(x.isStr(obj)&&obj.length==0)	return true;
	if(x.isArray(obj)&&obj.length==0)	return true;

	if(typeof(obj)=="object"){/*是对象且有值*/
		for(var p in obj){	return false;}	
		if(!x.isDate(obj))	return true;/*如果该对象没有任何可遍历的属性*/
	}
	return false;
}
x.isEmptyObj=function(obj){
	if(obj==null)	return true;
	if(typeof(obj)=="object"){/*是对象且有值*/
		for(var p in obj){	
			var value=obj[p];
			if(value!=null&&value!="")	return false;
		}	
	}
	return true;
}
x.isNum=function(obj){return typeof(obj)=="number"&&isFinite(obj)}/*是数字且是有限的*/
x.isInt=function(obj){return x.isNum(obj)&&obj.toString().indexOf(".")<0}
x.isDate=function(obj){return obj instanceof Date}
x.isBool=function(obj){return typeof(obj)=="boolean"}
x.isStr=function(obj){return typeof(obj)=="string"}
x.isArray=function(obj){return obj instanceof Array}
x.isFun=function(obj){return typeof(obj)=="function"}
x.isObj=function(obj){return obj instanceof Object}/*是个对象*/
x.isDate=function(obj){return obj instanceof Date}/*是个对象*/
x.isWin=function(obj){return obj===window}
x.isDoc=function(obj){return obj===document}
x.isElement=function(obj){return obj!=null&&obj.nodeType!=null&&obj.parentNode!=null}/*是原始dom元素*/	
x.isDom=function(obj){return x.isWin(obj)||x.isDoc(obj)||x.isElement(obj)}/*是否为dom元素*/
x.isPlainObj=function(obj){return x.isObj(obj)&&!x.isDom(obj)&&!x.isFun(obj)}/*不是dom元素 不是函数的对象认为是普通对象*/
x.isSimple=function(obj){return x.isNull(obj)||x.isNum(obj)||x.isBool(obj)||x.isStr(obj)}/*如果是简单数据*/


/*判断浏览器*//*执行一个匿名函数  运算出浏览器对象的状况*/
var ua = navigator.userAgent.toLowerCase(),check = function(r){return r.test(ua);};
x.isChrome = check(/chrome/);
x.isWebKit = check(/webkit/);
x.isSafari = !x.isChrome && check(/safari/);
x.isGecko = !x.isWebKit && check(/gecko/);
x.isFF=x.isGecko&&check(/firefox/);
if(!x.isOpera && check(/msie/))	x.isIE = ua.match(/msie (\d+)/)[1];
else							x.isIE = false;

})(window);
