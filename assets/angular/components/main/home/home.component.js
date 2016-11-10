(function () {
  'use strict';

  angular.module('app.main.home',['app.config'])
  .directive('home',function (partial) {
    return {
      restrict: 'EA',
      templateUrl: partial.main.home+'home.html'
    };
  });

})();
