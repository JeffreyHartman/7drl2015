var Glyph = function(chr, foreground, background, passable) {
	this._char = chr || ' ';
	this._foreground = foreground | 'white';
	this._background = background | 'black';
	this._passable = passable | false;
}

Glyph.prototype.getChar = function() {
	return this._char;
}

Glyph.prototype.getBackground = function() {
	return this._background;
}

Glyph.prototype.getForeground = function() {
	return this._foreground;
}

Glyph.prototype.isPassable = function() {
	return this._passable;
}