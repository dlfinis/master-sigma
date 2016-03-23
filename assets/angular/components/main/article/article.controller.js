(function(){
  'use strict';

  function ArticleCtrl($scope, $http, $uibModal, ArticleFactory)
  {


    var $article = this;

    function getCategories(){
      return $http.get('/category');
    }

    getCategories().then(function (response){
         $article.mcategories = response.data;
       });
    $article.sortValue= '';
    $article.textSearchContent= '';

    $article.btn0 = '';
    $article.btn1 = '';

    $article.mcategory = {};

    $article.isActive = false;
    $article.activeButton = function(index) {
    $article.isActive = !$article.isActive;
    console.log(index);
    };

    ArticleFactory.getArticles()
                  .then(function (response){
                      $article.articleList = response.data.results;


                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });


    $article.test = function test() {
          return 'Test';
    };

    $article.clear = function ($event, $select){
                             //stops click event bubbling
                             $event.stopPropagation();
                             //to allow empty field, in order to force a selection remove the following line
                             $select.selected = undefined;
                             //reset search query
                             $select.search = undefined;
                             //focus and open dropdown
                             $select.activate();
                            };

    $article.open = function (size) {
      $uibModal.open(
      {

        templateUrl: '/angular/components/margin/article/tpl/test.modal.html'
      });
    };
    $article.showModal = false;
    $article.toggleModal = function(){
        $article.showModal = !$article.showModal;
    };


  }

  angular.module('app.main.article')
         .controller('ArticleCtrl',ArticleCtrl);
})();
