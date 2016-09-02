(function () {
  'use strict';

  function LikeFactory($http,$timeout,$q){
    return {
      havelike: function(articleID)
      {
        return $http.get('/api/article/havelike',
          {
            params : { articleID: articleID },
            ignoreLoadingBar : true
          });
      },
      setlike: function(articleID,articleURL)
      {
        return $http.post('/api/article/setlike',
          {
            articleID:articleID ,
            articleURL:articleURL
          },
          {
            ignoreLoadingBar: true
          });
      },
      deletelike: function(likeSid)
      {
        return $http.delete('/api/article/deletelike',
          {
            params : { likeSid:likeSid },
            ignoreLoadingBar : true
          });
      },
      testlike: function(){
        var timer = $q.defer();
        $timeout(function() {
          timer.resolve(Math.round(Math.random())); //aborts the request when timed out
          console.log('Time out');
        }, 2750); //we set a timeout for 1250ms

        // The promise of the deferred task
        return timer.promise;
      }
    };
  }

  function LikeCtrl($scope,LikeFactory)
  {
    var $like = this;

    $like.setLike = function (articleID,articleURL){
      return LikeFactory.setlike(articleID,articleURL);
    };

    $like.deleteLike = function (likeSid){
      return LikeFactory.deletelike(likeSid);
    };

    $like.testLike = function (){
      return LikeFactory.testlike();
    };
  }

  angular.module('app.main.article.like',['app.config'])
         .factory('LikeFactory',LikeFactory)
         .controller('LikeCtrl',LikeCtrl)
         .directive('like', function( partial,$log){
           return {
             restrict: 'EA',
             scope: {
               stats: '=',
               source: '=',
               likeSid:'='
             },
             controller: 'LikeCtrl',
             controllerAs: '$like',
             templateUrl: partial.main.article+'tpl/like.cmp.html',
             link : function (scope, element, attrs, controller) {

               scope.checkstate = false;
               scope.loader = false;

              // Check if exist previous like
               if(scope.likeSid)
                 scope.checkstate = true;

               scope.doLike = function(){
                 scope.loader = true;

                 if(scope.likeSid)
                   scope.checkstate = true;

                 if((!scope.checkstate))
                   {
                   controller.setLike(scope.source.id,scope.source.url)
                                .then(function (response){
                                  if(response.data.created) // created,record
                                  {
                                    scope.likeSid = response.data.record.sid;
                                    scope.checkstate = true;
                                    scope.loader = false;
                                    scope.stats = scope.stats + 1;
                                  }
                                })
                                .catch(function(err){
                                  $log.error(err);
                                  scope.loader = false;
                                });
                 }
                 else {
                   controller.deleteLike(scope.likeSid)
                               .then(function(response){
                                 if(response.data)
                                 {
                                   scope.checkstate = false;
                                   scope.stats = scope.stats - 1;
                                   scope.loader = false;
                                   scope.likeSid = '';
                                 }
                               })
                               .catch(function(err){
                                 $log.error(err);
                                 scope.loader = false;
                               });
                 }
               };
             }
           };
         });

})();
