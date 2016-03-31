(function () {
 'use strict';

  function RegistryFactory($http){
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
            return $http.get('/user/getUser').then(function (response){
                return response.data;
            })
            .catch(function (err) {
                console.error(err.stack);
            });
          },
    };
  }

 angular.module('app.main.registry')
        .factory('RegistryFactory', RegistryFactory);
})();
