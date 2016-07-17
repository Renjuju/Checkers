'use strict';

angular.module('checkers').controller('CheckerBoardCtrl', function ($scope, $log, $location, $uibModal) {
	// initialize board
	$scope.board = ChessBoard('board');
	$(window).resize($scope.board.resize);

	$scope.animationsEnabled = true;
	$scope.isCollapsed = false;

  	// forfeit modal
	$scope.forfeit = function(size) {
	    var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: '/views/forfeitModal.html',
	        controller: 'ForfeitModalCtrl',
	        size: size
	    });

	}
});
