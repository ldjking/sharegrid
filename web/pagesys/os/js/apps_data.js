/*数据定义  这里定义的是桌面应用程序 
	数据结构：  	name	应用程序名称
				img		图像地址
				url		应用程序页面
				type	分类
*/
var os_apps_modules=[
	{name:"Fav",cname:"常用功能",id:1},/*比如计算器  日历  通讯工具  绘图工具  帮助系统  */
	{name:"Utils",cname:"设备管理",id:2},/*比如计算器  日历  通讯工具  绘图工具  帮助系统  */
	{name:"Basics",cname:"运行管理",id:3},/*比如人员管理  群组管理  公司管理  组织机构管理   如果若干个公司来用这个系统怎么管理*/
	{name:"Business",cname:"物资模块",id:4},/*比如合同  固定资产  设备设施*/
	{name:"KPI",cname:"资料管理",id:5},/*关键绩效指标统计*/
	//{name:"Document",cname:"人力资源",id:6},/*Word Excel PPT Project  PDF*/
	//{name:"Develop",cname:"合同管理",id:7},/*比如应用程序注册  lov值列表开发  后端方法定义  授权管理等*/
	//{name:"Develop",cname:"生产实时",id:8},/*比如应用程序注册  lov值列表开发  后端方法定义  授权管理等*/
	{name:"Base",cname:"基础数据",id:6},/*比如应用程序注册  lov值列表开发  后端方法定义  授权管理等*/
	{name:"Develop",cname:"开发管理",id:7},/*比如应用程序注册  lov值列表开发  后端方法定义  授权管理等*/

	//{name:"Develop",cname:"实物资产",id:10}/*比如应用程序注册  lov值列表开发  后端方法定义  授权管理等*/

]
var os_apps=[
	{name:'待办事项',img:"appIcon/piao1.png",type:1,url:"../../page/workorder/mytodo.html"},
	{name:'第二种工作票',img:"appIcon/piao5.png",type:1,url:"../../page/workorder/workorder.html"},
	{name:'设备台账',img:"appIcon/shebei.png",type:1,url:"../../page/device/asset.html"},
	{name:'运行日志',img:"appIcon/rizhi2.png",type:1,url:"../../page/duty/duty.html"},	
	{name:'钥匙管理',img:"appIcon/rizhi2.png",type:1,url:"../../page/duty/key.html"},	
	{name:'组织机构',img:"appIcon/org.png",type:1,url:"../../page/org.html"},
	{name:'人员管理',img:"appIcon/person.png",type:1,url:"../person/person.html"},
	{name:'角色管理',img:"appIcon/role.png",type:1,url:"../role/role.html"},
	{name:'方法管理',taskName:"方法管理",img:"appIcon/engine.png",type:1,url:"../method/method.html"},
	{name:'方法测试',img:"appIcon/engine_test.png",type:1,url:"../method/method_test.html"},
	{name:'页面开发',img:"appIcon/dw.png",type:1,url:"../dw/dw.html"},
	
	{name:'设备台账',img:"appIcon/shebei.png",type:2,url:"../../page/device/asset.html"},
	{name:'缺陷管理',img:"appIcon/quexian.png",type:2,url:"../../page/device/debug.html"},	
	{name:'待办事项',img:"appIcon/piao1.png",type:2,url:"../../page/workorder/mytodo.html"},
	{name:'第一种工作票',img:"appIcon/piao5.png",type:2,url:"../../page/device/writ1.html"},
	{name:'第二种工作票',img:"appIcon/piao5.png",type:2,url:"../../page/device/writ2.html"},
	{name:'机械工作票',img:"appIcon/piao6.png",type:2},
	{name:'一级动火工作票',img:"appIcon/piao2.png",type:2},
	{name:'二级动火工作票',img:"appIcon/piao3.png",type:2},
	{name:'设备维修保养计划',img:"appIcon/piao4.png",type:2,url:"../../page/device/byjh.html"},

	{name:'运行日志',taskName:"运行日志",img:"appIcon/rizhi2.png",type:3,url:"../../page/duty/duty.html"},
	{name:'倒闸操作票',taskName:"倒闸操作票",img:"appIcon/piao11.png",type:3,url:"../../page/duty/dzczp.html"},
	{name:'倒闸操前检测',taskName:"倒闸操前检测",img:"appIcon/piao11.png",type:3,url:"../../page/duty/dzczcheck_q.html"},
	{name:'倒闸操后检测',taskName:"倒闸操后检测",img:"appIcon/piao11.png",type:3,url:"../../page/duty/dzczcheck_h.html"},
	{name:'定期工作设置',taskName:"定期工作设置",img:"appIcon/dingqi.png",type:3,url:"../../page/duty/regjob.html"},
	{name:'开关动作次数',taskName:"开关动作次数",img:"appIcon/piao12.png",type:3,url:"../../page/duty/kgfh.html"},
	{name:'调度指令',taskName:"调度指令",img:"appIcon/piao12.png",type:3,url:"../../page/duty/ddzl.html"},
	{name:'钥匙管理',taskName:"钥匙管理",img:"appIcon/caigou.png",type:3,url:"../../page/duty/key.html"},
	{name:'解锁管理',taskName:"解锁管理",img:"appIcon/caigou.png",type:3,url:"../../page/duty/deblock.html"},
	{name:'地刀（地线）',taskName:"地刀（地线）",img:"appIcon/lei.png",type:3,url:"../../page/duty/dx.html"},
	{name:'有载调压分接开关',taskName:"有载调压分接开关",img:"appIcon/kaiguan.png",type:3,url:"../../page/duty/fjkg.html"},
	{name:'继电保护',taskName:"继电保护",img:"appIcon/quexian.png",type:3,url:"../../page/duty/bh.html"},
	{name:'开停机',taskName:"开停机",img:"appIcon/kaiguan2.png",type:3,url:"../../page/duty/ktj.html"},
	{name:'温度测试',taskName:"温度测试",img:"appIcon/engine_test.png",type:3,url:"../../page/duty/testwd.html"},
	{name:'巡检记录',taskName:"巡检记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/xjjl.html"},
	{name:'避雷器记录',taskName:"避雷器记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/blqfd.html"},
	{name:'柴油定期启动记录',taskName:"柴油定期启动记录",img:"appIcon/dingqi.png",type:3,url:"../../page/duty/cydqcheck.html"},
	{name:'消防设备检查记录',taskName:"消防设备检查记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/xfcheck.html"},
	{name:'巡回检查记录管理',taskName:"巡回检查记录管理",img:"appIcon/contract80.png",type:3,url:"../../page/duty/xhcheck.html"},
	{name:'油位监视检查记录',taskName:"油位监视检查记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/ywcheck.html"},
	{name:'直流系统巡检记录',taskName:"直流系统巡检记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/zlxtcheck.html"},
	{name:'微机保护定期巡查',taskName:"微机保护定期巡查",img:"appIcon/contract80.png",type:3,url:"../../page/duty/wjbhcheck.html"},
	{name:'跳合闸记录',taskName:"跳合闸记录",img:"appIcon/contract80.png",type:3,url:"../../page/duty/dlqthzrun.html"},


	{name:'物资台账',taskName:"物资台账",img:"appIcon/wuzi.png",type:4,url:"../../page/material/item.html"},
	{name:'物资分类',taskName:"物资分类",img:"appIcon/code.png",type:4,url:"../../page/material/code.html"},
	{name:'供应商管理',taskName:"供应商管理",img:"appIcon/supply.png",type:4,url:"../../page/material/company.html"},
	{name:'仓库管理',taskName:"仓库管理",img:"appIcon/store.png",type:4,url:"../../page/material/store.html"},
	{name:'库存',taskName:"库存",img:"appIcon/chanpin.png",type:4,url:"../../page/material/inventory.html"},
	{name:'需求计划',taskName:"需求计划",img:"appIcon/xuqiu.png",type:4,url:"../../page/material/pr.html"},
	{name:'采购单',taskName:"采购单",img:"appIcon/caigou.png",type:4,url:"../../page/material/po.html"},
	{name:'领料单',taskName:"领料单",img:"appIcon/mrf.png",type:4,url:"../../page/material/mrf.html"},
	{name:'入库单',taskName:"入库单",img:"appIcon/ruku.png",type:4,url:"../../page/material/rkd.html"},
	{name:'发料单',taskName:"发料单",img:"appIcon/fld.png",type:4,url:"../../page/material/fld.html"},
	{name:'发票',taskName:"发票",img:"appIcon/invoice.png",type:4,url:"../../page/material/invoice.html"},
	{name:'退料单',taskName:"退料单",img:"appIcon/tuiku.png",type:4,url:"../../page/material/invoice.html"},
	
	
	{name:'图纸',img:"appIcon/tuzhi.png",type:5},
	{name:'文档',img:"appIcon/word.png",type:5},
	{name:'表格',img:"appIcon/excel.png",type:5},
	{name:'计划',img:"appIcon/project.png",type:5},

	{name:'组织机构',img:"appIcon/org.png",type:6,url:"../../page/org/org.html"},
	{name:'人员管理',img:"appIcon/person.png",type:6,url:"../person/person.html"},
	{name:'角色管理',img:"appIcon/role.png",type:6,url:"../role/role.html"},
	{name:'新闻管理',img:"appIcon/news.png",type:6},


	{name:'数据库配置',taskName:"方法管理",img:"appIcon/db.png",type:7,url:"../db/dbconf.html"},
	{name:'PLSQL',taskName:"数据库管理",img:"appIcon/plsql.png",type:7,url:"../db/dbconsole.html"},
	{name:'数据库同步',taskName:"数据库同步",img:"appIcon/db_sync.png",type:7,url:"../db/dbsyc.html"},
	{name:'方法管理',taskName:"方法管理",img:"appIcon/engine.png",type:7,url:"../method/method.html"},
	{name:'方法测试',img:"appIcon/engine_test.png",type:7,url:"../method/method_test.html"},
	{name:'页面开发',img:"appIcon/dw.png",type:7,url:"../dw/dw.html"},
	{name:'表单色彩设计',img:"appIcon/color.png",type:7,url:"../../pagelab/formdesign/test.html"}
];