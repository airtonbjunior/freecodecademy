var app = angular.module('simon', []);

app.controller('simonController', ['$scope', '$interval', function($scope, $interval) {
	$scope.counter      = 1;  // level
	$scope.turns        = []; // sequence of the actual turn (the last one)
	$scope.turnQuantity = 0;
	$scope.index 		= 0;
	
	var colors = ['green', 'red', 'yellow', 'blue'];



	/* Function called when the button are pressed */
	$scope.startTurn = function() {
		console.log($scope.turns);
		console.log($scope.index);
		console.log($scope.turnQuantity);

		processTurn();
		printPatternButtons();
	}



	/* Show the pattern to the user through the buttons */
	function printPatternButtons () {
	    $scope.intervalId = $interval(function() { // [3]

	        if($scope.index > 0) {
	        	document.getElementById($scope.turns[$scope.index - 1]).style.backgroundColor = $scope.turns[$scope.index - 1];
	        }

	        document.getElementById($scope.turns[$scope.index]).style.backgroundColor = "black";
	        
	        $scope.index++;
	    }, 1000);
	};


	/* Called when the colored buttons are pressed */
	$scope.buttonClicked = function(buttonId) {
		//alert("button " + buttonId + " clicked");
	};


	$scope.$watch('index', function(index){
    	if (index == $scope.turnQuantity) {
        	if(index > 0) {
        		document.getElementById($scope.turns[$scope.index - 1]).style.backgroundColor = $scope.turns[$scope.index - 1];
        	}
        	$scope.index = 0;
        	console.log("I will stop the interval now!");
        	stop();
    	}
  	});

  	function stop () {
	    $interval.cancel($scope.intervalId);
  	};



	/* Create the sequence of a level (1 to 20) */
	function processTurn(level) {
		if(!!!level) { 
			$scope.turns.push(chooseColor());
			$scope.turnQuantity++;
		}
		else {
			for(var i = 0; i < level; i++) {
				$scope.turns.push(chooseColor());
			}
			$scope.turnQuantity = $scope.turns.length;
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
	[ ]: blink when there're two equal colors in a sequence
*/