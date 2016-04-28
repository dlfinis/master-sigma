(function () {
 'use strict';
  function ArticleListFactory($http,$log,$uibModal,$q,partial){
  return {
          getArticles: function(props)
          {
            var prms = {};
            if(props.kind === 'normal' || props.kind === 'recommend')
              prms.kind = props.kind;

            if(props.limit != 'undefined')
              prms.limit = props.limit;

            if(props.skip != 'undefined')
              prms.skip = props.skip;

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
          getReading: function(url)
          {
            return $http.get('/article/reading?uri='+url);
          },
          getHtmlData: function(url)
          {
            return $http.get('/article/htmldata?uri='+url);
          },
          getUser: function()
          {
            return $http.get('/getuser');
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
