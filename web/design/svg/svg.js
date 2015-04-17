(function(x){
x.gfx={}
x.gfx.getGCenter=function(t){
	var b=t.getBBox();
	var r={};
	r.x=b.x+b.width/2;
	r.y=b.y+b.height/2;
	return r;
}
x.gfx.getGCenter1=function(t){
	var b=t.getBBox();
	var rect=x.getRect(t);
	var r={};
	r.x=rect.left+(rect.right-rect.left)/2-8;
	r.y=rect.top +(rect.bottom-rect.top)/2-8;
	return r;
}
x.gfx.getTransform=function(t){
	var transform='';
	if(t.rotate!=null) transform=' rotate('+t.rotate.deg+','+t.rotate.x+','+t.rotate.y+') ';
		if(t.move!=null){
			if(t.rotate!=null){
				var rdeg=-t.rotate.deg
				transform+=' rotate('+rdeg+','+t.rotate.x+','+t.rotate.y+') ';
			}
			transform+=' translate('+t.move.x+','+t.move.y+') ';
			if(t.rotate!=null){
				var rdeg=-t.rotate.deg
				transform+=' rotate('+t.rotate.deg+','+t.rotate.x+','+t.rotate.y+') ';
			}
		}
		if(t.scale!=null) transform+=' translate('+t.scale.x*(1-t.scale.v)+','+t.scale.y*(1-t.scale.v)+')  scale('+t.scale.v+') ';
	  return transform;
}

x.gfx.getTransform1=function(t){
	var transform='';
	if(t.rotate!=null) transform=' rotate('+t.rotate.deg+','+t.rotate.x+','+t.rotate.y+') ';
		if(t.move!=null){
			if(t.rotate!=null){
				var rdeg=-t.rotate.deg
				transform+=' rotate('+rdeg+','+t.rotate.x+','+t.rotate.y+') ';
			}
			transform+=' translate('+t.move.x+','+t.move.y+') ';
			if(t.rotate!=null){
				var rdeg=-t.rotate.deg
				transform+=' rotate('+t.rotate.deg+','+t.rotate.x+','+t.rotate.y+') ';
			}
		}
		if(t.scale!=null) transform+=' translate('+t.scale.offsetx+','+t.scale.offsety+')  scale('+t.scale.x+','+t.scale.y+') ';
	  return transform;
}

x.gfx.revolve=function(_,v,x,y){
		var ex = Math.abs(x - _.x);
        var ey = Math.abs(y - _.y);
        var ez = Math.sqrt(ex*ex + ey*ey);
       	var nv=Math.round((Math.asin(ey/ez)/Math.PI*180));
		if(_.transform.move!=null&&_.transform.move.e!=null) v= this.transform.move.e+v;
		var cos = Math.cos((-nv-v)*Math.PI/180);
        var sin = Math.sin((-nv-v)*Math.PI/180);
		var r= Math.sqrt((_.x-x)*(_.x-x)+(_.y-y)*(_.y-y));
		var mx=x+r*cos;
		var my=y+r*sin;
		this.transform.move={x:mx-this.x,y:my-this.y,e:v};
}
x.gfx.Line=function(cfg){
	this.x1=cfg.x1;
	this.y1=cfg.y1;
	this.x2=cfg.x2;
	this.y2=cfg.y2;
	this.style=cfg.style;
	this.transform={};
	this.draw=function(svg){
		var svgns = 'http://www.w3.org/2000/svg'; 
		var line;  
		if(this.dom==null) line = document.createElementNS(svgns, 'line'); 
		else 			   line = this.dom;
		line.setAttribute('x1',this.x1);
		line.setAttribute('y1',this.y1);
		line.setAttribute('x2',this.x2);
		line.setAttribute('y2',this.y2);
		if(this.style!=null){
			for(var s in this.style){
				line.setAttribute(s,this.style[s]);
			}
		}
		var transform=gfx.getTransform(this.transform);
		line.setAttribute('transform',transform);
		if(this.dom==null){
			svg.appendChild(line);
			this.dom=line;
		}
	}
	this.rotate=function(v){
		var mx=(this.x1>this.x2?this.x2:this.x1)+Math.abs(this.x2-this.x1)/2;
		var my=(this.y1>this.y2?this.y2:this.y1)+Math.abs(this.y2-this.y1)/2;
		if(this.transform.rotate==null)this.transform.rotate={deg:v,x:mx,y:my};
		else						   this.transform.rotate={deg:this.transform.rotate.deg+v,x:mx,y:my};
		this.draw();
	}
	this.scale=function(v){
		var mx=(this.x1>this.x2?this.x2:this.x1)+Math.abs(this.x2-this.x1)/2;
		var my=(this.y1>this.y2?this.y2:this.y1)+Math.abs(this.y2-this.y1)/2;
		if(this.transform.scale==null)this.transform.scale={v:v,x:mx,y:my};
		else						   this.transform.scale={v:this.transform.scale.v*v,x:mx,y:my};
		this.draw();
	}
	this.move=function(x,y){
		if(this.transform.move==null) this.transform.move={x:x,y:y};
		else 						  this.transform.move={x:this.transform.move.x+x,y:this.transform.move.y+y};
		this.draw();
	}
	this.revolve=function(v,x,y){
		gfx.revolve(this,v,x,y);
		this.draw();
	}
	
}

x.gfx.Arc=function(cfg){
	this.x=cfg.x;
	this.y=cfg.y;
	this.r=cfg.r;
	this.s=cfg.s;
	this.e=cfg.e;
	this.f=cfg.f;
	this.z=cfg.z;
	this.c=cfg.c;
	this.style=cfg.style;
	this.transform={};
	this.draw=function(svg){
		var svgns = 'http://www.w3.org/2000/svg'; 
		var line;  
		if(this.dom==null) arc = document.createElementNS(svgns, 'path'); 
		else 			   arc = this.dom;
		var arcstr="", fw=this.f?1:0,_e,_s,cstr,scx,scy,ecx,ecy;
		if(Math.abs(this.e-this.s)==360) _e=this.e-0.1;
		else 							 _e=this.e;
		_s=this.f?this.s:Math.abs(360-this.s);
		_e=this.f?_e:Math.abs(360-_e);
		var zw=Math.abs(_e-_s)>180?1:0;
		scx = this.x + this.r*Math.cos(_s*Math.PI/180);
		scy = this.y + this.r*Math.sin(_s*Math.PI/180);
		ecx = this.x + this.r*Math.cos(_e*Math.PI/180);
		ecy = this.y + this.r*Math.sin(_e*Math.PI/180);
		var cstr=this.c?"L "+this.x+" "+this.y+" L"+scx+" "+scy:" "; 
		arcstr+="M "+scx+" "+scy+" A "+this.r+" "+this.r+" 0 "+zw+" "+fw+" "+ecx+" "+ecy+" L "+ecx+" "+ecy+" "+cstr +(this.z?'Z':'');
		arc.setAttribute('d',arcstr);
		arc.setAttribute('fill','white');
		arc.setAttribute('stroke','black');
		if(this.style!=null){
			for(var s in this.style){
				arc.setAttribute(s,this.style[s]);
			}
		}
		var transform=gfx.getTransform(this.transform);
		arc.setAttribute('transform',transform);
		if(this.dom==null){
			svg.appendChild(arc);
			this.dom=arc;
		}
	}
	this.scale=function(v){
		if(this.transform.scale==null) this.transform.scale={v:v,x:this.x,y:this.y};
		else						   this.transform.scale={v:this.transform.scale.v*v,x:this.x,y:this.y};
		this.draw();
	}
	this.rotate=function(v,x,y){
		if(this.transform.rotate==null)this.transform.rotate={deg:v,x:this.x,y:this.y};
		else						   this.transform.rotate={deg:this.transform.rotate.deg+v,x:this.x,y:this.y};
		this.draw();
	}
	this.move=function(x,y){
		if(this.transform.move==null) this.transform.move={x:x,y:y};
		else 						  this.transform.move={x:this.transform.move.x+x,y:this.transform.move.y+y};
		this.draw();
	}
	this.revolve=function(v,x,y){
		gfx.revolve(this,v,x,y);
		this.draw();
	}
}



x.gfx.Ring=function(cfg){
	this.x=cfg.x;
	this.y=cfg.y;
	this.r=cfg.r;
	this.s=cfg.s;
	this.e=cfg.e;
	this.w=cfg.w;
	this.f=cfg.f;
	this.style=cfg.style;
	this.transform={};
	this.draw=function(svg){
		var svgns = 'http://www.w3.org/2000/svg'; 
		var arc;  
		if(this.dom==null) arc = document.createElementNS(svgns, 'path'); 
		else 			   arc = this.dom;
		var arcstr="", fw=this.f?1:0,_e,_s,cstr,scx,scy,ecx,ecy;
		if(Math.abs(this.e-this.s)==360) _e=this.e-0.1;
		else 							 _e=this.e;
		_s=this.f?this.s:Math.abs(360-this.s);
		_e=this.f?_e:Math.abs(360-_e);
		var zw=Math.abs(_e-_s)>180?1:0;
		scx = this.x + this.r*Math.cos(_s*Math.PI/180);
		scy = this.y + this.r*Math.sin(_s*Math.PI/180);
		ecx = this.x + this.r*Math.cos(_e*Math.PI/180);
		ecy = this.y + this.r*Math.sin(_e*Math.PI/180);
		inscx = this.x + (this.r-this.w)*Math.cos(_s*Math.PI/180);
		inscy = this.y + (this.r-this.w)*Math.sin(_s*Math.PI/180);
		inecx = this.x + (this.r-this.w)*Math.cos(_e*Math.PI/180);
		inecy = this.y + (this.r-this.w)*Math.sin(_e*Math.PI/180);
		var infw=fw==0?1:0;
		
		arcstr+="M "+scx+" "+scy+" A "+this.r+" "+this.r+" 0 "+zw+" "+fw+" "+ecx+" "+ecy+" L "+inecx+" "+inecy+" ";
		arcstr+="A "+(this.r-this.w)+" "+(this.r-this.w)+" 0 "+zw+" "+infw+" "+inscx+" "+inscy+" L "+scx+" "+scy+" ";
		arc.setAttribute('d',arcstr);
		arc.setAttribute('fill','white');
		arc.setAttribute('stroke','black');
		if(this.style!=null){
			for(var s in this.style){
				arc.setAttribute(s,this.style[s]);
			}
		}
		var transform=gfx.getTransform(this.transform);
		arc.setAttribute('transform',transform);
		if(this.dom==null){
			svg.appendChild(arc);
			this.dom=arc;
		}
	}
	this.scale=function(v){
		if(this.transform.scale==null) this.transform.scale={v:v,x:this.x,y:this.y};
		else						   this.transform.scale={v:this.transform.scale.v*v,x:this.x,y:this.y};
		this.draw();
	}
	this.rotate=function(v,x,y){
		var mx=x?x:this.x;
		var my=y?y:this.y;
		if(this.transform.rotate==null)this.transform.rotate={deg:v,x:mx,y:my};
		else						   this.transform.rotate={deg:this.transform.rotate.deg+v,x:mx,y:my};
		this.draw();
	}
	this.move=function(x,y){
		if(this.transform.move==null) this.transform.move={x:x,y:y};
		else 						  this.transform.move={x:this.transform.move.x+x,y:this.transform.move.y+y};
		this.draw();
	}
	this.revolve=function(v,x,y){
		gfx.revolve(this,v,x,y);
		this.draw();
	}
}

x.gfx.Ellipse=function(cfg){
	this.x=cfg.x;
	this.y=cfg.y;
	this.xr=cfg.xr;
	this.yr=cfg.yr;
	this.xr=cfg.xr;
	this.style=cfg.style;
	this.controls={};
	this.transform={};
	this.draw=function(svg){
		var svgns = 'http://www.w3.org/2000/svg'; 
		var ellipse,g;  
		if(this.dom==null) {
			g = document.createElementNS(svgns, 'g');
			svg.appendChild(g);
			ellipse = document.createElementNS(svgns, 'ellipse');
		}
		else {
			ellipse = this.shape;
			g=this.dom;
		}
		var ellipsestr=""
		if(this.dom==null){
			ellipse.setAttribute('cx',this.x);
			ellipse.setAttribute('cy',this.y);
			ellipse.setAttribute('rx',this.xr);
			ellipse.setAttribute('ry',this.yr);
			ellipse.setAttribute('fill','white');
			ellipse.setAttribute('stroke','black');
		}
		var transform=gfx.getTransform1(this.transform);
		g.setAttribute('transform',transform);
		if(this.style!=null){
			for(var s in this.style){
				ellipse.setAttribute(s,this.style[s]);
			}
		}
		if(this.dom==null){
			g.appendChild(ellipse);
			var b=ellipse.getBBox();
			var c={}
			c.lt={x:b.x, y:b.y}
			c.rt={x:b.x+b.width, y:b.y}
			c.mt={x:b.x+b.width/2,y:b.y}
			c.mr={x:b.x, y:b.y+b.height/2}
			c.ml={x:b.x+b.width, y:b.y+b.height/2}
			c.lb={x:b.x, y:b.y+b.height}
			c.rb={x:b.x+b.width,y:b.y+b.height}
			c.mb={x:b.x+b.width/2,y:b.y+b.height}
			c.rotate={x:b.x+b.width/2,y:b.y-40}
			for(var i in c){
				var cir = document.createElementNS(svgns, 'circle'); 
				cir.setAttribute('cx',c[i].x);
				cir.setAttribute('cy',c[i].y);
				cir.setAttribute('r',4);
				if(i!='rotate'){
					cir.setAttribute('fill','green');
					cir.setAttribute('stroke','blue');
				}else{
					cir.setAttribute('fill','red');
					cir.setAttribute('stroke','blue');
				}
				cir.type=i;
				if(i!='rotate'){
					g.appendChild(cir);
				}
				else{
					svg.appendChild(cir);
				}
				bind(svg,'mousedown',this.e_mousedown_handler);
				bind(svg,'mouseup',  this.e_mouseup_handler);
				bind(svg,'mousemove',  this.e_mousemove_handler);
				this.controls[i]=cir;
			}
			this.dom=g;
			this.shape=ellipse;
			svg.shape=this;
		}
	}
	this.e_mousemove_handler=function(evt){
		if(this.isChange){
			var target=this.ChangeC;
			var type=target.type,mx=evt.x-this.Coriginx,my=evt.y-this.Coriginy,c,r=this.shape.dom.getBBox(),pos,proportionx,proportiony
			rw=r.width-8,rh=r.height-8;
			var ep=gfx.getGCenter1(this.shape.controls.lb)
			var sp=gfx.getGCenter1(this.shape.controls.lt)
			var ex = Math.abs(ep.x - sp.x);
   			var ey = Math.abs(ep.y - sp.x);
    		var ez = Math.sqrt(ex*ex + ey*ey);
			nv=(Math.asin(ey/ez)/Math.PI*180)
			out('nv',nv)
			if(type!='rotate'){
				if(type=='lt') {
					c=this.shape.controls.rb;
					pos=gfx.getGCenter1(c);
					proportionx=(rw-mx)/rw;
					proportiony=(rh-my)/rh;
				}
				else if(type=='rt') {
					c=this.shape.controls.lb;
					pos=gfx.getGCenter1(c);
					proportionx=(rw+mx)/rw;
					proportiony=(rh-my)/rh;
				}
				else if(type=='lb') {
					c=this.shape.controls.rt;
					pos=gfx.getGCenter1(c);
					proportionx=(rw-mx)/rw;
					proportiony=(rh+my)/rh;
				}
				else if(type=='rb') {
					c=this.shape.controls.lt;
					pos=gfx.getGCenter1(c);
					pos1=gfx.getGCenter(c);
					out('pos',pos)
					out('pos1',pos1);
					proportionx=(rw+mx)/rw;
					proportiony=(rh+my)/rh;
					out("proportiony",proportiony);
				}
				else if(type=='mt'){
					c=this.shape.controls.mb;
					pos=gfx.getGCenter1(c);
					proportiony=(rh-my)/rh;
					proportionx=1;
				}
				else if(type=='mb'){
					c=this.shape.controls.mt;
					//out('Coriginmb',this.CoriginC.mb.x);
					pos=gfx.getGCenter1(c);
					posi=Math.sqrt((pos.x-evt.x)*(pos.x-evt.x)+(pos.y-evt.y)*(pos.x-evt.y))/Math.sqrt((pos.x-this.CoriginC.mb.x)*(pos.x-this.CoriginC.mb.x)+(pos.y-this.CoriginC.mb.y)*(pos.x-this.CoriginC.mb.y))
					//out('posi',posi);
					//proportiony=posi;
					proportiony=(rh+my)/rh;
					proportionx=1;
				}
				else if(type=='mr'){
					c=this.shape.controls.ml;
					pos=gfx.getGCenter1(c);
					proportionx=(rw-mx)/rw;
					proportiony=1;
				}
				else if(type=='ml'){
					c=this.shape.controls.mr;
					pos=gfx.getGCenter1(c);
					proportionx=(rw+mx)/rw;
					proportiony=1;
				}
				this.shape.transform.scale={};
				this.shape.transform.scale.offsetx=pos.x*(1-proportionx);
				this.shape.transform.scale.offsety=pos.y*(1-proportiony);
				this.shape.transform.scale.x=proportionx;
				this.shape.transform.scale.y=proportiony;
			}else{
				mx=evt.x;
				my=evt.y;
				c=this.shape.controls.rotate;
				pos=gfx.getGCenter(c);
				inite=0;
				if(my>pos.y&mx<pos.x){
					inite=90;
					initw=true;
				}
				var ex = Math.abs(mx - pos.x);
       		    var ey = Math.abs(my - pos.y);
       			var ez = Math.sqrt(ex*ex + ey*ey);
				var nv;
				if(my>pos.y&mx<=pos.x){
					nv=180-Math.round((Math.asin(ey/ez)/Math.PI*180));
				}
				else if(my<pos.y&mx<=pos.x){
					nv=180+Math.round((Math.asin(ey/ez)/Math.PI*180));
				}
				else if(my<pos.y&mx>=pos.x){
					nv=360-Math.round((Math.asin(ey/ez)/Math.PI*180));
				}
				else{
       				nv=Math.round((Math.asin(ey/ez)/Math.PI*180));
				}
				nv+=90;
				this.shape.transform.rotate={};
				this.shape.transform.rotate.deg=nv;
				this.shape.transform.rotate.x=pos.x;
				this.shape.transform.rotate.y=pos.y;
				//this.transform.rotate={deg:this.transform.rotate.deg+v,x:mx,y:my};
				//out("nv",nv);
			}
			this.shape.draw();
		}
	}
	this.e_mouseup_handler=function(evt){
		this.isChange=false
		this.ChangeC=null;
		this.Coriginx=null;
		this.Coriginy=null;
	}
	this.e_mousedown_handler=function(evt){
		var target=evt.target;
		if(target.nodeName!='circle') return;
		else{
			this.isChange=true;
			this.ChangeC=target;
			this.CoriginC={};
			for(var i in this.shape.controls){
				this.CoriginC[i]=gfx.getGCenter(this.shape.controls[i]);
			}
			this.Coriginx=evt.x;
			this.Coriginy=evt.y;
		}
	}
	this.scale=function(v){
		if(this.transform.scale==null) this.transform.scale={v:v,x:this.x,y:this.y};
		else						   this.transform.scale={v:this.transform.scale.v*v,x:this.x,y:this.y};
		this.draw();
	}
	this.rotate=function(v,x,y){
		var mx=x?x:this.x;
		var my=y?y:this.y;
		if(this.transform.rotate==null)this.transform.rotate={deg:v,x:mx,y:my};
		else						   this.transform.rotate={deg:this.transform.rotate.deg+v,x:mx,y:my};
		this.draw();
	}
	this.move=function(x,y){
		if(this.transform.move==null) this.transform.move={x:x,y:y};
		else 						  this.transform.move={x:this.transform.move.x+x,y:this.transform.move.y+y};
		this.draw();
	}
	this.revolve=function(v,x,y){
		gfx.revolve(this,v,x,y);
		this.draw();
	}
}



})(window)