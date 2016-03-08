;(function(){
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory',TestPageFactory)
  .controller('TestPageCtrl',TestPageCtrl)
  .directive('testpage',function (partial) {
    return {
      scope: {},
      controller: 'TestPageCtrl',
      controllerAs: 'sc',
      template:
                '<h4>TEST PAGE</h4>'+
                '<pre>{{sc.ok}}</pre>'+
                '<article></article>'
     };
  });

  function TestPageFactory ($q, $rootScope, $location,$http) {
    return {
      isOK: function()
      {
          return 'OK';
      }
    }
  };

  function TestPageCtrl(TestPageFactory){
    var sc = this;
    sc.ok = TestPageFactory.isOK();
  };

})()
