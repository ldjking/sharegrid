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
x.isWebKit = check(/webkit/);
x.isFF=check(/firefox/);
x.isOpera=check(/opera/);
if(check(/msie/))	x.isIE = ua.match(/msie (\d+)/)[1];
else							x.isIE = false;

x.strSub=function(str,num1,num2){/*子串*/
	var result=null;
	if(x.isStr(str)){
		if(x.isNum(num1)&&x.isNum(num2))	result=str.substr(num1,num2);
		else if(x.isNum(num1)){
			if(num1>=0) result=str.substr(num1);
			else	result=str.substr(str.length+num1);
		}
		else if(x.isStr(num1)){
			var p=str.indexOf(num1);
			if(p>=0){
				if(num2){/*后一半 */
					 result= str.substr(p+1);
				}
				else{/*前一半*/
					 result= str.substr(0,p);
				}
			}
			else{/*不存在该字符串*/
				if(num2)	return null;
				else		return str;
			}
		}
	}
	return result;
}
x.getTodayStr=function(){/*获取今日是哪一天 星期几*/
	var now=new Date();
	var date=new Date();
	var today=x.dt2Str("yyyy年mm月dd日");
	var num=date.getDay(date);
	var weekdays=["日","一","二","三","四","五","六"]
	return today+" 星期"+weekdays[num];
}
x.dt2Str=function(format,date,flag){/*格式化日期*/
	if(date==null)	date=new Date();
	var f=[	"yyyy-mm-dd","hh:MM:ss","SSS","yyyy-mm-dd hh:MM:ss","hh:MM:ss SSS","yyyy-mm-dd hh:MM:ss SSS"];
	if(format==null) 		format=f[5];
	else if(format==1) 		format=f[0];
	else if(format==2)		format=f[1];
	else if(format==3)		format=f[2];
	else if(format==12)		format=f[3];
	else if(format==23)		format=f[4];
	else if(format==123)	format=f[5];
	
	var o ={"y+" : date.getFullYear(), /*month   */
			"m+" : date.getMonth()+1, /*month   */
			"d+" : date.getDate(),    /*day   */
			"h+" : date.getHours(),   /*hour   */
			"M+" : date.getMinutes(), /*minute   */
			"s+" : date.getSeconds(), /*second   */
			"q+" : Math.floor((date.getMonth()+3)/3), 	/*quarter   */
			"S+" : date.getMilliseconds() /*millisecond   */}   
	for(var k in o)
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1, o[k]); 
		}
	return format;   
}
x.toNum=function(str){
	if(x.isStr(str)){
		var str2=str.replace(/[^0-9|\.|\-]/g,"");//还要判断是否是数字格式
		var num=0;
		if(str2=="")	return 0;
		try{
			if(str2.indexOf(".")>0)	num=parseFloat(str2);
			else					num=parseInt(str2);
		}catch(e){
			num=0;
		} 
		return num;
	}
	if(x.isNum(str))	return str;
	else				return 0;
}
x.limitValue=function(v,v_min,v_max){/*限制数据*/
	if(v<v_min)	return v_min
	else if(v>v_max)	return v_max;
	return v;
}
x.add=function(array,obj){/*add本身并不具有去重功能*/
	if(isArray(obj)){
		for(var i=0;i<obj.length;i++){
			array.push(obj[i]);
		}
	}
	else array.push(obj);
	return array;
}
x.add2=function(array,obj){/*add2会自动去重*/
	if(x.isArray(obj)){
		for(var i=0;i<obj.length;i++){
			if(!x.contains(array,obj[i]))	array.push(obj[i]);
		}
	}
	else if(!x.contains(array,obj)) array.push(obj);
	return array;
}
x.includes=function(array1,array2){/*两个数组是否存在包含关系*/
	if(x.isArray(array1)&&x.isArray(array2)){
		for(var i=0;i<array2.length;i++){
			if(!x.contains(array1,array2[i]))	return false;
		}
		return true;
	}
	return false;
}

