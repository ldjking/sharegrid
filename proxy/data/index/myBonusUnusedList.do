<div class="unusedBonus">
	<!-- 有红包数据 -->
	
	<ul class="unusedBonusList">
			<li>
					<div class="bonusProperties">
						<div class="imgText">
							<p class="bonusType">投资返现</p>
							<div class="bonusDescCont">
								<p class="bonusAmount tzfxAmount">
										<span>￥</span>10</p>
									<p class="bonusDesc tzfxDesc" >投
										100 返 10</p>
								</div>
						</div>
						<div class="bonusPropertiesText">
							<p>来源：新手注册</p>
								<p>有效期：2014.10.15-2014.11.14</p>
								<div class="intro_title">
									<p style="display:inline;margin-right:5px;">说明</p>
									<img src="images/bonus_down.jpg"></img>
								</div>
							</div>
					</div>
					<div class="bonusIntro">
						<div class="bonusIntroText">
							<p class="bold">使用说明：</p>
							<p>1.用户在有效期内完成单笔<span>>=100</span>元的投资（仅限2个月【不含】以上的定期产品）即可返现10元；</p><p>2. 返现金额将于投资后3个工作日内发放至用户小牛在线投资账户中；</p><p>3. 如有疑问详询平台在线客服或拨打全国热线<span>400 777 1268</span>。</p></div>
					</div></li>
			<li>
					<div class="bonusProperties">
						<div class="imgText">
							<p class="bonusType">投资返现</p>
							<div class="bonusDescCont">
								<p class="bonusAmount tzfxAmount">
										<span>￥</span>188</p>
									<p class="bonusDesc tzfxDesc" >投
										100,000 返 188</p>
								</div>
						</div>
						<div class="bonusPropertiesText">
							<p>来源：新手注册</p>
								<p>有效期：2014.10.15-2014.11.14</p>
								<div class="intro_title">
									<p style="display:inline;margin-right:5px;">说明</p>
									<img src="images/bonus_down.jpg"></img>
								</div>
							</div>
					</div>
					<div class="bonusIntro">
						<div class="bonusIntroText">
							<p class="bold">使用说明：</p>
							<p>1. 用户在有效期内累计投资<span>>=100,000元</span>（仅限2个月【不含】以上的定期产品）即可返现188元； <p>2. 返现金额将于投资后3个工作日内发放至用户小牛在线投资账户中；</p><p>3. 如有疑问详询平台在线客服或拨打全国热线<span>400 777 1268</span>。</p></div>
					</div></li>
			</ul>
			<div style="clear:both;"></div>
			</div>

<script>
	var timer;
	function hide() {
		$(".unusedBonusList .cur").find("img").attr("src",
				"images/bonus_down.jpg");
		$(".unusedBonusList .cur").css("border-bottom-style", "solid");
		$(".unusedBonusList .intro_title").find("p").css("color", "#333333");
		$(".unusedBonusList .cur .bonusIntro").hide();
		$(".unusedBonusList .cur").css("z-index", "1");
		$(".unusedBonusList .cur").removeClass("cur");
	}
	$(function() {
		$(".intro_title").mouseover(function() {
			var li = $(this).parent().parent().parent();
			li.css("border-bottom-style", "dashed");
			$(this).find("img").attr("src", "images/bonus_up.jpg");
			$(this).find("p").css("color", "#ab6f00");
			$(this).parent().parent().next().show();
			$(this).parent().parent().parent().css("z-index", "9999");
		}).mouseleave(function() {
			var li = $(this).parent().parent().parent();
			li.addClass("cur");
			timer = setTimeout("hide()", 300);
		});
		$(".bonusIntro").mouseover(function() {
			clearTimeout(timer);
		}).mouseleave(function() {
			var li = $(this).parent();
			li.addClass("cur");
			timer = setTimeout("hide()", 500);
		});
		$(".unusedBonusList li .xjjlAmount").each(function(){
		   var amount = $(this).find("span").text();
		   var intNum = amount.substring(0,amount.indexOf("."));
		   var decimal = amount.substring(amount.indexOf("."),amount.indexOf(".")+3);
		   $(this).find("span").html("<span style='font-size:24px;'>"+intNum+"</span>"+decimal);
		});
		 
	})
</script>