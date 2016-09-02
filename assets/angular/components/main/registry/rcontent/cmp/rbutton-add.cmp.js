(function () {
  angular.module('app.main.registry.rcontent.buttonAdd', ['app.config'])
  .directive('rbuttonAdd',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'RButtonAddCtrl',
      controllerAs: '$radd',
      templateUrl: partial.main.rcontent+'cmp/rbutton-add.html'
    };
  });

})();
