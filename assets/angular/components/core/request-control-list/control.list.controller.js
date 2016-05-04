(function(module) {
    'use strict';

    function ControlListCtrl ($scope,$log,$q) {
      var $control = $scope;
      
      $log.debug($control.source);
      $log.debug($control.list);

      $control.source.alive = true;
      $control.source.alive = false;

    }

    module.controller('ControlListCtrl',ControlListCtrl);

})(angular.module('app.core.request.control.list'));
