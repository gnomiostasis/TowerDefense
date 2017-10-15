function Player(id)
{
    this.resources = 0;
    this.health = 100;
    this.id = id;
}

Player.prototype.update = function()
{
    this.resources++;
    var temp = document.getElementById(this.id+'_resources');
    temp.innerHTML = this.resources;
}