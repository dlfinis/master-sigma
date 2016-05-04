(function () {
 'use strict';
  function ArticleListFactory($http,$log,$uibModal,$q,partial){
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
          },
          getArticles: function(props)
          {
            var prms = {};
            if(props.kind === 'normal' || props.kind === 'recommend')
              prms.kind = props.kind;

            if(props.limit != 'undefined')
              prms.limit = props.limit;

            if(props.skip != 'undefined')
              prms.skip = props.skip;

            if(props.creator != 'undefined')
              prms.creator = props.creator;

            if(props.category != 'undefined')
              prms.category = props.category;

              return $http.get('/article/findAll', { params : prms });



          },
          getInfo: function(articleID)
          {
            return ">"+articleID;
          },
          getCategories: function()
          {
            return $http.get('/category/find').then(function (response){
                return response.data.results;
            })
            .catch(function (err) {
                console.error(err.stack);
            });
          },
          getHtmlData: function(url)
          {
            return $http.get('/article/htmldata?uri='+url);
          },
          setVisit: function(article,time)
          {
            var prms = {};
            prms.articleID = article.id;
            prms.visitTime = time;
             $http.post('/visit/create',prms).then(function(record)
             {
               $log.debug(record.data);
             }
            ).catch(function (err) {
               $log.error(err.stack);
            });
          },
          setDead: function(articleID)
          {
            var prms = {
              state : 'disable',
            };
             $http.put('/article/update'+articleID,prms).then(function(record)
             {
               $log.debug('Set DEAD >'+articleID+' >> '+record.data);

             }
            ).catch(function (err) {
               $log.error(err.stack);
            });
          },
          getModal:function(article){
            return $uibModal.open(
            {
                templateUrl: partial.main.article+'tpl/modal.cmp.html',
                controller: 'ModalCtrl',
                size: 'lg',
                resolve: {
                  article: function(){
                    return article;
                  }
                },
                // backdrop: 'static'
            });
          }
    };
  }

 angular.module('app.main.article')
        .factory('ArticleListFactory', ArticleListFactory);
})();
