// gridmath.js
var gridmath = {
    p: function(x, y) {
        return {x: x, y: y};
    },
    // quick methods for getting East and West coordinates
    getN: function(p) {
        return gridmath.p(p.x, p.y + 1);
    },
    getE: function(p) {
        return gridmath.p(p.x + 1, p.y);
    },
    getW: function(p) {
        return gridmath.p(p.x - 1, p.y);
    },
    getS: function(p) {
        return gridmath.p(p.x, p.y - 1);
    },
    // get set of xy tile coordinates within range of a coordinate
    getCoordsInRange: function(p, r, includeOrigin) {
        includeOrigin = includeOrigin === undefined || includeOrigin;
        var s = gridmath._set();
        gridmath._gcir(s, p, r);
        if (!includeOrigin)
            s.delete(p);
        return s;
    },
    _gcir: function(s, p, r) {
        s.add(p);
        if (r > 0) {
            r -= 1;
            this._gcir(s, this.getN(p), r);
            this._gcir(s, this.getE(p), r);
            this._gcir(s, this.getW(p), r);
            this._gcir(s, this.getS(p), r);
        }
    },
    getEmptyCoordsInRange: function(p, r, includeSet) {
        includeSet = includeSet || gridmath._set();
        resultset = gridmath.getCoordsInRange(p, r, false);
        removeset = gridmath._set();
        resultset.forEach(function(c) {
            try {
                var tile = gridmanager.grid[c.x + ',' + c.y];
                if (!includeSet.has(c) && (tile !== null)) {
                    removeset.add(c);
                }
            }
            catch (ex) {
                removeset.add(c);
            }
        });
        return resultset.subtract(removeset);
    },
    // A* algorithm
    aStar: function(current, end) {
        var openSet = gridmath._set();
        var openHeap = gridmath._heap();
        var closedSet = gridmath._set();
        var includeSet = gridmath._set();
        includeSet.add(end);
        function retracePath(c) {
            var path = [];
            while (c.parent) {
                path.push(c);
                c = c.parent;
            }
            return path.reverse();
        }
        function getH(tile) {
            return Math.abs(end.x - tile.x) + Math.abs(end.y - tile.y);
        }
        // G: cost to get from start to tile
        current.G = 0;
        // F: cost to get from start to end through tile
        current.F = getH(current);
        current.parent = null;
        openSet.add(current);
        openHeap.push(current);
        while (openSet.getSize()) {
            current = openHeap.pop();
            if (current.x === end.x && current.y === end.y) {
                return retracePath(current);
            }
            openSet.delete(current);
            closedSet.add(current);
            gridmath.getEmptyCoordsInRange(current, 1, includeSet).forEach(function(tile) {
                if (!closedSet.has(tile)) {
                    tile.G = current.G + 1;
                    tile.F = tile.G + getH(tile);
                    tile.parent = current;
                    //if (!openSet.has(tile)) {
                    openSet.add(tile);
                    openHeap.push(tile);
                    //}
                }
            });
        }
        return [];
    },
    // set implementation
    _set: function() {
        return {
            data: new Set(),
            _stringify: function(tile) {
                return tile.x + ',' + tile.y;
            },
            add: function(tile) {
                tile = this._stringify(tile);
                this.data.add(tile);
            },
            has: function(tile) {
                tile = this._stringify(tile);
                return this.data.has(tile);
            },
            delete: function(tile) {
                tile = this._stringify(tile);
                this.data.delete(tile);
            },
            getSize: function() {
                return this.data.size;
            },
            forEach: function(callback, thisArg) {
                this.data.forEach(function(value, key, set) {
                    var temp = value.split(',');
                    callback.call(thisArg, gridmath.p(Number(temp[0]), Number(temp[1])), key, set);
                });
            },
            subtract: function(set) {
                set.forEach(function(tile) {
                    this.delete(tile);
                }, this);
                return this;
            },
            toArray: function() {
                var a = [];
                this.forEach(function(tile) {
                    a.push(tile);
                });
                return a;
            }
        };
    },
    // heap implementation
    _heap: function() {
        return {
            data: [],
            _sort: function() {
                this.data.sort(function(a, b) { return b.F - a.F; });
            },
            push: function(tile) {
                this.data.push(tile);
                this._sort();
            },
            pop: function() {
                return this.data.pop();
            }
        };
    }
}
