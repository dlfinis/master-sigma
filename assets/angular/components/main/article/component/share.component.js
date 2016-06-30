(function () {
  'use strict';

  function ShareFactory($http,$rootScope,$q,$timeout,$Session)
  {
    return {
      setshare: function(shareSID,articleID,messageShare)
      {
        return $http.post('/api/article/setshare',{
          shareSID : shareSID,
          articleID : articleID,
          messageShare : messageShare
        }, {
          ignoreLoadingBar: true
        });
      },
      getShareListInfo: function(articleID)
      {
        // return $http.get('/user/get_user').then(function (user) {
        //       if(user)
        //       {
        //         var prms = {
        //           where : {
        //             article: articleID,
        //             user: user.id
        //           }
        //         };
        //
        //         return $http.get('/share',{ params:prms });
        //       }
        // });
        if($Session.get()) // From Begin Login User
              {
          var prms = {
            where : {
              article: articleID,
              user: $Session.get().uid
            }
          };

          return $http.get('/api/share',{ params:prms });
        }

      },
      testshare : function() {
        var timer = $q.defer();
        $timeout(function() {
          timer.resolve(Math.round(Math.random())); //aborts the request when timed out
          console.log('Time out');
        }, 5750); //we set a timeout for 1250ms

        // The promise of the deferred task
        return timer.promise;
      }
    };
  }

  function ShareCtrl($scope,ShareFactory)
  {
    var $share = this;
    $share.loader = false;

    $share.testShare = function() {
      return ShareFactory.testshare();
    };
    $share.setShare = function(shareSID,articleID,messageShare) {
      ShareFactory.setshare(shareSID,articleID,messageShare);
    };
    $share.changeLoader = function (value) {
      $share.loader = value;
    };
  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($log,$facebook,partial,$Session){
           return {
             restrict: 'EA',
             scope: {
               stats: '=',
               source: '=' //article
             },
             transclude: true,
             controller: 'ShareCtrl',
             controllerAs: '$share',
             templateUrl: partial.main.article+'tpl/share.cmp.html',
             link: function(scope, element, attr,controller) {
               scope.setShare = function () {
                 scope.loader = true;
                 $log.debug('+ Click Share Button');
                 $facebook.ui(
                   {
                     method: 'share',
                     href: scope.source.url
                   })
                   .then(function(response){
                      if(response && !response.error_code)
                      {
                        var user = $Session.get().user;
                        $log.debug('+ FB Share user ',user);
                        $log.debug('+ FB Share user.uid ',user.uid);
                        var completeSID = user.uid+'_'+response.post_id;
                        $log.debug('+ FB Share Complete ID',completeSID);
                        $facebook.api('/'+completeSID)
                            .then(function(share){
                              if(share){
                                $log.debug('+ Share success by adding in DB');
                                controller.setShare(share.id,scope.source.id,share.message);
                                scope.loader = false;
                                scope.stats = scope.stats+1;
                              }
                            });
                      }
                    })
                    .catch(function () {
                      scope.loader = false;
                    });
              };
             }
           };
         });
})();
