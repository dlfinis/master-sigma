(function () {
  'use strict';

  function ShareFactory($window,$http)
  {
    return {
			init: function(fbId) {
				if (fbId) {
					this.fbId = fbId;
					$window.fbAsyncInit = function() {
						FB.init({
							appId: fbId,
							channelUrl: 'app/channel.html',
							status: true,
							xfbml: true
						});
					};
					(function(d) {
						var js,
							id = 'facebook-jssdk',
							ref = d.getElementsByTagName('script')[0];
						if (d.getElementById(id)) {
							return;
						}

						js = d.createElement('script');
						js.id = id;
						js.async = true;
						js.src = "//connect.facebook.net/en_US/all.js";

						ref.parentNode.insertBefore(js, ref);

					}(document));
				} else {
					throw ("FB App Id Cannot be blank");
				}
			},
      setshare: function(shareSID,articleID)
      {
        console.log(shareSID);
        console.log(articleID);
        return $http.post('/article/setshare',
               {
                shareSID : shareSID,
                articleID : articleID
               });
      },
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
      $share.setShare = function(shareSID,articleID) {
        ShareFactory.setshare(shareSID,articleID);
      };
  }

  angular.module('app.main.article.share', [])
         .factory('ShareFactory',ShareFactory)
         .controller('ShareCtrl',ShareCtrl)
         .directive('share', function($q,$log,partial){
           return {
               restrict: 'EA',
               scope: {
                 stats: "=",
                 source: "="
               },
               transclude: true,
               controller: 'ShareCtrl',
               controllerAs: '$share',
               templateUrl: partial.main.article+'tpl/share.cmp.html',
               link: function(scope, element, attr,controller) {
        					element.unbind();
        					element.bind('click', function(e) {
        						FB.ui({
        							method: 'share',
        							href: scope.source.url
        						}, function(response){
                      $log.debug(response);
                      $log.debug(attr.stats);

                      scope.stats = scope.stats+1;
                      controller.setShare(response.post_id,scope.source.id);
        						});
        						e.preventDefault();
        					});

          			}
            };

         });
})();
