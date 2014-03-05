(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['Tile'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./tile'));
  } else {
    root.Board = factory(root.Tile);
  }
}(this, function (Tile) {

  var Board = function(opts) {
    this.reset(opts);
  };

  Board.prototype.reset = function (opts) {
    opts = opts || {};
    this.size = opts.size || this.size || 8;
    this.rows = makeRows(this.size);

    this.player   = opts.player   || this.player;
    this.opponent = opts.opponent || this.opponent;
    this.prepare();
  };

  Board.prototype.prepare = function () {
    var mid = parseInt(this.size / 2);
    this.rows[mid - 1][mid - 1].flip('black');
    this.rows[mid - 1][mid    ].flip('white');
    this.rows[mid    ][mid - 1].flip('white');
    this.rows[mid    ][mid    ].flip('black');
  };

  Board.prototype.render = function () {
    console.log();
    console.log(' Turn: ' + this.player.color);
    console.log('+---+---+---+---+---+---+---+---+');
    for (var r = 0; r < this.size; r++) {
      var line = "|";
      for (var c = 0; c < this.size; c++) {
        line += ' ' + this.rows[r][c].symbol() + ' |'
      }
      console.log(line);
      console.log('+---+---+---+---+---+---+---+---+');
    }
  };

  Board.prototype.switchTurn = function () {
    var player = this.player;
    this.player = this.opponent;
    this.opponent = player;
  };

  Board.prototype.noEmptyTiles = function () {
    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        if (!this.rows[r][c].state) return false;
      }
    }
    return true;
  };

  var makeRows = function (size) {
    var rows = []
    for (var r = 0; r < size; r++) {
      var row = []
      for (var c = 0; c < size; c++) {
        row.push(new Tile({ row: r, col: c }));
      }
      rows.push(row);
    }
    return rows;
  };

  return Board;
}));
