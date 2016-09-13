(function () {
  angular.module('app.main.registry.rcontent.rbuttonAdd', ['app.config'])
  .directive('rbuttonAdd',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'RButtonAddCtrl',
      controllerAs: '$rbtnAdd',
      templateUrl: partial.main.rcontent+'component/rbutton-add/rbutton-add.html'
    };
  });

})();
