(function () {
  angular.module('app.main.wall', ['app.config'])
  .directive('wall',function (partial) {
    return {
      restrict: 'EA',
      scope: {},
      controller: 'WallCtrl',
      controllerAs: 'wall',
      templateUrl: partial.main.wall+'wall.html'
    };
  });

})();
