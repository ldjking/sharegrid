$(function() {
	//累计金额
	var daoshu = function(ele){
		var state = false,
			num = parseInt(ele.text()),
			arr = function(){
				var arr1 = [],
					value = function(){return Math.floor(Math.random()*10)};
				for(var i = 0 ; arr1.length != 10 ;  i++){
					var valueNum = value();
					if($.inArray(valueNum,arr1) == -1){
						arr1.push(valueNum);
					}
					if(i==200){
						return arr1;
					}
				}
				return arr1;
			}();
	}
	
	$.shovePost("getBorrowStatistics.do", param, function(data) {
		$("#totalInvestAmount").html(strHtml__(data.totalInvestAmount)+'万元');
		$("#beginDate").html(strHtml_(data.beginDate));
	});
	
	function strHtml__(arr){
		if(arr.length<=4)
			return arr;
		var str=arr.substring(0,arr.length-4);
			str+="亿";
			str+=arr.substring(arr.length-4,arr.length);
		return str;
	}
	
	
	// top-menu
	$("#menu_xl .menu_li").removeClass("curr");
	$("#menu_xl .menu_li").eq(0).addClass("curr");

	/*banner*/
	var len = $("#focus .banner li").length; //获取焦点图个数
	$("#focus .banner li a").each(function(){
		var href=$(this).attr("href");
		if(href.length<2){
			$(this).removeAttr("href");
		}
	});
	var index = 0;
	// 以下代码添加控制按钮
	var btn = "<div class='btn'><ul>";
	for(var i=0; i < len; i++){
		btn += "<li><a href='javascript:void(0);'></a></li>";
	}
	btn += "</ul></div>";
	$("#focus").append(btn);
	showPics(0);
	
	// 为控制按钮添加鼠标滑入事件
	$("#focus .btn li a").bind("mouseover",function(){
		index = $("#focus .btn a").index(this);
		showPics(index);
	});
	
	function protalRunIng(){
		if(window.portalRuningObj)
			window.clearInterval(portalRuningObj);
		portalRuningObj = setInterval(function(){
			index=index==len-1?0:++index;
			showPics(index);
		},5000); 
	};
	protalRunIng();
	// 焦点图获取焦点时停止自动播放，滑出时开始自动播放
	$("#focus").bind("mouseover",function(){
		if(window.portalRuningObj)
			window.clearInterval(portalRuningObj);
	}).bind("mouseleave",function(){
		protalRunIng();
	});

	// 普通切换显示图片函数
	function showPics(index){
		$("#focus .btn a").removeClass("on").eq(index).addClass("on");
		jQuery("#focus .banner li.protalFocus")
				.removeClass("protalFocus")
				.stop()
				.animate({"opacity":"0",'z-index':'0'},500,function(){jQuery(this).hide()});
		
		$("#focus .banner li:eq("+index+")")
				.addClass('protalFocus')
				.show()
				.stop()
				.animate({"opacity":"1",'z-index':'1'},500);
	}

	/*banner*/
	
	// 默认加载最新投资产品
	$.shovePost("getLastestBorrow.do", param, function(data) {
		$("#con_list").html(data);
	});

	// 最新投资产品tab
//	$("#li_touzi").live("click", function() {
//		$("#li_touzi").removeClass();
//		$("#li_licai").removeClass();
//		$("#li_touzi").addClass("first on");
//		$("#li_licai").addClass("down");
//		$("#con_list").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
//		$("#last_more").attr("href", "financeTender.do");
//		$.shovePost("getLastestBorrow.do", param, function(data) {
//			$("#con_list").html(data);
//		});
//	});

	// 最新理财产品tab
	$("#li_licai").live("click", function() {
		$("#li_touzi").removeClass();
		$("#li_licai").removeClass();
		$("#li_touzi").addClass("first down");
		$("#li_licai").addClass("on");
		$("#con_list").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
		$("#last_more").attr("href", "queryFundsInfo.do");
		$.shovePost("getLastestFunds.do", param, function(data) {
			$("#con_list").html(data);
		});
	});

	// 标的投资收缩/展开
	$(".icondown").live("click",function(){
		var attrid = $(this).find("input[type='image']").attr("attr-s");
		$("#probox_" + attrid).slideToggle("fast");
	});

	//启用投标倒计时时钟
	tender_expire_time();

	// 默认加载项
	webnotelist();
	// monthRank();
	getquestion();
	medialist();
	
	//加载新手专区
	getNewCustomArea();

	//加载最新回款
	$.shovePost('newRepay.do', param, function(data) {
		$("#newrepay").html(data);
	});

	//绑定网站公告点击事件
	/*$("#webnotelist").live("click", function() {
		$(this).removeClass("current");
		$('#medialist').addClass("current");
		$("#webNote").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
		webnotelist();
	});
	//绑定媒体报道点击事件
	$("#medialist").live("click", function() {
		$(this).removeClass("current");
		$('#webnotelist').addClass("current");
		$("#webNote").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
		medialist();
	});*/
	//绑定累计排名点击事件
	$('#rank').live("click", function() {
		$(this).removeClass("current");
		$('#monthRank').addClass("current");
		$("#investRank").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
		investRank();
	});
	//绑定月排名点击事件
	$('#monthRank').live("click", function() {
		$(this).removeClass("current");
		$('#rank').addClass("current");
		$("#investRank").html('<img src="../../js/images/load.gif" class="load" alt="加载中..." />');
		monthRank();
	});

	// 登录
	$("#email").focus(function() {
		if($(this).val() == '用户名/邮箱'){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			/*$(this).val('用户名/邮箱');*/
			$(this).css({color:'#999'});
			showTipMsg("请输入用户名或邮箱地址！");
		}/* else{
			var index = $(this).val().indexOf("@", 0);
			if(index==-1){
				//用户名登录
				checkRegister('userName');
			}else{
				//邮箱登录
				checkRegister('email');
			}
		}*/
	});

	$("#password").focus(function() {
		if($(this).val() == ''){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			$(this).css({color:'#999'});
			showTipMsg("请输入密码！");
		}
	});

	$("#code").focus(function() {
		if($(this).val() == '验证码'){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function() {
		if ($(this).val() == "") {
			/*$(this).val('验证码');*/
			$(this).css({color:'#999'});
			showTipMsg("请输入验证码！");
		}
	});

	//处理键盘的回车键登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			login();
		}
	});

	//点击更换验证码
	$("#codeNum").click(function(){
		switchCode();
	});
});

