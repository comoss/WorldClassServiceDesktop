'use strict';

angular.module('wcsdesktopApp')
.factory('userUpdateService', ['$resource', function ($resource) {
  return $resource('/api/users/:id', null,
  {
      update: { method: 'PUT', isArray: false,
      headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  }
    });
}]);
