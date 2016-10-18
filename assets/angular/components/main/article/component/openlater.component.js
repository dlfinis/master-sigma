(function () {
  'use strict';
  function ScraperFactory($log,$resource){
    return $resource('scraper/?url=:url', {url:'@url'});
  }
  function ModalBaseFactory($http,$log){
    return {
      setVisit: function(article,time)
      {
        var prms = {};
        prms.articleID = article.id;
        prms.visitTime = time;
        $http.post('api/visit/create',prms)
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


    $uibModalInstance.closed.then(function(){
      $log.debug('- Close Modal');
      $uibModalInstance.dismiss('close');
    });

    $modal.diffTime = function(){
      var diff = (new Date() - $modal.startTime)/(1000); //segs
      return Math.round(diff);
    };

    $modal.close = function(){
      $log.debug($modal.diffTime());
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

  function OpenLaterCtrl($log,$window,ScraperFactory,ModalFactory)
  {
    var $openlater = this;
    $openlater.openModal = function (article)
    {
      var $modalInstance = ModalFactory.getModal(article);

      $modalInstance.rendered.then(function (){
        $log.debug('-Rendered Modal');
      });

      $modalInstance.opened.then(function (){
        $log.debug('-Opened Modal');
        if(!angular.isUndefined($window.FB.Canvas))
          $window.FB.Canvas.getPageInfo(
            function(info) {
              // Get the document offset of FB iFrame: FB scrollTop - FB offsetTop = offsetTop canvas
              var offset = info.scrollTop - info.offsetTop;

              // Get the window viewport height of FB iFrame: FB clientHeight - FB offsetTop
              var viewportHeight = info.clientHeight - info.offsetTop;

              // cache your dialog element
              var $dialog = angular.element(document.getElementsByClassName('modal-dialog'));

              // now set your dialog position
              var positionWindow = (offset  + (viewportHeight/2)) - ($dialog.prop('offsetHeight')/2);
              var styles = {
                'top' : positionWindow+'px'
              };
              $dialog.css( styles );
            });
      });

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
         .directive('openlater', function( partial,$log){
           return {
             restrict: 'AE',
             scope: {
               source: '=',
               lbl: '@'
             },
             controller: 'OpenLaterCtrl',
             controllerAs: '$openlater',
             templateUrl: partial.main.article+'tpl/openlater.cmp.html',
             link : function (scope, element, attrs, controller) {
               element.bind('click', function(event){
                 $log.debug('+ Open Site');
                 $log.debug(scope.source);
                 controller.openModal(scope.source);
               });
             }
           };
         });
})();
