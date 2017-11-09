
function Minion(player) {
    this.player = player;
    // thousands of a unit per update
    this.speed = 50;    //I don't know if this is an ok value
	//this.speed = 1 + Math.round(100 * Math.random());
    console.log(this.speed);
    this.maxhealth = 8;
    this.health = this.maxhealth;
	this.dead = false;
    if(this.player == 1){
		this.color = new BABYLON.Color3(1, 0, 0);
	}else{
		this.color = new BABYLON.Color3(0, 0, 1);
	}
	  //R, G, B.... This is an arbitrary color
    this.gameobj = null;
    this.material = null;
    this.direction = null;
    this.isReadyToMove = true;
    this.alpha = Math.PI;
    
}

Minion.prototype.getRealSpeed = function() {
    return this.speed / 1000;
};

Minion.prototype.moveUp = function () { GenericMove(this, "up", this.getRealSpeed()); }
Minion.prototype.moveDown = function () { GenericMove(this, "down", -1 * this.getRealSpeed()); }
Minion.prototype.moveLeft = function () { GenericMove(this, "left", -1 * this.getRealSpeed()); }
Minion.prototype.moveRight = function () { GenericMove(this, "right", this.getRealSpeed()); }


Minion.prototype.update = function () {
    if (this.isReadyToMove) {
        var pos = {x: Math.round(this.gameobj.position.x - 0.5), y: Math.round(this.gameobj.position.z - 0.5)};
        var target = this.target;
        if (pos.x == target.x && pos.y == target.y) {
            // blow up!
            var resman = this.player == 2 ? resourcemanager.player1 : resourcemanager.player2;
            resman.health -= 1;
            this.destroy();
            if (resman.health <= 0) {
                window.location.href = 'P' + this.player + 'Wins.html';
            }
            return;
        }
        var path = gridmath.aStar(pos, target, (this.player % 2) + 1);
        if (path.length <= 0) {
            return;
        }
        var next = path[0];
        if (next.x > pos.x) {
            this.moveRight();
        }
        else if (next.x < pos.x) {
            this.moveLeft();
        }
        else if (next.y > pos.y) {
            this.moveUp();
        }
        else if (next.y < pos.y) {
            this.moveDown();
        }
        else {
            console.log('?');
            console.log(pos);
            console.log(next);
        }
    }
    //this.bounce();
    this.move();
}

Minion.prototype.move = function () {
    if (this.direction == "right")
    {
        this.moveRight();
    }
    else if(this.direction == "left")
    {
        this.moveLeft();
    }
    else if(this.direction == "up")
    {
        this.moveUp();
    }
    else if (this.direction == "down") {
        this.moveDown();
    }
}

Minion.prototype.bounce = function () {
    this.alpha += .1;
    this.gameobj.position.y += Math.cos(this.alpha)/20;
}
Minion.prototype.create = function (x,z) {
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    this.gameobj = BABYLON.Mesh.CreateSphere("sphere_id", 16, 1, scene);
    // Move the sphere upward 1/2 its height
    this.gameobj.position.y = 1;
    this.gameobj.position.x = x!=undefined?x:10;
    this.gameobj.position.z = z!=undefined?z:10;
    this.gameobj.material = new BABYLON.StandardMaterial("matPlan1", scene);
    this.gameobj.material.diffuseColor = this.color;
}

Minion.prototype.destroy = function () {
    //Probably just remove from renderer and stuff like that
    soundmanager["minionDeath"].play();
    this.dead = true;
}

Minion.prototype.takeDamage= function(){
	this.health-=1;
	this.gameobj.scaling.x-=1/this.maxhealth;
	this.gameobj.scaling.y-=1/this.maxhealth;
	this.gameobj.scaling.z-=1/this.maxhealth;
	var pigment = this.health/this.maxhealth;
	
	if(this.player == 1){
		this.color = new BABYLON.Color3(pigment, 0, 0);
	}else{
		this.color = new BABYLON.Color3(0, 0, pigment);
	}
	
	if(this.health==0){
        if (this.player ==1){
            resourcemanager.player2.resources += 50;
        }else{
            resourcemanager.player1.resources += 50;
        }
		this.destroy();
	}
	this.gameobj.material.diffuseColor = this.color;
}

Minion.prototype.centeredOn = function(axis) {
    return Math.floor(this.gameobj.position[axis]) + 0.5 == Number(this.gameobj.position[axis].toFixed(2));
};


function GenericMove(minion,direction, speed)
{
    if (minion.isReadyToMove) {
       minion.isReadyToMove = false;
       minion.direction = direction;
       switch (minion.direction)
       {
           case "left": case "right":
               minion.gameobj.position.x += speed;
               break;
           case "up": case "down":
               minion.gameobj.position.z += speed;
               break;
       }
    }
    else {
        if (minion.direction == direction) {
            minion.direction = direction;

            if (minion.direction == "left" || minion.direction == "right")
            {
                if (minion.centeredOn('x')) {
                    minion.direction = null;
                    minion.isReadyToMove = true;
                }
                else {
                    minion.gameobj.position.x += speed;
                }
            }

            if (minion.direction == "up" || minion.direction == "down") {
                if (minion.centeredOn('z')) {
                    minion.direction = null;
                    minion.isReadyToMove = true;
                }
                else {
                    minion.gameobj.position.z += speed;
                }
            }
        }
    }
}
