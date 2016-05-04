(function () {
  'use strict';

         function CheckRoutingFactory ($q, $log, $rootScope, $location,$http) {
           return {
             isAuthenticated: function()
             {
                 if ($rootScope.userProfile) {
                     return true;
                 } else {
                     var deferred = $q.defer();
                     $http.post('/user/current')
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
                             $log.error(err);
                             deferred.reject();
                             $location.path('/home');
                          });
                     return deferred.promise;
                 }
             }
           };
         }
         angular.module('app.core.router.check', [])
                .factory('CheckRoutingFactory',CheckRoutingFactory);
})();
