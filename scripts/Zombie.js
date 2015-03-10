var Zombie = function(x, y,speed) {
    this._x = x;
    this._y = y;
    this._speed = speed;
    this._draw();
}

Zombie.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "z", "red");
    Game.zombies[this._x+','+this._y] = this;
}

Zombie.prototype.act = function() {
    var currentKey = this._x+','+this._y;
    delete Game.zombies[currentKey];
    var playerX = Game.player.getX();
    var playerY = Game.player.getY();
    var passableCallback = function(x, y) {
        var key = x+','+y;
        if (!(key in Game.zombies) && key in Game.map) {
            var g = Game.map[key].getGlyph();
            return g.isPassable();
        }
        else {
            return false;
        }
    }
    
    var astar = new ROT.Path.AStar(playerX, playerY, passableCallback, {topology:4});
    
    var path = [];
    var pathCallback = function(playerX, playerY) {
        path.push([playerX, playerY]);
    }
    astar.compute(this._x, this._y, pathCallback);
    
    path.shift();
    if (path.length === 1) {
       this._attack(); // braaaaaaainz
    } else {
        x = path[0][0];
        y = path[0][1];
        var glyph = Game.map[currentKey].getGlyph();
        Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
        this._x = x;
        this._y = y;
        this._draw();
    }
}

Zombie.prototype._attack = function() {
    // TODO: implement zombie brain eating
    console.log('pretend Im eating your brains right now');
}

Zombie.prototype.getSpeed = function() { return this._speed; }