(function(module) {
    'use strict';

    function ControlListFactory ($http,$log,$q) {
      return {
        isAlive: function(articleID)
        {
          var prms = {
            articleID : articleID
          };

          return $http.get('/article/isAlive',{ params : prms  }).then(function (response){
              $log.debug(response.data);
              return response.data;
          })
          .catch(function (err) {
              $log.error(err.stack);
          });
        },
        isSecure: function(articleID)
        {
          var prms = {
            articleID : articleID
          };

          return $http.get('/article/isSecure',{ params : prms  });
        }
      };
    }

    module.controller('ControlListFactory',ControlListFactory);

})(angular.module('app.core.request.control.list'));
