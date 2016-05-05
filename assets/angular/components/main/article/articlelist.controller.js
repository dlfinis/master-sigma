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

    $log.debug($articlelist.source);

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

    $articlelist.getArticles = function(props){
      ArticleListFactory.getArticles(props).then(function(response){
        // $articlelist.data = response.data.results ;

            var articleList = [];
            angular.forEach( response.data.results, function(article) {
                //  $log.debug("Recommend > "+article.recommend);
                //  $log.debug("State > "+article.state);
                    articleList.push(article);
            });


            $articlelist.data = articleList;
            $articlelist.totalItems = response.data.size;
            $articlelist.numberOfPages = Math.ceil(response.data.size/$articlelist.perPage) || 1;
      });
    };


    // $articlelist.$watchCollection('data', function (newValue,oldValue) {
    //   $log.debug(newValue);
    //   $log.debug(oldValue);
    // });

    /**
     * Pagination
     */

     $articlelist.startItem = 0;
     $articlelist.currentPage = 1;
     $articlelist.perPage = 10; //Elements by Page
     $articlelist.numberOfPages = 1;

      $articlelist.totalItems = 0;
      $articlelist.maxSizeItems = 10; // Numbers of Pages

      if($scope.source)
      {
        $articlelist.data = $scope.source.articlelist.results;
        $articlelist.mcategories = $scope.source.categories.results;

        $articlelist.totalItems = $scope.source.articlelist.size;
        $articlelist.numberOfPages =
            Math.ceil($articlelist.totalItems/ArticleListFactory._params().perPage) || 1;
      }

      $articlelist.startfrom = function(){
        return ($articlelist.perPage * $articlelist.currentPage)-($articlelist.perPage);
      };

      $articlelist.pageChanged = function() {
        $log.log('Page changed to: ' + $articlelist.currentPage );
        $log.log('Item: ' + $articlelist.startfrom()  );

        $articlelist.getNextArticleData($articlelist.startfrom());
      };


    $articlelist.getNextArticleData = function(startValue){
        $log.debug({
          'skip' : startValue,
          'kind' : $articlelist.props.kind,
          'limit':$articlelist.perPage
        });
      $q.when(ArticleListFactory.getArticles(
            {
              'skip' : startValue,
              'kind' : $articlelist.props.kind,
              'limit':$articlelist.perPage
            }))
          .then(function(response){
              $log.debug(response.data.results);
              var articleList = [];
              angular.forEach( response.data.results, function(article) {
                        articleList.push(article);
              });
              $articlelist.data = articleList;
          })
          .catch(function (err) {
              $log.error(err.stack);
          });
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

    $articlelist.setCreatorList = function(creator)
    {
      $articlelist.props = {
        'kind': 'normal',
        'limit': $articlelist.perPage,
        'creator': creator.name
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.recommend = false;
      $articlelist.normal = true;
      $articlelist.currentPage = 1;
    };

    $articlelist.setCategoryList = function(category)
    {
      $articlelist.props = {
        'kind': 'normal',
        'limit': $articlelist.perPage,
        'category': category.name
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.recommend = false;
      $articlelist.normal = true;
      $articlelist.currentPage = 1;
    };

    $articlelist.isSecure = function(articleID)
    {
    return  ArticleListFactory.isSecure(articleID)
      .then(function(data){
        console.log(data);
        return true;
      })
      .catch(function(err){
        return false;
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
         .controller('ArticleListCtrl',ArticleListCtrl);
        //  .controller('ModalCtrl',ModalCtrl);
})();
