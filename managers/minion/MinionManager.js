function MinionManager()
{
    this.minions = [];
}

MinionManager.prototype.init = function () {
    //var testmin = new Minion();
    //testmin.create(9.5, -9.5);
    //testmin.moveDown();
    //this.minions.push(testmin);
    
}
MinionManager.prototype.update = function () {
    //loop through each minion and update that bitch    
    for (var minion in this.minions) {
        //Check if need to spawn
        //check if need to die
        this.minions[minion].update();
    }
}