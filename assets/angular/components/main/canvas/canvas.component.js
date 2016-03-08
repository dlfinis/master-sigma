;(function () {
  'use strict';

  angular.module('app.main.canvas', ['app.config'])
  .directive('canvas',function (partial) {
    return {
      restrict: 'EA',
      // scope: {},
      // controller: 'canvasCtrl',
      // controllerAs: 'canvasScope',
      templateUrl: partial.main.canvas+'canvas.html'
    };
  });


})()
