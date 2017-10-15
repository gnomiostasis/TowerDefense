


function soundManagerInit(){
var soundManager = {};
var files = [
{
	file: "sounds/MinionDeath.wav",
	name: "minionDeath"
},
{
	file: "sounds/p1_TowerShoot.wav",
	name: "P1Shoot"
},
{
	file: "sounds/P2_TowerShoot.wav",
	name: "P2Shoot"
},
{
	file: "sounds/PlaceTower.wav",
	name: "PlaceTower"
},
{
	file: "sounds/PlaceWall.wav",
	name: "PlaceWall"
},
{
	file: "sounds/PressStart.wav",
	name: "Start"
},
{
	file: "sounds/StartMenu.wav",
	name: "Menu"
},
];

for (var i =0; i<files.length; i++){
	soundManager[files[i].name]= new BABYLON.Sound(files[i].name, files[i].file, scene);
}

return soundManager;
}
