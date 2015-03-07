var Monster = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}

Monster.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "G", "red");
}

Monster.prototype.act = function() {
    var playerX = Game.player.getX();
    var playerY = Game.player.getY();
    var passableCallback = function(playerX, playerY) {
        return (playerX+","+playerY in Game.map);
    }
    
    var astar = new ROT.Path.AStar(playerX, playerY, passableCallback, {topology:4});
    
    var path = [];
    var pathCallback = function(playerX, playerY) {
        path.push([playerX, playerY]);
    }
    astar.compute(this._x, this._y, pathCallback);
    
    path.shift();
    if (path.length == 1) {
        Game.switchScreen(new loseScreen());
        Game.engine.lock();
    } else {
        x = path[0][0];
        y = path[0][1];
        Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
        this._x = x;
        this._y = y;
        this._draw();
    }
}
    