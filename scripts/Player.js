var Player = function(x,y,speed) {
    this._x = x;
    this._y = y;
    this._speed = speed;
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
    if (e.keyCode === ROT.VK_LEFT) {
        this._move(-1, 0);
    } else if (e.keyCode === ROT.VK_RIGHT) {
        this._move(1, 0);
    } else if (e.keyCode === ROT.VK_UP) {
        this._move(0, -1);
    } else if (e.keyCode === ROT.VK_DOWN) {
        this._move(0, 1);
    } else if (e.keyCode === ROT.VK_S) {
        this._shoot();
    }
}

/*
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

    // new movement stuff

    if (code == 83) { 
        this._shoot();
    } else {
        // if key pressed is not in our keymap, exit
        if(!(code in keyMap)) { return; }
        
        // ???
        // profit
        var diff = ROT.DIRS[8][keyMap[code]];
        var newX = this._x + diff[0];
        var newY = this._y + diff[1];
        
        var currentKey = this._x+','+this._y;
        var newKey = newX + "," + newY;
        if (!(newKey in Game.map)) { return; }
        var glyph = Game.map[newKey].getGlyph();
        if (!glyph.isPassable()) { // wall or something, can't move here
                return;
        } else if (newKey in Game.entities) { // kill it!
            //TODO: implement attacking
            this._attack(Game.entities[newKey]);
            Game.engine.unlock();
        } else { // move there
            var glyph = Game.map[currentKey].getGlyph();
            Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
            this._x = newX;
            this._y = newY;
            this.draw();
            window.removeEventListener("keydown", this);
            Game.engine.unlock();
        }
    }
};
*/

Player.prototype._attack = function(entity) {
    entity.destroy();
}

Player.prototype._shoot = function() {
    /* TODO: Make shoot do more than make pew pew sounds */
    console.log('pew pew');
}

Player.prototype._move = function(directionX, directionY) {
    var newX = this._x + directionX;
    var newY = this._y + directionY;
    var currentKey = this._x + ',' + this._y;
    var newKey = newX + ',' + newY;
    
    if (!(newKey in Game.map)) { return; } // sanity check to make sure the player isn't trying to move off the map or something

    var glyph = Game.map[newKey].getGlyph();

    if (!glyph.isPassable()) { // wall or something, can't move here
        return; 
    } else if (newKey in Game.entities) { // kill it!
        this._attack(Game.entities[newKey]);
        Game.engine.unlock();
    } else {
        // redraw the tile we're moving away from
        var oldGlyph = Game.map[currentKey].getGlyph();
        Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
        // set the player's new location and draw him there
        this._x = newX;
        this._y = newY;
        this.draw();
        // recenter map
        //Game.currentScreen.centerX = Math.max(0, Math.min(Game.currentScreen.getWidth() - 1, Game.currentScreen.centerX + directionX));
        //Game.currentScreen.centerY = Math.max(0, Math.min(Game.currentScreen.getHeight() - 1, Game.currentScreen.centerY + directionY));
        window.removeEventListener('keydown', this);
        Game.engine.unlock();
    }
}

Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }
Player.prototype.getSpeed = function() { return this._speed; }

