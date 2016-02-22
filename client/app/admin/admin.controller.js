'use strict';

(function () {

class AdminController {
  constructor(User, Auth) {
    this.users = User.query();
    this.Auth = Auth;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  update(User) {
    User.$update();
    console.log(User);
  }
}

angular.module('wcsdesktopApp.admin').controller('AdminController', AdminController);
})();
