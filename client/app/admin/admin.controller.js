'use strict';

(function () {

class AdminController {
  constructor(User, Auth) {
    // Use the User $resource to fetch all users
    this.users = User.query();

    this.Auth = Auth;

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

// not working
  update(user, User, $scope, $role) {
    $role = updated.role;

    user.$update({ role:$role }, user);

    console.log(this.users);
  }
}

angular.module('wcsdesktopApp.admin')
  .controller('AdminController', AdminController);
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
