var app = angular.module('simon', []);

app.controller('simonController', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {
	$scope.counter = 1;  // level
	$scope.turns   = []; // sequence of the actual turn (the last one)

	var colors = ['g', 'r', 'y', 'b'];
	
	$scope.turns = ['g', 'y', 'b']; // Test

	$scope.turnQuantity = $scope.turns.lenght; // don't get the size - fix this
	$scope.index = 0;

	printPatternButtons();

	/* Show the pattern to the user through the buttons */
	function printPatternButtons () {
	    intervalId = $interval(function() { // [3]
	        console.log("pass on interval");

	        document.getElementById($scope.turns[$scope.index]).style.backgroundColor = "black";
	        
	        $scope.index++; // i'm only testing
	    }, 1000);
	};


	$scope.buttonClicked = function(buttonId) {
		//alert("button " + buttonId + " clicked");
	};


	$scope.$watch('index', function(index){
		alert($scope.turnQuantity);
    	//if (index == $scope.turnQuantity){
    	if (index == 3){ // hardcoded
        	stop();
        	//document.getElementById('g').style.backgroundColor = "green";
    	}
  	});

  	function stop () {
	    $interval.cancel(intervalId);
  	};

	/* Create the sequence of a level (1 to 20) */
	function processTurn(level) {
		for(var i = 0; i < level; i++) {
			$scope.turns.push(chooseColor());
		}

	}


	function chooseColor() {
		return colors[Math.floor(Math.random() * 4)]; // 0 to 3 (3 colors)
	}

}]);

/*
	References:

	[1]: http://stackoverflow.com/questions/19886843/how-to-remove-outline-border-from-input-button 
	[2]: http://www.w3schools.com/cssref/playit.asp?filename=playcss_border-style
	[3]: http://stackoverflow.com/a/35090614


	TO-DO:

*/