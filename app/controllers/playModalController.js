angular.module('checkers').controller('PlayModalCtrl', function ($scope, user, $uibModalInstance, $log, $location, SocketService, CheckerBoardService) {
    'use strict';
    $scope.users = [];

    SocketService.getSocket().on('new message', function (data) {
        $scope.users = data;
        $scope.$apply();
    });

    SocketService.getSocket().on('new game request', function (requester) {
        var r = confirm(requester + ' has requested to play a game with you!');
        if (r == true) {
            SocketService.accept(requester);
            $scope.close();
            CheckerBoardService.game = {
                me: user,
                opponent: requester,
                color: 'white',
                turn: 'opponent'
            };
            $location.path("/play/white");
        } else {
            SocketService.reject(requester);
        }
    });

    SocketService.getSocket().on('game request response', function (responder, answer) {
        if (answer == 'accepted') {
            $scope.close();
            CheckerBoardService.game = {
                me: user,
                opponent: responder,
                color: 'black',
                turn: 'me'
            };
            $location.path("/play/black");
        }
        else {
            alert(responder + ' has rejected your request to play a game.');
        }
    });

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        SocketService.disconnect();
    };

    $scope.play = function (index) {
        SocketService.sendRequest($scope.users[index]);
    };

    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
});