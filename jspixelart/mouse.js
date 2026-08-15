function MouseManager(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    
    this.buttons = { left: false, middle: false, right: false };
    this.pressed = { left: false, middle: false, right: false };
    this.released = { left: false, middle: false, right: false };
    
    this._rawPressed = { left: false, middle: false, right: false };
    this._rawReleased = { left: false, middle: false, right: false };

    var self = this;

    var getButtonKey = function(code) {
        if (code === 0) return 'left';
        if (code === 1) return 'middle';
        if (code === 2) return 'right';
        return null;
    };

    var updateCoordinates = function(clientX, clientY) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        
        self.x = (clientX - rect.left) * scaleX;
        self.y = (clientY - rect.top) * scaleY;
    };

    canvas.addEventListener('mousemove', function(e) {
        if (document.pointerLockElement === canvas) {
            self.dx += e.movementX;
            self.dy += e.movementY;
        } else {
            updateCoordinates(e.clientX, e.clientY);
        }
    });

    canvas.addEventListener('mousedown', function(e) {
        updateCoordinates(e.clientX, e.clientY);
        var b = getButtonKey(e.button);
        if (b) {
            self.buttons[b] = true;
            self._rawPressed[b] = true;
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        updateCoordinates(e.clientX, e.clientY);
        var b = getButtonKey(e.button);
        if (b) {
            self.buttons[b] = false;
            self._rawReleased[b] = true;
        }
    });

    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

/*
    
	// Hide mouse when entering the canvas
    canvas.addEventListener('mouseenter', () => {
        canvas.style.cursor = 'none';
    });

    // Show mouse when leaving the canvas
    canvas.addEventListener('mouseleave', () => {
        canvas.style.cursor = 'auto';
    });    
*/


}

MouseManager.prototype.update = function() {
    var b;
    this.dx = 0;
    this.dy = 0;
    for (b in this.pressed) {
        this.pressed[b] = this._rawPressed[b];
        this._rawPressed[b] = false;
        this.released[b] = this._rawReleased[b];
        this._rawReleased[b] = false;
    }
};

MouseManager.prototype.requestLock = function() {
    if (this.canvas.requestPointerLock) {
        this.canvas.requestPointerLock();
    }
};