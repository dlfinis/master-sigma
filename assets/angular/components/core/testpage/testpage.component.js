(function () {
  'use strict';

  angular.module('app.core.testpage', ['app.config'])
  .factory('TestPageFactory', TestPageFactory)
  .controller('TestPageCtrl', TestPageCtrl)
  .directive('testpage', function (partial) {
    return {
      restrict:'EA',
      scope: {
        data : '='
      },
      controller: 'TestPageCtrl',
      templateUrl:partial.core.testpage+'testpage.cmp.html'
    };
  });


  function TestPageFactory ($q, $timeout,$rootScope, $location,$http) {
    return {
      isOK: function()
      {
        return 'OK';
      },
      getSlowData: function () {
        console.log(' + Get Data');
        return $timeout(function(){
          console.log('Slow Data');
          return 'Slow Data';
        }, 5000);
      }
    };
  }

  function TestPageCtrl(TestPageFactory, Upload, $scope, $sce, $element, $attrs, $timeout, $route){
    // I want `data` to be injected from the resolve...
    // as it would if this was a "standalone" controller
    // console.log('$scope.data: '+ $scope.data);

    $scope.params = function () {
      return $route.current.params;
    };

    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'https://master.sigma/api/test/uploadImage',
        data: {username: $scope.username, image: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
        console.log(response);
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };

    $scope.uploadCropPic = function (imageUrl,name) {
      console.log(imageUrl,name);
      Upload.upload({
          url: 'https://master.sigma/api/test/uploadImage',
          data: {
              username: $scope.username, image:  Upload.dataUrltoBlob(imageUrl, name)
          }
      }).then(function (response) {
          $timeout(function () {
              $scope.result = response.data;
          });
      }, function (response) {
          if (response.status > 0) $scope.errorMsg = response.status
              + ': ' + response.data;
      }, function (evt) {
          $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      });
    };
  }

})();
