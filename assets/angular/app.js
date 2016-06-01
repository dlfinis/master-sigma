(function () {

  angular.module('app', ['angular-loading-bar',
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
  .config(['INIT','KEYS','$routeProvider','$logProvider','$compileProvider','$facebookProvider','cfpLoadingBarProvider',function(INIT,KEYS,$routeProvider,$logProvider,$compileProvider,$facebookProvider,cfpLoadingBarProvider) {

    if (!location.host.match(INIT.development)) {
      $compileProvider.debugInfoEnabled(false);
      $logProvider.debugEnabled(false);
      (function(){
        var _z = console;
        Object.defineProperty( window, 'console', {
      		                                                                                                                                                                get : function(){
      		                                                                if( _z._commandLineAPI ){
      			                                                            throw 'Sorry, Can\'t execute scripts!';
      		          }
      		                                                                return _z;
      		},
      		                                                                                                                                                                set : function(val){
      		                                                                _z = val;
      		}
        });
      })();
    }

    $facebookProvider.setAppId(KEYS.fbClientID);

    // Remove loading bar spinner
    cfpLoadingBarProvider.includeSpinner = false;

    // $routeProvider.when('/', {   resolve: {
    //                                     load: function (CheckRoutingFactory) {
    //                                           return CheckRoutingFactory.isOK();
    //                                           }
    //                           },
    // });
    // $routeProvider.when('/home', {  template:'<home></home>',
    //                                 resolve: {
    //                                     load: function (CheckRoutingFactory) {
    //                                           return CheckRoutingFactory.isOK();
    //                                           }
    //                                   }
    //                               });
    $routeProvider.when('/', {   resolve: {
      load: function (CheckRoutingFactory) {
        return CheckRoutingFactory.isOK();
      }
    }
    });
    // $routeProvider.when('/home', {  template:'<home></home>',
    //                                 resolve: {
    //                                     load: function (CheckRoutingFactory) {
    //                                           return CheckRoutingFactory.isOK();
    //                                           }
    //                                   }
    //                               });
    $routeProvider.when('/wall',
      {
        template: '<articlelist source="_source"></articlelist>',
        resolve:{
          _source: function(ArticleListFactory,$timeout){
            return $timeout(function () {
              return ArticleListFactory._source_init();
            }, 2000 );
          }
        },
        controller: function($scope, _source){
          $scope._source = _source;
        }
      }
      );
    $routeProvider.when('/registry/article', { template: '<rarticle></rarticle>' });
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>' });
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  /*CONFIG*/
  .run(function ($rootScope,$location,$route,$timeout,$log,FontLoader,FBLoader,cfpLoadingBar,CheckRoutingFactory,KEYS) {
      // Load the facebook SDK asynchronously
    FBLoader.setScript();
      //Load fonts asynchronously
    FontLoader.setFonts();

      // App is loading, so set isAppLoading to true and start a timer
    $rootScope.isAppLoading = true;
    $rootScope.startTime = new Date();

      // Start loading bar for app loading
    cfpLoadingBar.start();

      // $rootScope.$on('$locationChangeStart', function (event, next, current) {
      //   if($location.path() !== '/home')
      //     CheckRoutingFactory.isAuthenticated();
      //
      // });
  });

})();
