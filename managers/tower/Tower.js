// Tower.js

function Tower(type, player) {
	this.gameobj = [];
	this.design = towermanager.types[type].design;
	this.color = towermanager.types[type].color;
	this.atkSpd = 100;
	this.type = type;
	this.player = player;
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
    if (this.type==1){
		if (this.bullet !=null){
				this.bullet.dispose();
				this.bullet = null;
		}
		if (this.atkSpd == 100){
			
			for(var i=0;i<minionmanager.minions.length;i++){
				if (minionmanager.minions[i].player != this.player){
					if((Math.abs(
						minionmanager.minions[i].gameobj.position.x - this.gameobj[0].position.x)
						<4)&& Math.abs(
						minionmanager.minions[i].gameobj.position.z - this.gameobj[0].position.z)<4)
						{
							this.bullet = BABYLON.Mesh.CreateSphere("bullet", 8, 1, scene);
							this.bullet.scaling.y=.3;
							this.bullet.scaling.x=10;
							this.bullet.scaling.z=.3;
							this.bullet.position.x = (this.gameobj[0].position.x+minionmanager.minions[i].gameobj.position.x)/2; 
							this.bullet.position.z = (this.gameobj[0].position.z+minionmanager.minions[i].gameobj.position.z)/2;
							function angle(cx, cy, ex, ey) {
							  var dy = ey - cy;
							  var dx = ex - cx;
							  var theta = Math.atan2(dy, dx); // range (-PI, PI]
							  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
							  //if (theta < 0) theta = 360 + theta; // range [0, 360)
							  return theta;
							}
							
							this.bullet.rotation.y = (angle(this.gameobj[0].position.x,this.gameobj[0].position.z,minionmanager.minions[i].gameobj.position.x,minionmanager.minions[i].gameobj.position.z)/360);
							
							this.atkSpd = 0;
							minionmanager.minions[i].takeDamage();
							return;
						}
				}
			}
		}else{
			this.atkSpd++;
		}
	}
};
