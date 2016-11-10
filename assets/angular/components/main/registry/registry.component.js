(function () {
  angular.module('app.main.registry', ['app.config'])
  .directive('registry',function () {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RegistryCtrl',
      controllerAs: '$registry'
    };
  });

})();
