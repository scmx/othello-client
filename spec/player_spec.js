var othello = require('../lib/othello');

describe("Player", function () {
  var player;

  describe("color", function () {
    beforeEach(function () {
      player = new othello.Player({ color: 'white' });
    });

    it("has a color", function () {
      expect(player.color).toBe('white');
    });
  });
});
