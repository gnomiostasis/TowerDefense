function Player(id)
{
    this.resources = 4000;
    this.health = 20;
    this.id = id;
    this.tick = 0;
}

Player.prototype.update = function()
{
    this.tick++;
    if (this.tick == 60){
        this.tick=0;
        this.resources++;
    }
    
    var temp = document.getElementById(this.id+'_resources');
    temp.innerHTML = this.resources;

    
    var temp2 = document.getElementById(this.id+'_health');
    temp2.innerHTML = this.health;
    
}