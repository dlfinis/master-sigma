(function () {
  'use strict';

         function CheckRoutingFactory ($q, $log, $rootScope, $location,$http) {
           return {
             isAuthenticated: function()
             {
                 if ($rootScope.userProfile) {
                    //  $log.debug('+ LoggedIn User > '+JSON.stringify($rootScope.userProfile));
                     return true;
                 } else {
                     var deferred = $q.defer();
                     $http.get('/me')
                          .success(function (response) {
                             if(response.user)
                               {
                                 //  $log.debug('+GET User > '+JSON.stringify($rootScope.userProfile));
                                   $rootScope.userProfile = response.user;
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
