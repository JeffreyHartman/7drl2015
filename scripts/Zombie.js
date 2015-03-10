var Zombie = function(x, y,speed) {
    this._x = x;
    this._y = y;
    this._speed = speed;
    this._draw();
    this._updateEntityPosition(this);
}

Zombie.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "z", "red");
}

Zombie.prototype.act = function() {
    var currentKey = this._x+','+this._y;
    var playerX = Game.player.getX();
    var playerY = Game.player.getY();
    var passableCallback = function(x, y) {
        var key = x+','+y;
        if (key in Game.map) { /* why is checking if the damn key in the entities table here breaking the fucking game? */
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
        /* HAX! Checking if spot occupied in the passable callback breaks the fucking game, so we'll just skip the zombies turn instead.
         Bonus simulates how dumb zombies are? Yeah, thats it. Totally a feature, not a bug */
        if (Game.entities[x+','+y]) return; 
        var glyph = Game.map[currentKey].getGlyph();
        Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
        this._x = x;
        this._y = y;
        this._draw();
        this._updateEntityPosition(this, currentKey);
    }
}

Zombie.prototype._attack = function() {
    // TODO: implement zombie brain eating
    Game.switchScreen(new loseScreen());
}

Zombie.prototype._updateEntityPosition = function(entity, oldKey) {
    if (oldKey) {
        if (Game.entities[oldKey] == entity) {
            delete Game.entities[oldKey];
        }
    }

    var key = entity.getX() + ',' + entity.getY();
    if (Game.entities[key]) {
        return;
    }
    Game.entities[key] = entity;
}

Zombie.prototype.destroy = function() {
    console.log('Is dead zombie a redundant term?');
    var key = this.getKey();
    delete Game.entities[key];
    Game.scheduler.remove(this);
    var glyph = Game.map[key].getGlyph();
    Game.display.draw(this._x, this._y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
}

Zombie.prototype.getX = function() { return this._x; }
Zombie.prototype.getY = function() { return this._y; }
Zombie.prototype.getKey = function() { return this._x + ',' + this._y; }
Zombie.prototype.getSpeed = function() { return this._speed; }