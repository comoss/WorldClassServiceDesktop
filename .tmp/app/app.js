'use strict';

var app = angular.module('wcsdesktopApp', ['wcsdesktopApp.auth', 'wcsdesktopApp.admin', 'wcsdesktopApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping', 'ngMessages']).config(function ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/main');

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