x.replaceObj=function(array,obj1,obj2){/*替换数组中某个对象*/
	for(var i=0;i<array.length;i++){
		if(array[i]===obj1)	array[i]=obj2;
	}
	return array;
}
/*数组相关操作*/
x.indexOf=function(array,obj){
	if(x.isArray(array)){
		for(var i=0;i<array.length;i++){
			if(array[i]===obj)	return i;
		}
	}
	return -1;
}
x.sortData=function(data,attr){/*按照属性来对数据进行排序*/
	for(var i=0;i<data.length;i++){
		var obj1=data[i];
		var value1=obj1[attr];
		for(var j=i+1;j<data.length;j++){
			var obj2=data[j];
			var value2=obj2[attr];
			if(value1>value2){		/*小的数据冒泡至前*/
				var temp=obj1;
				data[i]=obj2;
				data[j]=obj1;
			}
		}
	}
	return data;
}
x.rmArray=function(array,obj){/*删除数组中的某个元素*/
	var result=[];
	if(x.isArray(array)){
		for(var i=0;i<array.length;i++){
			if(array[i]!=obj){
				result.push(array[i]);
			}
		}
		return result;
	}
}
x.contains=function(array,obj){/*判断某个对象是否在数组中*/
	if(x.isArray(array)){
		for(var i=0;i<array.length;i++){
			if(array[i]===obj)	return true;
		}
	}
	return false;
}
/*超级常用函数  each  hitch*/
x.each=function(array,fun){/*对数组内所有元素执行fun函数  直到fun函数返回true为止*/
	if(isFun(fun)){
		for(var i=0;i<array.length;i++){
			var result=fun(array[i],i,array);/*标准调用格式  element index  array*/
			if(result===true)	break;
		}
	}
	return array;/*each执行完返回array*/
}
x.hitch=function(){/*连接函数  绑定上下文  绑定参数*//*参数  第一个应该是一个函数 要求该函数符合规范的写法  后面紧跟着各个参数*/
	var args=arguments;
	var obj=args[0];
	var fn=args[1];
	if(!isFun(fn))	return;/*如果该值不是函数  直接返回 false*/
	var merge=function(args1,args2){
		var result=[];
		for(var i=2,j=0;i<args1.length+args2.length;i++){
			if(args1[i]===undefined){/*如果该参数未定义*/
				if(j<args2.length)	result.push(args2[j]);/*使用第二个实参来填充*/
				j++;
			}
			else{
				if(i<args.length)	result.push(args1[i]);
				else{ 
					if(j<args2.length){/*第二个实参还没遍历完*/
						result.push(args2[j]);
						j++;
					}
				}
			}
		}
		return result;
	}
	return function(){
		var args2=arguments;
		var argsArray=merge(args,args2);
		return fn.apply(obj,argsArray);
	}
}

/*数据部分  主要负责数据格式转换  数据对比*/
x.mix=function(obj1,obj2,override){/*复制一个对象到另外一个对象  只复制数据部分   要求两个参数是普通对象*/
	var obj={};
	if(x.isArray(obj1)){/*如果是数组*/
		obj=[];
		for(var i=0;i<obj1.length;i++)	obj[i]=obj1[i];
	}
	else if(x.isPlainObj(obj1)){/*如果是简单对象*/
		obj={};		
		for(var p in obj1)	obj[p]=obj1[p];
	}
	if(x.isPlainObj(obj)&&x.isPlainObj(obj2)){/*如果是简单对象*/
		for(var p in obj2){
			if(!x.isFun(obj2[p])){/*如果obj2的这个属性不是函数*/
				if(this[p]===undefined||override){/*如果自身没有  或者要求重载   则复制  那么这里的复制是深度复制clone呢，还是浅复制*/
					obj[p]=obj2[p];/*直接引用这个值*/
				}
			}
		}
	}
	return obj;
}

