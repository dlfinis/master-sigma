(function () {

  function RContentCtrl($scope,$rootScope,RContentFactory){

    var $rcontent = this;
    $rcontent.content = {};
    $rcontent.categories = [];

    $rcontent.loadCategories = function() {
      RContentFactory.getCategories()
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
    };

    $rcontent.save = function(){
      if(JSON.stringify($rcontent.content) === '{}')
        {
        console.log('Not content info');
      }else{
        RContentFactory.saveContent($rcontent.content).then(function(response){
          if(response.status == 201)
            {
            $rcontent.reset();
          }
        });
      }
    };

  }

  angular.module('app.main.registry.rcontent')
         .controller('RContentCtrl',RContentCtrl);

})();
