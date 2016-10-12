(function(){
  'use strict';

  angular.module('app.core.page.footer', ['app.config'])
  .directive('footer',function (partial) {
    return {
      restrict : 'AE',
      templateUrl: partial.core.page+'tpl/footer.cmp.html'
    };
  });

})();
