(function () {
  'use strict';

  function ShareCtrl($scope)
  {
    var $share = this;
    $share.count = 0;
    $share.state = false;
    $share.model = 0;
    $share.stats = 0;
    $share.article_uid = "";
      $share.setShare = function() {
        $share.count++;
        $share.state = !$share.state;
      };


  }

  angular.module('app.main.article.share', [])
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function(partial){
           return {
               restrict: 'EA',
               scope: {
                 uid: "@",
                 state: "=",
                 stats:"="
               },
               controller: 'ShareCtrl',
               controllerAs: '$share',
              templateUrl: partial.main.article+'tpl/share.cmp.html'
           };
         });

})();
