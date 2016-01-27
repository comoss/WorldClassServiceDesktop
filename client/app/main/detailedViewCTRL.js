app.controller('detailedCtrl',  ['$scope', '$http',
 function ($scope, $http) {

$scope.getVOC = function () {
    $http.get('http://localhost:9000/api/WCS')
      .success(function(data) {
        console.log(data);
        });
      };
    });


// newWCS._id
