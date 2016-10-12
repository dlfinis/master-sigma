(function () {
  'use strict';

  function RContentFactory($http,$log,$q,$rootScope,$timeout,Upload,AuthFactory){
    return {
      isCreatedContent: function(url){
        return $http.get('/api/article/find',{ params: { where: { url: url } }})
                .then(function (response){
                  return response.data.results;
                });
      },
      getUser : function()
      {
        return AuthFactory.getUser().then(function (user) {
          return user;
        });
      },
      getContent: function(contentField,contentID){
        return $http.get('/api/article/findOne',{ params: { field: contentField, value: contentID }})
                .then(function (response){
                  return response.data.results;
                });
      },
      getCategoriesList: function()
      {
        return $http.get('/api/category/getList').then(function (response){
          return response.data.results;
        })
        .catch(function (err) {
          $log.error(err.stack);
        });
      },
      setCategoriesList: function(catList)
      {
        return $http.get('/api/category/setList',{ params: { list: catList }})
                .then(function (response){
                  return response.data.results;
                });
      },
      setImage: function(imageBlob)
      {

        if(imageBlob)
          return Upload.upload({ url: '/api/upload/image',
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
        return this.isCreatedContent(content.url).then(function (response) {
          if(response.length > 0)
          {
            return { status: 400 , msg: 'Exists url'};
          }
          else
          {
            return $q.all([ this.getUser(),
                          this.setCategoriesList(content.categories),
                          this.setImage(content.image)
                          ])
            .then(function(values) {
              var resUser = values[0].id,
                resCatList = values[1],
                resImageUrl = values[2].fd;

              content.creator = resUser;
              content.categories = resCatList;
              content.image = resImageUrl;

              return $http.post('/api/article/create',content).then(function (response) {
                console.log(response);
                return response.data;
              });

            })
           .catch(function (err) {
             $log.error('Factory',err);
           });
          }
        });
      },
      updateContent : function(content){
        console.log('Fct',content);

        var promises = [
          this.getUser(),
          this.setCategoriesList(content.categories)
        ];

        if(content.image.constructor !== String)
          promises.push(this.setImage(content.image));


            return $q.all(promises)
            .then(function(values) {
              var resUser = values[0].id,
                resCatList = values[1],
                resImageUrl = content.image.constructor !== String ? values[2].fd : content.image;

                console.log(values[2]);
              content.creator = resUser;
              content.categories = resCatList;
              content.image = resImageUrl;


              return $http.post('/api/article/update',content).then(function (response) {
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
