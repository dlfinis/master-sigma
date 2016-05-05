(function() {
    'use strict';

    angular.module('app.core.request.control.list',[])
           .directive('control', function(){
             return {
                 restrict: 'A',
                 scope: {
                   source: "=",
                   list: "="
                 },
                 controller: 'ControlListCtrl',
                 controllerAs: '$control'
             };
           });

})();
