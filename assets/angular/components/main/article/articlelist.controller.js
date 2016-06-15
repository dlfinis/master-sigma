(function(){
  'use strict';

  function ArticleListCtrl($scope,$q,$sce,$log,$rootScope,ArticleListFactory,ModalBaseFactory)
  {
    var $articlelist = this;

    $articlelist.data = [];

    $articlelist.textSearchContent= '';

    $articlelist.mcategory = {};
    $articlelist.mcategories = [];

    $articlelist.queryParams = '';
    $articlelist.pagination = {};
    $articlelist.props = {};

    $scope.$on('$viewContentLoaded', function () {
      console.log('+ Ready Wall Document');
      // $log.debug('+ Ready Document');
      // $rootScope.isOK = true;
      $rootScope.isReady = true;
      // angular.element().addClass('fade-out');
    });

    angular.element(document).ready(function () {
      console.log('+ Ready Wall Document');
      // $log.debug('+ Ready Document');
      // $rootScope.isOK = true;
      $rootScope.isReady = true;
    });

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
      if(!$articlelist.mcategories)
        ArticleListFactory.getCategories().then(function(categories){
          $articlelist.mcategories = categories;
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

        $articlelist.setPagination(
          articleList,
          response.data.size,
          Math.ceil(response.data.size/$articlelist.perPage) || 1
        );

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

    $articlelist.setPagination = function (list,size,limit) {
      $articlelist.data = list;
      $articlelist.totalItems = size;
      $articlelist.numberOfPages = Math.ceil(size/limit) || 1;
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

    $articlelist.setVisit = function(article)
    {
      ModalBaseFactory.setVisit(article,1);
      article.visits = article.visits + 1;
      return false;
    };

    $articlelist.isSecure = function(articleID)
    {
      return  ArticleListFactory.isSecure(articleID)
      .then(function(data){
        return true;
      })
      .catch(function(err){
        return false;
      });
    };

    $articlelist.getTrustedResource = function(resource)
    {
      //exist url with protocol
      // console.log(resource);
      if(resource && resource.indexOf('://')>0)
        return $sce.trustAsResourceUrl(resource.substr(resource.indexOf('://')+1));
      return resource;
    };

    $articlelist.test = function test() {
      return 'Test';
    };
  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl);
        //  .controller('ModalCtrl',ModalCtrl);
})();
