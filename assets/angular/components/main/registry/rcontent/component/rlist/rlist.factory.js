(function(module) {
  'use strict';

  function RListFactory($q,$log,$location,ContentFactory) {
    return {
      getCreator : function () {
        return ContentFactory.getUser();
      },
      getContentList: function () {
        return this.getCreator().then(function (user) {
          var props = {
            kind: 'normal',
            creator: user.name
          };

          return ContentFactory.getList(props).then(function (response) {
            if(response.status <= 210)
              return response.data.results;
            else
              return false;
          });
        })
        .catch(function (err) {
          $log.err(err);
          return false;
        });
      },
      editContent: function (contentID) {
        $location.path('/registry/content/'+contentID);
      },
      deleteContent: function (contentID) {
        return ContentFactory.delete(contentID);
      }
    };
  }

  module.factory('RListFactory',RListFactory);

})(angular.module('app.main.registry.rcontent.rlist'));
