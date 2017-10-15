function Player(id)
{
    this.resources = 1337;
    this.health = 69;
    this.id = id;
}

Player.prototype.update = function()
{
    this.resources++;
    var temp = document.getElementById(this.id+'_resources');
    temp.innerHTML = this.resources;

    
    var temp2 = document.getElementById(this.id+'_health');
    temp2.innerHTML = this.health;
    
}