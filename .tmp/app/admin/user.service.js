'use strict';

(function () {

  function User($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('wcsdesktopApp.auth').factory('User', User);
})();
//# sourceMappingURL=user.service.js.map
