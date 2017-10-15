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

ResourceManager.prototype.highlight = function(player, buildtype)
{
    if (player == 1)
    {
        $('.player1_highlight').removeClass('player1_highlight');
        switch (buildtype)
        {
            case 0:
                //wall
                $("#p1hud .option_0").addClass("player1_highlight")
                break;
            case 1:
                //tower
                $("#p1hud .option_1").addClass("player1_highlight")
                break;
            case 2:
                //spawn
                $("#p1hud .option_2").addClass("player1_highlight")
                break;
        }
    }
    else if (player == 2) {
        $('.player2_highlight').removeClass('player2_highlight');

        switch (buildtype) {
            case 0:
                //wall
                $("#p2hud .option_0").addClass("player2_highlight")
                break;
            case 1:
                //tower
                $("#p2hud .option_1").addClass("player2_highlight")
                break;
            case 2:
                //spawn
                $("#p2hud .option_2").addClass("player2_highlight")
                break;
        }
    }


}