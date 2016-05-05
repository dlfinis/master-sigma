(function () {

  angular.module('app', ['angular-loading-bar',
                         'ngRoute',
                         'ngSanitize',
                         'ngAnimate',
                         'ngOnload',
                         'angularLazyImg',
                         'ui.bootstrap',
                         'ui.select',
                         'ngFacebook',
                         'app.core',
                         'app.main',
                         'app.config'
                       ])
  .config(['INIT','KEYS','$routeProvider','$logProvider','$compileProvider','$facebookProvider','cfpLoadingBarProvider',function(INIT,KEYS,$routeProvider,$logProvider,$compileProvider,$facebookProvider,cfpLoadingBarProvider) {

    if (!location.host.match(INIT.development)) {
      $compileProvider.debugInfoEnabled(false);
      $logProvider.debugEnabled(false);
    }

    $facebookProvider.setAppId(KEYS.fbClientID);

    // Remove loading bar spinner
    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider.when('/', {   resolve: {

                                            load: function (CheckRoutingFactory) {
                                                  return CheckRoutingFactory.isAuthenticated();
                                                  }
                                  },
    });

    $routeProvider.when('/#/', {   resolve: {

                                            load: function (CheckRoutingFactory) {
                                                  return CheckRoutingFactory.isAuthenticated();
                                                  }
                                  },
    });

    $routeProvider.when('/home', {  template:'<home></home>' });
    $routeProvider.when('/wall',
      {
        template: '<articlelist source="_source"></articlelist>',
        resolve:{
          _source: function(ArticleListFactory,$timeout){
            return $timeout(function () {
              return ArticleListFactory._source_init();
            }, 2000 );
          },
        },
        controller: function($scope, _source){
          $scope._source = _source;
        }
      }
      );
    $routeProvider.when('/articlelist', { template: '<articlelist></articlelist>' });

    $routeProvider.when('/test', { template: '<test></test>' });
    $routeProvider.when('/testpage',
          { template: '<testpage data="dataSlow"></testpage>',
            resolve:{
              dataSlow: function(TestPageFactory){
                  return TestPageFactory.getSlowData();
              },
            },
            controller: function($scope, dataSlow){
              $scope.dataSlow = dataSlow;
            }
          }
        );
    $routeProvider.when('/registry', { template: '<registry></registry>' });
    $routeProvider.when('/registry/article', { template: '<rarticle></rarticle>' });
    $routeProvider.when('/registry/category', { template: '<rcategory></rcategory>' });
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  /*CONFIG*/
  .run(function ($rootScope,$location,$route,$timeout,FontLoader,FBLoader,cfpLoadingBar,KEYS) {
      // Load the facebook SDK asynchronously
      FBLoader.setScript();
      //Load fonts asynchronously
      FontLoader.setFonts();

      // App is loading, so set isAppLoading to true and start a timer
      $rootScope.isAppLoading = true;
      $rootScope.startTime = new Date();

      // Start loading bar for app loading
      cfpLoadingBar.start();
  });

})();
