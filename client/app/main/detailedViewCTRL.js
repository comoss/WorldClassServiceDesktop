'use strict';
app.controller('detailedCtrl',  ['$scope', '$http', 'Auth', 'updateService', '$window', 'User', function ($scope, $http, Auth, updateService, $window, User, data) {

// Search
  $scope.theId = '';

  $scope.details = {};

  $scope.users = User.query();

// Pull function
  $scope.getVOC = function () {
    if ($scope.theId.length === 24) {
      $http.get('/api/WCS/' + $scope.theId)
        .success(function(data) {
          $scope.details = data;
        });
    } else {
      alert('Please use an existing ID.');
    }
  };

  // Put function
  $scope.updateVOC = function () {
     var $id = $scope.theId;
     var data = $scope.details;
     updateService.update({ id:$id }, data);
  };

    // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function () {
    if (Auth.getCurrentUser().role === 'admin' && $scope.theId.length === 24) {
      if($window.confirm('Really Delete?')) {
          $http.delete('http://localhost:9000/api/WCS/' + $scope.theId);
      }
    }
};

  $scope.editItem = function (details) {
        details.editing = true;
    };

  $scope.doneEditing = function (details) {
      details.editing = false;
      //dong some background ajax calling for persistence...
  };

}]);
