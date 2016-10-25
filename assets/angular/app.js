(function () {

  angular.module('app', ['angular-loading-bar',
                         'LocalStorageModule',
                         'ngRoute',
                         'ngSanitize',
                         'ngAnimate',
                         'ngOnload',
                         'angularLazyImg',
                         'smart-table',
                         'ui.bootstrap',
                         'ui.select',
                         'ngResource',
                         'ngFacebook',
                         'ngFileUpload',
                         'ngImgCrop',
                         'app.core',
                         'app.main',
                         'app.config',
                         'app.fb.config'
                       ])
  .config([ 'INIT',
            'FB',
            '$httpProvider',
            '$routeProvider',
            '$locationProvider',
            '$logProvider',
            '$SessionProvider',
            '$compileProvider',
            '$facebookProvider',
            'lazyImgConfigProvider',
            'cfpLoadingBarProvider',
  function( INIT,
            FB,
            $httpProvider,
            $routeProvider,
            $locationProvider,
            $logProvider,
            $SessionProvider,
            $compileProvider,
            $facebookProvider,
            lazyImgConfigProvider,
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

    lazyImgConfigProvider.setOptions({
      // offset: 250, // how early you want to load image (default = 100)
      // errorClass: 'error', // in case of loading image failure what class should be added (default = null)
      // successClass: 'success', // in case of loading image success what class should be added (default = null)
      onError: function(image){
        console.log('- Img not found:',image.src);
        angular.element( image.$elem ).attr('src','images/submarine.png');

      } // function fired on loading error
      // onSuccess: function(image){}, // function fired on loading success
      // container: angular.element(scrollable) // if scrollable container is not $window then provide it here
    });

    //Set Facebook API configuration
    // $facebookProvider.setAppId(FB.clientID);
    // $facebookProvider.setVersion('v2.5');
    $facebookProvider.setPermissions(FB.permissions);
    console.log(document.location.pathname);
    switch (document.location.pathname) {
      case '/zeus/':
        $facebookProvider.setAppId(FB.clientID.zeus);
        break;
      case '/ares/':
        $facebookProvider.setAppId(FB.clientID.ares);
        break;
      case '/apolo/':
        $facebookProvider.setAppId(FB.clientID.apolo);
        break;
      default: $facebookProvider.setAppId(FB.clientID.general);

    }
    // $facebookProvider.setAppId(FB.clientID);
    $facebookProvider.setCustomInit({
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : false,  // parse XFBML
      version    : 'v2.5'
    });
    // Remove loading bar spinner
    // cfpLoadingBarProvider.includeSpinner = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div style="margin:20% 0 0 50%;"><span class="fa fa-spinner fa-pulse fa-3x"></div>';
    // cfpLoadingBarProvider.spinnerTemplate = '<div style="text-align: center; left: 0px; height: 100%; width: 100%; z-index: 1050; color: rgb(52, 69, 87); top: 0px; background: rgb(52, 69, 87) none repeat scroll 0% 0%; opacity: 0.45; position: fixed;"><img style="width: 100%;" src="/images/spinner.gif"></div>';
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // var body = document.body, html = document.documentElement;
    // var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar" \
    style="position: absolute; top: 0px; left: 0px; background-color: rgb(52, 69, 87); \
    color: #EAEAEA; height: '+(5000) +'px; width: 100%; z-index: 1040; vertical-align: middle; \
    opacity: 0.55; text-align: center; padding-top: 5px;">\
    <span class="fa fa-refresh fa-spin fa-3x fa-fw" style="vertical-align: middle;"></span>\
    <div style="text-align: center; color: rgb(255, 245, 245); font-weight: bold; display: inline-block;">\
    Procesando información...</div>\
    </div>';

    //Define routes
    $routeProvider.when('/',{template:'<home></home>'});
    $routeProvider.when('/home', {template:'<home></home>'});
    $routeProvider.when('/wall',{template:'<wall><wall/>',secure:true});
    $routeProvider.when('/legal/policy',{template:'<policy></policy>'});
    $routeProvider.when('/legal/terms',{template:'<terms></terms>'});
    $routeProvider.when('/registry/list', { template: '<rcontent-list></rcontent-list>',secure:true});
    $routeProvider.when('/registry/content/:id?', { template: '<rcontent></rcontent>',secure:true});
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>',secure:true});
    $routeProvider.when('/testpage/:tid?', { template: '<testpage></testpage>' });
    $routeProvider.when('/testpage/:tid?', { template: '<testpage></testpage>' });
    $routeProvider.when('/404', { templateUrl: '404.html' });
    $routeProvider.when('/500', { templateUrl: '500.html' });
    $routeProvider.when('/error', { templateUrl: 'error.html' });
    // $routeProvider.when('/login', {
    //   resolve: {
    //     load: function ($facebook) {
    //       return $facebook.login().then(function(response) {
    //         console.log(response);
    //       });
    //     }
    //   }
    // });
    $routeProvider.when('/logout', {
      resolve: {
        load: function ($log,AuthFactory,CheckRoutingFactory) {
          return AuthFactory.logout().then(function (response) {
            if(response)
              CheckRoutingFactory.notAuth();
          })
          .catch(function (err) {
            $log.error(err);
          });
        }
      }
    });
    $routeProvider.otherwise({redirectTo: '/'});
    // use the HTML5 History API
    // Not possible, half Sails & Angular
    // $locationProvider.html5Mode(true);
  }])
  /*CONFIG*/
  .run(function ($rootScope,$location,$route,$timeout,$log,FontLoader,FBLoader, cfpLoadingBar, AuthFactory ,CheckRoutingFactory, AUTH_EVENTS) {
    // Load the facebook SDK asynchronously
    FBLoader.setScript();

    //Set dimensions on Canvas
    $rootScope.$on('fb.load', function(e, FB) {
      $log.debug('+ Load FB');
      FB.Canvas.setAutoGrow();
      FB.Canvas.setSize({height:800});
      setTimeout('FB.Canvas.setAutoGrow()',700);
    });

    //Load fonts asynchronously
    FontLoader.setFonts();

    // Start loading bar for app loading
    //cfpLoadingBar.start();

    //Define enable routes without logging
    // var enableRoutes = [
    //   '',
    //   '/',
    //   '/home',
    //   '/registry/category',
    //   '/logout',
    //   '/testpage',
    //   '/testpage/',
    //   '/legal/policy',
    //   '/legal/terms'];
    //
    //   var initRoutes = [
    //     '/',
    //     '/home'
    //   ];

    $rootScope.$on('$routeChangeStart', function (event,next) {
      $rootScope.isAppLoading = true;
      $rootScope.startTime = new Date();

      if (next && next.$$route && next.$$route.secure) {
        $log.debug('+ Check Policie >',$location.path());
        $rootScope.isReadyPref = false;

        AuthFactory.isAuthenticated().then(function (response) {
          $log.debug('+ IS AUTH',!!response);
          if(!response)
          {
            $rootScope.$evalAsync(function () {
              CheckRoutingFactory.notAuth();
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
              // event.preventDefault();
            });
          }
          else{
            return;
          }
        })
        .catch(function (err) {
          $log.error(err);
          $rootScope.$evalAsync(function () {
            CheckRoutingFactory.notAuth();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            // event.preventDefault();
            // return;
          });
        });
      }else{
        $rootScope.isReadyPref = true;
        $log.debug('+ Enable route ',$location.path());
        // return;
      }


      // // App is loading, so set isAppLoading to true and start a timer
      // // Prev and Next route
      // var path = $location.path();
      // if(enableRoutes.indexOf(path) === -1)
      // {
      //   $log.debug('+ Check Policie >',$location.path());
      //   $rootScope.isReadyPref = false;
      //
      //   AuthFactory.isAuthenticated().then(function (response) {
      //     $log.debug('+ IS AUTH',response);
      //     if(!response)
      //     {
      //       CheckRoutingFactory.notAuth();
      //       $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      //       event.preventDefault();
      //     }else{
      //       return;
      //     }
      //   }).catch(function (err) {
      //     $log.error(err);
      //     CheckRoutingFactory.notAuth(event);
      //     $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      //     event.preventDefault();
      //   });
      // }
      // else {
      //   // if(initRoutes.indexOf(path) > -1) AuthFactory.logout(); //Clean session in initRoutes
      //   $rootScope.isReadyPref = true;
      //   $log.debug('+ Enable route ',$location.path());
      // }
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
