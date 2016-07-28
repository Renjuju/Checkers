angular.module('checkers').service('CheckerBoardService', function(){ 

	var board = new Array(8);

	var game;

	for(var i = 0; i < board.length; i++){
		board[i] = new Array(8);
		for(var j = 0; j < board[i].length; j++){
			board[i][j] = "";
		}
	}

	function populateBoard(positions){
		Object.keys(positions).forEach(function(key, value){
			var coord = key.split("");
			var x = coord[0].charCodeAt(0) - 97;
			var y = parseInt(coord[1]) - 1;
		
			board[x][y] = positions[key];		
		});
	};

	function getVirtualBoard(){
		return board;
	}

	function validMove(piece, oldPos, newPos){
		var bool = false;

		var oldCoord = oldPos.split("");
		var newCoord = newPos.split("");
		
		var oldX = oldCoord[0].charCodeAt(0) - 97;
		var oldY = parseInt(oldCoord[1]) - 1;

		var newX = newCoord[0].charCodeAt(0) - 97;
		var newY = parseInt(newCoord[1]) - 1;

		if(piece == 'wP'){
			if(positiveJump(oldX, oldY, newX, newY)){
				bool = true;	
			}
			else if(positiveMove(oldX, oldY, newX, newY)){
				bool = true;
			}			
		} else if (piece == 'bP'){
			if(negativeMove(oldX, oldY, newX, newY)){
				bool = true;
			} else if(negativeJump(oldX, oldY, newX, newY)){
				bool = true;
			}
		} else if(piece == 'wK' || piece == 'bK'){
			if(positiveJump(oldX, oldY, newX, newY)){
				bool = true;	
			} else if(positiveMove(oldX, oldY, newX, newY)){
				bool = true;
			} else if(negativeMove(oldX, oldY, newX, newY)){
				bool = true;
			} else if(negativeJump(oldX, oldY, newX, newY)){
				bool = true;
			}			
		}
		//update the board with the new location of the pieces
		if(bool){
			board[oldX][oldY] = "";
			board[newX][newY] = piece;
		}
		kingMe(piece, newX, newY);
		//update the board with the new coordinates
		return bool;
	}

/* Kings can move forward and backward
*/
	//forward move for whitepiece
	function positiveMove(oldX, oldY, newX, newY){
		var bool = true;
		if((newY - oldY) != 1 || ((newX - oldX) != 1 && (newX - oldX) != -1)){
			bool = false;
		}

		else if(board[newX][newY] != ""){
			bool = false;
		}
		return bool;
	}

	//forward move for blackpiece
	function negativeMove(oldX, oldY, newX, newY){
		var bool = true;
		if((newY - oldY) != -1 || ((newX - oldX) != 1 && (newX - oldX) != -1)){
				bool = false;
		}

		else if(board[newX][newY] != ""){
			bool = false;
		}
		return bool;
	}

	function positiveJump(oldX, oldY, newX, newY){
		var bool = true;
		/*Check that the user moved the piece 2 rows up and 2 columns away 
		  from the orginal position
		*/
		if(newY - oldY != 2 || ((newX - oldX) != 2 && (newX-oldX) != -2)){
			bool = false;
		}
		//Check that the new location does not already have a piece there
		else if(board[newX][newY] != ""){
			bool = false;
		}

		//Check that there is a piece in between the jump so that the jump is valid
		//user jumped to the right
		else if(newX > oldX){
			if(board[oldX+1][oldY+1] == ""){
				bool = false;
			} else {
				//destroy the piece
				board[oldX+1][oldY+1] = "";
			}
			//the user jumped to the left
		} else if(newX < oldX){
			if(board[oldX-1][oldY+1] == ""){
				bool = false;
			} else {
				//destroy the piece
				board[oldX-1][oldY+1] = "";
			}

		}


		return bool;
	}

	function negativeJump(oldX, oldY, newX, newY){
		var bool = true;
		/*Check that the user moved the piece 2 rows down and 2 columns away 
		  from the orginal position
		*/
		if(oldY - newY != 2 || ((newX - oldX) != 2 && (newX-oldX) != -2)){
			bool = false;
		}
		//Check that the new location does not already have a piece there
		else if(board[newX][newY] != ""){
			bool = false;
		}

		//Check that there is a piece in between the jump so that the jump is valid
		//user jumped to the right
		else if(newX > oldX){
			if(board[oldX+1][oldY-1] == ""){
				bool = false;
			} else {
				//destroy the piece
				board[oldX+1][oldY-1] = "";
			}
			//the user jumped to the left
		} else if(newX < oldX){
			if(board[oldX-1][oldY-1] == ""){
				bool = false;
			} else {
				//destroy the piece
				board[oldX-1][oldY-1] = "";
			}

		}
		return bool;
	}

	function kingMe(piece, newX, newY){
		if(piece == 'wP'){
			if(newY == 7){
				board[newX][newY] = 'wK';
			}
		} else if(piece == 'bP'){
			if(newY == 0){
				board[newX][newY] = 'bK';
			}
		}
	}
	return{
		populateBoard:populateBoard,
		getVirtualBoard:getVirtualBoard,
		validMove:validMove
	}
});