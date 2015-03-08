var Tile = function(glyph) {
	this._glyph = glyph;
}

Tile.prototype.getGlyph = function() {
	return this._glyph;
}

Tile.Null = new Tile(new Glyph());
Tile.Floor = new Tile(new Glyph('.'));
Tile.WallVertical = new Tile(new Glyph('|', 'brown'));
Tile.WallHorizontal = new Tile(new Glyph('=', 'brown'));
