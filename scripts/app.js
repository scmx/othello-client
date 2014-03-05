angular.module('othello', [
])
  .filter('translate', function () {
    return function (input) {
      switch (input) {
        case 'black': return 'svart';
        case 'white': return 'vit';
        default:      return input;
      }
    };
  });
