(function () {
  angular.module('app.main.registry.rcategory', ['app.config'])
  .directive('rcategory',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RCategoryCtrl',
      controllerAs: '$registry',
      templateUrl: partial.main.rcategory+'rcategory.html'
    };
  });

})();
