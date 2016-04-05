(function () {
  'use strict';

  function TDeltaCtrl($scope,ArticleListFactory)
  {
    var $tdelta = this;
    $tdelta.getReadingInfo = function(url){
      return  ArticleListFactory.getReading(url)
                  .then(function (response)
                  {
                    return response.data.reading;
                  });
    };

}
  angular.module('app.main.article.tdelta',[])
         .controller('TDeltaCtrl',TDeltaCtrl)
         .directive('tdelta', function($q){
           return {
               restrict: 'EA',
               scope: {
                 url: "@"
               },
               controller: 'TDeltaCtrl',
               controllerAs: '$tdelta',
               template: '<p>TDelta</p><div class="tdelta" ng-bind="delta"></div>',
               link: function(scope, element, attrs,controller){
                 $q.when(controller.getReadingInfo(scope.url)).then(function(stats){
                      console.log(stats);
                     scope.delta = stats.duration;
                 });
              }
           };
         });

})();
