//loading
(function($){
	/*
	 * 检测各种文件类型
	*/
    $.type = function (o) {
        var _toS = Object.prototype.toString;
        var _types = {
            'undefined': 'undefined',
            'number': 'number',
            'boolean': 'boolean',
            'string': 'string',
            '[object Function]': 'function',
            '[object RegExp]': 'regexp',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object Error]': 'error'
        };
        return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');
    };
	/*
	 * loading方法
	 * text->loading文字,可选
	 * cla->loading附加样式,以空格隔开,可选
	*/
	$.fn.loading = function(text,cla){
		text = text ? "<span>"+text+"</span>" : "";
		cla = cla ? " " +cla : "";
		this.html("<div class='wx_loading"+cla+"'>"+text+"</div>");
		if(!text){ return; }
		var loading = this.find(".wx_loading"),
		winWidth = $(window).width(),
		textWidth = loading.find("span").width();
		loading.css({"background-position":(winWidth-textWidth-50)/2+" center"});
		return this;
	};
	/*
	 * 获取模板、数据并生成列表
	 * args->参数对象{}
	 * args.tpl ->模板URL
	 * args.data->数据URL
	 * args.fn ->回调函数
	 * args.error ->错误提示对象{}
	 * args.error.tpl->请求模板发生错误时的提示
	 * args.error.data->请求数据发生错误时的提示
	*/
	$.fn.render = function(args){
		if(!args || $.type(args)!=="object"){ return; }
		if(!args.tpl || !args.data){ return; }
		var $this = this;
		//error
		var error = {};
		if($.type(args.error)==="object"){
			error = args.error;
		}
		//get template
		$.ajax({
			url:args.tpl,
			beforeSend: function(){
				$this.loading();
			},
			success:function(template){
				if(args.data){
					//get data;
					$.ajax({
						url:args.data+"?"+new Date().getTime(),
						dataType:"json",
						success:function(data){
							var html = doT.template(template)(data);
							$this.html(html);
							if(args.fn && $.type(args.fn)==="function"){
								args.fn(data);	
							}
						},
						error:function(xhr,err){
							if(error.data){
								$this.html(error.data);
							}
						}
					});
				}
			},
			error:function(xhr,err){
				if(error.tpl){
					$this.html(error.tpl);
				}
			}
		});
		return this;
	};
	/*
	 * 错误提示方法(tips)
	*/
	$.tips = function(error,callback){
		if(error){
			return '<div class="wx_tip">'+error+'</div>';
		}
	};
	/*
	 * 获取hash
	*/
	$.getHash = function(){
		var hash = location.hash.replace("#","");	
		return hash;
	}
	/*
	 * tiem format时间格式化
	 * time->单位为秒
	 */
	$.formatTime = function(time){
		var days_second = 86400; // 一天的秒数
		var hours_second = days_second / 24;
		var minute_second = hours_second / 60;
		var str = "";
		if (time >= 0) {
			var days = parseInt(time / days_second);
			str += (days > 0) ? days + "天": "";
			var hours = parseInt((time - days * days_second) / hours_second);
			str += hours > 0 ? hours + "时": "";
			var minutes = parseInt((time - days * days_second - hours_second * hours) / minute_second);
			str += minutes > 0 ? minutes + "分": "";
			second = time - days * days_second - hours_second * hours - minutes * minute_second;
			str += second + "秒";					
		}
		return str;
	};
	/*
	 * 进度处理方法,保持为整数
	*/
	$.formatProgress = function(amount,hasInvestAmount){
		if(!amount || !hasInvestAmount){ return "0"; }
		var progress = (hasInvestAmount/amount)*100;
		if(progress>0 && progress<1){
			progress = 1;
		} else if(progress>99 && progress<100){
			progress = 99;
		} else {
			progress = Math.round(progress);
		}
		return progress;
	}
	
})(Zepto);

//check type
