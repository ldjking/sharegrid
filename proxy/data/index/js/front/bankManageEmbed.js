var cityData=[],branchOfbank={"boc":"中国银行","postgc":"中国邮政储蓄银行","bob":"北京银行","bea":"东亚银行","njcb":"南京银行"},submitState=true;

function getTenpayBarchData(){
	var bankCode=jQuery("div[role='select']>span").attr("value");
	var d=jQuery("#ad_city").data("ids");
	if(!bankCode||!d)
		return;
	$.ajax({
	 	type:"post",
	 	url:"tenpayBarchData.do",
	 	data:"bankcode="+bankCode+"&selfid="+d.cId,
	 	success:function(data){
	 		cityData=data.data;
	 	}
	 });
}

(function($){
	function g(s){
		return s.replace("px","")*1||0;
	}
	
	$("div[role='select'] li").bind("click",function(){
		jQuery(this).parent().hide();
		var code=$(this).attr("code");
		branchOfbank[code]?$(".branchLine").show():$(".branchLine").hide();
		jQuery("#bankCodeTip").removeClass("onError").empty();
		$(this).parent().prev("span").text($(this).text()).attr("value",code);
		getTenpayBarchData();	
		jQuery("#subbranch").val("");
	});
	
	$("div[role='select']").each(function(){
		
		$("ul",this).css({"top":$(this).height(),"width":$(this).width(),"border":$(this).css("border"),"border-top":"none"});
	});
	
	$(document).bind("click",function(e){
		$("div[role='select'] ul").hide();
		
		if( $(e.target).attr("role") == "select" ){
			$("ul",e.target).show();
		}else if( $(e.target).parent().attr("role") == "select" ){
			$("+ul",e.target).show();
		}
	});
})(jQuery);

