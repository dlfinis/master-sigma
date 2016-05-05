(function(module) {
    'use strict';

    function ControlListCtrl ($scope,$log,$q,ControlListFactory) {
      var $control = $scope;
      $control.source.stats = {};
      var $factory = ControlListFactory;
      $q.when($factory.getStats($control.source.url)).then(function (stats) {
          // $log.debug('+Get stats >'+JSON.stringify(stats));
          if(stats.alive)
            $control.source.stats = stats;
          else {
              $log.debug('+ Dead > ' + $control.source.id);
              $scope.list.splice($scope.list.indexOf($control.source), 1);
          }

      });

      $control.remove = function(item, list) {
        var index = list.indexOf(item);
        if(index>=0)
          list.splice(index, 1);
      };

    }

    module.controller('ControlListCtrl',ControlListCtrl);

})(angular.module('app.core.request.control.list'));
