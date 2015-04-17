/*xlib.11base start  最基础代码 常用判断函数  和判断浏览器*/
(function(x){
	x.chart={};
	var page=x.chart;
	page.css=["rs/login"];
	page.domStr="<div class='chart' id='chart'><div class='top'><div class='back' id='chart_back'></div><div class='title'>经营统计</div></div><div class='down' id='chart_down'><table cellpadding='0' cellspacing='0'><tr><td><div id='canvasDiv1'></div><div id='canvasDiv2'></div><div id='canvasDiv3'></div></td></tr></table></div></div>";
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
		$("chart_back").onclick=e_back_click;
		panel.className="panel ready";
		renderChart1();
		//panel.className="panel active";
	}
	
	var renderChart1=function(){
		var data = [	
			{	
				name : '合同额',
				value:[400,800,1400,1600,1900],
				color:'#aad0db',
				line_width:2
			},
			{
				name : '利润额',
				value:[100,130,160,200,270],
				color:'#f68f70',
				line_width:2
			}
		];
		var labels = ["2008年","2009年","2010年","2011年","2012年"];
		var cfg={
			render : 'canvasDiv1',
			data: data,
			title : '三峡高科经营统计图',
			width : 300,
			height : 300,
			animation:true,//是否启用过渡动画,false则跳过过渡动画.(默认为false)
			animation_timing_function:'easeOut',
			border:	{color:"#cccccc",width:0},
			legend : {
				enable : true,
				row:1,//设置在一行上显示，与column配合使用
				column : 'max',
				valign:'top',
				background_color:null,//设置透明背景
				offsetx:-30,//设置x轴偏移，满足位置需要
				border : false 
			},
			tip:{
				enable : true,
				listeners:{
					//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
						parseText:function(tip,name,value,text,i){
						return name+":"+labels[i]+"为:"+value+"万";
					}
				}
			},
			crosshair:{
				enable:true,
				line_color:'#62bce9',
				line_width:2
			},
			sub_option:{
				label:false,
				event_range_x:10,//x轴方向事件触发范围。单位px。此项会根据点的平均分布自动计算。(默认为0)
				event_range_y:10,//y轴方向事件触发范围。单位px。默认为配置项point_size的大小。
				point_size:10 ,
				limit_y:true,//为真时，事件仅当进入y轴事件范围(配置项event_range_y)内才触发。否则只考虑x轴。(默认
				listeners:{
					click:function(target,e,param){
						var year=param.i+2008;
						var type=param.name=='合同额'?'contract':'profit';
						renderChart2(year,type);
					}
				}
			},
			background_color:'#f2f2f2',
			coordinate:{
				axis : {
					color:'#4e5464',
					width : [0, 0, 2, 0]
				},
				
				background_color:'#ffffff',
				width:'76%',
				height:'75%',
				offsetx:20,
				scale:[
						{
							position:'left',	
							tart_scale:100,
							end_scale:2400,
							scale_space:600,
							scale_enable:false,//禁用小横线
							listeners:{
								parseText:function(t,x,y){
										return {text:t+"万"}
								}
							}
						},
						{
							position:'bottom',	
							start_scale:1,
							end_scale:12,
							parseText:function(t,x,y){
								return {textY:y+10}
							},
							labels:labels
						}
				]
			}
		}
		for(var p in iChart){
			//alert(p);
		}
		var chart = new iChart.Area2D(cfg);
		chart.draw();
	}
	
	
	var renderChart2=function(year,type){
			//var year=p.substr(p.indexOf('year=')+5);
			//var type=p.substring(p.indexOf('type=')+5,p.indexOf('&'));
			var width=300;
			var height=220;
			if(year==null)	year=2012;
			if(type==null)	type="profit";
			//alert("renderChart2");
			var canvasDiv1=document.getElementById("canvasDiv1");
			//alert(canvasDiv1.outerHTML);
			canvasDiv1.style.display="none";
			var endscale=(type=='contract')?{2008:400,2009:800,2010:1400,2011:1600,2012:1900}
			:{2008:100,2009:130,160:1400,2011:200,2012:270};
			var name=(type=='contract')?'合同额':'利润额';
			var bartitle='三峡高科'+year+'年'+name+'统计';
			var pietitle='三峡高科'+year+'年'+name+'统计';
			//value:[400,800,1400,1600,1900],
			//value:[100,130,160,200,270]
			var data = {2008:{contract:[
			        	{name : 'TGP事业部',value : 150,color:'#a5c2d5'},
			        	{name : 'EAM事业部',value : 100,color:'#cbab4f'},
			        	{name : '研发部',value :90,color:'#76a871'},
			        	{name : '技术支持部',value :60,color:'#9f7961'}
						],
						profit:[
							{name : 'TGP事业部',value : 30,color:'#a5c2d5'},
							{name : 'EAM事业部',value : 40,color:'#cbab4f'},
							{name : '研发部',value : 15,color:'#76a871'},
							{name : '技术支持部',value : 25,color:'#9f7961'}
						]},
						2009:{contract:[
			        	{name : 'TGP事业部',value : 290,color:'#a5c2d5'},
			        	{name : 'EAM事业部',value : 200,color:'#cbab4f'},
			        	{name : '研发部',value : 200,color:'#76a871'},
			        	{name : '技术支持部',value : 110,color:'#9f7961'}
						],
						profit:[
							{name : 'TGP事业部',value : 60,color:'#a5c2d5'},
							{name : 'EAM事业部',value : 30,color:'#cbab4f'},
							{name : '研发部',value : 20,color:'#76a871'},
							{name : '技术支持部',value :20,color:'#9f7961'}
						]},
						2010:{contract:[
			        	{name : 'TGP事业部',value : 800,color:'#a5c2d5'},
			        	{name : 'EAM事业部',value : 200,color:'#cbab4f'},
			        	{name : '研发部',value : 300,color:'#76a871'},
			        	{name : '技术支持部',value : 100,color:'#9f7961'}
						],
						profit:[
							{name : 'TGP事业部',value : 80,color:'#a5c2d5'},
							{name : 'EAM事业部',value : 35,color:'#cbab4f'},
							{name : '研发部',value : 25,color:'#76a871'},
							{name : '技术支持部',value : 20,color:'#9f7961'}
						]},
						2011:{contract:[
			        	{name : 'TGP事业部',value : 1000,color:'#a5c2d5'},
			        	{name : 'EAM事业部',value :300,color:'#cbab4f'},
			        	{name : '研发部',value : 200,color:'#76a871'},
			        	{name : '技术支持部',value :100,color:'#9f7961'}
						],
						profit:[
							{name : 'TGP事业部',value : 100,color:'#a5c2d5'},
							{name : 'EAM事业部',value : 40,color:'#cbab4f'},
							{name : '研发部',value : 40,color:'#76a871'},
							{name : '技术支持部',value : 20,color:'#9f7961'}
						]},
						2012:{contract:[
			        	{name : 'TGP事业部',value : 1100,color:'#a5c2d5'},
			        	{name : 'EAM事业部',value : 300,color:'#cbab4f'},
			        	{name : '研发部',value : 200,color:'#76a871'},
			        	{name : '技术支持部',value : 200,color:'#9f7961'}
						],
						profit:[
							{name : 'TGP事业部',value : 150,color:'#a5c2d5'},
							{name : 'EAM事业部',value : 70,color:'#cbab4f'},
							{name : '研发部',value : 30,color:'#76a871'},
							{name : '技术支持部',value : 20,color:'#9f7961'}
						]}};

        	

			new iChart.Bar2D({
				render : 'canvasDiv2',
				
				data: data[year][type],
				title : bartitle,
				showpercent:true,
				decimalsnum:2,
				width : width,
				height : height,
				offsety:-20,
				animation:true,//是否启用过渡动画,false则跳过过渡动画.(默认为false)
				animation_timing_function:'easeOut',
				tip:{//提示框的配置项.详情请参考 iChart.Tip Note:设置为false表示禁用提示框。(默认为false
							enable:true,
							move_duration:200,
							listeners:{
								parseText:function(tip,name,value,text,i){
									return name+" "+value+"万";
								}
							}
				},
				coordinate:{
					width:220,
					offsetx:30,
					axis : {
						color:'#4e5464',
						width : [0, 0, 2, 0]
					},
					scale:[{
						 position:'bottom',	
						 start_scale:10,
						 end_scale:endscale[year],
						 scale_space:(endscale[year]-10)/5,
						 listeners:{
							parseText:function(t,x,y){
								return {text:t+"（万）"}
							}
						},
						label : {
							fontsize:11,
							textAlign:'right',
							textBaseline:'middle',
							rotate:-45,
							color : '#666666'
						}
					}]
					
				},
				sub_option:{
					listeners:{
							parseText:function(d, t){
									return d.get('value')+"万";
							}
						}
				}
			}).draw();
			new iChart.Pie3D({
					render : 'canvasDiv3',
					animation:true,//是否启用过渡动画,false则跳过过渡动画.(默认为false)
					animation_timing_function:'easeOut',
					data: data[year][type],
					title : null,
					offsetx:30,
					legend : {
						offsety:10,
						enable : false

					},
					sub_option : {
						mini_label_threshold_angle : 50,//迷你label的阀值,单位:角度
						mini_label:{//迷你label配置项
							fontsize:9,
							fontweight:600,
							color : '#ffffff'
						},
						label : {
							background_color:null,
							padding:'0 4',
							border:{
								enable:false,
								color:'#666666'
							},
							fontsize:9,
							color : '#4572a7'
						},
						border : {
							width : 2,
							color : '#ffffff'
						}
					},
					showpercent:true,
					decimalsnum:2,
					width : width,
					height : height,
					radius:140
				}).draw();

	};
	
	page.render=function(){
	}
	page.destroy=function(){
	}
	
	//page.init();
})(apps);