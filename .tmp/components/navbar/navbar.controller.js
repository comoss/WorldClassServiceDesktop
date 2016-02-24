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

angular.module('wcsdesktopApp').controller('NavbarController', NavbarController);

//start-non-standard
//# sourceMappingURL=navbar.controller.js.map
