'use strict';

angular.module('wcsdesktopApp.admin').config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
});
//# sourceMappingURL=admin.router.js.map
