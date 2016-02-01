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
        controllerAs: 'grid'
      })
      .state('detail', {
        url: '/detailedView',
        templateUrl: 'app/main/detailedView.html',
        controller:'detailedCtrl',
        controllerAs: 'detailed view'
      })
      .state('customerService', {
        url: '/CS',
        templateUrl: 'app/main/customerService.html',
        controller: 'CSCtrl',
        controllerAs: 'CSCtrl'
      });
  });
