(function () {
 'use strict';
  function ArticleListFactory($http,$uibModal,$q,partial){
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
            this.getUser()
                            .then(function (response){
                              prms.article = article.id;
                              prms.user = response.data.user.id;
                              prms.time =  time;
                              // console.log(prms);
                               $http.post('/visit/create',prms).then(function(record)
                               {
                                 console.log(record);
                               }
                              ).catch(function (err) {
                                   console.error(err.stack);
                                 });
                            });

            // if(prms.user != 'undefined')
            //   {
            //     var visit = $http.post('/visit/create',prms);
            //
            //     $q.all([ user, visit]).then(function success(response) {
            //       return response;
            //     })
            //     .catch(function (err) {
            //       console.error(err.stack);
            //     });
            //   }else{
            //     throw new Error("Not user");
            //     // return Promise.reject('error');
            //   }
              // return this.getUser()
              //                 .then(function (response){
              //                   prms.article = article.id;
              //                   prms.user = response.data.user.id;
              //                   prms.time =  time;
              //                 })
              //                 .then($http.post('/visit/create',prms));
          },
          getModal:function(article){
            // console.log(url);
            // console.log(alfa);
            return $uibModal.open(
            {
                templateUrl: partial.main.article+'tpl/modal.cmp.html',
                controller: 'ModalCtrl',
                // size: 'lg',
                resolve: {
                  article: function(){
                    return article;
                  }
                },
                backdrop: 'static'
            });
          }
    };
  }

 angular.module('app.main.article')
        .factory('ArticleListFactory', ArticleListFactory);
})();
