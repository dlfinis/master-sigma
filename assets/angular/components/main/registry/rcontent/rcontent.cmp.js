(function () {
  angular.module('app.main.registry.rcontent', ['app.config'])
  .directive('rcontent',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RContentCtrl',
      controllerAs: '$rcontent',
      templateUrl: partial.main.rcontent+'rcontent.html'
    };
  });

})();