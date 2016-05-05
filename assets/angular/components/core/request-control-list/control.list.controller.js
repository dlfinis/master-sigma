(function(module) {
    'use strict';

    function ControlListCtrl ($scope,$log,$q,ControlListFactory) {
      var $control = $scope;
      var $factory = ControlListFactory;

    }

    module.controller('ControlListCtrl',ControlListCtrl);

})(angular.module('app.core.request.control.list'));
