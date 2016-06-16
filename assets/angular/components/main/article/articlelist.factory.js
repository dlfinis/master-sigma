(function () {
  'use strict';
  function ArticleListFactory($http,$log,$uibModal,$q,partial,INIT){
    return {
      _params: function () {
        return {
          startItem : 0,
          currentPage : 1,
          perPage : INIT.elementlimit, //Elements by Page
          numberOfPages : 1,
          totalItems : 0,
          maxSizeItems : INIT.elementpage // Numbers of Pages
        };
      },
      _props_normal: function (props) {
        return  {
          'kind' : 'normal',
          'limit' : this._params().perPage
        };
      },
      _source_init: function () {
        return $q.all([
          this.getArticles(this._props_normal()),
          $http.get('/api/category/find')
        ]).then(function(response){
          return {
            articlelist : response[0].data,
            categories : response[1].data
          };
        });

      },
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
      getArticles: function(props)
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

        return $http.get('/api/article/findAll', { params : prms });
      },
      getInfo: function(articleID)
          {
        return '>'+articleID;
      },
      getCategories: function()
      {
        return $http.get('/api/category/find')
        .then(function (response){
          return response.data.results;
        })
        .catch(function (err) {
          console.error(err.stack);
        });
      },
      getHtmlData: function(url)
          {
        return $http.get('/api/article/htmldata?uri='+url);
      },
      setVisit: function(article,time)
          {
        var prms = {};
        prms.articleID = article.id;
        prms.visitTime = time;
        $http.post('/api/visit/create',prms).then(function(record)
             {
          $log.debug(record.data);
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
            }
                // backdrop: 'static'
          });
      }
    };
  }

  angular.module('app.main.article')
        .factory('ArticleListFactory', ArticleListFactory);
})();
