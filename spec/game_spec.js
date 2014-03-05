var othello = require('../lib/othello');

describe("Game", function () {
  var game;

  beforeEach(function () {
    game = new othello.Game;
  });

  describe("new", function () {
    it("has a white player", function () {
      expect(game.white).toBeDefined();
    });

    it("has a black player", function () {
      expect(game.black).toBeDefined();
    });

    it("has a board", function () {
      expect(game.board).toBeDefined();
    });
  });

  describe("#click()", function () {
    beforeEach(function () {
      game.board.reset({ size: 5});
      game.board.rows[0][2].flip('white')
      game.board.rows[0][3].flip('black')
      game.board.rows[0][4].flip('white')
      game.board.rows[1][1].flip('white')
      game.board.rows[2][1].flip('black')
      game.board.rows[2][2].flip('black')
    });

    it("changes state of siblings in x and y", function () {
      game.click(0, 1);
      expect(game.board.rows[0][2].state).toBe('black');
      expect(game.board.rows[1][1].state).toBe('black');
    });

    it("changes turn", function () {
      game.click(0, 1);
      expect(game.board.player).toBe(game.white);
    });

    it("changes state back", function () {
      game.click(0, 1);
      game.click(0, 0);
      expect(game.board.rows[0][1].state).toBe('white');
      expect(game.board.rows[0][2].state).toBe('white');
    });

    it("works diagonally", function () {
      game.click(0, 0);
      expect(game.board.rows[1][1].state).toBe('black');
    });
  });
});
