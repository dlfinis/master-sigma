(function () {

  function RegistryCtrl($scope,RegistryFactory){

    $registry = this;
    $registry.article = {};

    RegistryFactory.getCategories()
                  .then(function (response){
                      $registry.categories = response.data.results;
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });

  }

  angular.module('app.main.registry')
         .controller('RegistryCtrl',RegistryCtrl);

})();
