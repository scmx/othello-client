(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([''], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Player = factory();
  }
}(this, function () {

  var Player = function (opts) {
    this.color    = opts.color;
    this.handicap = opts.handicap;
  };

  return Player;
}));

