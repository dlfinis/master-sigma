(function () {
  angular.module('app.main.registry.rcontent.rimageAdd', ['app.config'])
  .directive('rimageAdd',function (partial,$log,Upload) {
    return {
      restrict: 'EA',
      scope: {},
      replace: false,
      require: ['^form', 'ngModel'],
      controller: 'RImageAddCtrl',
      controllerAs: '$rimageAdd',
      templateUrl: partial.main.rcontent+'component/rimage-add/rimage-add.cmp.html',
      link: function(scope, element, attrs, ctrls) {
        scope.form = ctrls[0];
        scope.picFile= '';
        scope.croppedDataUrl = '';
        var ngModel = ctrls[1];


        if (attrs.required !== undefined) {
        // If attribute required exists
        // ng-required takes a boolean
          scope.required = true;
        }

        scope.$on('initImage', function (event, data) {
          if(data.url)
          {
            element.querySelectorAll('.viewImage').css({
            'background-image': 'url(' + data.url + ')',
            'background-repeat': 'no-repeat'
            });
          } else{
            element.querySelectorAll('.viewImage').css({
            'background-image': 'url(/images/submarine.png)',
            'background-repeat': 'no-repeat'
            });
          }
          scope.form.image.$setValidity('required',true);
        });

        scope.$on('clean', function (event, data) {
          scope.picFile= '';
          scope.croppedDataUrl = '';
          scope.form.image.$error = {};
        });


        scope.$watch('croppedDataUrl', function() {
          if(scope.picFile.name)
          {
            $log.debug('+ Image cropped');
            var image =  Upload.dataUrltoBlob(scope.croppedDataUrl,scope.picFile.name);
            ngModel.$setViewValue(image);
          }
        });
      }
    };
  });

})();
