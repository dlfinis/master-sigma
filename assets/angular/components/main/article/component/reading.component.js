(function () {
  'use strict';

  function ReadingCtrl($scope,ArticleListFactory)
  {
    var $reading = this;
    $reading.getReadingInfo = function(url){
      return  ArticleListFactory.getReading(url)
                  .then(function (response)
                  {
                    return response.data.reading;
                  });
    };
  }
  
  angular.module('app.main.article.reading',[])
         .controller('ReadingCtrl',ReadingCtrl)
         .directive('reading', function($q){
           return {
               restrict: 'EA',
               scope: {
                 url: "@"
               },
               controller: 'ReadingCtrl',
               controllerAs: '$reading',
               template: '<div ng-bind="info"></div></i>',
               link: function(scope, element, attrs,controller){
                 $q.when(controller.getReadingInfo(scope.url)).then(function(stats){
                     scope.info = stats.duration;
                 });
              }
           };
         });

})();
