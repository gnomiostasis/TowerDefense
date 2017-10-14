function initGridManager()
{
	this.grid = createGrid();
	
	
	function createCursor(mirror){
		var cursor = {
			x:-14.5,
			z:9.5*mirror,
			maxZ: mirror > 0 ? 9.5 : -1.5,
			minZ: mirror >0 ? 1.5 : -9.5
		}
		
		cursor.gameobject = BABYLON.Mesh.CreateBox("plane", 1, scene);
		cursor.gameobject.position.y = -.5;
		cursor.gameobject.position.x=cursor.x;
		cursor.gameobject.position.z = cursor.z;
		cursor.gameobject.material = new BABYLON.StandardMaterial("matPlan1", scene);
		if (mirror>0){
			cursor.gameobject.material.emissiveColor = new BABYLON.Color4(1, 0, 0,.2);
		}else{
			cursor.gameobject.material.emissiveColor = new BABYLON.Color4(0, 0, 1,.2);	
		}
	
		cursor.getPos = function() {
			return {
				x: cursor.x,
				y: cursor.z
			};
		}
		
		cursor.moveLeft= function(){
			cursor.x -=1;
			cursor.gameobject.position.x-=1;
			if(cursor.x<-14.5){
				cursor.x = -14.5;
				cursor.gameobject.position.x=cursor.x;
			}
			
		}
		
		cursor.moveRight= function(){
			cursor.x +=1;
			cursor.gameobject.position.x+=1;
			if(cursor.x>14.5){
				cursor.x = 14.5;
				cursor.gameobject.position.x=cursor.x;
			}
			
		}
		
		cursor.moveDown= function(){
			cursor.z = Math.max(cursor.z - 1, cursor.minZ);
			cursor.gameobject.position.z = cursor.z;
			return;
			
			cursor.z -=1;
			cursor.gameobject.position.z-=1;
			if(mirror>0){ 
				if(cursor.z<1.5){
					cursor.z = 1.5;
					cursor.gameobject.position.z = cursor.z;
				}
				if(cursor.z<-9.5){
					cursor.z = -9.5;
					cursor.gameobject.position.z = cursor.z;
				}
			}
		}
		
		cursor.moveUp= function(){
			cursor.z = Math.min(cursor.z + 1, cursor.maxZ);
			cursor.gameobject.position.z = cursor.z;
			return;
			
			cursor.z +=1;
			cursor.gameobject.position.z+=1;
			if(mirror>0){ 
				if(cursor.z>9.5){
					cursor.z = 9.5;
					cursor.gameobject.position.z = cursor.z;
				}
				if(cursor.z>-1.5){
					cursor.z = -1.5;
					cursor.gameobject.position.z = cursor.z;
				}
			}
		}
		
		return cursor;
	}
	
	
	function createGrid(){
		var grid = {};
		for (var i=-15; i<=15; i++){
				for(var j=-9; j<=9; j++){
					grid[i+','+j] = null;
				}
		}
		
		grid.addItemToGrid = function(x,z,item){
			grid[x+','+z] = item;
		}
		grid.removeItemFromGrid = function(x,z){
			grid[x+','+z]=null;
		}
		
		grid.getGridItem = function(x,z){
			return grid[x+','+z];
		}
		
		grid.update = function(){}
		
		grid.cursor1 = createCursor(1);
		grid.cursor2 = createCursor(-1);
		return grid;
		
		
	}
	
    this.update = function(){
		this.grid.update();
	}
	
	return this;
}
