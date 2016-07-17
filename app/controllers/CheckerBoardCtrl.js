'use strict';

angular.module('checkers').controller('CheckerBoardCtrl', function ($scope, $log, $location) {
  // initialize board
  $scope.board = ChessBoard('board');
  $(window).resize($scope.board.resize);
});