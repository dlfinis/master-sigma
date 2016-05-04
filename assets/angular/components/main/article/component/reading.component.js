(function () {
  'use strict';

  function ReadingFactory($http,$log){
  return {
          getReading: function(url)
          {
            return $http.get('/article/reading?uri='+url);
          },
        };
  }

  function ReadingCtrl($scope,ReadingFactory,ArticleListFactory)
  {
    var $reading = this;
    $reading.getReadingInfo = function(url){
      return  ReadingFactory.getReading(url);
    };
    $reading.setArticleDead = function  () {
      // body...
    };
  }

  angular.module('app.main.article.reading',[])
         .factory('ReadingFactory',ReadingFactory)
         .controller('ReadingCtrl',ReadingCtrl)
         .directive('reading', function($q){
           return {
               restrict: 'EA',
               scope: {
                 url: "@",
                 articleID:"@",
                 source:"="
               },
               controller: 'ReadingCtrl',
               controllerAs: '$reading',
               template: '<div ng-bind="info"></div></i>',
               link: function(scope, element, attrs,controller){
                 $q.when(controller.getReadingInfo(scope.url)).then(function(response){
                     if(response)
                     {
                       scope.info = response.data.reading.duration;
                     }else {
                       if(scope.source && scope.articleID)
                       {
                         controller.setArticleDead(scope.articleID);

                       }
                     }
                 });
              }
           };
         });

})();
