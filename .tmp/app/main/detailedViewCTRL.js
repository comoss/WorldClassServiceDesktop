'use strict';
app.controller('detailedCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

  $scope.theId = '';

  $scope.getVOC = function () {
    $scope.detailedData = [];
    // This needs fixing, I need to attach one item to the scope and display the data.
    $http.get('http://localhost:9000/api/WCS/' + $scope.theId).success(function (data) {
      console.log(data);

      console.log($scope.detailedData);
    });
  };

  // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function () {
    console.log(Auth.getCurrentUser().role);
    if (Auth.getCurrentUser().role === 'admin') {
      // not working...
      $http['delete']('http://localhost:9000/api/WCS/' + $scope.theId);
      console.log('아싸!!');
    } else {
      console.log('ㅋㅋㅋㅋㅋㅋ');
    }
  };
}]);
//# sourceMappingURL=detailedViewCTRL.js.map
