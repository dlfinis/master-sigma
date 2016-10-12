(function(){
  'use strict';

  angular.module('app.core.page.header', ['app.config'])
  .directive('header',function (partial) {
    return {
      restrict : 'AE',
      templateUrl: partial.core.page+'tpl/header.cmp.html'
    };
  });

})();
