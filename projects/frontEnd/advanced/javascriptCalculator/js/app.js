var app = angular.module('jsCalculator', [])

.controller('calcController', ['$scope', function($scope){

	$scope.calc = function(expression) {
		if(!hasOperator(expression)) return "No operator! [000]";
		if(isOperator(expression[0]) || isOperator(expression[expression.length-1])) return "Operator Error [001]";
		if(twoOperatorsInSequence(expression)) return "Operators in sequence [002]";
		if(divisionByZero(expression)) return "Division By Zero [003]";

		return eval(expression); //[a]
	}


	$scope.deleteLastChar = function(expression) {
		return expression.slice(0, -1); //[b]
	}


	/* Auxiliar functions */
	function isOperator(char) {
		return char === '+' || char === '-' || char === '*' || char ==='/';
	}

	function hasOperator(expression) {
		for (var i = 0; i < expression.length; i++) {
			if(isOperator(expression[i])) {
				return true;
			}
		}
		return false;
	}

	function twoOperatorsInSequence(expression) {
		for(var i = 0; i < expression.length; i++) {
			if(isOperator(expression[i]) && isOperator(expression[i+1])) {
				return true;
			}
		}
		return false;
	}

	function divisionByZero(expression) {
		for(var i = 0; i < expression.length; i++) {
			if(expression[i] === '/' && expression[i+1] === '0') {
				return true;
			}
		}
		return false;
	}


}]);


/*
	-------------
	DOCUMENTATION
	-------------

	References:
	[a]: http://stackoverflow.com/questions/2276021/evaluating-a-string-as-a-mathematical-expression-in-javascript
	[b]: http://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
	[c]: http://stackoverflow.com/questions/29715655/html-5-input-type-date-disable-keyboard-input

	Error List:
	[000]: No operator
	[001]: First or Last item can not be an operator
	[002]: Two or more operator in sequence
	[003]: Division by zero


	TO-DO List:
	[X] Validate operators in sequence
	[X] Validate operators in the begin/end of expression
	[X] Clear
	[X] Validate only numbers (no operator)
	[X] Validate invalid characters (input don't allow keyboard input [c])
	[X] Real Numbers (eval)
	[X] Button Delete (delete the last character)
	[X] Calculate (eval)
	[ ] Style
	[X] Parentheses* (eval)
	[ ] Validate Parentheses
	[ ] Save calcs*


	*Optional
*/
