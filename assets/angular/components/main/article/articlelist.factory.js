(function () {
 'use strict';
  function ArticleListFactory($http,$uibModal,partial){
    return {
          getArticles: function(props)
          {
            if(props === 'recommend' || props.recommend)
                  return $http.get('/article/findAll', { params:{'recommendList': true }});
            else
              return $http.get('/article/findAll');
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
