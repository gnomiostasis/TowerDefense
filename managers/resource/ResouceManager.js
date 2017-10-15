function ResourceManager()
{
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.time = 0;
}

ResourceManager.prototype.update = function ()
{
    this.player1.update();
    this.player2.update();
    this.time++;
    var x = document.getElementsByClassName("time");
    for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = Math.floor(this.time/10)
    }
}