(function () {
  angular.module('app.main.registry.rcontent.rlist', ['app.config'])
  .directive('rlist',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'RListCtrl',
      controllerAs: '$rlist'
      // templateUrl: partial.main.rcontent+'component/rbutton-add/rbutton-add.html'
    };
  });

})();
