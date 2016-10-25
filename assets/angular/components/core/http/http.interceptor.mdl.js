(function() {
  'use strict';

  angular.module('app.core.http.interceptor', [])
    .factory('apiInterceptor', ['$log','$location','$q','$rootScope', function($log,$location,$q,$rootScope) {
      var _api_loading = {};

      function isPath(prefix,path,subpath) {
        console.log(path);
        console.log(path.indexOf('/'+prefix));
        if(path.indexOf('/'+prefix) > -1)
        {
          if(path.indexOf('/'+prefix+'/'+subpath) > -1)
          {
            return true ;
          }
        }
        return false;
      }

      return {
        request : function (config) {
          // $log.debug(config); // Contains the data about the request before it is sent.

          // $rootScope.isApiLoading = isPath('api',config.url,'article') ? true : false;

          // Return the config or wrap it in a promise if blank.
          return config || $q.when(config);
        },
        // On request failure
        requestError: function (rejection) {
          // console.log(rejection); // Contains the data about the error on the request.
          switch(rejection.status){
          case 401:
          //  $location.path('/login');
          $log.debug('- Is necessary login');
           break;
         case 404:
           $location.path('/404');
           break;
         case 500:
           $location.path('/500');
           break;
         default:
           $location.path('/error');
       }

          // Return the promise rejection.
          return $q.reject(rejection);
        },

        // On response success
        response: function (response) {
          // $log.debug(response);
          // $rootScope.isApiLoading = isPath('api',config.url,'article') ? true : false;
          // Return the response or promise.
          return response || $q.when(response);
        },

        // On response failture
        responseError: function (rejection) {
          // console.log(rejection); // Contains the data about the error.

          // Return the promise rejection.
          return $q.reject(rejection);
        }
      };
    }]);

})();
