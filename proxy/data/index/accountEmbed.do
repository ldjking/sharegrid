<link href="js/poshytip-1.2/src/tip-yellow/tip-yellow.css?155" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/poshytip-1.2/src/jquery.poshytip.js"/>
<script type="text/javascript" src="js/popom.js"></script>
<script type="text/javascript" src="plugins/highcharts/highcharts.js"></script>
<div class="accHead">
	<span class="greeting">
		<span id="greetTime">晚上好</span>，
			刘东杰</span>
	<ul class="topIcon">
		<li class="icon_realname" title="您已进行实名认证"></li>
			<li onclick="javascript:window.open('bankIndex.do');" class="icon_bindcard_1" id="tip2" title="您可以去充值投资啦，请在提现前绑定银行卡    &lt;br/&gt;&lt;a href='bankIndex.do' target='_blank' style='color:#0088CC;'&gt;马上绑卡&lt;/a&gt;"></li>
			</ul>
	<div class="lastLoginTime"><span class="lastIcon"></span><span>上次登录时间：</span><span id="lastTime">2014-11-03 18:17:13</span></div>
	<div class="clear"></div>
</div>
<div class="accTop">
	<div class="accTopCont">
		<div class="accAmount">
			<table class="amountTab" cellspacing="0" >
				<tr class="lineTop">
					<td style="width:84px;">可用余额：</td>
					<td style="width:150px;"><span><span class="availableAmount">0.00</span>&nbsp;元</span></td>
					<td style="width:58px;"></td>
				</tr>
				<tr style="height:12px;"></tr>
				<tr class="lineCenter">
					<td>冻结资金：</td>
					<td><span class="amountDetail">0.00</span>&nbsp;元</td>
					<td></td>
				</tr>
				<tr class="lineCenter">
					<td>待收本金：</td>
					<td><span class="amountDetail">100.00</span>&nbsp;元</td>
					<td class="toCollect"><a href="homeBorrowTenderInInit.do?jump=2" style="color:#0088cc">(&nbsp;<span class="toCollectNum">1</span>笔&nbsp;)</a></td>
				</tr>
				<tr class="lineCenter">
					<td>待收收益：</td>
					<td><span class="profitDueIn">2.10</span>&nbsp;元</td>
					<td></td>
				</tr>
				<tr style="height:30px;"></tr>
				<tr class="lineBottom">
					<td class="totalAmountTitle">账户总资产：</td>
					<td><span class="totalAmount">102.10</span>&nbsp;元</td>
					<td></td>
				</tr>
			</table>
		</div>
		<ul class="accBtn">
			<li ><a class="rechargeBtn" href="tenpayRechargeInit.do">充值</a></li>
			<li ><a class="withdrawBtn" href="withdrawCftInit.do">提现</a></li>
		</ul>
		<div class="profit">
			<div class="profitIcon"></div>
			<div class="profitTotal">2.10&nbsp;元</div>
			<div class="profitDetail">
				<div class="profitEarned">0.00&nbsp;元<span></span></div>
				<div class="profitDueIn">2.10&nbsp;元<span></span></div>
			</div>
		</div>
		<div class="clear"></div>
	</div>
</div>
<div class="accCenter">
	<div class="centerTitle">
		<span>最近6个月的投资额</span>
	</div>
	<div class="centerCont">
		<div class="lineChart">
			 <div id="container" style="min-width:600px;height:210px;padding-top:20px;"></div>
		</div>
		<div class="collectDate">
			<span class="collectDateTitle">下个收款日</span>
			<div class="dateIcon">
				<span id="collectMon">
					2014-12</span>
				<span id="collectDay">
				16</span>
			</div>
			<div class="collectDetail">
				<span>收款项目</span>
				<span id="collectNum">
				
				1 
				笔</span>
				<span>待收本息</span>
				<span id="collectAmount">
				102.10 
					元
				</span>
				
			</div>
		</div>
	</div>
</div>
<div class="accBottom">
	<div class="bottomTitle">
		<span>推荐项目</span>
	</div>
	<div class="recommendList">
	</div>
	
</div>
<script type="text/javascript">
	function tip(){
	  if(2!=2){
		$('#tip1').poshytip('show');
	  }else if(0<1){
		$('#tip2').poshytip('show');
	  }
	}
	
	function checkTime(dateTime ,beginTime ,endTime){
        var bd = Date.parse("2011/1/1 "+beginTime);
        var ed = Date.parse("2011/1/1 "+endTime);
        var nd = Date.parse("2011/1/1 "+dateTime);
        return nd>=bd&&nd<=ed;   
     }
     function greetTime(){
     	 var curDate =  new Date();
		 var h = curDate.getHours();
		 var m = curDate.getMinutes();
		 var s = curDate.getSeconds();
		 var curTime = h+":"+m+":"+s;
		 if(checkTime(curTime, "05:00:01","08:00:00")){
		 	$("#greetTime").html("早上好");
		 }else if(checkTime(curTime, "08:00:01","11:30:00")){
			$("#greetTime").html("上午好");
		 }else if(checkTime(curTime, "11:30:01","13:30:00")){
		 	$("#greetTime").html("中午好");
		 }else if(checkTime(curTime, "13:30:01","18:00:00")){
		 	$("#greetTime").html("下午好");
		 }else if(checkTime(curTime, "18:00:01","23:59:59")){
		 	$("#greetTime").html("晚上好");
		 }else if(checkTime(curTime, "00:00:00","05:00:00")){
		 	$("#greetTime").html("晚上好");
		 }else{
			 $("#greetTime").html("您好");
		 }
     }
	
	$(function () {
		$("#accTitle").removeClass().addClass("accTitleCur");
		greetTime();
		$('.icon_realname').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX: -8,offsetY: 6});
		$('.icon_bindcard').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX: -8,offsetY: 5});
		$('.icon_realname_1').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX: -8,offsetY: 5});
		$('.icon_bindcard_1').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX: -8,offsetY: 5});
		
		recommendPro();
		var obj= [{"investTime":"2014-11","investAmount":0},{"investTime":"2014-10","investAmount":100},{"investTime":"2014-09","investAmount":0},{"investTime":"2014-08","investAmount":0},{"investTime":"2014-07","investAmount":0},{"investTime":"2014-06","investAmount":0}];
		//投资时间数组
		var investTimeArray = new Array();
		//投资额数组
		var investAmountArray = new Array();
		
		 for ( var i = 0; i < obj.length; i++) {
			investTimeArray[i] = obj[obj.length-1-i].investTime;
			investAmountArray[i] = obj[obj.length-1-i].investAmount;
		}
		
		$('#container').highcharts({
	        title: {
	            text: ''
	        },
	         xAxis: {
	            categories: investTimeArray
	        },
	        yAxis: {
	        	min:0,
	            title: {
	                text: ''
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#111'
	            }],
	            labels: {
                   formatter: function() {
	                   	if(this.value<1000){
	                   		return this.value;
	                   	}else if(this.value>=1000){
	                   		return this.value / 10000 +'万';
	                   	}
                   }
                }
	        },
	        exporting: {
	            enabled: false
	        },
	        credits: {
	            enabled: false
	        },
	        colors: ['#ff9933'],
	        tooltip: {
	            valueSuffix: '元'
	        },
	        legend: {
	             enabled: false
	        },
	        series: [{
	            name: '投资额',
	            data: investAmountArray
	        }]
	    });
	    window.onload=tip;
	});
	function recommendPro(){
		$.shovePost("queryRecommendList.do", null, function (data) {
			$(".recommendList").html(data);
		});
	}
</script>