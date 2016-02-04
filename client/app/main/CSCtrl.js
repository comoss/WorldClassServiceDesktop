'use strict';
app.controller('CSCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

    $scope.master = {};

  // console.log(Auth.getCurrentUser());
  // console.log(Auth.getCurrentUser().role);


// Need to submit files, fix issues with schema, such as upload image/file
// Reset form!

  $scope.update = function(customer) {
      $scope.master = angular.copy(customer);
      $scope.master.submitter = Auth.getCurrentUser().name;
      $scope.master.resolutionDepartment = 'Customer Service';
      $http.post('http://localhost:9000/api/WCS/', $scope.master
       ).success(function() {
        alert('Success!');
       }).error(function() {
         alert('Error');
      });
   };

}]);
