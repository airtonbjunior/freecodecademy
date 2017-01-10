colors         = ['green', 'red', 'yellow', 'blue'];
turns          = [];
totalTurns     = 20;
level          = 1;
lightOn        = true;
userTurn 	   = 1; //i
buttonsBlocked = true;
userFinish     = false;



game();


function game() {
	lightOn = true;
	userTurn = 1;
	level++;
	document.getElementById("level").innerHTML = level;
	
	i = 0;
	chooseAllColors();
	console.log(turns);
	printPattern(level);
	
	/* Return the last button to the original color */
	setTimeout(function() {
		document.getElementById(turns[i-1]).style.opacity = 1; 	
		buttonsBlocked = false; // unblock the buttons
		readUserTurn();
	}, (level) * 2 * 1000); // two times per button (color on and color off)

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
		}, 1000);
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
	}, 1000);
}



function chooseOneColor() {
	turns.push(colors[Math.floor(Math.random() * 4)]);
}

function chooseAllColors() {
	for (var i = 0; i < totalTurns; i++) {
		turns.push(colors[Math.floor(Math.random() * 4)]);
	}
}

/* Put onclick event here in js, so I don't need put this on html - Unobtrusive Javascript */
document.getElementById("green").onclick = function(){
	if(buttonsBlocked) return;

	if(userTurn > level) {
		console.log("Enough! This level is over");
		return;
	}
	
	if(turns[userTurn - 1] === "green") {
		new Audio('audio/simonSoundgreen.mp3').play();
		console.log("YOU ARE RIGHT");

		if(userTurn == level) {
			console.log("Here, I will call the next level");
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		console.log("YOU ARE WRONG! GAME OVER IF THE STRICT MODE IS DEACTIVATE");
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
		console.log("YOU ARE RIGHT");

		if(userTurn == level) {
			console.log("Here, I will call the next level");
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		console.log("YOU ARE WRONG! GAME OVER IF THE STRICT MODE IS DEACTIVATE");
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
		console.log("YOU ARE RIGHT");

		if(userTurn == level) {
			console.log("Here, I will call the next level");
			game();
		} else {
			userTurn++;	
		}

	}
	else {
		console.log("YOU ARE WRONG! GAME OVER IF THE STRICT MODE IS DEACTIVATE");
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
		console.log("YOU ARE RIGHT");
		
		if(userTurn == level) {
			console.log("Here, I will call the next level");
			game();
		} else {
			userTurn++;	
		}
	
	}
	else {
		console.log("YOU ARE WRONG! GAME OVER IF THE STRICT MODE IS DEACTIVATE");
	}
};

/*
	References:

	[1]: http://stackoverflow.com/questions/19886843/how-to-remove-outline-border-from-input-button 
	[2]: http://www.w3schools.com/cssref/playit.asp?filename=playcss_border-style
	[3]: http://stackoverflow.com/a/35090614


	TO-DO:
	[X]: blink when there're two equal colors in a sequence
	[X]: deactivate the click buttons when the sequence are showing to the user



	BUG TO FIX: the last color changed, return to the original color so fast. Then, it's impossible to notice.
*/