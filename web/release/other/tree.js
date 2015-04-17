/*xlib.14out		输出  包括 test  out  msg三个输出函数*/
(function(x){	
	x.arrayTranJson = function(a) {
		var p = [];
		var flag = 0;
		for(var i=0;i<a.length;i++) {
			var obj = a[i];
			if(obj!=null&&obj.pid=="") {
				obj.type ="folder";
				p[flag] = obj;	
				getChild(p[flag],a);
				flag++;
			}
		}
		genTree({},p,$("#list"));
	}
				
	x.getChild =function(pobj,a) {
		var flag = 0;
		var c = [];
		for(var i=0;i<a.length;i++) {
			var cobj = a[i];
			if(cobj!=null&&cobj.pid==pobj.id) {
				cobj.type ="folder";
				c[flag] = cobj;	
				getChild(c[flag],a);
				flag++;
			}
		}
		if(c!=null&&c.length>0) {
			pobj.child = c;
			pobj.type ="folder";
		} else {
			pobj.type ="file";
		}
	}
})(window);
