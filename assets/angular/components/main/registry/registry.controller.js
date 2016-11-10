(function () {

  function RegistryCtrl($scope,$log,RegistryFactory){

    var $registry = this;
    $registry.article = {};
    // $registry.categories = {};

    RegistryFactory.getCategories()
                  .then(function (response){
                    $registry.categories = response;
                  })
                  .catch(function (err) {
                    console.error(err.stack);
                  });

    $registry.reset = function(){
      $registry.article = {};
      $registry.articleForm.$setPristine();
    };

    $registry.save = function(){
      if(JSON.stringify($registry.article) === '{}'){
        $log.debug('+ Not article info');
      }else{
        RegistryFactory.saveArticle($registry.article).then(function(response){
          if(response.status <= 210){
            $registry.reset();
          }
        });
      }
    };
  }

  angular.module('app.main.registry')
         .controller('RegistryCtrl',RegistryCtrl);

})();
