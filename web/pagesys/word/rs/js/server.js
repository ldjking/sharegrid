/*独立的兼容的ajax*/
var rsPath="img/";	
var base_url="../../json/";
var base_url="http://localhost/eam/handler/";
$e=function(name,num)//创建DOM对象
{
	if(num!=null&&typeof(num)=="number"&&num>0)
	{
		var array=[];
		for(var i=0;i<num;i++)
		{
			array.push(document.createElement(name));
		}
		return array;
	}
	return document.createElement(name);
}
$$=function(method,param,post,callback)
{
	var resultStr;
	var resultObj={};
	var url=base_url+method;
	var paramStr=$myStr(param);//参数转换
	var now=new Date();
	var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
	var xh=window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	
	if(callback!=null)
	{
		if(post)
		{//如果是post请求
			content = "p="+paramStr+"&t=2";
			xh.open("POST", url, true);
			xh.setRequestHeader("Content-Length",content.length);
			xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
			//xh.open("post",url,true);
	  		xh.send(content);
			xh.onreadystatechange=function(){$callBack(xh,callback);};
			
		}
		else
		{
			var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
			xh.open("get",url2,true);
			xh.send(null);
			xh.onreadystatechange=function(){$callBack(xh,callback);};
		}
	}
	else
	{
		if(post)
		{//如果是post请求
			content = "p="+paramStr+"&t=2";
			xh.open("POST", url, false);
			xh.setRequestHeader("Content-Length",content.length);
			xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	  		xh.send(content);
			resultStr=xh.responseText;
			
			
		}
		else
		{
			var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
			//alert(url2);
			xh.open("get",url2,false);
			xh.send(null);
			resultStr=xh.responseText;
			//alert(resultStr);
			
		}
		try{
			resultObj=$myEval(resultStr);
		}catch(e)
		{
			//alert("json解析失败！");
			resultObj.flag=false;
			resultObj.msg="请检查数据内容！"+resultStr;
		}
		return resultObj;
	}
}
$callBack=function(xh,callBack)
{
	if(xh.readyState==4&&xh.status==200)
	{
		var resultStr=xh.responseText;
		var resultObj=$myEval(resultStr);
		callBack(resultObj);
	}
}
$myEval=function(str)
{
	if(str==null)
	{
		return null;
	}
	if(str=="{}")
	{
		return null;
	}
	if(typeof(str)!='string')
	{
		return;
	}
	str=str.replace(/\"/g,"\"");
	str=str.replace(/\n/g,"<br/>");
	str=str.replace(/\s/g," ");
	var obj=null;
	try
	{
		obj=eval("("+str+")");
	}
	catch(e)
	{
		//str=str.replace(/\s/g,"+");
		//alert(str);
		//$("debug").innerHTML=i+" : "+str;
	}
	return obj;
}
$myStr=function(obj)
{//将参数转换成Json格式字符串
	if(obj==null)
	{//如果参数为空
		return "";
	}
	//alert(typeof(obj));

	if(typeof(obj)=="string")//typeof null=object
	{//如果参数是字符串格式
		return obj;
	}
	
	var names=[];
	var values=[];
	
	if(obj instanceof Array)
	{//如果参数是数组
		var flag=true;
		for(var i=0;i<obj.length;i++)
		{//为了兼容 jquery ligerUI的键值对方式
			var o=obj[i];
			if(o.name!=null&&o.value!=null)
			{
				flag=false;
				names.push(o.name);
				values.push(o.value);
			}
			if(flag==false)
			{
				return $jsonStr(names,values);
			}
		}
		if(flag)
		{
			var str="["
			for(var i=0;i<obj.length;i++)
			{
				var o=obj[i];
				var type=typeof(obj[i]);
				//alert(type);
				if(type=="string"||type=="number"||type=="boolean")
				{
					str+=$trans(obj[i]);
				}
				else
				{
					str+=$myStr(obj[i]);
				}
				if(i<obj.length-1)
				{
					str+=",";
				}
			}
			str+="]";
			return str;
		}
	}
	else
	{//如果参数是对象
		var jsonStr="{";
		for(var p in obj)
		{
			var type=typeof(obj[p]);
			var name=p;
			var value=obj[p];
			if(type=="string"||type=="number"||type=="boolean")
			{
				jsonStr+=name;
				jsonStr+=":";
				jsonStr+=$trans(value);
				jsonStr+=",";
			}
			else if(type=="object")
			{
				jsonStr+=name;
				jsonStr+=":";
				jsonStr+=$myStr(value);
				jsonStr+=",";
			}
		}
		if(jsonStr.length>1)
		{//避免空对象 ｛｝ 的出现
			jsonStr=jsonStr.substring(0,jsonStr.length-1);
		}
		jsonStr+="}";
		return  jsonStr;
	}

}
$jsonStr=function(names,values)
{//将键值对包装成Json字符串格式
	var jsonStr="";
	if(names instanceof Array && values instanceof Array)
	{//如果是两个数组  按理说一定是两个数据
		if(names.length==0)
		{
			jsonStr="";
		}
		else
		{
			jsonStr="{";
			if(names.length==values.length)
			{
				for(var i=0;i<names.length;i++)
				{
					if(names[i]!=null&&values[i]!=null&&names[i]!=""&&values[i]!="")
					{
						jsonStr+=names[i];
						jsonStr+=":";
						jsonStr+=$trans(values[i]);
						jsonStr+=",";
					}
				}
				jsonStr=jsonStr.substring(0,jsonStr.length-1);
			}
			jsonStr+="}";
		}
	}
	else if(names!=null&&values!=null&&names!=""&&values!="")
	{//如果是字符串格式
		jsonStr="{";
		jsonStr+=names;
		jsonStr+=":";
		jsonStr+=$trans(values);
		jsonStr+="}";
	}
	//alert("jsonStr:"+jsonStr);
	return jsonStr;
}
$trans=function(str)
{//对字符串进行转义 转义内容包括[]{}:,共6个分别转义成<1><2><3><4><5><6>
//其中增加额外的内容需要处理  1是%这是数据库里面的关键字  2是@也是引擎所需要用到的关键字【替换sql语句中参数，参数均为@开头】
	if(str!=null)
	{
		str=str.toString();
		str=str.replace(/\[/g,"<1>");
		str=str.replace(/\]/g,"<2>");
		str=str.replace(/\{/g,"<3>");
		str=str.replace(/\}/g,"<4>");
		str=str.replace(/\:/g,"<5>");
		str=str.replace(/\,/g,"<6>");
		str=str.replace(/\%/g,"<7>");
		str=str.replace(/\@/g,"<8>");
		str=str.replace(/\n/g,"<br/>"); //\n用不用转成其他格式
	}
	else
	{
		str="";
	}
	return str;
}