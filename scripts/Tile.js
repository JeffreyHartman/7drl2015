var Tile = function(glyph) {
	this._glyph = glyph;
}

Tile.prototype.getGlyph = function() {
	return this._glyph;
}

Tile.Null = new Tile(new Glyph());
Tile.Floor = new Tile(new Glyph('.', '#d3d3d3', null, true));
Tile.WallVertical = new Tile(new Glyph('|', '#614126'));
Tile.WallHorizontal = new Tile(new Glyph('=', '#614126'));
