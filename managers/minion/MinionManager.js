function MinionManager()
{
    this.minions = [];
    this.tick = 0;
}

MinionManager.prototype.init = function () {
    //var testmin = new Minion();
    //testmin.create(1.5, -1.5); //Should create at an .5
    //testmin.moveDown();
    //this.minions.push(testmin);
    
}
MinionManager.prototype.update = function () {
    //loop through each minion and update that bitch    
    for (var i = 0; i < this.minions.length; i++) {
        //Check if need to spawn
        //check if need to die
        this.minions[i].update();
    }

    if (this.tick % 10 === 0) {
        var m = new Minion();
        m.create(15.5, 1.5);
        m.target = {x: -15.5, y: 1.5};
        this.minions.push(m);
        
        var m = new Minion();
        m.create(-15.5, -1.5);
        m.target = {x: -15.5, y: -1.5};
        this.minions.push(m);
    }

    this.tick++;
}

