(function () {
  angular.module('app.main.registry.rarticle', ['app.config'])
  .directive('rarticle',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RArticleCtrl',
      controllerAs: '$registry',
      templateUrl: partial.main.rarticle+'rarticle.html'
    };
  });

})();
