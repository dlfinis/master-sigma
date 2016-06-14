(function () {
  'use strict';

  function ShareFactory($http,$rootScope,$q,$timeout,Session)
  {
    return {
      setshare: function(shareSID,articleID,messageShare)
      {
        return $http.post('/api/article/setshare',{
          shareSID : shareSID,
          articleID : articleID,
          messageShare : messageShare
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
        if(Session.get()) // From Begin Login User
              {
          var prms = {
            where : {
              article: articleID,
              user: Session.get().user.uid
            }
          };

          return $http.get('/api/share',{ params:prms });
        }

      },
      service_slow : function(term) {

        var deferred = $q.defer();

        $timeout(function() {
          deferred.resolve([{ name: 'result 1' }]);
        }, 1000);

        return deferred.promise;
      },
      service : function(term) {

        return $timeout(function() {
          return [{ name: 'result 1' }];
        }, 1000);
      }
    };
  }

  function ShareCtrl($scope,ShareFactory)
  {
    var $share = this;
    $share.setShare = function(shareSID,articleID,messageShare) {
      ShareFactory.setshare(shareSID,articleID,messageShare);
    };
  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($log,$facebook,partial,Session){
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
               element.unbind();
               element.bind('click', function(e) {
                 $log.debug('+ Click Share Button');
                 $facebook.ui(
                   {
                     method: 'share',
                     href: scope.source.url
                   })
                   .then(function(response){
                      if(response && !response.error_code)
                      {
                        var user = Session.get().user;
                        $log.debug('+ FB Share user ',user);
                        $log.debug('+ FB Share user.uid ',user.uid);
                        var completeSID = user.uid+'_'+response.post_id;
                        $log.debug('+ FB Share Complete ID',completeSID);
                        $facebook.api('/'+completeSID)
                            .then(function(share){
                              if(share){
                                $log.debug('+ Share success by adding in DB');
                                controller.setShare(share.id,scope.source.id,share.message);
                                scope.stats = scope.stats+1;
                              }
                            });
                      }
                    });
                 e.preventDefault();
               });
             }
           };
         });
})();
