(function () {
  'use strict';

  angular.module('app.main.zarticle', ['app.config'])
          .factory('ZArticleFactory', ZArticleFactory)
          .controller('ZArticleCtrl',ZArticleCtrl)
          .directive('zarticle', ZArticleDirective);

  function ZArticleFactory($http){
    return {
          getArticles: function()
          {
            return $http.get('/api/article');
          }
    };
  }

  function ZArticleCtrl($scope, ZArticleFactory)
  {
    var $zarticle = this;

    ZArticleFactory.getArticles()
                  .then(function (response){
                      $zarticle.articles = response;
                  })
                  .catch(function (err) {
                      console.error(err.stack);
                  });
  }

  function ZArticleDirective (partial) {
    return {
         restrict: 'E',
         scope: {},
         controller: 'ZArticleCtrl',
         controllerAs: '$zarticle',
         templateUrl: partial.main.zarticle+'zarticle.html',
    };
  }

})();
