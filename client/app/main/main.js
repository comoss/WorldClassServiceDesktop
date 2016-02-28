'use strict';

angular.module('wcsdesktopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('grid', {
        url: '/main-view',
        templateUrl: 'app/main/grid.html',
        controller: 'GridCtrl',
        controllerAs: 'grid',
        authenticate: 'employee'
      })
      .state('detail', {
        url: '/detailed-view/{id}',
        templateUrl: 'app/main/detailedView.html',
        controller: 'detailedCtrl',
        controllerAs: 'detailed view',
        authenticate: 'employee',
      })
      .state('customerService', {
        url: '/customer-service',
        templateUrl: 'app/main/customerService.html',
        controller: 'CSCtrl',
        controllerAs: 'CSCtrl',
        authenticate: 'employee'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'app/main/404.html'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/main/welcome.html',
        controller: 'welcome',
        authenticate: 'true'
      })
      .state('logoutPage', {
        url: '/logout',
        templateUrl: 'app/main/logout.html',
      });
  });
