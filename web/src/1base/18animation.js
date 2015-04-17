/*xlib.21animation		动画类*/
function Animation(conf){/*高级动画，允许执行自定义函数 自定义函数能够产生效果并判断是否中止  这个动画的run操作里可以自定义自身*/
	this.runState=false;
	this.timer=null;	/*一个动画只能保持一个定时器*/
	this.tasks=[];		/*一个动画里可以有多项任务 每个task里是*/	
	var _interval=17;	/*执行间隔*/
	this.conf=conf;		/*配置文件  可以配置的属性包括执行间隔  执行完的回调函数*/
	if(conf&&conf._interval)	_interval=conf._interval;
	this.run=function(cfg){/*run方法要求提供 fun*/
		var am_rate=function(b,g){/*b是时间 总次数//引入v和s的概念*/
			var s=b*g/4*b;//平均速度乘以时间
			var s2=[];
			var r=[];
			for(var t=1;t<=b;t++){
				if(t<=b/2)	{s2[t]=g*t*t/2;}
				else{
					var d=t-b/2;
					s2[t]=g*b*b/8+g*b*d/2-g*d*d/2;
				}
				r[t]=s2[t]/s;
			}
			return r;
		}
		this.runState=true;
		if(cfg){
			cfg.excuteTime=null;
			if(cfg.time==null)	cfg.time=600;
			//if(isIE)	var _time=cfg.time*0.5;
	
			cfg.totalTime=Math.floor(cfg.time/_interval);
			cfg.rates=am_rate(cfg.totalTime,10);//总次数 和加速度
			/*总执行次数*/
			this.tasks.push(cfg);/*将动画参数装到任务中去*/
			if(this.timer==null){
				var _this=this;
				this.timer=setInterval(function(){_this.run()},_interval);
			}
			return this;
		}
		var cfg=this.tasks[0];/*获取第一项任务*/
		if(cfg.excuteTime==null){/*首次执行该任务*/
			cfg.excuteTime=0;
			cfg._delay=cfg.delay;//另外保存一个延迟			
		}
		if(isNum(cfg._delay)){
			cfg._delay-=_interval;
			if(cfg._delay>0){/*仍然处于延迟期间*/
				return this;
			}
		}
		cfg.excuteTime++;/*每次执行事件增加*///然后执行用户自定义函数，fun能够自动执行
		if(isFun(cfg.fun)){
			var x=cfg.fun(cfg);//执行这个特效
			if(x==true){//返回true代表终结/
				cfg.excuteTime=null;
				this.tasks.shift();//删除掉顶部
				if(cfg.callBack){//如果执行完还有触发事件
					cfg.callBack();
				}
			}
		}
		if(this.tasks.length==0){/*结束任务*/
			clearInterval(this.timer);
			this.timer=null;
			this.runState=false;
		}
		return this;
	}
	this.pause=function(){/*暂停事件的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
	}
	this.start=function(){/*启动事件*/
		var _this=this;
		this.timer=setInterval(function(){_this.run()},_interval);
	}
	this.clear=function(){/*清除动画的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
		this.tasks=[];
	}
}
