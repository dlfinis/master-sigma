(function () {

  function RCategoryCtrl($scope,RCategoryFactory){

    $registry = this;
    $registry.category = {};

    $registry.reset = function(){
      $registry.category = {};
      $registry.categoryForm.$setPristine();
    };

    $registry.save = function(){
      if(JSON.stringify($registry.category) === '{}')
        {
        console.log('Not category info');
      }else{
        RCategoryFactory.saveCategory($registry.category).then(function(response){
          if(response.status == 201)
              {
            $registry.reset();
          }
        });
      }
    };
  }

  angular.module('app.main.registry.rcategory')
         .controller('RCategoryCtrl',RCategoryCtrl);

})();
