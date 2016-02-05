'use strict';
app.controller('detailedCtrl',  ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

  $scope.theId = '';

  $scope.getVOC = function () {
    $scope.detailedData = [];
    // Pull working
    if ($scope.theId.length === 24) {
      $http.get('http://localhost:9000/api/WCS/' + $scope.theId)
        .success(function(data) {
          console.log(data);
          console.log($scope.detailedData);
        });
    }
  };

    // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function() {
    if (Auth.getCurrentUser().role === 'admin' && $scope.theId.length === 24) {
      $http.delete('http://localhost:9000/api/WCS/' + $scope.theId);
    }
  };

}]);
