(function () {
  'use strict';

  angular.module('app.core.test', [])
         .factory('TestFactory',TestFactory);

  function TestFactory ($q, $rootScope, $location,$http) {
    return {
      isOK: function()
      {
          return 'OK';
      }
    }
  };

})()
