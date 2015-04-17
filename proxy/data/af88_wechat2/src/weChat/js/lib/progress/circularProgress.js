(function($){
	/*
	 * 圆形进度条,基于Zepto,只限于移动端应用
	 */
	$.fn.circularProgress = function(color,param){
		var $this = this;
		if($this.length==0){ return; }
		//进度条颜色
		color = color || ["#e2e2e2","#cfa74a"];//底色,进度颜色
		//进度值,默认读取当前div的data属性
		param = param || "data";
		for(var i=0,ilen=$this.length;i<ilen; i++){
			var curItem = $this.eq(i),
				data = parseInt(curItem.attr(param)),
				deg1 = 0,
				deg2=0,
				linear = color[0];
			data = data<0 ? 0 : data>100 ? 100 : data;
			//计算进度值，过小或过大的进度值。固定一个相近值
			if(data>0 && data<0.5){
				data = 0.5;	
			}
			if(data>99.5 && data<100){
				data = 99.5;	
			}
			if(data>=50){
				deg1 = 270+(data-50)*3.6;
				deg2 = -90;
				linear= color[1];
			} else {
				deg1 = 90;
				deg2 = -270+data*3.6;
			}
			//利用css3的linear-gradient方法实现圆形的进度条
			curItem.css({
				"background-image":"-ms-o-gradient("+deg1+"deg,"+linear+" 50%,transparent 50%,transparent),-ms-o-gradient("+deg2+"deg,"+color[1]+" 50%,"+color[0]+" 50%,"+color[0]+")",
				"background-image":"-o-linear-gradient("+deg1+"deg,"+linear+" 50%,transparent 50%,transparent),-o-linear-gradient("+deg2+"deg,"+color[1]+" 50%,"+color[0]+" 50%,"+color[0]+")",
				"background-image":"-moz-linear-gradient("+deg1+"deg,"+linear+" 50%,transparent 50%,transparent),-moz-linear-gradient("+deg2+"deg,"+color[1]+" 50%,"+color[0]+" 50%,"+color[0]+")",
				"background-image":"-webkit-linear-gradient("+deg1+"deg,"+linear+" 50%,transparent 50%,transparent),-webkit-linear-gradient("+deg2+"deg,"+color[1]+" 50%,"+color[0]+" 50%,"+color[0]+")",
				"background-image":"linear-gradient("+deg1+"deg,"+linear+" 50%,transparent 50%,transparent),linear-gradient("+deg2+"deg,"+color[1]+" 50%,"+color[0]+" 50%,"+color[0]+")"
			});
		}
		return this;
	};
})(Zepto);