var app = angular.module('simon', []);

app.controller('simonController', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {
	$scope.counter = 1;  // level
	$scope.turns   = []; // sequence of the actual turn (the last one)

	var colors = ['g', 'r', 'y', 'b'];
	
	$scope.turns = ['g', 'g', 'b'];
	

	printPatternButtons();

	



	/* Show the pattern to the user through the buttons */
	function printPatternButtons () {
	    intervalId = $interval(function() {
	        console.log("pass on interval");
	        $scope.counter++; // i'm only testing
	    }, 1000);
	};


	$scope.buttonClicked = function(buttonId) {
		//alert("button " + buttonId + " clicked");
	};


	$scope.$watch('counter', function(counter){
    	if (counter > 4){
        	stop();
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

	TO-DO:

*/