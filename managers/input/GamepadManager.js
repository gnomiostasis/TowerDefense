// GamepadManager.js

TOWER_TYPES = [0, 1, 2];
MIRROR_INPUT = true;

function GamepadManager() {
    this.buttons = {a: 1, b: 1, x: 1, y: 1};
    this.axes = {axisX: 1, axisY: 1};
    this.state1 = this.newDefaultState(1);
    this.state2 = this.newDefaultState(2);

    if (window.gridmanager) {
        for (var i = 1; i <= 2; i++) {
            (function() {
                var cursor = gridmanager.grid['cursor' + i];
                var mirrorCursor = false;
                if (MIRROR_INPUT)
                    mirrorCursor = gridmanager.grid['cursor' + ((i % 2) + 1)];
                GAMEPAD[i].on('a', function(value, state) {
                    towermanager.buildTower(state.player, state.towerType);
                    if (mirrorCursor)
                        towermanager.buildTower((state.player % 2) + 1, state.towerType);
                });
                GAMEPAD[i].on('b', function(value, state) {
                    towermanager.sellTower(state.player);
                    if (mirrorCursor)
                        towermanager.sellTower((state.player % 2) + 1);
                });
                GAMEPAD[i].on('y', function(value, state) {
                    if (value) {
                        state.towerType = (TOWER_TYPES.length + state.towerType - 1) % TOWER_TYPES.length;
                        resourcemanager.highlight(state.player, state.towerType);
                        if (mirrorCursor)
                            resourcemanager.highlight((state.player % 2) + 1, state.towerType);
                    }
                });
                GAMEPAD[i].on('x', function(value, state) {
                    if (value) {
                        state.towerType = ++state.towerType % TOWER_TYPES.length;
                        resourcemanager.highlight(state.player, state.towerType);
                        if (mirrorCursor)
                            resourcemanager.highlight((state.player % 2) + 1, state.towerType);
                    }
                });
                GAMEPAD[i].on('axisX', function(value, state) {
                    if (value > 0)
                        cursor.moveRight();
                    else if (value < 0)
                        cursor.moveLeft();
                    if (mirrorCursor) {
                        if (value > 0)
                            mirrorCursor.moveLeft();
                        else if (value < 0)
                            mirrorCursor.moveRight();
                    }
                });
                GAMEPAD[i].on('axisY', function(value, state) {
                    if (value > 0)
                        cursor.moveDown();
                    else if (value < 0)
                        cursor.moveUp();
                    if (mirrorCursor) {
                        if (value > 0)
                            mirrorCursor.moveUp();
                        else if (value < 0)
                            mirrorCursor.moveDown();
                    }
                });
            })();
        }
    }

}

GamepadManager.prototype.newDefaultState = function(player) {
    return {
        player: player,
        index: null,
        a: false,
        b: false,
        x: false,
        y: false,
        axisX: 0,
        axisY: 0,
        lastAxisTrigger: 0,
        towerType: 0
    };
    resourcemanager.highlight(player, 0);
};

GamepadManager.prototype.cloneState = function(state) {
    var newState = {};
    for (var key in state) {
        newState[key] = state[key];
    }
    return newState;
};

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

GamepadManager.prototype.parseAxis = function(value) {
    if (Math.abs(value) < 0.5)
        return 0;
    else if (value > 0)
        return 1;
    else
        return -1;
    //else
    //    return Number(value.toFixed(1));
};

GamepadManager.prototype.processGamepadState = function(gamepad, state) {
    var oldState = this.cloneState(state);
    if (gamepad.buttons[0])
        state.a = gamepad.buttons[0].pressed;
    if (gamepad.buttons[1])
        state.b = gamepad.buttons[1].pressed;
    if (gamepad.buttons[2])
        state.x = gamepad.buttons[2].pressed;
    if (gamepad.buttons[3])
        state.y = gamepad.buttons[3].pressed;

    if (gamepad.axes[0])
        state.axisX = this.parseAxis(gamepad.axes[0]);
    if (gamepad.axes[1])
        state.axisY = this.parseAxis(gamepad.axes[1]);
    //if (gamepad.axes[2])
    //    state.axisX = this.parseAxis(gamepad.axes[2]);
    //if (gamepad.axes[3])
    //    state.axisY = this.parseAxis(gamepad.axes[3]);

    var currTime = new Date().getTime();
    var dT = currTime - state.lastAxisTrigger;
    var threshold = 150; // milliseconds

    for (var axis in this.axes)
        if (this.axes[axis] === 1 && (oldState[axis] != state[axis]
                || (state[axis] != 0 && dT >= threshold))) {
            GAMEPAD[state.player].trigger(axis, state[axis], state);
            state.lastAxisTrigger = currTime;
        }
    
    for (var button in this.buttons)
        if (this.buttons[button] === 1 && oldState[button] != state[button])
            GAMEPAD[state.player].trigger(button, state[button], state);
};
