'use strict';

angular.module('wcsdesktopApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    controller: function controller($scope) {
      $scope.date = new Date();
    },
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map
