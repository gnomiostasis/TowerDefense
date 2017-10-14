function Minion() {
    this.speed = 0.05;    //I don't know if this is an ok value
    this.health = 100;
    this.color = new BABYLON.Color3(0, 1, 0);  //R, G, B , A?    .... This is an arbitrary color
    this.gameobj = null;
    this.material = null;
    this.direction = null;
    
}


Minion.prototype.update = function () {

}

Minion.prototype.create = function () {
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    this.gameobj = BABYLON.Mesh.CreateSphere("sphere1_id", 16, 1, scene);
    // Move the sphere upward 1/2 its height
    this.gameobj.position.y = .5;
    this.gameobj.position.x = 10;
    this.gameobj.position.z = 10;
    this.gameobj.material = new BABYLON.StandardMaterial("matPlan1", scene);
    this.gameobj.material.emissiveColor = this.color;
    this.gameobj.material.backFaceCulling = true;
}

Minion.prototype.destroy = function () {
    //Probably jsut remove from renderer and stuff like that

}

Minion.prototype.moveUp = function () {
    this.gameobj.position.z += this.speed;
}
Minion.prototype.moveDown = function () {
    this.gameobj.position.z -= this.speed;
}
Minion.prototype.moveLeft = function () {
    this.gameobj.position.x -= this.speed;
}
Minion.prototype.moveRight = function () {
    this.gameobj.position.x += this.speed;
}