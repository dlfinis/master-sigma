(function () {
  'use strict';

  function ModalBaseFactory($http,$log){
    return {
            setVisit: function(article,time)
            {
              var prms = {};
              prms.articleID = article.id;
              prms.visitTime = time;
               $http.post('/api/visit/create',prms).then(function(record)
               {
                 $log.debug(record.data);
               }
              ).catch(function (err) {
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
                  size: 'lg',
                  resolve: {
                    article: function(){
                      return article;
                    }
                  },
                  backdrop: 'static'
              });
            },
            getModalRedirect:function(article){
              return $uibModal.open(
              {
                  templateUrl: partial.main.article+'tpl/modal.redirect.cmp.html',
                  controller: 'ModalRedirectCtrl',
                  resolve: {
                    article: function(){
                      return article;
                    }
                  },
                  // backdrop: 'static'
              });
            }
          };
  }


  function ModalCtrl($scope,$log,$sce,$timeout,$uibModalInstance,ModalBaseFactory,article){
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
        ModalBaseFactory.setVisit(article,$modal.diffTime());
        $uibModalInstance.close({visit:true,article:article.id});
        article.visits = article.visits + 1;
      }
      $uibModalInstance.dismiss('cancel');
    };
  }

  function ModalRedirectCtrl($scope,$log,$sce,$window,$timeout,$uibModalInstance,ModalBaseFactory,article){
      var $modal = $scope;
          $modal.url = article.url;
      $timeout(function() {
            $log.debug('> Redirect');
              ModalBaseFactory.setVisit(article,1);

            var site = $window.open('about:blank', '_blank');
                site.document.write('Cargando información...');
                site.location.href = $modal.url;

            article.visits = article.visits + 1;

        $uibModalInstance.dismiss('cancel');
      }, 3050);
  }

  function OpenLaterCtrl($scope,$log,ModalBaseFactory,ModalFactory)
  {
    var $openlater = this;
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

    $openlater.openModalRedirect = function (article)
    {
        var $modalInstance = ModalFactory.getModalRedirect(article);

        $modalInstance.result.then(function (ops){
            $log.debug("Options Modal:",JSON.stringify(ops));
        },
         function () {
           $log.debug('Modal dismissed at: ' + new Date());
        }
        );
    };
}
  angular.module('app.main.article.openlater',['app.config'])
         .factory('ModalBaseFactory',ModalBaseFactory)
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
                 $log.debug(scope.source);
                 scope.source.stats = {};
                 scope.$watch(
                                 "source.stats",
                                 function ( values ) {
                                     if(values && scope.source.stats.secure )
                                     {
                                       _isSecure =  scope.source.stats.secure;
                                     }
                                 }
                             );

                 scope.opensite = function () {
                   if(_isSecure)
                   {
                     controller.openModal(scope.source);
                   }else {
                     controller.openModalRedirect(scope.source);
                   }
                 };

               }
           };
         });

})();
