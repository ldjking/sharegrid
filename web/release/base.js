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
/*xlib.12extend 扩展的方法  主要是扩展字符串、数组、日期函数、数组遍历each函数*/
(function(x){
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
		//;////out("toNumStr:["+str+"]:["+str2+"]");
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
x.capture1=function(str,reg){/*获得正则表达式的第一个捕获*/
	var result=reg.exec(str);
	if(result!=null)	return result[1];
	return null;
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
			if(x.isArray(obj)){
				var flag=true;
				for(var j=0;j<obj.length;j++){
					if(array[i]===obj[j]){
						flag=false;
						break;
					}
				}
				if(flag)	result.push(array[i]);
			}
			else{
				if(array[i]!=obj){
					result.push(array[i]);
				}
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
})(window);

/*xlib.13core		核心函数 hitch绑定函数上下文  mix复合数据  clone克隆数据  jsonStr*/
(function(x){
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
x.copy=function(obj1,obj2,override){
	if(override===undefined)	override=true;/*默认为空*/
	if(x.isPlainObj(obj1)&&x.isPlainObj(obj2)){/*如果都是普通对象*/
		for(var p in obj2){
			if(!x.isFun(obj2[p])){/*如果obj2的这个属性不是函数*/
				if(obj1[p]===undefined||override){/*如果自身没有  或者要求重载   则复制  那么这里的复制是深度复制clone呢，还是浅复制*/
					obj1[p]=obj2[p];/*直接引用这个值*/
				}
			}
		}
	}
}

/*数据部分  主要负责数据格式转换  数据对比*/
x.mix=function(obj1,obj2,override){/*复制一个对象到另外一个对象  只复制数据部分   要求两个参数是普通对象*/
	if(obj1==null&&obj2==null)	return null;
	
	var obj={};

	if(x.isArray(obj1)){/*如果是数组*/
		obj=[];
		for(var i=0;i<obj1.length;i++)	obj[i]=obj1[i];
	}
	else if(x.isPlainObj(obj1)){/*如果是简单对象*/
		obj={};		
		for(var p in obj1)	obj[p]=obj1[p];
	}
	if(x.isPlainObj(obj2)){/*如果是简单对象*/
		for(var p in obj2){
			if(!x.isFun(obj2[p])){/*如果obj2的这个属性不是函数*/
				if(obj1==null)	obj[p]=obj2[p];
				else if(obj1[p]===undefined||override){/*如果自身没有  或者要求重载   则复制  那么这里的复制是深度复制clone呢，还是浅复制*/
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
})(window);

/*xlib.15dom  文档对象辅助  包括筛选器 $  等函数*/
(function(x){
	x.getParam=function(name){
		var url=document.URL;
		////out("url",url);
		if(url!=null&&url.indexOf("?")>0){
			var paramStr=url.substr(url.indexOf("?")+1);
			////out("paramStr",paramStr);
			if(paramStr!=null){
				var params=paramStr.split(/\&/g);
				for(var i=0;i<params.length;i++){
					if(params[i].indexOf(name)==0){
						return params[i].substr(params[i].indexOf("=")+1);
					}
				}
			}
		}
		return null;
	}
	x.inDom=function(dom1,dom2){/*判断元素是否在另一个元素内  */
		var flag=true;
		var temp=dom1;
		if(x.isElement(dom1)&&x.isElement(dom2)){
			do{	
				if(temp==dom2)	return true;
				else{
					if(temp==document.body)	return false;/*一直到最顶层了*/
					temp=temp.parentNode;
				}
			}while(true);
		}
		return false;
	}
	
	x.clearDom=function(dom){
		if(x.isElement(dom)){
			for(var i=0;i<dom.childNodes.length;){
				dom.removeChild(dom.childNodes[0]);
			}
		}
	}
	x.addChild=function(dom,ele){/*插入节点*/
		if(x.isArray(ele)){
			x.each(ele,function(e){dom.appendChild(e)})
		}
		else	dom.appendChild(ele);
		return dom;
	}
	x.insertDom=function(dom){/*插入到自身之前 还是之后*/
	}
	
	x.rmDom=function(dom){/*删除自身*/
		if(x.isArray(dom)){
			for(var i=0;i<dom.length;i++){
				dom[i].parentNode.removeChild(dom[i]);
			}
			return dom;
		}
		return dom.parentNode.removeChild(dom);
	}
	
	x.getChilds=function(dom,num){/*获取子元素  返回一个数组或某个具体的dom*/
		if(!x.isElement(dom))	return null;/*如果不是dom元素，返回空*/
		var doms=[];
		for(var i=0;i<dom.childNodes.length;i++){
			if(dom.childNodes[i].nodeType==1)
			doms.push(dom.childNodes[i]);
		}
		if(isInt(num)){
			if(num>=0&&num<doms.length)		return doms[num];
			else							return null;
		}
		return doms;
	}
	x.getNextNode=function(dom){/*下一个节点*/
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		if(_p==_childs.length-1)	return null;/*如果后面没有了 返回空*/
		return _childs[_p+1];
	}
	x.getNextNodes=function(dom){/*同级低于本节点的节点*/
		var result=[];
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		for(var i=_p+1;_p>0,i<_childs.length;i++)
		{
			result.push(_childs[i]);
		}
		return result;
	}
	x.getPreNode=function(dom){/*上一个节点*/
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		if(_p==0)	return null;
		return _childs[_p-1];
	}
	x.getPreNodes=function(dom){/*同级高于本节点的节点*/
		var result=[];
		var _childs=x.getChilds(dom.parentNode);
		var _p=x.getDomIndex(dom);
		for(var i=0;_p>0,i<_p;i++)
		{
			result.push(_childs[i]);
		}
		return result;
	}
	x.insertDom=function(target,dom){/*在目标位置后面插入一个元素*/
		if(x.isElement(target)){
			if(target.nextSibling!=null){
				target.parentNode.insertBefore(dom,target.nextSibling);
			}
			else{
				target.parentNode.appendChild(dom);
			}
		}
	}
	x.getDomIndex=function(dom,container){/*获取自身在父元素中的位置  container不为空则获取自身在该容器的位置*/
		if(container){//如果容器不为空
			var _node=dom;
			if(_node&&_node.parentNode){
				if(_node.parentNode==container)	return x.getDomIndex(dom);
				while(true){
					_node=_node.parentNode;
					if(_node.parentNode==container){
						//;//out(_node);
						return $(_node).getP();
					}
					if(_node==document.body)/*已经到了最顶层*/return -1;
					
				}
			}
		}
		else{
			if(dom&&dom.parentNode){
				var childs=x.getChilds(dom.parentNode);/* problem maybe  _dom may be null*/
				for(var i=0;i<childs.length;i++)
					if(childs[i]==dom)	return i;
			}
		}
		return -1;
	}
	
	x.getAncestor=function(dom){/*祖先节点*/
		var result=[];
		var _p=dom.parentNode;
		while(_p&&_p!=document)
		{
			result.push($(_p));
			_p=_p.parentNode;
		}
		return result;
	}
		
	x.getAncestor2=function(dom){/*自身和祖先节点*/
		var result=[dom];
		var _p=dom.parentNode;
		while(_p&&_p!=document)
		{
			result.push($(_p));
			_p=_p.parentNode;
		}
		return result;
	}
	x.getSubs=function(dom){/*所有子孙节点*/
		//;////out("get subs!");
		var result=[];
		var _childs=x.getChilds(dom);
		//;////out("childs length:"+_childs.length);
		if(_childs.length==0){/*没有子节点了*/}
		else{
			x.add2(result,_childs);
			for(var i=0;i<_childs.length;i++){
				x.add(result,x.getSubs(_childs[i]));
			}
		}
		//;////out("result length:"+result.length);
		return result;
	}
	x.getSiblings=function(dom){/*所有子孙节点*/
		return x.getChilds(dom.parentNode);
	}
	var matchQuery=function(dom,selector){/*匹配查询*/
		var tagName=x.strSub(selector,".");
		var css=x.strSub(selector,".",1);
		//;////out("tagName:"+tagName+" css:"+css);
		var flag=null;

		if(css!=null){
			css=css.split(",");/*多重样式使用,隔开*/
			var cssNames=dom.className?dom.className.split(" "):[];
		}
		if(!isEmpty(tagName)){/*如果不为空*/
			if(dom.tagName.toLowerCase()==tagName)	flag=true;
			else									flag=false;
		}
		if((flag===null||flag===true)&&css!=null){
			if(x.includes(cssNames,css))	flag=true;
			else							flag=false;
		}
		//;////out("match query["+selector+"]cssNames:["+cssNames+"] flag:"+flag);
		return flag;
	}
	
	var getTargets=function(context,direct){/*获取目标*/
		var targets=[];
		if(context==null){
			targets=x.getSubs($(document.body));
		}
		else{
			var fun=null;
			if(direct==0)						fun=x.getAncestor2;
			else if(direct==1)					fun=x.getAncestor;
			else if(direct==2)					fun=x.getChilds;
			else if(direct==null||direct==3)	fun=x.getSubs;
			else if(direct==4)					fun=x.getPreNodes;
			else if(direct==5)					fun=x.getNextNodes;
			else if(direct==6)					fun=x.getSiblings;
			if(x.isArray(context)){
				for(var i=0;i<context.length;i++){
					var result=fun(context[i]);
					x.add2(targets,fun(context[i]));
				}
			}
			else{
				x.add2(targets,fun(context));
			}
		}
		return targets;
	}
	
	x.$1=function(selector,context,direct){
		var result=x.$(selector,context,direct);
		if(x.isArray(result))	return result[0];
		else					return result;
	}
	x.$=function(selector,context,direct){/*在上下文中查找符合条件的对象  方向也在direct里面 
		上上0（包括自身）  上1   下2  下下 3  左4  右5  同级6*/
		//if(direct==null)	{direct=2;}/*默认是2*/
		if(x.isStr(selector)){
			//alert(selector.str(1))
			if(selector.indexOf(" ")>0){/*选择器 是复合的需要递归*/
				var selectors=selector.split(" ");/*分割非可见字符*/
				var _context=context;
				for(var i=0;i<selectors.length;i++){/*分割后的选择器*/
					var s=selectors[i];
					_context=x.$(s,_context,direct);
					if(i==selectors.length-1){
						return _context;//上下文一直在变化
					}
				}
			}
			else{/*选择器 是单一的的不需要递归*/
				if(selector.indexOf("#")==0)return document.getElementById(x.strSub(selector,1));/*是按照id查找  最简单*/
				else{/*其他情况 如果是按照类名或者标签名  甚至根据属性进行查询 进行查询*/
					var targets=getTargets(context,direct);
					var doms=[];
					for(var i=0;i<targets.length;i++){/*先找到目标*/
						var dom=targets[i];
						if(matchQuery(dom,selector))	doms.push(dom);
					}
					return doms;
				}
			}
		}
		else if(x.isElement(selector))	return selector;
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
	x.$file=function(className){
		var file=document.createElement("input");
		file.type="file";
		if(className)	file.className=className;
		return file;
	}
	x.$txt=function(className){
		var txt=document.createElement("input");
		txt.type="text";
		if(className)	txt.className=className;
		return txt;
	}
	x.$text=function(className){
		var text=document.createElement("textarea");
		//txt.type="text";
		text.rows=1;
		text.className=className;
		//if(className)	text.className=className;
		return text;
	}
	x.$table=function(rows,cols){/*创建一个table*/
		var table=x.$e("table")
		var tbody=x.$e("tbody");
		table.cellSpacing="0";
		table.cellPadding="0";
		//table.border="0";
		for(var i=0;i<rows;i++){
			var tr=x.$e("tr");
			for(var j=0;j<cols;j++){
				var td=x.$e("td");
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		return table;
	}

	x.$div=function(id,className){
		var div=x.$e("div");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	x.$checkbox=function(id,className){
		var check=x.$e("input");	check.type="checkbox";
		if(className)	check.className=className;
		if(id)			check.id=id;
		return check;
	}
	x.$span=function(id,className){
		var div=x.$e("span");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	var system_id_sequence=0;
	x.getId=function(prefix){
		var id=system_id_sequence++;
		if(prefix)	id=prefix+"_"+id;
		else		id="xdom_"+id;
		return id;
	}
})(window);

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


	/*xlib.18evt		事件相关函数*/
(function(x){
	x.unbind=function(dom,evt){
		if(x.isArray(dom)) x.each(dom,function(e){x.unbind(e,evt)});
		else if(x.isElement(dom)){
			if(x.isStr(evt)){
				dom["on"+evt]=null;
			}
		}
		return dom;
	}
	
	x.bind=function(dom,evt,fun,obj){/*obj是要绑定的数据对象*/
		if(x.isArray(dom)) x.each(dom,function(e){x.bind(e,evt,fun,obj)});
		else if(x.isElement(dom)){
			if(obj==null) obj=dom;
			////out("isIE:"+x.isIE);
			if(x.isIE>0&&x.isIE<9){
				var fun2=function(){
					var fn=x.hitch(obj,fun,event);
					fn();
				}
				if(x.isStr(evt)){
					dom["on"+evt]=fun2;/*只能注册这一个事件*/
				}
			}
			else{
				var flag=(document.body.onmouseleave===undefined)||(document.body.onmouseenter===undefined);
				//out("flag",flag);
				var fun2=x.hitch(obj,fun);
				if(x.isStr(evt)){
					dom["on"+evt]=fun2;/*只能注册这一个事件*/
				}
				if(evt=="mouseleave"&&flag){/*再次修正  对于不支持mouseleave的用mouseout监听*/
					var outFix=function(evt){
						var target=x.getRelatedTarget(evt);
						var flag=x.inDom(target,this);
						if(!flag)	dom.onmouseleave(evt);
					}
					dom["onmouseout"]=outFix;
				}else if(evt=="mouseenter"&&flag){
					var enterfix=function(evt){
						var target=x.getRelatedTarget(evt);
						var flag=x.inDom(target,this);
						if(!flag)	dom.onmouseenter(evt);
					}
					dom["onmouseover"]=enterfix;
				}else if(evt=="mousewheel"&&x.isFF){
					dom.addEventListener('DOMMouseScroll',fun2, false);
				}
			}
		}
		return dom;
	}

	
	x.getTarget=function(evt){
		if(evt==null&&x.isIE){/*如果evt为空*/
			evt=event;
			return evt.srcElement;
		}
		if(evt.target!=null)	return evt.target;
		else					return evt.srcElement;
	}
	x.getRelatedTarget=function(evt){
        if (evt.relatedTarget) {
            return evt.relatedTarget;
        } else if (evt.toElement) {
            return evt.toElement;
        } else if (evt.fromElement) {
            return evt.fromElement;
        } else {
            return null;
        }
	}
	x.stopEvt=function(evt){
		if(evt==null&&x.isIE)	evt=event;
		evt.cancelBubble=true;
		if(evt.preventDefault)	evt.preventDefault();
		evt.returnValue=false;
	}
	x.getEvtRolled=function(evt){
		evt=evt?evt:event;
		var rolled = 0; 
		if (evt.wheelDelta) rolled = evt.wheelDelta/120*10; 
		else rolled = -evt.detail/3*10; 
		return rolled;
	}
})(window);

/*xlib.19ajax	服务器交互函数*/
(function(x){
	var sid=1;
	var funs=[];
	
	x.$excute=function(fnNum,result){/*fn实际上是个代码，不是具体的function*/
		var fn=funs[fnNum];
		if(isFun(fn))	fn(result);
		else			;////out("fn is not fun!");
	}
	x.$jsonp=function(method,param,fn,base_url){
		var fnNum=sid++;
		funs[fnNum]=fn;
		if(base_url==null){ 
			var url=document.URL;
			if(url.indexOf("http")==0)	base_url="../../../handler/";
			else	base_url="http://localhost/eam/handler/";
			
		}
		base_url+=method;
		base_url+="?p="+jsonStr(param,false);
		base_url+="&t=3";
		base_url+="&c="+fnNum;
		var now=new Date();
		var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
		base_url+="&r="+nowStr;
		var doc = document,head = doc.getElementsByTagName("head")[0];
		var t = doc.createElement("script");
		t.setAttribute("type","text/javascript");
		t.async = true;
		t.onreadystatechange = t.onload =  function(evt){
			if(!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete'){/*装载完成*/
				t.onreadystatechange = t.onload = t.onerror = null;
			}
		};
		t.src = base_url;
		head.appendChild(t);
	}
	
	var $callBack=function(xh,callBack){
		if(xh.readyState==4&&xh.status==200){
			var resultStr=xh.responseText;
			var resultObj=$myEval(resultStr);
			callBack(resultObj);
		}
	}
	var $myEval=function(str){
		if(str==null)	return null;
		if(str=="{}")	return {};
		if(!isStr(str))	return;
		var obj=null;
		try{
			obj=eval("("+str+")");
		}
		catch(e){/*eval发生异常*/
			alert("eval发生异常"+str);
		}
		return obj;
	}
	
	
	x.define=function(id,deps,result){/*定义一个资源  id是可选项  rs可以是data也可以是函数   资源的加载*/
		for(var i=0;i<rsList.length;i++){
			var rs=rsList[i];
			if(rs.id==id){/*如果id一致,且对象处于load状态*/
				rs.state="complete";/*加载完毕*/
				rs.callBack(result);
				break;
			}
		}
	}
	/*每个rs拥有src属性，加载状态属性，加载结果*/
	var seed_id=1;
	var rsList=[];
	x.require=function(id,src,callBack){/*按顺序加载资源  异步执行  执行完调用回调函数  flag是调试信息是否输出*/
		/*每次require都会产生一条记录  相当于每次require只能执行一个加载请求*/
		var obj={};
		if(id==null)	id=seed_id++;
		obj.id=id;		/*关联id*/
		obj.src=src;
		obj.state="ready";/*3种状态 ready  load   complete*/
		obj.callBack=callBack;
		rsList.push(obj);

		var t = document.createElement("script");
		t.setAttribute("type","text/javascript");
		t.defer =t.async= true;/*非阻塞加载*/
		t.onreadystatechange = t.onload =  function(){
			if(!t.readyState || t.readyState == 'loaded' || t.readyState == 'complete'){/*装载完成*/
				t.onreadystatechange = t.onload = t.onerror = null;
			}
		};
		t.src = src;
		document.body.appendChild(t);
	}
	
	x.$$=function(method,param,post,callback,base_url){
		post=true;
		if(base_url==null){ 
			var url=document.URL;
			if(url.indexOf("http")==0)	base_url="http://localhost/eam/handler/";
			else if(!x.isIE){/*使用amd加载模式加载*/
				base_url="http://localhost/eam/handler/";
				var url=base_url+method;
				var paramStr=x.jsonStr(param,false);//参数转换
				var id=seed_id++;
				var now=new Date();
				var url2=url+"?p="+paramStr+"&t=5&c="+id+"&r="+now.getTime();
				//out("require url",url2);
				x.require(id,url2,callback);
				return;
			}
			else	base_url="http://localhost/eam/handler/";
		}
		var resultStr;
		var resultObj={};
		var url=base_url+method;
		var paramStr=x.jsonStr(param,false);//参数转换
		var now=new Date();
		var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
		
		var xh=window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if(callback!=null){
			if(post){//如果是post请求
				content = "p="+paramStr+"&now="+nowStr+"&t=2";
				
				xh.open("POST", url, true);
				//xh.setRequestHeader("Content-Length",content.length);
				xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
				//xh.open("post",url,true);
				xh.send(content);
				xh.onreadystatechange=function(){$callBack(xh,callback);};
				
			}
			else{
				var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
				xh.open("get",url2,true);
				xh.send(null);
				xh.onreadystatechange=function(){$callBack(xh,callback)};
			}
		}
		else{
			try{
				if(post){//如果是post请求
					content = "p="+paramStr+"&now="+nowStr+"&t=2";
					
					xh.open("POST", url, false);
					xh.setRequestHeader("Content-Length",content.length);
					xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
					//xh.open("post",url,true);
					xh.send(content);
					resultStr=xh.responseText;
				}
				else{
					var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
					xh.open("get",url2,false);
					xh.send(null);
					resultStr=xh.responseText;
				}
			
				resultObj=$myEval(resultStr);
			}catch(e){
				//alert("json解析失败！");
				resultObj.flag=false;
				resultObj.msg="请检查数据内容！"+resultStr;
			}
			return resultObj;
		}
	}
	
		x.loadXML = function(xmlFile){	
		var xmlDoc;
		if(window.ActiveXObject)
		{
			xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = false;
			xmlDoc.load(xmlFile);
		}
		else if (document.implementation&&document.implementation.createDocument)
		{
			xmlDoc = document.implementation.createDocument('', '', null);
			xmlDoc.load(xmlFile);
		}
		else
		{
			return null;
		}
		return xmlDoc;
	}
	
	x.xml2Json=function(src){
		var doc=x.loadXML(src);
		var childs = doc.documentElement.childNodes;
		var data=[];
		for(var i=0;i<childs.length;i++){
			data[i]={};
			transNode(data[i],childs[i],null);
		}
		return data;
	}
	
	var transNode=function(obj,node,pobj){
		obj.type=node.nodeName;
		for(var i=0;i<node.attributes.length;i++){
			var attr=node.attributes[i].name;
			obj[attr]=node.getAttribute(attr);
		}
		if(pobj==null)	obj.path=obj.name;
		else			obj.path=pobj.path+"/"+obj.name;
		if(obj.type=="file")	obj.path=obj.path+".html";
		
		var childs=node.childNodes;
		if(childs!=null&&childs.length>0){
			var data=[];
			obj.child=data;
			for(var i=0;i<childs.length;i++){
				data[i]={};
				transNode(data[i],childs[i],obj);
			}
		}
	}
})(window);
/*xlib.21animation		动画类*/
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
(function(x){
	var createUploadIframe = function() {
		var frameId = 'jUploadFrame';
		if(document.getElementById(frameId)!=null)	return document.getElementById(frameId);
//		var iframe =$e("iframe");
//		iframe.id = frameId;
//		iframe.name = frameId;
//		iframe.src = 'javascript:false';
		if (window.ActiveXObject) {
			try {
				var iframe = document.createElement('<iframe id="' + frameId+ '" name="' + frameId + '" ></iframe>')
			} catch (e) {// 兼容IE9的问题
				var iframe = document.createElement('iframe');
				iframe.id = frameId;
				iframe.name = frameId;
			}
			iframe.src = 'javascript:false';
		} else {
			var iframe = document.createElement('iframe');
			iframe.id = frameId;
			iframe.name = frameId;
		}
		iframe.style.position = 'absolute';
		iframe.style.top = '-1000px';
		iframe.style.left = '-1000px';
		document.body.appendChild(iframe);
		return iframe;
	}
	var createUploadForm = function(id,fileElementId) {
		var formId = 'jUploadForm'+id;
		var fileId = 'jUploadFile'+id;
		var form= document.getElementById(formId);
		if(form==null)	form=document.createElement("form");
		if(document.getElementById(fileId)!=null)	form.removeChild(document.getElementById(fileId));
		form.id=formId;
		//form.name=formId;
		form.action="";
		form.method="POST";
		form.enctype="multipart/form-data";
		var oldElement = document.getElementById(fileElementId);
		var newElement = oldElement.cloneNode(true);
		newElement.onchange=ajaxUpload;
		newElement.cfg=oldElement.cfg;
		oldElement.id = fileId;
		oldElement.namespaceURI=fileId;
		oldElement.parentNode.insertBefore(newElement, oldElement);
		form.appendChild(oldElement);
		form.style.position = "absolute";
		form.style.top = "-1200px";
		form.style.left = "-1200px";
		document.body.appendChild(form);
		return form;
	}
	x.ajaxUpload=function(evt){
		//out("上传启动",null,null,true);
		var fileDom=this;
		var cfg=fileDom.cfg;/*参数*/
		cfg.fileElementId=fileDom.id;
		ajaxFileUpload(cfg);/*代表上传操作   上传的配置信息从哪获取*/
	}
	var ajaxFileUpload = function(cfg) {
		var id = new Date().getTime();
		var form = createUploadForm(id,cfg.fileElementId);
		var iframe = createUploadIframe();
		try {
			form.setAttribute("action",cfg.url);
			form.setAttribute('target', "jUploadFrame");
			if (form.encoding) {
				form.encoding = 'multipart/form-data';
			} else {
				form.enctype = 'multipart/form-data';
			}
			form.submit();
		} catch (e) {}
	}
})(window)