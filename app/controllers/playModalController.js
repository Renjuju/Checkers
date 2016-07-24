angular.module('checkers').controller('PlayModalCtrl', function ($scope, $uibModalInstance, $log, $location, SocketService) {
    $scope.user = 'someone';
    $scope.users = [];
    $scope.users.push('Renju');
    // $scope.users.push('Renjuiew');
    SocketService.connect($scope.user);


    $scope.selected = {
        item: $scope.users[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        SocketService.disconnect();
    };

    $scope.play = function () {
        $location.path("/play")
        $uibModalInstance.dismiss();
    }
});