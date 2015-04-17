$(function() {
	$("#sp_cellPhone").text($("#cellPhone").val());
	$.formValidator.initConfig({
		formID: "BaseDataform",
		onSuccess: function() {
			$('#jc_btn').attr('value', '正在提交...');
			var param = {};
			param["paramMap.realName"] = $("#realName").val();
			param["paramMap.idNo"] = $("#idNo").val();
			param["paramMap.email"] = $("#email").val();
			param["paramMap.mv"] = $("#mv").val();
			param["paramMap.cellPhone"] = $("#cellPhone").val();
			param["paramMap.mobile"] = $("#mobile").val();
			$.post("updateUserPerson.do", param, function(data) {
				if (data.msg == "保存成功") {
					//验证邮箱
					//var indx = (data.mailAddress).indexOf('-');
					//var AA = (data.mailAddress).substring(indx + 1);
					//var m = (data.mailAddress).substring(0, indx);
					//window.location.href = "msgtip.do?emaladdresss=" + m + "&a=" + AA;
					window.location.href = "accountIndex.do";
				} else {
					alert(data.msg);
					$('#jc_btn').attr('value', '提 交');
				}
			});
		},
		onError: function() {
			alert("保存失败，请仔细查看页面错误提示");
		}
	});

	$("#realName").formValidator({
		onShow: "",
		onFocus: "请正确填写您的真实姓名，以免影响您的提现及所签订合同的合法性",
		onCorrect: "&nbsp;"
	}).inputValidator({
		min: 4,
		max: 20,
		empty: {
			leftEmpty: false,
			rightEmpty: false,
			emptyError: "您填写的真实姓名格式不正确"
		},
		onError: function() {
			var val = $("#realName").val();
			if (val == "") {
				return "请填写您的真实姓名";
			} else {
				return "您填写的真实姓名格式不正确";
			}
		}
	}).regexValidator({
		regExp: "chinese",
		dataType: "enum",
		onError: function() {
			var val = $("#realName").val();
			if (val == "") {
				return "请填写您的真实姓名";
			} else {
				return "您填写的真实姓名格式不正确";
			}
		}
	});
	$("#idNo").formValidator({
			onShow: "",
			onFocus: "请正确填写您的身份证号，以免影响您的提现及所签订合同的合法性",
			onCorrect: "&nbsp;"
		})
		.inputValidator({
			min: 15,
			max: 18,
			empty: {
				leftEmpty: false,
				rightEmpty: false,
				emptyError: "您填写的身份证号格式不正确"
			},
			onError: function(){
				var val = $("#idNo").val();
				if (val == "") {
					return "请填写您的正确身份证号码";
				} else {
					return "您填写的身份证号格式不正确";
				}
			}
		})
		.functionValidator({
			fun: function(val,obj){
				if(val.length==15||val.length==18){//长度是对的
					if((/^\d*[x]?$/ig).test(val)){//格式是对的，没有非数字字符 除了末尾的X
						return IdCardValidate(val,obj);
					}
					else{//长度是对的，但是有非法字符  非数字
						return "您填写的身份证号格式不正确";
					}
				}
				else{//长度都不对，可能是16 17位长
					return "您填写的身份证号格式不正确";
				}
			},
			onError: "您填写的身份证号无效，请重新填写"
		})
		.ajaxValidator({
			type: "post",
			dataType: "html",
			async: true,
			url: "ajaxIdCardNoRegister.do",
			data: {
				"paramMap.idCardNo": function() {
					return $("#idNo").val();
				}
			},
			success: function(data) {
				if (data == 7) return "您填写的身份证号已被登记，请重新填写";
				return true;
			},
			buttons: $("#jc_btn"),
			error: function(jqXHR, textStatus, errorThrown) {
				alert("服务器没有返回数据，可能服务器忙，请重试" + errorThrown);
			},
			onError: "该身份证号码已被使用，请更换身份证号码",
			onWait: "正在进行合法性校验，请稍候..."
		});
	$("#email").formValidator({
			onShow: "",
			onFocus: "请填写常用邮箱，以后可以用于登录",
			onCorrect: "&nbsp;"
		}).inputValidator({
			min: 1,
			empty: {
				leftEmpty: false,
				rightEmpty: false,
				emptyError: "请填写常用邮箱"
			},
			onError: function() {
				if ($("#idNo").val().length == 0) {
					return "请填写常用邮箱";
				}
				return "邮箱的格式不正确";
			}
		})
		.regexValidator({
			regExp: "email",
			dataType: "enum",
			onError: "邮箱的格式不正确"
		})
		.ajaxValidator({
			type: "post",
			dataType: "html",
			async: true,
			url: "ajaxCheckRegister.do",
			data: {},
			success: function(data) {
				if (data == 1) return "该邮箱已被使用，请更换邮箱";
				return true;
			},
			buttons: $("#jc_btn"),
			error: function(jqXHR, textStatus, errorThrown) {
				alert("服务器没有返回数据，可能服务器忙，请重试" + errorThrown);
			},
			onError: "该邮箱已被使用，请更换邮箱",
			onWait: "正在进行合法性校验，请稍候..."
		});
	$("#mobile").formValidator({
			onShow: "",
			onFocus: "请输入手机号码",
			onCorrect: "&nbsp;"
		})
		.inputValidator({
			min: 11,
			max: 11,
			onError: function() {
				var val = $("#mobile").val();
				if (val == "") {
					return "请输入手机号码";
				} else {
					return "手机号码必须为11位";
				}
			}
		}).regexValidator({
			regExp: "mobile",
			dataType: "enum",
			onError: "手机的格式不正确"
		})
		.ajaxValidator({
			type: "post",
			dataType: "html",
			async: true,
			url: "ajaxCheckMobilePhoneRegister.do",
			data: {
				"paramMap.mobilePhone": function() {
					return $("#mobile").val();
				}
			},
			success: function(data) {
				if (data == 6) return "该手机号已被使用，请更换手机号";
				return true;
			},
			buttons: $("#jc_btn"),
			error: function(jqXHR, textStatus, errorThrown) {
				alert("服务器没有返回数据，可能服务器忙，请重试" + errorThrown);
			},
			onError: "该手机号已被使用，请更换手机号",
			onWait: "正在进行合法性校验，请稍候..."
		});
	$("#jc_btn").click(function() {
		$("#BaseDataform").submit();
	});
});