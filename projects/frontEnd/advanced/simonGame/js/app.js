colors         = ['green', 'red', 'yellow', 'blue'];
turns          = [];
totalTurns     = 20;
timeDelay      = 400; // milliseconds
restartDelay   = 400; // milliseconds
level          = 0;
lightOn        = true;
userTurn 	   = 1; //i
buttonsBlocked = true;
userFinish     = false;
strict         = false;
started        = false;

document.getElementById("level").innerHTML = "Press Start";
document.getElementById("strictButton").innerHTML = "Strict OFF";

function game() {
	if(level == 20) {
		console.log("YOU WIN!!! DO SOMETHING HERE!");
		return;
	}

	lightOn        = true;
	buttonsBlocked = true;
	userTurn       = 1;
	level++;
	
	document.getElementById("level").innerHTML = "Level " + level;
	document.getElementById("startButton").disabled = true;
	
	i = 0;
	
	printPattern(level);
	
	/* Return the last button to the original color */
	setTimeout(function() {
		document.getElementById(turns[i-1]).style.opacity = 1; 	
		buttonsBlocked = false; // unblock the buttons
		document.getElementById("startButton").disabled = false;
		readUserTurn();
	}, (level) * 2 * timeDelay); // two times per button (color on and color off)
}



function readUserTurn() {
	if(userTurn == level) return;
	//while(!userFinish) {

	//}
}


function printPattern(levelPrint) {
	
	if(i == level) {
		return;
		setTimeout(function(){
			document.getElementById(turns[i-1]).style.opacity = 1; 
			return;
		}, timeDelay);
	}
	

	var timeout = setTimeout(function() {
		
		if(lightOn) {
			document.getElementById(turns[i]).style.opacity = .50;
			new Audio('audio/simonSound' + turns[i] + '.mp3').play(); // Name pattern -> simonSound[COLOR].mp3
			i++;
		}
		else {
			document.getElementById(turns[i-1]).style.opacity = 1; 
		}
		lightOn = !lightOn;
		printPattern();
	}, timeDelay);
}



function chooseOneColor() {
	turns.push(colors[Math.floor(Math.random() * 4)]);
}

function chooseAllColors() {
	for (var i = 0; i < totalTurns; i++) {
		turns.push(colors[Math.floor(Math.random() * 4)]);
	}
}


/* BUTTONS */

/* Put onclick event here in js, so I don't need put this on html - Unobtrusive Javascript */
document.getElementById("green").onclick = function(){
	if(buttonsBlocked) return;

	if(userTurn > level) {
		console.log("Enough! This level is over");
		return;
	}
	
	if(turns[userTurn - 1] === "green") {
		new Audio('audio/simonSoundgreen.mp3').play();

		if(userTurn == level) {
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		new Audio('audio/error.mp3').play();
		
		if(!strict) {
			level--; // inside the game function there is a level++ instruction. So, I decrement because the user will play the same level.
			buttonsBlocked = true;
			document.getElementById("level").innerHTML = "Error!";
			setTimeout(game, restartDelay);
		}
		else {
			console.log("Game Over");
			document.getElementById("level").innerHTML = "Game Over";
			document.getElementById("startButton").innerHTML = "Start";
			level = 0;
			return;
		}
	}
};


document.getElementById("red").onclick = function(){
	if(buttonsBlocked) return;
	

	if(userTurn > level) {
		console.log("Enough! This level is over");
		return;
	}

	if(turns[userTurn - 1] === "red") {
		new Audio('audio/simonSoundred.mp3').play();

		if(userTurn == level) {
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		new Audio('audio/error.mp3').play();
		
		if(!strict) {
			level--; // inside the game function there is a level++ instruction. So, I decrement because the user will play the same level.
			buttonsBlocked = true;
			document.getElementById("level").innerHTML = "Error!";
			setTimeout(game, restartDelay);
		}
		else {
			console.log("Game Over");
			document.getElementById("level").innerHTML = "Game Over";
			document.getElementById("startButton").innerHTML = "Start";
			level = 0;
			return;
		}
	}
};


document.getElementById("yellow").onclick = function(){
	if(buttonsBlocked) return;
	
	if(userTurn > level) {
		console.log("Enough! This level is over");
		return;
	}

	if(turns[userTurn - 1] === "yellow") {
		new Audio('audio/simonSoundyellow.mp3').play();

		if(userTurn == level) {
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		new Audio('audio/error.mp3').play();
		
		if(!strict) {
			level--; // inside the game function there is a level++ instruction. So, I decrement because the user will play the same level.
			buttonsBlocked = true;
			document.getElementById("level").innerHTML = "Error!";
			setTimeout(game, restartDelay);
		}
		else {
			console.log("Game Over");
			document.getElementById("level").innerHTML = "Game Over";
			document.getElementById("startButton").innerHTML = "Start";
			level = 0;
			return;
		}		
	}
};


document.getElementById("blue").onclick = function(){
	if(buttonsBlocked) return;

	if(userTurn > level) {
		console.log("Enough! This level is over");
		return;
	}

	if(turns[userTurn - 1] === "blue") {
		new Audio('audio/simonSoundblue.mp3').play();
		
		if(userTurn == level) {
			game();
		} else {
			userTurn++;	
		}
	
	}
	else {
		new Audio('audio/error.mp3').play();
		
		if(!strict) {
			level--; // inside the game function there is a level++ instruction. So, I decrement because the user will play the same level.
			buttonsBlocked = true;
			document.getElementById("level").innerHTML = "Error!";
			setTimeout(game, restartDelay);
		}
		else {
			console.log("Game Over");
			document.getElementById("level").innerHTML = "Game Over";
			document.getElementById("startButton").innerHTML = "Start";
			level = 0;
			return;
		}		
	}
};


/* Button Start */
document.getElementById("startButton").onclick = function() {
	turns = [];
	chooseAllColors();
	console.log("The turns are -> " + turns);
	if(!started) {
		started = !started;
		console.log("Starting the game");
		document.getElementById("startButton").innerHTML = "Restart";		
		game();
		return;
	} 
	else {
		document.getElementById("startButton").innerHTML = "Restart";
		level = 0;
		game();
		return;
	}
	
	 
	

}

/* Button Strict */
document.getElementById("strictButton").onclick = function() {
	strict = !strict;
	if (strict) {
		document.getElementById("strictButton").innerHTML = "Strict ON ";
	}
	else {
		document.getElementById("strictButton").innerHTML = "Strict OFF";
	}
}

/*
	References:

	[1]: http://stackoverflow.com/questions/19886843/how-to-remove-outline-border-from-input-button 
	[2]: http://www.w3schools.com/cssref/playit.asp?filename=playcss_border-style
	[3]: http://stackoverflow.com/a/35090614
	[4]: http://www.w3schools.com/howto/howto_css_switch.asp


	TO-DO:
	[X]: blink when there're two equal colors in a sequence
	[X]: deactivate the click buttons when the sequence are showing to the user
	[ ]: let the user configures the time delay
	[ ]: end game


	BUG TO FIX: the last color changed, return to the original color so fast. Then, it's impossible to notice.
*/
console.log("You can follow the sequence of functions here on console. Enjoy!")