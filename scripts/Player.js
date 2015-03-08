var Player = function(x,y) {
    this._x = x;
    this._y = y;
    // call _draw when Player gets created    
};

Player.prototype.draw = function() {
    // use rot.js draw to draw our hero on the screen
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

Player.prototype.act = function() {
    Game.engine.lock();
    // wait for user input; do stuff when user hits a key
    // passing this object as 2nd param will automatically call handleEvent(), no binding required!
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function(e) {
    // process user input
    // keymap are our directional keys
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;
    // the key pressed
    var code = e.keyCode;

    // if key pressed is not in our keymap, exit
    if(!(code in keyMap)) { return; }
    
    // ???
    // profit
    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + diff[0];
    var newY = this._y + diff[1];
    
    var currentKey = this._x+','+this._y;
    var newKey = newX + "," + newY;
    if( Game.map[newKey] == Tile.WallVertical ||
        Game.map[newKey] == Tile.WallHorizontal ||
        Game.map[newKey] == Tile.Null ||
        Game.map[newKey] == undefined ) {
            return;
    } // cannot move in this direction
    
    var glyph = Game.map[currentKey].getGlyph();
    Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
    this._x = newX;
    this._y = newY;
    this.draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

