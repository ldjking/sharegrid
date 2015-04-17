var taskbar={};
taskbar.currTask=null;/*当前任务*/
taskbar.tasks=[];//任务数组  存放的依然是iframe  当remove的时候

taskbar.e_task_click=function(evt){/*任务的激活*/
	var target=getTarget(evt);
	if(target.className.indexOf("taskCurr")>=0)	return;
	taskbar.showTask(target.frameDom);
	winManager.activeWin(target.frameDom);
}
taskbar.add=function(iframe){/*新增应用程序*/
	if(taskbar.currTask!=null){
		taskbar.hideCurr();
	}
	if(iframe!=null&&iframe.appCfg!=null){/*iframe相关的配置信息 appCfg*/
		var div=$e("div");
		div.style.backgroundImage="url(../../images/"+iframe.appCfg.img+")";
		setOpacity(div,0);
		div.className="taskCurr"
		var name=iframe.appCfg.taskName;
		if(name==null)	name=iframe.appCfg.name;
		if(name!=null)	div.innerHTML=name;
		$("#taskbar").appendChild(div);
		bind(div,"click",taskbar.e_task_click);
		div.frameDom=iframe;
		iframe.taskDom=div;
		taskbar.currTask=iframe;
		fxFadeIn(div,0,null);
	}
}
taskbar.showTask=function(iframe){
	if(taskbar.currTask!=null){
		taskbar.hideCurr();
	}
	if(iframe.taskDom!=null){/*要把这个task设为taskCurr样式*/
		var div=iframe.taskDom;
		/*要把这个对象快速移动到位置上*/
		div.className="taskTemp";
		var name=iframe.appCfg.taskName;
		if(name==null)	name=iframe.appCfg.name;
		if(name!=null)	div.innerHTML=name;
		////out("task left:"+getRect(div).left);
		var callback=function(){
			div.className="taskCurr";
			var p=indexOf(taskbar.tasks,div);
			for(var i=taskbar.tasks.length-1;i>=0&&i>p;i--){
				/*让所有在自己后面的对象的right数值重新计算*/
				var t=taskbar.tasks[i];
				////out("重新计算right值！",t);
				t.style.left="auto";
				t.style.right=(i-1)*40+90+"px";;/与i本身有关系/
			}
			////out("taskbar.tasks.length:"+taskbar.tasks.length);
			taskbar.tasks=rmArray(taskbar.tasks,div);/*把自身删掉*/
			////out("taskbar.tasks.length:"+taskbar.tasks.length);
			taskbar.currTask=iframe;
		}
		fxMove(div,null,0,0,null,callback);

	}

}
taskbar.hideCurr=function(){/*隐藏当前应用程序*/
	if(taskbar.currTask!=null){
		var task=taskbar.currTask.taskDom;
		var callback=function(){
			task.className="task";
			task.style.left="auto";
			task.style.right=taskbar.tasks.length*40+90+"px";
			taskbar.tasks.push(task);
			taskbar.currTask=null;
		}
		task.innerHTML="";
		fxFadeOut(task,0,500,callback);/*更加快速地消失*/
		fxFadeIn(task);
		/*变成动画* 逐渐隐藏*/ 
	}
}
taskbar.setCurr=function(app,iframe){/*设置当前任务*/
	$("#taskbarCurr").style().backgroundImage="url(../../images/obj/"+app.img+")";
	$("#taskbarCurr").html(app.name);
	if(iframe!=null)	$("#taskbarCurr").attr("frame",iframe);
	$("#taskbarCurr").opacity(1);
}

taskbar.closeTask=function(task){//关闭任务	
	if(task.parentNode!=null){
		task.parentNode.removeChild(task);
	}
}