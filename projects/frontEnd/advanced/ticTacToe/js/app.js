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
    	
		console.log($scope.cellsFill);

    	var element = event.currentTarget;

    	// Ugly solution, improve this :/
    	if(element.firstChild.nodeValue === 'X' || element.firstChild.nodeValue === 'O') { alert("already have a element"); return; }

    	element.firstChild.nodeValue = $scope.charTurn; //[1]

    	if ($scope.charTurn == 'X') { $scope.charTurn = 'O'; } else { $scope.charTurn = 'X'; }

    	/* if 9 cells are filled, the game don't finished (think about it better) */
    	if($scope.cellsFill < 9) { $scope.cellsFill++; } else { restartGame(); return; }

	}


	/* Function chooseChar - choose the char of the user - use on the modal screen */
	$scope.chooseChar = function (char) {
		$scope.myChoose = $scope.charTurn = char;
		document.getElementById('modal').style.display = "none";
	}


	/* Improve this (OMG, it's a shame :()*/
	function restartGame () {
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
	[ ] Game Over
	[ ] Game Win
	[ ] Change color when win
	[ ] Remove 3 space codes when system start
	[ ] Undo*


	* optional



	References

	[1] http://stackoverflow.com/a/14720819
	[2] http://www.w3schools.com/howto/howto_css_modals.asp
	[3] http://digitalsynopsis.com/design/minimal-web-color-palettes-combination-hex-code/

*/