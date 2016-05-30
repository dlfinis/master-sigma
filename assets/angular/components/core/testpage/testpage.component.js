(function(){
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory',TestPageFactory)
  .controller('TestPageCtrl',TestPageCtrl)
  .directive('testpage',function (partial) {
    return {
      restricti:'EA',
      scope: {
        data : '='
      },
      controller: 'TestPageCtrl',
      controllerAs: '$tp',
      // template:
      //           '<h2>TEST PAGE</h2>'+
      //           '<pre>{{ok}}</pre>'+
      //           '</br>'+
      //           '<h4>{{datat}</h4>'+
      //           '<h4>{{sc}</h4>'
        templateUrl : partial.core.testpage+'testpage.cmp.html'
     };
  });


  function TestPageFactory ($q, $timeout,$rootScope, $location,$http) {
    return {
      isOK: function()
      {
          return 'OK';
      },
      getSlowData: function () {
        console.log(" + Get Data");
        return $timeout(function(){
          console.log("Slow Data");
          return "Slow Data";
        }, 5000);
      }
    };
  }

  function TestPageCtrl(TestPageFactory,$scope,$sce,$http,$resource,$element, $attrs){
      var $tp = $scope;
      $tp.articlelist = [];
      var apiArticle =$resource('/api/article/findRawAll')


      $tp.availableSearchParams = [
          { key: "description", name: "Descripción", placeholder: "Descripción..." },
          { key: "creator", name: "Creator", placeholder: "Creator..." },
          { key: "category", name: "Categoría", placeholder: "Categoría..." },
          { key: "date", name: "Fecha", placeholder: "Fecha..." }
        ];


        console.log('$scope.data: '+ $scope.data);

        $tp.loadData = function () {
          apiArticle.query().$promise
          .then(function(response){
              $tp.articlelist = response;
          });
        }


        angular.element(document).ready(function () {

            $tp.loadData();

        });


        $tp.$on('advanced-searchbox:removedAllSearchParam', function (event) {
            $tp.loadData();
        });

        $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
          console.log(model);
            if(Object.keys(model).length == 0)
              $tp.loadData();
        });


        $tp.updateData = function (searchData) {
          $tp.searchData = 'Search'+' >>> \n'+JSON.stringify(searchData);

          $http.get('/api/article/findRawAll?where={"description":{"contains":"'+searchData.description+'"}}')
          .then(function(response){
              $tp.articlelist = response.data;
          });
        }
  }

  // TestPageCtrl.$inject

})();
