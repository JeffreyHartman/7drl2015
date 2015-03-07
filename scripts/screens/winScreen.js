var winScreen = function() {
	console.log("Entered the win screen");
	this.render();
}

winScreen.prototype.render = function() {
	Game.display.drawText(1,1, "%c{green}TREASURE! YOU WIN!");
	Game.display.drawText(1,2, "Press [Enter] to return to the menu screen!");	
}

winScreen.prototype.handleInput = function(inputType, inputData) {
	if (inputType === 'keydown') {
		if (inputData.keyCode === ROT.VK_RETURN) {
			Game.switchScreen(new startScreen());
		}
	}
}