(function(){
	jQuery("#ad_city").bind("click",function(){
		jQuery(".choiceTheCity").show();
		var d=jQuery(this).data("ids");
		if(!d)
			return;
		var cid=d.cId;
		var pid=d.pId;
		jQuery(".choiceTheCity span").removeClass("focus");
		jQuery(".province span[value='"+pid+"']").addClass("focus");
		jQuery(".city span[value='"+cid+"']").addClass("focus");
		
	});
	
	$(document).bind("click",function(e){
		if( e.target !== jQuery("#ad_city")[0] && jQuery(".choiceTheCity").find(e.target).length<1){
			jQuery(".choiceTheCity").hide();
		}
	});
	
	$(document).bind("click",function(e){
		if( e.target !== jQuery("#subbranch")[0] && jQuery(".branchList").find(e.target).length<1){
			jQuery(".branchList").remove();
		}
	});
	
	jQuery("#choiceProvince").click(function(){
		jQuery(".city").hide();
		jQuery(".province").show();
		jQuery(this).addClass("cur").siblings().removeClass("cur");
	});
	jQuery("#choiceCity").click(function(){
		if(!jQuery(".province .focus").length)
			return;
		jQuery(this).addClass("cur").siblings().removeClass("cur");
		jQuery(".province").hide();
		jQuery(".city").show();
	});
	function setFunOfCity(){
		jQuery(".city span").click(function(){
			var name=jQuery(this).text();
			jQuery("#choiceCity").html(name+"<i></i>");
			var cid=jQuery(this).attr("value");
			var pid=jQuery(".province .focus").attr("value");
			jQuery("#ad_city").html(jQuery(".province span.focus").text()+"<font style='padding:0 5px'>></font>"+name).data("ids",{"pId":pid,"cId":cid});
			jQuery(".choiceTheCity").hide();
			jQuery("#subbranch").val("");
			jQuery("#ad_cityTip").removeClass("onError").empty()
			getTenpayBarchData();
		});
	}
	jQuery(".province span").click(function(){
		jQuery("#choiceProvince").html(jQuery(this).text()+"<i></i>");
		jQuery("#choiceCity").html("请选择城市"+"<i></i>");
		jQuery(".province span").removeClass("focus");
		jQuery(this).addClass("focus");
		var val=jQuery(this).attr("value");
		jQuery(".city").html("数据正在加载...");
		$.ajax({
		 	type:"post",
		 	url:"getareadata.do",
		 	data:"type=1&areaid="+val,
		 	success:function(data){
		 		jQuery(".city").empty();
		 		var d=data.data;
		 		var str="";
		 		for(var i in d){
		 			str+="<span value='"+i+"'>"+d[i]+"</span>";
		 		}
		 		jQuery(".province").hide();
		 		jQuery(".city").html(str).show();
		 		jQuery("#choiceCity").addClass("cur").siblings().removeClass("cur");
		 		setFunOfCity();
		 	}
		 });
	});

	function bulitSelectOfBank(){
		var html="";
		var l=cityData.length;
		while(l--){
			if(cityData[l].indexOf(this.value)>=0||!this.value)
				html+="<li>"+cityData[l]+"</li>";
		}
		html=html==""?"<span>无相关支行</span>":html;
		jQuery(".branchList ul").empty().html(html);
		setFunOfbranch();
	}
	
	function setFunOfbranch(){
		jQuery(".branchList li").click(function(){
			jQuery("#subbranch").val(jQuery(this).text());
			jQuery("#subbranchTip").removeClass("onError").empty();
			jQuery(".branchList").remove();
		});
	}
	
	jQuery("#subbranch").bind("keyup",function(){
		bulitSelectOfBank.call(this);
	}).bind("focus",function(){
		jQuery("body").append("<div class='branchList'><ul></ul></div>");
		bulitSelectOfBank.call(this);
		var off=jQuery(this).offset();
		var h=jQuery(this).height();
		jQuery(".branchList").css({"top":off.top+h,"left":off.left});
		jQuery(".branchList").show();
		jQuery("#subbranchTip").removeClass("onError").html("输入关键字可查找");
	}).bind("blur",function(){
		jQuery("#subbranchTip").removeClass("onError").empty();
		//setTimeout(function(){jQuery(".branchList").remove();},200)
	});
	
	jQuery("#cardNo").bind("focus",function(){
		jQuery("#cardNoTip").removeClass("onError").html("必须是<font style='color:#cfa74a;font-size:12px;'>"+jQuery("#realName").val()+"</font>的银行卡号，否则将绑卡失败").show();
	}).bind("blur",function(){
		checkCardNo();
	});
	
	jQuery("#txpass").bind("focus",function(){
		jQuery("#txpassTip").removeClass("onError").text("请输入6-20密码").show();
		jQuery("#txpassqr").blur();
	}).bind("blur",function(){
		checkTxpass();
	});
	
	jQuery("#txpassqr").bind("focus",function(){
		jQuery("#txpassqrTip").removeClass("onError").text("请再次输入密码").show();
	}).bind("blur",function(){
		checkTxpassqr();
	});
	
	//银行卡验证
	function checkCardNo(){
		var value=jQuery("#cardNo").val();
		var t=/^\d{13,19}$/;
		if(value==""){
			jQuery("#cardNoTip").addClass("onError").text("请输入银行卡号").show();
			return false;
		}else if(!t.test(value)){
			jQuery("#cardNoTip").addClass("onError").text("银行卡号须为13-19位数字").show();
			return false;
		}else{
			jQuery("#cardNoTip").removeClass("onError").empty();
			return true;
		}
	}
	//密码验证
	function checkTxpass(){
		var value=jQuery("#txpass").val();
		if(value.length<6||value.length>20){
			jQuery("#txpassTip").addClass("onError").text("请输入6-20密码").show();
			return false;
		}else{
			jQuery("#txpassTip").removeClass("onError").empty();
			checkTxpassqr();
			return true;
		}
	}
	//验证确认密码
	function checkTxpassqr(){
		var value=jQuery("#txpassqr").val();
		var p=jQuery("#txpass").val();
		if(value!= p){
			jQuery("#txpassqrTip").addClass("onError").text("两次密码不一致").show();
			return false;
		}else{
			jQuery("#txpassqrTip").removeClass("onError").empty();
			return true;
		}
	};
	
	function formatCardNo(cardNo){
		var str="";
		for(var i=4,l=cardNo.length;i<=l+3;i+=4){
			str+=cardNo.substring(i-4,i)+" ";
		}
		return str.substring(0,str.length-1);
	}
	
	function checkParam(){
		if(checkCardNo()){
			var bankCode=jQuery("div[role='select']>span").attr("value");
			
			if(!bankCode){
				jQuery("#bankCodeTip").addClass("onError").html("请选择银行");
				return;
			}
			
			if(branchOfbank[bankCode]){
				if(jQuery("#ad_city").text()==""){
					jQuery("#ad_cityTip").addClass("onError").html("请选择开户城市");
					return false;
				}
				if(jQuery("#subbranch").val()==""){
					jQuery("#subbranchTip").addClass("onError").html("请选择开户银行");
					return false;
				}
			}
			if(jQuery("#txpass").length>0){
				if(!checkTxpass())
					return;
				if(!checkTxpassqr())
					return;
			}
			
			var cardNo=jQuery("#cardNo").val();
			var bankType=jQuery("div[role='select']>span").attr("value");
			function checkOk(realName){
				jQuery("#nameOfbank").text(jQuery("div[role='select']>span").text());
	 			jQuery("#bankcode").text(formatCardNo(cardNo));
	 			jQuery("#realNameD").text(realName);
	 			jQuery("#coverdiv1").show();
			}
			$.ajax({
			 	type:"post",
			 	url:"checkcarddcflag.do",
			 	data:"cardtype="+bankType+"&cardno="+cardNo,
			 	success:function(data){
			 		var d=data;
			 		if(data.key == 1){
			 			var param = {};
						param["paramMap.dealpwd"] = jQuery("#txpass").val();
			 			if(jQuery("#txpass").length>0){
			 				$.ajax({
			 				 	type:"post",
			 				 	url:"getUserTxPwdEqLogPwd.do",
			 				 	data:param,
			 				 	success:function(data){
			 				 		if(data.key==1){
			 				 			checkOk(d.realName);
			 				 		}else if(data.key==0){
			 				 			jQuery("#txpassTip").addClass("onError").html("提现密码不能与登陆密码一致");
			 				 		}
			 				 	}
			 				 });
						}else{
							checkOk(d.realName);
						}
			 		}else{
			 			jQuery("#cardNoTip").addClass("onError").html(data.value);
			 		}
			 	},
			 	error:function(){
			 		jQuery("#cardNoTip").addClass("onError").html("服务器暂时无法处理您的请求,请稍后再试");
			 	}
			});
		}
	};
	
	jQuery("#submitToCheck").bind("click",function(){
		checkParam();
	});
	
	function getParam(){
		var param = {};
			param["paramMap.bankCode"] = jQuery("div[role='select']>span").attr("value");
			param["paramMap.bankType"] = 1;
			param["paramMap.cardNo"] = $("#cardNo").val();
			param["paramMap.subbranch"] = $("#subbranch").val();
			//提现密码
			param["paramMap.dealPwd"] = $("#txpass").val()||"";
			//默认提现卡
			param["paramMap.isDefault"] = 1;
			//支行
			param["paramMap.barchaddr"] = jQuery("#subbranch").val()||"";
			var d=jQuery("#ad_city").data("ids");
			d=d||{};
			//省份
			param["paramMap.ad_province"] = d.pId||"";
			param["paramMap.areaname"] = "";
			//城市
			param["paramMap.ad_city"] = d.cId||"";
			param["paramMap.cityname"] = "";
			
		return param;
	};
	
	function getParamMoney(){
		var param = {};
			param["money"] = $("#moneyForCheck").val();
		return param;
	};
	
	//确定提交
	jQuery("#submitToCheckBank").bind("click",function(){
		if(!submitState)
			return;
		submitState=false;
		var param = getParam();
		$.ajax({
			type:"POST",
			url:"tenpaybankInsert.do",
			dataType:"json",
			asyc:true,
			data:param,
			success:function(data){
				submitState=true;
				if(data.key == 2){
					subSuccess(data);
				}if(data.key == 1){
					closeDialog();
					jQuery("#cardNoTip").addClass("onError").html("您有验证中的银行卡,请验证通过后,再添加");
				}else if(data.key == 3){
					closeDialog();
					jQuery("#cardNoTip").addClass("onError").html("对不起,绑定银行卡须先进行实名认证");
				}else if(data.key == 0){
					closeDialog();
					jQuery("#cardNoTip").addClass("onError").html("该银行卡已被绑定");
				}else if(data.key != 2){
					closeDialog();
					jQuery("#cardNoTip").addClass("onError").html(data.value);
				}
			},
			error:function(){
				submitState=true;
				closeDialog();
				jQuery("#cardNoTip").addClass("onError").html("网络异常,请重试");
			}
		});
	});
	jQuery("#submitButtonV").bind("click",function(){
		if(!submitState)
			return;
		var param = getParamMoney();
		var value=jQuery("#moneyForCheck").val();
		if(checkMoney(value)){
			submitState=false;
			$.ajax({
				type:"POST",
				url:"tenpayBankMoneyVali.do",
				dataType:"json",
				asyc:true,
				data:param,
				success:function(data){
					submitState=true;
					if(data.key == 1){
						subMoneySuccess(data);
					}else if(data.key == 0){
						jQuery("#lastTimesToManage").text(data.value);
						jQuery("#coverdiv2").show();
					}else if(data.key == -1){
						jQuery("#moneyForCheckTip").addClass("onError").html("系统异常，请重试");
					}else if(data.key == 2){
						jQuery("#coverdiv3").show();
					}
				},
				error:function(){
					submitState=true;
					jQuery("#moneyForCheckTip").addClass("onError").html("网络异常，请重试");
				}
			});
		}
	});
	
	//取消
	window.closeDialog=function(){
		jQuery(".coverdiv").hide();
	};

	function initCallBack(data){
		jQuery(".coverdiv").hide();
		$("#bankEmbed").html(data);
		//$("#bank-icbc bank_icon").a
	};
	function subSuccess(data){
		var param = {};
		param["id"] = data.key_value;
		$.post("tenpaybankSubSuccess.do",param,initCallBack);
	};
	function subMoneySuccess(data){
		var param = {};
		param["type"] = "money";
		$.post("tenpaybankSubSuccess.do",param,initCallBack);
	};
	
	//第二步提示
	jQuery("#moneyForCheck").bind("focus",function(){
		jQuery("#moneyForCheckTip").removeClass("onError").empty();
	}).bind("blur",function(){
		checkMoney(this.value);
	});
	function checkMoney(value){
		var t=/^0.\d{1,2}$/;
		if(!t.test(value)){
			jQuery("#moneyForCheckTip").addClass("onError").html("请输入有效金额！");
			return false;
		}else if(value<0.01||value>0.5){
			jQuery("#moneyForCheckTip").addClass("onError").html("请输入有效金额！");
			return false;
		}
		return true;
	};
})();
