// (function () {
//   'use strict';
//
//   function HtmlDataCtrl($scope,ArticleListFactory)
//   {
//     var $htmldata = this;
//     $htmldata.getHtmlData = function(url){
//         return  ArticleListFactory.getHtmlData(url)
//                   .then(function (response)
//                   {
//                     return response.data;
//                   });
//     };
//
//   }
//
//   angular.module('app.main.article.htmldata',['app.config'])
//          .controller('HtmlDataCtrl',HtmlDataCtrl)
//          .directive('htmldata', function(partial,$q,$sce){
//            return {
//                restrict: 'EA',
//                scope: {
//                  url: "@"
//                },
//                controller: 'HtmlDataCtrl',
//                controllerAs: '$htmldata',
//               //  template: '<div class="htmldata" ng-bind="html"></div>',
//               //  template: '<div ng-bind-html="html"></div>',
//                template: '<div style="width:100%;" class="embed-responsive-item" ng-bind-html="html"></div>',
//                link: function(scope, element, attrs,controller){
//                 $q.when(controller.getHtmlData(scope.url)).then(function(data){
//                     scope.html = $sce.getTrustedHtml(data);
//                 });
//               }
//            };
//          });
//
// })();
