(function(){
  'use strict';

  function ArticleCtrl($scope, $http, ArticleFactory)
  {
    var $article = $scope;

    $article.searchContent = '';
    $article.mcategory = {};
    $article.mcategory.selected = undefined;
    ArticleFactory.getArticles()
                  .then(function (response){
                      $article.articles = response.data.results;
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });

                  $http.get('/api/category')
                       .then(function (response){
                         $article.mcategories = response.data;

                       });

                       $article.getByCategory = function(category){
                         console.log(category);
                       };
  };

  angular.module('app.main.article')
         .controller('ArticleCtrl',ArticleCtrl);
})();
