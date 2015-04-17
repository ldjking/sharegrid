/*xlib.15dom  文档对象辅助  包括筛选器 $  等函数*/
(function(x){
	
	x.enableCheck =function(obj,jsonObj) {
		var objs = $("input");
		for(var i=0;i<objs.length;i++) {
			var obj = objs[i];
			var dt = obj.getAttribute("dt");
			if(dt!=null&&dt=="num") {
				bind(obj,"keypress",function() {
						var keyCode = event.keyCode;
						if(keyCode>=48&&keyCode<=57) {
						} else {
							event.returnValue = false;
						}
				});
			}
		}
		if(isArray(obj)){
			for(var i=0;i<obj.length;i++) {
				Check(obj[i],jsonObj);
				
			}
		} else {
			Check(obj,jsonObj);
		}
	}
	
	x.prompt =function(str) {
		alert("请输入正确的"+str);	
	}
	
	x.Check = function(obj,jsonObj) {
			var obj = obj;
			var typename = jsonObj.typename;
			dt = typename;
			var flag = true;
			if(dt!=null&&dt=="num") {
				bind(obj,"keypress",function() {
						var keyCode = event.keyCode;
						if(keyCode>=48&&keyCode<=57) {
						} else {
							event.returnValue = false;
						}
				});
			}
			
			if(dt!=null&&dt=="email") {
				bind(obj,"blur",function() {
						if(isEmail(this.value)) {
							//return true;	
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
			
			if(dt!=null&&dt=="decimal") {
				bind(obj,"blur",function() {
						if(isDecimal(this.value)) {
								
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
			
			if(dt!=null&&dt=="url") {
				bind(obj,"blur",function() {
						if(isUrl(this.value)) {
							
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
			
			if(dt!=null&&dt=="phone") {
				bind(obj,"blur",function() {
						if(isPhone(this.value)) {
							
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
			
			if(dt!=null&&dt=="mobile") {
				bind(obj,"blur",function() {
						if(isMobile(this.value)) {
							
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
			
			if(dt!=null&&dt=="postcode") {
				bind(obj,"blur",function() {
						if(isPostcode(this.value)) {
								
						} else {
							flag = false;
							prompt(dt);
						}
				});
			}
	}
	 
	
	
	x.isNum=function(obj){ /*验证零和非零开头的正数字*/
		var s = obj;
		var b = false;
		var patrn=/^(0|[1-9][0-9]*)$/; 
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isDecimal=function(obj) {
		var s = obj;
		var b = false;
		var patrn= /^(-?\d+)(\.\d+)?$/;
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isUrl=function(obj) {
		var s = obj;
		var b = false;
		var patrn= /^((https|http):\/\/)((\w)(\.)*)+(\?)?/;
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isMobile=function(obj) {
		var s = obj;
		var b = false;
		var patrn= /^1[0-9]{10}$/;
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isPhone=function(obj) {
		var s = obj;
		var b = false;
		var patrn=/^((0\d{2,3})-)(\d{7,8})$/;
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isPostcode=function(obj) {
		var s = obj;
		var b = false;
		var patrn= /^[1-9][0-9]{5}$/;
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
	x.isEmail=function(obj){ /*验证零和非零开头的正数字*/
		var s = obj;
		var b = false;
		var patrn= /^(\w)+@(\w)+(\.\w)+/; 
		if (patrn.exec(s))  {
			b = true;
		} else {
			b = false;
		}
		return b;
	}
	
})(window);

	