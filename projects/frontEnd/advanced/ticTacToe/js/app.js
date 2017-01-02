var app = angular.module('ticTacToe', []);

app.controller('ticTacToeController', ['$scope', function($scope) {

	/* Default values, case the user close the modal forced (there isn't a close button) */
	$scope.myChoose = "X";
	$scope.pcChoose = "Y";
	$scope.charTurn = $scope.myChoose; // The user always start the game. Change this if want change
	/* Default values */

	$scope.cellsFill = 1;


	/* Function setChar - set the char on the cell */
	$scope.setChar = function (event) {

		if(event.currentTarget.firstChild.nodeValue === 'X' || event.currentTarget.firstChild.nodeValue === 'O') { alert("already have a element"); return; }

		event.currentTarget.firstChild.nodeValue = $scope.charTurn; //[1]

		invertChar();
    
    	/* COMPUTER TURN GOES HERE */
		var emptyPositions = getAllEmptyPositions();
		if($scope.cellsFill < 9) {
			putChar($scope.charTurn, emptyPositions[0]); // I'm always returning the first position empty. Improve this with a 'inteligent' logic
			invertChar();
		}
		/* COMPUTER TURN GOES HERE */

    	/* if the number of cells is less of four, it's impossible something win the ticTacToe. So, I start the verification only when cellsFill is greater than 4 */
    	if($scope.cellsFill > 4) { 
    		if(endGame()) {
    			// put the actions when someone wins the game
    			// restartGame();
    			return;
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
	$scope.chooseChar = function (char) {
		$scope.myChoose = $scope.charTurn = char;
		document.getElementById('modal').style.display = "none";
	}


	function endGame() {
		var gamePositions = getAllPositions();
		var char = "";

		for(var i = 0; i < 9; i++) {
			if(gamePositions[i] === "X" || gamePositions[i] === "O") {
				char = gamePositions[i];
				// Arithmetic Progression to verify if the game are over
				
				/* there's an error here. I need to verify if the number less the offset also is true. */

				if(	
					(gamePositions[i+1] === char && gamePositions[i+1+1] === char) ||
					(gamePositions[i+3] === char && gamePositions[i+3+3] === char) ||
					(gamePositions[i+4] === char && gamePositions[i+4+4] === char)
				) 
					{ 
						alert(char + " win the game");
						return true;
					}

			}

		}

		return false;
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
		console.log(arrayEmptyPositions);
		return arrayEmptyPositions;
	}

	/* Invert the char of the game - turn change */
	function invertChar() {
		if ($scope.charTurn == 'X') { $scope.charTurn = 'O'; } else { $scope.charTurn = 'X'; }
	}


	/* Improve this (OMG, it's a shame :()*/
	function restartGame () {
		alert("Restart the game!");

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

}]);




/*
	TO-DO List

	[X] Modal (i think the best solution is modal, see this) to choose 'X' or '0'
	[X] Show the char when clicks on the cell
	[ ] Game Over (TIE)
	[ ] Game Win
	[ ] Change color when win
	[ ] Remove 3 space codes when system start
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