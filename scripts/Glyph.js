var Glyph = function(chr, foreground, background) {
	this._char = chr || ' ';
	this._foreground = foreground | 'white';
	this._background = background | 'black';
}

Glyph.prototype.getChar = function() {
	return this._char;
}

Glyph.prototype.getBackground = function() {
	return this._bakcground;
}

Glyph.prototype.getForeground = function() {
	return this._foreground;
}