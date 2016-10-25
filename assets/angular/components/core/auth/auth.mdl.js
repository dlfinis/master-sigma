(function(module) {
  'use strict';

  function SessionProvider() {
    //the provider recipe for services require you specify a $get function
    this.$get = ['localStorageService',function (localStorageService){
      return {
        create : function (info) {
          localStorageService.set('me',info.user);
        },
        getUser : function () {
          return localStorageService.get('me');
        },
        destroy : function () {
          localStorageService.remove('me');
        },
        clearAll : function () {
          localStorageService.clearAll();
        }
      };
    }];
  }

  function AuthFactory ($q, $log, $rootScope, $location, $http, $Session) {
    var authService = {};

    authService.login = function () {
      var deferred = $q.defer();
      $log.debug('+ AUTH LOGIN');
      $http
          .get('me')
          .then(function (response) {
            $log.debug('+ Set Session user ',response.data);
            $Session.destroy();
            $Session.create(response.data);
            deferred.resolve(true);
          })
          .catch(function(err){
            $log.debug('+ NOT Data User');
            if($Session.getUser()){
              authService.logout().then(function (response) {
                if(response)
                 deferred.resolve(false);
              });
            }
            else {
              $Session.destroy();
              deferred.resolve(false);
            }
          });

      return deferred.promise;
    };

    authService.isAuthenticated = function () {
      var deferred = $q.defer();
      authService.login().then(function (response) {
        if(response)
        {
          //deferred.resolve($Session.getUser());
          deferred.resolve(true);
        }
        else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    authService.getUser = function () {
      var deferred = $q.defer();
      authService.login().then(function (response) {
        if(response)
        {
          deferred.resolve($Session.getUser());
        }
        else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf($Session.userRole) !== -1);
    };

    authService.logout = function () {
      var deferred = $q.defer();
      $log.debug('+ LOGOUT');
      $http.get('auth/logout').then(function () {
        $Session.destroy();
        deferred.resolve(true);
      })
      .catch(function (err) {
        $log.error(err);
        deferred.resolve(false);
      });
      return deferred.promise;
    };

    return authService;
  }

  function AuthInterceptor ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  }

  module
    .provider('$Session',SessionProvider)
    .factory('AuthFactory',AuthFactory);

})(angular.module('app.core.auth',[]));
