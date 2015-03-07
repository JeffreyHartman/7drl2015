var startScreen = function() {
	// clear all our game variables out in case we've already played
	Game.player = null;
    Game.map = {};
    Game.treasure = null;
    Game.monster = null;
    Game.player = null;
    Game.engine = null;

	console.log("Entered the start screen");
	Game.display.clear();
	this.render();
}

startScreen.prototype.render = function() {
	Game.display.drawText(1,1, "%c{yellow}rot.js Roguelike");
	Game.display.drawText(1,2, "Press [Enter] to start!");
}

startScreen.prototype.handleInput = function(inputType, inputData) {
	if (inputType === 'keydown') {
		if (inputData.keyCode === ROT.VK_RETURN) {
			Game.switchScreen(new playScreen());
		}
	}
}