(function () {
 'use strict';

  function RArticleFactory($http){
    return {
          getCategories: function()
          {
            return $http.get('/category/find').then(function (response){
                return response.data.results;
            })
            .catch(function (err) {
                console.error(err.stack);
            });
          },
          getUser : function()
          {
            return $http.get('/getuser');
          },
          saveArticle : function(article){
            return this.getUser().then(function (response){
                //  console.log(response.data.user);
               article.creator = response.data.user.id;
               return $http.post('/article/create',article).then(function (response){
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
