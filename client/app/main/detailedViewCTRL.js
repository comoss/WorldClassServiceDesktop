'use strict';
app.controller('detailedCtrl',  ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

// Search
  $scope.theId = '';

// Pull function
  $scope.getVOC = function () {
    if ($scope.theId.length === 24) {
      $http.get('http://localhost:9000/api/WCS/' + $scope.theId)
        .success(function(data) {
          $scope.details = data;
          console.log($scope.details);
          console.log('name ' + $scope.details.name);
        });
    } else {
      alert('Please use an existing ID.');
    }
  };

    // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function () {
    if (Auth.getCurrentUser().role === 'admin' && $scope.theId.length === 24) {
      $http.delete('http://localhost:9000/api/WCS/' + $scope.theId);
    }
  };

}]);
