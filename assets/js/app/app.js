angular.module('app', ['ngRoute','ngAnimate', 'ui.bootstrap','app.controllers'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: '/js/app/partials/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/test', {templateUrl: '/js/app/partials/test.html', controller: 'testCtrl'});
  $routeProvider.when('/delta', {templateUrl: '/js/app/partials/profile.html', controller: 'profileCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
