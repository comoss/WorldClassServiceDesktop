'use strict';
app.controller('GridCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants', 'Auth', '$state', '$stateParams', '$rootScope',
 function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants, Auth, $state, $stateParams, $rootScope) {

 $rootScope.$state = $state;
 $rootScope.$stateParams = $stateParams;

  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  $scope.gridOptions.enableColumnResizing = true;
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.showColumnFooter = true;
  $scope.gridOptions.fastWatch = true;
  $scope.gridOptions.paginationPageSizes = [20, 30, 40];
  $scope.gridOptions.paginationPageSize = 20;
  $scope.gridOptions.enableCellSelection = true;

  $scope.gridOptions.columnDefs = [
    {
      name:'date',
      cellFilter:'date',
      width:110, type:'date',
      enableFiltering:true,
      enableCellEdit: false
    },
    {
      name:'name',
      width:150,
      enableCellEdit: false,
      cellTemplate: '<div ui-sref="detail({ id: row.entity._id })" class="ui-grid-cell-contents">{{COL_FIELD}}</div>'
    },
    {
      name:'email',
      width:200,
      enableCellEdit: false,
      cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a></div>'
    },
    {
      name:'phone',
      width:120,
      enableCellEdit: false
    },
    {
      name:'orderNumber',
      width:100,
      enableCellEdit: false
    },
    {
      name:'product',
      width:120,
      enableCellEdit: false
    },
    {
      name:'company',
      width:200,
      enableCellEdit: false
    },
    {
      name:'issue',
      width:120,
      enableCellEdit: false
    },
    {
      name:'manufactureDate',
      width:100,
      enableCellEdit: false
    },
    {
      name:'partNumber',
      width:100,
      enableCellEdit: false
    },
    {
      name:'resolutionDepartment',
      width:200,
      enableCellEdit: false
    },
    {
      name:'notes',
      width:300,
      enableCellEdit: false
    },
    {
      name:'submitter',
      width:125,
      cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{row.entity.submitterEmail}}">{{COL_FIELD}}</a></div>'
    },
    {
      name:'resolutionStatus',
      width:120, type:'boolean',
      enableCellEdit: false
    },
    {
      name:'assignedAgent',
      width:120,
      type:'boolean',
      enableCellEdit: false},
  ];

  $scope.refreshData = function() {
    $scope.myData = [];
      $http.get('/api/WCS/')
        .success(function(data) {
          data.forEach(function(row){
            $scope.myData.push(row);
          });
        });
  };

}]);
