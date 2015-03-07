var loseScreen = function() {
	console.log("Entered the lose screen");
	this.render();
}

loseScreen.prototype.render = function() {
	Game.display.drawText(1,1, "%c{red}You were eaten by a grue. Try again?");
	Game.display.drawText(1,2, "Press [Enter] to return to the menu");
}

loseScreen.prototype.handleInput = function(inputType, inputData) {
	if (inputType === 'keydown') {
		if (inputData.keyCode === ROT.VK_RETURN) {
			Game.switchScreen(new startScreen());
		}
	}
}