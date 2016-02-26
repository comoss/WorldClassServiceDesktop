'use strict';
app.controller('welcome', ['$scope', '$http', 'Auth', 'User', function ($scope, $http, Auth, User) {
    $scope.master = {};
    $scope.user = Auth.getCurrentUser();
}]);
//# sourceMappingURL=welcome.js.map
