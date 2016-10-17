(function(module) {
  'use strict';

  function ContentFactory($q,$http,$log,$location,AuthFactory) {
    return {
      getUser : function () {
        return AuthFactory.getUser();
      },
      isAlive: function(contentID)
      {
        var prms = {
          articleID : contentID
        };
        return $http.get('api/article/isAlive',{ params : prms  }).then(function (response){
          $log.debug(response.data);
          return response.data;
        })
            .catch(function (err) {
              $log.error(err.stack);
            });
      },
      delete: function (contentID) {
        var prms = {
          id : contentID
        };
        $log.debug('+ Delete ',contentID);
        return $http.delete('api/article/',{ params : prms }).then(function (response){
          $log.debug(response.data);
          return response.data;
        })
        .catch(function (err) {
          $log.err(err);
          return false;
        });
      },
      getContent: function(contentField,contentID){
        return $http.get('api/article/findOne',{ params: { field: contentField, value: contentID }})
                .then(function (response){
                  return response.data.results;
                });
      },
      getList: function(props)
          {
        var prms = {};
        if(props.kind === 'normal' || props.kind === 'recommend' || props.kind === 'liked' || props.kind === 'shared')
          prms.kind = props.kind;

        if(props.limit != 'undefined')
          prms.limit = props.limit;

        if(props.skip != 'undefined')
          prms.skip = props.skip;

        if(props.creator != 'undefined')
          prms.creator = props.creator;

        if(props.category != 'undefined')
          prms.category = props.category;

        return $http.get('api/article/findAll', { params : prms });
      }
    };
  }

  module.factory('ContentFactory',ContentFactory);

})(angular.module('app.main.content'));
