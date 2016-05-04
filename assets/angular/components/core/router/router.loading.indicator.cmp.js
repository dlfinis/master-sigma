(function() {
    'use strict';
    angular.module('app.core.router.loading', [])
    .directive('routeLoadingIndicator',function ($rootScope,$log,$timeout) {
      return {
        restrict: 'EA',
        template: "<div class='col-lg-12 fade-it loading' ng-if='isRouteLoading'>"+
                  "<img class='' src='/images/spinner-2.gif'/>"+
                  "</div>",
        link: function(scope, elem, attrs) {
            scope.isRouteLoading = false;
            $rootScope.$on('$routeChangeStart', function() {
              $log.debug("Routing Start");
              scope.isRouteLoading = true;
              $timeout(function(){
                  $log.debug("Routing Starting");
              },2000);
            });
            $rootScope.$on('$routeChangeSuccess', function() {
              scope.isRouteLoading = false;
              $log.debug("Routing End");
            });
        }
       };
    });
})();
