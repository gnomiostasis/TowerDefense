// Gamepad.js

function Gamepad() {
    this.listeners = {};
}

Gamepad.prototype.on = function(name, func) {
    if (this.listeners[name] == null) {
        this.listeners[name] = [];
    }
    this.listeners[name].push(func);
};

Gamepad.prototype.trigger = function(name, value) {
    if (this.listeners[name] != null) {
        for (var i = 0; i < this.listeners[name].length; i++) {
            try {
                this.listeners[name][i](value);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
};

var GAMEPAD = {
    1: new Gamepad(),
    2: new Gamepad()
};
