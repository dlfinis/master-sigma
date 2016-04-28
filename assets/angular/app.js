(function () {

  angular.module('app', ['angular-loading-bar',
                         'ngRoute',
                         'ngSanitize',
                         'ngAnimate',
                         'ngOnload',
                         'angularLazyImg',
                         'ui.bootstrap',
                         'ui.select',
                         'app.core',
                         'app.main',
                         'app.config'
                       ])
  .config(['INIT','$routeProvider','$logProvider','cfpLoadingBarProvider',function(INIT,$routeProvider,$logProvider,cfpLoadingBarProvider) {

    $logProvider.debugEnabled(INIT.debug);

    // Remove loading bar spinner
    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider.when('/', {   resolve: {

                                            load: function (CheckRoutingFactory) {
                                                  return CheckRoutingFactory.isAuthenticated();
                                                  }
                                  },
    });

    $routeProvider.when('/home', {  template:'<home></home>' });
    $routeProvider.when('/wall', { template: '<wall></wall>' });
    $routeProvider.when('/articlelist', { template: '<articlelist></articlelist>' });

    $routeProvider.when('/test', { template: '<test></test>' });
    $routeProvider.when('/testpage', { template: '<testpage></testpage>' });
    $routeProvider.when('/registry', { template: '<registry></registry>' });
    $routeProvider.when('/registry/article', { template: '<rarticle></rarticle>' });
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>' });
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  /*CONFIG*/
  .run(function ($rootScope,$location,$route,$timeout,cfpLoadingBar,ShareFactory,KEYS) {

      $rootScope.config = {};
      $rootScope.config.app_url = $location.url();
      $rootScope.config.app_path = $location.path();
      $rootScope.layout = {};
      $rootScope.layout.loading = false;
      // App is loading, so set isAppLoading to true and start a timer
      $rootScope.isAppLoading = true;
      $rootScope.startTime = new Date();

      ShareFactory.init(KEYS.fbClientID);

      var diff,timeoutPromise;
// Subscribe to broadcast of $stateChangeStart state event via AngularUI Router
$rootScope.$on('$routeChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
  console.log('$stateChangeStart');
  // If app is not already loading (since we started the loading bar in the config with the isAppLoading)
  if ($rootScope.isAppLoading) {
    console.log("isAppLoading",$rootScope.isAppLoading);
    timeoutPromise = $timeout(function () {
        //  $rootScope.isAppRouting = true;
        //  $rootScope.isAppLoading = true;
         cfpLoadingBar.start();
    }, 400);

  }

});

// Subscribe to broadcast of $stateChangeSuccess state event via AngularUI Router
$rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
  // Cancel timeout promise (if it exists) from executing, if route success occurs before the 400ms elapses
  if (timeoutPromise) {
    $timeout.cancel(timeoutPromise);
  }
  // Logic to handle elapsed time of app loading phase else handle app routing
  if ($rootScope.isAppLoading) {
    // Find the elapsed difference between the present time and the startTime set in our config
    diff = new Date() - $rootScope.startTime;
    // If 800ms has elapsed, isAppLoading is set to false
    // else create a timeout to set isAppLoading to false after 800ms has elapsed since the startTime was set
    if (diff > 800) {
      $rootScope.startFade = true;
      cfpLoadingBar.complete();
      $rootScope.isAppLoading = false;
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



      // Start loading bar for app loading

      //
      // $rootScope.$on('$routeChangeStart', function () {
      //     console.log('$routeChangeStart');
      //     cfpLoadingBar.start();
      //     // //show loading gif
      //     // $timeout(function(){
      //     //   $rootScope.layout.loading = true;
      //     // });
      // });
      // $rootScope.$on('$routeChangeSuccess', function () {
      //     console.log('$routeChangeSuccess');
      //     cfpLoadingBar.complete();
      //
      //     // //hide loading gif
      //     // $timeout(function(){
      //     //   $rootScope.layout.loading = false;
      //     // }, 500);
      // });
      // $rootScope.$on('$routeChangeError', function () {
      //
      //     //hide loading gif
      //     alert('wtff');
      //     $rootScope.layout.loading = false;
      //
      // });
  });

})();
