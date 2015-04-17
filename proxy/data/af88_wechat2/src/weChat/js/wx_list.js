$(function(){
	//需要请求的数据URL
	var data = {
		axn:{
			tpl:"http://www.xiaoniu88.com/weChat/tpl/list_axn.tpl",
			data:"http://www.xiaoniu88.com/weChat/data/list_axn.txt",	
		},
		sanbiao:{
			tpl:"http://www.xiaoniu88.com/weChat/tpl/list_sanbiao.tpl",
			data:"http://www.xiaoniu88.com/weChat/data/list_sanbiao.txt"
		}
	}
	
	//ajax拉取列表
	function render(tpl,data){
		var wx_investList = $("#wx_investList");
		var params = {
			tpl:tpl,
			data:data,
			fn:function(data){
				//循环倒计时
				$(".wx_list_countdown").each(function(index, element) {
				   $(this).countdown("left_time_int",function($this,str){
						$this.find("ins").html(str);
						if(str=="0秒"){
							$this.parents(".wx_list_info").find(".wx_progress").show();
							$this.parent().remove();
						}
					},true);
				});
			}
		};
		wx_investList.render(params);
	}
	//tabs
	var wx_tabs = $("#wx_listTab");
	function list(hash){
		hash = hash || "axn";
		wx_tabs.find("a").removeClass("select");
		$("#wx_tab_"+hash).addClass("select");
		var d = data[hash];
		if(d){
			render(d.tpl,d.data);
		}
	}
	
	//hashChange
	window.onhashchange = function(){
		list($.getHash());
	};
	
	//init
	!function(){
		list($.getHash());
	}();
});