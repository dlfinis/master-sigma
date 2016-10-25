(function () {
  'use strict';

  function LikeFactory($http,$timeout,$q){
    return {
      havelike: function(articleID)
      {
        return $http.get('api/like/have',
          {
            params : { articleID: articleID },
            ignoreLoadingBar : true
          });
      },
      setlike: function(articleID,articleURL)
      {
        if(articleID && articleURL)
        return $http.post('api/like/set',
          {
            articleID:articleID ,
            articleURL:articleURL
          },
          {
            ignoreLoadingBar: true
          });
        else
          return false;
      },
      deletelike: function(likeSid)
      {
        if(likeSid)
        return $http.delete('api/like/delete',
          {
            params : { likeSid:likeSid },
            ignoreLoadingBar : true
          });
        else
          return false;
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
         .directive('like', function( partial,$log,$timeout){
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

                 $timeout(function() {
                   scope.loader = false; //cancel loader when timed out
                 }, 3750); //3750ms

                $timeout(function(){
                 if(scope.likeSid)
                   scope.checkstate = true;

                 if((!scope.checkstate)){
                   $log.debug('+ Adding LIKE in DB');
                   controller.setLike(scope.source.id,scope.source.url)
                                .then(function (response){
                                  if(response.status <=210) // created,record
                                  {
                                    $log.debug('+ Added LIKE in DB');
                                    scope.likeSid = response.data.record.sid;
                                    scope.checkstate = true;
                                    scope.loader = false;
                                    scope.stats = scope.stats + 1;
                                  }
                                })
                                .catch(function(err){
                                  $log.error(err);
                                  scope.loader = false;
                                  // $rootScope.$error = { login : true};
                                });
                 }
                 else {
                  $log.debug('+ Deleting LIKE of DB');
                   controller.deleteLike(scope.likeSid)
                               .then(function(response){
                                 if(response.data)
                                 {
                                   $log.debug('+ Deleted LIKE of DB');
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
               });
               };
             }
           };
         });

})();
