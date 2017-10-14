function initGridManager()
{
	this.p1 = createGrid();
	this.p2 = createGrid();
	
	function createCursor(){
		var cursor = {
			x:0,
			y:0
		}
		
		cursor.getSelf = function() {
			return this;
		}
		
		cursor.moveLeft= function(){
			this.x -=1;
			if(x<0){
				x = 0;
			}
		}
		
		cursor.moveRight= function(){
			this.x +=1;
			if(x>59){
				x = 59;
			}
		}
		
		cursor.moveUp= function(){
			this.y -=1;
			if(y<0){
				y = 0;
			}
		}
		
		cursor.moveDown= function(){
			this.y +=1;
			if(y>18){
				y = 18;
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