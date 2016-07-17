angular.module('checkers').controller('ForfeitModalCtrl', function ($scope, $uibModalInstance, $log, $location) {

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.goHome = function() {
    $location.path("")
    $uibModalInstance.dismiss();
  }
});