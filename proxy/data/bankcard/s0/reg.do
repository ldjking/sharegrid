<input type="hidden" id="xn_path" value="http://test1.xiaoniu88.com/" />
<script>
	function getQuery(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return "";
	}
	var path = document.getElementById("xn_path").value;
	var href = window.location.href;
	var param = getQuery("param");
	if(param.length > 0){
		param = "/param/" + param;
	}
	var lastStr = path.substring(path.length-1,path.length);
	path=lastStr=="/"?path.substring(0,path.length-1):path;
	
	window.location.replace(path + "/user/register" + param);
</script>
