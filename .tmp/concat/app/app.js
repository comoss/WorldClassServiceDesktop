'use strict';

var app = angular.module('wcsdesktopApp', ['wcsdesktopApp.auth', 'wcsdesktopApp.admin', 'wcsdesktopApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping', 'ngMessages', 'ui.grid.pagination']).config(["$urlRouterProvider", "$locationProvider", function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');

  $locationProvider.html5Mode(true);
}]);
//# sourceMappingURL=app.js.map

'use strict';

angular.module('wcsdesktopApp.admin', ['wcsdesktopApp.auth', 'ui.router']);
//# sourceMappingURL=admin.module.js.map

'use strict';

angular.module('wcsdesktopApp.auth', ['wcsdesktopApp.constants', 'wcsdesktopApp.util', 'ngCookies', 'ui.router']).config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);
//# sourceMappingURL=auth.module.js.map

'use strict';

angular.module('wcsdesktopApp.util', []);
//# sourceMappingURL=util.module.js.map

'use strict';

angular.module('wcsdesktopApp').factory('updateService', ['$resource', function ($resource) {
  return $resource('/api/WCS/:id', null, {
    update: { method: 'PUT', isArray: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  });
}]);
//# sourceMappingURL=updateService.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var AdminController = (function () {
    AdminController.$inject = ["User", "Auth"];
    function AdminController(User, Auth) {
      _classCallCheck(this, AdminController);

      this.users = User.query();
      this.Auth = Auth;
    }

    _createClass(AdminController, [{
      key: 'delete',
      value: function _delete(user) {
        var r = confirm('Are you sure you want to delete this user?');
        if (r === true) {
          user.$remove();
          this.users.splice(this.users.indexOf(user), 1);
        } else {
          alert('Phew, that was a close one, disaster adverted');
        }
      }
    }, {
      key: 'update',
      value: function update(User) {
        var r = confirm('Are you sure you want to update this user?');
        if (r === true) {
          User.$update();
        } else {
          alert('Changes not saved');
        }
      }
    }]);

    return AdminController;
  })();

  angular.module('wcsdesktopApp.admin').controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map

'use strict';

angular.module('wcsdesktopApp').config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  }).state('logout', {
    url: '/logout?referrer',
    referrer: 'main',
    template: '',
    controller: ["$state", "Auth", function controller($state, Auth) {
      var referrer = $state.params.referrer || $state.current.referrer || 'main';
      Auth.logout();
      $state.go('logoutPage');
    }]
  }).state('signup', {
    url: '/signup',
    templateUrl: 'app/account/signup/signup.html',
    controller: 'SignupController',
    controllerAs: 'vm'
  }).state('settings', {
    url: '/settings',
    templateUrl: 'app/account/settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm',
    authenticate: true
  });
}]).run(["$rootScope", function ($rootScope) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
    if (next.name === 'logout' && current && current.name && !current.authenticate) {
      next.referrer = current.name;
    }
  });
}]);
//# sourceMappingURL=account.js.map

'use strict';

angular.module('wcsdesktopApp.admin').config(["$stateProvider", function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.html',
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}]);
//# sourceMappingURL=admin.router.js.map

'use strict';

