/*45check	表单校验部分 */
(function(x){	/*menu效果*/
	x.comptime=function(beginTime,endTime) {
			//var beginTime = "2009-09-21 00:00:00";
			//var endTime = "2009-09-21 00:00:01";
			var beginTimes = beginTime.substring(0, 10).split('-');
			var endTimes = (endTime+":00").substring(0, 10).split('-');
			var len=beginTime.substring(10, 19).length;
			beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + (beginTime.split(" ")[1]!=null&&beginTime.split(" ")[1]!=""?beginTime.split(" ")[1]:"00:00:00");
			var len=endTime.substring(10, 19).length;
			endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + (endTime.split(" ")[1]!=null&&endTime.split(" ")[1]!=""?endTime.split(" ")[1]:"00:00:00");
			var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
			return a;
	}
	x.rangeCheck=function(form){
		var result=[]
		
		var cfg=form.formCfg
		var tables=cfg.tables;
		var ranges=[];
		
		var dorangecheck=function(rangecheck,cell){
			var is=true
			var value=cell.value;
			for(var i=0;i<rangecheck.eles.length;i++){
				if(rangecheck.type=="num"){
						value=parseInt(value)
						if(rangecheck.eles[i].gt!=null){
							elevalue=parseInt($("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].gt).value);
							if(value!=null&&elevalue!=null&&isNum(value)&&isNum(elevalue)){
								if(elevalue>=value){
									is=false;
									break;
								}
							}
						}
						else if(rangecheck.eles[i].lt!=null){
							elevalue=parseInt($("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].lt).value);
							if(value!=null&&elevalue!=null&&isNum(value)&&isNum(elevalue)){
								if(elevalue<=value){
									is=false;
									break;
								}
							}
						}
				}
				else if(rangecheck.type=="datetime"){
						var elevalue;
						if(rangecheck.eles[i].gt!=null){
							elevalue=$("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].gt).value;
							if(value!=null&&elevalue!=null&&value!=""&&elevalue!="")
							if(x.comptime(elevalue,value)<=0){
									is=false;
									break;
							}
						}
						else if(rangecheck.eles[i].lt!=null){
							elevalue=$("#"+form.formCfg.id+"_attr"+rangecheck.eles[i].lt).value;
							if(value!=null&&elevalue!=null&&value!=""&&elevalue!="")
							if(x.comptime(elevalue,value)>=0){
									is=false;
									break;
							}
						}
				}
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.rangeCheck!=null){
					ranges.push(cell);
				}
			}
		}
		for(var i=0;i<ranges.length;i++){
			var cell=ranges[i];
			var rangecheck=cell.rangeCheck;
			var c=$("#"+cfg.id+"_attr"+cell.attr)
			var is=dorangecheck(rangecheck,c);
			var r={};
			r.cell=c;
			if(!is){
				r.flag=false;
				r.error=cell.error;
			}
			else{
				r.flag=true;
				r.error=null;
			}
			result.push(r)
		}
		return result;
	}
	x.dependeRangeCheck=function(form){
		var cfg=form.formCfg
		var tables=cfg.tables;
		var dependes=[];
		var disableCell=function(cell){
			var c=$("#"+cfg.id+"_attr"+cell.attr);
			x.disableFormAttr(form,[cell.attr]);
		}
		var enableCell=function(cell){
			x.enableFormAttr(form,[cell.attr]);
		}
		var dodependecheck=function(dependerangecheck){
			var is=true
			for(var i=0;i<dependerangecheck.length;i++){
				var dom=$("#"+cfg.id+"_attr"+dependerangecheck[i].dom);
				var fn=dependerangecheck[i].dependeCheck;
				if(!fn.call(null,dom,cell)){
					is=false;
				}
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.dependeRangeCheck!=null){
					dependes.push(cell);
				}
			}
		}
		for(var i=0;i<dependes.length;i++){
			var cell=dependes[i];
			var dependerangecheck=cell.dependeRangeCheck;
			var is=dodependecheck(dependerangecheck,cell);
			if(!is) 	disableCell(cell);
			else        enableCell(cell);
		}
	}
	x.dependeCheck=function(from){
		var cfg=from.formCfg
		var tables=cfg.tables;
		var dependes=[];
		var disableCell=function(cell){
			var c=$("#"+cfg.id+"_attr"+cell.attr)
			c.value="";
			x.disableFormAttr(from,[cell.attr]);
		}
		var enableCell=function(cell){
			x.enableFormAttr(from,[cell.attr]);
		}
		var dodependecheck=function(dependecheck){
			var is=true
			for(var i=0;i<dependecheck.length;i++){
				var dependtext=$("#"+cfg.id+"_attr"+dependecheck[i]);
				if(dependtext.value=="")is=false;
			}
			return is;
		}
		for(var i=0;i<tables.length;i++){
			var cells=tables[i].cells;
			if(cells!=null)
			for(var j=0;j<cells.length;j++){
				var cell=cells[j];
				if(cell.dependeCheck!=null){
					dependes.push(cell);
				}
			}
		}
		for(var i=0;i<dependes.length;i++){
			var cell=dependes[i];
			var dependecheck=cell.dependeCheck;
			var isnull=dodependecheck(dependecheck);
			if(!isnull) disableCell(cell);
			else        enableCell(cell);
		}
	}

	
	x.checkFormCell=function(cell,form,isT){/*测试表单的输入项*/
		/*返回数据结构  result.flag   error:*/
		/*校验类别 email  包括提交给服务器校验  包括依赖项*/
		var result={}
		result.cell=cell;
		result.flag=true;
		//out("cell check",cell);
		var cellDef=cell.cellDef;
		var dt=cellDef.dt;
		var cellreg=cellDef.reg;
		var gt=cellDef.gt;
		var lt=cellDef.lt;
		var gt2=cellDef.gt2;
		var lt2=cellDef.lt2;
		//var dependecheck=cellDef.dependeCheck;
		var checkmethod=cellDef.checkMethod;
		var tricheck=cellDef.triCheck;
		//var rangecheck=cellDef.rangeCheck;
		//var reflrangecheck=cellDef.reflrangeCheck;
		//var childrangecheck=cellDef.childrangeCheck;
		var minlen=cellDef.minlen;
		var oncheckchange=cellDef.oncheckchange
		var checkdes=cellDef.des;
		var data=x.genFormData(form);
		var istri=cellDef.istri;
		if(istri&&isT==null)return result;
		/*进行数据的校验 校验类型包括  email  mobile  phone  fax   pw复杂度  */
		var value=cell.value2!=null?cell.value2:cell.value;
		var reg;
		
		var getError=function(def){
			if(isFun(def.error)){
				var errorresult=def.error.call(null,cell,form);
				return errorresult;
			}else{
				return def.error;
			}
		}
		var regTest=function(result,reg,value,msg){
			if(value==""||!reg.test(value)){
				result.flag=false;
				if(msg!=null)      result.error=msg;
				else result.error=getError(cellDef);
			}
		}
		
		if(dt=="num"){
			/*如果它的正则表单式校验不通过*/
			//out("num");
			reg=/^[-+]?\d*$/; 
			var msg="请输入数值";
			regTest(result,reg,value,msg);
			if(result.flag){
				if(gt!=null){
					var gv=parseInt(value)
					if(gv<=parseInt(gt)){
						result.flag=false;
						result.error="值要大于"+gt;
					}
				}
				if(lt!=null){
					var lv=parseInt(value)
					if(lv>=parseInt(lt)){
						result.flag=false;
						result.error="值要小于"+lt;
					}
				}
				if(gt2!=null){
					var gv=parseInt(value)
					if(gv<parseInt(gt2)){
						result.flag=false;
						result.error="值要大于等于"+gt;
					}
				}
				if(lt2!=null){
					var lv=parseInt(value)
					if(lv>parseInt(lt2)){
						result.flag=false;
						result.error="值要小于等于"+gt;
					}
				}
			}
		}
		else if(dt=="datetime"||dt=="date"){
				if(gt!=null){
					var r= x.comptime(gt,value);
					if(r<=0){
						result.flag=false;
						result.error="日期要大于"+gt;
					}
				}
				if(lt!=null){
					var r= x.comptime(lt,value);
					if(r>=0){
						result.flag=false;
						result.error="日期要小于"+lt;
					}
				}
				if(gt2!=null){
					var r= x.comptime(gt2,value);
					if(r<0){
						result.flag=false;
						result.error="日期要大于等于"+gt2;
					}
				}
				if(lt2!=null){
					var r= x.comptime(lt2,value);
					if(r>0){
						result.flag=false;
						result.error="日期要小于等于"+gt2;
					}
				}
		}
		else if(dt=="email"){
			reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
			var msg="不是正确的邮箱格式,eg: xxxx@yyy.com";
			regTest(result,reg,value,msg);
		}
		else if(dt=="mobile"){
			reg=/^((\(\d{2,3}\))|(\d{3}\-))?1[5,8,3]\d{9}$/;
			var msg="不是正确的手机格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="phone"){
			reg=/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/  
			var msg="不是正确的电话格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="url"){
			reg=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/   
			var msg="不是正确的url格式";
			regTest(result,reg,value,msg);
		}
		else if(dt=="idcard"){/*身份证信息*/
			reg=/^\d{15}(\d{2}[A-Za-z0-9])?$/ 
			var msg="不是正确的身份证格式";
			regTest(result,reg,value,msg);
		}
		else if(cellreg!=null){/*其他情况可以设置正则表达式校验   dt=reg   reg=\[a-b]{0}[]\g*/
			reg=cellreg;
			regTest(result,reg,value); 
		}
		if(oncheckchange!=null){
			if(result.flag){
				result=oncheckchange(cell,form,result)
			}
		}
		if(minlen!=null){
			if(result.flag){
				if(value.length<minlen){
						result.flag=false;
						result.error="字符的长度要大于"+minlen;
				}
			}
		}
		if(checkmethod!=null){
			if(result.flag){
				var param={value:value};
				if(checkdes!=null){
					for(var i=0;i<checkdes.length;i++){
						param[checkdes[i]]=data[checkdes[i]];
					}
					var methodr=$$(checkmethod,param);
					if(!methodr.flag){
						result.flag=false;
						result.error=methodr.errorText;
					}
				}
			}
		}
		if(tricheck!=null){
			if(result.flag){
				for(var i=0;i<tricheck.length;i++){
					var tri=tricheck[i];
					var tricell=$("#"+form.formCfg.id+"_attr"+tri);
					if(tricell!=null&&tricell.value!=""){
						var triresult=checkFormCell(tricell,form,true);
						if(!triresult.flag){
							result=triresult;
							break;
						}
					}
				}
			}
		}
		x.dependeCheck(form);
		x.dependeRangeCheck(form);
		var r=x.rangeCheck(form);
		result.rangeResult=r;
		return result;
	}
	
	/*第一步  基本正则 完成*/
	/*第二步  自定义正则 完成*/
	/*第三步  依赖关系  【gt lt】 完成*/
	/*第四步  服务器校验  简单  完成*/
	/*第五步  服务器校验  带依赖  完成*/
	/*第六步  校验触发   完成*/
	/*第七步  自定义函数  result.flag */

})(window);
