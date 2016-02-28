'use strict';
app.controller('detailedCtrl', ['$scope', '$http', 'Auth', 'updateService', '$window', 'User', '$stateParams', function ($scope, $http, Auth, updateService, $window, User, $stateParams, data) {

  $scope.details = {};

  $scope.users = User.query();

  // Pull function
  $scope.getVOC = function () {
    $http.get('/api/WCS/' + $stateParams.id).success(function (data) {
      $scope.details = data;
    });
  };

  // Put function
  $scope.updateVOC = function () {
    updateService.update({ id: $id }, data);
  };

  // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function () {
    if (Auth.getCurrentUser().role === 'admin') {
      if ($window.confirm('Really Delete?')) {
        $http['delete']('/api/WCS/' + $scope.theId);
      }
    }
  };

  $scope.editItem = function (details) {
    details.editing = true;
  };

  $scope.doneEditing = function (details) {
    details.editing = false;
    //doing some background ajax calling for persistence...
  };
}]);
//# sourceMappingURL=detailedViewCTRL.js.map
