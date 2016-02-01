'use strict';
app.controller('CSCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {

  $scope.master = {};
  $scope.master['submitter'] = Auth.getCurrentUser().name;
  $scope.master['resolutionDepartment'] = 'Customer Service';

  // console.log(Auth.getCurrentUser());
  // console.log(Auth.getCurrentUser().role);

  $scope.update = function(customer) {
      $scope.master = angular.copy(customer);
      $http.post('http://localhost:9000/api/WCS/', $scope.master
       ).success(function() {
        alert("Success!")
       }).error(function() {
         alert("Error");
      });
   };
  $scope.reset = function() {
   $scope.user = angular.copy($scope.master);
  };
  $scope.reset();
}]);
