'use strict';
app.controller('CSCtrl', ['$scope', '$http', 'Auth', function ($scope, $http, Auth) {

    $scope.master = {};

    // Need to submit files, fix issues with schema, such as upload image/file
    // Reset form!
    $scope.update = function (customer) {
        $scope.master = angular.copy(customer);
        $scope.master.submitter = Auth.getCurrentUser().name;
        $scope.master.submitterEmail = Auth.getCurrentUser().email;
        $scope.master.submitterPhone = Auth.getCurrentUser().phone;
        $scope.master.resolutionDepartment = 'Customer Service';
        $scope.master.date = new Date();
        $scope.master.resolutionStatus = 'unresolved';
        $scope.master.assignedAgent = 'unassigned';
        //  this is not working.
        // $scope.master.file = 'data:image/jpeg;base64;'+ customer.file;
        $http.post('http://localhost:9000/api/WCS/', $scope.master).success(function () {
            alert('Success!');
        }).error(function () {
            alert('Error');
        });
    };
}]);
//# sourceMappingURL=CSCtrl.js.map
