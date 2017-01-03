var app = angular.module('ticTacToe', []);

app.controller('ticTacToeController', ['$scope', function($scope) {

	/* Default values, case the user close the modal forced (there isn't a close button) */
	$scope.myChoose = "X";
	$scope.pcChoose = "O";
	$scope.charTurn = $scope.myChoose; // The user always start the game. Change this if want change
	/* Default values */

	$scope.messageModal = "";
	$scope.cellsFill = 1;


	/* Function setChar - set the char on the cell */
	$scope.setChar = function (event) {

		if(event.currentTarget.firstChild.nodeValue === 'X' || event.currentTarget.firstChild.nodeValue === 'O') { alert("already have an element"); return; }

		event.currentTarget.firstChild.nodeValue = $scope.charTurn; //[1]

		invertChar();
    

    	/* COMPUTER TURN GOES HERE */
		var emptyPositions = getAllEmptyPositions();
		if($scope.cellsFill < 9) {
			if(positionsWarning() == 0) { // if 0, there's no position warning yet
				putChar($scope.charTurn, emptyPositions[0]); // I'm always returning the first position empty. Improve this with a 'inteligent' logic
			}	
			else {
				// alert('USER IS ALMOST THE WINNER! There is positions warning on ' + positionsWarning());
				putChar($scope.charTurn, positionsWarning());
			}
			invertChar();
		}
		/* COMPUTER TURN GOES HERE */


    	/* if the number of cells is less of four, it's impossible something win the ticTacToe. So, I start the verification only when cellsFill is greater than 4 */
    	if($scope.cellsFill > 4) { 
    		if(endGame()) {
    			// put the actions when someone wins the game
    			//restartGame();
    			return;
    		}
    		else {
    			invertChar();
    			// create a function that make the things when the game finish
    			if(endGame()) {
    				//restartGame();
    				return;
    			}
    			else {
    				invertChar(); // invert the char again to continue the game
    			}
    		}
    	}

    	/* if 9 cells are filled, the game don't finished [TIE] (think about it better) */
    	if($scope.cellsFill < 9) { $scope.cellsFill++; } else { restartGame(); return; }
	}


	// Put a char in a position of the game table
	function putChar(char, position) {
		document.getElementById(position).innerHTML = char;
		$scope.cellsFill++;
	}


	/* Function chooseChar - choose the char of the user - use on the modal screen */
	$scope.chooseChar = function (char, computerChar) {
		$scope.myChoose = $scope.charTurn = char;
		$scope.pcChoose = computerChar;
		document.getElementById('modal').style.display = "none";
	}


	/* Verify if the game ends */ 
	function endGame() {
		
		if(	(document.getElementById('r1c1').innerHTML === $scope.charTurn) && (document.getElementById('r1c2').innerHTML === $scope.charTurn) && (document.getElementById('r1c3').innerHTML === $scope.charTurn) ||
			(document.getElementById('r2c1').innerHTML === $scope.charTurn) && (document.getElementById('r2c2').innerHTML === $scope.charTurn) && (document.getElementById('r2c3').innerHTML === $scope.charTurn) ||
			(document.getElementById('r3c1').innerHTML === $scope.charTurn) && (document.getElementById('r3c2').innerHTML === $scope.charTurn) && (document.getElementById('r3c3').innerHTML === $scope.charTurn) ||
			(document.getElementById('r1c1').innerHTML === $scope.charTurn) && (document.getElementById('r2c1').innerHTML === $scope.charTurn) && (document.getElementById('r3c1').innerHTML === $scope.charTurn) ||
			(document.getElementById('r1c2').innerHTML === $scope.charTurn) && (document.getElementById('r2c2').innerHTML === $scope.charTurn) && (document.getElementById('r3c2').innerHTML === $scope.charTurn) ||
			(document.getElementById('r1c3').innerHTML === $scope.charTurn) && (document.getElementById('r2c3').innerHTML === $scope.charTurn) && (document.getElementById('r3c3').innerHTML === $scope.charTurn) ||
			(document.getElementById('r1c1').innerHTML === $scope.charTurn) && (document.getElementById('r2c2').innerHTML === $scope.charTurn) && (document.getElementById('r3c3').innerHTML === $scope.charTurn) ||
			(document.getElementById('r1c3').innerHTML === $scope.charTurn) && (document.getElementById('r2c2').innerHTML === $scope.charTurn) && (document.getElementById('r3c1').innerHTML === $scope.charTurn)
		) {
			var message = $scope.charTurn + " wins!";
			$scope.messageModal = message;
			document.getElementById('modal-end-game').style.display = "block"; // Show the modal (the modal has a close button)
			return true;
		}

		return false;
	}


	/* Return the positions that are in warning and need to be defended */
	function positionsWarning() {
		var chars = [];
		var position = 0;
		for (var i = 1; i <= 3; i++) {
			chars = getCharsOfARow(i);
			if(numberOfEnemyChar(chars) == 2 && numberOfBlankCells(chars) == 1) {
				return blankCellPosition('row', i);
			}
			chars = getCharsOfAColumn(i);
			if(numberOfEnemyChar(chars) == 2 && numberOfBlankCells(chars) == 1) {
				return blankCellPosition('col', i);
			}

			if(i < 3) { // there are only 2 diagonals
				chars = getCharsOfADiagonal(i);
				if(numberOfEnemyChar(chars) == 2 && numberOfBlankCells(chars) == 1) {
					return blankCellPosition('diagonal', i);
				}
			}
		}
		return position;
	}

	
	/*
 	* Return the Blank positions of a type (row, col, diagonal)
 	* Type: row OR col OR diagonal
	*/
	function blankCellPosition(type, index) {
		if(type == 'row') {
			for (var i = 1; i <= 3; i++) {
				if(document.getElementById('r' + index + 'c' + i).innerHTML != 'X' && document.getElementById('r' + index + 'c' + i).innerHTML != 'O')
					return 'r' + index + 'c' + i;
			}
		}
		else if(type == 'col') { 
			for (var i = 1; i <= 3; i++) {
				if(document.getElementById('r' + i + 'c' + index).innerHTML != 'X' && document.getElementById('r' + i + 'c' + index).innerHTML != 'O')
					return 'r' + i + 'c' + index;
			}
		}
		else { //diagonal
			
			// central element
			if(document.getElementById('r2c2').innerHTML != 'X' && document.getElementById('r2c2').innerHTML != 'O') {
				return 'r2c2';
			}
			else {
				// 1 -> left-rigth diagonal
				if(index == 1) {
					if(document.getElementById('r1c1').innerHTML != 'X' && document.getElementById('r1c1').innerHTML != 'O') {
						return 'r1c1';
					}
					else {
						if(document.getElementById('r3c3').innerHTML != 'X' && document.getElementById('r3c3').innerHTML != 'O') 
							return 'r3c3';
					}
				}
				else {
					if(document.getElementById('r1c3').innerHTML != 'X' && document.getElementById('r1c3').innerHTML != 'O')
						return 'r1c3';
					else
						if(document.getElementById('r3c1').innerHTML != 'X' && document.getElementById('r3c1').innerHTML != 'O')
							return 'r3c1';
				}
			}

		}
	}

	/* Count a number of chars enemy, based on a char array */
	function numberOfBlankCells(chars) {
		var count = chars.reduce(function(n, val){
			return n + (val === "&nbsp;&nbsp;&nbsp;") // see this
		}, 0);
		return count;
	}


	/* Count a number of chars enemy, based on a char array */
	function numberOfEnemyChar(chars) {
		var count = chars.reduce(function(n, val){
			return n + (val === $scope.myChoose)
		}, 0);
		return count;
	}


	/* Get the Chars of a row */ 
	function getCharsOfARow(row) {
		var chars = [];
		chars[1] = document.getElementById('r' + row + 'c1').innerHTML;
		chars[2] = document.getElementById('r' + row + 'c2').innerHTML;
		chars[3] = document.getElementById('r' + row + 'c3').innerHTML;
		
		return chars;
	}

	/* Get the Chars of a column */ 
	function getCharsOfAColumn(col) {
		var chars = [];
		chars[1] = document.getElementById('r1c' + col).innerHTML;
		chars[2] = document.getElementById('r2c' + col).innerHTML;
		chars[3] = document.getElementById('r3c' + col).innerHTML;
		
		return chars;
	}

	/* Diagonal: 1 left-right | 2 right-left */
	function getCharsOfADiagonal(diagonal) {
		var chars = [];
		chars[2] = document.getElementById('r2c2').innerHTML;

		if(diagonal == 1) {
			chars[1] = document.getElementById('r1c1').innerHTML;
			chars[3] = document.getElementById('r3c3').innerHTML;
		}
		else {
			chars[1] = document.getElementById('r1c3').innerHTML;
			chars[3] = document.getElementById('r3c1').innerHTML;
		}
		return chars;
	}


	/* Get all Filled Positions */
	function getAllPositions() {
		var arrayPositions = []; //[4]
		
		// iterate matrix 3x3 (ticTacToe game)
		for(var i = 1; i <= 3; i++) {
			for(var j = 1; j <= 3; j++) {
				
				if(document.getElementById('r' + i + 'c' + j).innerHTML === 'X' || document.getElementById('r' + i + 'c' + j).innerHTML === 'O')
					arrayPositions.push(document.getElementById('r' + i + 'c' + j).innerHTML);
				else
					arrayPositions.push("");
			} 
		}
		return arrayPositions;
	}
	

	/* Ger all empty positions of the game */
	function getAllEmptyPositions() {
		var arrayEmptyPositions = [];
		var offset = -2; //[S.1]

		// iterate matrix 3x3 (ticTacToe game)
		for(var i = 1; i <= 3; i++) {
			for(var j = 1; j <= 3; j++) {
				if(document.getElementById('r' + i + 'c' + j).innerHTML === "&nbsp;&nbsp;&nbsp;") {
					//arrayEmptyPositions.push(i + j + offset);
					arrayEmptyPositions.push("r" + i + "c" + j);
				}
			} //j
			offset += 2;
		} //i
		//console.log(arrayEmptyPositions);
		return arrayEmptyPositions;
	}

	/* Invert the char of the game - turn change */
	function invertChar() {
		if ($scope.charTurn == 'X') { $scope.charTurn = 'O'; } else { $scope.charTurn = 'X'; }
	}


	/* Improve this (OMG, it's a shame :()*/
	function restartGame () {
		//alert("Restart the game!");

		document.getElementById('r1c1').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r1c2').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r1c3').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r2c1').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r2c2').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r2c3').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r3c1').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r3c2').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('r3c3').innerHTML = '&nbsp;&nbsp;&nbsp;';

		$scope.cellsFill = 1;
	}

	/* Restart the game - function called by the modal */
	$scope.restartGameModal = function() {
		document.getElementById('modal-end-game').style.display = "none";
		restartGame();
	}

}]);




/*
	TO-DO List

	[X] Modal (i think the best solution is modal, see this) to choose 'X' or 'O'
	[X] Show the char when clicks on the cell
	[X] Game Over (TIE)
	[X] Game Win
	[ ] Change color when win
	[ ] Remove 3 space codes when system start
	[ ] Span are 'breaking' when the char are put in
	[X] 'Inteligence' of computer game
	[ ] Undo*


	* optional



	References

	[1] http://stackoverflow.com/a/14720819
	[2] http://www.w3schools.com/howto/howto_css_modals.asp
	[3] http://digitalsynopsis.com/design/minimal-web-color-palettes-combination-hex-code/
	[4] http://stackoverflow.com/questions/1996747/add-new-value-to-an-existing-array-in-javascript/1996755#1996755



	Detailed solutions

	[S.1] - the index of my array have the follow function: j+i+index, so:
		When the i == 1, offset is -2
		     the i == 2, offset is 0
		     the i == 3, offset is 2
		So, I started the offset with -2 and after each for(i) iterate, i do offset += 2; 

*/