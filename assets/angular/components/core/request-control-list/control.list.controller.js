(function(app) {
    'use strict';
    function ControlListCtrl ($scope,$log,$q) {
      var $control = $scope;
      $log.debug($control.source);
      $log.debug($control.list);
    }

    app.controller('ControlListCtrl',ControlListCtrl);

})('app.core.request.control.list');
