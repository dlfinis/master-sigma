(function () {
  function WallCtrl(){
    var $wall = this;
    $wall.ok = 'OK';
  }

  angular.module('app.main.wall')
         .controller('WallCtrl',WallCtrl);
})();
