var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Screen(w,h) {
	canvas.width=w;
	canvas.height=h;
}

function ClearScreen(color) {
	ctx.fillStyle=color;
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function DrawPoint(x, y, color, size) {
	ctx.fillStyle = color;
	ctx.fillRect(x*size, y*size, size, size);
}

function DrawLine(x00, y00, x01, y01, color, size) {
    var x0 = Math.trunc(x00);
    var y0 = Math.trunc(y00);
    var x1 = Math.trunc(x01);
    var y1 = Math.trunc(y01);

    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    
    var err = dx - dy;
    
    while (true) {
        DrawPoint(x0, y0, color, size);
        
        if (x0 === x1 && y0 === y1) break;
        
        var e2 = 2 * err;
        
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function DrawRect(x00, y00, w00, h00, color, size) {
    var x0 = Math.trunc(x00);
    var y0 = Math.trunc(y00);
    var w = Math.trunc(w00);
    var h = Math.trunc(h00);
    
    // Calculate the ending coordinates once
    var x1 = x0 + w-1;
    var y1 = y0 + h-1;

    // Draw top and bottom horizontal lines
    for (var i = x0; i <= x1; i++) {
        DrawPoint(i, y0, color, size);
        DrawPoint(i, y1, color, size);
    }

    // Draw left and right vertical lines (excluding the already-drawn corners)
    for (var j = y0 + 1; j < y1; j++) {
        DrawPoint(x0, j, color, size);
        DrawPoint(x1, j, color, size);
    }
}

function FillRect(x00, y00, w00, h00, color, size) {
    var x = Math.trunc(x00);
    var y = Math.trunc(y00);
    var w = Math.trunc(w00);
    var h = Math.trunc(h00);

	for (var cy = y; cy <= y + h; cy++) {
		for (var cx = x; cx <= x + w; cx++) {
			DrawPoint(cx, cy, color, size);
		}
	}
}

function DrawCircle(x00,y00,radius00,color,size) {

    var x = Math.trunc(x00);
    var y = Math.trunc(y00);
    var radius = Math.trunc(radius00);

	var cx = radius;
	var cy = 0;
	var err = 0;

	while (cx >= cy) {
		DrawPoint(x + cx, y + cy, color, size);
		DrawPoint(x + cy, y + cx, color, size);
		DrawPoint(x - cy, y + cx, color, size);
		DrawPoint(x - cx, y + cy, color, size);
		DrawPoint(x - cx, y - cy, color, size);
		DrawPoint(x - cy, y - cx, color, size);
		DrawPoint(x + cy, y - cx, color, size);
		DrawPoint(x + cx, y - cy, color, size);

		if (err <= 0) {
			cy += 1;
			err += 2 * cy + 1;
		}
		if (err > 0) {
			cx -= 1;
			err -= 2 * cx + 1;
		}
	}
}

function FillCircle(x00,y00,radius00,color,size) {

    var x = Math.trunc(x00);
    var y = Math.trunc(y00);
    var radius = Math.trunc(radius00);

	var cx = radius;
	var cy = 0;
	var err = 0;

	while (cx >= cy) {
		DrawLine(x - cx, y + cy, x + cx, y + cy, color, size);
		DrawLine(x - cy, y + cx, x + cy, y + cx, color, size);
		DrawLine(x - cx, y - cy, x + cx, y - cy, color, size);
		DrawLine(x - cy, y - cx, x + cy, y - cx, color, size);

		if (err <= 0) {
			cy += 1;
			err += 2 * cy + 1;
		}
		if (err > 0) {
			cx -= 1;
			err -= 2 * cx + 1;
		}
	}
}


