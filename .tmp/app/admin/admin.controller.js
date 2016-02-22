'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var AdminController = (function () {
    function AdminController(User, Auth) {
      _classCallCheck(this, AdminController);

      this.users = User.query();
      this.Auth = Auth;
    }

    _createClass(AdminController, [{
      key: 'delete',
      value: function _delete(user) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
      }
    }, {
      key: 'update',
      value: function update(User) {
        User.$update();
        console.log(User);
      }
    }]);

    return AdminController;
  })();

  angular.module('wcsdesktopApp.admin').controller('AdminController', AdminController);
})();
//# sourceMappingURL=admin.controller.js.map