//倒计时
function counterClock(left_time) {
	var left_time = parseInt(left_time);
	var days_second = 86400; // 一天的秒数
	var hours_second = days_second / 24;
	var minute_second = hours_second / 60;
	var str = "";
	if (left_time > 0) {
		var days = parseInt(left_time / days_second);
		str += (days > 0) ? days + "天": "";
		var hours = parseInt((left_time - days * days_second) / hours_second);
		str += hours > 0 ? hours + "时": "";
		var minutes = parseInt((left_time - days * days_second - hours_second * hours) / minute_second);
		str += minutes > 0 ? minutes + "分": "";
		second = left_time - days * days_second - hours_second * hours - minutes * minute_second;
		str += second + "秒";
	}
	return str;
}

//订单过期时间
function tender_expire_time() {
	$(".tenderTab td[data-type='tender_expire_time']").each(function() {
		var time_obj = $(this).find(".time");
		var left_time_int = time_obj.attr("left_time_int");
		if (left_time_int >= 0) {
			var time_string = counterClock(left_time_int);
			if (time_string == "") {
				time_obj.html("0秒");
				$(this).removeAttr('data-type');
				if ($(this).attr('next-cls') == '1') {
					$(this).parents().find("tr:eq(1)").find("td:last a").addClass("fllbtn2");
					$(this).parents().find("tr:eq(1)").find("td:last a").attr("href", "financeDetail.do?id=" + $(this).attr('finance-id'));
				}
			} else {
				time_obj.html(time_string);
				time_obj.attr("left_time_int", left_time_int - 1);
			}
		} else { // 非数字，未审核
		}
	});

	window.setTimeout(function() {
		tender_expire_time();
	}, 1000);
}

//刷新验证码
function switchCode() {
	var timenow = new Date();
	$("#code").val('验证码');
	$("#code").css({color:'#999'});
	$("#codeNum").attr("src", "admin/imageCode.do?pageId=userlogin&d=" + timenow);
}

