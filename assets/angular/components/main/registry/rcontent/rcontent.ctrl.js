(function () {

  function RContentCtrl($scope, $q, $log, $element, $window, $http, $route, $rootScope, RContentFactory){

    var $rcontent = this;
    $rcontent.content = {};
    $rcontent.categories = [];

    $rcontent.testContent =
    {
      creator: 3,
      url:'https://hipertextual.com/2016/10/marihuana-sintetica',
      title:'Marihuana Sintetica',
      description:'La marihuana sintética lleva unos años creciendo dentro de una moda peligrosa \
      y difícil de parar. ¿Qué esconde esta sustancia y por qué es tan dañina para el cuerpo humano?',
      categories:['Información','Botánica']
    };



    $rcontent.initContent = function () {
      if($route.current.params.id){
        RContentFactory.getContent('id',$route.current.params.id).then(function (response) {
          $rcontent.getFileImage(response.image);
          response.categories = response.categories.map(function(currentValue, index, arr)
          {
            return currentValue.name;
          });
          $rcontent.content = response;

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

    $rcontent.save = function(){

      if(JSON.stringify($rcontent.content) === '{}')
      {
        $log.err('Not content info');
      }else {
        $rcontent.resetMessages();
        var tmpContent = angular.copy($rcontent.content);

        console.log('Ctrl',$rcontent.content);


        if($route.current.params.id){
          RContentFactory.updateContent($rcontent.content).then(function (response) {
              $log.debug('Update ok',response);
              if(response && response.status < 299)
              {
                $rcontent.reset();
                $rcontent.contentUpdated = true;
              }else {
                $rcontent.content = angular.copy(tmpContent);
              }
          }).catch(function (err) {
            $rcontent.content = angular.copy(tmpContent);
            $log.debug('- Ctrl',err);
          });
        }
        //
        // if (!$rcontent.contentForm.$valid) {
        //   console.log(angular.element(document.getElementById('contentForm')));
        //   console.log(angular.element(document.getElementById('contentForm')).find('.ng-invalid'));
        //   $rcontent.contentInvalid = true;
        //   $rcontent.focusHeading();
        //   // angular.element('[name=' + $rcontent.contentForm.$name + ']').find('.ng-invalid:visible:first').focus();
        //   return false;
        // }
        //

              // var tmpContent = $rcontent.content;
              // RContentFactory.saveContent($rcontent.content)
              // .then(function(response){
              //   $log.debug('Save ok',response);
              //   if(response.status === 400)
              //   {
              //     $rcontent.content = tmpContent;
              //   }else {
              //     $rcontent.reset();
              //   }
              // })
              // .catch(function (err) {
              //   $log.error('Ctrl',err.stack);
              // });
              // console.log($element);
              // console.log($element[0]);
              // console.log(Object.keys($element[0]));
              // console.log(Object.keys($element.querySelectorAll('#alert-success')));
              // $rcontent.contentCreated = true;
      }
    };

  }

  angular.module('app.main.registry.rcontent')
         .controller('RContentCtrl',RContentCtrl);

})();
