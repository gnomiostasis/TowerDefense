function MinionManager()
{
    this.minions = [];
    this.tick = 0;
    this.frequency = {1: 500, 2: 500};
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
		if(this.minions[i].dead){
            this.minions[i].gameobj.dispose();
			this.minions.splice(i,1);
		}
    }
	


    if (this.tick % this.frequency[2] === 0) {
        var m = new Minion(2);
        m.create(-14.5, 1.5);
        m.target = {x: 14, y: 1};
        this.minions.push(m);
    }
    if (this.tick % this.frequency[1] === 0) {
        var m = new Minion(1);
        m.create(14.5, -1.5);
        m.target = {x: -15, y: -2};
        this.minions.push(m);
    }

    this.tick++;
}

