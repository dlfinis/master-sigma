(function () {
  'use strict';

  function CategoryCtrl($scope)
  {
    var $category = this;
    $category.count = 0;
    $category.state = false;
    $category.model = 0;
    $category.article_uid = '';
    $category.setLike = function() {
      $category.count++;
      $category.state = !$category.state;
    };
  }

  angular.module('app.main.article.category',['app.config'])
         .controller('CategoryCtrl',CategoryCtrl)
         .directive('category', function(partial){
           return {
             restrict: 'EA',
             scope: {
               uid: '@',
               state: '='
             },
             controller: 'CategoryCtrl',
             controllerAs: '$category',
             templateUrl: partial.main.article+'tpl/category.cmp.html'
           };
         });

})();
