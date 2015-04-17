/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
	//alert("我是login2");
	x.login={};
	//alert("set login");
	var page=x.login;
	page.css=["rs/login"];
	page.domStr=" <div class='login' id='login'><div class='top'><div class='title'>风电资产管理系统</div></div><div class='down' id='login_down'><table cellpadding='0' cellspacing='0' class='loginTable'><tr><td><div class='line'><div class='line1'></div><div class='line2'><label class='lbl account'>账户:</label><input type='text' class='txt' value='account'/></div><div class='line3'></div></div><div class='line'><div class='line1'></div><div class='line2'><label class='lbl pw'>密码:</label><input type='password' class='txt' value='account'/></div><div class='line3'></div></div><div class='remember'><input type='checkbox' class='check'/><label>记住密码</label><input type='checkbox' class='check'/><label>自动登录</label></div><div class='submit'><input type='button' class='button' value='登录' id='login_submit'/></div></td></tr></table></div></div>";
	page.dom=null;
	
	var loginClick=function(){
		require(["src/app.js"],loadAppBack);
		//fx3dRotate(page.dom,0,90,1,0.7,null,800,rotateBack);
	}
	
	var loadAppBack=function(){
		//require(["src/login.js"],loadPageBack);
		var pageApp=apps.app;
		pageApp.init();
		fx3dRotate(page.dom,0,90,1,0.7,null,800,function(){
				fx3dRotate(pageApp.dom,-90,0,0.7,1,null,800);
			});
	}
	
	page.init=function(){
		var panel=document.createElement("div");
		panel.innerHTML=page.domStr;
		panel.className="panel";
		var container=$("container");
		container.appendChild(panel);
		page.dom=panel;
		panel.className="panel active";
		$("login_submit").onclick=loginClick;
	}
	
	page.render=function(){
	}
	page.destroy=function(){
	}
}
)(apps);