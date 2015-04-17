var Tree={};//这是一个命名空间

Tree.init=function()
{
	document.onclick=Tree.clickHandler;
}
Tree.clickHandler=function(evt)
{
	var target=evt.target;
	if(target.tagName.toLowerCase()=="tag")
	{
		target=target.parentNode;
		x.cssToggle(target,"open");
		//alert(target.tagName);
	}
}

window.onload=Tree.init;