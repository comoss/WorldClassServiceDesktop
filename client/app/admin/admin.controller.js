'use strict';

(function () {

class AdminController {
  constructor(User, Auth) {
    this.users = User.query();
    this.Auth = Auth;
  }

  delete(user) {
  var r = confirm('Are you sure you want to delete this user?');
   if (r == true) {
     user.$remove();
     this.users.splice(this.users.indexOf(user), 1);
   } else {
    alert('Phew, that was a close one, disaster adverted')
   }
  }

  update(User) {
  var r = confirm('Are you sure you want to update this user?');
    if (r == true) {
      User.$update();
    } else {
    alert('Changes not saved');  
    }
  }
}

angular.module('wcsdesktopApp.admin').controller('AdminController', AdminController);
})();
