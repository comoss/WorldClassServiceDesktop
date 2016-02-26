'use strict';

angular.module('wcsdesktopApp')
  .directive('footer', function () {
    return {
      templateUrl: 'components/footer/footer.html',
      controller: function($scope) {
        $scope.date = new Date();
      },
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
      }
    };
  });
