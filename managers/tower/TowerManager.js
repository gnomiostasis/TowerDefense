// TowerManager.js

function TowerManager() {
	
	this.towers = [];
	
    this.types=[
	{
	
    design : 
	[
	{prime: "box",x:0,y:.5,z:0,xS:1,yS:1,zS:1,xR:0,yR:0,Zr:0, color: this.color = new BABYLON.Color3(0, 1, 0)},
	],
    material:null,
	attackSpeed: null,
	range : null
	},
	{
	
    design : 
	[
	{prime: "box",x:0,y:.5,z:0,xS:1,yS:1,zS:1,xR:0,yR:0,Zr:0, color: this.color = new BABYLON.Color3(0, 1, 0)},
	{prime: "cylinder",x:0,y:3,z:0,xS:1,yS:4,zS:1,xR:0,yR:0,Zr:0, color: this.color = new BABYLON.Color3(1, 0, 0)},
	{prime: "sphere",x:0,y:5,z:0,xS:1.5,yS:1,zS:1.5,xR:0,yR:0,Zr:0, color: this.color = new BABYLON.Color3(0, 0, 1)},
	],
    material:null,
	attackSpeed: null,
	range : null
	}
	];
}

TowerManager.prototype.init = function () {
    //var testtower = new Tower(0);
    //testtower.create(5,7,0);
    //this.towers.push(testtower);
}

TowerManager.prototype.buildTower = function(player){
	if(player ==1){
	var cursorPos = gridmanager.grid.cursor1;
	}
	if(player ==2){
	var cursorPos = gridmanager.grid.cursor2;
	}
	
	var tower = new Tower(0);
    testtower.create(cursorPos.x,cursorPos.z,0);
    this.towers.push(testtower);
}

TowerManager.prototype.update = function() {
    
};
