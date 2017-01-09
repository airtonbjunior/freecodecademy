totalTurns = 20;
level  = 1;
turn   = 1;
turns  = [];
colors = ['green', 'red', 'yellow', 'blue'];


document.getElementById("level").innerHTML = level;

i = 0;
chooseAllColors();
console.log(turns);
printPattern();


function printPattern() {
	if(i == 10) return;
	

	var timeout = setTimeout(function() {
		console.log("hi!");
		if(i % 2 == 0) {
			document.getElementById(turns[i]).style.opacity = .75;
		}
		else {
			document.getElementById(turns[i-1]).style.opacity = 1; 
		}
		i++
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

/*
	References:

	[1]: http://stackoverflow.com/questions/19886843/how-to-remove-outline-border-from-input-button 
	[2]: http://www.w3schools.com/cssref/playit.asp?filename=playcss_border-style
	[3]: http://stackoverflow.com/a/35090614


	TO-DO:
	[ ]: blink when there're two equal colors in a sequence
	[ ]: deactivate the click buttons when the sequence are showing to the user



	BUG TO FIX: the last color changed, return to the original color so fast. Then, it's impossible to notice.
*/