var SCREEN_WIDTH=256;
var SCREEN_HEIGHT=256;
var PIXEL_SIZE=1;

var mouse=null;
var input=null;
var bitmap=null;

function LoadTextFile(url, callback) {
	var xhr = new XMLHttpRequest();

	// Configure the request: GET method, asynchronous (true)
	xhr.open('GET', url, false);

	// Executed when the request state changes
	xhr.onreadystatechange = function () {
		// 4 means request is finished and response is ready
		if (xhr.readyState === 4) {
			if (xhr.status === 250 || xhr.status === 200) { // 200 is standard HTTP OK
				callback(null, xhr.responseText);
			} else {
				callback(new Error("Failed to load file \""+url+"\". Status: " + xhr.status));
			}
		}
	};

	// Send the request
	xhr.send();
}

function LoadBitmap(url) {
	self=this;
	self.bitmap=null;
	LoadTextFile(url,function(err,txt) {
		if(err) {
			throw err;
		} else {
			var data=JSON.parse(txt);
			var hex="0123456789ABCDEF";
			var m=0;

			self.bitmap=new Bitmap(data.w,data.h,sweetie,-1);

			for(var i=0;i<data.w;i++) {
				for(var j=0;j<data.h;j++) {
					var k=-1;
					for(var l=0;l<hex.length;l++) {
						if(data.pixels[j][i]===hex[l]) {
							k=l;
							break;
						}
					}
					self.bitmap.setPixel(i,j,k);
				}
			}
		}
	});
	return self.bitmap;
}

function DrawGrid(x,y,w,h,size,color,pixelSize) {
	for(var j=0;j<h;j++) {
		for(var i=0;i<w;i++) {
			DrawRect(x+i*size,y+j*size,size,size,color,pixelSize);
		}
	}
}

function draw() {	
}

function update() {
	draw();
	mouse.update()
	requestAnimationFrame(update);
}

(function init() {
	mouse=new MouseManager(canvas);
	input=new InputManager();
	bitmap=LoadBitmap("heart.json");

	Screen(SCREEN_WIDTH,SCREEN_HEIGHT);		
	ClearScreen(sweetie[0]);

	bitmap.draw(0,0,0,0,8,8,32,PIXEL_SIZE);
	DrawGrid(0,0,8,8,32,"#000000",PIXEL_SIZE);
	
	requestAnimationFrame(update);
})();
