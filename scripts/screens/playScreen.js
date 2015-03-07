var playScreen = function() {
	
	console.log("Entered the play screen");
	Game.display.clear();
	this.render();
}

playScreen.prototype.render = function() {
	this._generateMap();
    // use rot.js simple scheduler for round robin turns
    var scheduler = new ROT.Scheduler.Simple();
    // add player to the scheduler, true sets it as recurring
    scheduler.add(Game.player, true);
    scheduler.add(Game.monster, true);
    // create rot.js engine, which takes care of the main game loop and needs a scheduler object
    Game.engine = new ROT.Engine(scheduler);
    // lets get this shit started
    Game.engine.start();
}

playScreen.prototype._generateMap = function() {
    // this creates a rot.js map object
    var digger = new ROT.Map.Digger(80,25);
    // array for empty cells
    var freeCells = [];
    
    // callback method to pass to the map create method to store our map
    // the callback method requires x,y, and value params
    var digCallBack = function(x, y, value) {
        // create a key for our map array of the x y coordinates
        var key = x+","+y;
        // value will be 1 for walls, 0 for empty space
        if (value) {
            return; // waaaaaaall
        }
        else { 
            Game.map[key] = ".";
            // also add this coordinate to the freeCells array
            freeCells.push(key);
        }
    };
    // the create method creates the map and calls the callback method for every map cell generated
    digger.create(digCallBack.bind(this));
    
    this._generateBoxes(freeCells);
    this._drawWholeMap();
    Game.player = this._createActor(Player, freeCells);
    Game.monster = this._createActor(Monster, freeCells);
}

playScreen.prototype._generateBoxes = function(freeCells) {
    for(var i=0;i<10;i++) {
        // gets a random number by multiplying the current freeCells length and rot.js random number
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        // removes a key from freeCells at the random index(1 removes 1 item)
        //...not sure what the [0] is for
        var key = freeCells.splice(index, 1)[0];
        // put a box there!
        Game.map[key] = "*";
        if (!i) { Game.treasure = key; } // put some treasure in the first box
    }  
}

playScreen.prototype._drawWholeMap = function() {
    // for every coordinate in the map array, draw the tile
    for(var key in Game.map) {
        if (Game.map.hasOwnProperty(key)) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            Game.display.draw(x, y, Game.map[key]);
        }
    }
}

playScreen.prototype._createActor = function(what, freeCells) {
    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x, y);
}

playScreen.prototype.handleInput = function(inputType, inputData) {
	if (inputType === 'keydown') {
		if (inputData.keyCode === ROT.VK_RETURN) {
			// TODO! Move all of the control logic from the player object to this screen 	
		}
	}
}