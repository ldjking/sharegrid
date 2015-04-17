<link href="js/poshytip-1.2/src/tip-yellow/tip-yellow.css?155" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/poshytip-1.2/src/jquery.poshytip.js"/>
<div class='container'>
		<div class="titleLine">
			<p>仅限<span>3次</span>购买记录以内的用户购买。<a href='callcenterAnswer.do?id=76&cid=7' target='_blank'>了解详情<a/></p>
		</div>
		<div class="productList">
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<tbody>
				<tr style="height:42px;">
					<th style="width:190px;">项目名称</th>
					<th style="width:160px;">年化收益率</th>
					<th style="width:150px;">期限</th>
					<th style="width:130px;">项目金额</th>
					<th style="width:130px;">
						还款方式
						<i class="repaymentIconNew" 
						title="
							<table class='repaymentNewTip' >
								<tr>
									<td><div class='left'>等额本息：</div><div class='right'>在还款期内，每月偿还同等的金额(包含本金和利息)。<a href='callcenterAnswer.do?id=61&cid=7' target='_blank'>了解详情</a></div>
									</td>
								</tr>
								<tr>
									<td><div class='left'>一次性还款：</div><div class='right'>项目到期时，一次性偿还全部的本金及利息。</div>
									</td>
								</tr>
							</table>">
							
					</th>
					<th style="width:90px;">进度</th>
					<th style="width:125px;">&nbsp;</th>
				</tr>
			    <tr style="height:63px;">
					<td style="text-align:left;cursor:pointer;">
						<div class="name">
							<!-- <a title='安居宝D20141106-450' href="financeDetail.do?id=">安居宝D20141106-450</a>
							 -->
							<!-- <a>安商信D20140730-126</a> -->
								<a href='financeDetail.do?id=2404' target="_blank">安居宝D20141106-450</a>
									<img title="本项目为新手专享项目" src='images/isCustom.png' class='isNew'/>
						</div>
					</td>
					<td>
						<div class="rate">
							<font>11.30<span>%</span></font>
							 </div>
					</td>
					<td>
						<div class="time">
							<font> 15天</font>
							</div>
					</td>
					<td>500,000</td>
					<td>
						一次性还款</td>
					<td><div class='chartsNew' w="25.28"></div></td>
					<td class="btn">
						<a href="financeDetail.do?id=2404" target="_blank" class="fllbtn fllbtn2">购买</a>
									</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
	<img src="images/newCustomerLogo.png" class="logo"></img>
	<script>
		function count_remain_time_new() {
				$(".checkNew").each(function() {
				var left_time_int = $(this).attr("left_time_int");
				var borrowType=$(this).attr("borrowType");
				var bid = $(this).attr("bid");
				if (left_time_int >= 0) {
					var m=borrowType?"后<br/>开始加入":"后<br/>开始抢购";
					var time_string = counterClock(left_time_int)+m;
					if (left_time_int == 0) {
						var html=borrowType?"<a href='pdtDetail.do?id="+bid+"' target='_blank' class='fllbtn fllbtn2'>加入</a>":"<a href='financeDetail.do?id="+bid+"' target='_blank' class='fllbtn fllbtn2'>购买</a>";
						$(this).html(html);
					} else {
						$(this).html(time_string);
						$(this).attr("left_time_int", left_time_int - 1);
					}
				}  
			  });
		}
		 $(function(){
		 	$('.repaymentIconNew').poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX:-50,offsetY: 15});
		 	$(".isNew").poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX:-10,offsetY: 15});
		 	$(".reward").poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX:-10,offsetY: 15});
		 	$(".trans").poshytip({alignTo: 'target',alignX: 'inner-left',alignY: 'bottom',offsetX:-10,offsetY: 15});
			count_remain_time_new();
			window.setInterval(function() {
					count_remain_time_new();
				},1000);
			$(".chartsNew").each(function(i,item){
				var a=$(item).attr("w");
				a=Math.floor(a*1);
				var offset=-a*54;
				$(item).css('background-position',offset+"px 0px").html(a+"<font style='font-size:8px'>%</font>");
			});
		});
	</script>
	