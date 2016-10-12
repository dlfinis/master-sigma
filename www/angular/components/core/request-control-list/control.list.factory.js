(function(module) {
  'use strict';

  function ControlListFactory ($http,$log,$q) {
    return {
      getStats: function(url)
        {
        var prms = {
          uri : url
        };
        return $http.get('/api/article/stats',
          {
            params : prms,
            ignoreLoadingBar : true
          })
          .then(function (response){
            // $log.debug('+Get stats >'+JSON.stringify(response.data));
            return response.data;
          })
          .catch(function (err) {
            $log.error(err.stack);
          });
      }
    };
  }

  module.factory('ControlListFactory',ControlListFactory);

})(angular.module('app.core.request.control.list'));
