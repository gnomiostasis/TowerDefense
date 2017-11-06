


function soundManagerInit(){
var soundManager = {};
var files = [
{
	file: "sounds/MinionDeath.wav",
	name: "minionDeath",
    loop: false,
    callback: null
},
{
	file: "sounds/p1_TowerShoot.wav",
	name: "P1Shoot",
    loop: false
},
{
	file: "sounds/P2_TowerShoot.wav",
	name: "P2Shoot",
    loop: false,
    callback: null
},
{
	file: "sounds/PlaceTower.wav",
	name: "PlaceTower",
    loop: false,
    callback: null
},
{
	file: "sounds/PlaceWall.wav",
	name: "PlaceWall",
    loop: false,
    callback: null
},
{
	file: "sounds/PressStart.wav",
	name: "Start",
    loop: false,
    callback: null
},
{
	file: "sounds/StartMenu.wav",
	name: "Menu",
    loop: true,
    callback: null
},
{
	file: "sounds/GameMusic.wav",
	name: "GameMusic",
    loop: true,
    callback: null
    //function(){
    //    soundmanager["GameMusic"].play();
    //}
},
{
	file: "sounds/PeaceMusic.wav",
	name: "PeaceMusic",
    loop: true,
    callback: 
    function(){
        soundmanager["PeaceMusic"].play();
    }
}
];

for (var i =0; i<files.length; i++){
    var loopBool = files[i].loop;
	soundManager[files[i].name]= new BABYLON.Sound(files[i].name, files[i].file, scene, files[i].callback, { loop: loopBool, autoplay: false });
}


return soundManager;
}
