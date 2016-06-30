/*eslint quotes: [0, "single"]*/
/*global */
(function(module) {
  'use strict';

  function RelatedFactory($log,$http) {
    return {
      get: function (id) {
        return $http.get('/api/related/find',
        { params:{ id: id },
          ignoreLoadingBar : true
        });
      }
    };
  }
  function RelatedCtrl($scope,$q,RelatedFactory) {
    var $related = this;

    //Load of related articles
    $q.when(RelatedFactory.get($scope.sourceId)).then(function (response) {
      if(response.status === 200) $scope.relatedlist = response.data.results;
    });

  }

  module.factory('RelatedFactory',RelatedFactory)
        .controller('RelatedCtrl',RelatedCtrl)
        .directive('related', function( partial, $timeout,$log,$q){
          return {
            restrict: 'EA',
            scope: {
              sourceId: '@'
            },
            controller: 'RelatedCtrl',
            controllerAs: '$related',
            templateUrl: partial.main.article+'tpl/related.cmp.html',
            link: function (scope,element,attrs,controller) {
              var entry = false;

              function entering(isVisible){
                if(isVisible) // Not visible
                {
                  element.querySelectorAll('#related-box').css('display','block');
                }else {
                  element.querySelectorAll('#related-box').css('display','none');
                }
              }

              element.querySelectorAll('#btn-related').bind('click mouseenter', function (event) {
                entry = !entry;
                entering(entry);
              });

              element.querySelectorAll('#related-box').bind('mouseleave', function (event) {
                $timeout(function () {
                  entering(false);
                }, 100);
              });
            }
          };
        });

})(angular.module('app.main.article.related',['app.config']));
