(function(){
  'use strict';

  function ArticleCtrl($scope, $http, $uibModal, ArticleFactory)
  {


    var $article = this;

    function getCategories(){
      return $http.get('/category');
       };
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
    }
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
        template:`
        <div class="modal-header">
            <h3 class="modal-title">I'm a modal!</h3>
        </div>
        <div class="modal-body">
        <div class="embed-responsive embed-responsive-4by3">
          <iframe class="embed-responsive-item" sandbox="allow-same-origin allow-forms allow-popups"
          src="http://genbeta.com"></iframe>
        </div>
            <ul>
                <li ng-repeat="item in items">
                    <a href="#" ng-click="$event.preventDefault(); selected.item = item">{{ item }}</a>
                </li>
            </ul>
            Selected: <b>{{ selected.item }}</b>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
        </div>
        `
      });
    };
    $article.showModal = false;
    $article.toggleModal = function(){
        $article.showModal = !$article.showModal;
    };


  };

  angular.module('app.main.article')
         .controller('ArticleCtrl',ArticleCtrl);
})();
