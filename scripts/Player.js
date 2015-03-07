var Player = function(x,y) {
    this._x = x;
    this._y = y;
    // call _draw when Player gets created
    this._draw();
};

Player.prototype._draw = function() {
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
    
    // if enter or space pressed, open the chest the players on
    if (code == 13 || code == 32) {
        this._checkBox();
        return;
    }
    
    // if key pressed is not in our keymap, exit
    if(!(code in keyMap)) { return; }
    
    // ???
    // profit
    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + diff[0];
    var newY = this._y + diff[1];
    
    var newKey = newX + "," + newY;
    if(!(newKey in Game.map)) { return; } // cannot move in this direction
    
    Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype._checkBox = function() {
    var key = this._x + "," + this._y;
    if (Game.map[key] != "*") {
        alert("No box here....");
    } else if (key == Game.treasure) {
        Game.switchScreen(new winScreen());
        Game.engine.lock();
        window.removeEventListener("keydown", this);
    } else {
        alert ("The box is empty...We must keep searching");
    }
}

Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

