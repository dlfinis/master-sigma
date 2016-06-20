/*eslint quotes: [0, "single"]*/
/*global */
(function(module) {
  'use strict';

  function RelatedCtrl() {

  }

  module.controller('RelatedCtrl',RelatedCtrl)
        .directive('related', function( partial, $timeout){
          return {
            restrict: 'EA',
            scope: {
              source: '&'
            },
            controller: 'RelatedCtrl',
            controllerAs: '$related',
            templateUrl: partial.main.article+'tpl/related.cmp.html',
            link: function (scope,element,attrs,controller) {
              var click_related = false
              element.querySelectorAll('#btn-related').bind('click mouseenter', function (event) {
                  click_related = !click_related;
                  if(!click_related) // Not visible
                  {
                    element.querySelectorAll('#related-box').css('display','block');
                  }else {
                    element.querySelectorAll('#related-box').css('display','none');
                  }
              });

              element.querySelectorAll('#related-box').bind('mouseleave', function (event) {
                    $timeout(function () {
                      element.querySelectorAll('#btn-related').triggerHandler('click');
                    }, 500);
              });
            }
          };
        });

})(angular.module('app.main.article.related',['app.config']));
