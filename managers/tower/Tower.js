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
			this.gameobj[i] =  BABYLON.Mesh.CreateCylinder("cylinder", 1, .3, 1, 8, 1, scene);
		}
		this.gameobj[i].scaling.y = geometry[i].yS;
		this.gameobj[i].scaling.x = geometry[i].xS;
		this.gameobj[i].scaling.z = geometry[i].zS;
		
		this.gameobj[i].rotation.y = geometry[i].yR;
		this.gameobj[i].rotation.x = geometry[i].xR;
		this.gameobj[i].rotation.z = geometry[i].zR;
		
		this.gameobj[i].position.y = geometry[i].y +.5;
		this.gameobj[i].position.x = x + geometry[i].x;
		this.gameobj[i].position.z = y + geometry[i].z;
		
		this.gameobj[i].material = new BABYLON.StandardMaterial("matPlan1", scene);
		this.gameobj[i].enableEdgesRendering();    
		this.gameobj[i].edgesWidth = 4.0;
		if(player===1){
			if(geometry[i].color==0){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(230/255, 231/255, 232/255);
			}else
			if(geometry[i].color==1){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(242/255, 161/255, 5/255);
			} else
			if(geometry[i].color==2){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(242/255, 183/255, 5/255);
			} else
			if(geometry[i].color==3){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(242/255, 79/255, 81/255);
			}
			
			
		} else{
			this.gameobj[i].edgesColor = new BABYLON.Color4(0,0,1,1);
			if(geometry[i].color==0){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(54/255, 63/255, 69/255);
			}else
			if(geometry[i].color==1){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(126/255, 206/255, 253/255);
			} else
			if(geometry[i].color==2){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(31/255, 183/255, 253/255);
			} else
			if(geometry[i].color==3){
			this.gameobj[i].material.diffuseColor = new BABYLON.Color3(33/255, 133/255, 197/255);
			}
			
		}
	}
	
};

Tower.prototype.update = function() {
    
};
