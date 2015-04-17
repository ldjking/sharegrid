/* xlib.lovDef 值列表定义 */
(function(x) {
	x.lovDefs = {};
	var o = x.lovDefs;
	o.date = {
		title : "请选择日期",
		type : "calendar",
		param : {
			mode : "date"
		}
	};
	o.datetime = {
		title : "请选择日期",
		type : "calendar",
		param : {
			mode : "datetime"
		}
	};
	o.issign = {
		name : "issign",
		width : 160,
		title : "请选择",
		type : "list",
		datas : [{
					value : "1",
					name : "签发"
				}, {
					value : "0",
					name : "不签发,退回重填"
				}],
		nameAttr : "name"
	};
	o.isallow = {
		name : "isallow",
		width : 160,
		title : "请选择",
		type : "list",
		datas : [{
					value : "1",
					name : "许可"
				}, {
					value : "0",
					name : "不许可,退回重填"
				}],
		nameAttr : "name"
	};
	o.sex = {
		name : "sex",
		width : 80,
		title : "请选择性别",
		type : "list",
		datas : [{
					value : "1",
					name : "男"
				}, {
					value : "0",
					name : "女"
				}],
		nameAttr : "name"
	};/* 1代表是固定值 render 呈现方式 */
	o.appIcon = {
		name : "appIcon",
		title : "请选择应用程序图标",
		type : "img",
		dataMethod : "getAppImgs"
	};
	o.project = {
		name : "project",
		title : "请选择项目",
		type : "table",
		cfg : {
			filterMode : 1,
			multiMode : 1,
			orderbyMode : 1,
			pageFlag : 1,
			pageSize : 10
		},
		columns : [{
					attr : "year",
					name : "年度"
				}, {
					attr : "id",
					name : "项目编码"
				}, {
					attr : "name",
					name : "项目名称"
				}],
		dataMethod : "getAppImgs",
		width : 300,
		height : 300
	};
	o.stuff = {
		name : "stuff",
		title : "请选择员工",
		type : "table",
		nameAttr : "c0_name",
		valueAttr : "c0_id",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 5,
			currPage : 1,
			data_method : "personGets"
		},
		columns : [{
					attr : "c0_id",
					text : "主键",
					width : 60
				}, {
					attr : "c0_name",
					text : "姓名",
					width : 80
				}, {
					attr : "sexname",
					text : "性别",
					width : 60
				}, {
					attr : "c0_birthday",
					text : "生日",
					width : 120
				}]
	}
	
	o.itemTypeGets = {
		name : "itemTypeGets",
		title : "请选择物资分类",
		type : "table",
		nameAttr : "name",
		valueAttr : "value",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 8,
			currPage : 1,
			data_method : "itemTypeGets"
		},
		columns : [{
					attr : "value",
					text : "id",
					width : 100
				}, {
					attr : "name",
					text : "分类描述",
					width : 200
				}]
	}
	
	
	
	o.itemnum = {
		name : "stuff",
		title : "请选择物资编码",
		type : "table",
		nameAttr : "itemnum",
		valueAttr : "itemnum",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 8,
			currPage : 1,
			data_method : "itemGets"
		},
		columns : [{
					attr : "itemnum",
					text : "物资编码",
					width : 100
				}, {
					attr : "description",
					text : "物资名称",
					width : 200
				}, {
					attr : "models",
					text : "型号",
					width : 100
				}, {
					attr : "brand",
					text : "品牌",
					width : 120
				}]
	}
	o.company = {
		name : "company",
		title : "请选择供应商",
		type : "table",
		nameAttr : "description",
		valueAttr : "ag_companyid",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 8,
			currPage : 1,
			data_method : "companyGets"
		},
		columns : [{
					attr : "ag_companyid",
					text : "供应商编码",
					width : 100
				}, {
					attr : "description",
					text : "描述",
					width : 200
				}]
	}
	o.po = {
		name : "po",
		title : "请选择采购单",
		type : "table",
		nameAttr : "description",
		valueAttr : "ponum",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 8,
			currPage : 1,
			data_method : "poGets"
		},
		columns : [{
					attr : "ponum",
					text : "采购单编码",
					width : 100
				}, {
					attr : "description",
					text : "描述",
					width : 200
				}]
	}
	o.rkd = {
		name : "rkd",
		title : "请选择入库单",
		type : "table",
		nameAttr : "description",
		valueAttr : "rkdnum",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 8,
			currPage : 1,
			data_method : "rkdGets"
		},
		columns : [{
					attr : "rkdnum",
					text : "入库单编码",
					width : 100
				}, {
					attr : "description",
					text : "描述",
					width : 200
				}]
	}
	o.invoicetype={
		name:'invoicetype',
		width:120,
		title:'状态',
		type:'list',
		data_method : "getMap",
		param:{b0_type:"invoicetype"},
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	}
	o.paytype={
		name:'paytype',
		width:120,
		title:'状态',
		type:'list',
		data_method : "getMap",
		param:{b0_type:"paytype"},
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	}
	o.getUnit={
		name:'getUnit',
		width:80,
		title:'单位',
		type:'list',
		data_method : "getMap",
		param:{b0_type:"getUnit"},
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	}
	
	o.getQualification={
		name:'getQualification',
		width:80,
		title:'单位',
		type:'list',
		data_method : "getMap",
		param:{b0_type:"getQualification"},
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	}

	
	o.workClass = {
		name : "workClass",
		type : "list",
		width : 80,
		data_method : "workClassGets",
		datas : [],
		nameAttr : "name"
	};
	o.dutyItemType = {
		name : "dutyItemType",
		width : 120,
		title : "请选择类型",
		type : "list",
		data_method : "dutyItemTypeGets",
		datas : [],
		nameAttr : "name"
	}
	o.dutyType = {
		name : "dutyType",
		width : 120,
		title : "请选择值别",
		type : "list",
		data_method : "dutyType",
		datas : [],
		nameAttr : "name"
	}
	o.gzClass = {
		name : "gzClass",
		type : "list",
		width : 80,
		data_method : "gzClassGets",
		datas : [],
		nameAttr : "name"
	}
	o.on_off = {
		name : "on_off",
		type : "list",
		width : 80,
		datas : [{
					value : 0,
					name : 0
				}, {
					value : 1,
					name : 1
				}]
	};
	o.methodTarget = {
		name : "methodTarget",
		width : 120,
		type : "list",
		datas : [{
					value : "sql",
					name : "sql"
				}, {
					value : "shell",
					name : "shell"
				}]
	};
	o.methodType = {
		name : "methodType",
		width : 120,
		type : "list",
		datas : [{
					value : "add",
					name : "add"
				}, {
					value : "update",
					name : "update"
				}, {
					value : "delete",
					name : "delete"
				}, {
					value : "query",
					name : "query"
				}, {
					value : "querys",
					name : "querys"
				}, {
					value : "check",
					name : "check"
				}]
	};
	o.role = {
		name : "role",
		width : 120,
		title : "请选择角色",
		type : "list",
		data_method : "roleGets2",
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	};
	o.db = {
		name : "db",
		width : 120,
		type : "list",
		data_method : "dbGets",
		datas : []
	};
	o.cg = {
		name : "cg",
		width : 120,
		type : "list",
		data_method : "cgGets",
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	};
	o.orgType = {
		name : "orgType",
		width : 80,
		title : "请选择公司类型",
		type : "list",
		datas : [{
					value : "0",
					name : "公司"
				}, {
					value : "1",
					name : "部门"
				}, {
					value : "2",
					name : "班组"
				}],
		nameAttr : "name"
	};/* 1代表是固定值 render 呈现方式 */
	o.workClassGet = {
		name : "workClassGet",
		width : 120,
		title : "请选择班组",
		type : "list",
		data_method : "workClassGet",
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	};
	o.asset = {
		name : "asset",
		width : 120,
		title : "请选设备编号",
		type : "table",
		nameAttr : "value",
		valueAttr : "value",
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 5,
			currPage : 1,
			data_method : "asset"
		},
		columns : [{
					attr : "name",
					text : "编号",
					width : 160
				}, {
					attr : "value",
					text : "名称",
					width : 160
				}]
	};
	o.getJz = {
		name : "getJz",
		width : 120,
		title : "请选机组",
		type : "list",
		data_method : "getJz",
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	};
	o.getKtjType={
		name : "getJz",
		width : 120,
		title : "请选机组",
		type : "list",
		datas : [{
					name:'解列停机',
					value:0
				 },
				 {
					 name:'开机并网',
					 value:1
				 }],
		nameAttr : "name",
		valueAttr : "value"
	}
	
	o.getMrfType={
		name : "getMrfType",
		width : 160,
		title : "请选状态",
		type : "list",
		datas : [{
					name:'正在填写',
					value:0
				 },
				 {
					 name:'填写完毕，请领导审批',
					 value:1
				 },
				  {
					 name:'领导批准，请物资部安排发料',
					 value:2
				 }
				 ],
		nameAttr : "name",
		valueAttr : "value"
	}
	
	
	o.getKeyStatus={
		name:'getKeyStatus',
		width:120,
		title:'状态',
		type:'list',
		datas:[{name:'录入',value1:1},{name:'已借出',value:2},{name:'归还',value:3},{name:'已归还',value:4}],
		nameAttr : "name",
		valueAttr : "value"
	}
	o.deblockStatusGet={
		name:'deblockStatusGet',
		width:120,
		title:'状态',
		type:'list',
		datas:[{name:'未借出',value:0},{name:'已借出',value:1}],
		nameAttr : "name",
		valueAttr : "value"
	}
	o.keyMap={
		name:'keyMap',
		width:120,
		title:'状态',
		type:'table',
		tableCfg : {
			filterMode : 1,
			pageFlag : true,
			pageSize : 5,
			currPage : 1,
			data_method : "keyMap"
		},
		columns : [{
					attr : "name",
					text : "名称",
					width : 160
				}, {
					attr : "value",
					text : "编号",
					width : 160
				}],
		nameAttr : "value",
		valueAttr : "value"
	}
	o.map={
		name:'map',
		width:180,
		title:'状态',
		type:'list',
		data_method : "mapGets",
		nameAttr : "name",
		valueAttr : "value"
	};
	o.getMap={
		name:'getMap',
		width:180,
		title:'状态',
		type:'list',
		data_method : "getMap",
		param:{b0_type:"getMrfType"},
		datas : [],
		nameAttr : "name",
		valueAttr : "value"
	}
	
	
	o.is={
		name:'is',
		width:60,
		title:'状态',
		type:'list',
		datas:[{name:"是",value:1},{name:'否',value:0}],
		nameAttr : "name",
		valueAttr : "value"
		}
	o.thMap={
		name:'thMap',
		width:60,
		title:'状态',
		type:'list',
		datas:[{name:"跳",value:1},{name:'合',value:0}],
		nameAttr : "name",
		valueAttr : "value"
		}
	o.opFh={name:'opFh',
		width:120,
		title:'状态',
		type:'list',
		datas:[{name:"合",value:1},{name:'分',value:2}],
		nameAttr : "name",
		valueAttr : "value"}
	o.week={name:'week',
			width:120,
			title:'星期几',
			type:'list',
			datas:[{name:"星期一",value:1},{name:"星期二",value:2},{name:"星期三",value:3},{name:"星期四",value:4},{name:"星期五",value:5},{name:"星期六",value:6},{name:"星期天",value:7}],
			nameAttr:'name',
			valueAttr:'value'
			}
  o.isloadduty={name:"isloadduty",width:80,title:"是否插入运行日志",type:"list",datas:[{value:"1",name:"是"},{value:"0",name:"否"}],nameAttr:"name"}
})(window);
