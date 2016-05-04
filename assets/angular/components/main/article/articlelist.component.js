(function () {
  'use strict';

  angular.module('app.main.article', ['app.config'])
         .directive('articlelist', function(partial){
           return {
               restrict: 'EA',
               scope: {
                 source:"="
               },
               controller: 'ArticleListCtrl',
               controllerAs: '$articlelist',
               templateUrl: partial.main.article+'articlelist.html',
               link: function (scope){
               }
           };
         });

})();
