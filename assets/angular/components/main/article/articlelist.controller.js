(function(){
  'use strict';

  function ArticleListCtrl($scope,$http,$q,$sce,$log, ArticleListFactory)
  {
    var $articlelist = this;

    $articlelist.data = [];

    $articlelist.textSearchContent= '';

    $articlelist.mcategory = {};
    $articlelist.mcategories = [];

    $articlelist.pagination = {};
    $articlelist.props = {};

    $articlelist.isActive = false;
    $articlelist.activeButton = function(index) {
    $articlelist.isActive = !$articlelist.isActive;
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
           angular.forEach(response, function(category) {
	            $articlelist.mcategories.push(category);
	          });
      });
    };

    /**
     * Pagination
     */

     $articlelist.startItem = 0;
     $articlelist.currentPage = 1;
     $articlelist.perPage = 5;
     $articlelist.numberOfPages = 1;

      $articlelist.totalItems = 0;
      $articlelist.maxSizeItems = 5;
      // $articlelist.currentPage = 4;


      $articlelist.pageChanged = function() {
        $log.log('Page changed to: ' + $articlelist.currentPage );
        $log.log('Item: ' + $articlelist.startfrom()  );

        $articlelist.getNextArticleData($articlelist.startfrom() );
      };

    $articlelist.startfrom = function(){
          return ($articlelist.perPage * $articlelist.currentPage)-($articlelist.perPage);
    };

    $articlelist.getNextArticleData = function(startValue){
        $log.log({
          'skip' : startValue,
          'kind' : $articlelist.props.kind
        });
      $q.when(ArticleListFactory.getArticles(
            {
              'skip' : startValue,
              'kind' : $articlelist.props.kind
            }))
          .then(function(response){
              $log.debug(response.data.results);
              $articlelist.data = response.data.results;
          })
          .catch(function (err) {
              $log.error(err.stack);
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

    $articlelist.setNormalList = function()
    {
      $articlelist.props = {
        'kind':'normal',
        'limit':$articlelist.perPage
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.normal = true;
      $articlelist.recommend = false;
      $articlelist.currentPage = 1;
    };

    $articlelist.setRecommendList = function()
    {
      $articlelist.props = {
        'kind':'recommend',
        'limit':$articlelist.perPage
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.recommend = true;
      $articlelist.normal = false;
      $articlelist.currentPage = 1;
    };

    $articlelist.getArticles = function(props){
      $q.when(ArticleListFactory.getArticles(props),
      function(values){
          $articlelist.data = values.data.results ;

          // angular.forEach(values.data.results, function(article) {
          //      $log.debug(article.recommend);
          //      $articlelist.data.push(article);
          // });


          $articlelist.totalItems = values.data.size;
          $articlelist.numberOfPages = Math.ceil(values.data.size/$articlelist.perPage) || 1;
      },
      function(err){
        $log.debug(err);
      },
      function(progress){
          $log.debug(progress);
      });
    };

    $articlelist.getTrustedResource = function(resource)
    {
    //exist url with protocol
    if(resource.indexOf('://')>0)
      return $sce.trustAsResourceUrl(resource.substr(resource.indexOf('://')+1));
    };

    //Modal
    $articlelist.openModal = function (article)
    {
        var $modalInstance = ArticleListFactory.getModal(article);

        $modalInstance.result.then(function (ops){
            $log.debug("Options Modal:",JSON.stringify(ops));
        },
         function () {
           $log.debug('Modal dismissed at: ' + new Date());
        }
        );

    };

    $articlelist.test = function test() {
      return 'Test';
    };
  }

  function ModalCtrl($scope,$log,$sce,$timeout,$uibModalInstance,ArticleListFactory,article){
    var $modal = $scope;

    $modal.article = article;
    $modal.currentUrl = $sce.trustAsResourceUrl(article.url.substr(article.url.indexOf('://')+1));
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
      if($modal.diffTime() > 15)
      {
        $log.debug("Time:",$modal.diffTime());
        ArticleListFactory.setVisit(article,$modal.diffTime());
        $uibModalInstance.close({visit:true,article:article.id});
        article.visits = article.visits + 1;
      }
      $uibModalInstance.dismiss('cancel');
    };

    $modal.hello = function(contentLocation) {
      $log.debug(contentLocation);
      // contentLocation === iframe.contentWindow.location
      // it's undefined when contentWindow cannot be found from the bound element
      $log.debug("Hello world!");
    };

  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl)
         .controller('ModalCtrl',ModalCtrl);
})();
