(function () {
  'use strict';
  function ScraperFactory($log,$resource){
    return $resource('/scraper/?url=:url', {url:'@url'});
  }
  function ModalBaseFactory($http,$log){
    return {
      setVisit: function(article,time)
            {
        var prms = {};
        prms.articleID = article.id;
        prms.visitTime = time;
        $http.post('/api/visit/create',prms)
        .then(function(record)
        {
          $log.debug(record.data);
        })
        .catch(function (err) {
          $log.error(err.stack);
        });
      }
    };
  }
  function ModalFactory($http,$log,$httpParamSerializer,$uibModal,partial){
    return {
      getModal:function(article){
        return $uibModal.open(
          {
            templateUrl: partial.main.article+'tpl/modal.cmp.html',
            controller: 'ModalCtrl',
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


  function ModalCtrl($scope,$log,$q,$sce,$timeout,$uibModalInstance,ScraperFactory,ModalBaseFactory,article){
    var $modal = $scope;

    $modal.article = article;
    $modal.currentUrl = $sce.trustAsResourceUrl(article.url.substr(article.url.indexOf('://')+1));
    $modal.visit = 0;
    $modal.sitePath;

    $q.when(ScraperFactory.get({'url':article.url}).$promise,
      function(response){
        $modal.sitePath = $sce.trustAsResourceUrl('/website'+response.previewPath);
      },
      function(err){
        $log.warn(err);
        $modal.siteError = true;
      });

    $uibModalInstance.opened.then(function(){
      $modal.startTime = new Date();
      $timeout(function () {
        $modal.exit = true;
      }, 4000);
    });

    $modal.diffTime = function(){
      var diff = (new Date() - $modal.startTime)/(1000); //segs
      return Math.round(diff);
    };

    $modal.close = function(){
      if($modal.diffTime() > 15)
        {
        $log.debug('Time:',$modal.diffTime());
        ModalBaseFactory.setVisit(article,$modal.diffTime());
        $uibModalInstance.close({visit:true,article:article.id});
        article.visits = article.visits + 1;
      }
      $uibModalInstance.dismiss('cancel');
    };
  }

  function OpenLaterCtrl($scope,$log,ScraperFactory,ModalFactory)
  {
    var $openlater = this;
    $openlater.openModal = function (article)
    {
      var $modalInstance = ModalFactory.getModal(article);

      $modalInstance.result.then(function (ops){
        $log.debug('Options Modal:',JSON.stringify(ops));
      },
         function () {
           $log.debug('Modal dismissed at: ' + new Date());
         }
        );
    };
  }

  angular.module('app.main.article.openlater',['app.config'])
         .factory('ScraperFactory',ScraperFactory)
         .factory('ModalBaseFactory',ModalBaseFactory)
         .factory('ModalFactory',ModalFactory)
         .controller('ModalCtrl',ModalCtrl)
         .controller('OpenLaterCtrl',OpenLaterCtrl)
         .directive('openlater', function( partial,$log,$q){
           return {
             restrict: 'AE',
             scope: {
               source: '='
             },
             controller: 'OpenLaterCtrl',
             controllerAs: '$openlater',
             templateUrl: partial.main.article+'tpl/openlater.cmp.html',
             link : function (scope, element, attrs, controller) {
               element.bind('click', function(e){
                 $log.debug(scope.source);
                 controller.openModal(scope.source);
               });
             }
           };
         });
})();
