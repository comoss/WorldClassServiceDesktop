'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var AdminController = (function () {
    function AdminController(User, Auth) {
      _classCallCheck(this, AdminController);

      // Use the User $resource to fetch all users
      this.users = User.query();

      this.Auth = Auth;
    }

    _createClass(AdminController, [{
      key: 'delete',
      value: function _delete(user) {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
      }

      // not working
    }, {
      key: 'update',
      value: function update(user, User, userUpdateService) {

        var $id = user._id;

        console.log(user._id);

        User.update({ id: $id }, user);

        // user.update({ id:$id }, user);

        // this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
      }
    }]);

    return AdminController;
  })();

  angular.module('wcsdesktopApp.admin').controller('AdminController', AdminController);
})();

// example from angular docs
// app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
//    function($scope, $routeParams, Notes) {
// // First get a note object from the factory
// var note = Notes.get({ id:$routeParams.id });
// $id = note.id;
//
// // Now call update passing in the ID first then the object you are updating
// Notes.update({ id:$id }, note);
//
// // This will PUT /notes/ID with the note object in the request payload
//# sourceMappingURL=admin.controller.js.map
