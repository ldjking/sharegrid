<script type="text/javascript">
	$(function () {
		// left-menu
		//$("#myjd .myAccount .item:eq(6)").addClass("curr");
	});
	function modify(t){
		var frame;
		if(t == 0){
			frame="dialogWidth=380px;dialogHeight=230px;";
		}else if(t == 1){
			frame="dialogWidth=380px;dialogHeight=230px;";
		}else{
			frame="dialogWidth=380px;dialogHeight=200px;";
		}
		$.dialog({
			title: '资料修改',
			width:380,
			height:210,
			lock: true,
			resize:false,
			fixed:true,
			content: 'url:modify.do?t='+t
		});
	}
</script>
<!--middle -->
<div class="borrow conbox">
	<div class="method">
		<ul>
			<li class="add" style="margin-left:10px;margin-right:5px;">
				<dl>
					<dt class="mobile">接受提醒的手机</dt>
					<dd class="add">150****4784</dd>
						<dd> <a href="javascript:void(0);" onclick="modifyPhone()">修改</a></dd>
					</dl>
			</li>

			<li class="add">
				<dl>
					<dt class="email">接受提醒的邮箱</dt>
					<dd class="add">ldj****@126.com</dd>
						<dd> <a href="javascript:void(0);" onclick="modify(1)">修改</a></dd>
					</dl>
			</li>
		</ul>
	</div>
	<div class="clear"></div>
	<div class="order01" style="padding:10px 10px;">
		<h2>可定制消息列表</h2>
		<table width="99%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #DDD;">
			<tbody>
				<tr bgcolor="#f3f3f3">
					<td align="center">信息内容</td>
					<td align="center">短信</td>
					<td align="center">邮件</td>
					<td align="center">站内信</td>
				</tr>
				<tr>
						<td align="center">
							收到还款</td>
						<td align="center">
							<input type="checkbox" id="noteReceive" class="nt"
								onclick="ntcheck1(this);" />
							<label for="noteReceive">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="mailReceive" class="ml"
								onclick="mlcheck1(this);" />
							<label for="mailReceive">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="messageReceive" class="mg"
								onclick="mgcheck1(this);" />
							<label for="messageReceive">
								<strong></strong>
							</label>
						</td>
					</tr>
				<tr>
						<td align="center">
							提现成功</td>
						<td align="center">
							<input type="checkbox" id="noteDeposit" class="nt"
								onclick="ntcheck1(this);" />
							<label for="noteDeposit">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="mailDeposit" class="ml"
								onclick="mlcheck1(this);" />
							<label for="mailDeposit">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="messageDeposit" class="mg"
								onclick="mgcheck1(this);" />
							<label for="messageDeposit">
								<strong></strong>
							</label>
						</td>
					</tr>
				<tr>
						<td align="center">
							借款成功</td>
						<td align="center">
							<input type="checkbox" id="noteBorrow" class="nt"
								onclick="ntcheck1(this);" />
							<label for="noteBorrow">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="mailBorrow" class="ml"
								onclick="mlcheck1(this);" />
							<label for="mailBorrow">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="messageBorrow" class="mg"
								onclick="mgcheck1(this);" />
							<label for="messageBorrow">
								<strong></strong>
							</label>
						</td>
					</tr>
				<tr>
						<td align="center">
							充值成功</td>
						<td align="center">
							<input type="checkbox" id="noteRecharge" class="nt"
								onclick="ntcheck1(this);" />
							<label for="noteRecharge">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="mailRecharge" class="ml"
								onclick="mlcheck1(this);" />
							<label for="mailRecharge">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="messageRecharge" class="mg"
								onclick="mgcheck1(this);" />
							<label for="messageRecharge">
								<strong></strong>
							</label>
						</td>
					</tr>
				<tr>
						<td align="center">
							资金变化</td>
						<td align="center">
							<input type="checkbox" id="noteChange" class="nt"
								onclick="ntcheck1(this);" />
							<label for="noteChange">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="mailChange" class="ml"
								onclick="mlcheck1(this);" />
							<label for="mailChange">
								<strong></strong>
							</label>
						</td>
						<td align="center">
							<input type="checkbox" id="messageChange" class="mg"
								onclick="mgcheck1(this);" />
							<label for="messageChange">
								<strong></strong>
							</label>
						</td>
					</tr>
				<tr>
					<td height="36px" colspan="2">&nbsp;</td>
					<td style="padding-left: 10px;" colspan="2">
						<a href="javascript:void(0);" class="fllbtn fllbtn2" onclick="addNoteSetting();">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<script type="text/javascript">
