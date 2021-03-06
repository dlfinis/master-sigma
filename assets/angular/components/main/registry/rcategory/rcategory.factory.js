(function () {
  'use strict';

  function RCategoryFactory($http){
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
      getUser : function()
          {
        return $http.get('me');
      },
      saveCategory: function(category){
        return $http.post('api/category/create',category).then(function (response){
          console.log(response);
          return response;
        })
               .catch(function (err) {
                 console.error(err.stack);
               });
      }
    };
  }

  angular.module('app.main.registry.rcategory')
        .factory('RCategoryFactory', RCategoryFactory);
})();
