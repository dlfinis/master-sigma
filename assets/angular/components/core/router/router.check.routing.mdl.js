(function () {
  'use strict';

         function CheckRoutingFactory ($q, $log, $rootScope, $location,$http) {
           return {
             getCurrentUser : function () {
               return $http.get('/me').then(function (response) {
                      return response.user;
               })
               .catch(function (err) {
                  $log.error(err);
                  return false;
               });
             },
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
            },
            isOK : function(){
            if($rootScope.userProfile) {
              $location.path('/wall');
            }
            else {
              this.getCurrentUser().then(function (user) {
                $rootScope.userProfile = user;
                $location.path('/wall');
              })
              .catch(function (err) {
                if(String($location.absUrl()).contain('facebook'))
                  $location.path('/auth/facebook/canvas');
                $location.path('/home');
              });
            }
            }
           };
         }
         angular.module('app.core.router.check', [])
                .factory('CheckRoutingFactory',CheckRoutingFactory);
})();
