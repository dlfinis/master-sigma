angular.module('app', ['ngRoute','ngAnimate', 'ui.bootstrap','app.controllers','app.core.factories'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {   resolve: {
                                      // factory: checkRouting
                                      load: function (CheckRoutingFactory) {
                                            return CheckRoutingFactory.isAuthenticated();
                                            }
                                },
  });
  $routeProvider.when('/home', {  templateUrl: 'js/app/partials/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/test', {templateUrl: 'js/app/partials/test.html', controller: 'testCtrl'});
  $routeProvider.when('/canvas', {
                                    templateUrl: 'js/app/partials/canvas.html',
                                    controller: 'canvasCtrl',
                                    controllerAs: 'canvas'
                                  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);


var checkRouting= function ($q, $rootScope, $location,$http,testFactory,CheckRoutingFactory) {
    console.log(CheckRoutingFactory.isAuthenticated());
    console.log(testFactory.isOK());
    if ($rootScope.userProfile) {
        return true;
    } else {
        var deferred = $q.defer();
        $http.post("/getUser")
            .success(function (response) {
                if(response.auth)
                  {
                      $rootScope.userProfile = response.user;
                      $location.path("/canvas");
                  }else {
                      $location.path("/home");
                  }
                deferred.resolve(true);
            })
            .error(function (err) {
                console.log(err);
                deferred.reject();
                $location.path("/home");
             });
        return deferred.promise;
    }
};
