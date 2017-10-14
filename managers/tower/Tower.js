// Tower.js

function Tower(type) {
	this.gameobj = [];
	this.design = towermanager.types[type].design;
	this.color = towermanager.types[type].color;
}

Tower.prototype.create = function(x,y,player) {
	var id = "test";
	var geometry = this.design;
	for (var i=0; i<geometry.length; i++){
		if(geometry[i].prime === "box"){
			this.gameobj[i] = BABYLON.Mesh.CreateBox(id, 1, scene);
		} else 
		if(geometry[i].prime === "sphere"){
			this.gameobj[i] = BABYLON.Mesh.CreateSphere(id, 8, 1, scene);
		} else 
		if(geometry[i].prime === "cylinder"){
			this.gameobj[i] =  BABYLON.Mesh.CreateCylinder("cylinder", 1, 1, 1, 8, 1, scene);
		}
		this.gameobj[i].scaling.y = geometry[i].yS;
		this.gameobj[i].scaling.x = geometry[i].xS;
		this.gameobj[i].scaling.z = geometry[i].zS;
		
		this.gameobj[i].rotation.y = geometry[i].yR;
		this.gameobj[i].rotation.x = geometry[i].xR;
		this.gameobj[i].rotation.z = geometry[i].yR;
		
		this.gameobj[i].position.y = geometry[i].y;
		this.gameobj[i].position.x = x+ 0.5 + geometry[i].x;
		this.gameobj[i].position.z = y + 0.5 + geometry[i].z;
		
		this.gameobj[i].material = new BABYLON.StandardMaterial("matPlan1", scene);
		this.gameobj[i].material.emissiveColor = geometry[i].color;
	}
	
};

Tower.prototype.update = function() {
    
};
