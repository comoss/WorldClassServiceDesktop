'use strict';

(function () {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    console.log(User.query());
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  update(user) {
    // when I press the update button, it shows in the console that the changes happened. I, however, have no idea how to save the

    user.$update({ role:user.role}, user);
    console.log(user);
    // console.log(this.users);
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
