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
                         'ngFileUpload', 
                         'ngImgCrop',
                         'app.core',
                         'app.main',
                         'app.config'
                       ])
  .config([ 'INIT',
            'KEYS',
            '$httpProvider',
            '$routeProvider',
            '$logProvider',
            '$SessionProvider',
            '$compileProvider',
            '$facebookProvider',
            'cfpLoadingBarProvider',
  function( INIT,
            KEYS,
            $httpProvider,
            $routeProvider,
            $logProvider,
            $SessionProvider,
            $compileProvider,
            $facebookProvider,
            cfpLoadingBarProvider ) {

    //Config enviroments
    if (location.host.match(INIT.production.domain)) {

      if(INIT.production.logging === 'verbose')
      {
        $compileProvider.debugInfoEnabled(true);
        $logProvider.debugEnabled(true);
      }
      else {
        $compileProvider.debugInfoEnabled(false);
        $logProvider.debugEnabled(false);
      }

    }
    if (location.host.match(INIT.development.domain)) {

      if(INIT.development.logging === 'verbose')
      {
        $compileProvider.debugInfoEnabled(true);
        $logProvider.debugEnabled(true);
      }
      else {
        $compileProvider.debugInfoEnabled(false);
        $logProvider.debugEnabled(false);
      }

    }

    //Interceptor of Http Requests
    $httpProvider.interceptors.push('apiInterceptor');

    //Set Facebook API configuration
    $facebookProvider.setAppId(KEYS.fbClientID);

    // Remove loading bar spinner
    // cfpLoadingBarProvider.includeSpinner = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div style="margin:20% 0 0 50%;"><span class="fa fa-spinner fa-pulse fa-3x"></div>';
    // cfpLoadingBarProvider.spinnerTemplate = '<div style="text-align: center; left: 0px; height: 100%; width: 100%; z-index: 1050; color: rgb(52, 69, 87); top: 0px; background: rgb(52, 69, 87) none repeat scroll 0% 0%; opacity: 0.45; position: fixed;"><img style="width: 100%;" src="/images/spinner.gif"></div>';
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<div style="position: absolute; top: 0px; left: 0px; background-color: rgb(52, 69, 87); color: #EAEAEA; height: 9999px; width: 100%; z-index: 1040; vertical-align: middle; opacity: 0.55; text-align: center; padding-top: 5px;"><span class="fa fa-refresh fa-spin fa-3x fa-fw" style="vertical-align: middle;"></span><div style="text-align: center; color: rgb(255, 245, 245); font-weight: bold; display: inline-block;">Procesando información...</div></div>';

    //Define routes
    $routeProvider.when('/',{template:'<home></home>'});
    $routeProvider.when('/home', {template:'<home></home>'});
    $routeProvider.when('/wall',{template:'<articlelist></articlelist>'});
    $routeProvider.when('/legal/policy',{template:'<policy></policy>'});
    $routeProvider.when('/legal/terms',{template:'<terms></terms>'});
    $routeProvider.when('/registry/content', { template: '<rcontent></rcontent>' });
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>' });
    $routeProvider.when('/testpage', { template: '<testpage></testpage>' });
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
  .run(function ($rootScope,$location,$route,$timeout,$log,FontLoader,FBLoader, cfpLoadingBar, AuthFactory ,CheckRoutingFactory, AUTH_EVENTS) {
    // Load the facebook SDK asynchronously
    FBLoader.setScript();

    //Set dimensions on Canvas
    $rootScope.$on('fb.load', function(e, FB) {
      $log.debug('+ Init FB');
      FB.Canvas.setAutoGrow();
      FB.Canvas.setSize({height:800});
      setTimeout('FB.Canvas.setAutoGrow()',700);
    });

    //Load fonts asynchronously
    FontLoader.setFonts();

    // Start loading bar for app loading
    //cfpLoadingBar.start();


    //Define enable routes without logging
    var enableRoutes = [
      '',
      '/',
      '/home',
      '/registry/content',
      '/registry/category',
      '/logout',
      '/testpage',
      '/legal/policy',
      '/legal/terms'];


    $rootScope.$on('$routeChangeStart', function (event) {
      $rootScope.isAppLoading = true;
      $rootScope.startTime = new Date();
      // App is loading, so set isAppLoading to true and start a timer

      var path = $location.path();
      if(enableRoutes.indexOf(path) === -1)
      {
        $log.debug('+ Check Policie >',$location.path());
        $rootScope.isReadyPref = false;

        AuthFactory.isAuthenticated().then(function (response) {
          $log.debug('+ IS AUTH',response);
          if(!response)
          {
            CheckRoutingFactory.notAuth();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            event.preventDefault();
          }else{
            return;
          }
        });
      }
      else {
        $rootScope.isReadyPref = true;
        $log.debug('+ Enable route ',$location.path());
      }
    });
  })
  .directive('resolveLoader', function($rootScope, $timeout) {

    return {
      restrict: 'E',
      replace: true,
      template: '',
      link: function(scope, element) {

        $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
          if (previousRoute) return;

          $timeout(function() {
            element.removeClass('ng-hide');
          });

        });

        $rootScope.$on('$routeChangeSuccess', function() {
          element.addClass('ng-hide');
        });

      }
    };
  });
})();
