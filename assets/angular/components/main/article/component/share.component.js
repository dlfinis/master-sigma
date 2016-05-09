(function () {
  'use strict';

  function ShareFactory($http,$rootScope)
  {
    return {
			setshare: function(shareSID,articleID,messageShare)
      {
        return $http.post('/api/article/setshare',
               {
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
              if($rootScope.userProfile) // From Begin Login User
              {
                var prms = {
                  where : {
                    article: articleID,
                    user: $rootScope.userProfile.uid
                  }
                };

                return $http.get('/api/share',{ params:prms });
              }

      },
      service_slow : function(term) {

              var deferred = $q.defer();

             $timeout(function() {
                 deferred.resolve([{ name: "result 1" }]);
             }, 1000);

             return deferred.promise;
      },
      service : function(term) {

        return $timeout(function() {
              return [{ name: "result 1" }];
          }, 1000);
      }
		};
  }

  function ShareCtrl($scope,ShareFactory)
  {
    var $share = this;
    $share.count = 0;
    $share.state = false;
    $share.model = 0;
    $share.stats = 0;
    $share.article_uid = "";

      $share.setShare = function(shareSID,articleID,messageShare) {
        ShareFactory.setshare(shareSID,articleID,messageShare);
      };

      $share.getShareListInfo = function(articleID){
        console.log(articleID);
        // ShareFactory.getShareListInfo(articleID).then(function(response){
        //   $log.debug(response.data);
        // });
      };
  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($rootScope,$q,$http,$log,$facebook,partial){
           return {
               restrict: 'EA',
               scope: {
                 stats: "=",
                 source: "=" //article
               },
               transclude: true,
               controller: 'ShareCtrl',
               controllerAs: '$share',
               templateUrl: partial.main.article+'tpl/share.cmp.html',
               link: function(scope, element, attr,controller) {

                  // $q.when(controller.getShareListInfo(scope.source.id))
                  // .then(function (response) {
                  //     $log.debug(response.data);
                  //     $log.debug();
                  // });
                  // $log.debug(controller.getShareListInfo(scope.source.id));

                  // $q.when($http.get('/user/get_user')).then(function (response) {
                  //     $log.debug(response);
                  // });

                 	element.unbind();
        					element.bind('click', function(e) {
        						$facebook.ui({
        							method: 'share',
        							href: scope.source.url
        						}).then(function(response){
                      $log.debug(response);

                      if(response && !response.error_code)
                      {
                        // $facebook.api("/me")
                        // .then(function(user) {
                        //     // $log.debug(user);
                        //     var completeSID = user.id+"_"+response.post_id;
                        //         $facebook.api('/'+completeSID)
                        //         .then(function(share){
                        //           // $log.debug(share);
                        //           controller.setShare(share.id,scope.source.id,share.message);
                        //          });
                        //         scope.stats = scope.stats+1;
                        // })
                        // .catch(function(err) {
                        //           $log.error(err);
                        // });
                            var user = $rootScope.userProfile;
                            $log.debug(user);
                            var completeSID = user.uid+"_"+response.post_id;
                                $facebook.api('/'+completeSID)
                                .then(function(share){
                                  // $log.debug(share);
                                  controller.setShare(share.id,scope.source.id,share.message);
                                 });
                                scope.stats = scope.stats+1;

                      }

        						});
        						e.preventDefault();
        					});

          			}
            };

         });
})();
