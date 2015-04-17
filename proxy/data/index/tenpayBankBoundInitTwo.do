<!--middle -->
<script type="text/javascript" src="http://www.xiaoniu88.com/js/front/bankManageEmbed.js?0.0.2"></script>

<div class="contentTitle">
	我的银行卡
</div>
<div class="aBank">
		<div class="topTip">
			<p><font style='font-weight:bold;'>请绑定您的常用银行卡，仅限绑定一张银行卡；</font>您的账户资金将只能提现至该绑定卡，以更好地保障您的资金安全。</p>
		</div>
		<div class='form' id="form">
			<div class='step step1'>
				<span class='one'>填写银行卡信息</span>
				<span class='two'>提交验证金额</span>
				<span class='three'>绑卡成功</span>
			</div>
			<div class="formTable">
				<table>
					<tr>
						<td class='first'>开户名：</td>
						<td class='secend'><input type="text" id="realName" value="刘东杰" disabled /></td>
						<td class='last'></td>
					</tr>
					<tr>
						<td class='first'>银行卡号：</td>
						<td class='secend'><input type="text" id="cardNo" maxlength="19" /></td>
						<td class='last'>
							<div id="cardNoTip" class="tip"></div>
						</td>
					</tr>
					<tr >
						<td class='first'>选择银行：</td>
						<td class='secend'>
							<div role='select' id="bankCode" class='role_select selectIcon'>
								<span>请选择银行</span>
								<ul>
									<li code="boc" >中国银行</li>
									<li code="icbc" >中国工商银行</li>
									<li code="ccb" >中国建设银行</li>
									<li code="abc">中国农业银行</li>
									<li code="cmb">招商银行</li>
									<li code="comm">交通银行</li>
									<li code="cmbc">中国民生银行</li>
									<li code="cib">兴业银行</li>
									<li code="citic">中信银行</li>
									<li code="ceb">中国光大银行</li>
									<li code="pab">平安银行</li>
									<li code="postgc">中国邮政储蓄银行</li>
									<li code="spdb">浦发银行</li>
									<li code="gdb">广发银行</li>
									<li code="bob">北京银行</li>
									<li code="bea">东亚银行</li>
									<li code="njcb">南京银行</li>
								</ul>
							</div>
						</td>
						<td class='last'>
							<div class="tip" id="bankCodeTip"></div>
						</td>
					</tr>
					<tr class="branchLine">
						<td class='first'>开户城市：</td>
						<td class='secend'>
							<div class="ad_city selectIcon" id="ad_city"></div>
						</td>
						<td class='last'>
							<div class="tip" id="ad_cityTip"></div>
						</td>
					</tr>
					<tr class="branchLine">
						<td class='first'>开户行：</td>
						<td class='secend'>
							<input type="text" id="subbranch" class="selectIcon"/>
						</td>
						<td class='last'>
							<div class="tip" id="subbranchTip"></div>
						</td>
					</tr>
					<tr>
							<td class='first'>提现密码：</td>
							<td class='secend'>
								<input type="password" id="txpass" />
							</td>
							<td class='last'>
								<div id="txpassTip" class="tip"></div>
							</td>
						</tr>
						<tr>
							<td class='first'>确认提现密码：</td>
							<td class='secend'>
								<input type="password" id="txpassqr" />
							</td>
							<td class='last'>
								<div id="txpassqrTip" class="tip"></div>
							</td>
						</tr>
					<tr>
						<td class='first'></td>
						<td ><a type='button' style="margin:0 auto" id='submitToCheck' class='submitButton'>提&nbsp;&nbsp;&nbsp;&nbsp;交</a></td>
						<td class='last'></td>
					</tr>
				</table>
			</div>
			<div class="choiceTheCity">
				<div class="choiceTheCityContent">
					<ul class='choiceTheCityTag'>
						<li id='choiceProvince' class='cur'>请选择省份<i></i></li>
						<li id='choiceCity'>请选择城市<i></i></li>
					</ul>
					<div class="province">
						<table>
							<tr>
								<td class='first'>华北</td>
								<td>
									<span value='1'>北京</span>
									<span value='3'>天津</span>
									<span value='5'>河北</span>
									<span value='6'>山西</span>
									<span value='7'>内蒙古</span>
								</td>
							</tr>
							<tr>
								<td class='first'>东北</td>
								<td>
									<span value='8'>辽宁</span>
									<span value='9'>吉林</span>
									<span value='10'>黑龙江</span>
								</td>
							</tr>
							<tr>
								<td class='first'>华东</td>
								<td>
									<span value='2'>上海</span>
									<span value='15'>江西</span>
									<span value='13'>安徽</span>
									<span value='16'>山东</span>
									<span value='12'>浙江</span>
									<span value='14'>福建</span>
									<span value='11'>江苏</span>
								</td>
							</tr>
							<tr>
								<td class='first'>中南</td>
								<td>
									<span value='17'>河南</span>
									<span value='18'>湖北</span>
									<span value='19'>湖南</span>
									<span value='22'>海南</span>
									<span value='20'>广东</span>
									<span value='21'>广西</span>
								</td>
							</tr>
							<tr>
								<td class='first'>西南</td>
								<td>
									<span value='4'>重庆</span>
									<span value='25'>云南</span>
									<span value='24'>贵州</span>
									<span value='23'>四川</span>
									<span value='26'>西藏</span>
								</td>
							</tr>
							<tr>
								<td class='first'>西北</td>
								<td>
									<span value='30'>青海</span>
									<span value='27'>陕西</span>
									<span value='28'>甘肃</span>
									<span value='29'>宁夏</span>
									<span value='31'>新疆区</span>
								</td>
							</tr>
						</table>
					</div>
					<div class='city'>正在载...</div>
				</div>
			</div>
			
		</div>
		<div class="floorTip">
			<div class='floorTipLeft'>
				<p>温馨提示：</p>
			</div>
			<div class='floorTipRight'>
				<p>1.不支持提现至信用卡账户。</p>
				<p>2.请填写您的正确银行卡信息；部分银行需要开户支行信息，可通过电话咨询银行或网银查询；若有问题请联系客服。</p>
			</div>
		</div>
</div>