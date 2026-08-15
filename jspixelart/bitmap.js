function Bitmap(w,h,palette,transparent) {
	this.w=w;
	this.h=h;
	this.transparent=transparent;
	this.pixels=new Uint8Array(w*h);
	
	this.setPixel=function(x,y,color) {
		if(x<0 || x>=this.w || y<0 || y>=this.h) return -1;
		this.pixels[y*this.w+x]=color;
		return 0;
	}

	this.getPixel=function(x,y) {
		if(x<0 || x>=this.w || y<0 || y>=this.h) return -1;
		return this.pixels[y*this.w+x];
	}
	
	this.draw=function(x,y,rx,ry,rw,rh,s) {
		for(var j=0;j<rh;j++) {
			for(var i=0;i<rw;i++) {
				var k=this.getPixel(i,j);
				if(k!=this.transparent) {
					FillRect(i*s+x,j*s+y,s,s,palette[k]);
				}
			}
		}
	}

	for(var i=0;i<this.pixels.length;i++) {
		this.pixels[i]=transparent==-1?0:transparent;
	}
}
