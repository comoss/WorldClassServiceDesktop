'use strict';

app.controller('detailedCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

  $scope.theId = '';

  $scope.getVOC = function () {
    $scope.detailedData = [];

    // This needs fixing, I need to attach one item to the scope and display the data.
    $http.get('http://localhost:9000/api/WCS/' + $scope.theId).success(function (data) {
      data.forEach(function (item) {
        $scope.detailedData.push(data);
      });

      console.log($scope.detailedData);
    });
  };
}]);
//# sourceMappingURL=detailedViewCTRL.js.map
