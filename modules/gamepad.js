(function() {
    angular.module("gamepadApp", []).factory("Gamepads", function() {
        var t;
        return t = function() {
            function t() {}
            return t.prototype.poll = function() {
                return this.gamepads = ("function" == typeof navigator.getGamepads ? navigator.getGamepads() : void 0) || ("function" == typeof navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : void 0) || []
            }
            ,
            t
        }()
    }).factory("$requestAnimationFrame", ["$rootScope", function(t) {
        return function(n) {
            return requestAnimationFrame(function() {
                return t.$apply(n)
            })
        }
    }
    ]).controller("MainCtrl", ["$scope", "$requestAnimationFrame", "Gamepads", function(t, n, e) {
        var a;
        return t.gamepads = new e,
        t.axisStyle = function(t) {
            return {
                opacity: Math.abs(t) + .3
            }
        }
        ,
        t.buttonStyle = function(n) {
            var e;
            return e = t.buttonValue(n),
            {
                opacity: Math.abs(e) + .3,
                border: t.buttonPressed(n) ? "1px solid #888" : "1px solid transparent"
            }
        }
        ,
        t.buttonValue = function(t) {
            return "number" == typeof t ? t : t.value
        }
        ,
        t.buttonPressed = function(t) {
            return "number" == typeof t ? t > .1 : t.pressed
        }
        ,
        t.mappingString = function(t) {
            return t ? t : "[none]"
        }
        ,
        (a = function() {
            return t.gamepads.poll(),
            n(a)
        }
        )()
    }
    ])
}
).call(this);
