'use strict';

var Checkers = angular.module('checkers', ['ui.bootstrap', 'ngRoute']).
config(function($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "/views/Landing.html", }).
    when("/play", {
        templateUrl: "/views/Game.html",
        controller: 'CheckerBoardCtrl'
    });
});

Checkers.controller('CheckersController', ['$scope', '$log', '$uibModal', function($scope, $log, $uibModal) {
    var vm = this;

    $scope.animationsEnabled = true;
    $scope.isCollapsed = false;

    // play modal start
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/views/playModal.html',
            controller: 'PlayModalCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };


}]);
