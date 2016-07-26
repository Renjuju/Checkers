'use strict';

angular.module('checkers').controller('CheckerBoardCtrl', function($scope, $log, $location, $uibModal, CheckerBoardService) {

    var onDrop = function(source, target, piece, newPos, oldPos, orientation){ 
        if(!CheckerBoardService.validMove(piece, source, target)){
            return 'snapback';
        }
       updatecfg();
    };

    // initialize board

    var cfg = {
        draggable: true,
        pieceTheme: '/images/{piece}.png',
        onDrop: onDrop,
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

    function updatecfg(){
        //clear out the current position object
        cfg.position = {};
        //repopulated the position object with the values found in the 2d array
        var virtualBoard = CheckerBoardService.getVirtualBoard();
        for(var row = 0; row < virtualBoard.length; row++){
            for(var col = 0; col < virtualBoard.length; col++){
                if(virtualBoard[row][col] != ""){
                    var chr = String.fromCharCode(97 + row);
                    var boardPosition = chr.concat(col+1);
                    cfg.position[boardPosition] = virtualBoard[row][col];
                }
            }
        }
        $scope.board = ChessBoard('board', cfg); 
    };
    CheckerBoardService.populateBoard(cfg.position);
   

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
