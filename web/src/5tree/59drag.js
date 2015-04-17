(function(x){/*树的标准数据格式  每个节点的格式  node: name,childs,type[type可以映射成css class]*/
	x.enableTreeDrag=function(dom){/*启用tree的drag效果*/
		var cfg=dom.treeCfg;
		cfg.allowDrag=true;
	}
})(window);
