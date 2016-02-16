'use strict';

angular.module('wcsdesktopApp')
.factory('updateService', ['$resource', function ($resource) {
  return $resource('/api/WCS/:id', null,
  {
      update: { method: 'PUT', isArray: false,
      headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  }
    });
}]);
