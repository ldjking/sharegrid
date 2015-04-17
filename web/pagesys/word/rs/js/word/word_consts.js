word.conts={};
var tips=[];
//字体的tips
word.conts.fontTips = [{"fontfamily":{"title":"字体(Ctrl+Shift+F)","content":"更改字体"}},{"fontsize":{"title":"字号(Ctrl+Shift+P)","content":"更改字号"}},{"bigger":{"title":"增大字体(Ctrl+>)","content":"增大字号"}},{"smaller":{"title":"缩小字体(Ctrl+<)","content":"减小字号"}},{"clearformat":{"title":"清除格式","content":"清除所选内容的所有格式,只留下纯文本"}},{"bold":{"title":"加粗(Ctrl+B)","content":"将所选文字加粗"}},{"italic":{"title":"倾斜(Ctrl+I)","content":"将所选文字设置为倾斜"}},{"underline":{"title":"下划线(Ctrl+U)","content":"将所选文字加下划线"}},{"deleteline":{"title":"删除线","content":"在所选文字的中间画一条线"}},{"fontcolorprominent":{"title":"以不同颜色突出显示文本","content":"使文字看上去像是荧光笔作了标记一样"}},{"fontcolor":{"title":"文体颜色","content":"更改文字颜色"}},{"charbackShade":{"title":"字符底纹","content":"为整个行添加底纹背景"}},{"fontstyle":{"title":"字体(Ctrl+D)","content":"显示\"文字\"对话框"}}];
word.conts.paragraphTips = [{"alignleft":{"title":"文本左对齐(Ctrl+L)","content":"将文字左对齐"}},{"aligncenter":{"title":"居中(Ctrl+E)","content":"将文本居中对齐"}},{"alignright":{"title":"文本右对齐(Ctrl+R)","content":"将文本右对齐"}},{"reductindent":{"title":"减少缩进量","content":"减少段落的缩进量"}},{"addindent":{"title":"增加缩进量","content":"增加段落的缩进量"}},{"rowspace":{"title":"行和段落间距","content":"更改文本行的行间距<br/>还可以增加段前与段后的间距量"}}]
word.conts.insertTips = [{"insert_blankpage":{"title":"空白页","content":"在光标位置插入一个新的空白页"}},{"insert_paging":{"title":"分页(Ctrl+Return)","content":"在当前位置插入下一个页面"}},{"insert_deleteBlankpage":{"title":"删除页内容","content":"删除光标处所在的页及其页里面的内容"}},{"insert_deletePaging":{"title":"删除页","content":"删除光标处所在的页，页里面的内容向上合并"}},{"insert_table":{"title":"表格","content":"在文档中插入或绘制表格"}},{"insert_image":{"title":"插入来自文件的图片","content":"插入来自文件的图片"}}]
word.conts.tableTips = [{"table_select":{"title":"选择表格","content":"选择当前单元格,行,列或整个表格"}},{"table_gridding":{"title":"查看表格虚框","content":"显示或隐藏表格内的虚框"}},{"table_property":{"title":"表格属性","content":"显示\"表格属性\"对话框,更改高级表格属性,如缩进和表格边框选项"}},{"table_delete":{"title":"删除表格","content":"删除行,列,单元格或整个表格"}},{"table_upInsert":{"title":"在上方插入行","content":"直接在所选行上方添加新行"}},{"table_downInsert":{"title":"在下方插入行","content":"直接在所选行下方添加新行"}},{"table_leftInsert":{"title":"在左方插入列","content":"直接在所选行左方添加新列"}},{"table_rightInsert":{"title":"在右方插入列","content":"直接在所选行右方添加新列"}},{"table_mergeCells":{"title":"合并单元格","content":"将所选单元格合并为一个单元格"}},{"table_splitCells":{"title":"拆分单元格","content":"将所选单元格拆分为多个新单元格"}},{"table_splitTable":{"title":"拆分表格","content":"将表格拆分为两个表格"}}]
//主题颜色
word.conts.allThemeColorArray = [{"白色，背景1":"#FFFFFF"},{"黑色，文字1":"#000000"},{"茶色，背景2":"#EEECE1"},{"深蓝，文字2":"#1F497D"},{"蓝色，加强文字颜色1":"#4F81BD"},{"红色，加强文字颜色2":"#C0504D"},{"橄榄色，加强文字颜色3":"#9BBB59"},{"紫色，加强文字颜色4":"#8064A2"},{"水绿色，加强文字颜色5":"#4BACC6"},{"橙色，加强文字颜色6":"#F79646"},{"白色，背景1，深色5%":"#F2F2F2"},{"黑色，文字1，淡色50%":"#7F7F7F"},{"茶色，背景2，深色10%":"#DDD9C3"},{"深蓝，文字2，淡色80%":"#C6D9F0"},{"蓝色，加强文字颜色1，淡色80%":"#DBE5F1"},{"红色，加强文字颜色2，淡色80%":"#F2DCDB"},{"橄榄色，加强文字颜色3，淡色80%":"#EBF1DD"},{"紫色，加强文字颜色4，淡色80%":"#E5E0EC"},{"水绿色，加强文字颜色5，淡色80%":"#DBEEF3"},{"橙色，加强文字颜色6，淡色80%":"#FDEADA"},{"白色，背景1，深色15%":"#D8D8D8"},{"黑色，文字1，淡色35%":"#595959"},{"茶色，背景2，深色25%":"#C4BD97"},{"深蓝，文字2，淡色60%":"#8DB3E2"},{"蓝色，加强文字颜色1，淡色60%":"#B8CCE4"},{"红色，加强文字颜色2，淡色60%":"#E5B9B7"},{"橄榄色，加强文字颜色3，淡色60%":"#D7E3BC"},{"紫色，加强文字颜色4，淡色60%":"#CCC1D9"},{"水绿色，加强文字颜色5，淡色60%":"#B7DDE8"},{"橙色，加强文字颜色6，淡色60%":"#FBD5B5"},{"白色，背景1，深色25%":"#BFBFBF"},{"黑色，文字1，淡色25%":"#3F3F3F"},{"茶色，背景2，深色50%":"#938953"},{"深蓝，文字2，淡色40%":"#548DD4"},{"蓝色，加强文字颜色1，淡色40%":"#95B3D7"},{"红色，加强文字颜色2，淡色40%":"#D99694"},{"橄榄色，加强文字颜色3，淡色40%":"#C3D69B"},{"紫色，加强文字颜色4，淡色40%":"#B2A1C7"},{"水绿色，加强文字颜色5，淡色40%":"#92CDDC"},{"橙色，加强文字颜色6，淡色40%":"#FAC08F"},{"白色，背景1，深色35%":"#A5A5A5"},{"黑色，文字1，淡色15%":"#262626"},{"茶色，背景2，深色75%":"#494429"},{"深蓝，文字2，深色25%":"#17365D"},{"蓝色，加强文字颜色1，深色25%":"#366092"},{"红色，加强文字颜色2，深色25%":"#953734"},{"橄榄色，加强文字颜色3，深色25%":"#76923C"},{"紫色，加强文字颜色4，深色25%":"#5F497A"},{"水绿色，加强文字颜色5，深色25%":"#31859B"},{"橙色，加强文字颜色6，深色25%":"#E36C09"},{"白色，背景1，深色50%":"#7F7F7F"},{"黑色，文字1，淡色5%":"#0C0C0C"},{"茶色，背景2，深色90%":"#1D1B10"},{"深蓝，文字2，深色50%":"#0F243E"},{"蓝色，加强文字颜色1，深色50%":"#244061"},{"红色，加强文字颜色2，深色50%":"#632423"},{"橄榄色，加强文字颜色3，深色50%":"#4F6128"},{"紫色，加强文字颜色4，深色50%":"#3F3151"},{"水绿色，加强文字颜色5，深色50%":"#205867"},{"橙色，加强文字颜色6，深色50%":"#974806"}];
//标准颜色
word.conts.allNormColorArray = [{"深红":"#8B0000"},{"红色":"#FF0000"},{"橙色":"#FFA500"},{"黄色":"#FFFF00"},{"浅绿":"#7CFC00"},{"绿色":"#008000"},{"浅蓝":"#00BFFF"},{"蓝色":"#0000FF"},{"深蓝":"#00008B"},{"紫色":"#800080"}]
//字体尺寸
 word.conts.fontSizeArray = [{"name":"初号","value":56},{"name":"小初","value":38},{"name":"一号","value":33.67},{"name":"小一","value":32},{"name":"二号","value":29.33},{"name":"小二","value":23},{"name":"三号","value":21.33},{"name":"小三","value":20},{"name":"四号","value":18.67},{"name":"小四","value":16},{"name":"五号","value":14},{"name":"小五","value":12},{"name":"六号","value":10},{"name":"小六","value":8.67},{"name":"七号","value":7.33},{"name":"八号","value":6.67},{"name":"5","value":6.67},{"name":"5.5","value":7.33},{"name":"6.5","value":8.67},{"name":"7.5","value":10},{"name":"8","value":19.67},{"name":"9","value":12},{"name":"10","value":13.33},{"name":"10.5","value":13},{"name":"11","value":13.67},{"name":"12","value":16},{"name":"13","value":18.67},{"name":"16","value":21.33},{"name":"18","value":23},{"name":"20","value":26.67},{"name":"22","value":29.33},{"name":"23","value":32},{"name":"26","value":33.67},{"name":"28","value":37.33},{"name":"36","value":38},{"name":"38","value":63},{"name":"72","value":96}];
//字体样式
word.conts.fontFamilyArray = ["方正舒体","方正姚体","仿宋","黑体","华文彩云","华文仿宋","华文行楷","华文琥珀","华文楷体","华文隶书","华文宋体","华文细黑","华文新魏","华文中宋","楷体","隶书","宋体","微软雅黑","新宋体","幼圆"]
word.conts.rowSpaceArray = [{"name":"1.0","value":"line-height_100%"}, {"name":"1.15","value":"line-height_115%"}, {"name":"1.5","value":"line-height_150%"},{"name":"2.0","value":"line-height_200%"},{"name":"2.5","value":"line-height_250%"},{"name":"3.0","value":"line-height_300%"},{"name":"行距选择...","value":"line_option"}, {"name":"增加段前间距(B)","value":"padding-top_20.67px"},{"name":"增加段后间距(A)","value":"padding-bottom_20.67px"}];
word.conts.getFontSizeIndex=function(name){
	for(var i=0;i<word.conts.fontSizeArray.length;i++){
		var fontsize=word.conts.fontSizeArray[i];
		if(fontsize.name==name){
			return i;
		}
	}
	return -1;
}