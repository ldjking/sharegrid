$(function () {
		// left-menu
		$("#myjd .myAccount .item:eq(4)").addClass("curr");
		$(".withdrawbtn").live('click',function(){
			try{
				var mdid = $(this).attr("val");
				$.dialog.confirm("确定设置该卡为默认提现?", "确定", function(){
					var param = setcarddefa(mdid);
					saveUpdateBarch(param);
					$(".withdrawcal").hide();
					$(".withdrawbtn").show();
					$(this).hide();
					$(this).siblings(".withdrawcal").show();
				});
			}catch(e){
				alert(e);
			}
		});
		$(".withdrawcal").live('click',function(){
			$(this).hide();
			$(this).siblings(".withdrawbtn").show();
		});
		$(".alterbtn").live('click',function(){
			var obj = $(this).parent().siblings(".bContent");
			$(".delbtn").css("display","none");
			$(obj).find(".oldval").hide();
			$(obj).find(".altercontent").show();
			$(this).hide();
			$(this).siblings(".savebtn").show();
			$(this).siblings(".cancelbtn").show();
			var mdid = $(obj).attr("val");
			loadProvice(mdid);
		});
		$(".savebtn").live('click',function(){
			var obj = $(this).parent().siblings(".bContent");
			$(obj).find(".altercontent").hide();
			$(obj).find(".oldval").show();
			$(this).hide();
			$(this).siblings(".cancelbtn").hide();
			$(this).siblings(".alterbtn").show();
			var mdid = $(obj).attr("val");
			var param = getSaveBtn(mdid);
			saveUpdateBarch(param);
		});
		$(".cancelbtn").live('click',function(){
			var obj = $(this).parent().siblings(".bContent");
			$(".delbtn").css("display","");
			$(obj).find(".altercontent").hide();
			$(obj).find(".oldval").show();
			$(this).hide();
			$(this).siblings(".savebtn").hide();
			$(this).siblings(".alterbtn").show();
		});
		$(".delbtn").live('click',function(){
			var obj = $(this).parent().siblings(".bContent");
			$.dialog.confirm("每张卡有三次绑定机会，是否删除?", "确定", function(){
				var mdid = $(obj).attr("val");
				var param = getDelBtn(mdid);
				saveUpdateBarch(param);
				var mdid = $(obj).attr("val");
				$(this).parent().parent().remove();
			});
		});
		$("[sn='ad_province']").change(function(){
			var mdid = $(this).attr("val");
			var val = $(this).find("option:selected").attr("value");
				  $.ajax({
				 	type:"post",
				 	url:"getareadata.do",
				 	data:"type=1&areaid="+val,
				 	success:function(data){
				 		f_citys(mdid,data);
				 	}
				 });
		});
		$("[sn='ad_citys']").change(function(){
			 var mdid = $(this).attr("val");
			 var val = $(this).find("option:selected").attr("value");
			 var bankCode = $(this).attr("code").toLowerCase();
			  $.ajax({
			 	type:"post",
			 	url:"tenpayBarchData.do",
			 	data:"bankcode="+bankCode+"&selfid="+val,
			 	success:function(data){
			 		f_BarchData(mdid,data);
			 	}
			 });
		});
	});
	function setcarddefa(mdid){
		var param = {};
			param["paramMap.opera"] = "soper";
			param["paramMap.operaid"] = $("#operaid"+mdid).val();
		return param;
	}
	function getDelBtn(midi){
		var	param = {};
			param["paramMap.opera"] = "doper";
			param["paramMap.operaid"] = $("#operaid"+midi).val();
		return param;
	}
	function getSaveBtn(midi){
		var	param = {};
			param["paramMap.area"] = $("#pro"+midi).find("option:selected").val();
			param["paramMap.city"] = $("#city"+midi).find("option:selected").val();
			param["paramMap.areaname"] = $("#pro"+midi).find("option:selected").text();
			param["paramMap.cityname"] = $("#city"+midi).find("option:selected").text();
			param["paramMap.barchaddr"] = $("#barch"+midi).find("option:selected").text();
			param["paramMap.opera"] = "uoper";
			param["paramMap.operaid"] = $("#operaid"+midi).val();
		return param;
	}
	function saveUpdateBarch(param){
		  $.ajax({
			 	type:"post",
			 	url:"updateTenpayBank.do",
			 	data:param,
			 	success:function(data){
			 		updatebankinf(data);
			 	},error:function(){
			 		showdialiginfo("操作失败!");
			 		window.location.href="bankIndex.do";
			 	}
			 });
	}
	function updatebankinf(data){
		window.location.href = "bankIndex.do";;
	}
	function f_BarchData(mdid,data){
		var obj;
		if(data != null&&(obj=data.data)!=null){
			var strhtml = "";
			$("#barch"+mdid).html("");
			for(var index in obj){
				strhtml += "<option value='"+index+"'>"+obj[index]+"</option>";
			}
			$("#barch"+mdid).append(strhtml);
		}else{
			$("#barch"+mdid).html("<option value=''>请选择</option>");
		}
		obj = null;
	}
	function f_citys(mdid,data){
		var obj;
		if(data != null&&(obj=data.data)!=null){
		var strhtml = "<option value=\"0\">请选择</option>";
			$("#city"+mdid).html(strhtml);
			for(var index in obj){
				strhtml += "<option value="+index+">"+obj[index]+"</option>";
			}
			$("#city"+mdid).append(strhtml);
		}
		obj = null;
	}
	function loadProvice(mdid){
		 $.ajax({
		 	type:"post",
		 	url:"getareadata.do",
		 	data:"type=1&areaid=0",
		 	success:function(data){
		 		f_provinces(mdid,data);
		 	}
		 });
	}
	function f_provinces(mdid,data){
		var obj;
		if(data != null&&(obj=data.data)!=null){
		var strhtml = "";
			for(var index in obj){
				strhtml += "<option value='"+index+"'>"+obj[index]+"</option>";
			}
			$("#pro"+mdid).append(strhtml);
		}
		obj = null;
	}
	function showHftx(){
		$("#hftx").removeClass("current");
		$("#cft").addClass("current");
		$(".hftx").hide();
		$(".cft").show();
	}
	function showCft(){
		$("#cft").removeClass("current");
		$("#hftx").addClass("current");
		$(".cft").hide();
		$(".hftx").show();
	}
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
	}