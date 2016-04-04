(function(){
  'use strict';

  function ArticleListCtrl($scope, $http, ArticleListFactory)
  {
    var $articlelist = this;

    $articlelist.currentPage = 0;
    $articlelist.pageSize = 2;

    // $articlelist.sortValue= '';
    $articlelist.textSearchContent= '';

    $articlelist.btn0 = '';
    $articlelist.btn1 = '';

    $articlelist.mcategory = {};

    $articlelist.isActive = false;
    $articlelist.activeButton = function(index) {
    $articlelist.isActive = !$articlelist.isActive;
    console.log(index);
    };
    ArticleListFactory.getCategories()
                  .then(function (response){
                      $articlelist.mcategories = response;
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });
    $articlelist.numberOfPages = function(){
        return Math.ceil($articlelist.data.length/$articlelist.pageSize);
    };
    // ArticleListFactory.getArticles()
    //             .then(function (response){
    //                 console.log(response);
    //                 $articlelist.data = response.data.results;
    //             })
    //             .catch(function (err) {
    //                 console.error(err.stack);
    //             });
    $articlelist.getArticles = function(props){
      console.log("GetArticles");
      console.log(props);
      ArticleListFactory.getArticles(props)
                  .then(function (response){
                      $articlelist.data = response.data.results;
                      console.log($articlelist.data);
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });
    };
    $articlelist.test = function test() {
          return 'Test';
    };
    $articlelist.clear = function ($event, $select){
                             //stops click event bubbling
                             $event.stopPropagation();
                             //to allow empty field, in order to force a selection remove the following line
                             $select.selected = undefined;
                             //reset search query
                             $select.search = undefined;
                             //focus and open dropdown
                             $select.activate();
                            };
    $articlelist.open = function (article)
    {
        ArticleListFactory.getModal(article);
    };
  }

  function ModalCtrl($scope,$uibModalInstance,$sce,article){
    var $modal = $scope;
    $modal.article = article;
    $modal.currentUrl = $sce.trustAsResourceUrl(article.url);
    $modal.hello = function(contentLocation) {
      console.log(contentLocation);
    // contentLocation === iframe.contentWindow.location
    // it's undefined when contentWindow cannot be found from the bound element
      console.log("Hello world!");
    };

    $modal.close = function(){
     $uibModalInstance.dismiss('cancel');
    };
  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl)
         .controller('ModalCtrl',ModalCtrl);
})();
