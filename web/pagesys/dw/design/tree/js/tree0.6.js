var Tree={};//这是一个命名空间

Tree.init=function()
{
	document.onclick=Tree.clickHandler;
}
Tree.clickHandler=function(evt)
{
	var target=evt.target;
	if(target.tagName.toLowerCase()=="span")
	{
		target=target.parentNode.parentNode.parentNode;
		var childDom=target.nextSibling;
		if(childDom.nodeType==3)
		{
			childDom=childDom.nextSibling;
			//alert("childDom:"+childDom+"html"+childDom.nodeType);
		}
		if(target.className.indexOf("open")>0)
		{//表示当前节点是打开状态
			target.className=target.className.replace("open","close");
			
			//alert("childDom.className:"+childDom.className);
			if(childDom.className.indexOf("show")>0)
			{
				childDom.className=childDom.className.replace("show","hidden");
			}
		}
		else if(target.className.indexOf("close")>0)
		{
			target.className=target.className.replace("close","open");
			if(childDom.className.indexOf("hidden")>0)
			{
				childDom.className=childDom.className.replace("hidden","show");
			}
		}
		//alert(target.tagName);
	}
}

window.onload=Tree.init;