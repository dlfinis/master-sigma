(function () {
  'use strict';

  function ModalFactory($http,$httpParamSerializer,$uibModal,partial){
    return {
            getModal:function(article){
              return $uibModal.open(
              {
                  templateUrl: partial.main.article+'tpl/modal.cmp.html',
                  controller: 'ModalCtrl',
                  size: 'lg',
                  resolve: {
                    article: function(){
                      return article;
                    }
                  },
                  // backdrop: 'static'
              });
            },
            getModalRedirect:function(url){
              return $uibModal.open(
              {
                  templateUrl: partial.main.article+'tpl/modal.redirect.cmp.html',
                  controller: 'ModalRedirectCtrl',
                  resolve: {
                    url: function(){
                      return url;
                    }
                  },
                  // backdrop: 'static'
              });
            }
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
      }, 4000);
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
  }

  function ModalRedirectCtrl($scope,$log,$sce,$window,$timeout,$uibModalInstance,url){
      $scope.url = url;
      $timeout(function() {
            $log.debug('> Redirect');

            var site = $window.open('about:blank', '_blank');
            site.document.write('Cargando información...');
            site.location.href = $scope.url;

        $uibModalInstance.dismiss('cancel');
      }, 1750);
  }

  function OpenLaterCtrl($scope,ArticleListFactory,ModalFactory)
  {
    var $openlater = this;
    $openlater.isSecure = function (articleID){
        return ArticleListFactory.isSecure(articleID);
    };

    $openlater.openModal = function (article)
    {
        var $modalInstance = ModalFactory.getModal(article);

        $modalInstance.result.then(function (ops){
            $log.debug("Options Modal:",JSON.stringify(ops));
        },
         function () {
           $log.debug('Modal dismissed at: ' + new Date());
        }
        );

    };

    $openlater.openModalRedirect = function (url)
    {
        var $modalInstance = ModalFactory.getModalRedirect(url);
    };
}
  angular.module('app.main.article.openlater',['app.config'])
         .factory('ModalFactory',ModalFactory)
         .controller('ModalCtrl',ModalCtrl)
         .controller('ModalRedirectCtrl',ModalRedirectCtrl)
         .controller('OpenLaterCtrl',OpenLaterCtrl)
         .directive('openlater', function( partial,$log,$q){
           return {
               restrict: 'AE',
               scope: {
                 source: "="
               },
               controller: 'OpenLaterCtrl',
               controllerAs: '$openlater',
               templateUrl: partial.main.article+'tpl/openlater.cmp.html',
               link : function (scope, element, attrs, controller) {
                var _isSecure = false;

                //  $q.when(controller.isSecure(scope.source.id)).then(function(secure){
                //    $log.debug('isSecure >'+secure.data);
                //     _isSecure = secure.data;
                //  });
                 controller.isSecure(scope.source.id).then(function(secure){
                   $log.debug('isSecure >'+secure.data);
                    _isSecure = secure.data;
                 });

                 scope.opensite = function () {

                   if(!_isSecure)
                   {
                     controller.openModal(scope.source);
                   }else {
                     controller.openModalRedirect(scope.source.url);
                   }
                 };

               }
           };
         });

})();
