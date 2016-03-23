(function () {
  'use strict';

  angular.module('app.main.article', ['app.config'])
         .directive('article', function(partial){
           return {
               restrict: 'EA',
               scope: {},
               controller: 'ArticleCtrl',
               controllerAs: '$article',
               templateUrl: partial.main.article+'article.html',
           };
         });

})();
