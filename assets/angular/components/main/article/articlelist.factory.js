(function () {
 'use strict';

  function ArticleListFactory($http){
    return {
          getArticles: function()
          {
            return $http.get('/article/findAll');
          },
          getInfo: function(articleID)
          {
            return ">"+articleID;
          },
          getSite: function(uri)
          {
            return $http.get('/article/getSite/',{params:{"uri": uri}});
          }
    };
  }

 angular.module('app.main.article')
        .factory('ArticleListFactory', ArticleListFactory);
})();
