(function() {
  'use strict';
  angular.module('app.core.router.loading', [])
    .directive('routeLoadingIndicator',function ($rootScope,$log,$timeout,cfpLoadingBar) {
      return {
        restrict: 'EA',
        template: '<div class="col-lg-12 loading" ng-class="{\'fade-out\':isReady}">'+
                  '<img src="/images/spinner-2.gif"/>'+
                  '</div>',
        link: function(scope, element, attrs) {
          var diff,
            timeoutPromise;

          // Subscribe to broadcast of $stateChangeStart state event via AngularUI Router
          $rootScope.$on('$routeChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
            // If app is not already loading (since we started the loading bar in the config with the isAppLoading)
            $log.debug('+ Loader $routeChangeStart');
            if (!$rootScope.isAppLoading) {
              // $timeout returns a deferred promise to execute by the defined time of 400ms
              // set isAppRouting true and start loading bar
              // if route success or error takes 400ms or greater, timeout will execute
              timeoutPromise = $timeout(function () {
                $rootScope.isAppRouting = true;
                cfpLoadingBar.start();
              }, 400);
            }
          });

          // Subscribe to broadcast of $routeChangeSuccess state event via AngularUI Router
          $rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
            // Cancel timeout promise (if it exists) from executing, if route success occurs before the 400ms elapses
            if (timeoutPromise) {
              $timeout.cancel(timeoutPromise);
            }

            // Logic to handle elapsed time of app loading phase else handle app routing
            if ($rootScope.isAppLoading) {
              $log.debug('+ Loader $routeChangeSucess');
              // Find the elapsed difference between the present time and the startTime set in our config
              diff = new Date() - $rootScope.startTime;

              // If 800ms has elapsed, isAppLoading is set to false
              // else create a timeout to set isAppLoading to false after 800ms has elapsed since the startTime was set
              if (diff > 800) {
                $rootScope.isAppLoading = false;
                cfpLoadingBar.complete();
              } else {
                $timeout(function () {
                  $rootScope.isAppLoading = false;
                  cfpLoadingBar.complete();
                }, 800 - diff);
              }

            } else if ($rootScope.isAppRouting) {
              // App finished routing, complete loading bar
              $rootScope.isAppRouting = false;
              cfpLoadingBar.complete();
            }

          });
        }
      };
    });
})();
