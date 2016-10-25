(function () {
  'use strict';

  function CheckRoutingFactory ($q, $log, $rootScope, $location, $window,$http,AuthFactory ) {
    return {
      isAuth: function()
             {
        if ($rootScope.userProfile) {
          return true;
        } else {
          var deferred = $q.defer();
          $http.post('me')
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
      },
      getCurrentUser : function () {
        return $http.get('me').then(function (response) {
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
          $http.get('me')
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
        if(AuthFactory.isAuthenticated()) {
          $location.path('/wall');
        }
        else {
          if(String($location.absUrl()).contain('facebook'))
            $location.path('/auth/facebook/canvas');
          else {
            $location.path('/home');
          }
        }
      },
      notAuth : function(event){
        $log.debug('+ Location current abs url ',$location.absUrl());
        if($location.absUrl().indexOf('facebook') >-1)
          $location.path('/auth/facebook/canvas');
        else {
          $location.path('/');
        }
      }
    };
  }
  angular.module('app.core.router.check', [])
         .factory('CheckRoutingFactory',CheckRoutingFactory);
})();
