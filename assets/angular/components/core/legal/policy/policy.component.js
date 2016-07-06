(function () {
  angular.module('app.core.legal.policy', ['app.config'])
  .directive('policy',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: partial.core.legal+'policy/policy.cmp.html'
    };
  });

})();
