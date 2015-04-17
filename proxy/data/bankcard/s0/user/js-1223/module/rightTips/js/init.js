/*
 *name:dtt
 *time:2014.9.30
 *content:回到顶部、计算浮动区
*/
define(function(require, exports, module) {
	require('../../dialog/js/init.js');//导入弹出框
	var milFt=require('../../../js/milliFormat.js');//加载千元符

	$(function(){
		if ($(window).width() < 1105) {
			$(".rightTips").addClass("rightTipAuto")
		} else {
			$(".rightTips").removeClass("rightTipAuto")
		}
		$(window).scroll(function(){
			if($(window).scrollTop()>50){
				$(".go_top").css("visibility", "visible");
			}else{
				$(".go_top").css("visibility", "hidden");
			}
		});
		$(window).resize(function(){
			if ($(window).width() < 1105) {
				$(".rightTips").addClass("rightTipAuto");
			} else {
				$(".rightTips").removeClass("rightTipAuto");
			}
		});

		$(".go_top").click(function(){
			$('body,html').animate({scrollTop:0},800);
			return false;
		});

		//理财计算器
		var calCent='<div class="lay-cal">'+
	'<div class="top">'+
    	'<div class="tel">理财计算器</div>'+
       '<a class="close" href="javascript:void(0);">×</a>'+
   ' </div>'+
   ' <div class="tip"></div>'+
   ' <ul class="cal">'+
       ' <li><span class="l">项 目 金 额：</span><span class="r"><input class="txt" type="text" data-in="/^\\d*$/" maxlength="10" value="5000"/><i>元</i></span></li>'+
       ' <li><span class="l">年化收益率：</span><span class="r"><input class="txt" type="text"  data-in="/^\\d*\\.{0,1}(\\d{1,2})?$/" maxlength="5" value="13"/><i>%</i></span></li>'+
        '<li><span class="l">还 款 方 式：</span><select><option value="3">按月一次性还款</option><option value="0">按天一次性还款</option><option value="4">等额本息</option><option value="2">先息后本</option></select></li>'+
       ' <li><span class="l">项 目 期 限：</span><span class="r"><input class="txt" type="text"  data-in="/^\\d*$/" maxlength="3" value="1"/><i>月</i></span></li>'+
        '<li><span class="l">&nbsp;</span><a class="tocal" href="javascript:;">计算</a><a class="tores" href="javascript:;">重置</a>'+
       '</li>'+
   '</ul>'+
    '<h5>结 果 描 述：</h5>'+
    '<div class="tal">本 息 总 计：<span>0.00</span>元</div>'+
    '<div class="tal">应 收 利 息：<span>0.00</span>元</div>'+
    '<div class="tal">每月应收本息：<span>0.00</span>元</div>'+
    '<div class="tal">您将在最后一个月获得：<span>0.00</span>元</div>'+
'</div>';
		$("a.calculator").bind("click",function(event){
			event.preventDefault();
			$.dialog({
				title:false,
				width:430,
				height:480,
				lock: true,
				opacity: 0.5,
				background:'#000',
				//top:'30%',
				id:"calculator",
				resize:false,
				fixed:true,
				content:calCent,
				cancel:false,
				init:function(){
					//关闭弹出框
					$(".lay-cal .close").click(function(){$.dialog({id:'calculator'}).close();})
					//输入控制
					$(".lay-cal ul input[type='text']").each(function(index, element) {
                        var $th=$(this),record={num:""};
						$th.keyup(function(){
							var decimalReg=eval($th.attr("data-in")).test($th.val());
							if($th.val()!=""&&decimalReg){
								record.num=$th.val();
							}else{
								if($th.val()!=""){$th.val(record.num);}
							}
						});
                    });
					//重置
					$(".lay-cal .tores").click(function(){
						$(".lay-cal input[type='text']:eq(0)").val("");
						$(".lay-cal input[type='text']:eq(1)").val("");
						$(".lay-cal input[type='text']:eq(2)").val("");
						$(".lay-cal .tal").removeClass("cur");
						$(".lay-cal .tip").html("");
					})
					//按天一次性还款
					$(".lay-cal ul select").change(function(){
						var leb=$(".lay-cal ul li:eq(3)").find("i");
						if($(this).val()==0){leb.html("天");}else{leb.html("月");}
					});
					//计算
					var submitBtn=true;
					$(".lay-cal .tocal").click(function(){
						$(".lay-cal .tal").removeClass("cur");
						$(".lay-cal .tip").html("");
						$(".lay-cal ul input[type='text']").each(function(index, element) {
	                        var $th=$(this);
	                        if($th.val()==""){
	                        	submitBtn=false;
	                        	$(".lay-cal .tip").html($th.parent("span").siblings(".l").html().replace(/\s|：/g,"")+"不能为空");
	                        	return false;
	                        }
	                        if(!eval($th.attr("data-in")).test($th.val())){
	                        	submitBtn=false;
	                        	$(".lay-cal .tip").html("请输入正确的"+$th.parent("span").siblings(".l").html().replace(/\s|：/g,"")+"进行计算");
	                        	return false;
	                        }
	                        submitBtn=true;
	                    });
						if(!submitBtn){return false;}
						var amout=$(".lay-cal input[type='text']:eq(0)").val(),
							rate=$(".lay-cal input[type='text']:eq(1)").val(),
							type=$(".lay-cal select").val(),
							time=$(".lay-cal input[type='text']:eq(2)").val();
						var total,interest,month,last;
						switch(type){
							case "3"://按月一次性还款
							interest=parseFloat(amout*(rate/100)/12*time);
							total=interest+parseFloat(amout);
							break;
							case "0"://按天一次性还款
							interest=parseFloat(amout*(rate/100)/360*time);
							total=interest+parseFloat(amout);
							break;
							case "4"://等额本息
							month=(amout*(rate/100)/12*Math.pow((1+(rate/100/12)),time))/(Math.pow((1+(rate/100/12)),time)-1);
							total=month*time;
							interest=total-amout;
							$(".lay-cal .tal:eq(2)").addClass("cur").find("span").html(milFt.contUn(Number(month).toFixed(2)));
							break;
							case "2"://先息后本
							month=amout*rate/100/12;
							interest=Number(month).toFixed(2)*time;
							total=parseFloat(interest)+parseFloat(amout);
							last=parseFloat(month)+parseFloat(amout);
							$(".lay-cal .tal:eq(2)").addClass("cur").find("span").html(milFt.contUn(Number(month).toFixed(2)));
							$(".lay-cal .tal:eq(3)").addClass("cur").find("span").html(milFt.contUn(Number(last).toFixed(2)));
							break;
						}
						$(".lay-cal .tal:eq(0)").addClass("cur").find("span").html(milFt.contUn(Number(total).toFixed(2)));
						$(".lay-cal .tal:eq(1)").addClass("cur").find("span").html(milFt.contUn(Number(interest).toFixed(2)));
					});

				}
			});
			return false;
		});


	});
});
