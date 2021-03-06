(function(){
  'use strict';

  function ArticleListCtrl($scope,$q,$sce,$log,$element,$timeout,$Session,ArticleListFactory,ModalBaseFactory)
  {

    var $articlelist = this;

    if($Session.getUser() && $Session.getUser() !== null)
      $articlelist.user = $Session.getUser();

    $articlelist.data = [];
    $articlelist.error = {};

    $articlelist.textSearchContent= '';

    $articlelist.mcategory = {};
    $articlelist.mcategories = [];

    $articlelist.queryParams = '';
    $articlelist.pagination = {};
    $articlelist.props = {};
    $articlelist.pagerData = false;

    var select_event_category;
    $element.querySelectorAll('#sort-category').bind('click mouseleave', function(event) {

      if(event.type === 'click') select_event_category = '';
      if(event.type === 'mouseout'
        && select_event_category === 'clear'
        && !$articlelist.mcategory.selected )
      {
        $timeout(function () {
          $log.debug('- Set Default List');
          $articlelist.setNormalList();
          select_event_category = '';
          event.preventDefault();
        }, 1250 );
      }

    });

    $articlelist.clear = function ($event, $select){
      //stops click event bubbling
      $event.stopPropagation();
      //to allow empty field, in order to force a selection remove the following line
      $select.selected = undefined;
      //reset search query
      $select.search = undefined;

      select_event_category = 'clear';
      //focus and open dropdown
      // $select.activate();
    };


    $articlelist.getCategories = function(){
      if(!$articlelist.mcategories)
        ArticleListFactory.getCategories().then(function(categories){
          $articlelist.mcategories = categories;
        });
    };

    $articlelist.onSelectCategory = function (item) {
      $articlelist.setCategoryList(item);
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
          $articlelist.perPage
        );

      });
    };

    /**
     * Pagination
     */

    $articlelist.startItem = 0;
    $articlelist.currentPage = 1;
    $articlelist.perPage = 10; //Elements by Page
    $articlelist.numberOfPages = 1;

    $articlelist.totalItems = 0;
    $articlelist.maxSizeItems = 10; // Numbers of Pages

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

      $articlelist.pagerData = true;

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
            $log.debug('+ GET Next Articles List Data ');
            $log.debug(response.data.results);
            if(response.data.results.length > 0) $articlelist.pagerData = false;
            else $articlelist.pagerData = true;
            $articlelist.data = response.data.results;
          })
          .catch(function (err) {
            $log.error(err.stack);
            $articlelist.pagerData = true;
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
      $articlelist.recommend = !$articlelist.normal;
      $articlelist.liked = !$articlelist.normal;
      $articlelist.shared = !$articlelist.normal;
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
      $articlelist.normal = !$articlelist.recommend;
      $articlelist.liked = !$articlelist.recommend;
      $articlelist.shared = !$articlelist.recommend;
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

    $articlelist.setMostLikedList = function()
    {
      $articlelist.props = {
        'kind': 'liked',
        'limit': $articlelist.perPage
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.liked = true;
      $articlelist.normal = !$articlelist.liked;
      $articlelist.recommend = !$articlelist.liked;
      $articlelist.shared = !$articlelist.liked;
      $articlelist.currentPage = 1;
    };

    $articlelist.setMostSharedList = function()
    {
      $articlelist.props = {
        'kind': 'shared',
        'limit': $articlelist.perPage
      };
      $articlelist.getArticles($articlelist.props);
      $articlelist.shared = true;
      $articlelist.normal = !$articlelist.shared;
      $articlelist.recommend = !$articlelist.shared;
      $articlelist.liked = !$articlelist.shared;
      $articlelist.currentPage = 1;
    };

    $articlelist.setVisit = function(article)
    {
      ModalBaseFactory.setVisit(article,1);
      article.visits = article.visits + 1;
      return false;
    };

    $articlelist.getTrustedResource = function(resource)
    {
      //exist url with protocol
      // console.log(resource);
      if(resource && resource.indexOf('://')>0)
        return $sce.trustAsResourceUrl(resource.substr(resource.indexOf('://')+1));
      return resource;
    };

    // Load data, init scope, etc.
    $articlelist.init = function init() {

      $log.debug('+ Init component articlelist');
      // if($Session.getUser())
      $q.when(ArticleListFactory._source_init(),function success(response) {
        $articlelist.setPagination(
            response.articlelist.results,
            response.articlelist.size,
            ArticleListFactory._params().perPage
          );

        $log.debug('+ Show component articlelist');
          //Hide Loader
        $articlelist.ok = true;

        $articlelist.normal = true;
        $articlelist.mcategories = response.categories.results;

      },function error(e) {
        // if(!$Session.getUser()) return;
        $log.error('- Error get contents',e);
        $articlelist.ok = true;
        $articlelist.error.init = true;
      });

    };

    $articlelist.init();
  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl);

})();
