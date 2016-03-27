(function(){
  'use strict';

  function ArticleListCtrl($scope, $http, $uibModal, ArticleListFactory)
  {
    var $articlelist = this;

    function getCategories(){
      return $http.get('/category');
    }

    getCategories().then(function (response){
         $articlelist.mcategories = response.data;
    });

    $articlelist.sortValue= '';
    $articlelist.textSearchContent= '';

    $articlelist.btn0 = '';
    $articlelist.btn1 = '';

    $articlelist.mcategory = {};

    $articlelist.isActive = false;
    $articlelist.activeButton = function(index) {
    $articlelist.isActive = !$articlelist.isActive;
    console.log(index);
    };

    // $articlelist.getSite = function (uri) {
    //         console.log(uri);
    //   $http.get('/article/getSite/',{params:{"uri": uri}})
    //                     .then(function (response) {
    //                       console.log(response);
    //                         // return response;
    //                         $articlelist.site = response.data;
    //
    //                     })
    //                     .catch(function (err) {
    //                         console.error(err.stack);
    //                     });
    // };

    $articlelist.addButton = function(alfa) {

        var btnhtml = '<button type="button" ng-click="addButton()">Click Me</button>';
        var temp = $compile(btnhtml)($scope);
        angular.element(document.getElementById('foo')).append(temp);

    };

    ArticleListFactory.getArticles()
                  .then(function (response){
                      $articlelist.articleList = response.data.results;
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });


    $articlelist.test = function test() {
          return 'Test';
    };

    $articlelist.clear = function ($event, $select){
                             //stops click event bubbling
                             $event.stopPropagation();
                             //to allow empty field, in order to force a selection remove the following line
                             $select.selected = undefined;
                             //reset search query
                             $select.search = undefined;
                             //focus and open dropdown
                             $select.activate();
                            };

    $articlelist.open = function (size) {
      $uibModal.open(
      {
        templateUrl: partial.main.article+'tpl/test.modal.html'
      });
    };
    $articlelist.showModal = false;
    $articlelist.toggleModal = function(){
        $articlelist.showModal = !$articlelist.showModal;
    };


  }

  angular.module('app.main.article')
         .controller('ArticleListCtrl',ArticleListCtrl);
})();
