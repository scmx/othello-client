(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([''], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Tile = factory();
  }
}(this, function () {

  var Tile = function (opts) {
    this.state = '';
    this.row = opts.row;
    this.col = opts.col;
  };

  Tile.prototype.flip = function (state) {
    if (state) {
      this.state = state;
      return;
    }
    if (this.state) return;
    switch (this.state) {
      case 'black': this.state = 'white'; break;
      case 'white': this.state = 'black'; break;
      default: this.state = '';
    }
  }

  Tile.prototype.symbol = function () {
    switch(this.state) {
      case 'white': return '●';
      case 'black': return '○';
      default:      return ' ';
    }
  };

  return Tile;
}));
