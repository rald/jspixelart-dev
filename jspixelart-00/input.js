function InputManager(trackedKeys) {
    this.keys = {};
    
    // Default keys if none provided
    var defaultKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
        'KeyA', 'KeyS', 'KeyZ', 'KeyX'
    ];
    
    var keysToTrack = trackedKeys || defaultKeys;
    var i;

    // Initialize key states
    for (i = 0; i < keysToTrack.length; i++) {
        this.keys[keysToTrack[i]] = false;
    }

    var self = this;

    // Helper to check if array includes a value (since ES1 has no Array.prototype.indexOf/includes)
    function arrayContains(arr, val) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] === val) {
                return true;
            }
        }
        return false;
    }

    // Event handlers
    this._onKeyDown = function(e) {
        var evt = e || window.event;
        var code = evt.code || evt.keyCode; // Fallback support if needed
        
        if (Object.prototype.hasOwnProperty.call(self.keys, evt.code)) {
            self.keys[evt.code] = true;

            // Prevent default behavior for directional/space keys
            var preventList = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
            if (arrayContains(preventList, evt.code)) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt.returnValue = false; // IE old fallback
                }
            }
        }
    };

    this._onKeyUp = function(e) {
        var evt = e || window.event;
        if (Object.prototype.hasOwnProperty.call(self.keys, evt.code)) {
            self.keys[evt.code] = false;
        }
    };

    // Attach listeners
    if (window.addEventListener) {
        window.addEventListener('keydown', this._onKeyDown, false);
        window.addEventListener('keyup', this._onKeyUp, false);
    } else if (window.attachEvent) { // Legacy IE support
        window.attachEvent('onkeydown', this._onKeyDown);
        window.attachEvent('onkeyup', this._onKeyUp);
    }
}

// Prototype method to check if a key is down
InputManager.prototype.isDown = function(code) {
    return !!this.keys[code];
};

// Cleanup method
InputManager.prototype.destroy = function() {
    if (window.removeEventListener) {
        window.removeEventListener('keydown', this._onKeyDown, false);
        window.removeEventListener('keyup', this._onKeyUp, false);
    } else if (window.detachEvent) {
        window.detachEvent('onkeydown', this._onKeyDown);
        window.detachEvent('onkeyup', this._onKeyUp);
    }
};