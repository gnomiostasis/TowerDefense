﻿function MinionManager()
{
    this.minions = [];
    this.updateTime();
}

MinionManager.prototype.init = function () {
    //var testmin = new Minion();
    //testmin.create(1.5, -1.5); //Should create at an .5
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

MinionManager.prototype.updateTime = function() {
    this.time = new Date().getTime();
};
