/*
 *name:dtt
 *time:2014.10.30
 *content:弹出框JS
*/
define(function(require, exports, module) {
	require('../../../plugIn/lhgdialog/skins/default.css');
	require('../../../plugIn/lhgdialog/lhgdialog.min.js');

	module.exports =$.dialog;

	$.dialog.tip = function(msg, closeTime, callback) {
		this({
			id: 'xnTip',
			content: msg || '提示信息',
			fixed: true,
			title: false,
			icon: '32X32/i.png',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

	$.dialog.alert = function(msg, fun) {
		this({
			id: 'xnAlert',
			content: msg || '警告信息',
			fixed: true,
			title: false,
			icon: '32X32/hits.png',
			ok: fun || null
		});
	};

	$.dialog.confirm = function(msg, okFun, cancelFun) {
		this({
			id: 'xnConfirm',
			content: msg || '请确认操作？',
			fixed: true,
			title: false,
			icon:'32X32/i.png',
			ok: okFun || function() {},
			cancel: cancelFun || function() {}
		});
	};

	$.dialog.error = function(msg, okfun) {
		this({
			id: 'xnError',
			content: msg || '错误提示',
			fixed: true,
			title: false,
			icon:'32X32/fail.png',
			ok: okfun || true
		});
	};

	$.dialog.success = function(msg, closeTime, callback) {
		this({
			id: 'xnSuccess',
			content: msg || '成功提示',
			fixed: true,
			title: false,
			icon:'32X32/succ.png',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

	$.dialog.loading = function(msg) {
		this({
			id: 'xnLoading',
			content: msg || '处理中……',
			fixed: true,
			lock: true,
			opacity: .3,
			title: false,
			icon:'loading.gif',
			init: function(){}
		});
		return this({
			id: 'xnLoading'
		});
	};

});