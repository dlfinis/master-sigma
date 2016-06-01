(function () {

  function RArticleCtrl($scope,RArticleFactory){

    $registry = this;
    $registry.article = {};
    // $registry.categories = {};

    RArticleFactory.getCategories()
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
      if(JSON.stringify($registry.article) === '{}')
        {
        console.log('Not article info');
      }else{
        RArticleFactory.saveArticle($registry.article).then(function(response){
          if(response.status == 201)
            {
            $registry.reset();
          }
        });
          // console.log(delta );
      }
    };

    // $registry.article.categories = {};

  }

  angular.module('app.main.registry.rarticle')
         .controller('RArticleCtrl',RArticleCtrl);

})();
