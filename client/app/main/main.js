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
        url: '/master',
        templateUrl: 'app/main/grid.html',
        controller: 'GridCtrl',
        controllerAs: 'grid',
        authenticate: 'admin' || 'user'
      })
      .state('detail', {
        url: '/detailedView',
        templateUrl: 'app/main/detailedView.html',
        controller:'detailedCtrl',
        controllerAs: 'detailed view',
        authenticate: 'admin' || 'user'
      })
      .state('customerService', {
        url: '/CS',
        templateUrl: 'app/main/customerService.html',
        controller: 'CSCtrl',
        controllerAs: 'CSCtrl',
        authenticate: 'admin' || 'user'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'app/main/404.html'
      })
      .state('logoutPage', {
        url: '/logout',
        templateUrl: 'app/main/logout.html',
      });
  });
