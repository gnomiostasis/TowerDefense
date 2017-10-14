// GamepadManager.js

function GamepadManager() {
    this.state1 = {
        player: 1,
        index: null,
        axes: [],
        buttons: []
    };
    this.state2 = {
        player: 2,
        index: null,
        axes: [],
        buttons: []
    };
}

GamepadManager.prototype.update = function() {
    var gamepads = this.getRawGamepads();
    for (var i = 0; i < gamepads.length; i++) {
        this.processGamepad(gamepads[i], i);
    }
};

GamepadManager.prototype.getRawGamepads = function() {
    return (navigator.getGamepads ? navigator.getGamepads() : false)
//        || (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : false)
        || [];
};

GamepadManager.prototype.processGamepad = function(gamepad, i) {
    var state = null;
    if (this.state1.index === i) {
        state = this.state1;
    }
    else if (this.state2.index === i) {
        state = this.state2;
    }
    if (state && !gamepad) {
        state.index = null;
        state = null;
    }
    if (gamepad && !state) {
        if (this.state1.index === null && this.state2.index !== i) {
            this.state1.index = i;
            state = this.state1;
        }
        else if (this.state2.index === null && this.state1.index !== i) {
            this.state2.index = i;
            state = this.state2;
        }
    }
    if (state) {
        this.processGamepadState(gamepad, state);
    }
};

GamepadManager.prototype.processGamepadState = function(gamepad, state) {
    for (var i = 0; i < gamepad.axes.length; i++) {
        console.log('p' + state.player + ' axis' + i + ': ' + gamepad.axes[i]);
    }
    for (var i = 0; i < gamepad.buttons.length; i++) {
        console.log('p' + state.player + ' button' + i + ': ' + gamepad.buttons[i].pressed);
    }
};
