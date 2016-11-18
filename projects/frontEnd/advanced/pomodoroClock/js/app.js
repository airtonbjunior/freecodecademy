var app = angular.module('pomodoro', []);

app.controller('pomodoroController', ['$scope', '$timeout', function($scope, $timeout){


	$scope.restTime = 5;
	$scope.pomodoroTime = 25;

	$scope.clockTimeMinutes = $scope.pomodoroTime;
	$scope.clockTimeSeconds = "00";

	$scope.startStopButtonLabel = "Start";
	$scope.zeroMinutes = $scope.zeroSeconds = "";

	var actualClock = "pomodoro";
	var stopped;
	var start = true;


 	// [1]
 	// when the function is called by recursion, I don't want change the label
	$scope.startStopClock = function(recursion) {
		if(recursion === undefined) recursion = false;
		if(!recursion) {
			if (start) {
				$scope.startStopButtonLabel = "Stop";
				$scope.startStopClock(true);
			}
			else {
				$scope.startStopButtonLabel = "Start";
				$timeout.cancel(stopped);
			}
			start = !start;
		}
		else {
			stopped = $timeout(function() {
				if($scope.clockTimeMinutes > 0) {
					if($scope.clockTimeSeconds > 0) {
						$scope.clockTimeSeconds--;
					} else {
						$scope.clockTimeSeconds = 59;
						$scope.clockTimeMinutes--;
					}
					$scope.startStopClock(true);
				}
				else {
					if($scope.clockTimeSeconds > 0) {
						$scope.clockTimeSeconds--;
					} else {
						$scope.clockTimeSeconds = 00;
						$scope.clockTimeMinutes = 00;

						if(actualClock == "pomodoro") {
							$scope.clockTimeMinutes = $scope.restTime;
							actualClock = "rest";
						}
						else {
							$scope.clockTimeMinutes = $scope.pomodoroTime;
							actualClock = "pomodoro";
						}
					}

					// Call recursion again
					$scope.startStopClock(true);
				}
			}, 1000);
		}
	};


	/*
		increment and decrement functions 

		0 -> restTime
		1 -> pomodoroTime

		Try to improve this. Use a more elegant way to do this :)
	*/
	$scope.increment = function(value, input) {
		if (input == 0) 
			$scope.restTime = value + 1
		else
			$scope.clockTimeMinutes = $scope.pomodoroTime = value + 1;
	}

	$scope.decrement = function(value, input) {
		if(value > 0) 
			if(input == 0)
				$scope.restTime = value - 1;
			else
				$scope.clockTimeMinutes = $scope.pomodoroTime = value - 1;
	}


}]);

/*
	References:

	[1]: https://codepen.io/MehmetCanker/pen/jluqp


	TO-DO:

	[X] Toggle Button Start/Stop*
	[X] Default values - 25 min pomodoro and 5 minutes rest
	[ ] Sound when a pomodoro/rest finished
	[ ] Improve the code
	[ ] Pomodoro quantities
	[ ] Include a 0 before a number if < 10

	* optional

*/