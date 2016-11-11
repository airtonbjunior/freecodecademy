var app = angular.module('jsCalculator', [])

.controller('calcController', ['$scope', function($scope){
	//$scope.chain = "";

	$scope.calc = function(expression) {
		if(isOperator(expression[0]) || isOperator(expression[expression.length-1])) return "Operator Error! [001]";
		// Change this for to something more beautiful :/
		for(var i = 0; i < expression.length-1; i++) {
			if(isOperator(expression[i]) && isOperator(expression[i+1])) {
				return "Operator Error! [002]"
			}
			if(expression[i] === '/' && expression[i+1] === '0') {
				return "Error! [003]";
			}
		}

		return expression;
	}


	function isOperator(char) {
		return char === '+' || char === '-' || char === '*' || char ==='/';
	}


}]);


/*
	Error List:
	[001]: First or Last item can not be an operator
	[002]: Two or more operator in sequence
	[003]: Division by zero


	TO-DO List:
	[ ] Real Numbers
	[ ] Button Delete (delete the last character)
	[ ] Calculate
	[ ] Style
	[ ] Parentheses*
	[ ] Save calcs*


	*Optional
*/
