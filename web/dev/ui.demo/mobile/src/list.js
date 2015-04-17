/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
	x.list={};
	var page=x.list;
	page.css=["rs/login"];
	page.domStr="<div class='panel active'><div class='list' id='list'><div class='top'><div class='back' id='list_back'></div><div class='title'>运行日志</div></div><div class='down' id='list_down'> <table cellpadding='0' cellspacing='0' class='state1'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>正在值班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table><table cellpadding='0' cellspacing='0'><tr><td class='person'>李政伟</td><td class='when'>2013-1-27 10:54</td><td class='state'>已被接班</td></tr><tr><td class='dep'>运行一值</td><td class='persons' colspan='2'>王志华 刘东杰 陈赟 张进 唐骏 何小勇 郭晓松</td></tr></table></div></div></div>";
	page.dom=null;

	var e_back_click=function(evt){/*把自己隐藏  把应用程序展开*/
			fx3dRotate(page.dom,0,90,1,0.7,null,800,function(){
				fx3dRotate(x.app.dom,-90,0,0.7,1,null,800);
			});
	}
	
	page.init=function(){
		var panel=document.createElement("div");
		panel.innerHTML=page.domStr;
		panel.className="panel";
		var container=$("container");
		container.appendChild(panel);
		page.dom=panel;
		$("list_back").onclick=e_back_click;
		panel.className="panel ready";
		
		//panel.className="panel active";
	}
	
	page.render=function(){
	}
	page.destroy=function(){
	}
}
)(apps);