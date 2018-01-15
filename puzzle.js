
function Game(sz)
{
	this.sz = sz;
	this.grid = [];
	this.sp = -1;
	this.moveable = []; 


	this.calcMoveable = function(){
		if(this.sp <= this.sz-1){
			this.topSq = -1
		}
		else{
			this.topSq = this.sp - this.sz;
		}
		
		if(this.sp >= Math.pow(this.sz,2) - this.sz){
			this.bottomSq = -1
		}
		else{
			this.bottomSq = this.sp + this.sz;
		}
	
		if(this.sp % 3 == 0){
			this.leftSq = -1
		}
		else{
			this.leftSq = this.sp - 1;
		}

		if((this.sp+1) % 3 == 0){
			this.rightSq = -1
		}
		else{
			this.rightSq = this.sp + 1;
		}
		this.moveable = [this.topSq, this.rightSq, this.bottomSq, this.leftSq]
	};


	this.makeGrid = function(){
		for(var i =0; i< Math.pow(this.sz,2); i++){
			this.grid.push(i);
		}
	};

	this.getStartingSpace = function(){
		for(var i = 0; i < this.grid.length; i++){
			if(this.grid[i] == this.grid.length - 1){
				this.sp = i;
				return i;
			}
		}
	};

	this.checkComplete = function(){
		var i =0;
		while(this.grid[i] == i){			
			i++;
		}
		if(i == Math.pow(this.sz,2)){
			alert('congratulations');
			return true;
		}
		else{
			//console.log("false");
			return false;
		}
	};

	this.moveSquare = function(square){
		if(this.moveable.includes(square)){
			
			var temp = this.grid[square];
			this.grid[square] = this.grid[this.sp];
			$('#square-' + square).html("<img src='puzzleimages/img-"+ this.grid[this.sp] +".jpeg' />");
			
			this.grid[this.sp] = temp;
			$('#square-' + this.sp).html("<img src='puzzleimages/img-"+temp +".jpeg' />");

			this.sp = square;
			this.calcMoveable();

			return this.checkComplete();
		}
		else
		{
			console.log('not allowed');
		}
	};


	this.shuffleGrid = function(){
		for(var i = 0; i<1000; i++){
			var j = Math.random();
			
			if(j <= 0.25){
				k = 0;
				
			}
			else if(j <= 0.5){
				k = 1;
				
			}
			else if(j <= 0.75){
				k = 2;
				
			}
			else{
				k=3;
			}
			
			
			//console.log("square to move" + this.moveable[k]+ "|  j " + j + "| k "+ k);
			var square = this.moveable[k];
			
			if (square >= 0){
				var temp = this.grid[square];
				this.grid[square] = this.grid[this.sp];
				this.grid[this.sp] = temp;
				this.sp = square;
				this.calcMoveable();
			}
		}
	};

	this.htmlBoard = function(){
		var htmlString = "";
		for(var i =0;i<this.grid.length;i++){
			htmlString += "<div id='square-" + i +"'><img src='puzzleimages/img-"+this.grid[i]+".jpeg' /></div>";

		}
		return htmlString;
	};
	

};

var newGame = new Game(3);
newGame.makeGrid();
newGame.getStartingSpace();
newGame.calcMoveable();
newGame.shuffleGrid();
console.log(newGame.grid);



$(document).ready(function(){

$('#container').html(newGame.htmlBoard());

for(let i = 0; i < 9; i++) {
  $('#square-' + i).click( function(){
	    //alert('you clicked ' + i);
		newGame.moveSquare(i);
	});
}

});


var newGamee = new Game(4);
newGamee.makeGrid();
newGamee.getStartingSpace();
newGamee.calcMoveable();
newGame.shuffleGrid();
console.log(newGame.grid);



$(document).ready(function(){

$('#container2').html(newGamee.htmlBoard());

for(let i = 0; i < 16; i++) {
  $('#square-' + i).click( function(){
	    //alert('you clicked ' + i);
		newGamee.moveSquare(i);
	});
}

});