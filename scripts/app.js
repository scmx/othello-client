angular.module('othello', [
])
  .run(function ($rootScope) {
    var nickname = localStorage.getItem('nickname');
    if (!nickname) {
      nickname = prompt('Välj ett namn');
      localStorage.setItem('nickname', nickname);
    }
    $rootScope.nickname = nickname;
  })
  .filter('translate', function () {
    return function (input) {
      switch (input) {
        case 'black': return 'svart';
        case 'white': return 'vit';
        default:      return input;
      }
    };
  });
