function MinionManager()
{
    this.minions = [];
    this.tick = {1:1, 2:1};
    this.frequency = {1: 1000, 2: 1000};
    this.waveSize = {1: 5, 2: 5};
    this.currentWave = {1: 0, 2: 0};
    this.spawnPhase = {1: 0, 2: 0};
    this.spawnRate = 30;
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
    this.calcSpawnWave(1);
    this.calcSpawnWave(2);

}
MinionManager.prototype.calcSpawnWave=function(player){
    	if (this.spawnPhase[player] === 1){
        if (this.tick[player] % this.spawnRate === 0){
            this.spawnMinion(player);
            this.currentWave[player]++;
        }
        this.tick[player]++;
        if (this.currentWave[player]===this.waveSize[1]){
            this.currentWave[player]=0;
            this.tick[player] =1;
            this.spawnPhase[player]=0;
            console.log("spawnPhaseEnd")
        }
    }
    else{
        if (this.tick[player] % this.frequency[player] === 0){
            this.spawnPhase[player] = 1;
            console.log("spawnPhase")
            this.tick[player] = 1;
        }else{
            this.tick[player]++;
        }
    }
}

MinionManager.prototype.spawnMinion=function(player){
        var m = new Minion(player);
        if(player == 1){
            m.create(14.5, -1.5);
            m.target = {x: -15, y: -2};
            this.minions.push(m);
        }
        else{
        m.create(-14.5, 1.5);
        m.target = {x: 14, y: 1};
        this.minions.push(m);
        }
}
