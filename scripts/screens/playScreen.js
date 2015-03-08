var playScreen = function() {
    console.log("Entered the play screen");
    Game.display.clear();
    this.render();
}

playScreen.prototype.render = function() {
    this._loadmap();
    // use rot.js simple scheduler for round robin turns
    Game.scheduler = new ROT.Scheduler.Simple();
    // add player to the scheduler, true sets it as recurring
    Game.scheduler.add(Game.player, true);
    // create rot.js engine, which takes care of the main game loop and needs a scheduler object
    Game.engine = new ROT.Engine(Game.scheduler);
    // lets get this shit started
    Game.engine.start();
}

playScreen.prototype._loadmap = function() {
    var levelText = '';
    var xhr = new XMLHttpRequest();
    xhr.open('get', './levels/smallhouse.txt', false);
    xhr.onreadystatechange = buildMapObject;
    xhr.send();

    /* Parse the map file and build our map object from it */
    function buildMapObject() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            levelText = xhr.responseText.split('\n');
            for (y = 0; y < levelText.length; y++) {
                for (x = 0; x < levelText[0].length; x++) {
                    var key = x+','+y;
                    Game.map[key] = assignTile(levelText[y][x]);
                    if (levelText[y][x] == '@')
                        Game.player = new Player(x,y);
                }
            }
            drawWholeMap();
        }
    }

    /* This is terrible code */
    function assignTile(chr) {
        switch(chr) {
            case '=':
                return Tile.WallHorizontal;
                break;
            case '|':
                return Tile.WallVertical;
                break;
            case '.':
            case '@':
                return Tile.Floor;
                break;
            case '@':
            default:
                return Tile.Null;
        }
    }

    function drawWholeMap() {
        // for every coordinate in the map array, draw the tile
        for(var key in Game.map) {
            if (Game.map.hasOwnProperty(key)) {
                var parts = key.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                var glyph = Game.map[key].getGlyph();
                Game.display.draw(x, y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
                Game.player.draw();
            }
        }
    }   
}

playScreen.prototype._spawnZombies = function() {
    var z = new Zombie(0,0);
    Game.zombies.push(z);
    Game.scheduler.add(z, true);
}

playScreen.prototype.handleInput = function(inputType, e) {
	if (inputType === 'keydown') {
		if (e.keyCode === ROT.VK_RETURN) {
            this._spawnZombies();
        }
	}
}