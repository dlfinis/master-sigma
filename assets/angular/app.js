(function () {

  angular.module('app', ['angular-loading-bar',
                         'LocalStorageModule',
                         'ngRoute',
                         'ngSanitize',
                         'ngAnimate',
                         'ngOnload',
                         'angularLazyImg',
                         'ui.bootstrap',
                         'ui.select',
                         'ngResource',
                         'ngFacebook',
                         'app.core',
                         'app.main',
                         'app.config'
                       ])
  .config([ 'INIT',
            'KEYS',
            '$routeProvider',
            '$logProvider',
            '$SessionProvider',
            '$compileProvider',
            '$facebookProvider',
            'cfpLoadingBarProvider',
            'localStorageServiceProvider',
  function( INIT,
            KEYS,
            $routeProvider,
            $logProvider,
            $SessionProvider,
            $compileProvider,
            $facebookProvider,
            cfpLoadingBarProvider,
            localStorageServiceProvider) {

    if (!location.host.match(INIT.development)) {
      $compileProvider.debugInfoEnabled(false);
      $logProvider.debugEnabled(false);
    }

    //Set Facebook API configuration
    $facebookProvider.setAppId(KEYS.fbClientID);

    // Remove loading bar spinner
    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider.when('/',{template:'<home></home>'});
    $routeProvider.when('/home', {template:'<home></home>'});
    $routeProvider.when('/wall',
      {
        template: '<articlelist source="_source"></articlelist>',
        resolve:{
          _source: function(ArticleListFactory,$timeout){
            return ArticleListFactory._source_init();
          }
        },
        controller: function($scope, _source){
          $scope._source = _source;
        }
      });
    $routeProvider.when('/registry/article', { template: '<rarticle></rarticle>' });
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>' });
    $routeProvider.when('/logout', {
      resolve: {
        load: function (AuthFactory) {
          return AuthFactory.logout();
        }
      }
    });
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  /*CONFIG*/
  .run(function ($rootScope,$location,$route,$timeout,$log,FontLoader,FBLoader, cfpLoadingBar, AuthFactory ,CheckRoutingFactory, AUTH_EVENTS,KEYS) {
    // Load the facebook SDK asynchronously
    FBLoader.setScript();
    //Load fonts asynchronously
    FontLoader.setFonts();

    $rootScope.isAppLoading = true;
    $rootScope.startTime = new Date();
    // App is loading, so set isAppLoading to true and start a timer

    // Start loading bar for app loading
    cfpLoadingBar.start();

    var enable = ['','/','/home','/logout'];
    $rootScope.$on('$routeChangeStart', function (event, next) {
      var path = $location.path();
      if(enable.indexOf(path) === -1)
      {
        $log.debug('+ Check Policie >',$location.path());

        AuthFactory.isAuthenticated().then(function (response) {
          $log.debug('+ IS AUTH',response);
          if(!response)
          {
            event.preventDefault();
            CheckRoutingFactory.notAuth();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }else{
            return;
          }
        });
      }
      else {
        $log.debug('+ Enable Routes ',$location.path());
      }
    });
  });
})();
