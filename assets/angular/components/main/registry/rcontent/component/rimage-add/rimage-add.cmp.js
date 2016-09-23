(function () {
  angular.module('app.main.registry.rcontent.rimageAdd', ['app.config'])
  .directive('rimageAdd',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'RImageAddCtrl',
      controllerAs: '$rimageAdd',
      templateUrl: partial.main.rcontent+'component/rimage-add/rimage-add.cmp.html'
    };
  });

})();
