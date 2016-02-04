'use strict';

app.controller('GridCtrl', ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants', 'Auth', function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants, Auth) {

  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  $scope.gridOptions.enableColumnResizing = true;
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.showColumnFooter = true;
  $scope.gridOptions.fastWatch = true;

  $scope.gridOptions.columnDefs = [{ name: '_id', width: 200 }, { name: 'date', cellFilter: 'date', width: 150, type: 'date', enableFiltering: true, enableCellEdit: false }, { name: 'name', width: 150 }, { name: 'email', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a></div>' }, { name: 'phone', width: 150, enableCellEdit: true }, { name: 'product', width: 150, enableCellEdit: true }, { name: 'issue', width: 300, enableCellEdit: true }, { name: 'manufactureDate', width: 300, enableCellEdit: true }, { name: 'resolutionDepartment', width: 300, enableCellEdit: true }, { name: 'notes', width: 300, enableCellEdit: true },
  //  working on getting the name to link to the submitters email...
  { name: 'submitter', width: 300, enableCellEdit: true }, { name: 'resolutionStatus', width: 200, type: 'boolean' }, { name: 'file', width: 150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><img src="{{COL_FIELD}}"></div>' }, { name: 'Delete', width: 150, enableCellEdit: false, cellTemplate: '<div ng-click="deleteData()" class="ui-grid-cell-contents btn">Delete</div>' }];

  // field:'isActive',

  $scope.refreshData = function () {
    $scope.myData = [];

    $http.get('http://localhost:9000/api/WCS/').success(function (data) {
      data.forEach(function (row) {
        $scope.myData.push(row);
      });
    });
  };
}]);
//# sourceMappingURL=grid.controller.js.map
