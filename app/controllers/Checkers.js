'use strict';

var Checkers = angular.module('checkers', ['ui.bootstrap', 'ngRoute']).config(function ($routeProvider) {
    $routeProvider.when("/", {templateUrl: "/views/Landing.html",}).when("/play", {
        templateUrl: "/views/Game.html",
        controller: 'CheckerBoardCtrl'
    });
});

Checkers.controller('CheckersController', ['$scope', '$log', '$uibModal', 'SocketService', function ($scope, $log, $uibModal, SocketService) {
    var vm = this;

    $scope.animationsEnabled = true;
    $scope.isCollapsed = false;

    // play modal start
    $scope.open = function (name) {
        if (!name) {
            return;
        }

        SocketService.connect(name);

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/views/playModal.html',
            controller: 'PlayModalCtrl',
            resolve: {
                user: function () {
                    return name;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
}]);
