'use strict';

var Checkers = angular.module('checkers', []);

Checkers.controller('CheckersController', ['$scope', '$log', function($scope, $log) {
    var vm = this;
    console.log('test');
    $scope.play = 0; 
    $scope.click = function() {
        $scope.play++;
    }
}]);
