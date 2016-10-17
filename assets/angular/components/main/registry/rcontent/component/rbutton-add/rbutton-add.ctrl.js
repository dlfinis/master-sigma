(function (module) {

  function RButtonAddCtrl($location,$element){

    var $rbtnAdd = this;


    $rbtnAdd.redirect = {

      create : function (){
        $location.path('/registry/content');
      },
      edit : function (){
        $location.path('/registry/list');
      }
    };

  }

  module.controller('RButtonAddCtrl',RButtonAddCtrl);

})(angular.module('app.main.registry.rcontent.rbuttonAdd'));
