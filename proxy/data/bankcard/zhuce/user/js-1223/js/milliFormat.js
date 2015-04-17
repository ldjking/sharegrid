/*
 *name:dtt
 *time:2014.10.30
 *content:千元符、千元符加后两位小数点
*/
define(function(require, exports, module) {
	//千元符
	exports.commafy=function(num){
		num = num + "";
		var re = /(-?\d+)(\d{3})/;
		while (re.test(num)) {
			num = num.replace(re, "$1,$2");
		}
		return num;
	};
	exports.contUn=function(tmp){
		var s=tmp.toString().replace(/^(\d*)$/,"$1.");
		s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
		s=s.replace(".",",");
		var re=/(\d)(\d{3},)/;
		while(re.test(s))
		s=s.replace(re,"$1,$2");
		s=s.replace(/,(\d\d)$/,".$1");
		s=s.replace(/^\./,"0.");
		return s;
	}
});