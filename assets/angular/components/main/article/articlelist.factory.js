(function () {
 'use strict';



  function ArticleListFactory($http,$uibModal,partial){
    return {
          getArticles: function()
          {
            return $http.get('/article/findAll');
          },
          getInfo: function(articleID)
          {
            return ">"+articleID;
          },
          getSite: function(uri)
          {
            return $http.get('/article/getSite/',{params:{"uri": uri}});
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
                }
            });
          }
    };
  }

 angular.module('app.main.article')
        .factory('ArticleListFactory', ArticleListFactory);
})();
