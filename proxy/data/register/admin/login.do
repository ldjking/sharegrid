<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>小牛在线后台管理系统</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<link type="text/css" href="../css/admin/login.css?155" rel="stylesheet">
		<script type="text/javascript" src="../script/jquery-1.7.1.min.js"></script>
		<style type="text/css">
		<!--
		body {
			margin-left: 0px;
			margin-top: 0px;
			margin-right: 0px;
			margin-bottom: 0px;
			background-color: #1D3647;
		}
		-->
		</style>
		<script type="text/javascript">
		function correctPNG() {
		    var arVersion = navigator.appVersion.split("MSIE");
		    var version = parseFloat(arVersion[1]);
		    if ((version >= 5.5) && (document.body.filters)) {
		       for(var j=0; j<document.images.length; j++) {
		          var img = document.images[j];
		          var imgName = img.src.toUpperCase();
		          if (imgName.substring(imgName.length-3, imgName.length) == "PNG") {
		             var imgID = (img.id) ? "id='" + img.id + "' " : "";
		             var imgClass = (img.className) ? "class='" + img.className + "' " : "";
		             var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
		             var imgStyle = "display:inline-block;" + img.style.cssText;
		             if (img.align == "left") imgStyle = "float:left;" + imgStyle;
		             if (img.align == "right") imgStyle = "float:right;" + imgStyle;
		             if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
		             var strNewHTML = "<span " + imgID + imgClass + imgTitle
		             + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
		             + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
		             + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
		             img.outerHTML = strNewHTML;
		             j = j-1;
		          }
		       }
		    }    
		}
		window.attachEvent("onload", correctPNG);

		$(function(){
			$(window).bind('keyup', function(event){
				if (event.keyCode=="13"){
					validatorCodeIsExpired();
				}
			});
			$("#userName").focus();
			$("#code").val("");
		});
		//初始化
		function switchCode(){
			var timenow = new Date(); 
			$("#codeNum").attr("src","imageCode.do?pageId=adminlogin&d="+timenow);
		}
		//判断验证码是否过期
		function validatorCodeIsExpired(){
			var param = {};
			param["pageId"] = "adminlogin";
			$.post("codeIsExpired.do",param,function(data){
				 if(data == 1){
				 	alert("验证码已过期");
				 	switchCode();
				 	return ;
				 }
				$("#loginForm").submit();
			});
		}
		function breakout() {
			$("#userName").focus();
			if (window.top != window.self) {
				window.top.location = "login.do";
			}
		}
		</script>
	</head>
	<body>
		<table width="100%" height="166" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="42" valign="top" class="login_top_bg">
					&nbsp;
				</td>
			</tr>
			<tr>
				<td valign="top">
					<table width="100%" height="532" border="0" cellpadding="0" cellspacing="0" class="login_bg">
						<tr>
							<td width="49%" align="right">
								<table width="91%" height="532" border="0" cellpadding="0" cellspacing="0" class="login_bg2">
									<tr>
										<td height="138" valign="top">
											<table width="89%" height="427" border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td height="149">
														&nbsp;
													</td>
												</tr>
												<tr>
													<td height="80" align="right" valign="top">
														<div style='position:relative;'>
														<a href="http://www.xiaoniu88.com/" target="_blank">
															<img src="../images/logo.png" style="position:absolute;right:70px;top:20px;">
														</a>
														</div>
													</td>
												</tr>
												<tr>
													<td height="198" align="right" valign="top">
														<table width="380" border="0" cellpadding="0" cellspacing="0">
															<tr>
																<td height="25" colspan="2" class="left_txt">
																	小牛在线（xiaoniu88.com）是小牛资本管理集团旗下的互联网金融平台，由深圳市小牛电子商务有限公司运营。平台汇集了大批优秀人才，核心成员均有在国内外知名的银行、证券、基金、互联网、电子商务等企业服务的经历，积累了丰富的金融及互联网行业相关经验。
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>

								</table>
							</td>
							<td width="1%">
								&nbsp;
							</td>
							<td width="50%" valign="bottom">
								<table width="100%" height="59" border="0" align="center" cellpadding="0" cellspacing="0">
									<tr>
										<td width="4%">
											&nbsp;
										</td>
										<td width="96%" height="38">
											<span class="login_txt_bt">登录小牛在线管理系统</span>
										</td>
									</tr>
									<tr>
										<td>
											&nbsp;
										</td>
										<td height="21">
											<table cellSpacing="0" cellPadding="0" width="100%" border="0" id="table211" height="328">
												<tr>
													<td height="164" colspan="2" align="left">
														<form id="loginForm" action="adminLogin.do" method="post">
															<input type="hidden" value="adminlogin" name="pageId" />
															<table cellSpacing="0" cellPadding="0" width="260" border="0" id="table212">
																<tr>
																	<td height="35">
																		<span class="login_text">管理员：</span>
																	</td>
																	<td height="35" colspan="2">
																		<input type="text" id="userName" name="paramMap.userName" class="login_txt">
																	</td>
																</tr>
																<tr>
																	<td height="35">
																		<span class="login_text">密&nbsp;&nbsp;&nbsp;&nbsp;码： </span>
																	</td>
																	<td height="35" colspan="2">
																		<input type="password" id="password" name="paramMap.password" class="login_txt">
																	</td>
																</tr>
																<tr>
																	<td height="35">
																		<span class="login_text">验证码：</span>
																	</td>
																	<td height="35">
																		<input id="code" name="paramMap.code" class="login_txt login_code" type="text" maxLength="4" size="8">
																	</td>
																	<td height="35">
																		<img src="imageCode.do?pageId=adminlogin" title="点击更换验证码" style="cursor: pointer;" id="codeNum" width="65" height="20" onclick="javascript:switchCode()" />
																	</td>
																</tr>
																<tr>
																	<td width="55" height="35">
																		&nbsp;
																	</td>
																	<td width="88" height="35">
																		<input name="submit" type="submit" class="login_btn" id="submit" value="登 陆">
																	</td>
																	<td width="117">
																		<input name="cs" type="button" class="login_btn" id="cs" value="取 消" onClick="showConfirmMsg1()">
																	</td>
																</tr>
																<tr>
																	<td height="26" colspan="3" align="center">
																		<span class="errtips"></span>
																	</td>
																</tr>
															</table>
														</form>
													</td>
												</tr>
												<tr>
													<td width="433" height="164" align="right" valign="bottom">
														<img src="../images/admin/login/login-wel.gif" width="242" height="138">
													</td>
													<td width="57" align="right" valign="bottom">
														&nbsp;
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td height="20">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="login-buttom-bg">
						<tr>
							<td align="center">
								<span class="login-buttom-txt">Copyright&nbsp;©&nbsp;2014 小牛在线 版权所有&nbsp;&nbsp;&nbsp;备案号：粤ICP备13089339号</span>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>