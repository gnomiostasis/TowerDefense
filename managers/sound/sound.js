


function soundManagerInit(){
var soundManager = {};
var files = [
{
	file: "sounds/MinionDeath.wav",
	name: "minionDeath",
    loop: false
},
{
	file: "sounds/p1_TowerShoot.wav",
	name: "P1Shoot",
    loop: false
},
{
	file: "sounds/P2_TowerShoot.wav",
	name: "P2Shoot",
    loop: false
},
{
	file: "sounds/PlaceTower.wav",
	name: "PlaceTower",
    loop: false
},
{
	file: "sounds/PlaceWall.wav",
	name: "PlaceWall",
    loop: false
},
{
	file: "sounds/PressStart.wav",
	name: "Start",
    loop: false
},
{
	file: "sounds/StartMenu.wav",
	name: "Menu",
    loop: true
},
];

for (var i =0; i<files.length; i++){
	soundManager[files[i].name]= new BABYLON.Sound(files[i].name, files[i].file, scene, null, { loop: false, autoplay: false });
}


return soundManager;
}
