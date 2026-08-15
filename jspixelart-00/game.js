var SCREEN_WIDTH=512;
var SCREEN_HEIGHT=512;

var mouse=null;
var input=null;

var bitmapHeight=256;
var bitmapWidth=256;
var bitmap=new Uint8Array(bitmapHeight*bitmapWidth);

var currentColorIndex=12;

var GAME_STATE_DRAW=0;
var GAME_STATE_PICK=1;

var gameState=GAME_STATE_DRAW;

var isKeyXDown=false;

var cursorX=0;
var cursorY=0;

var prevX=0;
var prevY=0;

function DrawGrid(x,y,w,h,size,color) {
	for(var j=0;j<h;j++) {
		for(var i=0;i<w;i++) {
			DrawRect(x+i*size,y+j*size,size,size,color);
		}
	}
}

function SetBitmapPixel(x,y,color) {
	bitmap[y*bitmapWidth+x]=color;
}

function GetBitmapPixel(x,y) {
	return bitmap[y*bitmapWidth+x];
}

function draw() {	

	switch(gameState) {

		case GAME_STATE_DRAW:

			if(mouse.buttons.left) {
				var x=Math.trunc(mouse.x/32/pixelSize);
				var y=Math.trunc(mouse.y/32/pixelSize);
				SetBitmapPixel(cursorX*8+x,cursorY*8+y,currentColorIndex);
				FillRect(x*32+2,y*32+2,32-4,32-4,sweetie[currentColorIndex]);
				prevX=x;
				prevY=y;
			}

			if(input.isDown("KeyZ")) {
				if(!isKeyZDown) {
					isKeyZDown=true;
					currentColorIndex=(currentColorIndex+1)%sweetie.length;
					SetBitmapPixel(cursorX*32+prevX,cursorY*32+prevY,currentColorIndex);
					FillRect(prevX*32+2,prevY*32+2,32-4,32-4,sweetie[currentColorIndex]);
				}
			} else {
				isKeyZDown=false;
			}

			if(input.isDown("KeyX")) {
				if(!isKeyXDown) {
					isKeyXDown=true;
					ClearScreen(sweetie[0]);

					for(var j=0;j<bitmapHeight;j++) {
						for(var i=0;i<bitmapWidth;i++) {
							DrawPoint(i,j,sweetie[GetBitmapPixel(i,j)]);
						}
					}

					DrawRect(cursorX*8-1,cursorY*8-1,8+2,8+2,"#000000");
										
					gameState=GAME_STATE_PICK;
				}
			} else {
				isKeyXDown=false;
			}

			break;
		case GAME_STATE_PICK:

			if(mouse.buttons.left) {
				for(var j=0;j<8+2;j++) {
					for(var i=0;i<8+2;i++) {
						DrawPoint(cursorX*8+i-1,cursorY*8+j-1,sweetie[GetBitmapPixel(cursorX*8+i-1,cursorY*8+j-1)]);
					}
				}
				
				cursorX=Math.trunc(mouse.x/8/pixelSize);
				cursorY=Math.trunc(mouse.y/8/pixelSize);
				
				DrawRect(cursorX*8-1,cursorY*8-1,8+2,8+2,"#000000");
			}

			if(input.isDown("KeyX")) {
				if(!isKeyXDown) {
					isKeyXDown=true;
					ClearScreen(sweetie[0]);

					for(var j=0;j<8;j++) {
						for(var i=0;i<8;i++) {
							FillRect(i*32+2,j*32+2,32-4,32-4,sweetie[GetBitmapPixel(cursorX*8+i,cursorY*8+j)]);
						}
					}

					DrawGrid(0,0,8,8,32,"#000000");

					gameState=GAME_STATE_DRAW;
				}
			} else {
				isKeyXDown=false;
			}

			break;
		default:
			break;
	}

}

function update() {
	draw();
	mouse.update()
	requestAnimationFrame(update);
}

(function init() {
	
	mouse=new MouseManager(canvas);
	input=new InputManager();

	Screen(SCREEN_WIDTH,SCREEN_HEIGHT);	
	
	pixelSize=2;
	ClearScreen(sweetie[0]);
	DrawGrid(0,0,8,8,32,"#000000");
	
	requestAnimationFrame(update);
})();
