'use strict';

angular.module('checkers').controller('CheckerBoardCtrl', function($scope, $log, $location, $uibModal, $route, SocketService, CheckerBoardService) {

    if (CheckerBoardService.game.turn == 'me') {
        document.getElementById("Turn").innerHTML = "YOUR TURN";
    }
    else {
        document.getElementById("Turn").innerHTML = "OPPONENT'S TURN";
    }

    SocketService.getSocket().on('opponent forfeit', function(data) {
        var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/views/winModal.html',
                controller: 'WinLoseModalCtrl',
                backdrop  : 'static',
                keyboard  : false
        });
        SocketService.disconnect();
    });

    SocketService.getSocket().on('opponent move', function(data) {
        CheckerBoardService.setVirtualBoard(data);
        updatecfg(data);
        CheckerBoardService.game.turn = 'me';
        document.getElementById("Turn").innerHTML = "YOUR TURN";
    });

    SocketService.getSocket().on('lost', function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/views/loseModal.html',
            controller: 'WinLoseModalCtrl',
            backdrop  : 'static',
            keyboard  : false
        });
    });

    var onDragStart = function(source, piece, orientation) {
        if (CheckerBoardService.game.turn == 'me') {
            if(CheckerBoardService.game.color == 'black') {
                if (piece.search(/^bP/) === -1 && piece.search(/^bK/) === -1) {
                    return false;
                }
                if(CheckerBoardService.checkForJumps(piece, source)){
                    return false;
                }
            }
            else if (CheckerBoardService.game.color == 'white') {
                if (piece.search(/^wP/) === -1 && piece.search(/^wK/) === -1) {
                    return false;
                }
                if(CheckerBoardService.checkForJumps(piece, source)){
                    return false;
                }
            }
        }
        else {
            return false;
        }
        
    };

    var onDrop = function(source, target, piece, newPos, oldPos, orientation){
        if(!CheckerBoardService.forceJump(source, target)){
            return 'snapback';
        }
        if(!CheckerBoardService.validMove(piece, source, target)){
            return 'snapback';
        }
        
       updateLocalCfg();
       if(CheckerBoardService.getJumpOccurred() && CheckerBoardService.checkDoubleJump(piece, target)){
            return;
       }
       SocketService.updateBoard(CheckerBoardService.getVirtualBoard(), CheckerBoardService.game.opponent);
       var result = CheckerBoardService.checkWinLose(piece);
       if (result == 'none') {
            CheckerBoardService.game.turn = 'opponent';
            document.getElementById("Turn").innerHTML = "OPPONENT'S TURN";
       }
       else {
            SocketService.win(CheckerBoardService.game.me, CheckerBoardService.game.opponent);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/views/winModal.html',
                controller: 'WinLoseModalCtrl',
                backdrop  : 'static',
                keyboard  : false
            });
       }
    };

    // initialize board

    var cfg = {
        draggable: true,
        pieceTheme: '/images/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        orientation: $route.current.$$route.orientation,
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
           // d8: 'bP',
            f8: 'bP',
            h8: 'bP',
            a7: 'bP',
            c7: 'bP',
            e7: 'bP',
            g7: 'bP',
            b6: 'bP',
            d6: 'bP',
            f6: 'bP',
            h6: 'bP'

        }
    };

    function updateLocalCfg(){
        var virtualBoard = CheckerBoardService.getVirtualBoard();
        updatecfg(virtualBoard);
    }
    function updatecfg(virtualBoard){
        //clear out the current position object
        var oldCfgPos = cfg.position;
        cfg.position = {};
        //repopulated the position object with the values found in the 2d array
        
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
