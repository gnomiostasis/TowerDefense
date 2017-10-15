// TowerManager.js

function TowerManager() {
	
	this.towers = [];
	
    this.types=[
	{
	
    design : 
	[
	{prime: "box",x:0,y:0,z:0,xS:1,yS:2,zS:1,xR:0,yR:0,Zr:0, color: 1},
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
	},
	{
	
    design : 
	[
	{prime: "box",x:0,y:0,z:0,xS:.5,yS:5,zS:.5,xR:0,yR:0,zR:0, color: 2},
	{prime: "cylinder",x:0,y:3.5,z:0,xS:.5,yS:2,zS:.5,xR:0,yR:0,zR:0, color: 3}
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
    //var testtower = new Tower(0);
    //testtower.create(5,7,0);
    //this.towers.push(testtower);
}

TowerManager.prototype.buildTower = function(player,type){
	if(player ==1){
	var cursorPos = gridmanager.grid.cursor1;
	}
	if(player ==2){
	var cursorPos = gridmanager.grid.cursor2;
	}
	
	var tower = new Tower(type);
    tower.create(cursorPos.x,cursorPos.z,player);
    this.towers.push(tower);
	if (gridmanager.grid.getGridItem(cursorPos.x-.5,cursorPos.z-.5) == null){
		gridmanager.grid.addItemToGrid(cursorPos.x-.5,cursorPos.z-.5,tower);
	}
}

TowerManager.prototype.update = function() {
    
};
