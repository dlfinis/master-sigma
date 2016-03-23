(function () {
  'use strict';

  angular.module('app.main.home',['app.config'])
  .directive('home',function (partial) {
    return {
      restrict: 'EA',
      // scope: {},
      // controller: 'homeCtrl',
      // controllerAs: 'homeScope',
      templateUrl: partial.main.home+'home.html',
    };
  });


})();
