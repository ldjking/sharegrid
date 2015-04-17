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

