(function () {

  function RContentCtrl($scope,RContentFactory){

    var $registry = this;
    $registry.content = {};
    // $registry.categories = {};

    RContentFactory.getCategories()
                  .then(function (response){
                    $registry.categories = response;
                  })
                  .catch(function (err) {
                    console.error(err.stack);
                  });

    $registry.reset = function(){
      $registry.content = {};
      $registry.contentForm.$setPristine();
    };

    $registry.save = function(){
      if(JSON.stringify($registry.content) === '{}')
        {
        console.log('Not content info');
      }else{
        RContentFactory.saveContent($registry.content).then(function(response){
          if(response.status == 201)
            {
            $registry.reset();
          }
        });
          // console.log(delta );
      }
    };

    // $registry.content.categories = {};

  }

  angular.module('app.main.registry.rcontent')
         .controller('RContentCtrl',RContentCtrl);

})();
