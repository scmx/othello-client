angular.module('othello')
  .controller('BoardCtrl', function ($scope) {
    $scope.restart = function () {
      $scope.game = new Game;
    };

    $scope.restart();
  });
