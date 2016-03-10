;(function () {

  angular.module('app', ['ngSanitize',
                         'ngRoute',
                         'ngAnimate',
                         'ui.bootstrap',
                         'ui.select',
                         'app.core',
                         'app.main'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {   resolve: {

                                            load: function (CheckRoutingFactory) {
                                                  return CheckRoutingFactory.isAuthenticated();
                                                  }
                                  },
    });
    // $routeProvider.when('/home', {  templateUrl:'angular/components/main/home/home.html'});
    $routeProvider.when('/home', {  template:'<home></home>' });
    $routeProvider.when('/wall', { template: '<wall></wall>' });
    $routeProvider.when('/canvas', { template: '<canvas></canvas>' });
    $routeProvider.when('/test', { template: '<test></test>' });
    $routeProvider.when('/testpage', { template: '<testpage></testpage>' });
    $routeProvider.when('/mtest', { template: '<mtest></mtest>' });
    $routeProvider.when('/article', { template: '<article></article>' });
    $routeProvider.when('/zarticle', { template: '<zarticle></zarticle>' });
    $routeProvider.when('/dcasa', { template: '<dcasa></dcasa>' });
    // $routeProvider.when('/mtest', {template: '<mtest></mtest>'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

})()
