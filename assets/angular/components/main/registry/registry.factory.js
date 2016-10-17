(function () {
  'use strict';

  function RegistryFactory($http){
    return {
      getCategories: function()
          {
        return $http.get('api/category/find').then(function (response){
          return response.data.results;
        })
            .catch(function (err) {
              console.error(err.stack);
            });
      },
      saveArticle : function(article){
        return $http.get('/me').then(function (response){
                //  console.log(response.data.user);
          article.creator = response.user.id;
          return $http.post('api/article/create',article).then(function (response){
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

  angular.module('app.main.registry')
        .factory('RegistryFactory', RegistryFactory);
})();
