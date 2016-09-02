(function (module) {

  function RButtonAddCtrl($location){

    var $rbtnAdd = this;

    $rbtnAdd.redirect = function redirect(){
      $location.path('/registry/content');
    };

  }

  module.controller('RButtonAddCtrl',RButtonAddCtrl);

})(angular.module('app.main.registry.rcontent.rbuttonAdd'));
