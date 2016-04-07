(function(){
  'use strict';

  function ArticleListCtrl($scope, $http,$q, ArticleListFactory)
  {
    var $articlelist = this;

    $articlelist.data = [];

    $articlelist.textSearchContent= '';

    $articlelist.mcategory = {};

    $articlelist.pagination = {};
    $articlelist.props = {};

    $articlelist.isActive = false;
    $articlelist.activeButton = function(index) {
    $articlelist.isActive = !$articlelist.isActive;
    console.log(index);
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

    $articlelist.getCategories = function(){
      $q.when(ArticleListFactory.getCategories()).then(function(response){
          $articlelist.mcategories = response;
      });
    };

    /**
     * Pagination
     */

     $articlelist.startItem = 0;
     $articlelist.currentPage = 1;
     $articlelist.perPage = 10;
     $articlelist.numberOfPages = 1;

    $articlelist.startfrom = function(){
          return $articlelist.perPage * $articlelist.currentPage;
    };

    $articlelist.getNextArticleData = function(startValue){
      $q.when(ArticleListFactory.getArticles(
            {
              'skip' : startValue,
              'kind' : $articlelist.props.kind
            }))
          .then(function(response){
              $articlelist.data = response.data.results;
          })
          .catch(function (err) {
              console.error(err.stack);
          });
    };

    $articlelist.existPage = function (kindAction){
      if( kindAction === 'prev')
        return $articlelist.currentPage > 0 ? false :true;
      if( kindAction === 'next')
        return $articlelist.currentPage <
               $articlelist.numberOfPages ? false : true;
    };

    $articlelist.nextPage = function () {
        if($articlelist.currentPage < $articlelist.numberOfPages)
        {
          $articlelist.startItem +=
                                      $articlelist.currentPage <=
                                      $articlelist.numberOfPages ? $articlelist.perPage : 0;
          $articlelist.getNextArticleData($articlelist.startItem);
          $articlelist.currentPage +=
                                      $articlelist.currentPage <
                                      $articlelist.numberOfPages ? 1 : 0;
        }
    };

    $articlelist.prevPage = function(){
        if($articlelist.currentPage > 0)
        {
            $articlelist.startItem -=
                                      $articlelist.currentPage > 0 ? $articlelist.perPage : 0;
            $articlelist.getNextArticleData($articlelist.startItem);
            $articlelist.currentPage -= $articlelist.currentPage > 0 ? 1 : 0;
        }
    };

    $articlelist.getArticles = function(props){
      $q.when(ArticleListFactory.getArticles(props))
          .then(function(response){
                $articlelist.data = response.data.results;
                $articlelist.numberOfPages = Math.ceil(response.data.size/$articlelist.perPage) || 1;
          })
          .catch(function (err) {
              console.error(err.stack);
          });
    };

    //Modal
    $articlelist.openModal = function (article)
    {
        var $modalInstance = ArticleListFactory.getModal(article);

        $modalInstance.result.then(function (ops){
            console.log(ops);
        },
         function () {
           console.log('Modal dismissed at: ' + new Date());
        }
        );

    };


    $articlelist.test = function test() {
      return 'Test';
    };
  }

  function ModalCtrl($scope,$sce,$timeout,$uibModalInstance,ArticleListFactory,article){
    var $modal = $scope;
    $modal.article = article;
    $modal.currentUrl = $sce.trustAsResourceUrl(article.url);
    $modal.visit = 0;

    $uibModalInstance.opened.then(function(){
      $modal.startTime = new Date();
      $timeout(function () {
            $modal.exit = true;
      }, 3000);
    });

    $modal.diffTime = function(){
      var diff = (new Date() - $modal.startTime)/(1000); //segs
      return Math.round(diff);
    };


    $modal.close = function(){
      // console.log($modal.diffTime());
      if($modal.diffTime() > 15)
      {
        console.log($modal.diffTime());
        ArticleListFactory.setVisit(article,$modal.diffTime());
        $uibModalInstance.close({visit:true,article:article.id});
      }
      $uibModalInstance.dismiss('cancel');
    };

    $modal.hello = function(contentLocation) {
      console.log(contentLocation);
      // contentLocation === iframe.contentWindow.location
      // it's undefined when contentWindow cannot be found from the bound element
      console.log("Hello world!");
    };

  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl)
         .controller('ModalCtrl',ModalCtrl);
})();
