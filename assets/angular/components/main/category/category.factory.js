(function(module) {
  'use strict';

  function CategoryFactory($q,$http,$log,$location,AuthFactory) {
    return {
      getList: function()
      {
        return $http.get('api/category/getList').then(function (response){
          return response.data.results;
        })
        .catch(function (err) {
          $log.error(err.stack);
        });
      },
      setList: function(catList)
      {
        return $http.get('api/category/setList',{ params: { list: catList }})
                .then(function (response){
                  return response.data.results;
                });
      }
    };
  }

  module.factory('CategoryFactory',CategoryFactory);

})(angular.module('app.main.category'));
