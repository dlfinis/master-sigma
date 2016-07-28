(function () {
  angular.module('app.core.legal.terms', ['app.config'])
  .directive('terms',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: partial.core.legal+'terms/terms.cmp.html'
    };
  });

})();
