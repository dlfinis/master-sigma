(function () {
 'use strict';

  function RArticleFactory($http,$rootScope){
    return {
          getCategories: function()
          {
            return $http.get('/api/category/find').then(function (response){
                return response.data.results;
            })
            .catch(function (err) {
                console.error(err.stack);
            });
          },
          getUser : function()
          {
            return $http.get('/me');
          },
          saveArticle : function(article){
            console.log($rootScope.userProfile);
            return this.getUser().then(function (response){
                //  console.log(response.data.user);
               article.creator = response.data.user.id;
               return $http.post('/api/article/create',article).then(function (response){
                 console.log(response);
                  return response;
               })
               .catch(function (err) {
                   console.error(err.stack);
               });

             })
             .catch(function (err) {
                 console.error(err.stack);
             });

          }
    };
  }

 angular.module('app.main.registry.rarticle')
        .factory('RArticleFactory', RArticleFactory);
})();
