(function(){
  'use strict';

  angular.module('app.core.test', ['app.config'])
  .directive('test',function (partial) {
    return {
      scope: {},
      controller: 'testCtrl',
      controllerAs: 'sc',
      templateUrl: partial.core.test+'test.html'
    };
  });

})();
