(function () {
  angular.module('app.main.registry.rcontent.buttonAdd', ['app.config'])
  .directive('rbuttonAdd',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'RButtonAddCtrl',
      controllerAs: '$rbtnAdd',
      templateUrl: partial.main.rcontent+'cmp/rbutton-add.html'
    };
  });

})();