(function (angular, undefined) {
  'use strict';

  angular.module('wcsdesktopApp.constants', []).constant('appConfig', { userRoles: ['user', 'employee', 'admin'] });
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';
app.controller('CSCtrl', ['$scope', '$http', 'Auth', 'User', function ($scope, $http, Auth, User) {

    $scope.master = {};

    // Need to submit files, fix issues with schema, such as upload image/file
    // Reset form!
    $scope.update = function (customer) {

        $scope.master = angular.copy(customer);
        $scope.master.submitter = Auth.getCurrentUser().name;
        $scope.master.submitterEmail = Auth.getCurrentUser().email;
        $scope.master.resolutionDepartment = 'Customer Service';
        $scope.master.date = new Date();
        $scope.master.resolutionStatus = 'unresolved';
        $scope.master.assignedAgent = 'unassigned';
        console.log($scope.customer.file);
        $http.post('/api/WCS/', $scope.master).success(function () {
            alert('Success!');
        }).error(function () {
            alert('Error');
        });
    };
}]);
//# sourceMappingURL=CSCtrl.js.map

'use strict';
app.controller('detailedCtrl', ['$scope', '$http', 'Auth', 'updateService', '$window', 'User', '$stateParams', '$state', function ($scope, $http, Auth, updateService, $window, User, $stateParams, $state, data) {

  $scope.details = {};

  $scope.users = User.query();

  // Pull function
  $scope.getVOC = function () {
    $http.get('/api/WCS/' + $stateParams.id).success(function (data) {
      $scope.details = data;
    });
  };

  // Put function
  $scope.updateVOC = function () {
    var $id = $stateParams.id;
    var data = $scope.details;
    updateService.update({ id: $id }, data);
    alert('updated!  \\ (•◡•) /');
  };

  // Delete an array, permission granted when user role is admin.
  $scope.deleteData = function () {
    if (Auth.getCurrentUser().role === 'admin') {
      if ($window.confirm('Really Delete?')) {
        $http['delete']('/api/WCS/' + $stateParams.id);
        $state.go('grid');
      }
    }
  };

  $scope.editItem = function (details) {
    details.editing = true;
  };

  $scope.doneEditing = function (details) {
    details.editing = false;
    //doing some background ajax calling for persistence...
  };
}]);
//# sourceMappingURL=detailedViewCTRL.js.map

'use strict';
app.controller('GridCtrl', ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants', 'Auth', '$state', '$stateParams', '$rootScope', function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants, Auth, $state, $stateParams, $rootScope) {

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  $scope.gridOptions.enableColumnResizing = true;
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.showColumnFooter = true;
  $scope.gridOptions.fastWatch = true;
  $scope.gridOptions.paginationPageSizes = [20, 30, 40];
  $scope.gridOptions.paginationPageSize = 20;
  $scope.gridOptions.enableCellSelection = true;

  $scope.gridOptions.columnDefs = [{
    name: 'date',
    cellFilter: 'date',
    width: 110, type: 'date',
    enableFiltering: true,
    enableCellEdit: false
  }, {
    name: 'name',
    width: 150,
    enableCellEdit: false,
    cellTemplate: '<div ui-sref="detail({ id: row.entity._id })" class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
  }, {
    name: 'email',
    width: 200,
    enableCellEdit: false,
    cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a></div>'
  }, {
    name: 'phone',
    width: 120,
    enableCellEdit: false
  }, {
    name: 'orderNumber',
    width: 100,
    enableCellEdit: false
  }, {
    name: 'product',
    width: 120,
    enableCellEdit: false
  }, {
    name: 'company',
    width: 200,
    enableCellEdit: false
  }, {
    name: 'issue',
    width: 120,
    enableCellEdit: false
  }, {
    name: 'manufactureDate',
    width: 100,
    enableCellEdit: false
  }, {
    name: 'partNumber',
    width: 100,
    enableCellEdit: false
  }, {
    name: 'resolutionDepartment',
    width: 200,
    enableCellEdit: false
  }, {
    name: 'notes',
    width: 300,
    enableCellEdit: false
  }, {
    name: 'submitter',
    width: 125,
    cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{row.entity.submitterEmail}}">{{COL_FIELD}}</a></div>'
  }, {
    name: 'resolutionStatus',
    width: 120, type: 'boolean',
    enableCellEdit: false
  }, {
    name: 'assignedAgent',
    width: 120,
    type: 'boolean',
    enableCellEdit: false }];

  $scope.refreshData = function () {
    $scope.myData = [];
    $http.get('/api/WCS/').success(function (data) {
      data.forEach(function (row) {
        $scope.myData.push(row);
      });
    });
  };
}]);
//# sourceMappingURL=grid.controller.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var MainController = (function () {
    MainController.$inject = ["$http"];
    function MainController($http) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.awesomeThings = [];

      // $http.get('/api/things').then(response => {
      //   this.awesomeThings = response.data;
      // });
    }

    _createClass(MainController, [{
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', { name: this.newThing });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http['delete']('/api/things/' + thing._id);
      }
    }]);

    return MainController;
  })();

  angular.module('wcsdesktopApp').controller('MainController', MainController);
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('wcsdesktopApp').config(["$stateProvider", function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  }).state('grid', {
    url: '/main-view',
    templateUrl: 'app/main/grid.html',
    controller: 'GridCtrl',
    controllerAs: 'grid',
    authenticate: 'employee'
  }).state('detail', {
    url: '/detailed-view/{id}',
    templateUrl: 'app/main/detailedView.html',
    controller: 'detailedCtrl',
    controllerAs: 'detailed view',
    authenticate: 'employee'
  }).state('customerService', {
    url: '/customer-service',
    templateUrl: 'app/main/customerService.html',
    controller: 'CSCtrl',
    controllerAs: 'CSCtrl',
    authenticate: 'employee'
  }).state('404', {
    url: '/404',
    templateUrl: 'app/main/404.html'
  }).state('welcomePage', {
    url: '/welcome',
    templateUrl: 'app/main/welcome.html',
    controller: 'welcome',
    authenticate: 'true'
  }).state('logoutPage', {
    url: '/logout',
    templateUrl: 'app/main/logout.html'
  });
}]);
//# sourceMappingURL=main.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LoginController = (function () {
  LoginController.$inject = ["Auth", "$state"];
  function LoginController(Auth, $state) {
    _classCallCheck(this, LoginController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  _createClass(LoginController, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Logged in, redirect to welcome
          _this.$state.go('welcomePage');
        })['catch'](function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);

  return LoginController;
})();

