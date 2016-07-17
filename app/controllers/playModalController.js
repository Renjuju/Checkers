angular.module('checkers').controller('PlayModalCtrl', function ($scope, $uibModalInstance, items, $log) {

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
    $log.info('test')
  }
});