/*xlib.01  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
	var DOC=document;
	x.getBasePath=function(){
            var result = "",m;
            try{
                a.b.c();
            }catch(e){
                if(e.fileName){//firefox
                    result = e.fileName;
                }else if(e.sourceURL){//safari
                    result = e.sourceURL;
                }else if(e.stacktrace){//opera9
                    m = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m);
                    if (m && m[1])
                        result =  m[1]
                }else if(e.stack){//chrome 4+
                    m= e.stack.match(/\(([^)]+)\)/)
                    if (m && m[1])
                        result = m[1]
                }
            }
            if(!result){//IE与chrome4- opera10+
                var scripts = document.getElementsByTagName("script");
                var reg = /dom([.-]\d)*\.js(\W|$)/i,src
                for(var i=0, el; el = scripts[i++];){
                    src = !!document.querySelector ? el.src:
                    el.getAttribute("src",4);
                    if(src && reg.test(src)){
                        result = src
                        break;
                    }
                }
            }
            return result.substr( 0, result.lastIndexOf('/'));
        }
		
	x.getCurrentScript=function() {
		//取得正在解析的script节点
		if(DOC.currentScript) { //firefox 4+
			return DOC.currentScript.src;
		}
		// 参考 https://github.com/samyk/jiagra/blob/master/jiagra.js
		var stack;
		try {
			a.b.c(); //强制报错,以便捕获e.stack
		} catch(e) {//safari的错误对象只有line,sourceId,sourceURL
			stack = e.stack;
			if(!stack && window.opera){
				//opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
				stack = (String(e).match(/of linked script \S+/g) || []).join(" ");
			}
		}
		if(stack) {
			/**e.stack最后一行在所有支持的浏览器大致如下:
			*chrome23:
			* at http://113.93.50.63/data.js:4:1
			*firefox17:
			*@http://113.93.50.63/query.js:4
			*opera12:
			*@http://113.93.50.63/data.js:4
			*IE10:
			*  at Global code (http://113.93.50.63/data.js:4:1)
			*/
			stack = stack.split( /[@ ]/g).pop();//取得最后一行,最后一个空格或@之后的部分
			stack = stack[0] == "(" ? stack.slice(1,-1) : stack;
			//return stack.replace(/(:\d+)?:\d+$/i, "");//去掉行号与或许存在的出错字符起始位置
		}
		var nodes = document.getElementsByTagName("script"); //只在head标签中寻找
		for(var i = 0, node; node = nodes[i++];) {
			if(node.readyState === "interactive") {
				return node.className = node.src;
			}
		}
	}
})(window);
