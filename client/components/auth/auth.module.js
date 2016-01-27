'use strict';

angular.module('wcsdesktopApp.auth', [
  'wcsdesktopApp.constants',
  'wcsdesktopApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
