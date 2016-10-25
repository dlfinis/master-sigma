(function () {
  'use strict';

  function ShareFactory($http,$rootScope,$q,$timeout,$Session)
  {
    return {
      setshare: function(shareSID,articleID)
      {
        return $http.post('api/share/set',{
          shareSID : shareSID,
          articleID : articleID
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
        //       }
        // });
        if($Session.getUser()) // From Begin Login User
        {
          var prms = {
            where : {
              article: articleID,
              user: $Session.getUser().uid
            }
          };

          return $http.get('api/share',{ params:prms });
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
      return ShareFactory.setshare(shareSID,articleID,messageShare);
    };
    $share.changeLoader = function (value) {
      $share.loader = value;
    };
  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($log,partial,$facebook, $timeout,$Session){
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
             link: function(scope, element, attr, controller) {
               scope.setShare = function () {
                 scope.loader = true;

                 $timeout(function() {
                   scope.loader = false; //cancel loader when timed out
                 }, 3750); //3750ms

                 $timeout(function(){
                   $log.debug('+ Click Share Button');
                   $facebook.ui(
                     {
                       method: 'share',
                       href: scope.source.url,
                       title: scope.source.title,
                       description: scope.source.description,
                       image: scope.source.image
                     })
                     .then(function(response){
                       $log.debug(response);
                        if(response && !response.error_code)
                        {
                          var user = $Session.getUser();
                          $log.debug('+ FB Share user.uid ',user.uid);
                          $log.debug('+ Adding Share in DB ');

                          controller.setShare(response.post_id,scope.source.id)
                          .then(function(response){
                            if(response.status <= 210)
                            {
                              $log.debug('+ Added new Share in DB ');
                              scope.loader = false;
                              scope.stats = scope.stats+1;
                            }
                          })
                          .catch(function (err) {
                            $log.error(err);
                            scope.loader = false;
                          });
                        }
                     })
                    .catch(function (err) {
                      $log.error(err);
                      scope.loader = false;
                    });
                 });
                 scope.loader = false;
               };
             }
           };
         });
})();
