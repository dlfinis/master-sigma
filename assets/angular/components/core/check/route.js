(function () {
  'use strict';

  angular.module('app.core.check', [])
         .factory('CheckRoutingFactory',CheckRoutingFactory);

         function CheckRoutingFactory ($q, $rootScope, $location,$http) {
           return {
             isAuthenticated: function()
             {
                 if ($rootScope.userProfile) {
                     return true;
                 } else {
                     var deferred = $q.defer();
                     $http.post('/getuser')
                         .success(function (response) {
                             if(response.auth)
                               {
                                   $rootScope.userProfile = response.user;
                                   $location.path('/wall');
                               }else {
                                   $location.path('/home');
                               }
                             deferred.resolve(true);
                         })
                         .error(function (err) {
                             console.log(err);
                             deferred.reject();
                             $location.path('/home');
                          });
                     return deferred.promise;
                 }
             }
           };
         }

})();
