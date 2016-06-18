(function () {
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory', TestPageFactory)
  .controller('TestPageCtrl', TestPageCtrl)
  .directive('testpage', function (partial) {
    return {
      restricti:'EA',
      scope: {
        data : '='
      }
        ,
      controller: function($scope) {
        // I want `data` to be injected from the resolve...
        // as it would if this was a "standalone" controller
        console.log('$scope.data: '+ $scope.data);
      },
      templateUrl:partial.core.testpage+'testpage.cmp.html'
    };
  });


  function TestPageFactory ($q, $timeout,$rootScope, $location,$http) {
    return {
      isOK: function()
      {
        return 'OK';
      },
      getSlowData: function () {
        console.log(' + Get Data');
        return $timeout(function(){
          console.log('Slow Data');
          return 'Slow Data';
        }, 5000);
      }
    };
  }

  function TestPageCtrl(TestPageFactory,$scope,$sce, $element, $attrs){
  }

})();
