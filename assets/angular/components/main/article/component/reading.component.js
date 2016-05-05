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
    var $reading = $scope;

    $reading.getReadingInfo = function(url){
      return  ReadingFactory.getReading(url);
    };
  }

  angular.module('app.main.article.reading',[])
         .factory('ReadingFactory',ReadingFactory)
         .controller('ReadingCtrl',ReadingCtrl)
         .directive('reading', function($q){
           return {
               restrict: 'EA',
               scope: {
                 stats: "=",
               },
               controller: 'ReadingCtrl',
               controllerAs: '$reading',
               template: '<div ng-bind="info"></div></i>',
               link: function(scope, element, attrs,controller){
                 scope.$watch(
                                 "stats",
                                 function ( values ) {
                                     if(values && scope.stats.reading )
                                     {
                                       scope.info =  scope.stats.reading.duration;
                                     }
                                 }
                             );
              }
           };
         });

})();
