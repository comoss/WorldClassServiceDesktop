app.controller('GridCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
 function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {

  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  $scope.gridOptions.enableColumnResizing = true;
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.showColumnFooter = true;
  $scope.gridOptions.fastWatch = true;

  $scope.gridOptions.columnDefs = [
    { name:'_id', width:200 },
    { name:'Date',field:'registered', cellFilter:'date', width:150, type:'date', enableFiltering:true, enableCellEdit: false },
    { name:'name', width:150 },
    { name:'email', width:150, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a></div>'},
    { name:'phone', width:150, enableCellEdit: true },
    { name:'product', width:150, enableCellEdit: true },
    { name:'Issue', width:300, enableCellEdit: true },
    { name:'Issue Department', width:300, enableCellEdit: true },
    { name:'notes', width:300, enableCellEdit: true },
    { name:'Resolution Status', width:200, type:'boolean' },
  ];

  // field:'isActive',

  $scope.refreshData = function(){
    $scope.myData = [];

      $http.get('http://localhost:9000/api/WCS')
        .success(function(data) {

          data.forEach(function(row){
            $scope.myData.push(row);
            console.log(row)
          });
        });

  };

}]);
