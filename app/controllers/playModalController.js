angular.module('checkers').controller('PlayModalCtrl', function ($scope, $uibModalInstance, items, $log, $location) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.play = function() {
    $location.path("/play")
    $uibModalInstance.dismiss();
  }
});