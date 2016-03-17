;(function () {
 'use strict';

  function ArticleFactory($http){
    return {
          getArticles: function()
          {
            return $http.get('/article/findAll');
          },
          getInfo: function(articleID)
          {
            return ">"+articleID;
          }
    }
  }

 angular.module('app.main.article')
        .factory('ArticleFactory', ArticleFactory);
})()
