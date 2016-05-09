(function () {
  'use strict';

  function LikeFactory($http,$httpParamSerializer){
    return {
            havelike: function(articleID)
            {
              return $http.get('/api/article/havelike',
                     {
                       params : {articleID:articleID}
                     });
            },
            setlike: function(articleID,articleURL)
            {
              return $http.post('/api/article/setlike',
                     {
                      articleID:articleID ,
                      articleURL:articleURL
                     });
            },
            deletelike: function(articleSid)
            {
              return $http.delete('/api/article/deletelike',
                     {
                      params : { articleSid:articleSid }
                     });
            },
          };
  }

  function LikeCtrl($scope,LikeFactory)
  {
    var $like = this;

    $like.setLike = function (articleID,articleURL){
        return LikeFactory.setlike(articleID,articleURL);
    };
    $like.deleteLike = function (articleSid){
        return LikeFactory.deletelike(articleSid);
    };
  }

  angular.module('app.main.article.like',['app.config'])
         .factory('LikeFactory',LikeFactory)
         .controller('LikeCtrl',LikeCtrl)
         .directive('like', function( partial,$log,$q){
           return {
               restrict: 'E',
               scope: {
                 stats: "=",
                 source: "=",
                 articleSid:"="
               },
               controller: 'LikeCtrl',
               controllerAs: '$like',
               templateUrl: partial.main.article+'tpl/like.cmp.html',
               link : function (scope, element, attrs, controller) {
                 // Check if exist previous like
                 if(scope.articleSid)
                    scope.checkstate = true;
                 scope.doLike = function(){
                   if((!scope.checkstate))
                   {
                      controller.setLike(scope.source.id,scope.source.url)
                                .then(function (response){
                                  if(response.data.created) // created,record
                                  {
                                    scope.articleSid = response.data.record.sid;
                                    scope.checkstate = true;
                                    scope.stats = scope.stats + 1;
                                  }
                                })
                                .catch(function(err){
                                  $log.error(err);
                                });
                   }
                   else {
                     scope.checkstate = false;
                     controller.deleteLike(scope.articleSid)
                               .then(function(response){
                                 if(response.data)
                                 {
                                   scope.checkstate = false;
                                   scope.stats = scope.stats - 1;
                                   scope.articleSid = '';
                                 }
                               })
                               .catch(function(err){
                                 $log.error(err);
                               });
                   }
                };
               }
           };
         });

})();
