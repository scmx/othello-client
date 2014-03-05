(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['Board', 'Player', 'Check'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./board'),
                             require('./player'),
                             require('./check'));
  } else {
    root.Game = factory(root.Board,
                        root.Player,
                        root.Check);
  }
}(this, function (Board, Player, Check) {

  var Game = function(opts) {
    opts = opts || {};
    this.white = new Player({ color: 'white', handicap: true });
    this.black = new Player({ color: 'black', handicap: true });
    this.board = new Board({
      size: opts.size || 8,
      player: this.black,
      opponent: this.white
    });
  };

  Game.prototype.click = function (row, col) {
    this.clickCell({ row: row, col: col });
  };

  Game.prototype.clickCell = function (obj) {
    var matches = [];
    var that = this;
    new Check(this.board, obj.row, obj.col)
      .each(function (row, col) {
        that.board.rows[row][col].flip(that.board.player.color);
      })
      .any(function () {
        that.board.rows[obj.row][obj.col]
          .flip(that.board.player.color);
        if (that.board.noEmptyTiles()) {
          that.board.player = undefined;
        }
        that.board.switchTurn();
      });
  };

  Game.prototype.hoverCell = function (obj) {
    for (var r = 0; r < this.board.size; r++) {
      for (var c = 0; c < this.board.size; c++) {
        this.board.rows[r][c].hilight = false;
      }
    }
    if (!this.board.player.handicap) return;
    var matches = new Check(this.board, obj.row, obj.col).matches
    if (matches.length) obj.hilight = true;
    for (var m = 0; m < matches.length; m++) {
      this.board.rows[matches[m][0]][matches[m][1]].hilight = true;
    }
  };

  return Game;
}));
