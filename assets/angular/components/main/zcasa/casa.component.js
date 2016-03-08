;(function () {
  'use strict';

  angular.module('app.main.dcasa', ['app.config'])
  .directive('dcasa',function (partial) {
    return {
      restrict: 'EA',
      // scope: {},
      // controller: 'canvasCtrl',
      // controllerAs: 'canvasScope',
      templateUrl: partial.main.canvas+'canvas.html'
    };
  });


})()
