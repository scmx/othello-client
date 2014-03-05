var othello = require('../lib/othello');

describe("Board", function () {
  var board;

  describe("new", function () {
    beforeEach(function () {
      board = new othello.Board({
        size: 8,
        player: new othello.Player({ color: 'black' }),
        opponent: new othello.Player({ color: 'white' })
      });
    });

    it("defines size", function () {
      expect(board.size).toBe(8);
    });

    it("defines player", function () {
      expect(board.player).toBeDefined();
    });

    it("defines opponent", function () {
      expect(board.opponent).toBeDefined();
    });
  });

  describe("#rows", function () {
    beforeEach(function () {
      board = new othello.Board({
        size: 8,
        player: new othello.Player({ color: 'black' }),
        opponent: new othello.Player({ color: 'white' })
      });
    });

    it("is defined", function () {
      expect(board.rows).toBeDefined();
    });

    it("sets state of middle tiles", function () {
      expect(board.rows[3][3].state).toBe('black');
      expect(board.rows[3][4].state).toBe('white');
      expect(board.rows[4][3].state).toBe('white');
      expect(board.rows[4][4].state).toBe('black');
    });
  });
});
