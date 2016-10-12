(function () {

  function RContentCtrl($scope, $q, $log, $element, $window, $http, $route, $rootScope, RContentFactory){

    var $rcontent = this;
    $rcontent.content = {};
    $rcontent.contentOriginal = {};
    $rcontent.categories = [];

    $rcontent.testContent =
    {
      url:'https://hipertextual.com/2016/10/marihuana-sintetica',
      title:'Marihuana Sintetica',
      description:'La marihuana sintética lleva unos años creciendo dentro de una moda peligrosa \
      y difícil de parar. ¿Qué esconde esta sustancia y por qué es tan dañina para el cuerpo humano?',
      categories:['Información','Botánica']
    };



    $rcontent.initContent = function () {
      if($route.current.params.id){
        RContentFactory.getContent($route.current.params.id).then(function (response) {
          $rcontent.getFileImage(response.image);
          response.categories = response.categories.map(function(currentValue, index, arr)
          {
            return currentValue.name;
          });
          $rcontent.contentOriginal = response;
          angular.copy($rcontent.contentOriginal, $rcontent.content);
        });
      }

    };



    $rcontent.getFileImage = function (urlImage) {
      angular.element(document).ready(function () {
        $scope.$broadcast('initImage',{ url: urlImage  });
      });
    };

    $rcontent.test = function(){
      $rcontent.content = $rcontent.testContent;
    };

    $rcontent.loadCategories = function() {
      RContentFactory.getCategoriesList()
                    .then(function (response){
                      $rcontent.categories = response;
                    })
                    .catch(function (err) {
                      console.error(err.stack);
                    });
    };

    $rcontent.back = function () {
      $rcontent.return = true;
      window.history.back();
    };

    $rcontent.focusHeading = function () {
      $window.scrollTo(0, angular.element(document.getElementById('heading')).offsetTop);
    };

    $rcontent.focusElement = function (elementID) {
      $window.scrollTo(0, angular.element(document.getElementById(elementID)).offsetTop);
    };

    $rcontent.focusInvalid = function () {
      var input = angular.element(document.getElementById('contentForm')).find('input');
      angular.forEach( input, function(item) {
          if(angular.element(item).hasClass('ng-invalid'))
          {
            $log.warn('Invalid params',item);
            $window.scrollTo(0, item.offsetTop);
            return false;
          }
      });
    };

    $rcontent.reset = function(){
      $rcontent.content = {};
      $rcontent.contentForm.$setPristine();
      $scope.$broadcast('clean');
      $rcontent.focusHeading();
    };

    $rcontent.resetMessages = function () {
      $rcontent.contentCreated = false;
      $rcontent.contentUpdated = false;
      $rcontent.contentInvalid = false;
    };

    $rcontent.add = function (tmpContent) {
      $log.debug('Add content');
      RContentFactory.saveContent($rcontent.content)
      .then(function(response){
        $log.debug('Save ok',response);
        if(response.status < 299)
        {
          $rcontent.reset();
          $rcontent.contentCreated = true;
        }else {
          $log.debug(response.data);
          $rcontent.content = angular.copy(tmpContent);
        }
      })
      .catch(function (err) {
        $rcontent.content = angular.copy(tmpContent);
        $log.error('Ctrl',err);
        $rcontent.contentInvalid = true;
        $rcontent.focusHeading();
        $rcontent.contentForm.$invalid = true;
        if(!angular.isUndefined(err.data) && !angular.isUndefined(err.data.attributes.url))
        {
          $rcontent.contentForm.url.$error = { exist : true};
        }
      });

    };

    $rcontent.update = function (tmpContent) {
      $log.debug('Update content');
      var contentUpdate = RContentFactory.findDiff($rcontent.contentOriginal,$rcontent.content);
      console.log('Update',contentUpdate);
      RContentFactory.updateContent($route.current.params.id,contentUpdate).then(function (response) {
          $log.debug('Update ok',response);
          if(response && response.status < 299)
          {
            $rcontent.reset();
            $rcontent.contentUpdated = true;
          }else {
            $rcontent.contentInvalid = true;
            $rcontent.content = angular.copy(tmpContent);
          }
      }).catch(function (err) {
        $rcontent.contentInvalid = true;
        $rcontent.focusHeading();
        $rcontent.content = angular.copy(tmpContent);
        $log.debug('- Ctrl',err);
      });
    };

    $rcontent.save = function(){

      if(JSON.stringify($rcontent.content) === '{}')
      {
        $log.err('Not content info');
      }else {
        $rcontent.resetMessages();

        if (!$rcontent.contentForm.$valid) {
          $rcontent.contentInvalid = true;
          $rcontent.focusInvalid();
          return false;
        }

        var tmpContent = angular.copy($rcontent.content);

        if($route.current.params.id){
          $rcontent.update(tmpContent);
        }else{
          $rcontent.add(tmpContent);
        }

      }
    };

  }

  angular.module('app.main.registry.rcontent')
         .controller('RContentCtrl',RContentCtrl);

})();
