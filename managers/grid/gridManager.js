function initGridManager()
{
	this.p1 = createGrid();
	this.p2 = createGrid();
	
	function createCursor(){
		var cursor = {
			x:0,
			z:0
		}
		
		cursor.gameobject = BABYLON.Mesh.CreateBox("plane", 1, scene);
		cursor.gameobject.position.y = .2;
		//cursor.gameobject.position.x=cursor.x;
		//cursor.gameobject.position.z = cursor.z;
		cursor.getSelf = function() {
			return this;
		}
		
		cursor.moveLeft= function(){
			cursor.x -=1;
			cursor.gameobject.position.x-=1;
			if(cursor.x<-15){
				cursor.x = -15;
				//cursor.gameobject.position.x=cursor.x;
			}
			
		}
		
		cursor.moveRight= function(){
			cursor.x +=1;
			cursor.gameobject.position.x+=1;
			if(cursor.x>15){
				cursor.x = 15;
				//cursor.gameobject.position.x=cursor.x;
			}
			
		}
		
		cursor.moveUp= function(){
			cursor.z -=1;
			cursor.gameobject.position.z-=1;
			if(cursor.z<-10){
				cursor.z = -10;
				//cursor.gameobject.position.z = cursor.z;
			}
		}
		
		cursor.moveDown= function(){
			cursor.z +=1;
			cursor.gameobject.position.z+=1;
			if(cursor.z>10){
				cursor.z = 10;
				//cursor.gameobject.position.z = cursor.z;
			}
		}
		
		return cursor;
	}
	
	
	function createGrid(){
		var grid = new Array(60);
		for (var i=0; i<90; i++){
			grid[i] = new Array(19);
				for(var j=0; j<18; j++){
					grid[i][j] = null;
				}
		}
		
		grid.addItemToGrid = function(x,y,item){
			grid[x][y] = item;
		}
		grid.removeItemFromGrid = function(x,y){
			grid[x][y]=null;
		}
		
		grid.getGridItem = function(x,y){
			return grid[x][y];
		}
		
		grid.update = function(){}
		
		grid.cursor = createCursor();
		return grid;
		
		
	}
	
    function update(){
		this.p1.update();
		this.p2.update();
	}
	
	return this;
}