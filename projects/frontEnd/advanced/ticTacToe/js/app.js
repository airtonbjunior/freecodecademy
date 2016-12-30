var app = angular.module('ticTacToe', []);

app.controller('ticTacToeController', ['$scope', function($scope) {

	/* Default values, case the user close the modal forced (there isn't a close button) */
	$scope.myChoose = "X";
	$scope.pcChoose = "Y";
	$scope.charTurn = $scope.myChoose; // The user always start the game. Change this if want change
	/* Default values */




	/* Function setChar - set the char on the cell */
	$scope.setChar = function (event) {
    	var element = event.currentTarget;
    	
    	console.log(element.firstChild.nodeValue.length);

    	// Ugly solution, improve this :/
    	if(element.firstChild.nodeValue === 'X' || element.firstChild.nodeValue === 'O') { alert("already have a element"); return; }

    	element.firstChild.nodeValue = $scope.charTurn; //[1]

    	if ($scope.charTurn == 'X') { $scope.charTurn = 'O'; } else { $scope.charTurn = 'X'; }

	}


	/* Function chooseChar - choose the char of the user - use on the modal screen */
	$scope.chooseChar = function (char) {
		$scope.myChoose = $scope.charTurn = char;
		document.getElementById('modal').style.display = "none";
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

*/