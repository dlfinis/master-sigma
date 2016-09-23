(function () {
  'use strict';

  function RContentFactory($http,$log,$rootScope){
    return {
      createCategory: function(){

      },
      getCategoriesList: function()
          {
        return $http.get('/api/category/getList').then(function (response){
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
      saveContent : function(content){
        $log.debug($rootScope.userProfile);
        return this.getUser().then(function (response){
                //  console.log(response.data.user);
          content.creator = response.data.user.id;
          return $http.post('/api/article/create',content).then(function (response){
            $log.debug(response);
            return response;
          })
               .catch(function (err) {
                 $log.error(err.stack);
               });

        })
             .catch(function (err) {
               $log.error(err.stack);
             });

      }
    };
  }

  angular.module('app.main.registry.rcontent')
        .factory('RContentFactory', RContentFactory);
})();
