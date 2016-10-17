(function () {
  'use strict';

  function RContentFactory($http,$log,$q,$rootScope,$timeout,Upload,ContentFactory){
    return {
      isCreatedContent: function(url){
        return $http.get('api/article/find',{ params: { where: { url: url } }})
                .then(function (response){
                  return response.data.results;
                });
      },
      findDiff: function (original, edited) {
        var diff = {};
        for (var key in original) {
          if(!angular.equals(original[key], edited[key]))
            diff[key] = edited[key];
        }
        return diff;
      },
      getUser : function()
      {
        return ContentFactory.getUser();
      },
      getContent: function(contentID){
        return ContentFactory.getContent('id',contentID);
      },
      getCategoriesList: function()
      {
        return $http.get('api/category/getList').then(function (response){
          return response.data.results;
        })
        .catch(function (err) {
          $log.error(err.stack);
        });
      },
      setCategoriesList: function(catList)
      {
        return $http.get('api/category/setList',{ params: { list: catList }})
                .then(function (response){
                  return response.data.results;
                });
      },
      setImage: function(imageBlob)
      {

        if(imageBlob)
          return Upload.upload({ url: 'api/upload/image',
                                data: {image : imageBlob}
                            })
                            .then(function (response){
                              return response.data;
                            });
        else {
          throw new Error('Not exist image blob');
        }
      },
      saveContent : function(content){
        return $q.all([ this.getUser(),
                      this.setCategoriesList(content.categories),
                      this.setImage(content.image)
                      ])
        .then(function(values) {
          var resUser = values[0].id;
          content.creator = resUser;

          if(!angular.isUndefined(content.categories))
            content.categories = values[1];

          if(!angular.isUndefined(content.image))
            content.image = content.image.constructor !== String ? values[values.length-1].fd : content.image;

          return $http.post('api/article/create',content).then(function (response) {
            return response;
          });

        });

      },
      updateContent : function(contentID,content){
        var promises = [
          this.getUser()
        ];

        if(!angular.isUndefined(content.categories) && content.categories.length > 0)
          promises.push(this.setCategoriesList(content.categories));

        if(!angular.isUndefined(content.image) && content.image.constructor !== String)
          promises.push(this.setImage(content.image));


        return $q.all(promises)
        .then(function(values) {
          if(!angular.isUndefined(content.creator))
            content.creator = values[0].id;

          if(!angular.isUndefined(content.categories))
            content.categories = values[1];

          if(!angular.isUndefined(content.image))
            content.image = content.image.constructor !== String ? values[values.length-1].fd : content.image;

          return $http.put('api/article/'+contentID,content).then(function (response) {
            return response;
          });

        })
       .catch(function (err) {
         $log.error('Factory',err);
         return false;
       });
      }
    };
  }

  angular.module('app.main.registry.rcontent')
        .factory('RContentFactory', RContentFactory);
})();
