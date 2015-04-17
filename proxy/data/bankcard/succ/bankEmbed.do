<script type=text/javascript src="http://test1.xiaoniu88.com/js/lhgdialog/lhgdialog.js"></script>
<script type="text/javascript" src="js/front/tenpaybankEmbed.js"></script>
<!--middle -->
<style>
	
.formCon{padding:10px 22px}
.formContent{
	min-height:100px;
	border:1px solid #cacaca;
}
.formContentTop{
	height: 95px;
	padding: 15px 0px 0px 249px;
	font-size: 14px;
	line-height:25px;
	position:relative;
	z-index:10;
}
.formContentTip{
	position:absolute;
	width:195px;
	height:70px;
	border:1px solid #868f96;
	box-shadow:0px 0px 4px #cad3da;
	background-color:#fff;
	bottom:-25px;
	left:40px;
	padding:15px;
	cursor:pointer;
	background-color:#fff;
	z-index:10;
}
.listContent .formContentTip:hover{
	background-color:rgba(0,0,0,0.1);
	z-index:10;
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0,startColorstr = '#25000000', endColorstr = '#25000000' )\9;
}
.formContentFloor{
	height:78px;
	border-top:5px solid #ff6003;
	padding-top:40px;
	background-color:#f3f3f3;
	position:relative;
}
.hasbangding{position:absolute;bottom:5px;right:20px;color:#aaa;}
.formContentFloor p{font-size:14px;padding-left:50px;text-indent:-1em;}
.formContentFloor p font{font-size:14px;color:#ff6003;}
.bank_icon{width:141px;display:inline-block;*display:inline;*zoom:1;height: 33px;}
.bankOfType,.waittingformanage{position:absolute;top:15px;right:15px;height:23px;line-height:23px;margin:5px 0;padding:0 5px;background-color:#87abdb;font-size:12px;color:#fff;}
.waittingformanage{top:52px;background:none;color: #ff6003;}
.bankCode{display:block;}
.order01{padding:30px 90px;}
.order02{padding:30px 40px;}
.topTops{background-color:#fff9e3;padding:20px 50px;border:1px solid #ecc38f;font-size:14px;}
.topTops p{text-indent:2em;}

.list{position:relative;top:auto;left:auto;bottom:auto;float:left;margin:5px 3px;}
.listContent{position:relative;width:100%;}
.listContent:after{content:"";display:block;clear:both;}
.submitButton{
	width:142px;
	height:40px;
	line-height:40px;
	text-align:center;
	background:url("images/submitButton.png") no-repeat 0px -10px;
	outline:none;display:block;
	color:#fff;
	cursor:pointer;
	margin:10px auto;
	font-size:14px;
}
.submitButton:hover{
	text-decoration: none;
	color:#fff;
	background:url("images/submitButton.png") no-repeat -150px -10px;
}
.focusBorder{
	border:1px solid #43b333;
	box-shadow: 0px 0px 4px #43b333;
	background-color:rgba(0,0,0,0.1);
	background-image:url(images/submitButton.png);
	background-repeat:no-repeat;
	background-position:175px -405px;
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0,startColorstr = '#25000000', endColorstr = '#25000000' )\9;
}
.submitContent{position:relative;width:100%;margin-top:20px;}
.choiceTip{width:100%;text-align:center;font-size:16px;padding:20px 0;}

#delBankVer2{cursor:pointer;margin:0 10px 0 20px;}
</style>
<div class="contentTitle">
	我的银行卡
</div>
<div class="cft clearfix">
		<div class="order01">	
						<div class="formContent">
							<div class='formContentTop'>
								<p style='color:#1e994c' class='hasbangding'>已绑定</p>
									<div class="formContentTip">
									<span class="bank-icbc bank_icon"></span>
									<span class="bankOfType">储蓄卡</span>
									<span class="bankCode">1509******2111</span>
								</div>
							</div>
							<div class='formContentFloor'>
										<p>温馨提示：</p>
										<p>1.若操作提现，提现资金将汇入此银行卡。</p>
										<p>2.若要更换银行卡，请联系客服并提交证明材料。</p>
									</div>
								</div>
					</div>
					<script>
						jQuery("#delBankVer2").click(function(){
							var id = jQuery(this).attr("bankId");
							var	param = {};
							param["paramMap.opera"] = "doper";
							param["paramMap.operaid"] = id;
							
							$.ajax({
							 	type:"post",
							 	url:"updateTenpayBank.do",
							 	data:param,
							 	success:function(data){
							 		window.location.href="bankIndex.do";
							 	},error:function(){
							 		showdialiginfo("操作失败!");
							 		//window.location.href="bankIndex.do";
							 	}
							 });
						});
						function showdialiginfo(contentinfo,hrefstr){
							$.dialog({
								title: '温馨提醒',
								icon: 'alert.gif',
								fixed: true,
								lock: true,
								content:contentinfo,
								resize: false,
								ok:true,
								cancel:false
							});
						};
					</script>
				</div>