angular.module('wcsdesktopApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map

'use strict';
app.controller('welcome', ['$scope', '$http', 'Auth', 'User', function ($scope, $http, Auth, User) {
    $scope.master = {};
    $scope.user = Auth.getCurrentUser();
}]);
//# sourceMappingURL=welcome.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SettingsController = (function () {
  SettingsController.$inject = ["Auth"];
  function SettingsController(Auth) {
    _classCallCheck(this, SettingsController);

    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  _createClass(SettingsController, [{
    key: 'changePassword',
    value: function changePassword(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.changePassword(this.user.oldPassword, this.user.newPassword).then(function () {
          _this.message = 'Password successfully changed.';
        })['catch'](function () {
          form.password.$setValidity('mongoose', false);
          _this.errors.other = 'Incorrect password';
          _this.message = '';
        });
      }
    }
  }]);

  return SettingsController;
})();

angular.module('wcsdesktopApp').controller('SettingsController', SettingsController);
//# sourceMappingURL=settings.controller.js.map

'use strict';

(function () {

  AuthService.$inject = ["$location", "$http", "$cookies", "$q", "appConfig", "Util", "User"];
  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.get();
    }

    var Auth = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login: function login(_ref, callback) {
        var email = _ref.email;
        var password = _ref.password;

        return $http.post('/auth/local', {
          email: email,
          password: password
        }).then(function (res) {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        }).then(function (user) {
          safeCb(callback)(null, user);
          return user;
        })['catch'](function (err) {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
      },

      /**
       * Delete access token and user info
       */
      logout: function logout() {
        $cookies.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function createUser(user, callback) {
        return User.save(user, function (data) {
          $cookies.put('token', data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function (err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function () {
          return safeCb(callback)(null);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value).then(function (user) {
          safeCb(callback)(user);
          return user;
        }, function () {
          safeCb(callback)({});
          return {};
        });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var is = user.hasOwnProperty('role');
          safeCb(callback)(is);
          return is;
        });
      },

      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @return {Bool|Promise}
       */
      hasRole: function hasRole(role, callback) {
        var hasRole = function hasRole(r, h) {
          return userRoles.indexOf(r) >= userRoles.indexOf(h);
        };

        if (arguments.length < 2) {
          return hasRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null).then(function (user) {
          var has = user.hasOwnProperty('role') ? hasRole(user.role, role) : false;
          safeCb(callback)(has);
          return has;
        });
      },

      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function isAdmin() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
      },

      /**
       * Check if a user has been promoted to employee
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isUser: function isUser() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['employee'], arguments));
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function getToken() {
        return $cookies.get('token');
      }
    };

    return Auth;
  }

  angular.module('wcsdesktopApp.auth').factory('Auth', AuthService);
})();
//# sourceMappingURL=auth.service.js.map

'use strict';

(function () {

  authInterceptor.$inject = ["$rootScope", "$q", "$cookies", "$injector", "Util"];
  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request: function request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function responseError(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('wcsdesktopApp.auth').factory('authInterceptor', authInterceptor);
})();
//# sourceMappingURL=interceptor.service.js.map

'use strict';

(function () {

  angular.module('wcsdesktopApp.auth').run(["$rootScope", "$state", "Auth", function ($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(function (has) {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(function (is) {
            $state.go(is ? 'main' : 'login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(function (is) {
          if (is) {
            return;
          }

          event.preventDefault();
          $state.go('main');
        });
      }
    });
  }]);
})();
//# sourceMappingURL=router.decorator.js.map

'use strict';

(function () {

  User.$inject = ["$resource"];
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

'use strict';

angular.module('wcsdesktopApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    controller: ["$scope", function controller($scope) {
      $scope.date = new Date();
    }],
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

angular.module('wcsdesktopApp').factory('Modal', ["$rootScope", "$modal", function ($rootScope, $modal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $modal.open() returns
   */
  function openModal() {
    var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var modalClass = arguments.length <= 1 || arguments[1] === undefined ? 'modal-default' : arguments[1];

    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $modal.open({
      templateUrl: 'components/modal/modal.html',
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      'delete': function _delete() {
        var del = arguments.length <= 0 || arguments[0] === undefined ? angular.noop : arguments[0];

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function (event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
}]);
//# sourceMappingURL=modal.service.js.map

'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('wcsdesktopApp').directive('mongooseError', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      element.on('keydown', function () {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  };
});
//# sourceMappingURL=mongoose-error.directive.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NavbarController =
//end-non-standard

function NavbarController(Auth) {
  _classCallCheck(this, NavbarController);

  this.menu = [{
    'title': 'Home'
  }];
  this.isCollapsed = true;

  this.isLoggedIn = Auth.isLoggedIn;
  this.isAdmin = Auth.isAdmin;
  this.getCurrentUser = Auth.getCurrentUser;
  this.isUser = Auth.isUser;
};
NavbarController.$inject = ["Auth"];

angular.module('wcsdesktopApp').controller('NavbarController', NavbarController);

//start-non-standard
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('wcsdesktopApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});
//# sourceMappingURL=navbar.directive.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SignupController = (function () {
  //end-non-standard

  SignupController.$inject = ["Auth", "$state"];
  function SignupController(Auth, $state) {
    _classCallCheck(this, SignupController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          department: this.user.department,
          password: this.user.password
        }).then(function () {
          // Account created, redirect to home
          _this.$state.go('welcomePage');
        })['catch'](function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }]);

  return SignupController;
})();

angular.module('wcsdesktopApp').controller('SignupController', SignupController);

//start-non-standard
//# sourceMappingURL=signup.controller.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  UtilService.$inject = ["$window"];
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },

      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },

      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          return url.hostname === o.hostname && url.port === o.port && url.protocol === o.protocol;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('wcsdesktopApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map

angular.module('wcsdesktopApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/login/login.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><form class=form name=form ng-submit=vm.login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && vm.submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && vm.submitted\">Please enter a valid email.</p><p class=help-block>{{ vm.errors.other }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Login</button> <a class=\"btn btn-default btn-lg btn-register\" ui-sref=signup>Register</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=vm.user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=vm.user.newPassword ng-minlength=7 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)\">Password must be at least 7 characters.</p></div><div class=form-group><label>Confirm New Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.newPassword ng-minlength=7 required><p class=help-block ng-show=\"form.confirmPassword.$error.match && vm.submitted\">Passwords must match.</p></div><p class=help-block>{{ vm.message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && vm.submitted, 'has-error': form.name.$invalid && vm.submitted }\"><label>First and Last Name</label><input name=name class=form-control ng-model=vm.user.name required><p class=help-block ng-show=\"form.name.$error.required && vm.submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && vm.submitted, 'has-error': form.email.$invalid && vm.submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && vm.submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && vm.submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ vm.errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.department.$valid && vm.submitted, 'has-error': form.department.$invalid && vm.submitted }\"><b>Department</b><select class=form-control ng-model=vm.user.department><option>Customer Service</option><option>Dealer Customer Service</option><option>Innovations</option><option>Marketing</option><option>Shipping</option><option>Expereicne Specialists</option><option>Dealer Expereince Specialists</option><option>Quality Assurance</option><option>Mass Merchandising</option><option>Road Show</option><option>Little Giant Safety</option><option>Little Giant Global</option><option>Sales</option></select><p class=help-block ng-show=\"form.department.$error.required && vm.submitted\">What's your department?</p><p class=help-block ng-show=form.department.$error.mongoose>{{ vm.errors.department }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && vm.submitted, 'has-error': form.password.$invalid && vm.submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password ng-minlength=7 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && vm.submitted\">Password must be at least 7 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.password }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.confirmPassword.$valid && vm.submitted, 'has-error': form.confirmPassword.$invalid && vm.submitted }\"><label>Confirm Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.password ng-minlength=3 required><p class=help-block ng-show=\"form.confirmPassword.$error.match && vm.submitted\">Passwords must match.</p></div><div><button class=\"btn btn-inverse btn-lg btn-register\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-login\" ui-sref=login>Login</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<navbar></navbar><div class=container><div class=search><input class=\"form-control col-sm-3\" placeholder=\"Search Users\" ng-model=search.$></div><br><p>The update and delete users as you need &nbsp (¬‿¬)</p><ul class=\"list-group user-list\"><li class=list-group-item ng-repeat=\"user in admin.users | filter:search:strict | orderBy:'name'\"><div class=user-info><strong>{{user.name}}</strong><br><a href=mailto:{{user.email}}>{{user.email}}</a><br><br><div class=col-sm-4>Role:<select class=\"form-control col-sm-2\" ng-model=user.role><option>admin</option><option>employee</option><option>user</option></select></div><div class=col-sm-4>Department:<select class=form-control ng-model=user.department><option>Customer Service</option><option>Dealer Customer Service</option><option>Innovations</option><option>Marketing</option><option>Shipping</option><option>Expereicne Specialists</option><option>Dealer Expereince Specialists</option><option>QA</option><option>Mass Merchandising</option><option>Road Show</option><option>Little Giant Safety</option><option>Little Giant Global</option><option>Sales</option></select></div></div><div><div class=padding><a ng-click=admin.update(user) class=update><span class=\"fa fa-refresh fa-2x\"></span></a></div><div class=padding><a ng-click=admin.delete(user) class=trash><span class=\"fa fa-trash fa-2x\"></span></a></div></div></li></ul></div><footer></footer>"
  );


  $templateCache.put('app/main/404.html',
    "<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>Page Not Found :(</title><style>::-moz-selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      ::selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      html {\n" +
    "        padding: 30px 10px;\n" +
    "        font-size: 20px;\n" +
    "        line-height: 1.4;\n" +
    "        color: #737373;\n" +
    "        background: #f0f0f0;\n" +
    "        -webkit-text-size-adjust: 100%;\n" +
    "        -ms-text-size-adjust: 100%;\n" +
    "      }\n" +
    "\n" +
    "      html,\n" +
    "      input {\n" +
    "        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n" +
    "      }\n" +
    "\n" +
    "      body {\n" +
    "        max-width: 500px;\n" +
    "        _width: 500px;\n" +
    "        padding: 30px 20px 50px;\n" +
    "        border: 1px solid #b3b3b3;\n" +
    "        border-radius: 4px;\n" +
    "        margin: 0 auto;\n" +
    "        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n" +
    "        background: #fcfcfc;\n" +
    "      }\n" +
    "\n" +
    "      h1 {\n" +
    "        margin: 0 10px;\n" +
    "        font-size: 50px;\n" +
    "        text-align: center;\n" +
    "      }\n" +
    "\n" +
    "      h1 span {\n" +
    "        color: #bbb;\n" +
    "      }\n" +
    "\n" +
    "      h3 {\n" +
    "        margin: 1.5em 0 0.5em;\n" +
    "      }\n" +
    "\n" +
    "      p {\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      ul {\n" +
    "        padding: 0 0 0 40px;\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      .container {\n" +
    "        max-width: 380px;\n" +
    "        _width: 380px;\n" +
    "        margin: 0 auto;\n" +
    "      }\n" +
    "\n" +
    "      /* google search */\n" +
    "\n" +
    "      #goog-fixurl ul {\n" +
    "        list-style: none;\n" +
    "        padding: 0;\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-fixurl form {\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt,\n" +
    "      #goog-wm-sb {\n" +
    "        border: 1px solid #bbb;\n" +
    "        font-size: 16px;\n" +
    "        line-height: normal;\n" +
    "        vertical-align: top;\n" +
    "        color: #444;\n" +
    "        border-radius: 2px;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt {\n" +
    "        width: 220px;\n" +
    "        height: 20px;\n" +
    "        padding: 5px;\n" +
    "        margin: 5px 10px 0 0;\n" +
    "        box-shadow: inset 0 1px 1px #ccc;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb {\n" +
    "        display: inline-block;\n" +
    "        height: 32px;\n" +
    "        padding: 0 10px;\n" +
    "        margin: 5px 0 0;\n" +
    "        white-space: nowrap;\n" +
    "        cursor: pointer;\n" +
    "        background-color: #f5f5f5;\n" +
    "        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        -webkit-appearance: none;\n" +
    "        -moz-appearance: none;\n" +
    "        appearance: none;\n" +
    "        *overflow: visible;\n" +
    "        *display: inline;\n" +
    "        *zoom: 1;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb:hover,\n" +
    "      #goog-wm-sb:focus {\n" +
    "        border-color: #aaa;\n" +
    "        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n" +
    "        background-color: #f8f8f8;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt:hover,\n" +
    "      #goog-wm-qt:focus {\n" +
    "        border-color: #105cb6;\n" +
    "        outline: 0;\n" +
    "        color: #222;\n" +
    "      }\n" +
    "\n" +
    "      input::-moz-focus-inner {\n" +
    "        padding: 0;\n" +
    "        border: 0;\n" +
    "      }</style></head><body><div class=container><h1>Not found<br><br><span>¯\\_(ツ)_/¯</span></h1><br><br><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><p>Please enjoy this image</p><img class=img-responsive src=http://i.imgur.com/atz81.jpg alt=\"Cat Riding Unicorn\"><script>var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;</script><script src=//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js></script></div></body></html>"
  );


  $templateCache.put('app/main/customerService.html',
    "<navbar></navbar><div class=container ng-controller=CSCtrl><br><br><div class=col-sm-2></div><form name=CSForm enctype=multipart/form-data method=post class=\"form-horizontal col-sm-7\" novalidate><div class=form-group ng-class=\"{ 'has-error': CSForm.name.$touched && CSForm.name.$invalid, 'has-success': CSform.name.$touched && CSForm.name.$valid }\" id=nameId><label class=\"col-sm-2 control-label required\" for=nameInput>Name:</label><div class=col-sm-10><input class=form-control name=name ng-model=customer.name id=nameInput placeholder=Name ng-minlength=5 required></div><div ng-messages=CSForm.name.$error ng-if=CSForm.name.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=minlength>Please input both the first and last name.</p><p class=col-sm-10 ng-message=required>Customer name is required.</p></div></div><div class=form-group ng-class=\"{ 'has-error': CSForm.phone.$touched && CSForm.phone.$invalid, 'has-success': CSForm.phone.$touched && CSForm.phone.$valid }\"><label class=\"col-sm-2 control-label required\" for=phoneInput>Phone:</label><div class=col-sm-10><input class=form-control id=phoneInput ng-model=customer.phone type=tel name=phone placeholder=Phone required ng-minlength=11></div><div ng-messages=CSForm.phone.$error ng-if=CSForm.phone.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=minlength>Please format phone number like \"555-555-5555\".</p><p class=col-sm-10 ng-message=required>a phone number is required.</p></div></div><div class=form-group ng-class=\"{ 'has-error': CSForm.email.$touched && CSForm.email.$invalid, 'has-success': CSForm.email.$touched && CSForm.email.$valid }\"><label class=\"col-sm-2 control-label required\" for=emailInput>Email:</label><div class=col-sm-10><input class=\"form-control required\" name=email id=emailInput ng-model=customer.email type=email placeholder=Email required></div><div ng-messages=CSForm.email.$error ng-if=CSForm.email.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=email>Please input a valid email.</p><p class=col-sm-10 ng-message=required>a email is required.</p></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=companyInput>Company (if Applicable)</label><div class=col-sm-10><input class=form-control id=companyInput ng-model=customer.company placeholder=company></div></div><div class=form-group><label class=\"col-sm-2 control-label required\" ng-class=\"{ 'has-error': CSform.product.$touched && CSForm.product.$invalid, 'has-success': CSform.product.$touched && CSForm.product.$valid }\" for=productInput>Product:</label><div class=col-sm-10><select class=\"form-control col-sm-10\" ng-model=customer.product required name=product><option>Accessory</option><option>Aerial Safety Cage</option><option>Aircraft Support</option><option>Airwing</option><option>Airwing FG</option><option>Alta-One</option><option>As Seen on TV</option><option>Assaut Ramp</option><option>Boost</option><option>Classic Combo SXE</option><option>Compact Safety Cage</option><option>Conquest</option><option>Darkhorse</option><option>Flip-N-Lite</option><option>Ledge Lock</option><option>Little Giant LT</option><option>Lunar</option><option>Microburst</option><option>Pro Series</option><option>Quantum</option><option>Revolution</option><option>Safeframe</option><option>Select Step</option><option>Select Step FG</option><option>Skyscraper</option><option>Smartstep</option><option>Sumostance</option><option>Super Duty</option><option>Tactical Ladder</option><option>Titan</option><option>Titan X</option><option>Velocity</option><option>Xtreme</option></select></div><div ng-messages=CSForm.product.$error ng-if=CSForm.product.$touched><p class=col-sm-2></p><p ng-message=$valid>Please pick a product that this is related to.</p><p ng-message=required>Product is required.</p></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=noticeLabelInput>Part Number</label><div class=col-sm-10><input class=form-control id=noticeLabelInput ng-model=customer.noticeLabel placeholder=\"Notice Label\"> <span id=helpBlock class=help-block>The part number is found on the notice label.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=manufactureDateInput>Manufacture Date</label><div class=col-sm-10><input class=form-control ng-model=customer.manufactureDate id=manufactureDateInput placeholder=\"Manufacture Date\"> <span id=helpBlock class=help-block>The manufacturing date stamp typically contains a combination of 5-6 numbers and may contain a letter.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=orderNumberInput>Order Number</label><div class=col-sm-10><input class=form-control ng-model=customer.orderNumber id=orderNumberInput placeholder=\"Order Number\"> <span id=helpBlock class=help-block>The order number.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=issueInput>Issue</label><div class=col-sm-10><select class=form-control ng-model=customer.issue name=issue><option>Customer Expereince</option><option>Warranty</option><option>Kudos</option><option>Voice of the Customer</option></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textAreaInput>Notes</label><div class=col-sm-10><textarea class=form-control ng-model=customer.notes id=textAreaInput type=text placeholder=Notes></textarea><span id=helpBlock class=help-block>Please include any applicable notes about the customers case/situation and what you were able to do to resolve it.</span></div></div><div class=form-group><button type=submit ng-disabled=CSForm.$invalid ng-click=update(customer) class=\"btn btn-block\">Submit</button></div></form></div><footer></footer>"
  );


  $templateCache.put('app/main/detailedView.html',
    "<navbar></navbar><div class=container ng-controller=detailedCtrl><br><div ng-init=getVOC()><table class=\"table table-hover table-bordered\"><h4>Customer Information</h4><tr><td class=col-sm-2>Name:</td><td><input class=input ng-model=details.name ng-blur=doneEditing(details) autofocus></td></tr><tr><td class=col-sm-2>Date:</td><td>{{details.date | date}}</td></tr><tr><td>Email:</td><td><input class=input ng-model=details.email ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Phone:</td><td><input class=input ng-model=details.phone ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Company:</td><td><input class=input ng-model=details.company ng-blur=doneEditing(details) autofocus></td></tr><tr></tr><tr><td>Order Number:</td><td><input class=input ng-model=details.orderNumber ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Assigned Agent:</td><td><select class=\"form-control col-sm-2\" ng-model=details.assignedAgent><option ng-repeat=\"user in users | orderBy:&quot;name&quot;\">{{user.name}}</option></select></td></tr><tr><td>Status:</td><td><select class=\"form-control col-sm-2\" ng-model=details.resolutionStatus><option>resolved</option><option>unresolved</option></select></td></tr></table><table class=\"table table-bordered table-hover\"><h4>Product Information</h4><tr><td class=col-sm-2>Product:</td><td><div><select class=\"form-control col-sm-10\" ng-model=details.product required name=product><option>Accessory</option><option selected>Aerial Safety Cage</option><option>Aircraft Support</option><option>Airwing</option><option>Airwing FG</option><option>Alta-One</option><option>As Seen on TV</option><option>Assaut Ramp</option><option>Boost</option><option>Classic Combo SXE</option><option>Compact Safety Cage</option><option>Conquest</option><option>Darkhorse</option><option>Flip-N-Lite</option><option>Ledge Lock</option><option>Little Giant LT</option><option>Lunar</option><option>Microburst</option><option>Pro Series</option><option>Quantum</option><option>Revolution</option><option>Safeframe</option><option>Select Step</option><option>Select Step FG</option><option>Skyscraper</option><option>Smartstep</option><option>Sumostance</option><option>Super Duty</option><option>Tactical Ladder</option><option>Titan</option><option>Titan X</option><option>Velocity</option><option>Xtreme</option></select></div></td></tr><tr><td>Manufacture Date:</td><td><input class=input ng-model=details.manufactureDate ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Part Number:</td><td><input class=input ng-model=details.partNumber ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Notes</td><td><textarea class=input ng-model=details.notes ng-blur=doneEditing(details) autofocus>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image0}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image1}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "\n" +
    "<table class=\"table table-bordered table-hover\">\n" +
    "<h4>Submitter Information</h4>\n" +
    "  <tr>\n" +
    "    <td class=col-sm-2>\n" +
    "      Submitter:\n" +
    "    </td>\n" +
    "    <td>\n" +
    "    {{details.submitter}}\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Submitter Email:\n" +
    "    </td>\n" +
    "    <td>\n" +
    "    <a href=mailto:{{details.submitterEmail}}>{{details.submitterEmail}}</a>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "  <form>\n" +
    "    <button type=button ng-show=nav.isAdmin() class=btn ng-click=deleteData() name=button>Delete</button>\n" +
    "    <button type=submit class=btn ng-click=updateVOC() name=button>Update</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<footer></footer></div>"
  );


  $templateCache.put('app/main/grid.html',
    "<navbar></navbar><br><br><div ng-controller=GridCtrl ng-init=refreshData()><div id=grid1 ui-grid=gridOptions ui-grid-cellnav ui-grid-edit ui-grid-resize-columns ui-grid-pinning ui-grid-selection ui-grid-move-columns ui-grid-exporter ui-grid-grouping ui-grid-pagination class=grid></div></div><footer></footer>"
  );


  $templateCache.put('app/main/logout.html',
    "<navbar></navbar><div class=container><h1>Logout Complete</h1><p>click login in the top right corner of the screen to login again</p></div><footer></footer>"
  );


  $templateCache.put('app/main/main.html',
    "<navbar></navbar><header class=hero-unit id=banner><div class=container><h1 class=mainHeader>WORLD CLASS SERVICE</h1><br><br><img class=\"img-responsive preventingImg\" src=assets/images/PreventingInjuriesLogo.png alt=\"Preventing Injuries, Saving Lives\"><br><p>by</p><br><img src=assets/images/header-logo.jpg alt=\"We are Little Giant\"></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Download the App!</h1><ul><li><a href=\"\">IOS</a></li><li><a href=\"\">Android</a></li></ul></div></div></div><footer></footer>"
  );


  $templateCache.put('app/main/welcome.html',
    "<navbar></navbar><div class=container id=background><div class=authorization ng-hide=\"user.role == 'user'\"><h4 class=welcomeMessage>{{user.name}}, welcome back!!!</h4><br><br><img class=img-thumbnail src=\"https://media.giphy.com/media/q6QHDGE3X4EWA/giphy.gif\"></div><div class=authorization ng-show=\"user.role == 'user'\"><h4 class=welcomeMessage>Thank you for signing up! The site admin is reviewing your status.</h4><br><br><img src=http://memecreator.org/static/images/memes/3899221.jpg class=img-thumbnail alt=\"Koalafications\"><br><br><h4 class=welcomeMessage>Once your connection with Little Giant Ladders has been verified you may visit other parts of website</h4></div></div><footer></footer>"
  );


  $templateCache.put('components/footer/footer.html',
    "<div class=container><p>Little Giant Ladder Systems © {{ date | date:'yyyy'}} | <a href=\"mailto:cody@ladders.com?Subject=World%20Class%20Service%20Desktop%20Site%20Bug\">bugs? Email me!</a> | <a href=https://www.littlegiantladders.com>Little Giant Ladders</a></p></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click=\"nav.isCollapsed = !nav.isCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><!-- <img href=\"/\" class='navbar-brand' src=\"/assets/images/header-logo.jpg\" alt=\"\" /> --> <img class=navbar-brand src=/assets/images/header-logo.jpg alt=\"\"></div><div collapse=nav.isCollapsed class=\"navbar-collapse collapse\" id=navbar-main><ul class=\"nav navbar-nav\"><li ng-show=\"nav.isAdmin() || nav.isUser()\" ui-sref-active=active><a ui-sref=grid>Main View</a></li><li ng-show=\"nav.isAdmin() || nav.isUser()\" ui-sref-active=active><a ui-sref=customerService>Customer Service</a></li><li ng-show=nav.isAdmin() ui-sref-active=active><a ui-sref=admin>Admin</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=signup>Sign up</a></li><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=login>Login</a></li><li ng-show=nav.isLoggedIn()><p class=navbar-text>Hello {{ nav.getCurrentUser().name }}</p></li><li ng-show=nav.isLoggedIn() ui-sref-active=active><a ui-sref=settings><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=nav.isLoggedIn()><a ui-sref=logout>Logout</a></li></ul></div></div></div>"
  );

}]);

