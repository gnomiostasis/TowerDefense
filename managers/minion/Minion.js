function Minion() {
    this.speed = 0.05;    //I don't know if this is an ok value
    this.health = 100;
    this.color = new BABYLON.Color3(0, 1, 0);  //R, G, B.... This is an arbitrary color
    this.gameobj = null;
    this.material = null;
    this.direction = null;
    this.isReadyToMove = true;
    this.alpha = Math.PI;
    
}

Minion.prototype.moveUp = function () { GenericMove(this, "up", this.speed); }
Minion.prototype.moveDown = function () { GenericMove(this, "down", -1 * this.speed); }
Minion.prototype.moveLeft = function () { GenericMove(this, "left", -1 * this.speed); }
Minion.prototype.moveRight = function () { GenericMove(this, "right", this.speed); }


Minion.prototype.update = function () {
    if (this.isReadyToMove) {
        var pos = {x: this.gameobj.position.x, y: this.gameobj.position.y};
        var target = this.target;
        if (pos.x == target.x && pos.y == target.y) {
            return;
        }
        var path = gridmath.aStar(pos, target);
        if (path.length <= 0) {
            return;
        }
        var next = path[0];
        if (next.x > pos.x) {
            this.moveRight();
            console.log('moveRight');
        }
        else if (next.x < pos.x) {
            this.moveLeft();
            console.log('moveLeft');
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
    else {
        var rand = Math.floor(Math.random() * 4);
        switch (rand)
        {
            case 0:
                this.moveUp();
                break;
            case 1:
                this.moveDown();
                break;
            case 2:
                this.moveLeft();
                break;
            case 3:
                this.moveRight();
                break;
        }
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
    this.gameobj.material.emissiveColor = this.color;
    this.gameobj.material.backFaceCulling = true;
}

Minion.prototype.destroy = function () {
    //Probably jsut remove from renderer and stuff like that

}


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
                var offset = 0.5;
                
                if (Math.floor(minion.gameobj.position.x) + offset == Number(minion.gameobj.position.x.toFixed(2))) {
                    minion.direction = null;
                    minion.isReadyToMove = true;
                }
                else {
                    minion.gameobj.position.x += speed;
                }
            }

            if (minion.direction == "up" || minion.direction == "down") {
                var offset = 0.5;
                if (Math.floor(minion.gameobj.position.z) + offset == Number(minion.gameobj.position.z.toFixed(2))) {
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
