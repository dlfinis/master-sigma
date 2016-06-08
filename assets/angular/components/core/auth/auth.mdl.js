(function(module) {
  'use strict';

  function Session (localStorageService) {
    this.create = function (userInfo) {
      localStorageService.set('me',userInfo);
    };
    this.get = function () {
      return localStorageService.get('me');
    };
    this.destroy = function () {
      localStorageService.remove('me');
    };
  }

  function AuthFactory ($q, $log, $rootScope, $location,$http,Session) {
    var authService = {};
    authService.login = function () {
    var deferred = $q.defer();
      $http
          .get('/me')
          .then(function (response) {
            $log.debug('+ Set Session user ',response.data);
            Session.create(response.data);
            deferred.resolve(true);
          })
          .catch(function(err){
            deferred.resolve(false);
          });

      return deferred.promise;
    };

    authService.isAuthenticated = function () {
      var deferred = $q.defer();
      if(Session.get() && Session.get().user) {
        $log.debug('+ Session user ',Session.get().user);
        deferred.resolve(true);
      }
      else
      {
        deferred.resolve(authService.login());
      }

      return deferred.promise;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    authService.logout = function () {
      $log.debug('+ LOGOUT');
      $http.get('/auth/logout').then(function () {
        Session.destroy();
        $location.path('/');
      });
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

  module.factory('AuthFactory',AuthFactory)
        .service('Session',Session);

})(angular.module('app.core.auth',[]));