$.ajax({
	url: 'queryNotesSettingInit.do?rand=' + Math.random(),
	data: param,
	dataType: 'json',
	contentType: "text/html; charset=utf-8",
	async:false,
	success: function(data, status) {
		if (data == 1) {
			return;
		}
		var message = false,mail = false,notes = false;
		if(data.length > 0) {
			message = data[0].message;
			mail = data[0].mail;
			notes = data[0].note;
			for (var i = 0; i < data.length; i++) {
				if (data[i].noticeMode == "1") { //邮件通知
					if (data[i].reciveRepayEnable == "2") {
						$("#mailReceive").attr("checked", "checked")
					}
					if (data[i].showSucEnable == "2") {
						$("#mailDeposit").attr("checked", "checked")
					}
					if (data[i].loanSucEnable == "2") {
						$("#mailBorrow").attr("checked", "checked")
					}
					if (data[i].rechargeSucEnable == "2") {
						$("#mailRecharge").attr("checked", "checked")
					}
					if (data[i].capitalChangeEnable == "2") {
						$("#mailChange").attr("checked", "checked")
					}
				} else if (data[i].noticeMode == "2") { //站内信通知
					if (data[i].reciveRepayEnable == "2") {
						$("#messageReceive").attr("checked", "checked")
					}
					if (data[i].showSucEnable == "2") {
						$("#messageDeposit").attr("checked", "checked")
					}
					if (data[i].loanSucEnable == "2") {
						$("#messageBorrow").attr("checked", "checked")
					}
					if (data[i].rechargeSucEnable == "2") {
						$("#messageRecharge").attr("checked", "checked")
					}
					if (data[i].capitalChangeEnable == "2") {
						$("#messageChange").attr("checked", "checked")
					}
				} else { //短信通知
					if (data[i].reciveRepayEnable == "2") {
						$("#noteReceive").attr("checked", "checked")
					}
					if (data[i].showSucEnable == "2") {
						$("#noteDeposit").attr("checked", "checked")
					}
					if (data[i].loanSucEnable == "2") {
						$("#noteBorrow").attr("checked", "checked")
					}
					if (data[i].rechargeSucEnable == "2") {
						$("#noteRecharge").attr("checked", "checked")
					}
					if (data[i].capitalChangeEnable == "2") {
						$("#noteChange").attr("checked", "checked")
					}
				}
			}
		}
		if (message) { //只要分类有一个被选中，则父类就选中
			$("#message").attr("checked", true); //$(".mg").attr("checked","checked");
		}
		if (mail) {
			$("#mail").attr("checked", true); //$(".ml").attr("checked","checked");
		}
		if (notes) {
			$("#note").attr("checked", true); //$(".nt").attr("checked","checked");
		}
 			}
});
//通知设置
function addNoteSetting() {
	//站内信
	param["paramMap.message"] = $("#message").attr("checked");
	param["paramMap.messageReceive"] = $("#messageReceive").attr("checked");
	param["paramMap.messageDeposit"] = $("#messageDeposit").attr("checked");
	param["paramMap.messageBorrow"] = $("#messageBorrow").attr("checked");
	param["paramMap.messageRecharge"] = $("#messageRecharge").attr("checked");
	param["paramMap.messageChange"] = $("#messageChange").attr("checked"); //邮件
	param["paramMap.mail"] = $("#mail").attr("checked");
	param["paramMap.mailReceive"] = $("#mailReceive").attr("checked");
	param["paramMap.mailDeposit"] = $("#mailDeposit").attr("checked");
	param["paramMap.mailBorrow"] = $("#mailBorrow").attr("checked");
	param["paramMap.mailRecharge"] = $("#mailRecharge").attr("checked");
	param["paramMap.mailChange"] = $("#mailChange").attr("checked"); //短信
	param["paramMap.note"] = $("#note").attr("checked");
	param["paramMap.noteReceive"] = $("#noteReceive").attr("checked");
	param["paramMap.noteDeposit"] = $("#noteDeposit").attr("checked");
	param["paramMap.noteBorrow"] = $("#noteBorrow").attr("checked");
	param["paramMap.noteRecharge"] = $("#noteRecharge").attr("checked");
	param["paramMap.noteChange"] = $("#noteChange").attr("checked");
	$.post("addNotesSetting.do", param,function(data) {
		if (data == 1) {
			alert("通知设置失败");
		} else {
			alert("通知设置成功");
		}
	});
}
</script>
