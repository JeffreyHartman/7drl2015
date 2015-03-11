var startScreen = function() {
	// clear all our game variables out in case we've already played
	Game.player = null;
    Game.map = {};
    Game.treasure = null;
    Game.monster = null;
    Game.player = null;
    Game.engine = null;
    Game.scheduler = null;

	console.log("Entered the start screen");
	Game.display.clear();
	this.init();
}

startScreen.prototype.init = function() {
	Game.display.drawText(1,1, "%c{yellow}The Science Experiment Gone Wrong Game");
	Game.display.drawText(1,2, "Press [Enter] to start killing some zombies! User arrow keys for movement! You can't actually kill zombies yet...");
}

startScreen.prototype.handleInput = function(inputType, inputData) {
	if (inputType === 'keydown') {
		if (inputData.keyCode === ROT.VK_RETURN) {
			Game.switchScreen(new playScreen());
		}
	}
}