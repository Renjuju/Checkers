angular.module('checkers').controller('ForfeitModalCtrl', function ($scope, $uibModalInstance, $log, $location, SocketService) {

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.goHome = function () {
        SocketService.disconnect();
        $location.path('/');
        $uibModalInstance.dismiss();

    }

});