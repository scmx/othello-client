(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Check = factory();
  }
}(this, function () {

  var Check = function (board, row, col) {
    this.board = board;
    this.row = row;
    this.col = col;
    this.matches = [];
    if (this.board.rows[row][col].state) return;
    if (typeof this.board.rows[row][col].state === 'undefined') return;
    this.venture(-1, -1);
    this.venture(-1,  0);
    this.venture(-1, +1);
    this.venture( 0, -1);
    this.venture( 0, +1);
    this.venture(+1, -1);
    this.venture(+1,  0);
    this.venture(+1, +1);
  };

  Check.prototype.each = function (callback) {
    for (var m = 0; m < this.matches.length; m++) {
    //console.log(this.matches[m]);
      callback(this.matches[m][0], this.matches[m][1]);
    }
    return this;
  };

  Check.prototype.any = function (callback) {
    if (this.matches.length) callback();
    return this;
  };

  Check.prototype.venture = function (y, x) {
    var matches = [];
  //console.log('venture', [this.row + y, this.col + x]);
    for (var n = 1; n <= this.board.size; n++) {
      var state = this.determine(y * n, x * n);
    //console.log('determine', [y*n, x*n], [state]);
      if (state === this.board.opponent.color) {
        matches.push([this.row + y * n, this.col + x * n]);
      } else if (state === this.board.player.color) {
        break;
      } else {
        matches = [];
        return;
      }
    }
  //console.log('matches', matches);
    for (var m = 0; m < matches.length; m++) {
      this.matches.push(matches[m]);
    }
  };

  Check.prototype.determine = function (y, x) {
    if (this.row + y < 0 || this.row + y > 7) return;
    if (this.col + x < 0 || this.col + x > 7) return;
    if (this.row + y < 0 || this.row + y > 7) return;
    if (this.col + x < 0 || this.col + x > 7) return;
    return this.board.rows[this.row + y][this.col + x].state;
  };

  return Check;
}));
