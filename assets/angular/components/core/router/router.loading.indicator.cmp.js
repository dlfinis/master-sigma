(function() {
    'use strict';
    angular.module('app.core.router.loading', [])
    .directive('routeLoadingIndicator',function ($rootScope,$log,$timeout) {
      return {
        restrict: 'EA',
        template: "<div class='col-lg-12 loading' ng-if='isRouteLoading' ng-class='{fadeOut:!isRouteLoading}'>"+
                  "<img class='' src='/images/spinner-2.gif'/>"+
                  "</div>",
        link: function(scope, elem, attrs) {
            scope.isRouteLoading = false;
            $rootScope.$on('$routeChangeStart', function() {
              $log.debug("Routing Start");
              scope.isRouteLoading = true;
            });
            $rootScope.$on('$routeChangeSuccess', function() {
              // scope.isRouteLoading = false;
              $timeout(function(){
                  scope.isRouteLoading = false;
                  $log.debug("Routing End");
              },3500);
            });
        }
       };
    });
})();
