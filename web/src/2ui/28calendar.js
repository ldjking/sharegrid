(function(x){	/*LOV  calendar 效果 */
	var doms={};
	var cfg={mode:"datetime"};/*日历的模式 1代表只显示日期  2代表只显示时间  3代表日期和时间都显示   2暂时不使用*/
	var $id=function(id){
		return $("#lov_calendar_"+id);
	}
	var setDoms=function(){/*设置dom  value */
		var ids=["year","month","day","hour","min","header","years","months","days"
				,"hours","mins","yearCurr","ok","time","curr"];
		for(var i=0;i<ids.length;i++){
			var id=ids[i];
			doms[id]=$id(id);
		}
	}
	

	var getDayNum=function(year,month){//根据年月获取该月的天数
		switch(month){
			case 1,3,5,7,8,10,12:{return 31;}
			case 4,6,9,11:return 30;
		}
		if(month==2){
			if(year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))	return 29;
			else	return 28;
		}
	}
	var hideAll=function(){
		x.showHide([doms.years,doms.months,doms.header,doms.days,doms.hours,doms.mins],false);
	}
	var showDay=function(){
		hideAll();
		x.showHide([doms.header,doms.days],true);
		
		var year=parseInt(doms.year.innerHTML);
		var month=parseInt(doms.month.innerHTML);
		var date=new Date();date.setFullYear(year);date.setMonth(month-1);date.setDate(1);
		var weekDay=date.getDay();//0-6代表星期
		if(weekDay==0)	weekDay=7;
		var daysNum=getDayNum(year,month);//一个月的天数
		var days=x.getChilds(doms.days);
		//确保星期显示正确
		for(var i=0;i<6;i++){
			if(i<weekDay-1)	days[i].style.display="block";
			else			days[i].style.display="none";
		}
		//确保时间显示正确
		for(var i=0;i<4;i++)			days[34+i].style.display="block";/*先显示*/
		for(var i=daysNum+1;i<32;i++)		days[i+6].style.display="none";/*29 30 31 这几日 该隐藏的隐藏掉*/
	}
	var render=function(){
		var container=$div("lov_calendar");
		container.innerHTML="<div id='lov_calendar_curr'><a id='lov_calendar_year'>2012</a>年<a id='lov_calendar_month'>12</a>月<a id='lov_calendar_day'>12</a>日<span id='lov_calendar_time'><a id='lov_calendar_hour'>12</a>:<a id='lov_calendar_min'>12</a></span></div><div id='lov_calendar_content'><p id='lov_calendar_years'><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a></a><a>1</a><a>2</a><a>3</a><a>19</a><a>20</a><a>4</a><a>5</a><a>6</a><a>0</a><a id='lov_calendar_ok'>ok</a><a>7</a><a>8</a><a>9</a><a id='lov_calendar_yearCurr'></a></p><p id='lov_calendar_months'></p><p id='lov_calendar_header'></p><p id='lov_calendar_days'></p><p id='lov_calendar_hours'></p><p id='lov_calendar_mins'></p></div>";
		document.body.appendChild(container);
		setDoms();
		doms.months.innerHTML="";
		doms.days.innerHTML="";
		for(var i=0;i<12;i++){
			var month=i+1;
			doms.months.innerHTML+="<a v="+month+">"+month+"月</a>";
		}
		for(var i=0;i<7;i++){
			var weekdays=["一","二","三","四","五","六","日"];
			var weekay=weekdays[i];
			doms.header.innerHTML+="<a value="+i+">"+weekay+"</a>";
		}
		for(var i=0;i<51;i++){
			var day=i-6;
			if(day<1||day>31)	day="";
			doms.days.innerHTML+="<a>"+day+"</a>";
		}
		for(var i=6;i<24+6;i++){
			var hour=i;
			if(i>23)	hour=i-24;
			doms.hours.innerHTML+="<a>"+hour+"</a>";
		}
		for(var i=0;i<60;i++){
			var m=i;
			if(i<10)	m="0"+i;
			doms.mins.innerHTML+="<a>"+i+"</a>";
		}
		/*细项的内容包括  月  天  小时  分钟  秒*/
		return container;
	}
	var init=function(conf){
		if(conf!=null)	cfg=conf;
		var lov_calendar=$("#lov_calendar");
		if(lov_calendar==null)	render();
		/*给dom变量赋值*/
		setDoms();
		if(cfg.mode=="date")	x.showHide(doms.time,false);

		var now=new Date();
		var year=now.getFullYear();
		var month=parseInt(now.getMonth());
		var day=parseInt(now.getDate());
		var hour=now.getHours();
		var min=now.getMinutes();
		month=month+1;
		
		x.getChilds(doms.days,5+day).className="active";
		doms.year.innerHTML=year;
		doms.month.innerHTML=month;
		doms.day.innerHTML=day;
		//if(day<10)	doms.day.innerHTML="0"+day;
		doms.hour.innerHTML=hour;
		if(hour<10)	doms.hour.innerHTML="0"+hour;
		doms.min.innerHTML=min;
		if(min<10)	doms.min.innerHTML="0"+min;
		x.bind(doms.year,"mouseover",e_year_enter);
		x.bind(doms.month,"mouseover",e_month_enter);
		x.bind(doms.day,"mouseover",e_day_enter);
		x.bind(doms.hour,"mouseover",e_hour_enter);
		x.bind(doms.min,"mouseover",e_min_enter);

		x.bind(doms.years,"click",e_years_click);
		x.bind(doms.months,"click",e_months_click);
		x.bind(doms.days,"click",e_days_click);
		x.bind(doms.hours,"click",e_hours_click);
		x.bind(doms.mins,"click",e_mins_click);

		/*根据当前年份 生成当前激活当前年份，当前月份*/
		for(var i=0;i<10;i++){
			x.getChilds(doms.years,i).innerHTML=year-5+i;
		}
		showDay();
	}
	x.e_min_enter=function(evt){			
		hideAll();
		x.showHide(doms.mins,true);
	}
	x.e_hour_enter=function(evt){			
		hideAll();
		x.showHide(doms.hours,true);
	}
	x.e_year_enter=function(evt){
		hideAll();
		x.showHide(doms.years,true);
	}
	x.e_day_enter=function(evt){
		hideAll();
		x.showHide([doms.header,doms.days],true);
	}
	x.e_month_enter=function(evt){
		hideAll();
		x.showHide(doms.months,true);
	}
	
	x.e_years_click=function(evt){
		var target=x.getTarget(evt);
		if(target.id=="lov_calendar_ok"){
			if(doms.yearCurr.innerHTML.length>0){
				doms.year.innerHTML=doms.yearCurr.innerHTML;
			}
			x.e_month_enter();
			return;
		}
		var year=target.innerHTML;
		if(year.length==4){/*长度为4 则直接返回*/
			doms.year.innerHTML=year;
			x.e_month_enter();
		}
		else{
			doms.yearCurr.innerHTML+=year;
			if(doms.yearCurr.innerHTML.length==4){
				doms.year.innerHTML=doms.yearCurr.innerHTML;
				setTimeout(x.e_month_enter,500);
			}
		}
	}
	x.e_months_click=function(evt){	
		var target=x.getTarget(evt);
		var month=target.getAttribute("v");
		$("#lov_calendar_month").innerHTML=month;
		showDay();/*展示天*/
	}
	
	var e_days_click=function(evt){//单击某天
		var target=x.getTarget(evt);
		if(target.innerHTML=="")	return;
		var year=parseInt(doms.year.innerHTML);
		var month=parseInt(doms.month.innerHTML);
		var selectDay=parseInt(target.innerHTML);
		doms.day.innerHTML=selectDay;

		if(month<10)	month="0"+month;
		if(selectDay<10)	selectDay="0"+selectDay;	
		var str=(year+"-"+month+"-"+selectDay);
		var str=(year+"-"+month+"-"+selectDay);
		if(cfg.mode=="date"){
			var lovDom=$("#lov_calendar");
			if(x.setFormAttr)		x.setFormAttr(lovDom.targetDom,{value:str});
			if(x.closeLov!=null)	x.closeLov(lovDom);
		}
		else{
			e_hour_enter();
		}
	}
	
	var e_hours_click=function(evt){
		var target=x.getTarget(evt);
		var hour=parseInt(target.innerHTML);
		if(hour<10)	hour="0"+hour;
		doms.hour.innerHTML=hour;
		e_min_enter();
	}
	var e_mins_click=function(evt){
		var target=x.getTarget(evt);
		var min=parseInt(target.innerHTML);
		if(min<10)		min="0"+min;	

		doms.min.innerHTML=min;
		var year=doms.year.innerHTML;
		var month=parseInt(doms.month.innerHTML);
		var day=parseInt(doms.day.innerHTML);
		var hour=parseInt(doms.hour.innerHTML);
		

		if(month<10)	month="0"+month;
		if(day<10)		day="0"+day;	
		if(hour<10)		hour="0"+hour;	
		var str1=(year+"-"+month+"-"+day);
		var str2=(hour+":"+min);
		var str;

		if(cfg.mode=="datetime"){
			str=str1+" "+str2;
			//alert(str);
		}
		var lovDom=$("#lov_calendar");
		if(x.setFormAttr)		x.setFormAttr(lovDom.targetDom,{value:str});
		if(x.closeLov!=null)	x.closeLov(lovDom);
	}

	x.genLov_calendar=function(conf){/*生成日期选择器*/
		init(conf);/*支持一个额外的配置,能指定是选择日期还是选择时间*/
		return $("#lov_calendar");
	}	
})(window);  