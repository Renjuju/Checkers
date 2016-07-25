angular.module('checkers').controller('PlayModalCtrl', function ($scope, user, $uibModalInstance, $log, $location, SocketService) {
    SocketService.connect(user);

    $scope.users = SocketService.getUsers();

    $scope.$watch(function () { return SocketService.getUsers()}, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            $scope.users = SocketService.getUsers();
        }
    }, true);

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        SocketService.disconnect();
    };

    $scope.play = function () {
        selected = $('input[name=radio]:checked').val();
        $scope.selected = { item: selected };
        SocketService.sendRequest($scope.selected.item);
        //$location.path("/play");
        //$uibModalInstance.dismiss();
    };

    $scope.close = function () {
        $uibModalInstance.dismiss();
    };
});