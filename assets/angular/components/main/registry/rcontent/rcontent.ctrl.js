(function () {

  function RContentCtrl($scope, $log, $element, $window, $http, $route, $rootScope, RContentFactory){

    var $rcontent = this;
    $rcontent.content = {};
    $rcontent.categories = [];
    $rcontent.contentCreated = false;

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
          $rcontent.content = response;
        });
      }
        angular.element(document).ready(function () {
          $rcontent.ready = true;
        });
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

    $rcontent.reset = function(){
      $rcontent.content = {};
      $rcontent.contentForm.$setPristine();
      $scope.$broadcast('clean');
      $window.scrollTo(0, angular.element(document.getElementById('heading')).offsetTop);
    };

    $rcontent.save = function(){

      if(JSON.stringify($rcontent.content) === '{}')
      {
        console.log('Not content info');
      }else {

        console.log('Form',$rcontent.contentForm);

        if (!$rcontent.contentForm.$valid) {
          console.log(angular.element(document.getElementById('contentForm')));
          console.log(angular.element(document.getElementById('contentForm')).find('.ng-invalid'));
          // angular.element('[name=' + $rcontent.contentForm.$name + ']').find('.ng-invalid:visible:first').focus();
          return false;
        }

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
              console.log($element);
              console.log($element[0]);
              console.log(Object.keys($element[0]));
              console.log(Object.keys($element.querySelectorAll('#alert-success')));
              $rcontent.contentCreated = true;
      }
    };

  }

  angular.module('app.main.registry.rcontent')
         .controller('RContentCtrl',RContentCtrl);

})();
