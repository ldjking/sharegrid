(function(x){
x.arc=function(x,y,r,s,e,f,z,c,style){
	    var svgns = 'http://www.w3.org/2000/svg';    
		var src = document.createElementNS(svgns, 'path'); 
		var arcstr="";
		var fw=f?1:0;
		if(Math.abs(e-s)==360) e-=0.1;
		var s=f?s:Math.abs(360-s);
		var e=f?e:Math.abs(360-e);
		var zw=Math.abs(e-s)>180?1:0;
		scx = x + r*Math.cos(s*Math.PI/180);
		scy = y + r*Math.sin(s*Math.PI/180);
		ecx = x + r*Math.cos(e*Math.PI/180);
		ecy = y + r*Math.sin(e*Math.PI/180);
		var cstr=c?"L "+x+" "+y+" L"+scx+" "+scy:" "; 
		arcstr+="M "+scx+" "+scy+" A "+r+" "+r+" 0 "+zw+" "+fw+" "+ecx+" "+ecy+" L "+ecx+" "+ecy+" "+cstr +(z?'Z':'');
		src.setAttribute('d',arcstr);
		src.setAttribute('fill','white');
		src.setAttribute('stroke','black');
		if(style!=null){
			for(var s in style){
				src.setAttribute(s,style[s]);
			}
		}
		return src
}
x.ring=function(x,y,r,s,e,w,f,style){
	    var svgns = 'http://www.w3.org/2000/svg';    
		var src = document.createElementNS(svgns, 'path'); 
		var arcstr="";
		var fw=f?1:0;
		if(Math.abs(e-s)==360) e-=0.1;
		var s=f?s:Math.abs(360-s);
		var e=f?e:Math.abs(360-e);
		var zw=Math.abs(e-s)>180?1:0;
		scx = x + r*Math.cos(s*Math.PI/180);
		scy = y + r*Math.sin(s*Math.PI/180);
		ecx = x + r*Math.cos(e*Math.PI/180);
		ecy = y + r*Math.sin(e*Math.PI/180);
		inscx = x + (r-w)*Math.cos(s*Math.PI/180);
		inscy = y + (r-w)*Math.sin(s*Math.PI/180);
		inecx = x + (r-w)*Math.cos(e*Math.PI/180);
		inecy = y + (r-w)*Math.sin(e*Math.PI/180);
		var infw=fw==0?1:0;
		arcstr+="M "+scx+" "+scy+" A "+r+" "+r+" 0 "+zw+" "+fw+" "+ecx+" "+ecy+" L "+inecx+" "+inecy+" ";
		arcstr+="A "+(r-w)+" "+(r-w)+" 0 "+zw+" "+infw+" "+inscx+" "+inscy+" L "+scx+" "+scy+" ";
		src.setAttribute('d',arcstr);
		src.setAttribute('fill','white');
		src.setAttribute('stroke','black');
		if(style!=null){
			for(var s in style){
				src.setAttribute(s,style[s]);
			}
		}
		return src
}
})(window)