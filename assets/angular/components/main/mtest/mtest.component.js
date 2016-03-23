(function(){
  'use strict';

  angular.module('app.main.mtest', ['app.config'])
  .directive('mtest',function (partial) {
    return {
      // scope: {},
      // controller: 'mtestCtrl',
      // controllerAs: 'mtestScope',
      templateUrl: partial.main.mtest+'mtest.html',
    };
  });

})();
