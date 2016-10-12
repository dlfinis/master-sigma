(function () {
  angular.module('app.main.registry.rcontent', ['app.config'])
  .directive('uiSelectRequired',function () {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {
          return modelValue && modelValue.length;
        };
      }
    };
  })
  .directive('rcontent',function (partial) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: 'RContentCtrl',
      controllerAs: '$rcontent',
      templateUrl: partial.main.rcontent+'rcontent.html'
    };
  });

})();
