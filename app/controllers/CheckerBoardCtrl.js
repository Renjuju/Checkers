'use strict';

angular.module('checkers').controller('CheckerBoardCtrl', function($scope, $log, $location, $uibModal) {
    // initialize board

    var cfg = {
        draggable: true,
        pieceTheme: '/images/{piece}.png',
        position: {
            a1: 'wP',
            c1: 'wP',
            e1: 'wP',
            g1: 'wP',
            b2: 'wP',
            d2: 'wP',
            f2: 'wP',
            h2: 'wP',
            a3: 'wP',
            c3: 'wP',
            e3: 'wP',
            g3: 'wP',

            b8: 'bP',
            d8: 'bP',
            f8: 'bP',
            h8: 'bP',
            a7: 'bP',
            c7: 'bP',
            e7: 'bP',
            g7: 'bP',
            b6: 'bP',
            d6: 'bP',
            f6: 'bP',
            h6: 'bP',
        }
    };

    $scope.board = ChessBoard('board', cfg);
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
