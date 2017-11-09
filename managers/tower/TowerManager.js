// TowerManager.js

RESOURCE_COSTS = {
    0: 100,
    1: 500,
    2: 1000
}

function TowerManager() {
	
	this.towers = [];
	
    this.types=[
	{
    design : 
	[
	{prime: "box",x:0,y:0,z:0,xS:1,yS:1,zS:1,xR:0,yR:0,zR:0, color: 1},
	],
    material:null,
	attackSpeed: null,
	range : null
	},
	{
	
    design : 
	[
	{prime: "box",x:0,y:2.5,z:0,xS:.2,yS:2,zS:.2,xR:0,yR:0,zR:0, color: 1},
	{prime: "sphere",x:0,y:3.5,z:0,xS:.5,yS:.5,zS:.5,xR:0,yR:0,zR:0, color: 3},
	{prime: "cylinder",x:0,y:0,z:0,xS:1,yS:5,zS:1,xR:0,yR:0,zR:0, color: 2}
	],
    material:null,
	attackSpeed: null,
	range : null
	}
	];
}

TowerManager.prototype.init = function () {
}

TowerManager.prototype.buildTower = function(player,type){
    var cost = RESOURCE_COSTS[type];
    var resMan = resourcemanager['player' + player];
    
    if (type == 2) {
        var inc = 50;
        if (resMan.resources >= cost && minionmanager.frequency[player] > inc) {
            minionmanager.frequency[player] -= 50;
            resMan.resources -= cost;
        }
        
        return;
    }
	if(player ==1){
	var cursorPos = gridmanager.grid.cursor1;
	}
	if(player ==2){
	var cursorPos = gridmanager.grid.cursor2;
	}

	var pos = {x: Math.round(cursorPos.x-0.5), z: Math.round(cursorPos.z-0.5)};
    var posKey = pos.x + ',' + pos.z;
	
	if (gridmanager.grid.getGridItem(pos.x,pos.z) == null){
        gridmanager.grid[posKey] = true;
	}
    else {
        return;
    }

    if (resMan.resources >= cost) {
        resMan.resources -= cost;
    }
    else {
        gridmanager.grid[posKey] = null;
        return;
    };

    var start, end;
    if (player == 1) {
        start = {x: -15, y: 1};
        end = {x: 14, y: 1};
    }
    else if (player == 2) {
        start = {x: 14, y: -2};
        end = {x: -15, y: -2};
    }
    var cacheName = 'temp' + player;
    gridmath.clearPathCache(cacheName);
    var path = gridmath.aStar(start, end, cacheName);
    if (path.length > 0) {
        gridmath.movePathCache(cacheName, player);
        var tower = new Tower(type, player);
        tower.create(cursorPos.x,cursorPos.z,player);
        this.towers.push(tower);
        gridmanager.grid[posKey] = null;
        gridmanager.grid.addItemToGrid(pos.x,pos.z,tower);
    }
    else {
        gridmanager.grid[posKey] = null;
        resMan.resources += cost;
    }
    
};

TowerManager.prototype.sellTower = function(player) {

    var cursorPos;
    if (player == 1)
        cursorPos = gridmanager.grid.cursor1;
    if (player == 2)
        cursorPos = gridmanager.grid.cursor2;

    var pos = {x: Math.round(cursorPos.x-0.5), z: Math.round(cursorPos.z-0.5)};
    var posKey = pos.x + ',' + pos.z;

    var tower = gridmanager.grid[posKey];
    if (tower != null && tower.type != null) {
        gridmanager.grid[posKey] = null;
        gridmath.clearPathCache(player);
        var start, end;
        if (player == 1) {
            start = {x: -15, y: 1};
            end = {x: 14, y: 1};
        }
        else if (player == 2) {
            start = {x: 14, y: -2};
            end = {x: -15, y: -2};
        }
        gridmath.aStar(start, end, player);

        var cost = Math.round(0.95 * RESOURCE_COSTS[tower.type]);
        if (!isNaN(cost))
            resourcemanager['player' + player].resources += cost;

        var index = this.towers.indexOf(tower);
        if (index >= 0)
            this.towers.splice(index, 1);

        tower.destroy();
    }
};

TowerManager.prototype.update = function() {
	for(var i=0; i<this.towers.length;i++){
		if(this.towers[i].type==1){
			this.towers[i].update();
		}
	}
};
