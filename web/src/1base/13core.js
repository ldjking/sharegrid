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
function showError(sMessage,sUrl,sLine){
	var a=sMessage;
	var b=1;
	//alert("出错:"+sMessage);
	//return true;
}
//window.onerror=showError;
})(window);

