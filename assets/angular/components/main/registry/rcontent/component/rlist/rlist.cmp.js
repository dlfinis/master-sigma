(function () {
  angular.module('app.main.registry.rcontent.rlist', ['app.config'])
  .directive('rcontentList',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'RListCtrl',
      controllerAs: '$rlist',
      templateUrl: partial.main.rcontent+'component/rlist/rlist.html'
    };
  });
})();
