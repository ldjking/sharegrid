/*
 *name:dtt
 *time:2014.10.30
 *content:js配置文件   版本号以发布日期为准
*/

var version =eval(+(new Date));
var v = '20141211';
v = v === '' ? version : v;

seajs.config({
	// 别名配置
	alias: {
		'jquery':ctx + '/plugIn/jquery/1.10.2/jquery.min.js'
	},
	// 路径配置
	paths: {

	},

	// 映射
	map: [
		[/^(.*(init).*\.js)(.*)$/i, '$1?v='+v]
	],

	// 预加载项
	preload: [
		window.jQuery ? '' : 'jquery'
	],

	// Sea.js 的基础路径
	//base: '',
	// 文件编码
 	 charset: 'utf-8',

	// 调试模式
	debug: false
});
