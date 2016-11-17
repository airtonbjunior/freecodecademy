var app = angular.module('pomodoro', []);

app.controller('pomodoroController', ['$scope', '$timeout', function($scope, $timeout){


	$scope.restTime = 0;
	$scope.pomodoroTime = 0;

	$scope.clockTime = $scope.pomodoroTime;

	
	var stopped;;


	$scope.startClock = function() {
		stopped = $timeout(function() {
			if($scope.clockTime > 0) {
				$scope.clockTime--;
				$scope.startClock();
			}
			else {
				$scope.clockTime = "Acabou. Agora vou chamar um som e a funcao de descanso";
			}
		}, 1000);
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
			$scope.clockTime = $scope.pomodoroTime = value + 1;
	}

	$scope.decrement = function(value, input) {
		if(value > 0) 
			if(input == 0)
				$scope.restTime = value - 1;
			else
				$scope.clockTime = $scope.pomodoroTime = value - 1;
	}


}]);