x.clone=function(obj,datas,clones){/*克隆一个对象*/
	datas=datas?datas:[];clones=clones?clones:[];
	var result=null;
	if(x.contains(datas,obj)){/*如果已经包含这个对象   这时候不应该返回obj   而应该返回obj克隆出来的对象*//*;////out("发现重复！");*/
		var i=x.indexOf(datas,obj); /*IE8 不支持 indexof 不支持这个方法 你妈的*/
		return clones[i];/**/
	}
	
	if(obj){/*如果不为空*/
		if(x.isArray(obj)){/*如果是数组*/
			result=[];
			datas.push(obj);
			clones.push(result);

			for(var i=0;i<obj.length;i++)	result[i]=x.clone(obj[i],datas,clones);
		}
		else if(x.isPlainObj(obj)){/*如果是简单对象*/
			result={};
			datas.push(obj);
			clones.push(result);
			
			for(var p in obj)	result[p]=x.clone(obj[p],datas,clones);
		}
		else{/*如果是dom相关的  或者是简单数值  返回直接值  不需要再做保存*/
			result=obj;
		}
	}
	return result;
}
var trans=function(str,tflag){/*对字符串进行转义 转义内容包括[]{}:,共6个分别转义成<1><2><3><4><5><6>*/
/*其中增加额外的内容需要处理  1是%这是数据库里面的关键字  2是@也是引擎所需要用到的关键字【替换sql语句中参数，参数均为@开头】*/
	if(isNull(str))	return null;
	if(isStr(str)){
		//str=str.replace("\"","'");
		if(tflag){
			str=str.toString();
			str=str.replace(/\[/g,"<1>");
			str=str.replace(/\]/g,"<2>");
			str=str.replace(/\{/g,"<3>");
			str=str.replace(/\}/g,"<4>");
			str=str.replace(/\:/g,"<5>");
			str=str.replace(/\,/g,"<6>");
			str=str.replace(/\%/g,"<7>");
			str=str.replace(/\@/g,"<8>");
			str=str.replace(/\n/g,"<9>");/*不再转义成br   但是post提交过程中\n似乎消失了  所以仍需要转义*/
			/*需要转义 []{} , : @ % 等字符[not complete]*/

		}
		else str="\""+str+"\"";
	}
	else str=str.toString();
	return str;
}
var blanks=function(num){
	var str="";
	for(var i=0;i<num;i++)	str+=" ";
	return 	str;
}
var htmlStr=function(str){/*对字符进行html转义*/
	if(isStr(str)){
		str=str.replace(/</g,"&lt;");
		str=str.replace(/>/g,"&gt;");
		str=str.replace(/ /g,"&nbsp;");
		str=str.replace(/[\r|\n]/g,"<br/>");

	}
	return str;
}
var strDom=function(dom,flag,indent){/*对字符进行html转义*/
	if(flag==null)		flag=true;
	if(indent==null)	indent="";
	var tagName=dom.tagName.toLowerCase();
	var id=dom.id;
	var className=dom.className;
	var type=dom.type;
	var src=dom.src;
	var str="\n"+indent+"&lt;"+tagName;
	
	if(id!=null&&id!="")				str+=" id="+id;
	if(className!=null&&className!="")	str+=" class="+className;
	if(type!=null&&type!="")			str+=" type="+type;
	if(src!=null&&src!="")				str+=" src="+src;
	str+="&gt;";
	if(flag){
		var indent2=indent+"    ";
		var childs=dom.childNodes;
		for(var i=0;i<childs.length;i++){
			var child=childs[i];
			//alert(child.nodeValue);
			if(child.nodeType==1){
				str+=strDom(child,true,indent2);
			}
			else{
				var value=htmlStr(child.nodeValue);
				if(value==null)	value="";
				str+=value;
			}
		}
	}
	if(flag){
		if(dom.childNodes.length<=1)	str+="&lt;/"+tagName+"&gt;";
		else	str+="\n"+indent+"&lt;/"+tagName+"&gt;";
	}
	else		str+="&lt;/"+tagName+"&gt;";
	//alert("tagName:"+tagName);
	return str;
}
var getFunName=function(fn){/*获取function的名称*/
	var str=fn.toString();
	str=str.substr(0,str.indexOf("("));
	str=str.replace("function ","");
	str=str.trim();
	return str;
}
x.jsonStr=function(obj,flag,indent,datas){/*将对象转换成Json格式   只保留数据 不保留函数*/
/*datas的引入是为了解决递归无线循环问题  如果一个元素已经在datas里面，程序会意识到出现了递归*/
	var tflag=true;
	if(flag==null)	{
		flag=true;/*控制是否换行 格式化  indent是缩进字符个数 默认是换行缩进的  但是发送ajax时不换行，不缩进*/
		tflag=false;
		indent=0;
	}
	if(flag==true)	tflag=false;
	
	
	datas=datas?datas:[];
	var result="null";
	var result="";
	
	if(x.isNull(obj))	return null;
	else if(x.isArray(obj)){/*如果参数是数组*/	
		if(x.contains(datas,obj))	return "\"repear ref!\"";
		/*发现循环的情况  及时跳出  发现重复未必是死循环  如何判定死循环是个难题  
		（未实现）可以使用一个数组 装正在处理的对象 处理完移除  即可判断作用链上是否重复*/
		datas.push(obj);
		
		if(flag)	result="\n"+blanks(indent)+"[";/*如果换行缩进*/
		else		result="[";
		for(var i=0;i<obj.length;i++){/*为了兼容 jquery ligerUI的键值对方式*/
			if(flag)	result+="\n"+blanks(indent+2);
			result+=x.jsonStr(obj[i],flag,indent+2,datas);
			if(i<obj.length-1){
				result+=",";
			}
		}
		if(flag&&i>0)	result+="\n"+blanks(indent);
		result+="]";
	}
	else if(x.isFun(obj))		result=getFunName(obj);
	else if(x.isSimple(obj))	result=trans(obj,tflag);/*是个简单数*/
	else if(x.isWin(obj))		result="window";
	else if(x.isDoc(obj))		result="document";
	else if(x.isElement(obj))	result=strDom(obj);
	else if(x.isPlainObj(obj)){/*如果参数是对象  而且是个简单对象*/
		if(x.contains(datas,obj))	return "repeat";/*"null";*//*发现循环的情况  及时跳出  发现重复未必是死循环  如何判定死循环是个难题*/
		datas.push(obj);
		
		if(x.isDate(obj))		result=trans(x.dt2Str(null,obj),tflag);/*如果是日期类型*/
		else{
			if(flag)	result="\n"+blanks(indent)+"{";/*如果换行缩进*/
			else		result="{";
			var i=0;
			for(var p in obj){
				if(obj[p]!=null){
					if(!x.isFun(obj)){
						if(i>0)	result+=",";
						i++;
						if(flag) result+="\n"+blanks(indent+2);
						result+=p+":"+x.jsonStr(obj[p],flag,(indent+4),datas);
					}
				}
			}
			if(flag&&i>0)	result+="\n"+blanks(indent);
			result+="}";
		}
	}
	else	result=""+obj/*其他情况   直接返回*/
	return 	result;
}	
x.out=function(prefix,info,wrap,flag){/*写日志信息 所有日志信息必须有表头  prefix不允许为空  flag为true代表带上时间*/
	if(prefix)	flag=flag==true?true:false;/*除非指明为false*/
	if(parent!=self){
		parent.out(prefix,info,wrap,flag);
		return;
	}
	var id="debug_console";
	var div=document.getElementById(id);
	if(div==null){		
		div=document.createElement("div");
		div.id=id;
		document.body.appendChild(div);
		div.ondblclick=function(){div.style.display="none"};
	}
	if(info!=null)	info=x.jsonStr(info);	
	div.style.display="block";
	if(wrap)	info="<div style='padding-left:32px'>"+info+"</div>"
	
	var str="<pre><label>"+prefix+":</label>"+info+"</pre>";
	if(info==null)	str="<pre><label>"+prefix+"</label></pre>";
	if(flag){
		str="<pre><label><label class='date'>"+x.dt2Str(23)+"</label> "+prefix;
		if(info!=null)	str+= ":消息</label>"+info+"</pre>";
		else			str+= "</label></pre>";
	}
	
	div.innerHTML=str+div.innerHTML;
}
x.getChilds=function(dom){/*要忽略掉空白节点*/
	var result=[];
	if(dom&&dom.childNodes){
		var childs=dom.childNodes;
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType==1){
				result.push(childs[i]);
			}
		}
	}
	return result;
}
x.getDomNum=function(dom){/*获取自身在父节点子元素中的序号*/
	var childs=x.getChilds(dom.parentNode);
	for(var i=0;i<childs.length;i++){
		if(dom==childs[i])	return i;
	}
	return -1;
}
x.$=function(id){/*只提供根据id查找*/ 
	return document.getElementById(id);
}
x.jumpUrl=function(url){
	document.location=url;
}
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
}
x.getScale=function(dom){
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
var flag=false;
x.setRotateY=function(dom,degree,scale){/*degree旋转度数  旋转中心*/
	var str="perspective(540px) rotateY("+degree+"deg)";
	if(scale!=null)	str+=" scale("+scale+")";
	if(isFF){/*火狐的缩放*/
		dom.style.MozTransform=str;
	}
	else if(isWebKit){/*谷歌的缩放*/ 
		dom.style.webkitTransform=str;
	}
	else if(isIE){/*IE浏览器 使用filter*/
		dom.style.msTransform=str;
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

x.cssContain=function(dom,css1){
	if(isElement(dom)){
		var css=dom.className.split(/\s+/g);
		if(x.contains(css,css1)){/*如果没有该样式 方添加*/
			return true;
		}
	}
	return false;
}
x.$e=function(name,num){
	if(isNum(num)){
		var result=[];
		for(var i=0;i<num;i++){
			result.push(document.createElement(name));
		}
		return result;
	}
	return document.createElement(name);
}
var system_id_sequence=0;
x.getId=function(prefix){
	var id=system_id_sequence++;
	if(prefix)	id=prefix+"_"+id;
	else		id="xdom_"+id;
	return id;
}

x.unbind=function(dom,evt){
	if(x.isArray(dom)) x.each(dom,function(e){x.unbind(e,evt)});
	else if(x.isElement(dom)){
		if(x.isStr(evt)){
			dom["on"+evt]=null;
		}
	}
	return dom;
}
x.bind=function(dom,evt,fun){
	if(x.isArray(dom)) x.each(dom,function(e){x.bind(e,evt,fun)});
	else if(x.isElement(dom)){
		////out("isIE:"+x.isIE);
		if(x.isIE>0&&x.isIE<9){
			var fun2=function(){
				var fn=x.hitch(dom,fun,event);
				fn();
			}
			if(x.isStr(evt)){
				dom["on"+evt]=fun2;/*只能注册这一个事件*/
			}
		}
		else{
			var fun2=x.hitch(dom,fun);
			if(x.isStr(evt)){
				dom["on"+evt]=fun2;/*只能注册这一个事件*/
			}
		}
	}
	return dom;
}
function Animation(conf){/*高级动画，允许执行自定义函数 自定义函数能够产生效果并判断是否中止  这个动画的run操作里可以自定义自身*/
	this.runState=false;
	this.timer=null;	/*一个动画只能保持一个定时器*/
	this.tasks=[];		/*一个动画里可以有多项任务 每个task里是*/	
	var _interval=17;	/*执行间隔*/
	this.conf=conf;		/*配置文件  可以配置的属性包括执行间隔  执行完的回调函数*/
	if(conf&&conf._interval)	_interval=conf._interval;
	this.run=function(cfg){/*run方法要求提供 fun*/
		var am_rate=function(b,g){/*b是时间 总次数//引入v和s的概念*/
			var s=b*g/4*b;//平均速度乘以时间
			var s2=[];
			var r=[];
			for(var t=1;t<=b;t++){
				if(t<=b/2)	{s2[t]=g*t*t/2;}
				else{
					var d=t-b/2;
					s2[t]=g*b*b/8+g*b*d/2-g*d*d/2;
				}
				r[t]=s2[t]/s;
			}
			return r;
		}
		this.runState=true;
		if(cfg){
			cfg.excuteTime=null;
			if(cfg.time==null)	cfg.time=600;
			//if(isIE)	var _time=cfg.time*0.5;
	
			cfg.totalTime=Math.floor(cfg.time/_interval);
			cfg.rates=am_rate(cfg.totalTime,10);//总次数 和加速度
			/*总执行次数*/
			this.tasks.push(cfg);/*将动画参数装到任务中去*/
			if(this.timer==null){
				var _this=this;
				this.timer=setInterval(function(){_this.run()},_interval);
			}
			return this;
		}
		var cfg=this.tasks[0];/*获取第一项任务*/
		if(cfg.excuteTime==null){/*首次执行该任务*/
			cfg.excuteTime=0;
			cfg._delay=cfg.delay;//另外保存一个延迟			
		}
		if(isNum(cfg._delay)){
			cfg._delay-=_interval;
			if(cfg._delay>0){/*仍然处于延迟期间*/
				return this;
			}
		}
		cfg.excuteTime++;/*每次执行事件增加*///然后执行用户自定义函数，fun能够自动执行
		if(isFun(cfg.fun)){
			var x=cfg.fun(cfg);//执行这个特效
			if(x==true){//返回true代表终结/
				cfg.excuteTime=null;
				this.tasks.shift();//删除掉顶部
				if(cfg.callBack){//如果执行完还有触发事件
					cfg.callBack();
				}
			}
		}
		if(this.tasks.length==0){/*结束任务*/
			clearInterval(this.timer);
			this.timer=null;
			this.runState=false;
		}
		return this;
	}
	this.pause=function(){/*暂停事件的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
	}
	this.start=function(){/*启动事件*/
		var _this=this;
		this.timer=setInterval(function(){_this.run()},_interval);
	}
	this.clear=function(){/*清除动画的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
		this.tasks=[];
	}
}
var fnFix=function(cfg){/*使对象的某个值达到目标值*/
	var dom=cfg.dom;
	var style=x.getStyle(dom);
	
	if(cfg.startValue==null){
		var oriValue=style[cfg.attr];
		var targetValue=cfg.value;
		cfg.startValue=x.toNum(oriValue);	/*必须要转换成数字才能实现动画*/
		cfg.targetValue=x.toNum(targetValue);
	}
	var rate=cfg.rates[cfg.excuteTime];
	var currValue=(cfg.targetValue-cfg.startValue)*rate+cfg.startValue;			
	//alert("currValue"+currValue);	
	cfg.dom.style[cfg.attr]=Math.ceil(currValue)+"px";
	if(rate==1){
		cfg.oriValue=null;
		cfg.startValue=null;
		return true;//隐藏
	}
}

x.fxFix=function(dom,attr,value,suffix,delay,duration,fn){/*展示自身*/
	//alert("fxFix");
	var a=dom._animate;
	if(a==null)	dom._animate=a=new Animation();
	var cfg={dom:dom,attr:attr,value:value,suffix:suffix,fun:fnFix,delay:delay,time:duration,callBack:fn};
	a.run(cfg);
	return dom;
}
var fnRotate=function(cfg){/**/
	var dom=cfg.dom;
	var style=x.getStyle(dom);
	
	if(cfg.rotate1==null){
		var oriValue=style[cfg.attr];
		cfg.rotate1=x.toNum(oriValue);	/*必须要转换成数字才能实现动画*/
	}
	var rate=cfg.rates[cfg.excuteTime];
	var currRotate=(cfg.rotate2-cfg.rotate1)*rate+cfg.rotate1;			
	//alert("currValue"+currValue);	
	//cfg.dom.style[cfg.attr]=Math.ceil(currValue)+"px";
	var currScale=(cfg.scale2-cfg.scale1)*rate+cfg.scale1;	

	//x.out("rotate=["+currRotate+"] scale=["+currScale+"]");
	x.setRotateY(cfg.dom,currRotate,currScale);
	if(rate==1){
		return true;//
	}
}
x.fx3dRotate=function(dom,value1,value2,value3,value4,delay,duration,fn){/*让一个对象3D旋转*/
	var a=dom._animate;
	if(a==null)	dom._animate=a=new Animation();
	var cfg={dom:dom,rotate1:value1,rotate2:value2,scale1:value3,scale2:value4,fun:fnRotate,delay:delay,time:duration,callBack:fn};
	a.run(cfg);
	return dom;
}

/*触摸滚动事件及滚动修正*/
var e_dom_touchstart=function(evt){
	var point=evt.touches[0];
	this.lastY=point.clientY;
	//out("touch start id",this.id);
	//evt.preventDefault();
}
var e_dom_touchmove=function(evt){
	var point=evt.touches[0];
	var nowY=point.clientY;
	var dy=0;
	if(this.lastY!=null)	dy=nowY-this.lastY;
	this.lastY=nowY;
	var dom=this.childNodes[0];
	//out("dom",dom);
	var marginTop=x.getStyle(dom).marginTop;
	//out("touch move marginTop",marginTop);
	if(marginTop==null)	marginTop=0;
	else	marginTop=parseInt(marginTop.replace("px",""));
	marginTop-=dy;
	
	var clientHeight=this.clientHeight;
	var fullHeight=dom.scrollHeight;
	//out("clientHeight=["+clientHeight+"] fullHeight=["+fullHeight+"]");
	var minTop=clientHeight-fullHeight;
	//if(marginTop>0)	marginTop=0;
	//if(marginTop<minTop)	marginTop=minTop;
	dom.style.marginTop=marginTop+"px";
	//out("style.top",x.getStyle(this).top);
	//out("rect.top",x.getRect(this).top);
	
	
	evt.preventDefault();
}
var e_dom_touchend=function(evt){
	//alert("touch end");
	var dom=this.childNodes[0];
	var marginTop=x.getStyle(dom).marginTop;
	//out("marginTop",marginTop);
	if(marginTop==null)	marginTop=0;
	else	marginTop=parseInt(marginTop.replace("px",""));
	var clientHeight=this.clientHeight;
	var fullHeight=dom.scrollHeight;
	//out("clientHeight=["+clientHeight+"] fullHeight=["+fullHeight+"]");
	var minTop=clientHeight-fullHeight;/*minTop应该是个负值*/
	//if(marginTop>0)	marginTop=0;
	//if(marginTop<minTop)	marginTop=minTop;
	this.lastY=null;
	//alert(marginTop);
	if(marginTop>0)			x.fxFix(dom,"marginTop",0,"px",0,200);
	if(minTop>0){
		//out("minTop",minTop);
		x.fxFix(dom,"marginTop",0,"px",0,200);
	}else if(marginTop<minTop)	x.fxFix(dom,"marginTop",minTop,"px",0,200);

	evt.preventDefault();
}
var fixPosition=function(){
	/*使用一个动画让对象回归原位*/
}
x.fixScroll=function(dom){
	dom.ontouchstart=e_dom_touchstart;
	dom.ontouchmove=e_dom_touchmove;
	dom.ontouchend=e_dom_touchend;
}
})(window)