//登录
function login() {
	var flag = true;
	if (flag) {
		flag = false;
		if ($("#email").val() == "" || $("#email").val() == "用户名/邮箱") {
			showTipMsg("请输入用户名或邮箱地址！");
			$("#email").focus();
			return;
		}
		if ($("#password").val() == "") {
			showTipMsg("请输入密码！");
			$("#password").focus();
			return;
		}
		if($("#code").val()=="" || $("#code").val() == "验证码"){
			showTipMsg("请输入验证码！");
			$("#code").focus();
			return;
		}
		$('#btn_login').text('登录中...');
		var afterLoginUrl = $("#afterLoginUrl").val();
		var param = {};
		param["paramMap.pageId"] = "userlogin";
		param["paramMap.email"] = $("#email").val();
		param["paramMap.password"] = $("#password").val();
		param["paramMap.code"] = $("#code").val();
		param["paramMap.afterLoginUrl"] = afterLoginUrl;
		$.post("logining.do", param,function(data) {
			if (data.msg == 1) {
				if (afterLoginUrl != '') {
					window.location.href = afterLoginUrl;
				} else {
					window.location.href = basePath;
				}
			} else if (data.msg == 2) {
				showTipMsg("验证码错误！");
				switchCode();
				flag = true;
				$('#btn_login').text('登 录');
			} else if (data.msg == 3) {
				switchCode();
				flag = true;
				$('#btn_login').text('登 录');
				showTipMsg("用户名或密码错误！");
			} else if (data.msg == 4) {
				switchCode();
				flag = true;
				$('#btn_login').text('登 录');
				showTipMsg("该用户已被禁用！");
			} else if(data.msg == 5){
				window.location.href = 'index.do';
			} else if(data.msg == 6){
				//验证邮箱
       			var indx = (data.mailAddress).indexOf('-');
				var AA = (data.mailAddress).substring(indx + 1);
				var m = (data.mailAddress).substring(0, indx);
				window.location.href = "msgtip.do?emaladdresss=" + m + "&a=" + AA;
			}else if(data.msg == 7){
				//跳转到申请vip页面
				window.location.href = 'applyVipInit.do';
			}
		});
	}
}

function showTipMsg(msg){
	if(msg!=""){
		$("#error-box").removeClass("err2");
		$("#error-box").addClass("err");
		$("#error-box").html(msg);
		$(".login_in").attr("style","top:10px;");
		$("#error-box").show();
	}
}

//加载新手专区
function getNewCustomArea() {
	$.shovePost('getNewCustomArea.do', param, function(data) {
		if(!!data)
			$("#newCustomer").show().html(data);
	});
}
//加载网站公告
function webnotelist() {
	$.shovePost('webnotelist.do', param, function(data) {
		$("#webNote").html(data);
	});
}
//加载媒体报道
function medialist() {
	$.shovePost('medialist.do', param, function(data) {
		$("#mediaNote").html(data);
	});
}
//加载累计排名
function investRank() {
	$.shovePost('investRank.do', param, function(data) {
		$("#investRank").html(data);
	});
}
//加载本月排名
function monthRank() {
	$.shovePost('investRankCurMonth.do', param, function(data) {
		$("#investRank").html(data);
	});
}

//累计金额
function strHtml(arr){
	var txt = ""
		for(var i = 0 ; i < arr.length ; i++ ){
			for(var j = 0 ; j < arr[i].length ; j++ ){
				if(arr[i].charAt(j) == "."){
					txt+="<b>.</b>";
					continue;
				}
				txt += "<span>"+arr[i].charAt(j)+"</span>";
			}
			if(i+1 != arr.length){
				txt+="<b>,</b>";
			}
		}
	return txt;
}

function strHtml_(arr){
	var length=arr.length;
	if(length<3)
		return arr;
	var a_arr=arr.split('');
	for(var i=length-1,j=0;j<length;i--){
		if(j&&(j+1)%3==0&&j!=length-1){
			a_arr.splice(i,0,',');
		}
		j++
	}
	return a_arr.join('');
}

//加载常见问题
function getquestion(){
	$.shovePost('queryfront.do', param, function(data) {
		$("#qwebNote").html(data);
	});
}

