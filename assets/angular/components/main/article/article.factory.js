;(function () {
 'use strict';


  function ArticleFactory($http){
    return {
          getArticles: function()
          {
            return $http.get('/api/article');
          }
    }
  };

 angular.module('app.main.article')
        .factory('ArticleFactory', ArticleFactory);
})()
