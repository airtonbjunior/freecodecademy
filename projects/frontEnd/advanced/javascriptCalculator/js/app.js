var app = angular.module('jsCalculator', [])

.controller('calcController', ['$scope', function($scope){

	$scope.chain = "";

	$scope.calc = function(expression) {
		if(expression.length === 0) return "";
		if(!hasOperator(expression)) return "Error [000]";
		if(isOperator(expression[0]) || isOperator(expression[expression.length-1])) return "Error [001]";
		if(twoOperatorsInSequence(expression)) return "Error [002]";
		if(divisionByZero(expression)) return "Error [003]";
		if(!parenthesesCorrect(expression)) return "Error [004]";
		if(strangerChars(expression)) return "Error [005]";

		return eval(expression); //[a]
	}


	$scope.deleteLastChar = function(expression) {
		return expression.slice(0, -1); //[b]
	}


	/* Auxiliar functions */
	function isOperator(char) {
		return char === '+' || char === '-' || char === '*' || char === '/' || char === '.';
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

	function parenthesesCorrect(expression) {
		if(expression[0] === ")" || expression[expression.length-1] === "(") return false;
		if(expression.split("(").length - 1 !== expression.split(")").length - 1) return false;

		// Validate operator and close parentheses in sequence
		for(var i = 0; i < expression.length; i++) {
			// Operator and close parentheses
			if(isOperator(expression[i]) && expression[i+1] === ")") {
				return false;
			}
			// empty parentheses
			if(expression[i] === "(" && expression[i+1] === ")") {
				return false;
			}
			// number and ( in sequence
			if(!isOperator(expression[i]) && expression[i+1] === "(") {
				return false;
			}
		}
		return true;
	}

	function strangerChars(expression) {
		for(var i = 0; i < expression.length; i++) {
			if(!isOperator(expression[i]) && isNaN(expression[i])) {
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
	[d]: http://sergiolopes.org/css-box-sizing-border-box/
	[e]: https://enkipro.com/insight/55ad9d8afa76a84d00e07243

	Error List:
	[000]: No operator
	[001]: First or Last item can not be an operator
	[002]: Two or more operator in sequence
	[003]: Division by zero
	[004]: Incorrect parentheses chain
	[005]: Stranger chars


	TO-DO List:
	[X] Validate operators in sequence
	[X] Validate operators in the begin/end of expression
	[X] Clear
	[X] Validate only numbers (no operator)
	[X] Validate invalid characters (input don't allow keyboard input [c])
	[X] Real Numbers (eval)
	[X] Button Delete (delete the last character)
	[X] Calculate (eval)
	[X] Style
	[X] Parentheses* (eval)
	[X] Validate Parentheses
	[ ] Save calcs*
	[ ] Accept .n when is a fraction < 1 (example: .5 instead 0.5)*
	[ ] Division by zero inside the parentheses*
	[X] Initial focus on the input (isn't necessary)
	[X] Validate strange chars in calc input (sometimes is possible put strange symbols) 
	[ ] Show error list (toggle area)

	*Optional
*/
