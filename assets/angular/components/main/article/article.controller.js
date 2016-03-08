(function(){
  'use strict';

  function ArticleCtrl($scope, $http, ArticleFactory)
  {
    var $article = this;
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
  };

  angular.module('app.main.article')
         .controller('ArticleCtrl',ArticleCtrl);
})();
