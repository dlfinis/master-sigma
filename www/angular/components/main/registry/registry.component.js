(function () {
  angular.module('app.main.registry', ['app.config'])
  .directive('registry',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RegistryCtrl',
      controllerAs: '$registry'
    };
  });

})();
