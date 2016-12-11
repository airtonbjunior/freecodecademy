var app = angular.module('pomodoro', []);

app.controller('pomodoroController', ['$scope', '$timeout', function($scope, $timeout){


	$scope.restTime = '05';
	$scope.pomodoroTime = 25;

	$scope.clockTimeMinutes = $scope.pomodoroTime;
	$scope.clockTimeSeconds = "00";

	$scope.startStopButtonLabel = "Start";
	$scope.zeroMinutes = $scope.zeroSeconds = "";

	var actualClock = "pomodoro";
	var stopped;
	var start = true;

	//var audio = new Audio('audio/alarm.mp3'); // Change this sound. Search another mp3 free/open. I'm using just for test
	var audio = new Audio('audio/beep.mp3'); // [2]

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
							audio.play();
						}
						else {
							$scope.clockTimeMinutes = $scope.pomodoroTime;
							actualClock = "pomodoro";
							audio.play();
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
		if(value < 99) { // limit (don't mess my layout, baby!)
			var newValue = parseInt(value) + 1;
			if(newValue < 10) newValue = '0' + newValue;

			if (input == 0) 
				$scope.restTime = newValue
			else
				$scope.clockTimeMinutes = $scope.pomodoroTime = newValue;
		}
	}

	$scope.decrement = function(value, input) {
		if(value > 1) {
			var newValue = value - 1;
			if(newValue < 10) newValue = '0' + newValue;

			if(input == 0)
				$scope.restTime = newValue;
			else
				$scope.clockTimeMinutes = $scope.pomodoroTime = newValue;
		}
	}


}]);

/*
	References:

	[1]: https://codepen.io/MehmetCanker/pen/jluqp
	[2]: https://notificationsounds.com/notification-sounds/beep-472

	TO-DO:

	[X] Toggle Button Start/Stop*
	[X] Default values - 25 min pomodoro and 5 minutes rest
	[X] Sound when a pomodoro/rest finished
	[ ] Improve the code
	[ ] Pomodoro quantities
	[X] Include a 0 before a number if < 10
	[ ] Change the mp3 - doesn't allow publish on internet
	[X] Don't allow 0 minutes
	[ ] Reset Button

	* optional

*/